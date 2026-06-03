"""
Claudient — Agent SDK Starter Template (Python)
Requires: anthropic >= 0.92.0
"""

import os
import anthropic

# ---------------------------------------------------------------------------
# CLIENT
# ---------------------------------------------------------------------------

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

MODEL = "claude-opus-4-8"

SYSTEM_PROMPT = """\
You are a senior software engineer assistant.
You have access to Read, Edit, and Bash tools.
Think carefully before making any changes to the filesystem.
Complete tasks autonomously and report what you did when finished.\
"""

# ---------------------------------------------------------------------------
# EXAMPLE 1 — Minimal query loop
# ---------------------------------------------------------------------------

def run_agent(user_message: str) -> None:
    """Run a minimal agentic loop with Read, Edit, and Bash tools."""

    messages: list[anthropic.types.MessageParam] = [
        {"role": "user", "content": user_message}
    ]

    tools: list[anthropic.types.ToolParam] = [
        {
            "name": "Read",
            "description": "Read a file from the filesystem and return its contents.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Absolute path to the file"}
                },
                "required": ["path"],
            },
        },
        {
            "name": "Edit",
            "description": "Write or overwrite the contents of a file.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Absolute path to the file"},
                    "content": {"type": "string", "description": "New file content"},
                },
                "required": ["path", "content"],
            },
        },
        {
            "name": "Bash",
            "description": "Run a bash command and return stdout + stderr.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "command": {"type": "string", "description": "Shell command to execute"}
                },
                "required": ["command"],
            },
        },
    ]

    print(f"\n[user] {user_message}\n")

    while True:
        # Prompt caching: cache the stable system prompt prefix on every turn
        response = client.messages.create(
            model=MODEL,
            max_tokens=16000,
            thinking={"type": "adaptive"},
            output_config={"effort": "high"},
            system=[
                {
                    "type": "text",
                    "text": SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            tools=tools,
            messages=messages,
        )

        # Print each content block as it arrives
        for block in response.content:
            if block.type == "thinking":
                print(f"[thinking] {block.thinking[:200]}{'...' if len(block.thinking) > 200 else ''}")
            elif block.type == "text":
                print(f"[assistant] {block.text}")
            elif block.type == "tool_use":
                print(f"[tool_use] {block.name}({block.input})")

        # Append assistant turn to history
        messages.append({"role": "assistant", "content": response.content})

        # Done when Claude stops calling tools
        if response.stop_reason == "end_turn":
            break

        # Execute every tool call and collect results
        tool_results: list[anthropic.types.ToolResultBlockParam] = []
        for block in response.content:
            if block.type != "tool_use":
                continue
            result = _dispatch_tool(block.name, block.input)
            print(f"[tool_result:{block.name}] {str(result)[:200]}")
            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(result),
                }
            )

        messages.append({"role": "user", "content": tool_results})


def _dispatch_tool(name: str, tool_input: dict) -> str:
    """Execute a tool call and return a string result."""
    import subprocess

    if name == "Read":
        try:
            with open(tool_input["path"]) as f:
                return f.read()
        except Exception as exc:
            return f"Error: {exc}"

    if name == "Edit":
        try:
            with open(tool_input["path"], "w") as f:
                f.write(tool_input["content"])
            return f"Written: {tool_input['path']}"
        except Exception as exc:
            return f"Error: {exc}"

    if name == "Bash":
        # ---------------------------------------------------------------------------
        # EXAMPLE 2 — PreToolUse hook that blocks dangerous commands
        # ---------------------------------------------------------------------------
        command = tool_input["command"]
        if _pre_tool_use_hook(command) is False:
            return "Blocked by PreToolUse hook: dangerous command refused."

        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30,
        )
        output = result.stdout + result.stderr
        return output or "(no output)"

    return f"Unknown tool: {name}"


def _pre_tool_use_hook(command: str) -> bool:
    """
    PreToolUse hook — inspect the command before execution.

    Returns False to block the tool call, True to allow it.
    This hook blocks any command containing 'rm -rf'.
    """
    blocked_patterns = ["rm -rf", "rm -rf /", "sudo rm"]
    for pattern in blocked_patterns:
        if pattern in command:
            print(f"[hook:PreToolUse] BLOCKED — command contains '{pattern}': {command!r}")
            return False
    return True


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    run_agent(
        "Create a short Python script at /tmp/hello_claude.py that prints "
        "'Hello from Claude!' then run it and show me the output."
    )
