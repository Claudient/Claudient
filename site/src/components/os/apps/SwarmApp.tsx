import { useState, useEffect, useRef } from "react";
import { Eyebrow, YellowButton, Tag, Card } from "./ui";

interface StackDef {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  persona: string;
  skills: { name: string; purpose: string }[];
  cmds: { name: string; desc: string }[];
  hooks: { name: string; desc: string }[];
}

const STACKS: StackDef[] = [
  {
    id: "ai_sdr",
    name: "AI SDR",
    icon: "📞",
    desc: "Prospecting outreach and human-in-the-loop sales development pipeline.",
    color: "#f54e00",
    persona: "You are a senior SDR agent focused on outbound business development, hyper-personalized messaging, and CRM consistency. You do not deploy code, and you never contact opted-out prospects.",
    skills: [
      { name: "lead-scorer", purpose: "Score prospects 0-100 against ideal company profiles." },
      { name: "email-personalizer", purpose: "Draft targeted cold outreach using company trigger signals." },
      { name: "follow-up-scheduler", purpose: "Sequence Day 3/7/14 touchpoints to maximize replies." },
      { name: "crm-logger", purpose: "Safely sync outreach history to CRM without duplicates." }
    ],
    cmds: [
      { name: "/score-lead", desc: "Evaluate a prospect's seniority, company size, and fit." },
      { name: "/prospect-batch", desc: "Grade and queue a list of new inbound leads." },
      { name: "/execute-sequence", desc: "Stage outreach touchpoints pending manual approval." }
    ],
    hooks: [
      { name: "approval-gate", desc: "Stop send actions until a human explicitly reviews the copy." },
      { name: "email-compliance", desc: "Audit drafts for unsubscribe links and sender identity." }
    ]
  },
  {
    id: "fullstack",
    name: "Full-Stack Developer",
    icon: "⚡",
    desc: "End-to-end component engineering, database migrations, and testing.",
    color: "#3fb950",
    persona: "You are a principal fullstack engineer. You enforce rigorous testing, architectural decision logging (ADRs), type safety, and clean database schemas.",
    skills: [
      { name: "test-generator", purpose: "Write complete unit and integration tests for new features." },
      { name: "refactoring-recommender", purpose: "Audit files for code duplication, complex nesting, and tech debt." },
      { name: "adr-writer", purpose: "Draft and append Architecture Decision Records to the docs folder." },
      { name: "performance-analyzer", purpose: "Evaluate algorithm complexity, runtime metrics, and database hits." }
    ],
    cmds: [
      { name: "/review-pr", desc: "Audit changed files for unit test coverage and compliance rules." },
      { name: "/generate-tests", desc: "Create unit and integration test stubs for the current module." },
      { name: "/write-adr", desc: "Document a technical design decision with context and consequences." }
    ],
    hooks: [
      { name: "test-coverage-enforcer", desc: "Block execution if code edits drop project test coverage." },
      { name: "shadow-compiler", desc: "Auto-run the project's compiler (tsc, cargo check) after edits." }
    ]
  },
  {
    id: "devops",
    name: "DevOps Platform",
    icon: "🏗️",
    desc: "Infrastructure-as-code, Docker builds, Kubernetes, and logs auditing.",
    color: "#1d4aff",
    persona: "You are a senior site reliability and infrastructure architect. You ensure cost limits are respected, policies are strictly scanned, and downtime risks are mitigated.",
    skills: [
      { name: "iac-reviewer", purpose: "Audit Terraform files for security violations and cost leaks." },
      { name: "incident-runbook-builder", purpose: "Draft response manuals with detailed rollback procedures." },
      { name: "config-auditor", purpose: "Scan configuration states for credentials leaks and policy drifts." }
    ],
    cmds: [
      { name: "/review-iac", desc: "Scan Terraform modules for security and cost compliance." },
      { name: "/build-runbook", desc: "Create a play-by-play incident recovery step sheet." }
    ],
    hooks: [
      { name: "security-policy-check", desc: "Block edits containing plain-text keys or open firewall rules." },
      { name: "resource-limit-validator", desc: "Validate scaling limits and resource quotas before deploys." }
    ]
  },
  {
    id: "founder",
    name: "Founder / CEO",
    icon: "🚀",
    desc: "Strategic fundraising, business narrative, and financial modeling.",
    color: "#f5b800",
    persona: "You are the strategic founder. You align communications with corporate vision, track investor activity, and verify financial statements for total accuracy.",
    skills: [
      { name: "pitch-deck-outliner", purpose: "Structure investor decks with narrative flow and milestones." },
      { name: "equity-calculator", purpose: "Forecast equity dilution, cap table changes, and options pools." },
      { name: "investor-tracker", purpose: "Manage investor communications pipelines and follow-up stages." }
    ],
    cmds: [
      { name: "/prep-investor", desc: "Assembles briefing and data room details before pitching." },
      { name: "/analyze-term-sheet", desc: "Review term sheet covenants, valuations, and board seats." }
    ],
    hooks: [
      { name: "financial-accuracy-check", desc: "Cross-validate calculations and claimed numbers in drafts." },
      { name: "confidentiality-enforcer", desc: "Enforce labeling and restrict internal data sharing." }
    ]
  },
  {
    id: "product_manager",
    name: "Product Manager",
    icon: "📋",
    desc: "PRD writing, competitor mapping, user stories, and specifications.",
    color: "#a371f7",
    persona: "You are a user-centric product leader. You focus on clear acceptance criteria, stakeholder alignment, and eliminating scope ambiguity.",
    skills: [
      { name: "prd-outliner", purpose: "Generate high-level product briefs with success metrics." },
      { name: "user-story-generator", purpose: "Draft precise user stories with Gherkin acceptance criteria." },
      { name: "competitive-mapper", purpose: "Map competitive feature tables and identify core differentiators." }
    ],
    cmds: [
      { name: "/write-prd", desc: "Generate a detailed product requirements document." },
      { name: "/prioritize-roadmap", desc: "Apply RICE score methodology to rank roadmap features." }
    ],
    hooks: [
      { name: "ambiguity-detector", desc: "Flag vague verbs like 'enhance' or 'optimize' in specifications." },
      { name: "acceptance-criteria-validator", desc: "Ensure all user stories have testing specifications." }
    ]
  }
];

export function SwarmApp() {
  const [selectedStack, setSelectedStack] = useState<string>("ai_sdr");
  const [objective, setObjective] = useState<string>(
    "Draft a personalized cold email sequence for VP of Engineering at Vercel targeting Next.js cost optimizations."
  );
  const [simulationState, setSimulationState] = useState<"idle" | "assembling" | "chatting" | "done">("idle");
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [progressPct, setProgressPct] = useState<number>(0);
  const [logs, setLogs] = useState<{ sender: string; text: string; type: "system" | "agent" | "hook" | "success" }[]>([]);
  const [activeTab, setActiveTab] = useState<"chat" | "instructions">("chat");

  const stack = STACKS.find((s) => s.id === selectedStack) || STACKS[0];

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const runSimulation = async () => {
    setSimulationState("assembling");
    setLogs([]);
    setActiveTab("chat");

    const steps = [
      { msg: `Resolving stack folder for "${stack.name}"...`, pct: 15 },
      { msg: "Loading primary swarm persona...", pct: 35 },
      { msg: `Deploying specialized skills: [${stack.skills.map((s) => s.name).join(", ")}]...`, pct: 60 },
      { msg: `Mapping workspace command keys: [${stack.cmds.map((c) => c.name).join(", ")}]...`, pct: 85 },
      { msg: `Activating compliance hooks: [${stack.hooks.map((h) => h.name).join(", ")}]...`, pct: 100 }
    ];

    for (const step of steps) {
      setProgressMsg(step.msg);
      setProgressPct(step.pct);
      setLogs((prev) => [...prev, { sender: "System", text: step.msg, type: "system" }]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setSimulationState("chatting");

    // Simulated conversation based on stack
    const dialogue: { sender: string; text: string; type: "system" | "agent" | "hook" | "success"; delay: number }[] = [];

    if (stack.id === "ai_sdr") {
      dialogue.push(
        { sender: "Persona: SDR Leader", text: `Triggered with objective: "${objective}"`, type: "agent", delay: 1000 },
        { sender: "Skill: lead-scorer", text: "Evaluating lead target: 'VP of Engineering at Vercel'. Fit metrics scored against ICP table: Role Fit: 25/25, Company Size: 25/25, Tech Fit: 25/25. Result: Score 95/100 -> [GO].", type: "agent", delay: 1200 },
        { sender: "Command: /prospect-batch", text: "Prospect researched: Vercel is growing rapidly, using cloud-native stack. Key trigger found: Next.js compiler optimizations rollout. Staging for sequencing.", type: "agent", delay: 1500 },
        { sender: "Skill: email-personalizer", text: "Drafting cold email:\n\nSubject: Next.js build speeds & compile costs\n\nHi [Name],\n\nSaw the recent release notes on Next.js compiler upgrades. Impressive build speedups.\n\nQuick question: when scaling Next.js across 100+ devs, how is Vercel auditing token overhead and developer build execution costs?\n\nWe built a lightweight checker that saves teams ~40% on API test suites without breaking deployments.\n\nOpen to a quick exchange next Tuesday?\n\nBest,\n[Sender]", type: "agent", delay: 2000 },
        { sender: "Hook: email-compliance", text: "✓ Audit check: Unsubscribe footer detected. Sender address matched. CAN-SPAM validated.", type: "hook", delay: 1000 },
        { sender: "Hook: approval-gate", text: "🚨 Swarm execution paused: PreToolUse hook 'approval-gate' blocked outgoing delivery. Outreach draft saved to session queue for human confirmation.", type: "hook", delay: 1200 },
        { sender: "System", text: "Swarm session completed successfully. Instructions exported.", type: "success", delay: 500 }
      );
    } else if (stack.id === "fullstack") {
      dialogue.push(
        { sender: "Persona: Principal Dev", text: `Beginning task: "${objective}"`, type: "agent", delay: 1000 },
        { sender: "Command: /write-adr", text: "Drafting ADR-0004 for feature implementation structure.", type: "agent", delay: 1200 },
        { sender: "Skill: test-generator", text: "Constructing unit test suites matching specifications. Asserting null-checks, routing outputs, and boundary conditions.", type: "agent", delay: 1500 },
        { sender: "Hook: shadow-compiler", text: "⚡ PostToolUse: Executing silently 'npm run build' & 'tsc --noEmit'. Found 0 errors. Compilation verified.", type: "hook", delay: 1500 },
        { sender: "Hook: test-coverage-enforcer", text: "✓ PostToolUse: Executing test coverage analyzer. Coverage diff: 88.5% -> 88.6% (+0.1%). Check passed.", type: "hook", delay: 1000 },
        { sender: "System", text: "Workspace code edits and validation steps verified successfully.", type: "success", delay: 500 }
      );
    } else {
      dialogue.push(
        { sender: "Persona: Swarm Core", text: `Simulating swarm execution for "${objective}"...`, type: "agent", delay: 1000 },
        { sender: `Skill: ${stack.skills[0]?.name || "primary-skill"}`, text: `Running stack workflow tool: ${stack.skills[0]?.purpose || "processing"}`, type: "agent", delay: 1500 },
        { sender: `Command: ${stack.cmds[0]?.name || "/command"}`, text: `Running command: ${stack.cmds[0]?.desc || "executing"}`, type: "agent", delay: 1200 },
        { sender: `Hook: ${stack.hooks[0]?.name || "pre-commit"}`, text: `Triggering PostToolUse hook: ${stack.hooks[0]?.desc || "validating"}`, type: "hook", delay: 1200 },
        { sender: "System", text: "Simulation complete. Swarm objectives resolved.", type: "success", delay: 500 }
      );
    }

    for (const d of dialogue) {
      await new Promise((resolve) => setTimeout(resolve, d.delay));
      setLogs((prev) => [...prev, { sender: d.sender, text: d.text, type: d.type }]);
    }

    setSimulationState("done");
  };

  // Generate dynamic COUNCIL_INSTRUCTIONS.md content
  const getCompiledInstructions = () => {
    let output = `# Claude Council Swarm Objective & Instructions\n\n`;
    output += `## Objective\n**${objective}**\n\n`;
    output += `---\n\n`;
    output += `## Domain Framework: ${stack.name} Stack\n\n`;
    output += `### Primary Swarm Persona\n${stack.persona}\n\n`;
    output += `---\n\n`;
    output += `## Swarm Division of Labor (Sequence of Play)\n\n`;
    
    let stepNum = 1;
    output += `### Phase 1: Research & Setup\n`;
    output += `${stepNum++}. **Activate ${stack.skills[0]?.name || "Scorer"}**: ${stack.skills[0]?.purpose || "Score Fit"}\n`;
    output += `\n`;

    output += `### Phase 2: Design & Content Drafting\n`;
    output += `${stepNum++}. **Invoke ${stack.skills[1]?.name || "Personalizer"}**: ${stack.skills[1]?.purpose || "Build drafts"}\n`;
    output += `\n`;

    output += `### Phase 3: Validation & Logging\n`;
    output += `${stepNum++}. **Deploy ${stack.skills[2]?.name || "Logger"}**: ${stack.skills[2]?.purpose || "Save logs"}\n`;
    output += `\n`;

    output += `## Commands Mapping\n`;
    stack.cmds.forEach(c => {
      output += `- **${c.name}**: ${c.desc}\n`;
    });
    output += `\n`;

    output += `## Runtime Quality Hooks (Simulated Gates)\n`;
    stack.hooks.forEach(h => {
      output += `- **${h.name}**: ${h.desc}\n`;
    });
    output += `\n`;

    output += `## Expected Outputs\nUpon completion, compile findings and output to \`session-log.md\`.`;
    return output;
  };

  return (
    <div className="h-full flex flex-col sm:flex-row overflow-hidden bg-[#eeefe9] text-[#2d2d2d] font-sans">
      {/* Sidebar - Settings */}
      <aside className="sm:w-80 shrink-0 border-r border-hairline bg-cream p-4 flex flex-col justify-between overflow-y-auto">
        <div>
          <Eyebrow color="#f54e00">Swarm Settings</Eyebrow>
          <p className="text-[12px] text-mute mt-1 mb-4 leading-relaxed">
            Orchestrate collaborative agent swarms using stack configurations.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-mute uppercase tracking-wider block mb-1.5">
                Select Domain Stack
              </label>
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                disabled={simulationState === "assembling" || simulationState === "chatting"}
                className="w-full rounded-md border border-hairline bg-white px-3 py-2 text-[13px] font-semibold focus:outline-none focus:border-brand-yellow"
              >
                {STACKS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name} Stack
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-mute uppercase tracking-wider block mb-1.5">
                Swarm Objective / Task
              </label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                disabled={simulationState === "assembling" || simulationState === "chatting"}
                rows={4}
                className="w-full rounded-md border border-hairline bg-white px-3 py-2 text-[13px] leading-relaxed resize-none focus:outline-none focus:border-brand-yellow font-medium"
                placeholder="Enter objective for the swarm..."
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline mt-4">
          <YellowButton
            onClick={runSimulation}
            disabled={simulationState === "assembling" || simulationState === "chatting" || !objective}
            className="w-full justify-center"
          >
            {simulationState === "assembling" || simulationState === "chatting"
              ? "Running Simulation..."
              : "Launch Council Swarm 🚀"}
          </YellowButton>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        {/* Header Tabs */}
        <div className="border-b border-hairline bg-cream/30 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("chat")}
              className={`rounded-md px-3 py-1.5 text-[12px] font-bold transition ${
                activeTab === "chat" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
              }`}
            >
              💬 Swarm Console
            </button>
            <button
              onClick={() => setActiveTab("instructions")}
              className={`rounded-md px-3 py-1.5 text-[12px] font-bold transition ${
                activeTab === "instructions" ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"
              }`}
            >
              📄 COUNCIL_INSTRUCTIONS.md
            </button>
          </div>
          <div className="text-[11px] text-mute font-mono">
            {stack.icon} uitkit-council --domain {stack.id}
          </div>
        </div>

        {/* Console View */}
        {activeTab === "chat" ? (
          <div className="flex-1 flex flex-col min-h-0 bg-code-bg p-4 overflow-y-auto font-mono text-[12px] text-code-text">
            {/* Initial Placeholder */}
            {logs.length === 0 && (
              <div className="flex-1 grid place-items-center text-center text-mute max-w-sm mx-auto p-4 leading-relaxed">
                <div>
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="font-bold text-ink">Ready to Assemble</div>
                  <div className="mt-1">
                    Select a workspace stack and define your objective in the left pane, then click launch.
                  </div>
                </div>
              </div>
            )}

            {/* Simulated Streams */}
            <div className="space-y-3 flex-1">
              {logs.map((log, i) => {
                if (log.type === "system") {
                  return (
                    <div key={i} className="text-yellow-500 font-semibold">
                      [INIT] {log.text}
                    </div>
                  );
                }
                if (log.type === "hook") {
                  return (
                    <div key={i} className="text-red-400 font-semibold p-2 border border-red-500/20 bg-red-950/20 rounded">
                      [HOOK] {log.sender}: {log.text}
                    </div>
                  );
                }
                if (log.type === "success") {
                  return (
                    <div key={i} className="text-green-400 font-bold p-2 border border-green-500/20 bg-green-950/20 rounded">
                      ✓ SUCCESS: {log.text}
                    </div>
                  );
                }
                return (
                  <div key={i} className="border border-hairline/20 bg-white/5 rounded p-3">
                    <div className="text-[11px] font-bold text-brand-yellow mb-1">{log.sender}</div>
                    <div className="whitespace-pre-wrap leading-relaxed">{log.text}</div>
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>

            {/* Assembling progress bar */}
            {simulationState === "assembling" && (
              <div className="mt-4 border-t border-hairline/10 pt-4 shrink-0">
                <div className="flex justify-between text-[11px] mb-1.5 font-bold">
                  <span>Assembling Council: {progressMsg}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-yellow transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Instructions MD view */
          <div className="flex-1 p-5 overflow-y-auto bg-cream/10">
            <div className="flex justify-between items-center mb-4 border-b border-hairline pb-3">
              <h3 className="text-[14px] font-bold text-ink">Assembled Instructions Specification</h3>
              <button
                onClick={() => navigator.clipboard.writeText(getCompiledInstructions())}
                className="rounded-md border border-olive/60 bg-white px-2.5 py-1 text-[11px] font-bold text-ink hover:bg-cream"
              >
                Copy Content
              </button>
            </div>
            <pre className="rounded-lg border border-hairline bg-code-bg p-4 text-[11px] font-mono text-code-text overflow-auto leading-relaxed max-h-[420px] whitespace-pre-wrap">
              {getCompiledInstructions()}
            </pre>
            <div className="mt-4 rounded-lg bg-cream/50 p-4 border border-hairline text-[12px] text-mute leading-relaxed">
              💡 <strong>Running locally:</strong> When you run the <code>npx uitkit council &lt;domain&gt;</code> command in your CLI, this instruction document is generated in your project root as <code>COUNCIL_INSTRUCTIONS.md</code> to direct Claude Code.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
