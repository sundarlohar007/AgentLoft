import { GlassPanel, GlassInput } from "@/components/shared/primitives";
import { useState } from "react";

const HELP_SECTIONS = {
  "Getting Started": [
    { q: "How do I start a session?", a: "Click the CLI dropdown in the chat input, select a backend (Claude Code, Codex CLI, etc.), type your message, and press Enter." },
    { q: "What is persistent memory?", a: "AgentLoft remembers project conventions, decisions, and preferences across sessions using LanceDB. Memories are auto-extracted and injected at session start." },
    { q: "Do I need my own API keys?", a: "Yes. AgentLoft wraps your existing CLI tools. You use the same API keys and subscriptions you already have." },
  ],
  "Panel Reference": [
    { q: "Chat Panel", a: "Main area where you interact with the agent. Shows messages, tool calls, diffs, and streaming responses." },
    { q: "Agent Cockpit", a: "Right sidebar showing real-time tool calls, blast radius preview, intent gap detection, and rollback controls." },
    { q: "File Tree", a: "Left sidebar showing your project's file structure. Drag files into chat to attach them." },
  ],
  "Keyboard Shortcuts": [
    { q: "Ctrl+K", a: "Universal Command Palette — search all slash commands across CLI backends." },
    { q: "Ctrl+\\", a: "Toggle floating mini terminal for direct CLI access." },
    { q: "Ctrl+Z", a: "Rollback dropdown — restore to last checkpoint." },
    { q: "F1", a: "Open Help Center." },
  ],
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenter({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("Getting Started");

  if (!isOpen) return null;

  const allItems = Object.entries(HELP_SECTIONS).flatMap(([s, items]) =>
    items.map((item) => ({ ...item, section: s }))
  );

  const filtered = allItems.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <GlassPanel className="w-[640px] max-h-[70vh] flex flex-col animate-spring" blur="heavy" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-4 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.1)" }}>
          <h3 className="text-sm font-semibold text-[#c9d1d9]">Help Center (F1)</h3>
          <button onClick={onClose} className="text-xs text-[#484f58] hover:text-[#c9d1d9]">Close</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-40 border-r p-2 space-y-0.5" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
            {Object.keys(HELP_SECTIONS).map((s) => (
              <button key={s} onClick={() => setSection(s)}
                className={`block w-full text-left rounded px-2 py-1 text-xs ${section === s ? "bg-[#7cc7a012] text-[#7cc7a0]" : "text-[#8b949e] hover:text-[#c9d1d9]"}`}>
                {s}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 overflow-y-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help..."
              className="w-full rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono mb-3"
              style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
            />

            {search ? (
              <div className="space-y-2">
                {filtered.map((item, i) => (
                  <div key={i} className="rounded border px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
                    <p className="text-xs font-medium text-[#c9d1d9]">{item.q}</p>
                    <p className="mt-0.5 text-xs text-[#8b949e]">{item.a}</p>
                    <p className="mt-0.5 text-xs text-[#484f58]">{item.section}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(HELP_SECTIONS[section as keyof typeof HELP_SECTIONS] || []).map((item, i) => (
                  <div key={i} className="rounded border px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.06)" }}>
                    <p className="text-xs font-medium text-[#c9d1d9]">{item.q}</p>
                    <p className="mt-0.5 text-xs text-[#8b949e]">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}