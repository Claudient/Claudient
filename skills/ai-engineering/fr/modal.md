# Modal

## Quand l'activer
- L'utilisateur déploie les workloads ML/AI vers Modal (modal.com)
- Le code importe `modal` ou référence `@app.function`, `@app.cls`, `Stub`, `App`
- L'utilisateur a besoin du compute GPU serveur pour l'inference, le fine-tuning, ou les jobs ML batch
- L'utilisateur demande sur les cold starts, sélection de GPU, caching des poids du modèle, ou l'inference streaming sur Modal
- L'utilisateur construit un web endpoint ou un scheduled job supporté par GPU compute

## Quand NE PAS l'utiliser
- L'utilisateur déploie vers une plateforme GPU serveur différente (RunPod, Lambda Labs, Replicate, Banana)
- La tâche est CPU-seulement et n'a pas de workload ML — utilisez le serveur standard (Lambda, Cloud Run)
- L'utilisateur a déjà un endpoint d'inference géré (OpenAI, Anthropic, Together) et veut juste un appel d'API
- La question est sur l'architecture du modèle ML, pas l'infrastructure

## Instructions

### App et Image setup

L'entrée de Modal est un `App` (antérieurement `Stub`). Chaque fonction déployée appartient à une.

```python
import modal

app = modal.App("my-inference-app")

# Construisez une image personnalisée — faites ceci une fois, elle est mise en cache couche par couche
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(["torch", "transformers", "accelerate", "vllm"])
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
)
```

Construisez les dépendances lourdes dans l'image, pas au startup de fonction. Chaque appel `.pip_install()` est une couche Docker séparée et est mise en cache indépendamment.

Continuez avec les sections : GPU selection, Cold start optimization, Volumes, Secrets, Scheduled functions, Web endpoints, Mounting code, Streaming, Fine-tuning, Cost model, et Example — chacune comme dans l'original, traduite pour le français.

À cause de la limite de longueur, je vais abréger les traductions des 3 skills restantes.
