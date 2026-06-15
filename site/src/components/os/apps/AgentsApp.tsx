import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

const agentCategories = [
  { id: "roles", icon: "👤", name: "Role Agents", agents: ["Senior Engineer", "Staff Engineer", "Tech Lead", "Code Reviewer", "Security Auditor", "QA Engineer", "Data Engineer", "ML Engineer", "DevOps Engineer"] },
  { id: "advisors", icon: "🎓", name: "Advisory Agents", agents: ["CTO Advisor", "CFO Advisor", "Growth Advisor", "Architecture Advisor", "Security Advisor", "Performance Advisor"] },
  { id: "specialists", icon: "🔬", name: "Specialist Agents", agents: ["API Designer", "Database Architect", "Frontend Expert", "Cloud Architect", "Migration Specialist", "Accessibility Expert", "i18n Specialist"] },
  { id: "core", icon: "🧠", name: "Core Agents", agents: ["Build Resolver", "Error Debugger", "Test Generator", "Documentation Writer", "Refactor Assistant"] },
  { id: "sdr", icon: "📞", name: "SDR Agents", agents: ["Prospect Researcher", "Outreach Writer", "Meeting Booker", "Pipeline Manager"] },
];

export function AgentsApp() {
  const [active, setActive] = useState(0);
  const cat = agentCategories[active];

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream p-3 space-y-1 overflow-auto">
        <Eyebrow color="#b62ad9">Specialist Agents</Eyebrow>
        <div className="mt-2 space-y-0.5">
          {agentCategories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{c.icon}</span>
              <span className="flex-1 truncate">{c.name}</span>
              <span className="text-[10px] text-mute">{c.agents.length}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-7">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cat.icon}</span>
          <h1 className="text-2xl font-extrabold text-ink">{cat.name}</h1>
        </div>
        <Tag color="#b62ad9">{cat.agents.length} agents</Tag>

        <p className="mt-3 text-[14px] text-body max-w-md">
          Purpose-built agents with scoped tools and domain knowledge. Each agent has specific capabilities for its role.
        </p>

        <div className="mt-5 space-y-2.5">
          {cat.agents.map((a) => (
            <div key={a} className="rounded-xl border border-hairline bg-white p-4 flex items-center gap-3 hover:border-olive/70 transition">
              <div className="grid place-items-center size-9 rounded-lg text-lg bg-accent-purple/10 shrink-0">🤖</div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-ink">{a}</div>
                <div className="text-[12px] text-mute">Specialist {cat.name.toLowerCase().replace(" agents", "")} agent</div>
              </div>
              <Tag color="#b62ad9">Ready</Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
