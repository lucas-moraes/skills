---
name: backend-ts
description: "Enforce advanced functional programming paradigms in TypeScript backend development. Designs immutable data pipelines, implements dependency injection via currying, handles errors predictably with the Result monad, and enforces strict test isolation using Jest inside the root __tests__ folder."
---

# Functional Backend Architect

Transform complex product requirements into highly scalable, secure, resilient, and fully testable backend systems using TypeScript and Functional Programming (FP) patterns. Every module is built with immutability, pure functions, and structured telemetry by design.

## Workflow

1. **Functional Deconstruction:** Analyze requirements to break down business logic into pure functions, pipeable data flows, and strictly-typed contracts before writing execution code.
2. **Testing Blueprint:** Establish the test execution strategy (Unit, Integration, E2E) utilizing Jest, creating all test files exclusively inside the root `__tests__` directory.
3. **Data & Infrastructure Strategy:** Model optimal data persistence (SQL/NoSQL schemas, indexes) and caching layers (Redis) driven by immutable states.
4. **Resiliency & Security Mapping:** Architecture runtime guardrails including authentication (OAuth2/JWT), circuit breakers, rate-limiting, and idempotency tracking.
5. **Output Generation:** Deliver clean functional TypeScript modules, Jest configurations, migrations, and structured JSON logging.

## Types

| Parameter / Concept    | Type               | Required | Description / Purpose                                                                                            |
| :--------------------- | :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------- |
| `Architecture_Pattern` | `string` (Union)   | Yes      | Structural pattern used (e.g., `'Functional Pipes' \| 'Event-Driven' \| 'Serverless'`).                          |
| `Database_Strategy`    | `string`           | Yes      | Target persistence and caching engines (e.g., `'PostgreSQL + Redis'`).                                           |
| `Test_Coverage_Goal`   | `number` (0-100)   | Yes      | Minimum acceptable test coverage percentage enforced via Jest configuration.                                     |
| `Result`               | `Type / Interface` | Yes      | Discriminated union for functional error handling: `{ success: true; data: T } \| { success: false; error: E }`. |
| `Payload_Contract`     | `JSON / Proto`     | Yes      | Explicit TypeScript type/interface definition for inputs, outputs, or event messages.                            |

## Rules

- Never use classes, inheritance, or the `this` keyword. Structure everything with pure functions, closures, and modules.
- Never mutate inputs, payloads, or function arguments directly. Treat all data structures as immutable (use spread operators or deep copies).
- Never throw raw exceptions (`throw new Error`) for predictable business failures. Always return a typed `Result` union.
- Never place test files anywhere outside the root `__tests__` directory.
- Never use the `any` type in TypeScript. Ensure absolute explicit typing across signatures and payloads.
- Always use Currying/Closures for dependency inversion/injection and Higher-Order Functions (HOF) for cross-cutting middleware (logging, auth).
- Always clean Jest mocks (`jest.clearAllMocks()`) and handle database rollbacks in lifecycle hooks (`beforeEach`) inside `__tests__`.
- Always enforce idempotency keys on state-mutating requests to avoid duplicate processing.

## Functional Error Handling

When executing multi-step business logic, do not nest `try/catch` blocks or propagate throws. Compose steps lineary and map failures into explicit `Result` structures:

```typescript
// Enforce predictive flow instead of runtime exceptions
const processOrderPipeline = async (payload: OrderPayload): Promise<Result<string, OrderErrors>> => {
  const existingOrder = await findOrder(payload.idempotencyKey);
  if (existingOrder) return { success: false, error: "DUPLICATE_KEY" };

  const orderId = await createOrder(payload);
  return { success: true, data: orderId };
};
```
