interface WasteMetric {
  feature: string;
  tokensSaved: number;
  icon: string;
}

interface Props {
  sessionMetrics: WasteMetric[];
  combinedRatio: number;
  allTimeTokensSaved: number;
}

export function ZeroWasteDashboard({ sessionMetrics, combinedRatio, allTimeTokensSaved }: Props) {
  const ratioPct = (combinedRatio * 100).toFixed(0);
  const color = combinedRatio > 0.5 ? "#3fb950" : combinedRatio > 0.3 ? "#d29922" : "#8b949e";

  return (
    <div className="p-3 text-xs space-y-3">
      {/* Status bar chip */}
      <div className="flex items-center justify-between">
        <span className="text-[#8b949e] font-medium">Zero-Waste Savings</span>
        <span className="font-mono font-bold text-lg" style={{ color }}>
          {ratioPct}% saved
        </span>
      </div>

      {/* Per-feature breakdown */}
      <div className="space-y-1.5">
        {sessionMetrics.map((m) => (
          <div key={m.feature} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span>{m.icon}</span>
              <span className="text-[#c9d1d9]">{m.feature}</span>
            </div>
            <span className="font-mono text-[#7cc7a0]">
              {m.tokensSaved >= 1000
                ? `${(m.tokensSaved / 1000).toFixed(0)}k saved`
                : `${m.tokensSaved} saved`}
            </span>
          </div>
        ))}
      </div>

      {/* All-time stats */}
      <div className="rounded-md border px-2 py-1.5" style={{ borderColor: "rgba(124, 199, 160, 0.1)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[#8b949e]">All-time saved</span>
          <span className="font-mono text-[#7cc7a0]">
            {(allTimeTokensSaved / 1000).toFixed(0)}k tokens
          </span>
        </div>
        <div className="mt-0.5 text-[#484f58]">
          ~${((allTimeTokensSaved / 1000) * 0.003).toFixed(2)} estimated saved
        </div>
      </div>

      {/* Shareable export hint */}
      <div className="text-center">
        <button
          className="rounded px-3 py-1 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a010] border"
          style={{ borderColor: "rgba(124, 199, 160, 0.15)" }}
        >
          Export Savings Card (PNG)
        </button>
      </div>
    </div>
  );
}