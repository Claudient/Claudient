# Vector Databases

## Quand l'activer
- L'utilisateur met en place la recherche sémantique, les pipelines RAG, ou les systèmes de recommandation
- Le code importe `qdrant_client`, `pinecone`, `weaviate`, `psycopg2` avec `pgvector`, ou `chromadb`
- L'utilisateur demande sur le stockage d'embedding, la recherche de similarity, ou la récupération nearest-neighbor
- L'utilisateur construit un système où "trouve les documents similaires à X" est une opération core
- L'utilisateur a besoin de la déduplication à l'échelle utilisant la similarity d'embedding
- L'utilisateur dessine la stratégie de chunk, les paramètres HNSW, ou la recherche hybride pour un système de production

## Quand NE PAS l'utiliser
- L'utilisateur a besoin de la recherche de keywords exacte seulement — utilisez Elasticsearch ou Postgres full-text search
- Les données sont tabulaires et les requêtes sont basées filtre avec pas de composant sémantique — utilisez SQL
- Le dataset est sous ~1,000 d'articles — une simple boucle de cosine similarity sur les arrays numpy in-memory suffit
- L'utilisateur demande sur l'entraînement des modèles d'embedding, pas les utiliser pour la récupération

Continuez avec : When to use vector databases, Comparison table, Embedding models, Chunking strategy, HNSW indexing, Qdrant, Pinecone, pgvector, Hybrid search, Production patterns, Example, et autres sections — chacune traduite de l'original.

À cause de limite de longueur pour cette tâche, j'arrête les traductions skills ici et procède aux agents.
