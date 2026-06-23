---
name: cqrs-pattern
description: "Segregate read (Query) operations from write (Command) operations to optimize performance, scaling, and database mapping"
updated: 2026-06-23
---

# CQRS (Command Query Responsibility Segregation) Skill

## When to activate

- High-throughput applications where read workloads scale independently of write workloads.
- Optimizing database queries that require denormalized schemas or full-text search indexes (e.g., Elasticsearch, Redis).
- Systems utilizing Event Sourcing to build dynamic read projection views.

## When NOT to use

- Simple CRUD interfaces or internal admin panels with low query complexity.
- Small projects where maintaining separate write and read models introduces unnecessary overhead.

## Instructions

Maintain clean segregation between mutation models and presentation models:

1. **Separate Classes/Handlers**:
   - **Commands**: Encapsulate intent to change state (e.g., `CreateUserCommand`). They do not return data, only success/fail status.
   - **Queries**: Encapsulate intent to retrieve data (e.g., `GetUserByIdQuery`). They never mutate state.
2. **Isolate Database Models (Optional but recommended at scale)**:
   - Route writes (Commands) to a highly normalized relational database (OLTP).
   - Route reads (Queries) to a denormalized database, search index, or read replicas (OLAP).
3. **Handle Sync / Projections**:
   - Use asynchronous messaging (outbox/inbox, pub-sub) or DB replication to sync data from the write store to the read store.

---

## Example

```typescript
// Command Model (Write side)
class CreateOrderCommand {
  constructor(public readonly orderId: string, public readonly amount: number) {}
}

class CreateOrderHandler {
  async handle(command: CreateOrderCommand, db: WriteDbConnection) {
    // Normalised SQL write
    await db.execute("INSERT INTO orders (id, amount, status) VALUES (?, ?, 'pending')", [command.orderId, command.amount]);
  }
}

// Query Model (Read side - Denormalized view)
class GetOrderDetailsQuery {
  constructor(public readonly orderId: string) {}
}

class GetOrderDetailsHandler {
  async handle(query: GetOrderDetailsQuery, searchIndex: ReadElasticsearchClient) {
    // Fast read optimized for layout UI presentation
    return await searchIndex.getById(query.orderId);
  }
}
```
