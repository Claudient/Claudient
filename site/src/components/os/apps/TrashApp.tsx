export function TrashApp() {
  const items = [
    "vendor_lock_in.json",
    "paywall_per_seat.yaml",
    "closed_source_policy.md",
    "3_day_onboarding.pdf",
    "manual_setup_guide.docx",
  ];
  return (
    <div className="px-7 py-7 text-center">
      <div className="text-5xl">🗑️</div>
      <h1 className="mt-3 text-xl font-extrabold text-ink">Trash</h1>
      <p className="text-[13px] text-mute">Things we threw out so you don't need them.</p>
      <div className="mt-5 max-w-sm mx-auto space-y-2 text-left">
        {items.map((it) => (
          <div
            key={it}
            className="flex items-center gap-2.5 rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-[13px] font-mono text-mute line-through"
          >
            📄 {it}
          </div>
        ))}
      </div>
    </div>
  );
}
