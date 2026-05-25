import { GlassPanel } from "@/components/shared/primitives";
import { useState } from "react";

interface IpcFrame {
  direction: "agent->gui" | "gui->agent";
  type: string;
  timestamp: number;
  payload: unknown;
}

export function IpcInspector() {
  const [frames] = useState<IpcFrame[]>([]);
  const [filter, setFilter] = useState("");

  const filtered = frames.filter((f) =>
    !filter || f.type.includes(filter) || JSON.stringify(f.payload).includes(filter)
  );

  const stats = {
    framesPerSec: 0,
    totalBytes: 0,
    avgLatency: 0,
    anomalies: 0,
  };

  return (
    <GlassPanel className="flex flex-col h-full p-3" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9] mb-2">IPC Inspector</h3>

      <div className="flex gap-3 text-xs font-mono mb-2">
        <span className="text-[#8b949e]">{stats.framesPerSec} fps</span>
        <span className="text-[#8b949e]">{stats.totalBytes} B</span>
        <span className="text-[#8b949e]">{stats.avgLatency}ms avg</span>
        {stats.anomalies > 0 && <span className="text-[#f85149]">{stats.anomalies} anomalies</span>}
      </div>

      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter frames..."
        className="rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono mb-2"
        style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
      />

      <div className="flex-1 overflow-y-auto font-mono text-xs space-y-0.5">
        {filtered.map((frame, i) => (
          <div key={i} className="flex gap-2">
            <span style={{ color: frame.direction === "agent->gui" ? "#3fb950" : "#58a6ff" }}>
              {frame.direction === "agent->gui" ? "A->G" : "G->A"}
            </span>
            <span className="text-[#c9d1d9]">{frame.type}</span>
            <span className="text-[#484f58] truncate">{JSON.stringify(frame.payload).slice(0, 80)}</span>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-[#484f58]">No frames captured.</div>}
      </div>
    </GlassPanel>
  );
}