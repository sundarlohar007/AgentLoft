interface Props {
  currentModel: string;
  currentCost: number;
  alternatives: Array<{ model: string; estimatedCost: number; savings: number }>;
  onSwitch: (model: string) => void;
}

export function ModelCostComparison({ currentModel, currentCost, alternatives, onSwitch }: Props) {
  if (alternatives.length === 0) {
    return <div className="p-3 text-xs text-[#484f58]">No alternatives available.</div>;
  }

  return (
    <div className="p-2 text-xs space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[#8b949e]">Current:</span>
        <span className="font-mono text-[#c9d1d9]">{currentModel} — ${currentCost.toFixed(2)}</span>
      </div>
      {alternatives.map((alt) => (
        <div key={alt.model} className="flex items-center justify-between">
          <span className="text-[#8b949e]">{alt.model}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#3fb950]">
              ${alt.estimatedCost.toFixed(2)}
            </span>
            <button
              onClick={() => onSwitch(alt.model)}
              className="rounded px-1.5 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a008]"
            >
              Switch
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}