import { useState, useMemo } from "react";
import { Eyebrow, Tag } from "./ui";

const categories = [
  { id: "ai-engineering", icon: "🤖", name: "AI Engineering", count: 28, skills: ["Agent Construction", "Agent Memory", "Agent Teams", "AutoDream", "Context Management", "Tool Use Patterns", "Dispatch Jobs", "Channels Streaming"] },
  { id: "backend", icon: "⚙️", name: "Backend", count: 24, skills: ["FastAPI Expert", "Express.js Patterns", "Django ORM", "gRPC Services", "API Design", "Auth Patterns", "Rate Limiting", "WebSocket"] },
  { id: "devops-infra", icon: "🏗️", name: "DevOps & Infra", count: 22, skills: ["Terraform Expert", "Kubernetes Ops", "Docker Multi-stage", "CI/CD Pipelines", "AWS Architecture", "Incident Response", "Root Cause Tracing"] },
  { id: "database", icon: "🗄️", name: "Database", count: 18, skills: ["PostgreSQL Tuning", "MongoDB Patterns", "Redis Caching", "SQL Optimization", "Migration Strategy", "Schema Design"] },
  { id: "frontend", icon: "🎨", name: "Frontend", count: 16, skills: ["React Patterns", "Next.js App Router", "Tailwind CSS", "Playwright Testing", "D3 Visualization", "Design System"] },
  { id: "git", icon: "🔀", name: "Git", count: 14, skills: ["Git Flow", "Conventional Commits", "Rebase Strategy", "Cherry-pick", "Conflict Resolution"] },
  { id: "gtm", icon: "📈", name: "GTM / RevOps", count: 20, skills: ["CRM Automation", "Pipeline Analytics", "Lead Scoring", "Revenue Intelligence", "Deal Routing"] },
  { id: "productivity", icon: "⚡", name: "Productivity", count: 15, skills: ["Deep Research", "Document Processing", "Chrome Relay", "Task Automation", "Note Organization"] },
  { id: "security", icon: "🔒", name: "Security", count: 12, skills: ["Threat Modeling", "Pentesting", "OWASP Top 10", "Secret Detection", "SAST/DAST"] },
  { id: "sdr", icon: "📞", name: "SDR / Sales", count: 18, skills: ["Prospect Research", "Cold Outreach", "Qualification", "Pipeline Management", "Reply Classification"] },
  { id: "small-business", icon: "🏪", name: "Small Business", count: 42, skills: ["Invoice Generator", "Cash Flow Forecast", "Client Management", "Marketing Plan", "Tax Organizer"] },
];

export function SkillsApp() {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const cat = categories[active];

  const filtered = useMemo(() => {
    if (!search) return cat.skills;
    return cat.skills.filter(s => s.toLowerCase().includes(search.toLowerCase()));
  }, [cat, search]);

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream p-3 space-y-1 overflow-auto">
        <Eyebrow color="#1d4aff">Skills Catalog</Eyebrow>
        <div className="mt-2 mb-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills…"
            className="w-full rounded-md border border-hairline bg-white px-2.5 py-1.5 text-[12px] outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-0.5">
          {categories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActive(i); setSearch(""); }}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{c.icon}</span>
              <span className="flex-1 truncate">{c.name}</span>
              <span className="text-[10px] text-mute">{c.count}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-7">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cat.icon}</span>
          <h1 className="text-2xl font-extrabold text-ink">{cat.name}</h1>
        </div>
        <Tag color="#1d4aff">{cat.count} skills available</Tag>

        <p className="mt-3 text-[14px] text-body max-w-md">
          Each skill is domain-specific knowledge that activates automatically when Claude Code detects relevant context in your session.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
          {filtered.map((s) => (
            <div key={s} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3.5 py-3 text-[13px] font-medium text-ink">
              <span className="grid place-items-center size-5 rounded-full text-white text-[11px]" style={{ backgroundColor: "#1d4aff" }}>✓</span>
              {s}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border-l-4 border-brand-blue bg-brand-blue/10 px-4 py-3 text-[12.5px] text-body">
          💡 <strong>Tip:</strong> Install all {cat.count} {cat.name.toLowerCase()} skills with <code className="bg-white px-1 py-0.5 rounded text-[11px] font-mono">npx claudient add skills {cat.id}</code>
        </div>
      </div>
    </div>
  );
}
