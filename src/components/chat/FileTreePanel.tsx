import { GlassPanel } from "@/components/shared/primitives";

export function FileTreePanel() {
  return (
    <GlassPanel className="h-full p-2">
      <div className="text-xs text-[#8b949e] font-mono">No project open</div>
    </GlassPanel>
  );
}