import { GlassPanel, GlassInput } from "@/components/shared/primitives";
import { useEffect, useState, useRef } from "react";

interface SlashCommand {
  command: string;
  description: string;
  source: "claude" | "codex" | "antigravity";
}

const ALL_COMMANDS: SlashCommand[] = [
  { command: "/compact", description: "Compact conversation context", source: "claude" },
  { command: "/clear", description: "Clear conversation history", source: "claude" },
  { command: "/init", description: "Initialize project context", source: "claude" },
  { command: "/add-dir", description: "Add directory to context", source: "claude" },
  { command: "/config", description: "View or modify configuration", source: "claude" },
  { command: "/doctor", description: "Check system health", source: "claude" },
  { command: "/cost", description: "Show token usage and cost", source: "claude" },
  { command: "/review", description: "Request code review", source: "codex" },
  { command: "/explain", description: "Explain selected code", source: "codex" },
  { command: "/fix", description: "Fix issues in selected code", source: "codex" },
  { command: "/test", description: "Generate tests for selected code", source: "codex" },
  { command: "/refactor", description: "Refactor selected code", source: "codex" },
  { command: "/ground", description: "Ground with Google Search", source: "antigravity" },
  { command: "/think", description: "Enter extended thinking mode", source: "antigravity" },
  { command: "/recall", description: "Recall project context", source: "antigravity" },
];

const SOURCE_COLORS: Record<string, string> = {
  claude: "#7cc7a0", codex: "#58a6ff", antigravity: "#d29922",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (command: string) => void;
}

export function CommandPalette({ isOpen, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        isOpen ? onClose() : onClose();
      }
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALL_COMMANDS.filter(
    (c) => c.command.includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <GlassPanel className="w-[560px] animate-spring" blur="heavy" onClick={(e) => e.stopPropagation()}>
        <div className="p-2">
          <GlassInput
            value={query}
            onChange={setQuery}
            placeholder="Search slash commands..."
            className="w-full"
          />
        </div>
        <div className="max-h-64 overflow-y-auto border-t" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
          {filtered.map((cmd) => (
            <button
              key={cmd.command}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[#7cc7a008] transition-colors"
              onClick={() => { onSelect(cmd.command); onClose(); }}
            >
              <div>
                <span className="font-medium text-[#c9d1d9] font-mono">{cmd.command}</span>
                <span className="ml-2 text-xs text-[#8b949e]">{cmd.description}</span>
              </div>
              <span className="text-xs font-mono" style={{ color: SOURCE_COLORS[cmd.source] }}>
                {cmd.source}
              </span>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="px-3 py-4 text-center text-sm text-[#484f58]">No commands found</div>
        )}
      </GlassPanel>
    </div>
  );
}