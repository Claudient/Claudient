import { useState } from "react";
import { Eyebrow, Tag } from "./ui";

interface CatalogItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  desc: string;
  certified: boolean;
  featured?: boolean;
  reason?: string;
}

const CATALOG: CatalogItem[] = [
  { id: "agentic-ai-engineer-stack", name: "Agentic AI Engineer Stack", icon: "🤖", category: "engineering", desc: "Agent design, multi-agent orchestration, observability for production AI systems.", certified: true, featured: true, reason: "new" },
  { id: "ai-compliance-risk-stack", name: "AI Compliance & Risk Stack", icon: "🛑", category: "compliance", desc: "Regulatory mapping, model auditing, data governance, ethical AI frameworks.", certified: true, featured: true, reason: "popular" },
  { id: "fullstack-developer-stack", name: "Full-Stack Developer Stack", icon: "⚡", category: "engineering", desc: "Frontend + backend + database + deployment. The all-in-one developer workspace.", certified: true },
  { id: "ai-sdr-stack", name: "AI SDR Stack", icon: "📞", category: "sales", desc: "Prospecting, outreach, pipeline management. Human-in-the-loop sales automation.", certified: true },
  { id: "devops-platform-stack", name: "DevOps Platform Stack", icon: "🏗️", category: "infrastructure", desc: "CI/CD, IaC, monitoring, incident response. Cloud-native operations.", certified: true },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: "📦" },
  { id: "engineering", label: "Engineering", icon: "⚙️" },
  { id: "compliance", label: "Compliance", icon: "🔒" },
  { id: "sales", label: "Sales & GTM", icon: "🎯" },
  { id: "infrastructure", label: "Infrastructure", icon: "☁️" },
];

const MARKETPLACE_INFO = [
  {
    title: "Publisher Program",
    icon: "📢",
    items: [
      { label: "Publisher Guidelines", desc: "Quality standards, naming conventions, and submission requirements." },
      { label: "Contribution Guide", desc: "Step-by-step: create, test, and submit your stack to the marketplace." },
      { label: "Certification Process", desc: "Vetting criteria: completeness, testing, documentation, maintenance." },
    ],
  },
  {
    title: "Revenue & Growth",
    icon: "📈",
    items: [
      { label: "Revenue Share", desc: "Certified publishers earn from Enterprise tier subscriptions." },
      { label: "Featured Listings", desc: "Top-performing stacks featured on the homepage and newsletter." },
      { label: "Usage Analytics", desc: "Publishers get install counts, star ratings, and feedback." },
    ],
  },
  {
    title: "Quality Assurance",
    icon: "✅",
    items: [
      { label: "Certified Badge", desc: "Stacks passing vetting get the UitKit Certified badge." },
      { label: "Automated Testing", desc: "Every stack tested via validate-stacks.js before listing." },
      { label: "Freshness Monitoring", desc: "Stale stacks flagged automatically. Publishers notified for updates." },
    ],
  },
];

type Tab = "catalog" | "publish" | "certified";

export function MarketplaceApp() {
  const [tab, setTab] = useState<Tab>("catalog");
  const [cat, setCat] = useState("all");

  const filtered = cat === "all" ? CATALOG : CATALOG.filter((c) => c.category === cat);

  return (
    <div className="h-full flex flex-col sm:flex-row">
      {/* Left sidebar */}
      <aside className="sm:w-52 shrink-0 border-r border-hairline bg-cream flex flex-col overflow-hidden">
        <div className="p-3">
          <Eyebrow color="#f5b800">Marketplace</Eyebrow>
        </div>
        <div className="px-2 pb-2 space-y-0.5">
          {(["catalog", "publish", "certified"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left rounded-lg px-2.5 py-2 text-[12px] font-semibold transition capitalize ${
                tab === t ? "bg-white border border-hairline text-ink shadow-sm" : "text-body hover:bg-white/60"
              }`}
            >
              {t === "catalog" ? "📦 Catalog" : t === "publish" ? "📢 Publish" : "✅ Certified"}
            </button>
          ))}
        </div>
        {tab === "catalog" && (
          <div className="flex-1 overflow-auto px-2 pb-2 space-y-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`w-full text-left flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-semibold transition ${
                  cat === c.id ? "bg-white border border-hairline text-ink shadow-sm" : "text-body hover:bg-white/60"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
                <span className="ml-auto text-[10px] text-mute">
                  {c.id === "all" ? CATALOG.length : CATALOG.filter((i) => i.category === c.id).length}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="px-3 py-2.5 border-t border-hairline">
          <div className="text-[11px] font-bold text-ink">{CATALOG.length} stacks listed</div>
          <div className="text-[10px] text-mute">{CATALOG.filter((c) => c.certified).length} certified</div>
        </div>
      </aside>

      {/* Right pane */}
      <div className="flex-1 min-w-0 overflow-auto p-5">
        {tab === "catalog" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-extrabold text-ink">Marketplace Catalog</h2>
              <Tag color="#f5b800">{filtered.length} results</Tag>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {filtered.map((item) => (
                <div key={item.id} className="rounded-xl border border-hairline bg-white p-4 hover:border-brand-orange/40 transition">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-bold text-ink">{item.name}</span>
                        {item.certified && (
                          <span className="text-[8px] font-bold uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Certified</span>
                        )}
                        {item.featured && (
                          <span className="text-[8px] font-bold uppercase bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full capitalize">{item.reason}</span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-body mt-1 leading-relaxed">{item.desc}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Tag color="#8b949e">{item.category}</Tag>
                        <pre className="text-[9px] font-mono text-mute">
                          <code>{`npx uitkit install ${item.id}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "publish" && (
          <div>
            <h2 className="text-lg font-extrabold text-ink mb-1">Publisher Program</h2>
            <p className="text-[12.5px] text-mute mb-4">Submit your stacks to the UitKit Marketplace and reach thousands of Claude Code users.</p>
            {MARKETPLACE_INFO.map((section) => (
              <div key={section.title} className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{section.icon}</span>
                  <h3 className="text-[14px] font-bold text-ink">{section.title}</h3>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.label} className="rounded-lg border border-hairline bg-white p-3">
                      <div className="text-[12px] font-bold text-ink">{item.label}</div>
                      <p className="text-[11px] text-mute mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "certified" && (
          <div>
            <h2 className="text-lg font-extrabold text-ink mb-1">UitKit Certified</h2>
            <p className="text-[12.5px] text-mute mb-4">Quality-assured stacks that meet our vetting criteria.</p>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 mb-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏅</span>
                <div>
                  <div className="text-[14px] font-bold text-emerald-800">Certification Badge</div>
                  <p className="text-[11.5px] text-emerald-700">Stacks passing all criteria receive the UitKit Certified badge and priority placement.</p>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-2">Vetting Criteria</div>
              <div className="rounded-xl border border-hairline bg-white overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead className="bg-soft border-b border-hairline">
                    <tr>
                      <th className="text-left px-3 py-2 font-bold text-mute">Criterion</th>
                      <th className="text-left px-3 py-2 font-bold text-mute">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { criterion: "Completeness", req: "CLAUDE.md + 5+ skills + 2+ hooks" },
                      { criterion: "Testing", req: "validate-stacks.js passes all checks" },
                      { criterion: "Documentation", req: "README with install instructions + examples" },
                      { criterion: "Freshness", req: "Updated within last 6 months" },
                      { criterion: "Maintenance", req: "Active publisher, responds to issues" },
                      { criterion: "Quality", req: "No PII, no hardcoded secrets, clean frontmatter" },
                    ].map((r) => (
                      <tr key={r.criterion} className="border-t border-hairline hover:bg-cream/50">
                        <td className="px-3 py-2 font-semibold text-ink">{r.criterion}</td>
                        <td className="px-3 py-2 text-body">{r.req}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-hairline bg-cream p-4">
              <div className="text-[11px] font-bold text-mute uppercase tracking-wider mb-1">Certify your stack</div>
              <pre className="text-[11px] font-mono text-ink">
                <code>{"node scripts/certify-stack.js path/to/your-stack/"}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
