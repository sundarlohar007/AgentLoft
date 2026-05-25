import { useSessionStore } from "@/stores/sessionStore";
import { useSettingsStore } from "@/stores/settingsStore";

export function CostTicker() {
  const { cost } = useSessionStore();
  const { costCalmMode } = useSettingsStore();

  const totalColor = cost.totalUsd < 1 ? "#3fb950" : cost.totalUsd < 5 ? "#d29922" : "#f85149";

  if (costCalmMode) {
    return (
      <span className="text-xs font-mono" style={{ color: totalColor }}>
        Session: ${cost.totalUsd.toFixed(2)}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs font-mono">
      <span style={{ color: totalColor }}>
        ${cost.totalUsd.toFixed(2)}
      </span>
      <span className="text-[#484f58]">|</span>
      <span className="text-[#8b949e]">
        Last: ${cost.lastTurnUsd.toFixed(3)}
      </span>
      <span className="text-[#484f58]">|</span>
      <span className="text-[#8b949e]">
        Cache: {(cost.cacheHitRate * 100).toFixed(0)}%
      </span>
    </span>
  );
}