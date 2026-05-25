import { useSessionStore } from "@/stores/sessionStore";

const STATUS_EMOJI: Record<string, string> = {
  pending: "\u{23F3}", approved: "\u{2705}", running: "\u{26A1}",
  completed: "\u{2705}", error: "\u{274C}", rejected: "\u{1F6AB}",
};
const TOOL_LABELS: Record<string, string> = {
  read_file: "Read", write_file: "Write", bash: "Bash",
  browser: "Browser", mcp: "MCP", search: "Search", todo_write: "Todo",
};

export function ToolCallFeed() {
  const { toolCalls } = useSessionStore();
  const calls = Array.from(toolCalls.values()).slice(-20).reverse();

  if (calls.length === 0) {
    return <div className="p-3 text-xs text-[#484f58]">No tool calls yet.</div>;
  }

  return (
    <div className="space-y-0.5 p-2">
      {calls.map((tc) => (
        <div
          key={tc.id}
          className="rounded px-2 py-1.5 text-xs font-mono"
          style={{ background: "rgba(13, 17, 23, 0.5)" }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>{STATUS_EMOJI[tc.status] || "\u{2753}"}</span>
              <span className="text-[#c9d1d9]">{TOOL_LABELS[tc.type] || tc.type}</span>
            </span>
            {tc.duration_ms != null && (
              <span className="text-[#484f58]">{(tc.duration_ms / 1000).toFixed(1)}s</span>
            )}
          </div>
          {tc.affected_files && tc.affected_files.length > 0 && (
            <div className="mt-0.5 truncate text-[#8b949e]">
              {tc.affected_files.join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}