import { GlassPanel, GlassButton } from "@/components/shared/primitives";
import { useState } from "react";

const CONFIG_FILES = [
  { id: "claude_md", label: "CLAUDE.md", path: "CLAUDE.md" },
  { id: "agents_md", label: "AGENTS.md", path: "AGENTS.md" },
  { id: "gemini_md", label: "GEMINI.md", path: "GEMINI.md" },
  { id: "settings_json", label: "settings.json", path: ".claude/settings.json" },
  { id: "mcp_config", label: "MCP Config", path: ".claude/mcp.json" },
];

const SAMPLE_CONTENT: Record<string, string> = {
  claude_md: "# CLAUDE.md\n\nThis file provides context to Claude Code.\n\n## Project Overview\n\n<!-- Add project info here -->\n",
  agents_md: "# AGENTS.md\n\nAgent configuration for this project.\n",
  gemini_md: "# GEMINI.md\n\nContext for Antigravity CLI.\n",
  settings_json: '{\n  "model": "claude-sonnet-4-6",\n  "maxTurns": 25\n}\n',
  mcp_config: '{\n  "mcpServers": {}\n}\n',
};

export function ConfigFileEditor() {
  const [activeFile, setActiveFile] = useState("claude_md");
  const [content, setContent] = useState(SAMPLE_CONTENT.claude_md);
  const [saved, setSaved] = useState(true);

  const switchFile = (id: string) => {
    setActiveFile(id);
    setContent(SAMPLE_CONTENT[id] || "");
    setSaved(true);
  };

  const handleChange = (value: string) => {
    setContent(value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // In production: invoke Tauri command to write file
  };

  const active = CONFIG_FILES.find((f) => f.id === activeFile);

  return (
    <GlassPanel className="flex h-full flex-col" blur="medium">
      {/* File tabs */}
      <div className="flex gap-1 border-b px-2 py-1.5" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        {CONFIG_FILES.map((file) => (
          <button
            key={file.id}
            onClick={() => switchFile(file.id)}
            className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${
              activeFile === file.id
                ? "bg-[#7cc7a012] text-[#7cc7a0]"
                : "text-[#8b949e] hover:text-[#c9d1d9]"
            }`}
          >
            {file.label}
            {activeFile === file.id && !saved && " *"}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          className="h-full w-full resize-none bg-[#0d1117] p-3 font-mono text-sm text-[#c9d1d9] outline-none"
          spellCheck={false}
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t px-3 py-1.5" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <span className="text-xs font-mono text-[#8b949e]">
          {active?.path} {!saved && "• (unsaved)"}
        </span>
        <div className="flex gap-2">
          <GlassButton variant="ghost" size="sm" onClick={() => {/* format */}}>
            Format
          </GlassButton>
          <GlassButton variant="primary" size="sm" onClick={handleSave} disabled={saved}>
            Save
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}