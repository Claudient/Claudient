import { useState } from "react";
import { Eyebrow, Card, YellowButton } from "./ui";

interface ModelCost {
  name: string;
  inputCost: number; // per million tokens
  outputCost: number; // per million tokens
}

const MODEL_COSTS: ModelCost[] = [
  { name: "Claude 3.5 Sonnet", inputCost: 3.0, outputCost: 15.0 },
  { name: "Claude 3.5 Haiku", inputCost: 0.8, outputCost: 4.0 },
  { name: "Claude 3.0 Opus", inputCost: 15.0, outputCost: 75.0 },
];

export function TokenSaverApp() {
  const [selectedModel, setSelectedModel] = useState(MODEL_COSTS[0]);
  const [inputTokens, setInputTokens] = useState<number>(80000);
  const [outputTokens, setOutputTokens] = useState<number>(12000);
  const [runsPerDay, setRunsPerDay] = useState<number>(30);

  // Calculations
  const rawInputCost = (inputTokens / 1000000) * selectedModel.inputCost;
  const rawOutputCost = (outputTokens / 1000000) * selectedModel.outputCost;
  const rawSingleCost = rawInputCost + rawOutputCost;
  const rawDailyCost = rawSingleCost * runsPerDay;

  // With Token Saver optimizations (~45% input compression and ~20% output compression)
  const optInputTokens = Math.round(inputTokens * 0.55);
  const optOutputTokens = Math.round(outputTokens * 0.8);
  const optInputCost = (optInputTokens / 1000000) * selectedModel.inputCost;
  const optOutputCost = (optOutputTokens / 1000000) * selectedModel.outputCost;
  const optSingleCost = optInputCost + optOutputCost;
  const optDailyCost = optSingleCost * runsPerDay;

  const dailySavings = rawDailyCost - optDailyCost;
  const monthlySavings = dailySavings * 30;

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 p-5 overflow-y-auto">
      {/* Left panel: Optimizer calculator */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        <Card className="flex flex-col gap-3">
          <Eyebrow color="#10b981">Token Saver</Eyebrow>
          <h2 className="text-[14px] font-bold text-ink">Ecosystem Cost Calculator</h2>

          <div className="space-y-3 text-[12px]">
            <div>
              <label className="block text-[10.5px] font-bold text-mute uppercase mb-1">Model Selection</label>
              <select
                value={selectedModel.name}
                onChange={(e) => setSelectedModel(MODEL_COSTS.find(m => m.name === e.target.value) || MODEL_COSTS[0])}
                className="w-full border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 bg-white"
              >
                {MODEL_COSTS.map((m) => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-mute uppercase mb-1">Session Input Tokens</label>
              <input
                type="number"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 bg-white"
              />
              <span className="text-[10px] text-mute">Typical large context with files: 50k - 150k</span>
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-mute uppercase mb-1">Session Output Tokens</label>
              <input
                type="number"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-bold text-mute uppercase mb-1">API Requests per Day</label>
              <input
                type="number"
                value={runsPerDay}
                onChange={(e) => setRunsPerDay(Number(e.target.value))}
                className="w-full border border-hairline rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500 bg-white"
              />
            </div>
          </div>
        </Card>

        {/* Dynamic Savings Card */}
        <Card className="bg-emerald-50 border-emerald-200">
          <h3 className="text-[13px] font-bold text-emerald-800 flex items-center gap-1.5">
            <span>💰</span> Estimated Monthly Savings
          </h3>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">
            ${monthlySavings.toFixed(2)}
          </div>
          <p className="text-[11.5px] text-emerald-600 mt-1 leading-normal">
            Based on a 45% context compression rate using standard `Token Saver` rules.
          </p>
        </Card>
      </div>

      {/* Right panel: Token Ladder details */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <Card className="flex flex-col gap-3">
          <div className="border-b border-hairline pb-2">
            <h2 className="text-[14px] font-bold text-ink">The Token Optimization Ladder</h2>
            <p className="text-[12px] text-mute mt-0.5">Four rules to minimize prompt context size and slash developer bills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              {
                step: "Ladder 01",
                title: "Enforce standard library matches",
                desc: "Don't compile heavy custom dependencies. Check if standard package features (like Node native modules) resolve the logic first.",
                savings: "saves ~10% input tokens",
                color: "border-blue-100 bg-blue-50/10"
              },
              {
                step: "Ladder 02",
                title: "Ingest clean state contexts",
                desc: "Instruct agents to ignore large binaries, lockfiles, configuration bundles, and temp files inside `.claudeignore` parameters.",
                savings: "saves ~30% context space",
                color: "border-emerald-100 bg-emerald-50/10"
              },
              {
                step: "Ladder 03",
                title: "Trunk dependency contexts",
                desc: "Supply only necessary interface schemas instead of entire class body definitions. JIT inject code blocks on demand.",
                savings: "saves ~15% code footprint",
                color: "border-amber-100 bg-amber-50/10"
              },
              {
                step: "Ladder 04",
                title: "Decline redundant documentation",
                desc: "Instruct models to skip code repetition, summary duplication, or large explanations in terminal responses.",
                savings: "saves ~20% output tokens",
                color: "border-purple-100 bg-purple-50/10"
              },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${item.color} space-y-1.5 shadow-sm`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase text-zinc-400">{item.step}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.25 rounded">
                    {item.savings}
                  </span>
                </div>
                <h4 className="text-[13px] font-bold text-ink">{item.title}</h4>
                <p className="text-[12px] text-body leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Optimization comparison table */}
        <Card className="p-4 space-y-3">
          <h3 className="text-[13px] font-bold text-ink">Compare Run Parameters</h3>
          <div className="overflow-x-auto text-[12px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-hairline text-mute">
                  <th className="pb-2 font-bold uppercase text-[10px]">Session Metric</th>
                  <th className="pb-2 font-bold uppercase text-[10px]">Raw Run Costs</th>
                  <th className="pb-2 font-bold uppercase text-[10px]">Token-Saver Runs</th>
                  <th className="pb-2 font-bold uppercase text-[10px]">Net Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="py-2.5 font-semibold text-ink">Input Tokens</td>
                  <td className="py-2.5 font-mono text-zinc-550">{inputTokens.toLocaleString()}</td>
                  <td className="py-2.5 font-mono text-emerald-600 font-bold">{optInputTokens.toLocaleString()}</td>
                  <td className="py-2.5 text-emerald-700 font-bold">-{Math.round(((inputTokens - optInputTokens) / inputTokens) * 100)}%</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-ink">Output Tokens</td>
                  <td className="py-2.5 font-mono text-zinc-550">{outputTokens.toLocaleString()}</td>
                  <td className="py-2.5 font-mono text-emerald-600 font-bold">{optOutputTokens.toLocaleString()}</td>
                  <td className="py-2.5 text-emerald-700 font-bold">-{Math.round(((outputTokens - optOutputTokens) / outputTokens) * 100)}%</td>
                </tr>
                <tr className="border-t-2 border-hairline bg-slate-50/50">
                  <td className="py-2.5 font-bold text-ink">Daily API Cost</td>
                  <td className="py-2.5 font-mono text-zinc-550 font-bold">${rawDailyCost.toFixed(3)}</td>
                  <td className="py-2.5 font-mono text-emerald-700 font-extrabold">${optDailyCost.toFixed(3)}</td>
                  <td className="py-2.5 text-emerald-700 font-extrabold">-${dailySavings.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
