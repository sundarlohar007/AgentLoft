import { GlassPanel, GlassButton } from "@/components/shared/primitives";
import { useState } from "react";

interface CliStatus {
  name: string; installed: boolean; version?: string; installCommand?: string;
}

interface Props {
  clis: CliStatus[];
  onComplete: (apiKeys: Record<string, string>, firstProject: string) => void;
}

const STEPS = ["Welcome", "CLI Setup", "API Keys", "Open Project", "Ready!"];

export function FirstRunOnboardingWizard({ clis, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [projectPath, setProjectPath] = useState("");

  const handleComplete = () => {
    onComplete(apiKeys, projectPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
      <GlassPanel className="w-[560px] p-6 animate-spring" blur="heavy">
        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {STEPS.map((label, i) => (
            <div key={i} className="flex-1">
              <div className="h-1 rounded-full" style={{ background: i <= step ? "#7cc7a0" : "rgba(255,255,255,0.05)" }} />
              <span className="text-xs mt-0.5 block text-center" style={{ color: i <= step ? "#7cc7a0" : "#484f58" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[200px]">
          {step === 0 && (
            <div className="text-center space-y-3">
              <h2 className="text-lg font-semibold text-[#c9d1d9]">Welcome to AgentLoft</h2>
              <p className="text-sm text-[#8b949e]">
                Your unified GUI for Claude Code, Codex CLI, and Antigravity CLI.
              </p>
              <p className="text-sm text-[#8b949e]">
                Persistent memory. Real-time cost tracking. Premium interface. Free and open-source.
              </p>
              <p className="text-xs text-[#7cc7a0]">Goal: first successful agent turn within 3 minutes.</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">CLI Detection</h3>
              {clis.map((cli) => (
                <div key={cli.name} className="flex items-center justify-between rounded border px-3 py-2"
                  style={{ borderColor: cli.installed ? "rgba(63,185,80,0.15)" : "rgba(124,199,160,0.08)" }}>
                  <div>
                    <span className="text-sm text-[#c9d1d9]">{cli.name}</span>
                    {cli.version && <span className="ml-2 text-xs font-mono text-[#8b949e]">v{cli.version}</span>}
                  </div>
                  {cli.installed ? (
                    <span className="text-xs text-[#3fb950]">Installed</span>
                  ) : cli.installCommand ? (
                    <button className="rounded px-2 py-0.5 text-xs font-medium text-[#7cc7a0] hover:bg-[#7cc7a008]">
                      Install: {cli.installCommand.slice(0, 30)}...
                    </button>
                  ) : (
                    <span className="text-xs text-[#f85149]">Not found</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">API Keys</h3>
              <p className="text-xs text-[#8b949e]">Keys stored in your OS keychain, never on disk.</p>
              {["claude", "codex", "antigravity"].map((provider) => (
                <div key={provider} className="space-y-1">
                  <label className="text-xs text-[#8b949e]">{provider} API Key</label>
                  <input
                    type="password"
                    value={apiKeys[provider] || ""}
                    onChange={(e) => setApiKeys({ ...apiKeys, [provider]: e.target.value })}
                    placeholder={`Enter ${provider} key (optional)`}
                    className="w-full rounded border bg-[#0d1117] px-2 py-1.5 text-xs text-[#c9d1d9] outline-none font-mono"
                    style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
                  />
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">Open Your First Project</h3>
              <p className="text-xs text-[#8b949e]">AgentLoft will auto-detect your stack and pre-configure context.</p>
              <input
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                placeholder="/path/to/your/project"
                className="w-full rounded border bg-[#0d1117] px-2 py-1.5 text-xs text-[#c9d1d9] outline-none font-mono"
                style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
              />
              <GlassButton variant="secondary" size="sm" onClick={() => {/* file picker */}}>
                Browse...
              </GlassButton>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-3">
              <h3 className="text-sm font-semibold text-[#7cc7a0]">Ready!</h3>
              <p className="text-sm text-[#8b949e]">
                AgentLoft will suggest a first prompt based on your project.
              </p>
              <label className="flex items-center justify-center gap-2 text-xs text-[#8b949e]">
                <input type="checkbox" defaultChecked className="accent-[#7cc7a0]" />
                Start in Safe Mode (read-only, no writes)
              </label>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <GlassButton variant="ghost" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </GlassButton>
          {step < 4 ? (
            <GlassButton variant="primary" onClick={() => setStep(step + 1)}>Next</GlassButton>
          ) : (
            <GlassButton variant="primary" onClick={handleComplete}>Start Using AgentLoft</GlassButton>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}