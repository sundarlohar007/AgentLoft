import { GlassPanel, GlassButton, GlassBadge } from "@/components/shared/primitives";
import { useSettingsStore } from "@/stores/settingsStore";

interface TaskSummary {
  filesCreated: number;
  filesModified: number;
  testsRun: number;
  testsPassed: number;
  totalCost: number;
  duration: string;
}

interface Props {
  summary: TaskSummary;
  onDismiss: () => void;
  onExport: () => void;
  onReviewMemories: () => void;
}

export function EndOfTaskSummaryCard({ summary, onDismiss, onExport, onReviewMemories }: Props) {
  const { expertise } = useSettingsStore();
  const isSimple = expertise === "guided";

  return (
    <div className="animate-slide-up fixed bottom-4 left-1/2 -translate-x-1/2 z-50" style={{ minWidth: "400px" }}>
      <GlassPanel blur="heavy" className="p-4">
        <h3 className="text-sm font-semibold text-[#c9d1d9]">Task Complete</h3>

        {isSimple ? (
          <p className="mt-2 text-sm text-[#8b949e]">
            AgentLoft created {summary.filesCreated} files, edited {summary.filesModified} files
            {summary.testsRun > 0 && `, ran ${summary.testsRun} test${summary.testsRun !== 1 ? "s" : ""}`}
            {summary.testsPassed === summary.testsRun && summary.testsRun > 0 && " — all tests passed"}.
          </p>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8b949e]">Files created</span>
              <span className="font-mono text-[#3fb950]">{summary.filesCreated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b949e]">Files modified</span>
              <span className="font-mono text-[#d29922]">{summary.filesModified}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b949e]">Cost</span>
              <span className="font-mono text-[#c9d1d9]">${summary.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b949e]">Duration</span>
              <span className="font-mono text-[#c9d1d9]">{summary.duration}</span>
            </div>
          </div>
        )}

        <div className="mt-3 flex gap-2">
          <GlassButton variant="ghost" size="sm" onClick={onDismiss}>Dismiss</GlassButton>
          <GlassButton variant="ghost" size="sm" onClick={onExport}>Export {isSimple ? "Summary" : "MD"}</GlassButton>
          <GlassButton variant="primary" size="sm" onClick={onReviewMemories}>Review Memories</GlassButton>
        </div>
      </GlassPanel>
    </div>
  );
}