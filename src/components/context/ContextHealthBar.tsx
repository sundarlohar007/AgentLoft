interface Props {
  score: number;
}

export function ContextHealthBar({ score }: Props) {
  const color = score > 70 ? "#3fb950" : score > 40 ? "#d29922" : "#f85149";
  const label = score > 70 ? "Healthy" : score > 40 ? "Warning" : "Critical";

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-[#8b949e]">Context:</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", minWidth: 60 }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="font-mono" style={{ color }}>{label}</span>
    </div>
  );
}