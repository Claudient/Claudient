import { useState, useEffect } from "react";
import { Eyebrow, Card, YellowButton } from "./ui";

type StudioTab = "music" | "video" | "game" | "thumbnail";

export function StudiosApp() {
  const [activeTab, setActiveTab] = useState<StudioTab>("music");
  const [prompt, setPrompt] = useState("Lofi coding beats with rain sound effects");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<any>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedAsset(null);

    // Update Sidekick Pet
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "working", message: `Generating studio asset...` }
    }));
  };

  useEffect(() => {
    if (!isGenerating) return;

    const timer = setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAsset({
        title: prompt,
        timestamp: new Date().toLocaleTimeString(),
        type: activeTab,
      });

      // Update Sidekick Pet
      window.dispatchEvent(new CustomEvent("sidekick_status_change", {
        detail: { status: "done", message: `Asset complete: ${prompt.substring(0, 15)}...` }
      }));
    }, 2800);

    return () => clearTimeout(timer);
  }, [isGenerating, prompt, activeTab]);

  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-hairline pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎵</span>
          <div>
            <Eyebrow color="#ec4899">Creative Studios</Eyebrow>
            <h1 className="text-xl font-extrabold text-ink">Multimodal Asset Generator</h1>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          {([
            { id: "music", label: "Music 🎵" },
            { id: "video", label: "Video 🎥" },
            { id: "game", label: "Game 🎮" },
            { id: "thumbnail", label: "Banner 🖼️" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setGeneratedAsset(null);
                setPrompt(
                  tab.id === "music" ? "Lofi coding beats with rain sound effects" :
                  tab.id === "video" ? "Short developer reel outline with zoom transitions" :
                  tab.id === "game" ? "Simple platformer game runner canvas logic" :
                  "Landing page banner with neon grid layouts"
                );
              }}
              className={`px-3 py-1 text-[12px] font-bold rounded-lg transition ${
                activeTab === tab.id ? "bg-white text-pink-600 shadow-sm" : "text-mute hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generation Form */}
      <form onSubmit={handleGenerate} className="flex gap-2 shrink-0">
        <input
          disabled={isGenerating}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Enter prompt details for ${activeTab}...`}
          className="flex-1 text-[13px] border border-hairline rounded-lg px-3 py-2 outline-none focus:border-pink-500 bg-white"
        />
        <YellowButton disabled={isGenerating} className="bg-pink-500 border-pink-700 text-white hover:brightness-[1.05]">
          {isGenerating ? "Generating..." : "Generate Asset"}
        </YellowButton>
      </form>

      {/* Main output preview container */}
      <div className="flex-1 flex flex-col justify-center min-h-[220px]">
        {isGenerating ? (
          <div className="flex flex-col justify-center items-center py-12">
            <span className="inline-block size-7 rounded-full border-2 border-pink-500 border-t-transparent animate-spin mb-2"></span>
            <span className="text-[12px] text-mute font-mono">Synthesizing multimodal models...</span>
          </div>
        ) : generatedAsset ? (
          <Card className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-hairline pb-2 flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-ink">Output: {generatedAsset.title}</h3>
              <span className="text-[10px] text-mute font-mono">Generated: {generatedAsset.timestamp}</span>
            </div>

            {/* Tab specific render stubs */}
            {activeTab === "music" && (
              <div className="flex flex-col items-center py-6 space-y-3 bg-pink-50/10 border border-pink-100/50 rounded-2xl p-4">
                <span className="text-4xl animate-bounce">🎶</span>
                {/* Waveform graphic */}
                <div className="flex gap-1.5 h-12 items-center">
                  {[2, 4, 3, 5, 8, 2, 7, 9, 3, 6, 8, 4, 2].map((val, idx) => (
                    <div 
                      key={idx} 
                      style={{ height: `${val * 10}%` }}
                      className="w-1.5 bg-pink-500 rounded animate-[pulse_1.5s_infinite]" 
                    />
                  ))}
                </div>
                <div className="text-[12.5px] font-bold text-pink-700">Lofi_Beat_Output.mp3</div>
              </div>
            )}

            {activeTab === "video" && (
              <div className="flex flex-col items-center py-6 bg-purple-50/10 border border-purple-100/50 rounded-2xl p-4 space-y-3">
                <span className="text-4xl animate-pulse">🎥</span>
                <div className="text-[12.5px] font-bold text-purple-700">Reel_Timeline_Track.mp4</div>
                <div className="flex gap-1 text-[10px] font-mono text-zinc-550">
                  <span className="bg-purple-100 px-2 py-0.5 rounded">Frame 01: Intro</span>
                  <span className="bg-purple-100 px-2 py-0.5 rounded">Frame 02: Scale zoom</span>
                  <span className="bg-purple-100 px-2 py-0.5 rounded">Frame 03: Outro</span>
                </div>
              </div>
            )}

            {activeTab === "game" && (
              <div className="flex flex-col items-center py-6 bg-indigo-50/10 border border-indigo-100/50 rounded-2xl p-4 space-y-2">
                <span className="text-4xl">🎮</span>
                <div className="text-[12.5px] font-bold text-indigo-700">Platformer_Runner.js</div>
                <div className="w-full bg-zinc-950 p-3 rounded-lg text-zinc-200 font-mono text-[11px] h-20 overflow-y-auto">
                  {`// Simple physics engine loop
function update() {
  player.x += player.vx;
  player.vy += gravity;
  checkCollisions();
}`}
                </div>
              </div>
            )}

            {activeTab === "thumbnail" && (
              <div className="grid grid-cols-2 gap-3 bg-rose-50/10 border border-rose-100/50 rounded-2xl p-4">
                {[
                  { size: "1280 x 720 (YouTube)", code: "bg-gradient-to-br from-pink-500 to-rose-600" },
                  { size: "1080 x 1080 (Square)", code: "bg-gradient-to-tr from-purple-500 to-indigo-600" },
                ].map((th, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 border border-hairline p-3 rounded-xl bg-white shadow-sm">
                    <div className={`w-full h-20 rounded ${th.code} shadow-inner flex items-center justify-center text-white text-xl font-bold`}>
                      Banner {i + 1}
                    </div>
                    <span className="text-[11px] font-bold text-mute">{th.size}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ) : (
          <Card className="flex-1 flex flex-col items-center justify-center text-center text-mute border border-hairline bg-white/50 rounded-xl p-10">
            <span className="text-5xl mb-3">🎨</span>
            <h3 className="font-bold text-ink">Ingested Asset Preview</h3>
            <p className="text-[12.5px] mt-1 max-w-sm">
              Press "Generate Asset" above to simulate structured compiler exports.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
