import { GlassPanel, GlassBadge } from "@/components/shared/primitives";
import { useState } from "react";

interface CliFlag {
  name: string;
  type: "boolean" | "string" | "number" | "choice";
  description: string;
  default?: string;
  cli_source: "claude" | "codex" | "antigravity" | "all";
  choices?: string[];
}

const FLAGS: CliFlag[] = [
  { name: "--print", type: "boolean", description: "Print response and exit", cli_source: "claude" },
  { name: "--output-format", type: "choice", description: "Output format for responses", cli_source: "all", choices: ["stream-json", "text", "json"] },
  { name: "--verbose", type: "boolean", description: "Enable verbose logging", cli_source: "all" },
  { name: "--model", type: "string", description: "Model to use for this session", cli_source: "all" },
  { name: "--max-turns", type: "number", description: "Maximum conversation turns", cli_source: "claude" },
  { name: "--continue", type: "boolean", description: "Continue previous conversation", cli_source: "claude" },
  { name: "--dangerously-skip-permissions", type: "boolean", description: "Skip all permission prompts", cli_source: "claude" },
  { name: "--temperature", type: "number", description: "Model temperature (0.0-2.0)", cli_source: "all" },
  { name: "--exec", type: "boolean", description: "Execute mode (Codex)", cli_source: "codex" },
  { name: "--json", type: "boolean", description: "JSON output mode (Codex)", cli_source: "codex" },
  { name: "--ground", type: "boolean", description: "Enable Google grounding", cli_source: "antigravity" },
];

const SOURCE_COLORS: Record<string, string> = { claude: "#7cc7a0", codex: "#58a6ff", antigravity: "#d29922", all: "#8b949e" };

export function SettingsFlags() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [search, setSearch] = useState("");

  const setFlag = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const rawCommand = Object.entries(values)
    .filter(([, v]) => v !== false && v !== "" && v !== undefined)
    .map(([k, v]) => (v === true ? k : `${k} ${v}`))
    .join(" ");

  const filtered = FLAGS.filter((f) => f.name.includes(search.toLowerCase()));

  return (
    <GlassPanel className="h-full p-4" blur="medium">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">Visual Flag Builder</h3>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search flags..."
        className="mt-2 w-full rounded-md border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none"
        style={{ borderColor: "rgba(124, 199, 160, 0.12)", fontFamily: "'JetBrains Mono', monospace" }}
      />

      <div className="mt-3 space-y-2 max-h-[60vh] overflow-y-auto">
        {filtered.map((flag) => (
          <div key={flag.name} className="flex items-center justify-between rounded-md border px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className="text-xs font-medium text-[#7cc7a0]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{flag.name}</code>
                <GlassBadge color={SOURCE_COLORS[flag.cli_source] as "default" | "green"}>
                  {flag.cli_source}
                </GlassBadge>
              </div>
              <p className="mt-0.5 text-xs text-[#8b949e]">{flag.description}</p>
            </div>
            <div className="ml-4">
              {flag.type === "boolean" && (
                <input type="checkbox" checked={!!values[flag.name]} onChange={(e) => setFlag(flag.name, e.target.checked)} className="accent-[#7cc7a0]" />
              )}
              {flag.type === "string" && (
                <input type="text" value={String(values[flag.name] || "")} onChange={(e) => setFlag(flag.name, e.target.value)}
                  className="w-24 rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9] font-mono outline-none"
                  style={{ borderColor: "rgba(124, 199, 160, 0.15)" }} />
              )}
              {flag.type === "number" && (
                <input type="number" value={Number(values[flag.name] || "")} onChange={(e) => setFlag(flag.name, e.target.valueAsNumber)}
                  className="w-16 rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9] font-mono outline-none"
                  style={{ borderColor: "rgba(124, 199, 160, 0.15)" }} />
              )}
              {flag.type === "choice" && flag.choices && (
                <select value={String(values[flag.name] || flag.default || "")} onChange={(e) => setFlag(flag.name, e.target.value)}
                  className="rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9] font-mono outline-none"
                  style={{ borderColor: "rgba(124, 199, 160, 0.15)" }}>
                  {flag.choices.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live raw command preview */}
      {rawCommand && (
        <div className="mt-3 rounded-md border p-2" style={{ borderColor: "rgba(124, 199, 160, 0.12)", background: "rgba(13, 17, 23, 0.8)" }}>
          <span className="text-xs text-[#484f58] uppercase tracking-wider">Raw command:</span>
          <code className="mt-1 block text-xs text-[#7cc7a0] font-mono break-all">
            claude {rawCommand}
          </code>
        </div>
      )}
    </GlassPanel>
  );
}