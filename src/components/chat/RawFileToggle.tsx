import { GlassBadge } from "@/components/shared/primitives";

interface Props {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  estimatedTokensSaved: number;
}

export function RawFileToggle({ enabled, onToggle, estimatedTokensSaved }: Props) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs cursor-pointer select-none transition-colors"
      style={{
        borderColor: enabled ? "rgba(124, 199, 160, 0.25)" : "rgba(124, 199, 160, 0.08)",
        background: enabled ? "rgba(124, 199, 160, 0.06)" : "transparent",
        fontFamily: "'JetBrains Mono', monospace",
      }}
      onClick={() => onToggle(!enabled)}
    >
      <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="accent-[#7cc7a0]" />
      <span className="text-[#c9d1d9]">{enabled ? "Raw" : "Line Numbers"}</span>
      {enabled && estimatedTokensSaved > 0 && (
        <GlassBadge color="green">~{Math.round(estimatedTokensSaved / 1000)}k saved</GlassBadge>
      )}
      <span className="text-[#8b949e]">Ctrl+Shift+R</span>
    </div>
  );
}