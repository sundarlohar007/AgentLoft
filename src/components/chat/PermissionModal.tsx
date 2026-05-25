import { GlassPanel, GlassButton, GlassBadge } from "@/components/shared/primitives";
import type { PermissionRequest } from "@/lib/ipc-types";
import { useEffect } from "react";

interface Props {
  request: PermissionRequest;
  onApprove: (scope: "once" | "session" | "always") => void;
  onReject: () => void;
}

export function PermissionModal({ request, onApprove, onReject }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "y" && e.ctrlKey) { e.preventDefault(); onApprove("once"); }
      if (e.key === "n" && e.ctrlKey) { e.preventDefault(); onReject(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onApprove, onReject]);

  const riskColors: Record<string, "green" | "yellow" | "red" | "default"> = {
    low: "green", medium: "yellow", high: "red", critical: "red",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <GlassPanel className="w-[480px] p-6 animate-spring" blur="heavy">
        <h3 className="text-sm font-semibold text-[#c9d1d9]">
          Permission Required
        </h3>
        <div className="mt-3 space-y-2 text-sm text-[#8b949e]">
          <div className="flex items-center gap-2">
            <span className="text-[#c9d1d9] font-medium">{request.tool_type}</span>
            <GlassBadge color={riskColors[request.risk_level]}>
              {request.risk_level}
            </GlassBadge>
          </div>
          <p>{request.description}</p>
          {request.command && (
            <pre className="rounded bg-[#0d1117] p-2 text-xs text-[#c9d1d9] font-mono">
              $ {request.command}
            </pre>
          )}
          {request.affected_paths.length > 0 && (
            <div>
              <span className="text-xs text-[#484f58] uppercase tracking-wider">Affected files ({request.affected_paths.length})</span>
              <ul className="mt-1 space-y-0.5 text-xs font-mono text-[#7cc7a0]">
                {request.affected_paths.map((p) => (
                  <li key={p} className="truncate">{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <GlassButton variant="primary" onClick={() => onApprove("once")}>
            Approve Once (Ctrl+Y)
          </GlassButton>
          <GlassButton variant="secondary" onClick={() => onApprove("session")}>
            Session
          </GlassButton>
          <GlassButton variant="ghost" onClick={onReject}>
            Reject (Ctrl+N)
          </GlassButton>
        </div>
      </GlassPanel>
    </div>
  );
}