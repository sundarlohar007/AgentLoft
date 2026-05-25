import { GlassBadge } from "@/components/shared/primitives";

interface InstalledItem {
  id: string;
  type: string;
  name: string;
  version: string;
  enabled: boolean;
  hasUpdate?: boolean;
}

interface Props {
  items: InstalledItem[];
  onToggle: (id: string, enabled: boolean) => void;
  onUpdate: (id: string) => void;
  onUninstall: (id: string) => void;
}

export function InstalledItemsList({ items, onToggle, onUpdate, onUninstall }: Props) {
  if (items.length === 0) {
    return <div className="p-3 text-xs text-[#484f58]">Nothing installed yet.</div>;
  }

  return (
    <div className="p-2 text-xs space-y-1">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded border px-2 py-1.5"
          style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={(e) => onToggle(item.id, e.target.checked)}
              className="accent-[#7cc7a0]"
            />
            <div>
              <span className="text-[#c9d1d9]">{item.name}</span>
              <span className="ml-1.5 font-mono text-[#484f58]">v{item.version}</span>
              <GlassBadge color="default">{item.type}</GlassBadge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {item.hasUpdate && (
              <button onClick={() => onUpdate(item.id)}
                className="rounded px-1.5 py-0.5 text-xs font-medium text-[#d29922] hover:bg-[#d2992210]">
                Update
              </button>
            )}
            <button onClick={() => onUninstall(item.id)}
              className="rounded px-1.5 py-0.5 text-xs font-medium text-[#f85149] hover:bg-[#f8514910]">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}