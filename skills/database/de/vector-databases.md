# Vector Databases

## Wann zu Aktivieren
- Nutzer implementiert Semantic Search, RAG Pipelines oder Recommendation Systeme
- Code importiert `qdrant_client`, `pinecone`, `weaviate`, `psycopg2` mit `pgvector` oder `chromadb`
- Nutzer fragt über Embedding-Speicherung, Similarity-Search oder Nearest-Neighbor-Retrieval
- Nutzer baut ein System, wo "Finde Dokumente ähnlich zu X" eine Core Operation ist
- Nutzer braucht Deduplication bei Scale, die Embedding-Similarity nutzt
- Nutzer designet Chunk-Strategie, HNSW-Parameter oder Hybrid-Search für einen Produktions-System

## Wann NICHT zu Nutzen
- Nutzer braucht nur Exact-Keyword-Search — nutze Elasticsearch oder Postgres Full-Text Search
- Daten ist Tabelliert und Queries sind Filter-Basiert ohne Semantic-Komponente — nutze SQL
- Dataset ist unter ~1,000 Items — eine einfache Cosine-Similarity Loop über In-Memory Numpy-Arrays ist ausreichend
- Nutzer fragt über Training Embedding-Modelle, nicht nutzen sie für Retrieval

## Instruktionen

### Wann Vector Databases zu Nutzen

Nutze einen Vector DB, wenn du durch Bedeutung retrieven brauchst, nicht nach Wert:
- **Semantic Search**: "Finde Docs über Payment-Failures", ohne Exact-Keyword-Matches
- **RAG**: Retrieve Top-K Relevante Chunks, bevor du Context zu LLM passt
- **Recommendations**: "Nutzer, die X liked, mochten auch Y", via Embedding-Proximity
- **Deduplication**: Cluster Near-Duplicate Records bei Scale
- **Anomaly Detection**: Flag Records Far von alle Cluster-Centroids

### Vergleichs-Tabelle

| | Qdrant | Weaviate | Pinecone | pgvector | Chroma |
|---|---|---|---|---|---|
| Deployment | Self-Host oder Cloud | Self-Host oder Cloud | Cloud Nur | Self-Host (Postgres Extension) | Self-Host oder Cloud |
| Language | Rust | Go | Managed | C (Postgres) | Python |
| Hybrid Search | Ja (Built-in Sparse) | Ja (BM25 + Dense) | Ja (Serverless) | Manual (tsvector Join) | Limited |
| Filtering | Payload Filters, Indexed | GraphQL Where Clauses | Metadata Filters | SQL WHERE | Metadata Dict |
| Scale | 100M+ Vektoren | 100M+ Vektoren | 100M+ (Pods) | <10M Praktisch | <5M Praktisch |
| Best Für | Production RAG, Fast Filtering | Schema-Rich Daten, Multi-Tenancy | Zero-Ops Cloud | Bereits auf Postgres | Local Dev, Prototyping |
| Managed Cost | Free Tier + $0.08/GB | Free Tier + Compute | $0.096/1M Reads | Postgres Instance Kosten | Free Self-Host |

### Embedding-Modelle

Wähle Embedding-Modell bevor du Vector DB wählst — Modell bestimmt Dimensionalität und Qualität.

| Modell | Dims | Context | Best Für |
|---|---|---|---|
| `text-embedding-3-small` (OpenAI) | 1536 (Reducible) | 8191 Tokens | General Purpose, Cost-Efficient |
| `voyage-3` (Voyage AI) | 1024 | 32000 Tokens | Long Dokumente, RAG |
| `nomic-embed-text` (Local) | 768 | 8192 Tokens | On-Prem, Kein API-Kosten |

Nutze `text-embedding-3-small` als Standard, wenn du keinen spezifischen Grund brauchst, zu wechseln.

### Chunking-Strategie

Chunk bevor du Embed — die Embedding-Fenster ist dein Hard Constraint.

| Chunk-Größe | Nutze Wenn |
|---|---|
| 256 Tokens | High-Precision Retrieval, Kurze Factual Answers, FAQ |
| 512 Tokens | Balanced RAG — die meisten häufigen Standard |
| 1024 Tokens | Long-Form Context Erforderlich, Zusammenfassungs-Aufgaben |

Füge immer Overlap hinzu (10–20% der Chunk-Größe), um zu vermeiden, dass Context über Grenzen aufgeteilt wird.

### HNSW-Indexing-Parameter

HNSW (Hierarchical Navigable Small World) ist der Default-Index für alle Major Vector DBs.

| Parameter | Effect | Default | Tune Wenn |
|---|---|---|---|
| `m` | Graph Connectivity (Edges pro Node) | 16 | Erhöhe zu 32–64 für Higher Recall, Mehr RAM-Kosten |
| `ef_construction` | Build-Time Search Width | 100 | Erhöhe für bessere Index-Qualität, Slower Build |
| `ef` (Search) | Query-Time Search Width | 128 | Erhöhe für Higher Recall beim Query-Zeit |

Für Datasets unter 10,000 Vektoren, nutze einen Flat (Brute-Force) Index — HNSW hat Overhead, der nicht bei kleiner Scale gerechtfertigt ist.

### Qdrant

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(url="http://localhost:6333")

# Erstelle Collection
client.recreate_collection(
    collection_name="documents",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
)

# Upsert — Immer Batch, Niemals One-at-a-Time
points = [
    PointStruct(
        id=i,
        vector=embedding,
        payload={"text": chunk, "source": filename, "page": page_num},
    )
    for i, (embedding, chunk, filename, page_num) in enumerate(records)
]
client.upsert(collection_name="documents", points=points, wait=True)

# Suche mit Payload Filter
results = client.search(
    collection_name="documents",
    query_vector=query_embedding,
    limit=5,
    with_payload=True,
)

for r in results:
    print(r.score, r.payload["text"])
```

Index Payload-Felder, die du filterst:

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

# Serverless (empfohlen — kein Pod-Management)
pc.create_index(
    name="documents",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
)

index = pc.Index("documents")

# Namespace Isolation — Nutzen für Multi-Tenant Apps
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

### pgvector

Best Wenn: Du läufst bereits Postgres, dein Vector Dataset bleibt unter ~5–10M Rows, und du möchtest keine neue Infrastruktur-Abhängigkeit hinzufügen.

```sql
-- Enable Extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabelle mit Vector Column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    source TEXT,
    embedding vector(1536)
);

-- HNSW Index
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Similarity Search mit Filter
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

# Insert mit Embedding
cur.execute(
    "INSERT INTO documents (content, source, embedding) VALUES (%s, %s, %s)",
    (chunk, filename, embedding.tolist()),
)
conn.commit()

# Query
cur.execute(
    "SELECT content, 1 - (embedding <=> %s::vector) AS score "
    "FROM documents ORDER BY embedding <=> %s::vector LIMIT 5",
    (query_embedding.tolist(), query_embedding.tolist()),
)
rows = cur.fetchall()
```

### Hybrid Search

Dense (Semantic) + Sparse (Keyword/BM25) Retrieval kombiniert mit Reciprocal Rank Fusion (RRF):

```python
# Qdrant Sparse + Dense Hybrid
from fastembed import SparseTextEmbedding

sparse_model = SparseTextEmbedding("prithvida/Splade_PP_en_v1")
sparse_vec = list(sparse_model.embed([query]))[0]

results = client.query_points(
    collection_name="documents",
    prefetch=[
        {"query": {"indices": sparse_vec.indices.tolist(), "values": sparse_vec.values.tolist()}, "using": "sparse", "limit": 20},
        {"query": dense_embedding, "using": "dense", "limit": 20},
    ],
    query={"fusion": "rrf"},  # RRF Reranking
    limit=5,
)
```

RRF Formula: `score = sum(1 / (k + rank_i))` wo `k=60` ist Standard.

### Produktions-Patterns

**Batched Upserts**: Upsert immer in Batches von 100–500. Single-Record Inserts sind 10–50x langsamer.

**Index Warm-Up**: Nach dem Laden eines großen Index, laufe ein Paar Dummy-Queries vor Serving Traffic — HNSW Graph-Traversal ist slow auf First-Access.

**Dimensionality**: Nutze die Minimums-Dimension, die deinen Quality-Bar erfüllt. 256-dim `text-embedding-3-small` Vektoren nutzen 4x weniger RAM und Storage als 1536-dim.

**Payload vs. Separate Store**: Speichere nur filterable Metadaten im Vector DB Payload. Speichere große Text-Blobs in S3/Postgres und Join mit ID bei Query-Zeit.

## Beispiel

RAG Pipeline mit Qdrant und Claude: Zeige Setup-Collection, Embed und Ingest Documents, Retrieve Top-K, Augment Prompt, Query Claude.
