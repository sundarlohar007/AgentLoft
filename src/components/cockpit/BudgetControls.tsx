import { GlassPanel, GlassButton, GlassInput } from "@/components/shared/primitives";
import { useState } from "react";

interface Budgets {
  sessionHardCap: number | null;
  taskSoftCap: number | null;
  dailyCap: number | null;
  monthlyCap: number | null;
}

interface Props {
  budgets: Budgets;
  usage: { session: number; task: number; daily: number; monthly: number };
  onUpdate: (budgets: Partial<Budgets>) => void;
}

export function BudgetControls({ budgets, usage, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  const CapBar = ({ label, cap, used, color }: { label: string; cap: number | null; used: number; color: string }) => (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-[#8b949e]">{label}</span>
        <span className="font-mono text-[#c9d1d9]">
          ${used.toFixed(2)}{cap ? ` / $${cap.toFixed(2)}` : ""}
        </span>
      </div>
      {cap && (
        <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min((used / cap) * 100, 100)}%`, background: color }}
          />
        </div>
      )}
    </div>
  );

  return (
    <GlassPanel className="p-3 text-xs" blur="medium">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-[#c9d1d9]">Budget Controls</h3>
        <GlassButton variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
          {editing ? "Done" : "Edit"}
        </GlassButton>
      </div>

      <div className="space-y-2">
        <CapBar label="Session" cap={budgets.sessionHardCap} used={usage.session} color="#f85149" />
        <CapBar label="Task" cap={budgets.taskSoftCap} used={usage.task} color="#d29922" />
        <CapBar label="Daily" cap={budgets.dailyCap} used={usage.daily} color="#7cc7a0" />
        <CapBar label="Monthly" cap={budgets.monthlyCap} used={usage.monthly} color="#58a6ff" />
      </div>

      {editing && (
        <div className="mt-3 space-y-2 border-t pt-2" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
          {(["sessionHardCap", "taskSoftCap", "dailyCap", "monthlyCap"] as const).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-[#8b949e]">{key.replace(/([A-Z])/g, " $1").trim()}</span>
              <input
                type="number"
                value={budgets[key] ?? ""}
                onChange={(e) => onUpdate({ [key]: e.target.value ? Number(e.target.value) : null })}
                placeholder="No cap"
                className="w-20 rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9] font-mono outline-none text-right"
                style={{ borderColor: "rgba(124, 199, 160, 0.15)" }}
              />
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}