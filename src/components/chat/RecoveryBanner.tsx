interface Props {
  sessionTitle: string;
  timestamp: string;
  fileCount: number;
  onRecover: () => void;
  onDiscard: () => void;
}

export function RecoveryBanner({ sessionTitle, timestamp, fileCount, onRecover, onDiscard }: Props) {
  return (
    <div className="animate-slide-up fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg border px-5 py-3 text-sm shadow-lg"
      style={{
        background: "rgba(22, 27, 34, 0.98)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(124, 199, 160, 0.2)",
      }}>
      <p className="font-medium text-[#c9d1d9]">AgentLoft did not close properly.</p>
      <p className="text-xs text-[#8b949e] mt-1">
        Last session: {sessionTitle} — {timestamp} — {fileCount} files
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={onRecover}
          className="rounded px-3 py-1 text-xs font-medium bg-[#7cc7a010] text-[#7cc7a0] hover:bg-[#7cc7a020]">
          Recover
        </button>
        <button onClick={onDiscard}
          className="rounded px-3 py-1 text-xs font-medium text-[#f85149] hover:bg-[#f8514910]">
          Discard
        </button>
      </div>
    </div>
  );
}