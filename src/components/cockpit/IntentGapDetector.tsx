interface Props {
  task?: string;
  currentAction?: string;
  gapDetected?: boolean;
}

export function IntentGapDetector({ task, currentAction, gapDetected }: Props) {
  if (!task) {
    return <div className="p-3 text-xs text-[#484f58]">No active task.</div>;
  }
  if (!gapDetected) {
    return <div className="p-3 text-xs text-[#3fb950]">On track: {task}</div>;
  }

  return (
    <div className="p-2 text-xs">
      <div className="rounded border px-2 py-1.5" style={{ borderColor: "rgba(210, 153, 34, 0.2)", background: "rgba(210, 153, 34, 0.05)" }}>
        <span className="font-medium text-[#d29922]">Drift detected</span>
        <p className="mt-0.5 text-[#8b949e]">Goal: {task}</p>
        {currentAction && <p className="text-[#8b949e]">Agent is: {currentAction}</p>}
      </div>
    </div>
  );
}