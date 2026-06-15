import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

const stacks = [
  { name: "Full-Stack Developer", icon: "⚡", skills: 8, desc: "Frontend + backend + database + deployment skills.", cmd: "npx claudient stack fullstack_developer_stack" },
  { name: "AI SDR", icon: "📞", skills: 8, desc: "Prospecting, outreach, and pipeline management.", cmd: "npx claudient stack ai_sdr_stack" },
  { name: "DevOps Platform", icon: "🏗️", skills: 8, desc: "CI/CD, IaC, monitoring, incident response.", cmd: "npx claudient stack devops_platform_stack" },
  { name: "Data Engineer", icon: "🔧", skills: 9, desc: "ETL, dbt, Spark, warehouse, and pipelines.", cmd: "npx claudient stack data_engineer_stack" },
  { name: "Founder / CEO", icon: "🚀", skills: 8, desc: "Fundraising, strategy, hiring, and growth.", cmd: "npx claudient stack founder_ceo_stack" },
  { name: "Content Marketing", icon: "📝", skills: 8, desc: "SEO, copywriting, social media, analytics.", cmd: "npx claudient stack content_marketing_stack" },
  { name: "Finance / CFO", icon: "💰", skills: 8, desc: "Financial modeling, reporting, compliance.", cmd: "npx claudient stack finance_cfo_stack" },
  { name: "Security Engineer", icon: "🔒", skills: 6, desc: "Threat modeling, pentesting, incident response.", cmd: "npx claudient stack security_engineer_stack" },
  { name: "Product Manager", icon: "📋", skills: 6, desc: "Roadmap planning, user research, PRDs.", cmd: "npx claudient stack product_manager_stack" },
  { name: "GTM Engineer", icon: "🎯", skills: 8, desc: "CRM automation, pipeline ops, revenue intel.", cmd: "npx claudient stack gtm_engineer_stack" },
  { name: "SRE", icon: "🛡️", skills: 6, desc: "SLOs, incident response, chaos engineering.", cmd: "npx claudient stack sre_stack" },
  { name: "ML/AI Engineer", icon: "🧠", skills: 6, desc: "Model training, MLOps, feature stores.", cmd: "npx claudient stack mlai_engineer_stack" },
];

export function StacksApp() {
  const [active, setActive] = useState(0);
  const stack = stacks[active];
  const [copied, setCopied] = useState(false);

  return (
    <div className="h-full flex flex-col sm:flex-row">
      <aside className="sm:w-56 shrink-0 border-r border-hairline bg-cream p-3 space-y-1 overflow-auto">
        <Eyebrow color="#3fb950">Workspace Stacks</Eyebrow>
        <div className="mt-2 space-y-0.5">
          {stacks.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={`w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${
                i === active ? "bg-white border border-hairline text-ink" : "text-body hover:bg-white/60"
              }`}
            >
              <span>{s.icon}</span>
              <span className="flex-1 truncate">{s.name}</span>
              <span className="text-[10px] text-mute">{s.skills}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto p-7">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{stack.icon}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-ink">{stack.name}</h1>
            <Tag color="#3fb950">{stack.skills} skills included</Tag>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-body max-w-md">{stack.desc}</p>

        <div className="mt-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">Skill Coverage</div>
          <div className="space-y-2">
            {Array.from({ length: stack.skills }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink">
                <span className="grid place-items-center size-5 rounded-full text-white text-[11px]" style={{ backgroundColor: "#3fb950" }}>✓</span>
                Skill {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">Install Command</div>
          <pre className="rounded-xl bg-[#1d1f27] text-[#e6e6e6] p-4 text-[12px] font-mono overflow-auto">
            <code>{stack.cmd}</code>
          </pre>
          <button
            onClick={() => { navigator.clipboard.writeText(stack.cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-olive/60 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:bg-cream transition"
          >
            {copied ? "✓ Copied!" : "Copy command"}
          </button>
        </div>
      </div>
    </div>
  );
}
