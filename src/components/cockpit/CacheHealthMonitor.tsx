interface Props {
  hitRate: number;
  savedTokens: number;
  savedCost: number;
}

export function CacheHealthMonitor({ hitRate, savedTokens, savedCost }: Props) {
  const color = hitRate > 0.8 ? "#3fb950" : hitRate > 0.4 ? "#d29922" : "#f85149";
  const label = hitRate > 0.8 ? "Healthy" : hitRate > 0.4 ? "Fair" : "Poor";

  return (
    <div className="p-3 text-xs">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[#8b949e]">Cache Health</span>
        <span className="font-mono font-medium" style={{ color }}>{label}</span>
      </div>
      <div className="h-1.5 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${hitRate * 100}%`, background: color }}
        />
      </div>
      <div className="flex justify-between text-[#484f58] font-mono">
        <span>{(hitRate * 100).toFixed(0)}% hit</span>
        <span>{(savedTokens / 1000).toFixed(0)}k saved</span>
        <span>${savedCost.toFixed(2)} saved</span>
      </div>
    </div>
  );
}