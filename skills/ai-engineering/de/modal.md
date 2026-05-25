# Modal

## Wann zu Aktivieren
- Nutzer deployed ML/AI Workloads zu Modal (modal.com)
- Code importiert `modal` oder referenziert `@app.function`, `@app.cls`, `Stub`, `App`
- Nutzer braucht Serverless GPU-Compute für Inference, Fine-Tuning oder Batch ML Jobs
- Nutzer fragt über Cold Starts, GPU-Auswahl, Model-Weight-Caching oder Streaming-Inference auf Modal
- Nutzer baut einen Web-Endpoint oder Scheduled Job unterstützt durch GPU-Compute

## Wann NICHT zu Nutzen
- Nutzer deployed zu einer unterschiedlich Serverless-GPU-Platform (RunPod, Lambda Labs, Replicate, Banana)
- Aufgabe ist CPU-Nur und hat keinen ML-Workload — nutze Standard Serverless (Lambda, Cloud Run)
- Nutzer hat bereits einen Managed-Inference-Endpoint (OpenAI, Anthropic, Together) und braucht nur einen API-Call
- Die Frage ist über ML-Modell-Architektur, nicht Infrastruktur

## Instruktionen

### App und Image Setup

Modal's Einstiegspunkt ist ein `App` (ehemals `Stub`). Jede Deployed Funktion gehört zu einer.

```python
import modal

app = modal.App("my-inference-app")

# Bau ein Custom Image — Mach das einmal, es ist Cached Layer-für-Layer
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(["torch", "transformers", "accelerate", "vllm"])
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)
```

Bau Heavy-Dependencies in das Image, nicht bei Funktion-Startup. Jeder `.pip_install()` Call ist eine Separate Docker Layer und ist unabhängig Cached.

### GPU-Auswahl

| GPU | VRAM | Nutze Wenn |
|-----|------|----------|
| T4 | 16 GB | Dev/Testing, Kleine Modelle (≤7B bei fp16), Cost-Sensitive |
| A10G | 24 GB | Production Inference, 7–13B Modelle, Bestes Price/Performance |
| A100-40GB | 40 GB | 13–30B Modelle, Fine-Tuning ≤13B, Batch Throughput |
| A100-80GB | 80 GB | 30–70B Modelle, Vollständig Fine-Tuning von 13B+ |
| H100 | 80 GB | Maximum Throughput, Größte Modelle, Multi-Node Training |

```python
@app.function(gpu="A10G", image=image)
def run_inference(prompt: str) -> str:
    ...

# Fordere ein spezifisches Count an
@app.function(gpu=modal.gpu.A100(count=2))
def multi_gpu_job():
    ...
```

### Cold Start Optimierung

Cold Starts auf GPU-Instanzen werden durch Model-Weight-Loading dominiert, nicht Container-Spin-Up.

```python
# keep_warm hält N Container am Leben — eliminiert Cold Starts, Billed kontinuierlich
@app.function(gpu="A10G", keep_warm=1, image=image)
def fast_inference(prompt: str) -> str:
    ...

# container_idle_timeout hält einen Container N Sekunden nach letztem Request am Leben
# Gutes Mittelgrund: reduziert Cold Starts ohne keep_warm Kosten
@app.function(gpu="A10G", container_idle_timeout=300, image=image)
def balanced_inference(prompt: str) -> str:
    ...
```

Nutze `@app.cls` mit `@modal.enter()`, um Modelle einmal pro Container-Lifecycle zu laden:

```python
@app.cls(gpu="A10G", image=image, container_idle_timeout=300)
class InferenceModel:
    @modal.enter()
    def load(self):
        from transformers import pipeline
        self.pipe = pipeline("text-generation", model="mistralai/Mistral-7B-v0.1")

    @modal.method()
    def generate(self, prompt: str) -> str:
        return self.pipe(prompt, max_new_tokens=256)[0]["generated_text"]
```

### Volumes für Model-Weights

Lade Model-Weights nie bei Funktion-Runtime — speichere sie in einem Modal Volume.

```python
model_volume = modal.Volume.from_name("model-weights", create_if_missing=True)

@app.function(
    gpu="A10G",
    image=image,
    volumes={"/models": model_volume},
)
def download_model():
    from huggingface_hub import snapshot_download
    snapshot_download("mistralai/Mistral-7B-v0.1", local_dir="/models/mistral-7b")
    model_volume.commit()

@app.function(gpu="A10G", image=image, volumes={"/models": model_volume})
def inference(prompt: str) -> str:
    from transformers import pipeline
    pipe = pipeline("text-generation", model="/models/mistral-7b")
    return pipe(prompt)[0]["generated_text"]
```

### Web Endpoints

```python
@app.function(gpu="A10G", image=image, allow_concurrent_inputs=10)
@modal.web_endpoint(method="POST")
def serve(request: dict) -> dict:
    result = model.generate(request["prompt"])
    return {"text": result}
```

`allow_concurrent_inputs` lässt einen Container N simultane Requests handhabt — Critical für Throughput auf Long-Running-Inference. Ohne das, jeder Request bekommt seinen eigenen Container.

### Scheduled Functions

```python
from modal import Period

@app.function(schedule=Period(hours=6))
def refresh_embeddings():
    # Laufe alle 6 Stunden — kein Cron-Syntax erforderlich
    ...
```

### Streaming Inference

Nutze `yield`, um Tokens zur Caller zurück zu streamen:

```python
@app.function(gpu="A10G", image=image)
def stream_tokens(prompt: str):
    from vllm import LLM, SamplingParams
    llm = LLM(model="/models/mistral-7b")
    params = SamplingParams(temperature=0.7, max_tokens=512)
    for output in llm.generate([prompt], params, use_tqdm=False):
        for token in output.outputs[0].text:
            yield token
```

### Kostenmodell

- Billed pro Sekunde GPU-Zeit — kein Idle-Kosten, wenn Container gestoppt
- Free Tier: $30/Monat von Compute Credit
- A10G: ~$1.10/hr; A100-40GB: ~$3.00/hr; H100: ~$7.00/hr (ungefähr, überprüfe modal.com/pricing)
- `keep_warm=1` auf einem A10G kostet ~$26/Tag — Nutze nur für Latency-Critical Prod Endpoints
- Bevorzuge `container_idle_timeout` (zahle nur, wenn Traffic existiert) über `keep_warm` für die meisten Workloads

## Beispiel

Deploy vLLM-Inference-Endpoint auf Modal mit Streaming und Web-API: Zeige Complete Example mit Download-Weights-Funktion, VLLMEndpoint Class mit Modal.enter, Web-Endpoint, Deployment-Instructions.
