import { useState } from "react";
import { Eyebrow, YellowButton, GhostButton } from "./ui";

const methods = [
  { title: "Plugin Marketplace", cmd: "/plugin marketplace add Claudient/Claudient", desc: "Recommended — installs all plugins", recommended: true },
  { title: "npm CLI", cmd: "npx claudient add skills backend", desc: "Cherry-pick specific categories" },
  { title: "Git Clone", cmd: "git clone https://github.com/Claudient/Claudient.git", desc: "Full repository access" },
];

export function InstallApp() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="px-7 py-7 max-w-2xl mx-auto">
      <Eyebrow color="#f97316">Installation</Eyebrow>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Install in 30 seconds</h1>
      <p className="mt-2 text-[14px] text-body">
        Three ways to get started. Pick what works for your workflow.
      </p>

      <div className="mt-6 space-y-4">
        {methods.map((m, i) => (
          <div key={m.title} className={`relative rounded-xl border bg-white p-5 ${m.recommended ? "border-2 border-brand-yellow" : "border-hairline"}`}>
            {m.recommended && (
              <span className="absolute -top-2.5 left-5 rounded-full bg-brand-yellow px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                Recommended
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="grid place-items-center size-8 rounded-full bg-brand-orange/10 text-brand-red text-[14px] font-bold">{i + 1}</div>
              <div>
                <div className="text-[14px] font-bold text-ink">{m.title}</div>
                <div className="text-[12px] text-mute">{m.desc}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <pre className="flex-1 rounded-lg bg-[#1d1f27] text-[#e6e6e6] px-3 py-2.5 text-[12px] font-mono overflow-auto">
                <code>{m.cmd}</code>
              </pre>
              <button
                onClick={() => copy(i, m.cmd)}
                className="shrink-0 rounded-md border border-olive/60 bg-white px-2.5 py-2 text-[11px] font-semibold text-ink hover:bg-cream transition"
              >
                {copied === i ? "✓" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-olive/50 bg-cream p-5">
        <div className="text-[14px] font-bold text-ink">FAQ</div>
        <div className="mt-3 space-y-3 text-[12.5px] text-body">
          <div><strong>Is Claudient free?</strong> Yes. Open source under AGPL-3.0 and CC-BY-SA-4.0.</div>
          <div><strong>What version of Claude Code?</strong> Works with Claude Code v1.0+. We track latest features.</div>
          <div><strong>Does it send my code anywhere?</strong> No. Everything runs locally. Skills are markdown files.</div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <YellowButton onClick={() => copy(99, "/plugin marketplace add Claudient/Claudient")}>
          {copied === 99 ? "✓ Copied!" : "Quick Install →"}
        </YellowButton>
        <GhostButton onClick={() => window.open("https://github.com/Claudient/Claudient", "_blank")}>
          GitHub
        </GhostButton>
      </div>
    </div>
  );
}
