import { GlassPanel, GlassBadge } from "@/components/shared/primitives";
import { useState } from "react";

interface SessionSummary {
  id: string; title: string; status: string;
  created_at: string; total_cost_usd: number;
  total_tokens_in: number; total_tokens_out: number;
}

interface Props {
  sessions: SessionSummary[];
  onView: (id: string) => void;
  onReplay: (id: string) => void;
  onExport: (id: string, format: "json" | "markdown") => void;
  onDelete: (id: string) => void;
}

const STATUS_COLORS: Record<string, "green" | "red" | "yellow" | "default"> = {
  active: "green", completed: "default", error: "red", paused: "yellow",
};

export function SessionHistoryPanel({ sessions, onView, onReplay, onExport, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = sessions.filter((s) => {
    if (filter && s.status !== filter) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <GlassPanel className="flex h-full flex-col p-3" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">Session History</h3>

      <div className="mt-2 space-y-1.5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sessions..."
          className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        />
        <div className="flex gap-1">
          {["active", "completed", "error", "paused"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? null : s)}
              className={`rounded px-1.5 py-0.5 text-xs ${filter === s ? "bg-[#7cc7a012] text-[#7cc7a0]" : "text-[#8b949e]"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-1 overflow-y-auto">
        {filtered.map((session) => (
          <div key={session.id} className="rounded-md border px-2.5 py-2 text-xs hover:bg-[#7cc7a004] cursor-pointer"
            style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}
            onClick={() => onView(session.id)}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#c9d1d9] truncate max-w-[200px]">{session.title}</span>
              <GlassBadge color={STATUS_COLORS[session.status]}>{session.status}</GlassBadge>
            </div>
            <div className="mt-1 flex items-center gap-3 text-[#484f58] font-mono">
              <span>{new Date(session.created_at).toLocaleDateString()}</span>
              <span>${session.total_cost_usd.toFixed(2)}</span>
              <span>{(session.total_tokens_in / 1000).toFixed(0)}k in</span>
            </div>
            <div className="mt-1.5 flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); onReplay(session.id); }}
                className="rounded px-1.5 py-0.5 text-xs text-[#7cc7a0] hover:bg-[#7cc7a008]">Replay</button>
              <button onClick={(e) => { e.stopPropagation(); onExport(session.id, "json"); }}
                className="rounded px-1.5 py-0.5 text-xs text-[#58a6ff] hover:bg-[#58a6ff08]">JSON</button>
              <button onClick={(e) => { e.stopPropagation(); onExport(session.id, "markdown"); }}
                className="rounded px-1.5 py-0.5 text-xs text-[#58a6ff] hover:bg-[#58a6ff08]">MD</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(session.id); }}
                className="rounded px-1.5 py-0.5 text-xs text-[#f85149] hover:bg-[#f8514908] ml-auto">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-[#484f58]">No sessions found</div>
        )}
      </div>
    </GlassPanel>
  );
}