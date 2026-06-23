---
name: saga-pattern
description: "Coordinate distributed transactions across multiple microservices using Saga Orchestration or Choreography patterns"
updated: 2026-06-23
---

# Saga Pattern Distributed Transactions Skill

## When to activate

- Designing workflows that require transactional consistency across multiple isolated microservices.
- Managing long-running business processes involving multiple distinct state transitions.
- Requiring reliable rollback mechanisms (compensating transactions) if a step in a distributed sequence fails.

## When NOT to use

- Monolithic systems where standard SQL database transactions (ACID) are available.
- Simple workflows that don't modify state across database boundaries.

## Instructions

Choose between two Saga topologies and implement reliable compensating actions:

### 1. Saga Orchestration
- Use a central coordinator (Orchestrator) to tell each service what task to execute.
- **Action**: Build an orchestrator class or service that manages execution state, invokes steps, and catches failures to trigger rollbacks.

### 2. Saga Choreography
- Services publish and listen to events (e.g., via Kafka, RabbitMQ) to self-coordinate.
- **Action**: Define clear event schemas and ensure each service handles step completion and compensation triggers.

### 3. Compensating Transactions (Rollback)
- For every forward action (e.g., `ChargeCreditCard`), define an explicit backward/undo action (e.g., `RefundCreditCard`).
- **Action**: Implement idempotency on all handlers so retried forward or compensating calls do not create duplicate side effects.

---

## Example (Orchestration Saga Workflow)

```typescript
interface SagaStep {
  execute(): Promise<boolean>;
  compensate(): Promise<void>;
}

class OrderCreationSaga {
  private steps: SagaStep[] = [];

  constructor(
    private paymentService: PaymentService,
    private inventoryService: InventoryService
  ) {}

  async runSaga() {
    const completedSteps: SagaStep[] = [];
    try {
      for (const step of this.steps) {
        const success = await step.execute();
        if (!success) throw new Error("Step failed");
        completedSteps.push(step);
      }
    } catch (error) {
      // Rollback completed steps in reverse order
      for (const step of completedSteps.reverse()) {
        await step.compensate();
      }
      throw error;
    }
  }
}
```
