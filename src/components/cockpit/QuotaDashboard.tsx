const DEFAULT_QUOTAS = [
  { provider: "Claude Code", usage: 4500, limit: 20000, unit: "tokens/min", resetDays: 0.04 },
  { provider: "Codex CLI", usage: 800, limit: 10000, unit: "requests/day", resetDays: 0.5 },
  { provider: "Antigravity", usage: 120, limit: 1500, unit: "requests/day", resetDays: 0.75 },
];

interface Props {
  quotas?: typeof DEFAULT_QUOTAS;
}

export function UnifiedQuotaDashboard({ quotas = DEFAULT_QUOTAS }: Props) {
  return (
    <div className="p-3 text-xs space-y-2">
      {quotas.map((q) => {
        const pct = Math.min((q.usage / q.limit) * 100, 100);
        const color = pct > 80 ? "#f85149" : pct > 50 ? "#d29922" : "#3fb950";

        return (
          <div key={q.provider}>
            <div className="flex items-center justify-between">
              <span className="text-[#c9d1d9] font-medium">{q.provider}</span>
              <span className="font-mono text-[#8b949e] text-xs">
                {q.usage.toLocaleString()} / {q.limit.toLocaleString()} {q.unit}
              </span>
            </div>
            <div className="mt-0.5 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}