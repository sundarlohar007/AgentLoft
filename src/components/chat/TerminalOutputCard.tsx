import { GlassBadge } from "@/components/shared/primitives";

interface Props {
  command: string;
  rawTokens: number;
  compressedTokens: number;
  compressionRatio: number;
  compressedOutput: string;
  fullLogPath: string;
}

export function TerminalOutputCard({ command, rawTokens, compressedTokens, compressionRatio, compressedOutput, fullLogPath }: Props) {
  const reductionPct = (compressionRatio * 100).toFixed(0);

  return (
    <div className="animate-slide-up ml-8 rounded-md border text-xs"
      style={{ borderColor: "rgba(124, 199, 160, 0.1)", background: "rgba(13, 17, 23, 0.7)" }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-1.5"
        style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <span className="font-mono text-[#c9d1d9]">$ {command}</span>
        <div className="flex items-center gap-2">
          <GlassBadge color="green">{reductionPct}% reduced</GlassBadge>
          <span className="text-[#8b949e]">
            {compressedTokens.toLocaleString()} / {rawTokens.toLocaleString()} tokens
          </span>
        </div>
      </div>

      {/* Compressed output */}
      <div className="max-h-32 overflow-y-auto p-2 font-mono text-xs">
        <pre className="whitespace-pre-wrap text-[#8b949e]">{compressedOutput}</pre>
      </div>

      {/* Footer */}
      <div className="border-t px-3 py-1 flex items-center justify-between"
        style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <span className="text-[#484f58]">Full log: {fullLogPath}</span>
        <button
          className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a008]"
          onClick={() => {/* open full log */}}
        >
          Full log {'\u{2192}'}
        </button>
      </div>
    </div>
  );
}