import { DESKTOP_ICONS, APPS } from "./apps";
import type { WindowManager } from "./useWindows";

export function Desktop({ wm }: { wm: WindowManager }) {
  return (
    <div className="absolute inset-0 p-3 pt-2">
      <div className="grid grid-flow-col grid-rows-6 sm:grid-rows-7 gap-1 w-fit">
        {DESKTOP_ICONS.map((id) => {
          const meta = APPS[id];
          return (
            <button
              key={id}
              onDoubleClick={() => wm.open(id)}
              onClick={() => wm.open(id)}
              className="group flex flex-col items-center gap-1 w-[78px] rounded-lg px-1 py-2 hover:bg-white/40 focus:bg-white/60 outline-none no-select"
            >
              <span
                className="grid place-items-center size-11 rounded-xl text-2xl border border-hairline bg-white/80 group-hover:bg-white group-hover:-translate-y-0.5 transition"
                style={{ boxShadow: "0 2px 6px -2px rgba(0,0,0,0.15)" }}
              >
                {meta.icon}
              </span>
              <span className="text-[11px] font-semibold text-ink text-center leading-tight drop-shadow-sm">
                {meta.title.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
