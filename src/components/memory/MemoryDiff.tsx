import { GlassPanel, GlassButton, GlassBadge } from "@/components/shared/primitives";
import type { MemoryEntry } from "@/lib/types";

interface MemoryChange {
  type: "added" | "updated" | "removed";
  entry: MemoryEntry;
  previous?: MemoryEntry;
}

interface Props {
  changes: MemoryChange[];
  onAccept: (change: MemoryChange) => void;
  onReject: (change: MemoryChange) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export function MemoryDiff({ changes, onAccept, onReject, onAcceptAll, onRejectAll }: Props) {
  if (changes.length === 0) {
    return (
      <GlassPanel className="p-4 text-center text-xs text-[#484f58]">
        No memory changes detected in this session.
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-3" blur="medium">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#c9d1d9]">
          Memory Changes ({changes.length})
        </h3>
        <div className="flex gap-1">
          <GlassButton variant="primary" size="sm" onClick={onAcceptAll}>Accept All</GlassButton>
          <GlassButton variant="ghost" size="sm" onClick={onRejectAll}>Reject All</GlassButton>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {changes.map((change, i) => (
          <div
            key={i}
            className="rounded-md border px-3 py-2 text-xs"
            style={{
              borderColor: change.type === "added" ? "rgba(63,185,80,0.15)"
                : change.type === "removed" ? "rgba(248,81,73,0.15)"
                : "rgba(210,153,34,0.15)",
              background: change.type === "added" ? "rgba(63,185,80,0.03)"
                : change.type === "removed" ? "rgba(248,81,73,0.03)"
                : "rgba(210,153,34,0.03)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GlassBadge color={change.type === "added" ? "green" : change.type === "removed" ? "red" : "yellow"}>
                  {change.type}
                </GlassBadge>
                <span className="text-[#8b949e] font-mono">{change.entry.category}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onAccept(change)}
                  className="rounded px-1.5 py-0.5 text-xs text-[#7cc7a0] hover:bg-[#7cc7a008]"
                >
                  Accept
                </button>
                <button
                  onClick={() => onReject(change)}
                  className="rounded px-1.5 py-0.5 text-xs text-[#f85149] hover:bg-[#f8514908]"
                >
                  Reject
                </button>
              </div>
            </div>
            <p className="mt-1 text-[#c9d1d9]">{change.entry.content}</p>
            {change.previous && (
              <p className="mt-0.5 text-[#484f58] line-through">{change.previous.content}</p>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}