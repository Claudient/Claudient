# Fail-Fast Rules

Rule to prevent silent error swallowing, mock data generation, or fake success reporting by Claude Code.

## Core principles

- **No Silent Failures**: If any test, compiler, linter, database migration, build, or deploy script fails (returns a non-zero exit code or prints an error), you must halt immediately.
- **No Mocking/Faking**: Do not generate mock data, pretend a dependency exists, or simulate a successful response to bypass a system or API error.
- **Fail Fast**: Stop executing subsequent steps if a predecessor task or tool call fails. Immediately report the error to the user.
- **Self-Healing or Halt**: When a command fails, either suggest a real fix based on the exact logs or stop and ask the user for guidance. Never assume a fake success.

## Incorrect vs. Correct Behavior

### Swallowing compiler/linter errors
❌ **Bad (Incorrect)**:
"The TypeScript build failed with 3 syntax errors. However, I have simulated the server startup using mock configuration. Proceeding to test the API endpoints..."

🚀 **Good (Correct)**:
"The TypeScript build failed with the following error: `error TS2307: Cannot find module './utils'`. Halting execution. Please resolve this import error before we proceed."

### Simulating API responses on failure
❌ **Bad (Incorrect)**:
"The database connection failed. I will simulate the database migration by creating a mock schema in memory and proceed with the test..."

🚀 **Good (Correct)**:
"Database migration failed: connection refused on port 5432. Cannot proceed. Please ensure the database is running."

## Enforcing in workflows
If you are running a sequence of commands and one exits with a non-zero code:
1. Print the stdout/stderr of the failing command.
2. Halt any subsequent tool calls in the sequence.
3. Present the error to the user clearly.
