interface McpStatus {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "error";
  lastActivity: string;
  toolCount: number;
}

interface Props {
  mcps: McpStatus[];
}

const STATUS_COLORS = { connected: "#3fb950", disconnected: "#484f58", error: "#f85149" };
const STATUS_LABELS = { connected: "Connected", disconnected: "Offline", error: "Error" };

export function McpHealthDashboard({ mcps }: Props) {
  if (mcps.length === 0) {
    return <div className="p-3 text-xs text-[#484f58]">No MCPs installed.</div>;
  }

  return (
    <div className="p-2 text-xs space-y-1.5">
      {mcps.map((mcp) => (
        <div key={mcp.id} className="flex items-center justify-between rounded border px-2 py-1.5"
          style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLORS[mcp.status] }} />
            <span className="text-[#c9d1d9]">{mcp.name}</span>
          </div>
          <div className="flex items-center gap-3 text-[#484f58]">
            <span>{mcp.toolCount} tools</span>
            <span>{mcp.lastActivity}</span>
            <span style={{ color: STATUS_COLORS[mcp.status] }}>{STATUS_LABELS[mcp.status]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}