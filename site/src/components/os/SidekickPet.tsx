import { useState, useEffect, useRef } from "react";
import type { WindowManager } from "./useWindows";

type PetState = "idle" | "thinking" | "working" | "done" | "error";

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

export function SidekickPet({ wm }: { wm: WindowManager }) {
  const [config, setConfig] = useState<PetConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<PetState>("idle");
  const [bubbleText, setBubbleText] = useState<string>("");
  const [bubbleVisible, setBubbleVisible] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 20, y: 80 }); // start top-right/middle
  const [isDragging, setIsDragging] = useState(false);
  
  const petRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  // Load config on mount and listen to settings change
  useEffect(() => {
    const saved = localStorage.getItem("uitkit_sidekick_config");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (_) {}
    }

    // Interval to cycle status for demo / life simulation
    const interval = setInterval(() => {
      // Periodic fun speech bubble if idle
      setStatus((current) => {
        if (current === "idle" && Math.random() < 0.2) {
          showBubble(getRandomSpeech(config.type, config.personality, "idle"));
        }
        return current;
      });
    }, 15000);

    // Watch custom storage event to sync with Settings App
    const handleStorageChange = () => {
      const updated = localStorage.getItem("uitkit_sidekick_config");
      if (updated) {
        try { setConfig(JSON.parse(updated)); } catch (_) {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("uitkit_sidekick_update", handleStorageChange);

    // Listener for manual state changes from Swarm/other apps
    const handleStatusChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ status: PetState; message?: string }>;
      if (customEvent.detail?.status) {
        setStatus(customEvent.detail.status);
        if (customEvent.detail.message) {
          showBubble(customEvent.detail.message);
        } else {
          showBubble(getRandomSpeech(config.type, config.personality, customEvent.detail.status));
        }
      }
    };
    window.addEventListener("sidekick_status_change" as any, handleStatusChange);

    // Initial greeting
    setTimeout(() => {
      showBubble("Hi there! I am your Agent Sidekick! Double-click me for settings.");
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("uitkit_sidekick_update", handleStorageChange);
      window.removeEventListener("sidekick_status_change" as any, handleStatusChange);
    };
  }, [config.type, config.personality]);

  const showBubble = (text: string) => {
    setBubbleText(text);
    setBubbleVisible(true);
    // Hide bubble after 5s
    setTimeout(() => {
      setBubbleVisible(false);
    }, 5000);
  };

  const getRandomSpeech = (type: string, personality: string, state: PetState): string => {
    const speechMap: Record<PetState, string[]> = {
      idle: [
        "Everything's quiet... ready for commands!",
        "Stretching my code legs.",
        "Awaiting instruction, master.",
        "Is it coffee break yet?",
      ],
      thinking: [
        "Analyzing the logic...",
        "Querying the mind galaxy...",
        "Thinking... thinking...",
        "Consulting with the model...",
      ],
      working: [
        "Writing clean lines!",
        "Refactoring stuff. Watch the speed!",
        "Compiling assets, sit tight.",
        "Building beautiful UI!",
      ],
      done: [
        "Ta-da! Build completed successfully!",
        "Looking good! Checked and approved.",
        "Ship it! We are good to go.",
        "Perfect run!",
      ],
      error: [
        "Uh oh, encountered an issue.",
        "That didn't quite compile.",
        "Oops, look at the logs!",
        "Need a hand debugging?",
      ],
    };

    const sassySpeech: Record<PetState, string[]> = {
      idle: [
        "Are you going to code or just stare at me?",
        "Don't mind me, just saving your career.",
        "Zzz... let me know when it gets interesting.",
      ],
      thinking: [
        "This query is a bit basic, isn't it?",
        "Searching for your lost semicolons.",
        "Calculating how much faster I am than you.",
      ],
      working: [
        "Doing the heavy lifting as usual.",
        "Writing better code than StackOverflow.",
        "Almost done. Try not to break it this time.",
      ],
      done: [
        "You're welcome. It is flawless.",
        "Boom. Perfect. Clean up your desk now.",
        "Done. Now go get some fresh air.",
      ],
      error: [
        "Yup, definitely a user error.",
        "Don't blame me, look at your codebase.",
        "Let's pretend that didn't happen.",
      ],
    };

    const quietSpeech: Record<PetState, string[]> = {
      idle: ["...", "💤", "Ready."],
      thinking: ["...", "🧠", "Searching."],
      working: ["🔨", "Writing.", "Coding."],
      done: ["✨ Success.", "Done.", "✓"],
      error: ["⚠️ Alert.", "Error.", "❌"],
    };

    const pool = personality === "sassy" ? sassySpeech[state] : personality === "quiet" ? quietSpeech[state] : speechMap[state];
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Draggable logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Keep within bounds
      let newX = e.clientX - dragStart.current.x;
      let newY = e.clientY - dragStart.current.y;
      
      // Restrict within window size
      newX = Math.max(0, Math.min(window.innerWidth - 80, newX));
      newY = Math.max(0, Math.min(window.innerHeight - 80, newY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!config.visible) return null;

  // Render different SVG animations based on type and status
  const renderPetSvg = () => {
    const type = config.type;
    const isWorking = status === "working";
    const isThinking = status === "thinking";
    const isError = status === "error";
    const isDone = status === "done";

    // Animation classes based on state
    const animationClass = isThinking 
      ? "animate-bounce duration-500" 
      : isWorking 
      ? "animate-pulse" 
      : isDone 
      ? "animate-bounce" 
      : "";

    if (type === "dino") {
      return (
        <svg viewBox="0 0 64 64" className={`size-14 ${animationClass} transition-transform`}>
          {/* Body */}
          <rect x="16" y="24" width="28" height="24" rx="4" fill="#10b981" />
          <rect x="28" y="12" width="20" height="16" rx="4" fill="#10b981" />
          {/* Tail */}
          <path d="M12 40 L16 36 L16 44 Z" fill="#059669" />
          {/* Eyes */}
          <rect x="40" y="16" width="4" height="4" fill={isError ? "#ef4444" : "#ffffff"} />
          <rect x="42" y="18" width="2" height="2" fill="#000000" />
          {/* Back Scales */}
          <path d="M14 28 L16 26 L18 28 M20 28 L22 26 L24 28 M26 28 L28 26 L30 28" stroke="#f59e0b" strokeWidth="2" fill="none" />
          {/* Feet */}
          <rect x="20" y="48" width="6" height="4" fill="#059669" className={isWorking ? "animate-bounce" : ""} />
          <rect x="34" y="48" width="6" height="4" fill="#059669" className={isWorking ? "animate-bounce [animation-delay:0.2s]" : ""} />
          {/* Face items */}
          {isWorking && <path d="M38 40 H44" stroke="#000" strokeWidth="2" />}
          {isThinking && <circle cx="42" cy="8" r="1.5" fill="#f59e0b" />}
        </svg>
      );
    }

    if (type === "robot") {
      return (
        <svg viewBox="0 0 64 64" className={`size-14 ${animationClass} transition-transform`}>
          {/* Head & Antenna */}
          <line x1="32" y1="12" x2="32" y2="6" stroke="#4b5563" strokeWidth="2" />
          <circle cx="32" cy="5" r="2" fill={isThinking ? "#f59e0b" : "#ef4444"} />
          <rect x="18" y="12" width="28" height="20" rx="3" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="27" cy="20" r="3" fill={isError ? "#ef4444" : isWorking ? "#10b981" : "#60a5fa"} />
          <circle cx="37" cy="20" r="3" fill={isError ? "#ef4444" : isWorking ? "#10b981" : "#60a5fa"} />
          {/* Body */}
          <rect x="22" y="32" width="20" height="20" rx="2" fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
          {/* Screen / Chest */}
          <rect x="26" y="36" width="12" height="8" fill="#1f2937" />
          {/* Hands */}
          <line x1="16" y1="36" x2="22" y2="40" stroke="#4b5563" strokeWidth="3" className={isWorking ? "origin-right animate-spin" : ""} />
          <line x1="48" y1="36" x2="42" y2="40" stroke="#4b5563" strokeWidth="3" className={isWorking ? "origin-left animate-spin" : ""} />
          {/* Bottom wheel */}
          <circle cx="32" cy="55" r="4" fill="#374151" className={isWorking ? "animate-pulse" : ""} />
        </svg>
      );
    }

    // Default Rabbit
    return (
      <svg viewBox="0 0 64 64" className={`size-14 ${animationClass} transition-transform`}>
        {/* Ears */}
        <ellipse cx="24" cy="14" rx="4" ry="10" fill="#f87171" transform="rotate(-10 24 14)" />
        <ellipse cx="40" cy="14" rx="4" ry="10" fill="#f87171" transform="rotate(10 40 14)" />
        <ellipse cx="24" cy="15" rx="2" ry="7" fill="#fca5a5" transform="rotate(-10 24 15)" />
        <ellipse cx="40" cy="15" rx="2" ry="7" fill="#fca5a5" transform="rotate(10 40 15)" />
        {/* Head */}
        <ellipse cx="32" cy="28" rx="14" ry="11" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />
        {/* Eyes */}
        <circle cx="26" cy="26" r="2" fill={isError ? "#ef4444" : "#1e293b"} />
        <circle cx="38" cy="26" r="2" fill={isError ? "#ef4444" : "#1e293b"} />
        {/* Cheeks */}
        <circle cx="20" cy="30" r="2" fill="#fca5a5" opacity="0.6" />
        <circle cx="44" cy="30" r="2" fill="#fca5a5" opacity="0.6" />
        {/* Nose & Mouth */}
        <polygon points="31,29 33,29 32,31" fill="#f87171" />
        {/* Body */}
        <ellipse cx="32" cy="46" rx="16" ry="12" fill="#f3f4f6" />
        {/* Feet */}
        <ellipse cx="24" cy="56" rx="4" ry="3" fill="#e5e7eb" className={isWorking ? "animate-bounce" : ""} />
        <ellipse cx="40" cy="56" rx="4" ry="3" fill="#e5e7eb" className={isWorking ? "animate-bounce [animation-delay:0.1s]" : ""} />
      </svg>
    );
  };

  return (
    <div
      ref={petRef}
      style={{
        left: position.x,
        top: position.y,
        zIndex: 9998,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="absolute no-select transition-shadow duration-200"
      onMouseDown={handleMouseDown}
      onDoubleClick={() => wm.open("sidekick-settings" as any)}
      onClick={() => showBubble(getRandomSpeech(config.type, config.personality, status))}
    >
      {/* Speech Bubble */}
      {bubbleVisible && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/95 text-ink text-[12px] font-medium border border-hairline px-3 py-2 rounded-xl shadow-lg w-48 text-center pointer-events-none animate-in fade-in zoom-in-95 duration-200"
          style={{ backdropFilter: "blur(6px)" }}
        >
          {bubbleText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[6px] border-t-white/95"></div>
        </div>
      )}

      {/* Pet Character representation */}
      <div className="relative group p-1 flex flex-col items-center">
        <div className="absolute inset-0 bg-olive/5 rounded-full filter blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
        
        {/* The Animated Pet Body */}
        {renderPetSvg()}

        {/* Small badge for Status */}
        <span 
          className={`absolute bottom-4 right-2 size-3.5 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${
            status === "idle" 
              ? "bg-slate-400" 
              : status === "thinking" 
              ? "bg-amber-500 animate-spin" 
              : status === "working" 
              ? "bg-blue-500 animate-pulse" 
              : status === "done" 
              ? "bg-emerald-500" 
              : "bg-rose-500"
          }`}
        >
          {status === "idle" && "💤"}
          {status === "thinking" && "🧠"}
          {status === "working" && "🔨"}
          {status === "done" && "✨"}
          {status === "error" && "⚠️"}
        </span>
      </div>
    </div>
  );
}
