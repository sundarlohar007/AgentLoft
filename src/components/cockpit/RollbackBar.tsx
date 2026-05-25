import { GlassButton, GlassBadge } from "@/components/shared/primitives";
import type { Checkpoint } from "@/lib/types";

interface Props {
  checkpoints: Checkpoint[];
  onRestore: (checkpointId: string) => void;
}

export function RollbackBar({ checkpoints, onRestore }: Props) {
  const lastCheckpoint = checkpoints[checkpoints.length - 1];
  const recentCheckpoints = checkpoints.slice(-5).reverse();

  return (
    <div className="p-2 text-xs">
      {lastCheckpoint ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#8b949e]">Last checkpoint: </span>
              <span className="font-mono text-[#c9d1d9]">
                {new Date(lastCheckpoint.created_at).toLocaleTimeString()}
              </span>
              <span className="ml-1 text-[#8b949e]">
                ({lastCheckpoint.file_snapshot.length} files)
              </span>
            </div>
            <GlassButton variant="primary" size="sm" onClick={() => onRestore(lastCheckpoint.id)}>
              Restore (Ctrl+Z)
            </GlassButton>
          </div>
          <details>
            <summary className="cursor-pointer text-[#7cc7a0] text-xs">
              Recent checkpoints ({recentCheckpoints.length})
            </summary>
            <div className="mt-1 space-y-0.5">
              {recentCheckpoints.map((cp) => (
                <div key={cp.id} className="flex items-center justify-between font-mono">
                  <span className="text-[#8b949e]">
                    {new Date(cp.created_at).toLocaleTimeString()}
                    {cp.label && <span className="ml-1 text-[#c9d1d9]">({cp.label})</span>}
                  </span>
                  <button
                    onClick={() => onRestore(cp.id)}
                    className="text-[#7cc7a0] hover:underline"
                  >
                    restore
                  </button>
                </div>
              ))}
            </div>
          </details>
        </div>
      ) : (
        <div className="text-[#484f58]">No checkpoints yet.</div>
      )}
    </div>
  );
}