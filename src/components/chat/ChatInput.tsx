import { GlassButton, GlassInput } from "@/components/shared/primitives";
import { useSessionStore } from "@/stores/sessionStore";
import { createSession, sendMessage } from "@/lib/tauri";
import { useState } from "react";

const PROVIDERS = [
  { id: "claude_code", label: "Claude Code" },
  { id: "codex_cli", label: "Codex CLI" },
  { id: "antigravity_cli", label: "Antigravity (exp)" },
  { id: "ollama", label: "Ollama" },
];

export function ChatInput() {
  const { activeSessionId, setActiveSession, addMessage } = useSessionStore();
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState("claude_code");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);

    try {
      let sessionId = activeSessionId;
      if (!sessionId) {
        const result = await createSession(provider, "default");
        sessionId = result.session_id;
        setActiveSession(sessionId);
      }

      addMessage({
        id: crypto.randomUUID(),
        session_id: sessionId,
        role: "user",
        content: input,
        created_at: new Date().toISOString(),
      });

      await sendMessage(sessionId, input);
      setInput("");
    } catch (e) {
      console.error("Send failed:", e);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-3" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
      <div className="flex items-end gap-2">
        {!activeSessionId && (
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="rounded-md border px-2 py-1.5 text-xs text-[#c9d1d9] outline-none"
            style={{
              background: "rgba(13, 17, 23, 0.9)",
              borderColor: "rgba(124, 199, 160, 0.15)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        )}

        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message... (Enter to send, Shift+Enter for newline)"
            rows={Math.min(input.split("\n").length, 6)}
            className="w-full resize-none rounded-md border px-3 py-2 text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none focus:border-[#7cc7a040]"
            style={{
              background: "rgba(13, 17, 23, 0.8)",
              borderColor: "rgba(124, 199, 160, 0.12)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          />
        </div>

        <div className="flex gap-1">
          <input
            type="file"
            id="file-attach"
            className="hidden"
            multiple
            onChange={(e) => { /* attachment handling */ }}
          />
          <label
            htmlFor="file-attach"
            className="cursor-pointer rounded-md px-2 py-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            style={{ background: "rgba(124, 199, 160, 0.06)" }}
            title="Attach files"
          >
            +
          </label>
          <GlassButton onClick={handleSend} disabled={sending || !input.trim()}>
            {sending ? "..." : "Send"}
          </GlassButton>
        </div>
      </div>

      {activeSessionId && (
        <div className="mt-1 text-xs text-[#484f58] font-mono">
          Session: {activeSessionId.slice(0, 8)}...
        </div>
      )}
    </div>
  );
}