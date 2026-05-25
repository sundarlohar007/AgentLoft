import { GlassPanel, GlassInput, GlassBadge } from "@/components/shared/primitives";
import { useState } from "react";
import type { MarketplaceItem } from "@/lib/types";

interface Props {
  items: MarketplaceItem[];
  onViewDetail: (item: MarketplaceItem) => void;
  onInstall: (itemId: string) => void;
}

const CATEGORIES = ["All", "Communication", "Quality", "Tools", "Database", "Templates", "Themes"];

export function MarketplacePanel({ items, onViewDetail, onInstall }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (typeFilter && item.type !== typeFilter) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())
      && !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <GlassPanel className="flex h-full flex-col p-3" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">Marketplace</h3>

      {/* Search + filters */}
      <div className="mt-2 space-y-1.5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search marketplace..."
          className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        />

        <div className="flex gap-1 flex-wrap">
          {["skill", "mcp", "plugin", "template", "theme"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? null : t)}
              className={`rounded px-1.5 py-0.5 text-xs font-mono ${
                typeFilter === t ? "bg-[#7cc7a012] text-[#7cc7a0]" : "text-[#8b949e] hover:text-[#c9d1d9]"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>

        <div className="flex gap-1 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded px-1.5 py-0.5 text-xs ${
                category === c ? "bg-[#7cc7a012] text-[#7cc7a0]" : "text-[#8b949e] hover:text-[#c9d1d9]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Item grid */}
      <div className="mt-3 flex-1 space-y-1.5 overflow-y-auto">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-md border px-2.5 py-2 text-xs cursor-pointer transition-colors hover:bg-[#7cc7a004]"
            style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}
            onClick={() => onViewDetail(item)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#c9d1d9]">{item.name}</span>
                <GlassBadge color="default">{item.type}</GlassBadge>
                {item.verified_publisher && (
                  <span className="text-[#3fb950] text-xs" title="Verified publisher">{'\u{2714}'}</span>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onInstall(item.id); }}
                className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a008]"
              >
                Install
              </button>
            </div>
            <p className="mt-0.5 text-[#8b949e] line-clamp-2">{item.description}</p>
            <div className="mt-1 flex gap-2 text-[#484f58]">
              <span>{item.author}</span>
              <span>{item.license}</span>
              {item.downloads > 0 && <span>{item.downloads} downloads</span>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-[#484f58]">No items found</div>
        )}
      </div>
    </GlassPanel>
  );
}