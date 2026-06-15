import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export function Eyebrow({ children, color = "#f54e00" }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color }}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-hairline bg-white p-5", className)}>{children}</div>;
}

export function YellowButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5 rounded-md bg-brand-yellow px-4 py-2 text-[13px] font-bold text-ink border-b-2 border-[#c79700] hover:brightness-[1.03] active:translate-y-px transition", className)}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5 rounded-md border border-olive/60 bg-white px-4 py-2 text-[13px] font-semibold text-ink hover:bg-cream transition", className)}
    >
      {children}
    </button>
  );
}

export function Tag({ children, color = "#1d4aff" }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ color, backgroundColor: color + "1a" }}>
      {children}
    </span>
  );
}
