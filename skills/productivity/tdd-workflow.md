---
name: tdd-workflow
description: "Enforce a strict Test-Driven Development (TDD) execution sequence: write failing test, write minimal code, refactor code"
updated: 2026-06-23
---

# Test-Driven Development (TDD) Workflow Skill

## When to activate

- Building a new feature or module from scratch where specifications are well-defined.
- Fixing a reported bug (writing a reproduction test first).
- Ensuring high test coverage and robust software design.

## When NOT to use

- Exploratory coding or prototyping where requirements are highly volatile.
- UI/UX layout refinements or pure styling exercises (e.g. Tailwind updates).

## Instructions

Follow the strict three-stage red-green-refactor lifecycle:

### Stage 1: Red (Write a Failing Test)
1. Do not write any implementation code yet.
2. Define a new test in the test suite describing the expected input, conditions, and outputs.
3. Run the test suite and verify that the new test **fails** (typically with a compilation error or assertion failure).

### Stage 2: Green (Write Minimal Code)
1. Write the absolute minimum implementation code necessary to make the failing test pass.
2. Avoid over-engineering or writing extra helper functions not validated by the test suite.
3. Run the tests and ensure the test suite compiles and runs successfully (**green**).

### Stage 3: Refactor (Clean up the Code)
1. Review the newly written code for code smells, duplicates, or readability issues.
2. Clean up formatting, structure, and naming conventions without changing functional behavior.
3. Verify that all tests remain green after refactoring.

---

## Example

```typescript
// Stage 1: Red - Write failing test first
// calc.test.ts
test("adds numbers correctly", () => {
  expect(add(2, 3)).toBe(5);
});

// Stage 2: Green - Write minimal code
// calc.ts
export function add(a: number, b: number) {
  return a + b;
}

// Stage 3: Refactor - Clean up code (e.g. typescript optimization)
export const add = (a: number, b: number): number => a + b;
```
