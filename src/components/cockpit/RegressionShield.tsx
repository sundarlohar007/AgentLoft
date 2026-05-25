interface Props {
  testResults?: { passed: number; failed: number; total: number };
}

export function RegressionShield({ testResults }: Props) {
  if (!testResults) {
    return <div className="p-3 text-xs text-[#484f58]">No tests run yet.</div>;
  }

  const passed = testResults.total > 0 && testResults.failed === 0;

  return (
    <div className="p-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#c9d1d9]">Regression Shield</span>
        <span className={`font-mono ${passed ? "text-[#3fb950]" : "text-[#f85149]"}`}>
          {passed ? "Passing" : "Regression detected"}
        </span>
      </div>
      <div className="mt-1 font-mono text-[#8b949e]">
        {testResults.passed}/{testResults.total} passed
        {testResults.failed > 0 && (
          <span className="text-[#f85149]">, {testResults.failed} failed</span>
        )}
      </div>
    </div>
  );
}