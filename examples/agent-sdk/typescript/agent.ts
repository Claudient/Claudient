/**
 * Claudient — Agent SDK Starter Template (TypeScript)
 * Requires: @anthropic-ai/sdk >= 0.88.0, tsx (or ts-node)
 */

import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

// ---------------------------------------------------------------------------
// CLIENT
// ---------------------------------------------------------------------------

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-opus-4-8";

const SYSTEM_PROMPT = `\
You are a senior software engineer assistant.
You have access to Read, Edit, and Bash tools.
Think carefully before making any changes to the filesystem.
Complete tasks autonomously and report what you did when finished.`;

// ---------------------------------------------------------------------------
// TOOL DEFINITIONS
// ---------------------------------------------------------------------------

const TOOLS: Anthropic.Messages.ToolUnion[] = [
  {
    name: "Read",
    description: "Read a file from the filesystem and return its contents.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "Absolute path to the file" },
      },
      required: ["path"],
    },
  },
  {
    name: "Edit",
    description: "Write or overwrite the contents of a file.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "Absolute path to the file" },
        content: { type: "string", description: "New file content" },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "Bash",
    description: "Run a bash command and return stdout + stderr.",
    input_schema: {
      type: "object" as const,
      properties: {
        command: { type: "string", description: "Shell command to execute" },
      },
      required: ["command"],
    },
  },
];

// ---------------------------------------------------------------------------
// EXAMPLE 2 — PreToolUse hook that blocks dangerous commands
// ---------------------------------------------------------------------------

/**
 * PreToolUse hook — inspect a Bash command before execution.
 * Returns false to block the call, true to allow it.
 */
function preToolUseHook(command: string): boolean {
  const blockedPatterns = ["rm -rf", "rm -rf /", "sudo rm"];
  for (const pattern of blockedPatterns) {
    if (command.includes(pattern)) {
      console.log(
        `[hook:PreToolUse] BLOCKED — command contains '${pattern}': ${JSON.stringify(command)}`
      );
      return false;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// TOOL DISPATCHER
// ---------------------------------------------------------------------------

function dispatchTool(name: string, toolInput: Record<string, string>): string {
  if (name === "Read") {
    try {
      return readFileSync(toolInput.path, "utf8");
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  if (name === "Edit") {
    try {
      writeFileSync(toolInput.path, toolInput.content, "utf8");
      return `Written: ${toolInput.path}`;
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  if (name === "Bash") {
    if (!preToolUseHook(toolInput.command)) {
      return "Blocked by PreToolUse hook: dangerous command refused.";
    }
    try {
      const output = execSync(toolInput.command, {
        encoding: "utf8",
        timeout: 30_000,
        stdio: ["pipe", "pipe", "pipe"],
      });
      return output || "(no output)";
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "stdout" in err &&
        "stderr" in err
      ) {
        const e = err as { stdout?: string; stderr?: string };
        return (e.stdout ?? "") + (e.stderr ?? "");
      }
      return `Error: ${err}`;
    }
  }

  return `Unknown tool: ${name}`;
}

// ---------------------------------------------------------------------------
// EXAMPLE 1 — Minimal query loop
// ---------------------------------------------------------------------------

async function runAgent(userMessage: string): Promise<void> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  console.log(`\n[user] ${userMessage}\n`);

  while (true) {
    // Prompt caching: cache the stable system prompt prefix on every turn
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16_000,
      thinking: { type: "adaptive" },
      output_config: { effort: "high" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // @ts-expect-error — cache_control pending public SDK types
          cache_control: { type: "ephemeral" },
        },
      ],
      tools: TOOLS,
      messages,
    });

    // Print each content block
    for (const block of response.content) {
      if (block.type === "thinking") {
        const preview =
          block.thinking.length > 200
            ? block.thinking.slice(0, 200) + "..."
            : block.thinking;
        console.log(`[thinking] ${preview}`);
      } else if (block.type === "text") {
        console.log(`[assistant] ${block.text}`);
      } else if (block.type === "tool_use") {
        console.log(`[tool_use] ${block.name}(${JSON.stringify(block.input)})`);
      }
    }

    // Append assistant turn to history — must include full content array
    messages.push({ role: "assistant", content: response.content });

    // Done when Claude stops calling tools
    if (response.stop_reason === "end_turn") {
      break;
    }

    // Execute every tool call and collect results
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== "tool_use") continue;

      const result = dispatchTool(
        block.name,
        block.input as Record<string, string>
      );
      const preview = result.length > 200 ? result.slice(0, 200) : result;
      console.log(`[tool_result:${block.name}] ${preview}`);

      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: result,
      });
    }

    messages.push({ role: "user", content: toolResults });
  }
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

await runAgent(
  "Create a short TypeScript file at /tmp/hello_claude.ts that console.logs " +
    "'Hello from Claude!' then run it with ts-node (or node --input-type=module) " +
    "and show me the output."
);
