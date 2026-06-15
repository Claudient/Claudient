# MCP: MongoDB

Query, insert, update, and manage MongoDB data directly from Claude Code — across local instances, Atlas clusters, and serverless deployments — without switching to MongoDB Compass or writing one-off scripts.

## Why you need this

MongoDB is the document database of choice for many Node.js and Python applications. Without MCP, accessing it means context-switching to Compass, the `mongosh` shell, or writing throwaway query scripts. With MongoDB MCP:
- Claude can explore collections, inspect schemas, and run aggregations inside the coding session
- Data migrations and seed scripts are generated and validated against the actual database structure
- Query optimization happens with real explain plans, not theoretical advice
- Routine support tasks (finding users, checking order state, debugging data issues) take seconds

## Installation

```bash
npm install -g @anthropic/mcp-mongodb
```

Or use the community server:

```bash
npm install -g mcp-mongodb-server
```

## Configuration

Add to `~/.claude.json` or project `.claude/mcp.json`:

**Local MongoDB:**
```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "mcp-mongodb-server"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017/myapp"
      }
    }
  }
}
```

**MongoDB Atlas (cloud):**
```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "mcp-mongodb-server"],
      "env": {
        "MONGODB_URI": "mongodb+srv://username:password@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority"
      }
    }
  }
}
```

Use a read-only database user for development config. Never use admin credentials in committed config files.

## Key tools

- `list_databases` — list all databases on the server
- `list_collections` — list collections in a database with document count and size
- `describe_collection` — show collection schema inferred from sample documents (field types, indexes, validation rules)
- `find_documents` — query documents with MongoDB query syntax (`{field: {$gt: value}}`)
- `aggregate` — run aggregation pipelines (`$match`, `$group`, `$lookup`, `$project`, `$sort`)
- `insert_document` — insert a single document into a collection
- `insert_many` — insert multiple documents in one operation
- `update_documents` — update documents matching a filter (`$set`, `$inc`, `$push`, `$pull`)
- `delete_documents` — delete documents matching a filter
- `create_index` — create an index on specified fields (single, compound, or text)
- `explain_query` — get the query execution plan (winning plan, index usage, documents examined)

## Usage examples

```
Show me all collections in the myapp database with their document counts
and total storage size. Identify any empty or near-empty collections.
```

```
Find all users created in the last 7 days who haven't completed onboarding.
Include their email, signup date, and the last step they reached.
```

```
Run an aggregation to calculate monthly revenue for the past 12 months —
group orders by month, sum the total field, and sort chronologically.
```

```
Explain the query performance for finding orders by customer_id.
If there's no index on customer_id, create one and re-explain.
```

```
Find all products with price below $10 and inventory count of 0.
These are out-of-stock cheap items — list them for a restock report.
```

```
Look at the schema of the orders collection — what fields exist,
what types are they, and which fields have indexes? I need this
to write a migration that adds a new status field.
```

## Authentication

**Local MongoDB (no auth):**
```
mongodb://localhost:27017/myapp
```

**MongoDB Atlas:**
1. Go to **Atlas → Database Access → Add New Database User**
2. Create a user with **Read and write to any database** (or scope to specific DB)
3. Go to **Network Access → Add IP Address** and whitelist your IP (or use `0.0.0.0/0` for dev)
4. Get connection string from **Clusters → Connect → Connect your application**
5. Replace `<password>` with the database user password
6. Set as `MONGODB_URI` in the config above

**SCRAM vs X.509:** Most Atlas connections use SCRAM-SHA-256 (default). If your org uses X.509 certificates, add `authMechanism=MONGODB-X509` to the connection string and point to the cert file.

## Tips

**Use read-only users for development:** Create a database user with only `read` role on your development database. Use this for local MCP config. Write operations should use a separate user that's only configured in CI/CD environments.

**Explain before optimizing:** Always run `explain_query` before suggesting index changes. The winning plan shows whether MongoDB is already using an index or doing a collection scan (COLLSCAN). Only add indexes when there's a clear COLLSCAN on a frequently-queried field.

**Aggregation pipeline complexity:** Start simple with `$match` → `$group` → `$sort`. Add `$lookup` (joins) and `$unwind` (array expansion) only when needed. Complex pipelines are harder to debug — build them incrementally and verify output at each stage.

**Schema inference is sample-based:** `describe_collection` infers schema from a sample of documents. If your collection has inconsistent document shapes (some with field X, some without), the inferred schema may not represent all documents. Use `find_documents` with specific queries to verify edge cases.

**Connection pooling:** MCP maintains a connection pool to MongoDB. If you see "too many connections" errors in your MongoDB logs, the pool size may be too large for your Atlas tier. Free tier (M0) allows 500 connections; shared tiers allow more.

**Never expose Atlas credentials:** Store `MONGODB_URI` in environment variables or `.env` files (gitignored), not in committed `.claude/mcp.json` files. Use `.claude/mcp.json.example` with a placeholder for team reference.

---
