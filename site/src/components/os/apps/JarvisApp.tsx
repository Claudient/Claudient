import { useState, useEffect, useRef } from "react";
import { Eyebrow, Card, YellowButton } from "./ui";

interface SpeechLog {
  speaker: "user" | "jarvis";
  text: string;
  timestamp: string;
}

const PRESET_COMMANDS = [
  { text: "Jarvis, what is the status of my goals?", response: "Accessing Goal Tracker... Project: 'Build UitKit CLI Upgrades' is currently at 50% progress. Hermes Builder is working on local eval commands." },
  { text: "Jarvis, find trending AI news.", response: "Scanned trends index. 'Vibe Coding & Iterative Loops' leads with a 98% relevance score. DeepMind Antigravity 2.0 system is trending high." },
  { text: "Jarvis, trigger a compiler safety check.", response: "Enforcing safe commit compilation hooks. Intercepting repository edits... Check complete. Working tree is clean." },
];

export function JarvisApp() {
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState<SpeechLog[]>([
    { speaker: "jarvis", text: "Systems online. How can I assist you with your agentic workspace today?", timestamp: "00:00" }
  ]);
  const [speechPulse, setSpeechPulse] = useState(1);
  const pulseInterval = useRef<NodeJS.Timeout | null>(null);

  const startListening = () => {
    if (isListening) return;
    setIsListening(true);
    
    // Notify Sidekick
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "thinking", message: "Listening to voice input..." }
    }));
  };

  const handleCommand = (cmdText: string, replyText: string) => {
    setIsListening(false);
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [
      ...prev,
      { speaker: "user", text: cmdText, timestamp: time },
      { speaker: "jarvis", text: replyText, timestamp: time }
    ]);

    // Update Sidekick
    window.dispatchEvent(new CustomEvent("sidekick_status_change", {
      detail: { status: "done", message: "Command processed." }
    }));
  };

  useEffect(() => {
    if (isListening) {
      // Simulate concentric wave pulse
      pulseInterval.current = setInterval(() => {
        setSpeechPulse(Math.random() * 0.4 + 0.9); // scale factor between 0.9 and 1.3
      }, 150);
    } else {
      if (pulseInterval.current) clearInterval(pulseInterval.current);
      setSpeechPulse(1.0);
    }

    return () => {
      if (pulseInterval.current) clearInterval(pulseInterval.current);
    };
  }, [isListening]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-5 p-5 overflow-y-auto">
      {/* Left panel: Jarvis concentric orb */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 items-center justify-center">
        <Card className="w-full flex flex-col items-center gap-5 bg-slate-950 border-slate-800 text-white p-6 relative overflow-hidden">
          <div className="w-full border-b border-slate-800 pb-2 flex justify-between items-center z-10">
            <div>
              <Eyebrow color="#a855f7">Jarvis Engine</Eyebrow>
              <h2 className="text-[13px] font-bold">Voice Assistant</h2>
            </div>
            <span className={`inline-block size-2 rounded-full ${isListening ? "bg-purple-400 animate-ping" : "bg-slate-600"}`}></span>
          </div>

          {/* Pulsing visual concentric orb */}
          <div className="relative size-40 flex items-center justify-center my-4 z-10">
            {/* Wave 3 */}
            <div 
              style={{ transform: `scale(${speechPulse * 1.3})` }}
              className={`absolute size-28 rounded-full bg-purple-500/10 border border-purple-500/20 transition-transform duration-150 ${isListening ? "animate-pulse" : ""}`}
            />
            {/* Wave 2 */}
            <div 
              style={{ transform: `scale(${speechPulse * 1.15})` }}
              className={`absolute size-24 rounded-full bg-purple-500/15 border border-purple-500/30 transition-transform duration-150`}
            />
            {/* Wave 1 (Center) */}
            <div 
              style={{ transform: `scale(${speechPulse})` }}
              className={`absolute size-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400 transition-transform duration-150 flex items-center justify-center`}
            >
              <span className="text-3xl select-none">{isListening ? "🎙️" : "🔮"}</span>
            </div>
          </div>

          <div className="text-center z-10 space-y-1">
            <div className="text-[12.5px] font-semibold text-zinc-400">
              {isListening ? "Say something or click preset command..." : "Jarvis Mode Offline"}
            </div>
            <p className="text-[11px] text-zinc-500">Concentric Voice Frequency waves active</p>
          </div>

          <YellowButton 
            onClick={startListening}
            disabled={isListening}
            className="w-full justify-center bg-purple-600 border-purple-800 text-white hover:brightness-[1.05] z-10 text-[12px]"
          >
            {isListening ? "Listening..." : "Tap to Speak"}
          </YellowButton>
        </Card>
      </div>

      {/* Right panel: preset shortcuts and logs */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Preset commands */}
        <Card className="space-y-3 shrink-0">
          <h3 className="text-[13px] font-bold text-ink border-b border-hairline pb-2">Trigger Simulated Voice Commands</h3>
          <div className="grid grid-cols-1 gap-2">
            {PRESET_COMMANDS.map((cmd, i) => (
              <button
                key={i}
                disabled={isListening}
                onClick={() => handleCommand(cmd.text, cmd.response)}
                className="w-full text-left p-3 rounded-xl border border-hairline hover:border-purple-500/40 hover:bg-cream transition text-[12.5px] flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-indigo-600 block text-[10.5px] uppercase">Voice Shortcut</span>
                  <span className="text-ink font-semibold italic">"{cmd.text}"</span>
                </div>
                <span className="text-lg">🗣️</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Subtitles & transcript logs */}
        <Card className="flex-1 bg-zinc-950 border-none text-zinc-350 p-4 font-mono text-[12px] h-[190px] overflow-y-auto flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-zinc-500 border-b border-zinc-900 pb-1.5 mb-1 uppercase tracking-wider">
            🔊 Speech Transcript Stream
          </h4>
          
          <div className="flex-1 space-y-3">
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 text-[12px] ${
                  log.speaker === "user" ? "text-cyan-400 pl-4 border-l-2 border-cyan-500/30" : "text-purple-300"
                }`}
              >
                <span className="font-bold uppercase text-[10px] text-zinc-500 select-none">
                  [{log.timestamp}] {log.speaker}:
                </span>
                <span className="flex-1 font-semibold">"{log.text}"</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
