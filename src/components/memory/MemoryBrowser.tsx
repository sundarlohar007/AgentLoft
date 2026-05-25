import { GlassPanel, GlassBadge } from "@/components/shared/primitives";
import { useState } from "react";
import type { MemoryEntry } from "@/lib/types";

const SCOPE_LABELS: Record<string, string> = { project: "Project", user: "User", agent: "Agent", org: "Org" };
const CATEGORY_COLORS: Record<string, "green" | "yellow" | "default"> = {
  convention: "green", decision: "yellow", constraint: "default",
  preference: "green", fact: "default", gotcha: "yellow",
};

interface Props {
  memories: MemoryEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: MemoryEntry) => void;
}

export function MemoryBrowser({ memories, onDelete, onEdit }: Props) {
  const [search, setSearch] = useState("");
  const [scopeFilter, setScopeFilter] = useState<string | null>(null);
  const [categoryFilter, _setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"confidence" | "freshness" | "date" | "use_count">("confidence");

  const filtered = memories
    .filter((m) => {
      if (scopeFilter && m.scope !== scopeFilter) return false;
      if (categoryFilter && m.category !== categoryFilter) return false;
      if (search && !m.content.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "confidence": return b.confidence - a.confidence;
        case "freshness": return b.freshness - a.freshness;
        case "date": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "use_count": return b.use_count - a.use_count;
        default: return 0;
      }
    });

  return (
    <GlassPanel className="flex h-full flex-col p-3" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">Memory Browser</h3>

      {/* Filters */}
      <div className="mt-2 space-y-1.5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search memories..."
          className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        />
        <div className="flex gap-1 flex-wrap">
          {Object.keys(SCOPE_LABELS).map((scope) => (
            <button
              key={scope}
              onClick={() => setScopeFilter(scopeFilter === scope ? null : scope)}
              className={`rounded px-1.5 py-0.5 text-xs font-mono transition-colors ${
                scopeFilter === scope ? "bg-[#7cc7a012] text-[#7cc7a0]" : "text-[#8b949e] hover:text-[#c9d1d9]"
              }`}
            >
              {SCOPE_LABELS[scope]}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-[#8b949e]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded border bg-[#0d1117] px-1 py-0.5 text-xs text-[#c9d1d9] outline-none"
            style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
          >
            <option value="confidence">Confidence</option>
            <option value="freshness">Freshness</option>
            <option value="date">Date</option>
            <option value="use_count">Most Used</option>
          </select>
          <span>{filtered.length} memories</span>
        </div>
      </div>

      {/* Memory list */}
      <div className="mt-2 flex-1 space-y-1 overflow-y-auto">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="rounded-md border px-2.5 py-2 text-xs transition-colors hover:bg-[#7cc7a004]"
            style={{ borderColor: "rgba(124, 199, 160, 0.06)", cursor: "pointer" }}
            onClick={() => onEdit(entry)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <GlassBadge color="default">{SCOPE_LABELS[entry.scope] || entry.scope}</GlassBadge>
                <GlassBadge color={CATEGORY_COLORS[entry.category] || "default"}>{entry.category}</GlassBadge>
                {entry.verified && <span className="text-[#3fb950]">verified</span>}
              </div>
              <div className="flex items-center gap-2 text-[#484f58]">
                <span>{(entry.confidence * 100).toFixed(0)}%</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                  className="text-[#f85149] hover:text-[#ff6b6b]"
                >
                  delete
                </button>
              </div>
            </div>
            <p className="mt-1 text-[#c9d1d9] leading-relaxed line-clamp-2">{entry.content}</p>
            <div className="mt-1 flex gap-2 text-[#484f58]">
              <span>Used {entry.use_count}x</span>
              <span>Freshness: {(entry.freshness * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-[#484f58]">No memories found</div>
        )}
      </div>
    </GlassPanel>
  );
}