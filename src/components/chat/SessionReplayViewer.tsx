import { GlassPanel, GlassButton } from "@/components/shared/primitives";
import { useState, useEffect } from "react";

interface ReplayMessage {
  id: string; role: string; content: string; created_at: string;
}

interface Props {
  messages: ReplayMessage[];
  speed?: number;
}

export function SessionReplayViewer({ messages, speed = 1 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(speed);

  useEffect(() => {
    if (!playing || currentIndex >= messages.length) {
      if (currentIndex >= messages.length) setPlaying(false);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentIndex((i) => Math.min(i + 1, messages.length));
    }, 1000 / replaySpeed);
    return () => clearTimeout(timeout);
  }, [playing, currentIndex, messages.length, replaySpeed]);

  if (messages.length === 0) {
    return <div className="p-3 text-xs text-[#484f58]">No messages to replay.</div>;
  }

  const visible = messages.slice(0, currentIndex + 1);

  return (
    <GlassPanel className="flex flex-col" blur="medium">
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
        <GlassButton variant="ghost" size="sm" onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </GlassButton>
        <GlassButton variant="ghost" size="sm" onClick={() => setCurrentIndex(0)}>
          Reset
        </GlassButton>
        <select value={replaySpeed} onChange={(e) => setReplaySpeed(Number(e.target.value))}
          className="ml-auto rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9]"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
          <option value={8}>8x</option>
        </select>
        <span className="text-xs font-mono text-[#8b949e]">
          {currentIndex + 1}/{messages.length}
        </span>
      </div>

      <div className="max-h-64 overflow-y-auto p-3 space-y-2">
        {visible.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] rounded-lg px-3 py-1.5 text-xs"
              style={msg.role === "user"
                ? { background: "rgba(124, 199, 160, 0.1)", color: "#c9d1d9" }
                : { background: "rgba(22, 27, 34, 0.8)", color: "#c9d1d9" }}>
              {msg.content.slice(0, 300)}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}