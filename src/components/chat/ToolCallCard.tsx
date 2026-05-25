import { GlassBadge } from "@/components/shared/primitives";
import type { ToolCall } from "@/lib/types";

const STATUS_COLORS: Record<string, "green" | "yellow" | "red" | "default"> = {
  completed: "green",
  approved: "green",
  pending: "yellow",
  error: "red",
  rejected: "red",
};

const TOOL_ICONS: Record<string, string> = {
  read_file: "\u{1F4C4}",
  write_file: "\u{270F}\u{FE0F}",
  bash: "\u{2328}\u{FE0F}",
  browser: "\u{1F310}",
  mcp: "\u{1F91D}",
  search: "\u{1F50D}",
  todo_write: "\u{1F4CB}",
};

export function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const icon = TOOL_ICONS[toolCall.type] || "\u{2699}\u{FE0F}";
  const isPending = toolCall.status === "pending";
  const isRunning = toolCall.status === "approved" && !toolCall.completed_at;

  return (
    <div
      className="animate-slide-up ml-8 rounded-md border px-3 py-2 text-xs"
      style={{
        background: "rgba(13, 17, 23, 0.7)",
        borderColor: "rgba(124, 199, 160, 0.1)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="font-medium text-[#c9d1d9]">{toolCall.type}</span>
          <GlassBadge color={STATUS_COLORS[toolCall.status]}>
            {isPending ? "pending" : isRunning ? "running" : toolCall.status}
          </GlassBadge>
        </span>
        {toolCall.duration_ms != null && (
          <span className="text-[#8b949e]">{(toolCall.duration_ms / 1000).toFixed(1)}s</span>
        )}
      </div>

      {/* Input summary */}
      <div className="mt-1 text-[#8b949e] truncate">
        {toolCall.type === "write_file" && typeof toolCall.input?.path === 'string' && (
          <>Path: {toolCall.input.path as string}</>
        )}
        {toolCall.type === "bash" && typeof toolCall.input?.command === 'string' && (
          <>$ {(toolCall.input.command as string).slice(0, 80)}</>
        )}
        {toolCall.type === "read_file" && typeof toolCall.input?.path === 'string' && (
          <>Reading: {toolCall.input.path as string}</>
        )}
      </div>

      {/* Output preview if completed */}
      {toolCall.status === "completed" && toolCall.output && (
        <details className="mt-2">
          <summary className="cursor-pointer text-[#7cc7a0] hover:text-[#6ab890]">Output</summary>
          <pre className="mt-1 max-h-32 overflow-y-auto rounded bg-[#0d1117] p-2 text-xs text-[#8b949e]">
            {JSON.stringify(toolCall.output, null, 2)}
          </pre>
        </details>
      )}

      {/* Permission buttons (shown when pending) */}
      {isPending && toolCall.permission_required && (
        <div className="mt-2 flex gap-2">
          <button
            className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a010]"
            onClick={() => {/* approve logic */}}
          >
            Approve (Ctrl+Y)
          </button>
          <button
            className="rounded px-2 py-0.5 text-xs font-medium text-[#f85149] hover:bg-[#f8514910]"
            onClick={() => {/* reject logic */}}
          >
            Reject (Ctrl+N)
          </button>
        </div>
      )}
    </div>
  );
}