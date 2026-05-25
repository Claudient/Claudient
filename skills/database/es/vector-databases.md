# Bases de Datos Vectoriales

## Cuándo activar
- El usuario está implementando búsqueda semántica, canalizaciones RAG o sistemas de recomendación
- El código importa `qdrant_client`, `pinecone`, `weaviate`, `psycopg2` con `pgvector` o `chromadb`
- El usuario pregunta sobre almacenamiento de incrustación, búsqueda de similaridad o recuperación de vecino más cercano
- El usuario está construyendo un sistema donde "encontrar documentos similares a X" es una operación central
- El usuario necesita deduplicación a escala usando similaridad de incrustación
- El usuario está diseñando estrategia de fragmentación, parámetros HNSW o búsqueda híbrida para un sistema de producción

## Cuándo NO usar
- El usuario necesita solo búsqueda de palabra clave exacta — usa Elasticsearch o búsqueda de texto completo de Postgres
- Los datos son tabulares y las consultas están basadas en filtro sin componente semántico — usa SQL
- El conjunto de datos es inferior a ~1,000 elementos — un bucle simple de similaridad coseno sobre matrices numpy en memoria es suficiente
- El usuario pregunta sobre entrenamiento de modelos de incrustación, no uso para recuperación

## Instrucciones

### Cuándo usar bases de datos vectoriales

Usa una BD vectorial cuando necesites recuperar por significado, no por valor:
- **Búsqueda semántica**: "encontrar docs sobre fallas de pago" sin coincidencias exactas de palabra clave
- **RAG**: recupera top-K fragmentos relevantes antes de pasar contexto a un LLM
- **Recomendaciones**: "usuarios a los que les gustó X también les gustó Y" a través de proximidad de incrustación
- **Deduplicación**: agrupa registros casi duplicados a escala
- **Detección de anomalías**: marca registros lejanos a todos los centroides de cluster

### Tabla de comparación

| | Qdrant | Weaviate | Pinecone | pgvector | Chroma |
|---|---|---|---|---|---|
| Despliegue | Auto-alojado o nube | Auto-alojado o nube | Solo nube | Auto-alojado (extensión Postgres) | Auto-alojado o nube |
| Lenguaje | Rust | Go | Gestionado | C (Postgres) | Python |
| Búsqueda híbrida | Sí (sparse incorporado) | Sí (BM25 + denso) | Sí (sin servidor) | Manual (unión tsvector) | Limitado |
| Filtrado | Filtros de carga útil, indexados | Cláusulas GraphQL where | Filtros de metadatos | SQL WHERE | Dict de metadatos |
| Escala | 100M+ vectores | 100M+ vectores | 100M+ (pods) | <10M práctico | <5M práctico |
| Mejor para | RAG de producción, filtrado rápido | Datos ricos de esquema, multi-inquilino | Nube sin ops | Ya en Postgres | Dev local, prototipado |
| Costo gestionado | Capa gratuita + $0.08/GB | Capa gratuita + computación | $0.096/1M lecturas | Costo de instancia Postgres | Auto-alojado gratuito |

### Modelos de incrustación

Elige modelo de incrustación antes de elegir BD vectorial — el modelo determina dimensionalidad y calidad.

| Modelo | Dims | Contexto | Mejor para |
|---|---|---|---|
| `text-embedding-3-small` (OpenAI) | 1536 (reducible) | 8191 tokens | Propósito general, eficiente en costo |
| `text-embedding-3-large` (OpenAI) | 3072 | 8191 tokens | Calidad más alta de OpenAI |
| `voyage-3` (Voyage AI) | 1024 | 32000 tokens | Documentos largos, RAG |
| `nomic-embed-text` (local) | 768 | 8192 tokens | On-prem, sin costo de API |
| `BAAI/bge-m3` (local) | 1024 | 8192 tokens | Multilingüe, búsqueda híbrida |

Usa `text-embedding-3-small` como predeterminado a menos que tengas una razón específica. Puedes reducir sus dimensiones a 256 o 512 para almacenamiento más barato con pequeño costo de calidad.

### Estrategia de fragmentación

Fragmenta antes de incrustar — la ventana de incrustación es tu restricción dura.

| Tamaño de fragmento | Usar cuando |
|---|---|
| 256 tokens | Recuperación de alta precisión, respuestas cortas fácticas, FAQ |
| 512 tokens | RAG equilibrado — predeterminado más común |
| 1024 tokens | Contexto de larga forma necesario, tareas de resumen |

Siempre agrega superposición (10–20% del tamaño del fragmento) para evitar dividir contexto en límites:

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,
    separators=["\n\n", "\n", ". ", " "],
)
chunks = splitter.split_text(document)
```

**Fragmentación tardía**: incrustra el documento completo primero, luego extrae incrustaciones de fragmento desde atención de documento completo — preserva contexto entre fragmentos. Usa `jina-embeddings-v2` o `nomic-embed-text` que lo soportan nativamente.

### Parámetros de indexación HNSW

HNSW (Hierarchical Navigable Small World) es el índice predeterminado para todas las BDs vectoriales principales.

| Parámetro | Efecto | Predeterminado | Afinar cuando |
|---|---|---|---|
| `m` | Conectividad de gráfico (bordes por nodo) | 16 | Aumenta a 32–64 para mayor recall, cuesta más RAM |
| `ef_construction` | Ancho de búsqueda en tiempo de construcción | 100 | Aumenta para mejor calidad de índice, construcción más lenta |
| `ef` (búsqueda) | Ancho de búsqueda en tiempo de consulta | 128 | Aumenta para mayor recall en tiempo de consulta |

Para conjuntos de datos bajo 10,000 vectores, usa índice plano (fuerza bruta) — HNSW tiene sobrecarga que no se justifica en escala pequeña.

### Qdrant

```python
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
)

client = QdrantClient(url="http://localhost:6333")
# Nube: QdrantClient(url="https://xyz.qdrant.io", api_key="...")

# Crea colección
client.recreate_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
)

# Upsert — siempre en lote, nunca uno a uno
points = [
    PointStruct(
        id=i,
        vector=embedding,
        payload={"text": chunk, "source": filename, "page": page_num},
    )
    for i, (embedding, chunk, filename, page_num) in enumerate(records)
]
client.upsert(collection_name="documents", points=points, wait=True)

# Busca con filtro de carga útil
results = client.search(
    collection_name="documents",
    query_vector=query_embedding,
    query_filter=Filter(
        must=[FieldCondition(key="source", match=MatchValue(value="report.pdf"))]
    ),
    limit=5,
    with_payload=True,
)

for r in results:
    print(r.score, r.payload["text"])
```

Indexa campos de carga útil que filtres:

```python
client.create_payload_index(
    collection_name="documents",
    field_name="source",
    field_schema="keyword",
)
```

### Pinecone

```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="...")

# Sin servidor (recomendado — sin gestión de pod)
pc.create_index(
    name="documents",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
)

index = pc.Index("documents")

# Aislamiento de espacio de nombres — usa para aplicaciones multi-inquilino
index.upsert(
    vectors=[
        {"id": str(i), "values": emb, "metadata": {"text": chunk, "source": src}}
        for i, (emb, chunk, src) in enumerate(records)
    ],
    namespace="tenant-123",
)

results = index.query(
    vector=query_embedding,
    top_k=5,
    filter={"source": {"$eq": "report.pdf"}},
    include_metadata=True,
    namespace="tenant-123",
)
```

Sin servidor vs basado en pod: usa sin servidor para la mayoría de cargas de trabajo — escala a cero, sin planificación de capacidad. Usa pods solo si necesitas latencia de consulta garantizada bajo 10ms o tienes >1B vectores.

### pgvector

Mejor cuando: ya ejecutas Postgres, tu conjunto de datos vectorial permanece bajo ~5–10M filas, y quieres evitar agregar una dependencia de infraestructura nueva.

```sql
-- Habilita extensión
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabla con columna vectorial
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    source TEXT,
    embedding vector(1536)
);

-- Índice HNSW (Postgres 15+, pgvector 0.5+)
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Búsqueda de similaridad con filtro
SELECT content, source, 1 - (embedding <=> $1::vector) AS score
FROM documents
WHERE source = 'report.pdf'
ORDER BY embedding <=> $1::vector
LIMIT 5;
```

```python
import psycopg2
import numpy as np

conn = psycopg2.connect("postgresql://user:pass@localhost/mydb")
cur = conn.cursor()

# Inserta con incrustación
cur.execute(
    "INSERT INTO documents (content, source, embedding) VALUES (%s, %s, %s)",
    (chunk, filename, embedding.tolist()),
)
conn.commit()

# Consulta
cur.execute(
    "SELECT content, 1 - (embedding <=> %s::vector) AS score "
    "FROM documents ORDER BY embedding <=> %s::vector LIMIT 5",
    (query_embedding.tolist(), query_embedding.tolist()),
)
rows = cur.fetchall()
```

### Búsqueda híbrida

Densa (semántica) + recuperación sparse (palabra clave/BM25) combinada con Reciprocal Rank Fusion (RRF):

```python
# Búsqueda híbrida Qdrant sparse + densa
from qdrant_client.models import SparseVector, NamedVector, NamedSparseVector

# Vector sparse desde BM25 (usa fastembed o splade)
from fastembed import SparseTextEmbedding
sparse_model = SparseTextEmbedding("prithvida/Splade_PP_en_v1")
sparse_vec = list(sparse_model.embed([query]))[0]

results = client.query_points(
    collection_name="documents",
    prefetch=[
        {"query": {"indices": sparse_vec.indices.tolist(), "values": sparse_vec.values.tolist()}, "using": "sparse", "limit": 20},
        {"query": dense_embedding, "using": "dense", "limit": 20},
    ],
    query={"fusion": "rrf"},  # reranking RRF
    limit=5,
)
```

Fórmula RRF: `score = sum(1 / (k + rank_i))` donde `k=60` es estándar. La mayoría de BDs vectoriales lo implementan nativamente — no implementes manualmente.

### Patrones de producción

**Upserts en lote**: siempre upsert en lotes de 100–500. Los inserts de un solo registro son 10–50x más lento debido a ida y vuelta de red.

```python
def batch_upsert(client, collection, points, batch_size=200):
    for i in range(0, len(points), batch_size):
        client.upsert(collection_name=collection, points=points[i:i+batch_size])
```

**Calentamiento de índice**: después de cargar un índice grande, ejecuta algunos queries ficticios antes de servir tráfico — la travesía del gráfico HNSW es lenta en primer acceso debido a fallos de caché de página.

**Dimensionalidad**: usa la dimensión mínima que cumple tu barra de calidad. Vectores `text-embedding-3-small` de 256-dim usan 4x menos RAM y almacenamiento que 1536-dim — ejecuta un benchmark de recall offline para encontrar tu piso.

**Carga útil vs almacén separado**: almacena solo metadatos filtrables en la carga útil del vector DB. Almacena blobs de texto grandes en S3/Postgres y une por ID en tiempo de consulta.

## Ejemplo

Canalización RAG con Qdrant y Claude:

```python
import os
from anthropic import Anthropic
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

# Clientes
anthropic = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
qdrant = QdrantClient(url="http://localhost:6333")

COLLECTION = "knowledge-base"
EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM = 1536


def setup_collection():
    qdrant.recreate_collection(
        collection_name=COLLECTION,
        vectors_config=VectorParams(size=EMBED_DIM, distance=Distance.COSINE),
    )


def embed(texts: list[str]) -> list[list[float]]:
    response = openai_client.embeddings.create(model=EMBED_MODEL, input=texts)
    return [r.embedding for r in response.data]


def ingest_documents(documents: list[dict]):
    """documents: list of {"id": str, "text": str, "source": str}"""
    batch_size = 100
    for i in range(0, len(documents), batch_size):
        batch = documents[i : i + batch_size]
        embeddings = embed([d["text"] for d in batch])
        points = [
            PointStruct(
                id=idx + i,
                vector=emb,
                payload={"text": doc["text"], "source": doc["source"]},
            )
            for idx, (doc, emb) in enumerate(zip(batch, embeddings))
        ]
        qdrant.upsert(collection_name=COLLECTION, points=points, wait=True)
        print(f"Ingested {min(i + batch_size, len(documents))}/{len(documents)}")


def retrieve(query: str, top_k: int = 5) -> list[dict]:
    query_embedding = embed([query])[0]
    results = qdrant.search(
        collection_name=COLLECTION,
        query_vector=query_embedding,
        limit=top_k,
        with_payload=True,
    )
    return [
        {"text": r.payload["text"], "source": r.payload["source"], "score": r.score}
        for r in results
    ]


def answer(question: str) -> str:
    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(
        f"[Source: {c['source']}]\n{c['text']}" for c in chunks
    )

    response = anthropic.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        system=(
            "You are a helpful assistant. Answer questions using only the provided context. "
            "If the context does not contain the answer, say so."
        ),
        messages=[
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {question}",
            }
        ],
    )
    return response.content[0].text


# Uso
if __name__ == "__main__":
    setup_collection()

    docs = [
        {"id": "1", "text": "Qdrant stores vectors with payloads...", "source": "docs/qdrant.md"},
        {"id": "2", "text": "HNSW indexes trade RAM for recall...", "source": "docs/indexing.md"},
    ]
    ingest_documents(docs)

    print(answer("How does HNSW affect memory usage?"))
```
