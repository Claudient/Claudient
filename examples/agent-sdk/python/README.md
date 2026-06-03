# Claude Agent SDK — Python Starter

A minimal, runnable autonomous agent using the Anthropic Python SDK.
Demonstrates the query loop, tool dispatch, a PreToolUse safety hook,
and prompt caching — all in a single file.

## What it does

`agent.py` runs a **query loop** that:

1. Sends a user message to `claude-opus-4-8` with adaptive thinking enabled
2. Executes any `Read`, `Edit`, or `Bash` tool calls the model requests
3. Feeds results back and loops until `stop_reason == "end_turn"`

It also shows two additional patterns in the same file:

- **PreToolUse hook** — `_pre_tool_use_hook()` inspects every `Bash` command
  before execution and blocks anything matching `rm -rf` or `sudo rm`
- **Prompt caching** — the system prompt is marked with `cache_control` so
  repeated turns reuse the cached prefix (visible in `usage.cache_read_input_tokens`)

## Quick start

```bash
# 1. Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# 2. Install the dependency
pip install -r requirements.txt

# 3. Run the agent
python agent.py
```

The agent will create `/tmp/hello_claude.py`, execute it, and print the output.

## Files

| File | Purpose |
|---|---|
| `agent.py` | Single-file agent with query loop, hook, and caching |
| `requirements.txt` | Python dependency (`anthropic>=0.92.0`) |

## Customise

- **Change the task** — edit the `run_agent(...)` call at the bottom of `agent.py`
- **Add tools** — append entries to the `tools` list and add a handler in `_dispatch_tool`
- **Tighten the hook** — extend `blocked_patterns` in `_pre_tool_use_hook`
- **Adjust effort** — change `output_config={"effort": "high"}` to `"xhigh"` for
  long-horizon agentic work or `"medium"` for cost-sensitive tasks

## Key SDK patterns used

```python
# Adaptive thinking (required for Opus 4.8)
thinking={"type": "adaptive"}

# Effort level (xhigh is the Claude Code default for coding/agentic work)
output_config={"effort": "high"}

# Prompt caching on the system prompt
system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}]

# Append full content — never just the text — to preserve tool_use blocks
messages.append({"role": "assistant", "content": response.content})
```

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
