import { GlassPanel } from "@/components/shared/primitives";
import { ToolCallFeed } from "./ToolCallFeed";
import { BlastRadiusPreview } from "./BlastRadiusPreview";
import { IntentGapDetector } from "./IntentGapDetector";
import { RollbackBar } from "./RollbackBar";
import { RegressionShield } from "./RegressionShield";
import { useSessionStore } from "@/stores/sessionStore";
import { useState } from "react";

type PanelId = "tools" | "blast" | "intent" | "rollback" | "regression";

export function CockpitLayout() {
  const { activeSessionId } = useSessionStore();
  const [openPanels, setOpenPanels] = useState<Set<PanelId>>(new Set(["tools"]));

  const toggle = (id: PanelId) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const panels: { id: PanelId; label: string; component: React.ReactNode }[] = [
    { id: "tools", label: "Tool Feed", component: <ToolCallFeed /> },
    { id: "blast", label: "Blast Radius", component: <BlastRadiusPreview /> },
    { id: "intent", label: "Intent Gap", component: <IntentGapDetector /> },
    { id: "rollback", label: "Rollback", component: <RollbackBar /> },
    { id: "regression", label: "Regression Shield", component: <RegressionShield /> },
  ];

  return (
    <GlassPanel className="flex h-full flex-col" blur="medium">
      <div className="border-b px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">Agent Cockpit</p>
      </div>

      {!activeSessionId ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="rounded-md border p-3 text-xs text-[#484f58] text-center"
            style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
            Start a session to see agent activity.
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {panels.map((panel) => (
            <div key={panel.id}>
              <button
                onClick={() => toggle(panel.id)}
                className="flex w-full items-center justify-between border-b px-3 py-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                style={{ borderColor: "rgba(124, 199, 160, 0.06)", background: openPanels.has(panel.id) ? "rgba(124,199,160,0.02)" : "transparent" }}
              >
                <span>{panel.label}</span>
                <span className="font-mono text-[#484f58]">{openPanels.has(panel.id) ? "-" : "+"}</span>
              </button>
              {openPanels.has(panel.id) && (
                <div className="border-b" style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
                  {panel.component}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}