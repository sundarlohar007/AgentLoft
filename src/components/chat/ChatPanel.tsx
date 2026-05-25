import { GlassPanel } from "@/components/shared/primitives";
import { useSessionStore } from "@/stores/sessionStore";
import { ToolCallCard } from "./ToolCallCard";
import { ChatInput } from "./ChatInput";
import { useEffect, useRef } from "react";

export function ChatPanel() {
  const { messages, toolCalls } = useSessionStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Group tool calls by parent message
  const toolCallsByMessage = new Map<string, typeof toolCalls extends Map<string, infer T> ? T[] : never>();
  for (const tc of toolCalls.values()) {
    const list = toolCallsByMessage.get(tc.message_id) || [];
    list.push(tc);
    toolCallsByMessage.set(tc.message_id, list);
  }

  return (
    <GlassPanel className="flex h-full flex-col" blur="heavy">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="animate-dissolve">
              <p className="text-lg font-medium text-[#c9d1d9]">AgentLoft</p>
              <p className="mt-1 text-sm text-[#8b949e]">
                Select a CLI backend and start a session.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const msgToolCalls = toolCallsByMessage.get(msg.id) || [];
              return (
                <div key={msg.id} className="space-y-2">
                  {/* Message bubble */}
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className="animate-slide-up max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? { background: "rgba(124, 199, 160, 0.12)", color: "#c9d1d9" }
                          : { background: "rgba(22, 27, 34, 0.8)", color: "#c9d1d9" }
                      }
                    >
                      <div
                        className="prose prose-invert max-w-none text-sm [&_pre]:rounded-md [&_pre]:bg-[#0d1117] [&_pre]:p-3 [&_code]:text-xs [&_code]:text-[#7cc7a0]"
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
                    </div>
                  </div>

                  {/* Tool calls spawned from this message */}
                  {msgToolCalls.map((tc) => (
                    <ToolCallCard key={tc.id} toolCall={tc} />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input area */}
      <ChatInput />
    </GlassPanel>
  );
}