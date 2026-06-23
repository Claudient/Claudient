---
name: outbox-pattern
description: "Implement the Transactional Outbox pattern to guarantee reliable message publishing and event-driven data consistency"
updated: 2026-06-23
---

# Transactional Outbox Pattern Skill

## When to activate

- Building event-driven architectures where database state updates must reliably trigger message publication.
- Eliminating split-brain scenarios (e.g. database save succeeds, but Kafka/RabbitMQ push fails).
- Requiring "at-least-once" delivery guarantees to downstream microservices.

## When NOT to use

- Systems where missing event notifications does not impact data consistency or business workflows.
- Low-complexity architectures without external message brokers.

## Instructions

Establish a reliable 2-phase publication flow:

1. **Write to Outbox Table in Transaction**:
   - Write your primary business entities (e.g., `Order`) and the event payload (e.g., `OrderCreatedEvent`) to an `outbox` table in the *same* database transaction.
2. **Asynchronously Read and Publish**:
   - Run a separate background worker or Change Data Capture (CDC) engine (e.g. Debezium) to poll or tail the `outbox` table.
3. **Mark or Delete Published Events**:
   - Once the message broker confirms receipt, mark the outbox row as `processed` or delete it to keep database storage footprint minimal.

---

## Example

```typescript
async function createOrderAndQueueEvent(order: Order, db: DbTransaction) {
  // 1. Save business model to primary table
  await db.table("orders").insert(order);

  // 2. Write event to outbox table inside same transaction
  const outboxEvent = {
    id: generateUUID(),
    aggregate_type: "Order",
    aggregate_id: order.id,
    event_type: "OrderCreated",
    payload: JSON.stringify(order),
    status: "pending",
    created_at: new Date()
  };
  await db.table("outbox").insert(outboxEvent);
}

// Background poller (running in separate worker)
async function publishOutboxEvents(db: DbConnection, broker: MessageBroker) {
  const pendingEvents = await db.query("SELECT * FROM outbox WHERE status = 'pending' LIMIT 100");
  for (const event of pendingEvents) {
    await broker.publish(event.event_type, JSON.parse(event.payload));
    // 3. Mark as processed once broker confirms receipt
    await db.query("UPDATE outbox SET status = 'processed' WHERE id = ?", [event.id]);
  }
}
```
