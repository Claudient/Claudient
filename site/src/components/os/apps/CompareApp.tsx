import { useState } from "react";
import { Eyebrow } from "./ui";

interface CompareRow {
  feature: string;
  claudient: string;
  ecc: string;
  volt: string;
  alireza: string;
  moat?: boolean;
}

const ROWS: CompareRow[] = [
  { feature: "Skills", claudient: "400+", ecc: "~150", volt: "~30", alireza: "~20" },
  { feature: "Agents", claudient: "182+", ecc: "~50", volt: "~15", alireza: "~10" },
  { feature: "Slash Commands", claudient: "100+", ecc: "~40", volt: "~10", alireza: "~5" },
  { feature: "Hooks", claudient: "48", ecc: "~20", volt: "~5", alireza: "~3" },
  { feature: "Personas", claudient: "10", ecc: "3", volt: "0", alireza: "0" },
  { feature: "Rules", claudient: "32", ecc: "~15", volt: "~5", alireza: "~2" },
  { feature: "MCP Configs", claudient: "41", ecc: "~10", volt: "~8", alireza: "~3" },
  { feature: "Workspace Stacks", claudient: "50", ecc: "~12", volt: "0", alireza: "0" },
  { feature: "Plugins", claudient: "22", ecc: "~8", volt: "0", alireza: "0" },
  { feature: "Localization", claudient: "5 languages", ecc: "English only", volt: "English only", alireza: "English only", moat: true },
  { feature: "Business-domain Stacks", claudient: "42 domains", ecc: "~5", volt: "0", alireza: "0", moat: true },
  { feature: "Artifact-type Span", claudient: "Widest (15+)", ecc: "~8", volt: "~4", alireza: "~3", moat: true },
  { feature: "Dual Distribution", claudient: "Marketplace + npm", ecc: "GitHub only", volt: "GitHub only", alireza: "GitHub only", moat: true },
  { feature: "Cross-harness Export", claudient: "✓ .cursorrules, .windsurfrules", ecc: "✗", volt: "✗", alireza: "✗", moat: true },
  { feature: "Statuslines & Themes", claudient: "6 presets + themes", ecc: "✗", volt: "✗", alireza: "✗" },
  { feature: "B2B Pricing Tiers", claudient: "4 tiers", ecc: "✗", volt: "✗", alireza: "✗" },
  { feature: "AI-Readiness Scorecard", claudient: "✓ (claudient score)", ecc: "✗", volt: "✗", alireza: "✗" },
  { feature: "Compliance Stacks", claudient: "✓ SOC2, GDPR, HIPAA", ecc: "✗", volt: "✗", alireza: "✗" },
  { feature: "Multi-agent Swarms", claudient: "✓ 5 swarm patterns", ecc: "✗", volt: "✗", alireza: "✗" },
  { feature: "CLI Tooling", claudient: "9 commands", ecc: "~3", volt: "✗", alireza: "✗" },
];

const COMPETITORS = [
  { id: "claudient", label: "Claudient", color: "#f54e00" },
  { id: "ecc", label: "ECC", color: "#6b7280" },
  { id: "volt", label: "VoltAgent", color: "#6b7280" },
  { id: "alireza", label: "alirezarezvani", color: "#6b7280" },
];

type Filter = "all" | "moats";

export function CompareApp() {
  const [filter, setFilter] = useState<Filter>("all");
  const rows = filter === "moats" ? ROWS.filter((r) => r.moat) : ROWS;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[180px] border-r border-hairline bg-cream/50 p-3 overflow-y-auto shrink-0">
        <Eyebrow color="#f54e00">Compare</Eyebrow>
        <p className="mt-2 text-[11px] text-mute leading-relaxed">
          Honest feature comparison across the Claude Code ecosystem.
        </p>
        <div className="mt-4 space-y-1">
          <button
            onClick={() => setFilter("all")}
            className={`w-full text-left rounded-md px-2.5 py-1.5 text-[12px] transition ${filter === "all" ? "bg-white font-bold text-ink shadow-sm" : "text-body hover:bg-white/50"}`}
          >
            All Features ({ROWS.length})
          </button>
          <button
            onClick={() => setFilter("moats")}
            className={`w-full text-left rounded-md px-2.5 py-1.5 text-[12px] transition ${filter === "moats" ? "bg-white font-bold text-ink shadow-sm" : "text-body hover:bg-white/50"}`}
          >
            🏆 Our Moats ({ROWS.filter((r) => r.moat).length})
          </button>
        </div>
        <div className="mt-5 space-y-2">
          {COMPETITORS.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-[11px] font-semibold text-body">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="rounded-lg border border-hairline overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-cream border-b border-hairline">
                <th className="text-left px-3 py-2 font-bold text-ink w-[160px]">Feature</th>
                <th className="text-left px-3 py-2 font-bold text-brand-orange">Claudient</th>
                <th className="text-left px-3 py-2 font-semibold text-mute">ECC</th>
                <th className="text-left px-3 py-2 font-semibold text-mute">VoltAgent</th>
                <th className="text-left px-3 py-2 font-semibold text-mute">alirezarezvani</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-hairline ${row.moat ? "bg-emerald-50/50" : i % 2 === 0 ? "bg-white" : "bg-cream/30"}`}
                >
                  <td className="px-3 py-2 font-semibold text-ink flex items-center gap-1.5">
                    {row.moat && <span className="text-[10px]">🏆</span>}
                    {row.feature}
                  </td>
                  <td className="px-3 py-2 font-semibold text-ink">{row.claudient}</td>
                  <td className="px-3 py-2 text-mute">{row.ecc}</td>
                  <td className="px-3 py-2 text-mute">{row.volt}</td>
                  <td className="px-3 py-2 text-mute">{row.alireza}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-hairline bg-cream p-4">
          <div className="text-[12px] font-bold text-ink mb-1">Why it matters</div>
          <p className="text-[11.5px] text-body leading-relaxed">
            Claudient is the only Claude Code ecosystem with 5-language localization,
            business-domain depth across 42 verticals, the widest artifact-type span (15+ types),
            and native marketplace + npm dual distribution. No other project comes close to this breadth.
          </p>
        </div>
      </div>
    </div>
  );
}
