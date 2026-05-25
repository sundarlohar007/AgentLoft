import { GlassBadge } from "@/components/shared/primitives";
import type { ToolCall } from "@/lib/types";

interface Props {
  toolCall?: ToolCall;
}

export function BlastRadiusPreview({ toolCall }: Props) {
  if (!toolCall) {
    return <div className="p-3 text-xs text-[#484f58]">No pending writes.</div>;
  }

  const files = toolCall.affected_files || [];
  const score = toolCall.blast_radius_score || 0;
  const riskLevel = score > 0.7 ? "critical" : score > 0.4 ? "high" : score > 0.2 ? "medium" : "low";
  const riskColor = riskLevel === "critical" ? "red" : riskLevel === "high" ? "yellow" : riskLevel === "medium" ? "yellow" : "green";

  return (
    <div className="p-2 text-xs">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium text-[#c9d1d9]">{toolCall.type}</span>
        <GlassBadge color={riskColor}>{riskLevel}</GlassBadge>
        {files.length > 5 && (
          <GlassBadge color="red">Broad: {files.length} files</GlassBadge>
        )}
      </div>
      <div className="space-y-0.5 font-mono">
        {files.slice(0, 10).map((f) => (
          <div key={f} className="truncate text-[#8b949e]">{f}</div>
        ))}
        {files.length > 10 && (
          <div className="text-[#484f58]">+ {files.length - 10} more files</div>
        )}
      </div>
    </div>
  );
}