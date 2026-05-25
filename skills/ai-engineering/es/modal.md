# Modal

## Cuándo activar
- El usuario está desplegando cargas de trabajo ML/IA a Modal (modal.com)
- El código importa `modal` o referencia `@app.function`, `@app.cls`, `Stub`, `App`
- El usuario necesita computación GPU sin servidor para inferencia, afinamiento fino o trabajos ML en lote
- El usuario pregunta sobre inicios fríos, selección de GPU, almacenamiento en caché de pesos de modelo o inferencia de transmisión en Modal
- El usuario está construyendo un punto final web o trabajo programado respaldado por computación GPU

## Cuándo NO usar
- El usuario está desplegando a una plataforma GPU sin servidor diferente (RunPod, Lambda Labs, Replicate, Banana)
- La tarea es solo CPU y no tiene carga de trabajo ML — usa sin servidor estándar (Lambda, Cloud Run)
- El usuario ya tiene un punto final de inferencia gestionado (OpenAI, Anthropic, Together) y solo necesita una llamada a API
- La pregunta es sobre arquitectura de modelo ML, no infraestructura

## Instrucciones

### Configuración de App e Image

El punto de entrada de Modal es una `App` (anteriormente `Stub`). Cada función desplegada pertenece a una.

```python
import modal

app = modal.App("my-inference-app")

# Construye una imagen personalizada — haz esto una vez, se cachea capa por capa
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(["torch", "transformers", "accelerate", "vllm"])
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)
```

Construye dependencias pesadas en la imagen, no en inicio de función. Cada llamada `.pip_install()` es una capa Docker separada y se cachea independientemente.

### Selección de GPU

| GPU | VRAM | Usar cuando |
|-----|------|----------|
| T4 | 16 GB | Dev/testing, modelos pequeños (≤7B en fp16), sensible al costo |
| A10G | 24 GB | Inferencia de producción, modelos de 7–13B, mejor precio/desempeño |
| A100-40GB | 40 GB | Modelos de 13–30B, afinamiento fino ≤13B, rendimiento de lote |
| A100-80GB | 80 GB | Modelos de 30–70B, afinamiento fino completo de 13B+ |
| H100 | 80 GB | Rendimiento máximo, modelos más grandes, entrenamiento multi-nodo |

```python
@app.function(gpu="A10G", image=image)
def run_inference(prompt: str) -> str:
    ...

# Solicita un recuento específico
@app.function(gpu=modal.gpu.A100(count=2))
def multi_gpu_job():
    ...
```

### Optimización de inicio frío

Los inicios fríos en instancias GPU están dominados por carga de pesos de modelo, no por arranque de contenedor.

```python
# keep_warm mantiene N contenedores vivos — elimina inicios fríos, facturado continuamente
@app.function(gpu="A10G", keep_warm=1, image=image)
def fast_inference(prompt: str) -> str:
    ...

# container_idle_timeout mantiene un contenedor vivo N segundos después de última solicitud
# Buen punto medio: reduce inicios fríos sin costo keep_warm
@app.function(gpu="A10G", container_idle_timeout=300, image=image)
def balanced_inference(prompt: str) -> str:
    ...
```

Usa `@app.cls` con `@modal.enter()` para cargar modelos una vez por ciclo de vida de contenedor:

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

### Volúmenes para pesos de modelo

Nunca descargues pesos de modelo en tiempo de ejecución de función — almacénalos en un Volumen de Modal.

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
    model_volume.commit()  # persiste escrituras

@app.function(gpu="A10G", image=image, volumes={"/models": model_volume})
def inference(prompt: str) -> str:
    from transformers import pipeline
    pipe = pipeline("text-generation", model="/models/mistral-7b")
    return pipe(prompt)[0]["generated_text"]
```

### Gestión de secretos

```python
# Crea secreto en panel de Modal, referencia por nombre
hf_secret = modal.Secret.from_name("huggingface-token")

@app.function(gpu="A10G", image=image, secrets=[hf_secret])
def download_gated_model():
    import os
    token = os.environ["HF_TOKEN"]  # clave configurada en secreto de Modal
    ...
```

### Funciones programadas

```python
from modal import Period

@app.function(schedule=Period(hours=6))
def refresh_embeddings():
    # Se ejecuta cada 6 horas — no requiere sintaxis cron
    ...

# También se soporta sintaxis Cron
@app.function(schedule=modal.Cron("0 2 * * *"))
def nightly_batch():
    ...
```

### Puntos finales web

```python
@app.function(gpu="A10G", image=image, allow_concurrent_inputs=10)
@modal.web_endpoint(method="POST")
def serve(request: dict) -> dict:
    result = model.generate(request["prompt"])
    return {"text": result}
```

`allow_concurrent_inputs` permite que un contenedor maneje N solicitudes simultáneamente — crítico para rendimiento en inferencia de larga duración. Sin él, cada solicitud obtiene su propio contenedor.

Para aplicaciones ASGI completas:

```python
@app.function(gpu="A10G", image=image)
@modal.asgi_app()
def fastapi_app():
    from api import app as fastapi_app  # tu aplicación FastAPI
    return fastapi_app
```

### Montaje de código local

```python
local_mount = modal.Mount.from_local_dir(
    "./src",
    remote_path="/root/src",
)

@app.function(mounts=[local_mount], image=image)
def run_local_code():
    import sys
    sys.path.insert(0, "/root/src")
    from my_module import process
    process()
```

### Inferencia con transmisión

Usa `yield` para transmitir tokens de vuelta a quien llama:

```python
@app.function(gpu="A10G", image=image)
def stream_tokens(prompt: str):
    from vllm import LLM, SamplingParams
    llm = LLM(model="/models/mistral-7b")
    params = SamplingParams(temperature=0.7, max_tokens=512)
    for output in llm.generate([prompt], params, use_tqdm=False):
        for token in output.outputs[0].text:
            yield token

# El que llama itera el generador
for chunk in stream_tokens.remote_gen("Tell me about GPUs"):
    print(chunk, end="", flush=True)
```

### Patrón de afinamiento fino

```python
@app.function(
    gpu=modal.gpu.A100(memory=80),
    image=image,
    volumes={"/models": model_volume, "/checkpoints": checkpoint_volume},
    timeout=3600 * 8,  # 8 horas máximo para largos entrenamientos
)
def finetune(config: dict):
    from transformers import Trainer, TrainingArguments
    # ... carga dataset, modelo, ejecuta Trainer
    trainer.train()
    trainer.save_model("/checkpoints/finetuned")
    checkpoint_volume.commit()
```

Configura `timeout` explícitamente para trabajos largos — el predeterminado es 300 segundos.

### Modelo de costo

- Facturado por segundo de tiempo GPU — sin costo inactivo cuando contenedores están detenidos
- Capa gratuita: crédito de $30/mes de computación
- A10G: ~$1.10/hr; A100-40GB: ~$3.00/hr; H100: ~$7.00/hr (aproximado, verifica modal.com/pricing)
- `keep_warm=1` en un A10G cuesta ~$26/día — usa solo para puntos finales de producción sensibles a latencia
- Prefiere `container_idle_timeout` (paga solo cuando existe tráfico) sobre `keep_warm` para la mayoría de cargas de trabajo

## Ejemplo

Desplegando un punto final de inferencia vLLM en Modal con transmisión y API web:

```python
import modal

app = modal.App("vllm-endpoint")

model_volume = modal.Volume.from_name("vllm-weights", create_if_missing=True)
hf_secret = modal.Secret.from_name("huggingface-token")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(["vllm==0.4.0", "huggingface_hub[hf_transfer]", "fastapi"])
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)

MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_DIR = "/models/mistral-7b-instruct"


@app.function(
    image=image,
    gpu="A10G",
    volumes={"/models": model_volume},
    secrets=[hf_secret],
)
def download_weights():
    from huggingface_hub import snapshot_download
    import os
    snapshot_download(
        MODEL_ID,
        local_dir=MODEL_DIR,
        token=os.environ["HF_TOKEN"],
    )
    model_volume.commit()


@app.cls(
    gpu="A10G",
    image=image,
    volumes={"/models": model_volume},
    container_idle_timeout=300,
    allow_concurrent_inputs=8,
)
class VLLMEndpoint:
    @modal.enter()
    def load(self):
        from vllm import LLM, SamplingParams
        self.llm = LLM(model=MODEL_DIR, max_model_len=4096)
        self.sampling_params = SamplingParams(temperature=0.7, max_tokens=512)

    @modal.method()
    def generate(self, prompt: str) -> str:
        outputs = self.llm.generate([prompt], self.sampling_params)
        return outputs[0].outputs[0].text

    @modal.web_endpoint(method="POST")
    def api(self, request: dict) -> dict:
        return {"text": self.generate(request["prompt"])}


# Despliegue: modal deploy modal_app.py
# Un despliegue descarga pesos una vez: modal run modal_app.py::download_weights
```

Ejecuta `modal deploy modal_app.py` para publicar el punto final. Modal devuelve una URL HTTPS estable para el punto final web.
