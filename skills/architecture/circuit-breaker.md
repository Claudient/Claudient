---
name: circuit-breaker
description: "Protect systems from cascading failures by wrapping external integrations in a stateful Circuit Breaker helper"
updated: 2026-06-23
---

# Circuit Breaker Pattern Skill

## When to activate

- Making HTTP or RPC network calls to unreliable external dependencies, third-party APIs, or downstream microservices.
- Preventing system resources (connection pools, memory threads) from being exhausted by slow or hanging upstream dependencies.
- Gracefully failing fast and providing fallback responses during API degradation.

## When NOT to use

- Local in-memory function calls or reliable databases within the same local network.
- Simple non-critical scripts where slow calls are acceptable.

## Instructions

Maintain three distinct states inside the breaker object:

1. **CLOSED State (Normal)**:
   - Allow requests to pass through to the dependency. Keep a sliding-window counter of failures.
   - **Trigger**: Switch to **OPEN** if failure rate exceeds threshold (e.g. 50% failures over 10 seconds).
2. **OPEN State (Blocked)**:
   - Block all requests immediately, failing fast by returning cached data, default fallback values, or an error.
   - **Trigger**: Start a sleep window timer (e.g. 30 seconds). Transition to **HALF-OPEN** when the timer expires.
3. **HALF-OPEN State (Testing)**:
   - Allow a limited number of test requests to pass through.
   - **Trigger**: If any test request fails, return to **OPEN**. If all test requests succeed, return to **CLOSED**.

---

## Example

```typescript
type BreakerState = "CLOSED" | "OPEN" | "HALF-OPEN";

class CircuitBreaker {
  private state: BreakerState = "CLOSED";
  private failureCount = 0;
  private lastStateChange = Date.now();

  constructor(
    private threshold = 5,
    private cooldownMs = 15000
  ) {}

  async execute(action: () => Promise<any>, fallback: () => any) {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastStateChange > this.cooldownMs) {
        this.state = "HALF-OPEN";
      } else {
        return fallback(); // Fail fast using fallback
      }
    }

    try {
      const result = await action();
      if (this.state === "HALF-OPEN") {
        this.reset();
      }
      return result;
    } catch (err) {
      this.failureCount++;
      if (this.failureCount >= this.threshold) {
        this.state = "OPEN";
        this.lastStateChange = Date.now();
      }
      return fallback();
    }
  }

  private reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
  }
}
```
