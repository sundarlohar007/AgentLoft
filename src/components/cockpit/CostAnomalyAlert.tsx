interface Anomaly {
  turn: number;
  cost: number;
  average: number;
  multiplier: number;
}

interface Props {
  anomaly: Anomaly | null;
  onPause: () => void;
  onContinue: () => void;
  onSwitch: () => void;
}

export function CostAnomalyAlert({ anomaly, onPause, onContinue, onSwitch }: Props) {
  if (!anomaly) return null;

  return (
    <div
      className="animate-slide-up fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg border px-5 py-3 text-sm shadow-lg"
      style={{
        background: "rgba(22, 27, 34, 0.98)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(248, 81, 73, 0.3)",
        color: "#c9d1d9",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{'\u{26A0}\u{FE0F}'}</span>
        <div>
          <p className="font-medium text-[#f85149]">Cost Spike Detected</p>
          <p className="text-xs text-[#8b949e]">
            ${anomaly.cost.toFixed(2)} this turn vs ${anomaly.average.toFixed(2)} avg
            ({anomaly.multiplier.toFixed(1)}x spike, turn {anomaly.turn})
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onPause}
          className="rounded px-3 py-1 text-xs font-medium bg-[#f8514915] text-[#f85149] hover:bg-[#f8514925]"
        >
          Pause Session
        </button>
        <button
          onClick={onContinue}
          className="rounded px-3 py-1 text-xs font-medium bg-[#7cc7a010] text-[#7cc7a0] hover:bg-[#7cc7a020]"
        >
          Continue
        </button>
        <button
          onClick={onSwitch}
          className="rounded px-3 py-1 text-xs font-medium bg-[#58a6ff10] text-[#58a6ff] hover:bg-[#58a6ff20]"
        >
          Switch Model
        </button>
      </div>
    </div>
  );
}