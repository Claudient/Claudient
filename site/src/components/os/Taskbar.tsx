import type { WindowManager } from "./useWindows";
import { APPS } from "./apps";
import { cn } from "../../utils/cn";

export function Taskbar({ wm, topKey }: { wm: WindowManager; topKey?: string }) {
  if (wm.windows.length === 0) return null;
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-1 rounded-2xl border border-hairline bg-white/85 backdrop-blur px-2 py-1.5 win-shadow no-select max-w-[94vw] overflow-x-auto">
      {wm.windows.map((w) => {
        const meta = APPS[w.appId];
        const active = w.key === topKey && !w.minimized;
        return (
          <button
            key={w.key}
            onClick={() => (w.minimized ? wm.focus(w.key) : active ? wm.minimize(w.key) : wm.focus(w.key))}
            title={meta.title}
            className={cn(
              "relative flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[12px] font-semibold transition",
              active ? "bg-cream text-ink" : "text-body hover:bg-cream/70",
              w.minimized && "opacity-55"
            )}
          >
            <span className="text-base">{meta.icon}</span>
            <span className="hidden sm:block max-w-[110px] truncate">
              {meta.title.split(" ")[0]}
            </span>
            <span
              className={cn(
                "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all",
                active ? "w-4 bg-brand-red" : "w-1.5 bg-olive/60"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
