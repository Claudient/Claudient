import { useState, useEffect } from "react";
import { Eyebrow, Card } from "./ui";

interface PetConfig {
  type: "rabbit" | "dino" | "robot";
  personality: "encouraging" | "sassy" | "quiet";
  visible: boolean;
  soundEnabled: boolean;
}

const DEFAULT_CONFIG: PetConfig = {
  type: "rabbit",
  personality: "encouraging",
  visible: true,
  soundEnabled: false,
};

export function SidekickSettingsApp() {
  const [config, setConfig] = useState<PetConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("uitkit_sidekick_config");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (_) {}
    }
  }, []);

  const saveConfig = (newConfig: PetConfig) => {
    setConfig(newConfig);
    localStorage.setItem("uitkit_sidekick_config", JSON.stringify(newConfig));
    // Dispatch custom event to notify pet component instantly
    window.dispatchEvent(new Event("uitkit_sidekick_update"));
  };

  const triggerStatus = (status: "idle" | "thinking" | "working" | "done" | "error", message?: string) => {
    window.dispatchEvent(new CustomEvent("sidekick_status_change", { 
      detail: { status, message } 
    }));
  };

  return (
    <div className="px-6 py-6 max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🐾</span>
        <div>
          <Eyebrow color="#10b981">Sidekick Pet</Eyebrow>
          <h1 className="text-xl font-extrabold text-ink">Sidekick Settings</h1>
        </div>
      </div>

      <Card className="space-y-4">
        <h2 className="text-[14px] font-bold text-ink border-b border-hairline pb-2">Appearance & Style</h2>
        
        <div className="grid grid-cols-3 gap-3">
          {(["rabbit", "dino", "robot"] as const).map((t) => (
            <button
              key={t}
              onClick={() => saveConfig({ ...config, type: t })}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${
                config.type === t
                  ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500"
                  : "border-hairline hover:bg-cream"
              }`}
            >
              <span className="text-3xl">
                {t === "rabbit" && "🐰"}
                {t === "dino" && "🦖"}
                {t === "robot" && "🤖"}
              </span>
              <span className="text-[12px] font-semibold capitalize text-ink">{t}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="text-[13px] font-medium text-body">Enable Desktop Pet</label>
          <button
            onClick={() => saveConfig({ ...config, visible: !config.visible })}
            className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
              config.visible ? "bg-emerald-500" : "bg-gray-350"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                config.visible ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-[14px] font-bold text-ink border-b border-hairline pb-2">Personality & Mood</h2>
        
        <div className="space-y-2">
          {(["encouraging", "sassy", "quiet"] as const).map((p) => (
            <label
              key={p}
              className="flex items-center justify-between p-3 rounded-lg border border-hairline hover:bg-cream cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="personality"
                  checked={config.personality === p}
                  onChange={() => saveConfig({ ...config, personality: p })}
                  className="accent-emerald-500"
                />
                <span className="text-[13px] font-semibold capitalize text-ink">{p}</span>
              </div>
              <span className="text-[11px] text-mute">
                {p === "encouraging" && "Cheerful, supportive feedback"}
                {p === "sassy" && "Witty comments, high sarcasm"}
                {p === "quiet" && "Minimalist emojis, very quiet"}
              </span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-[14px] font-bold text-ink border-b border-hairline pb-2">Test Status Animations</h2>
        <p className="text-[12px] text-mute">Click a state below to trigger a live status transition on your Desktop Pet:</p>
        
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { id: "idle", label: "Idle 💤", color: "hover:bg-slate-100 border-slate-200" },
            { id: "thinking", label: "Think 🧠", color: "hover:bg-amber-50 border-amber-200" },
            { id: "working", label: "Work 🔨", color: "hover:bg-blue-50 border-blue-200" },
            { id: "done", label: "Done ✨", color: "hover:bg-emerald-50 border-emerald-200" },
            { id: "error", label: "Error ⚠️", color: "hover:bg-rose-50 border-rose-200" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => triggerStatus(item.id as any)}
              className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-ink shadow-sm transition ${item.color}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
