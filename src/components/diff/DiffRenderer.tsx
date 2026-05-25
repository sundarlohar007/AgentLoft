import { useState } from "react";

interface DiffHunk {
  old_start: number; old_lines: number;
  new_start: number; new_lines: number;
  content: string;
}

interface Props {
  path: string;
  before: string;
  after: string;
  hunks: DiffHunk[];
}

export function MonacoDiffRenderer({ path, before, after, hunks }: Props) {
  const [acceptedHunks, setAcceptedHunks] = useState<Set<number>>(new Set());

  const toggleHunk = (index: number) => {
    setAcceptedHunks((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const acceptAll = () => {
    setAcceptedHunks(new Set(hunks.map((_, i) => i)));
  };

  const rejectAll = () => {
    setAcceptedHunks(new Set());
  };

  const acceptedCount = acceptedHunks.size;
  const rejectedCount = hunks.length - acceptedCount;

  return (
    <div className="animate-slide-up ml-8 rounded-md border text-xs" style={{ borderColor: "rgba(124, 199, 160, 0.1)", background: "rgba(13, 17, 23, 0.7)" }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#7cc7a0]">{path}</span>
          <span className="text-[#8b949e]">{hunks.length} hunks</span>
        </div>
        <div className="flex gap-1">
          <button onClick={acceptAll} className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a010]">
            Accept All
          </button>
          <button onClick={rejectAll} className="rounded px-2 py-0.5 text-xs font-medium text-[#f85149] hover:bg-[#f8514910]">
            Reject All
          </button>
        </div>
      </div>

      {/* Hunks — simplified unified diff view */}
      <div className="max-h-64 overflow-y-auto font-mono">
        {hunks.map((hunk, i) => {
          const isAccepted = acceptedHunks.has(i);
          const lines = hunk.content.split("\n");
          return (
            <div key={i} className="border-b" style={{ borderColor: "rgba(124, 199, 160, 0.04)" }}>
              {/* Hunk header */}
              <div className="flex items-center gap-2 bg-[#0d1117] px-3 py-1" style={{ background: "rgba(124, 199, 160, 0.03)" }}>
                <button
                  onClick={() => toggleHunk(i)}
                  className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                    isAccepted ? "text-[#7cc7a0]" : "text-[#8b949e]"
                  } hover:bg-[#7cc7a008]`}
                >
                  {isAccepted ? "Accepted" : "Rejected"}
                </button>
                <span className="text-[#484f58]">
                  @@ -{hunk.old_start},{hunk.old_lines} +{hunk.new_start},{hunk.new_lines} @@
                </span>
              </div>
              {/* Diff lines */}
              <div className="px-3 py-1 space-y-0 text-xs">
                {lines.map((line, j) => {
                  const isAdd = line.startsWith("+") && !line.startsWith("+++");
                  const isDel = line.startsWith("-") && !line.startsWith("---");
                  return (
                    <div
                      key={j}
                      className="whitespace-pre"
                      style={{
                        color: isAdd ? "#3fb950" : isDel ? "#f85149" : "#8b949e",
                        background: isAdd ? "rgba(63,185,80,0.05)" : isDel ? "rgba(248,81,73,0.05)" : "transparent",
                      }}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t px-3 py-1.5 text-xs text-[#8b949e]" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        {acceptedCount}/{hunks.length} accepted, {rejectedCount}/{hunks.length} rejected
      </div>
    </div>
  );
}