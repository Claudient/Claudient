import { useState } from "react";

const sections: Record<string, { title: string; topic: string; body: string; code?: string }> = {
  "auto-mode": {
    title: "Auto Mode",
    topic: "Claude Code Features",
    body: "Auto Mode lets Claude Code work autonomously — executing multi-step tasks, creating files, running commands, and committing changes without requiring approval at each step.",
    code: `claude --auto "Refactor the auth module to use JWT"\n\n# Or in CLAUDE.md:\nauto_mode: true\nallowed_tools: [Bash, Write, Edit]`,
  },
  "agent-teams": {
    title: "Agent Teams",
    topic: "Agent Development",
    body: "Orchestrate multiple specialized agents working together. Each agent has its own tools, context, and domain knowledge, coordinated by an orchestrator.",
    code: `# In CLAUDE.md:\nagent_teams:\n  orchestrator: lead-engineer\n  agents:\n    - code-reviewer\n    - security-auditor\n    - test-generator`,
  },
  "extended-thinking": {
    title: "Extended Thinking",
    topic: "Claude Code Features",
    body: "Extended thinking gives Claude more time to reason through complex problems. Enable it for architecture decisions, debugging, and complex refactoring.",
    code: `# Enable in CLAUDE.md:\nextended_thinking: true\nthinking_budget: high  # low | medium | high`,
  },
  "hooks": {
    title: "Hooks",
    topic: "Integrations",
    body: "Hooks let you run custom logic at key points in Claude's workflow — before/after tool calls, on file changes, on errors, and on session events.",
    code: `# .claude/hooks/pre-commit.sh\n#!/bin/bash\nnpm run lint\nnpm run test:quick`,
  },
  "context-budget": {
    title: "Context Budget Management",
    topic: "Usage & Optimization",
    body: "Manage your context window efficiently with automatic summarization, priority filtering, and context compression strategies.",
  },
  "mcp-setup": {
    title: "MCP Server Setup",
    topic: "Integrations",
    body: "Model Context Protocol servers extend Claude's capabilities with external tools. Claudient provides 41 ready-to-use MCP configurations.",
    code: `# In claude_desktop_config.json:\n{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["mcp-github-server"]\n    }\n  }\n}`,
  },
};

const keys = Object.keys(sections);
const topics = [...new Set(Object.values(sections).map(s => s.topic))];

export function GuidesApp() {
  const [active, setActive] = useState("auto-mode");
  const doc = sections[active];

  return (
    <div className="h-full flex">
      <aside className="w-52 shrink-0 border-r border-hairline bg-cream p-3 overflow-auto">
        <div className="flex items-center gap-2 rounded-md border border-hairline bg-white px-2.5 py-1.5 text-[12px] text-mute">
          🔎 Search guides…
        </div>
        {topics.map(topic => (
          <div key={topic}>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-mute px-1">{topic}</div>
            <div className="mt-1.5 space-y-0.5">
              {keys.filter(k => sections[k].topic === topic).map(k => (
                <button
                  key={k}
                  onClick={() => setActive(k)}
                  className={`w-full text-left rounded-md px-2.5 py-1.5 text-[12.5px] transition ${
                    k === active ? "bg-white border border-hairline font-semibold text-brand-teal" : "text-body hover:bg-white/60"
                  }`}
                >
                  {sections[k].title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <article className="flex-1 min-w-0 overflow-auto px-7 py-7">
        <div className="text-[12px] text-mute">{doc.topic}</div>
        <h1 className="mt-1 text-2xl font-extrabold text-ink">{doc.title}</h1>
        <p className="mt-3 text-[14px] text-body leading-relaxed max-w-xl">{doc.body}</p>
        {doc.code && (
          <pre className="mt-5 rounded-xl bg-[#1d1f27] text-[#e6e6e6] p-4 text-[12.5px] font-mono leading-relaxed overflow-auto">
            <code>{doc.code}</code>
          </pre>
        )}
        <div className="mt-6 rounded-lg border-l-4 border-brand-blue bg-brand-blue/10 px-4 py-3 text-[12.5px] text-body">
          💡 <strong>Tip:</strong> All 100+ guides are available in the Claudient repository. Install with <code className="bg-white px-1 py-0.5 rounded text-[11px]">/plugin marketplace add Claudient/Claudient</code>
        </div>
      </article>
    </div>
  );
}
