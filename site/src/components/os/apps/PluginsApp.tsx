import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

interface Plugin { id: string; name: string; desc: string; skills: number; category: string; }

const PLUGINS: Plugin[] = [
  { id: "uitkit-everything", name: "Everything Bundle", desc: "The complete UitKit collection — all skills, agents, commands, and stacks.", skills: 400, category: "Bundle" },
  { id: "uitkit-commands", name: "Commands Pack", desc: "100 slash commands for development workflows.", skills: 100, category: "Bundle" },
  { id: "uitkit-personas", name: "Personas Pack", desc: "10 professional personas for different work modes.", skills: 10, category: "Bundle" },
  { id: "uitkit-backend", name: "Backend Engineering", desc: "API design, database, microservices, and server-side patterns.", skills: 45, category: "Domain" },
  { id: "uitkit-frontend", name: "Frontend Engineering", desc: "React, CSS, accessibility, and client-side performance.", skills: 38, category: "Domain" },
  { id: "uitkit-devops-infra", name: "DevOps & Infrastructure", desc: "CI/CD, Docker, Kubernetes, Terraform, monitoring.", skills: 42, category: "Domain" },
  { id: "uitkit-database", name: "Database & Data", desc: "SQL optimization, migrations, dbt, data engineering.", skills: 35, category: "Domain" },
  { id: "uitkit-ai-engineering", name: "AI Engineering", desc: "RAG, fine-tuning, agent design, prompt engineering.", skills: 28, category: "Domain" },
  { id: "uitkit-security", name: "Security", desc: "OWASP, threat modeling, auth, secrets management.", skills: 30, category: "Domain" },
  { id: "uitkit-testing", name: "Testing & QA", desc: "Unit, integration, e2e testing, TDD, coverage.", skills: 25, category: "Domain" },
  { id: "uitkit-git", name: "Git & Version Control", desc: "Branch strategies, rebasing, conflict resolution.", skills: 22, category: "Domain" },
  { id: "uitkit-product", name: "Product Management", desc: "PRDs, roadmaps, prioritization, stakeholder management.", skills: 20, category: "Business" },
  { id: "uitkit-gtm", name: "Go-to-Market", desc: "Launch strategies, positioning, competitive analysis.", skills: 18, category: "Business" },
  { id: "uitkit-sdr", name: "Sales Development", desc: "Prospecting, outreach sequences, CRM workflows.", skills: 15, category: "Business" },
  { id: "uitkit-marketing", name: "Marketing", desc: "Content, SEO, email campaigns, growth experiments.", skills: 20, category: "Business" },
  { id: "uitkit-finance", name: "Finance", desc: "Financial modeling, forecasting, unit economics.", skills: 15, category: "Business" },
  { id: "uitkit-finance-payments", name: "Payments & Fintech", desc: "Payment processing, PCI compliance, reconciliation.", skills: 12, category: "Business" },
  { id: "uitkit-legal", name: "Legal & Compliance", desc: "Contract review, compliance, privacy, IP protection.", skills: 14, category: "Business" },
  { id: "uitkit-small-business", name: "Small Business", desc: "Operations, invoicing, customer management.", skills: 16, category: "Business" },
  { id: "uitkit-data-ml", name: "Data & ML", desc: "Data pipelines, ML ops, feature engineering, analytics.", skills: 25, category: "Domain" },
  { id: "uitkit-productivity", name: "Productivity", desc: "Meeting notes, task breakdown, decision docs.", skills: 18, category: "Domain" },
  { id: "uitkit-automation", name: "Automation", desc: "Workflows, routines, hooks, and agent orchestration.", skills: 22, category: "Domain" },
];

export function PluginsApp() {
  const cats = ["All", ...new Set(PLUGINS.map((p) => p.category))];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PLUGINS : PLUGINS.filter((p) => p.category === filter);
  const totalSkills = PLUGINS.reduce((a, p) => a + p.skills, 0);

  return (
    <div className="flex h-full">
      <div className="w-[180px] border-r border-hairline bg-cream/50 p-3 overflow-y-auto shrink-0">
        <Eyebrow color="#f5b800">Category</Eyebrow>
        <div className="mt-3 space-y-0.5">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 text-[12px] flex items-center justify-between transition ${filter === c ? "bg-white font-bold text-ink shadow-sm" : "text-body hover:bg-white/50"}`}>
              <span>{c}</span>
              <span className="text-[10px] text-mute font-mono">{c === "All" ? PLUGINS.length : PLUGINS.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-code-bg text-[11px] text-code-text p-3 font-mono leading-relaxed">
          <div className="text-brand-yellow">Install plugin:</div>
          <div className="mt-1 text-[#3fb950]">$ /plugin marketplace add</div>
          <div className="pl-2">UitKit/uitkit-everything</div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Eyebrow color="#f5b800">Plugin Marketplace</Eyebrow>
            <h2 className="text-lg font-bold text-ink mt-1">{filtered.length} plugins · {totalSkills} skills</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-hairline bg-white p-4 hover:border-olive/70 transition">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[13px] font-bold text-ink">{p.name}</div>
                  <code className="text-[10px] text-mute font-mono">{p.id}</code>
                </div>
                <Tag color={p.category === "Bundle" ? "#f54e00" : p.category === "Domain" ? "#1d4aff" : "#3fb950"}>{p.category}</Tag>
              </div>
              <p className="mt-2 text-[12px] text-body leading-relaxed">{p.desc}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] font-bold text-brand-blue">{p.skills} skills</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
