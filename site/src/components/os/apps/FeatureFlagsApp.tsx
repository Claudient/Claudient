import { useState, useEffect } from "react";
import { Eyebrow } from "./ui";

interface FeatureFlagEntry {
  id: string;
  name: string;
  status: "stable" | "early-access" | "beta" | "private-beta";
  rolloutPercentage: number;
  description: string;
  category: "ui" | "performance" | "experimental" | "security";
  releaseDate: string;
  enabled: boolean;
}

const FEATURE_FLAGS: FeatureFlagEntry[] = [
  {
    id: "matrix-theme",
    name: "The Matrix Theme Pack",
    status: "stable",
    rolloutPercentage: 100,
    description: "Premium aesthetic themes: UitKit Neon, Ghost Shell. High-contrast, power-user focused.",
    category: "ui",
    releaseDate: "2026-06-22",
    enabled: true,
  },
  {
    id: "svg-inspector",
    name: "SVG Interactive Map Inspector",
    status: "early-access",
    rolloutPercentage: 50,
    description: "High-performance SVG visualization module for browsing file nodes and exploring dependencies interactively.",
    category: "ui",
    releaseDate: "2026-06-22",
    enabled: true,
  },
  {
    id: "swarm-sandbox",
    name: "Swarm Sandbox Simulator",
    status: "beta",
    rolloutPercentage: 25,
    description: "Interactive visualization UI for agent teams and swarm simulation. Watch agents coordinate in real-time.",
    category: "experimental",
    releaseDate: "2026-06-22",
    enabled: true,
  },
  {
    id: "dont-stop",
    name: "Dont Stop",
    status: "private-beta",
    rolloutPercentage: 10,
    description: "Autonomous batch processor with continuous execution and rate-limit management.",
    category: "experimental",
    releaseDate: "2026-06-22",
    enabled: true,
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  stable: { bg: "#22c55e", text: "#0f766e", border: "#dcfce7" },
  "early-access": { bg: "#3b82f6", text: "#0c4a6e", border: "#dbeafe" },
  beta: { bg: "#f59e0b", text: "#78350f", border: "#fef3c7" },
  "private-beta": { bg: "#8b5cf6", text: "#3c0f5c", border: "#ede9fe" },
};

const CATEGORY_ICONS: Record<string, string> = {
  ui: "🎨",
  performance: "⚡",
  experimental: "🧪",
  security: "🔒",
};

export function FeatureFlagsApp() {
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlagEntry | null>(FEATURE_FLAGS[0]);
  const [userQualified, setUserQualified] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Simulate user qualification for rollout percentages
    // In production, this would be based on actual user tracking
    const qualified: Record<string, boolean> = {};
    const userSeed = Math.random() * 100;

    FEATURE_FLAGS.forEach(flag => {
      qualified[flag.id] = userSeed < flag.rolloutPercentage;
    });

    setUserQualified(qualified);
  }, []);

  const stats = {
    total: FEATURE_FLAGS.length,
    enabled: FEATURE_FLAGS.filter(f => f.enabled).length,
    avgRollout: Math.round(
      FEATURE_FLAGS.reduce((sum, f) => sum + f.rolloutPercentage, 0) / FEATURE_FLAGS.length
    ),
    byStatus: FEATURE_FLAGS.reduce((acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-[260px] border-r border-hairline bg-cream/50 p-4 overflow-y-auto shrink-0">
        <Eyebrow color="#8b5cf6">Feature Flags · {FEATURE_FLAGS.length}</Eyebrow>

        {/* Statistics */}
        <div className="mt-4 space-y-2 mb-6 pb-4 border-b border-hairline">
          <div className="flex justify-between text-[11px]">
            <span className="text-mute">Total</span>
            <span className="font-bold text-ink">{stats.total}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-mute">Enabled</span>
            <span className="font-bold text-green-600">{stats.enabled}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-mute">Avg Rollout</span>
            <span className="font-bold text-blue-600">{stats.avgRollout}%</span>
          </div>
        </div>

        {/* Flag List */}
        <div className="space-y-2">
          {FEATURE_FLAGS.map((flag) => {
            const colors = STATUS_COLORS[flag.status];
            return (
              <button
                key={flag.id}
                onClick={() => setSelectedFlag(flag)}
                className={`w-full text-left p-2.5 rounded-lg transition ${
                  selectedFlag?.id === flag.id
                    ? "bg-white shadow-sm border border-hairline"
                    : "hover:bg-white/50 border border-transparent"
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-base">{CATEGORY_ICONS[flag.category]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-ink truncate">{flag.name}</div>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: colors.bg + "20",
                      color: colors.bg,
                      border: `1px solid ${colors.bg}`,
                    }}
                  >
                    {flag.status}
                  </span>
                  <span className="text-[9px] font-bold text-mute">
                    {flag.rolloutPercentage}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedFlag && (
          <>
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="grid place-items-center size-14 rounded-xl text-3xl"
                style={{
                  backgroundColor: STATUS_COLORS[selectedFlag.status].bg + "15",
                }}
              >
                {CATEGORY_ICONS[selectedFlag.category]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[selectedFlag.status].bg }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mute">
                    {selectedFlag.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-ink mb-1">{selectedFlag.name}</h2>
                <p className="text-[13px] text-body">{selectedFlag.description}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-hairline bg-cream/50 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-mute mb-2">
                  Rollout Status
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-ink">
                      {selectedFlag.rolloutPercentage}% Enabled
                    </span>
                    <span className="text-xs text-mute">
                      {userQualified[selectedFlag.id] ? "✓ You qualify" : "✗ Not eligible"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${selectedFlag.rolloutPercentage}%`,
                        backgroundColor: STATUS_COLORS[selectedFlag.status].bg,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-hairline bg-cream/50 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-mute mb-2">
                  Status Details
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-mute">Released:</span>
                    <span className="ml-2 font-mono text-ink">{selectedFlag.releaseDate}</span>
                  </div>
                  <div>
                    <span className="text-mute">Category:</span>
                    <span className="ml-2 font-semibold text-ink">{selectedFlag.category}</span>
                  </div>
                  <div>
                    <span className="text-mute">Enabled:</span>
                    <span
                      className="ml-2 font-semibold"
                      style={{
                        color: selectedFlag.enabled ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {selectedFlag.enabled ? "✓ Active" : "✗ Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Details */}
            <div className="rounded-lg border border-hairline bg-slate-50 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-mute mb-3">
                Configuration
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="text-xs font-semibold text-mute mb-2">Feature ID</div>
                  <code className="inline-block bg-white border border-hairline px-3 py-1.5 rounded text-xs font-mono text-code-text">
                    {selectedFlag.id}
                  </code>
                </div>

                <div>
                  <div className="text-xs font-semibold text-mute mb-2">Rollout Configuration</div>
                  <pre className="bg-white border border-hairline rounded p-3 text-[11px] font-mono text-code-text overflow-x-auto">
{`{
  "id": "${selectedFlag.id}",
  "name": "${selectedFlag.name}",
  "enabled": ${selectedFlag.enabled},
  "rolloutPercentage": ${selectedFlag.rolloutPercentage},
  "status": "${selectedFlag.status}",
  "releaseDate": "${selectedFlag.releaseDate}"
}`}
                  </pre>
                </div>

                <div>
                  <div className="text-xs font-semibold text-mute mb-2">Usage in Code</div>
                  <pre className="bg-white border border-hairline rounded p-3 text-[11px] font-mono text-code-text overflow-x-auto">
{`import { isFeatureEnabled } from '@/utils/featureFlagConfig';

if (isFeatureEnabled('${selectedFlag.id}')) {
  // Render feature for qualified users
  return <${selectedFlag.name.replace(/[^a-zA-Z0-9]/g, '')} />;
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Summary Table */}
            <div className="mt-6 rounded-lg border border-hairline overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream/50 border-b border-hairline">
                  <tr>
                    <th className="text-left px-4 py-2 font-bold text-mute text-xs uppercase">Flag</th>
                    <th className="text-left px-4 py-2 font-bold text-mute text-xs uppercase">Status</th>
                    <th className="text-left px-4 py-2 font-bold text-mute text-xs uppercase">Rollout</th>
                    <th className="text-left px-4 py-2 font-bold text-mute text-xs uppercase">Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {FEATURE_FLAGS.map(flag => (
                    <tr key={flag.id} className="hover:bg-cream/30 transition">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span>{CATEGORY_ICONS[flag.category]}</span>
                          <span className="font-semibold">{flag.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className="inline-block px-2 py-1 rounded text-xs font-bold"
                          style={{
                            backgroundColor: STATUS_COLORS[flag.status].bg + "20",
                            color: STATUS_COLORS[flag.status].bg,
                          }}
                        >
                          {flag.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full"
                              style={{
                                width: `${flag.rolloutPercentage}%`,
                                backgroundColor: STATUS_COLORS[flag.status].bg,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold">{flag.rolloutPercentage}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs text-mute">
                        {userQualified[flag.id] ? "✓ Qualified" : "Not eligible"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
