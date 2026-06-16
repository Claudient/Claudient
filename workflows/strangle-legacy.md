# Legacy Strangler Workflow

This workflow guides you through safely replacing a legacy monolith using the Strangler Fig pattern.

## The Goal
To incrementally migrate a legacy system (e.g., a massive PHP/Java app, or a tightly coupled monolith) to a modern architecture (e.g., microservices, serverless, or a new framework) without downtime, by replacing specific functionalities piece by piece.

## When to use
When the user states they want to "rewrite", "migrate", or "strangle" an older application or a highly complex, tightly coupled module.

## Workflow Steps

### Phase 1: Context Mapping & Boundary Identification
1. **Identify the Target:** Ask the user which specific feature or domain within the legacy monolith is the target for extraction (e.g., "User Authentication" or "Order Processing").
2. **Dependency Tracing:** Use `grep` and file reading to trace all inbound and outbound dependencies of the target module. What database tables does it touch? What other modules call its functions?
3. **Define the Seam:** Propose an API boundary or "seam" where the legacy application can intercept calls and route them to the new service.

### Phase 2: Facade Creation (The Strangler Fig)
4. **Implement the Facade:** Guide the user to create a routing layer (an API Gateway, a reverse proxy config like Nginx, or a facade class in the legacy code).
5. **Route Definition:** Configure the facade to route requests for the *target feature* to the new (currently empty) service, while sending everything else to the legacy monolith.

### Phase 3: New Implementation
6. **Scaffold the New Service:** Generate the skeleton for the new microservice or module using the project's modern stack.
7. **Replicate Logic:** Carefully reimplement the business logic. **Crucial:** Refer back to the legacy code constantly to ensure edge cases are handled. Write tests immediately.
8. **Data Synchronization (If applicable):** If the new service uses a new database, establish a plan for dual-writing or migrating data.

### Phase 4: Cutover & Cleanup
9. **Dark Launch/Feature Flag:** Suggest deploying the new service behind a feature flag or using dark traffic (mirroring requests) to verify it works in production without affecting users.
10. **The Flip:** Once verified, instruct the user to update the facade to permanently route traffic to the new service.
11. **Delete Dead Code:** Finally, use Claude to safely identify and delete the now-unused legacy code.

## Rules of Engagement
- **Never suggest a "Big Bang" rewrite.** Always advocate for extracting one small piece at a time.
- Always prioritize establishing the boundary/API contract *before* writing the new logic.
- Remind the user about data consistency—code is easy to move, data is hard.