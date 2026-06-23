---
name: strangler-fig
description: "Deconstruct monolith codebases into microservices iteratively using the Strangler Fig pattern"
updated: 2026-06-23
---

# Strangler Fig Monolith Migration Skill

## When to activate

- Deconstructing a legacy monolith or single large module into decoupled microservices.
- Safely extracting domain boundaries or bounded contexts without stopping the system.
- Designing routing proxies, facades, or API gateways to intercept and redirect requests.

## When NOT to use

- Building a brand new (greenfield) system from scratch.
- Minor refactoring within the same application boundary.
- Basic routing adjustments unrelated to codebase migration.

## Instructions

Implement the migration in an iterative, low-risk sequence:

1. **Identify the Target Domain**: Select a cohesive, low-risk bounded context from the monolith to extract first (e.g., Notifications or Billing).
2. **Build a Facade**: Introduce an interception layer (API Gateway, reverse proxy, or code-level facade) in front of the monolith.
3. **Implement the New Service**: Develop the new microservice or module with isolated data storage.
4. **Deploy and Route**: Configure the facade to direct a subset of traffic (e.g., specific paths or tenants) to the new service while routing the rest to the legacy monolith.
5. **Monitor and Cutover**: Shift 100% of traffic to the new service once validated, then safely delete or disable the corresponding legacy code inside the monolith.

---

## Example

```typescript
// BEFORE: Monolith controller handling everything directly
class LegacyAppRouter {
  route(path: string, payload: any) {
    if (path === "/orders") {
      return new LegacyOrderService().process(payload);
    }
    // ... other legacy routes ...
  }
}

// AFTER: Strangler Facade routing target endpoints to the new microservice
class StranglerRouterFacade {
  private newOrderClient = new NewOrderServiceClient();
  private legacyRouter = new LegacyAppRouter();

  async route(path: string, payload: any) {
    if (path === "/orders") {
      // Intercept and route to new decoupled microservice
      return await this.newOrderClient.processOrder(payload);
    }
    // Fall back to the legacy monolith for other paths
    return this.legacyRouter.route(path, payload);
  }
}
```
