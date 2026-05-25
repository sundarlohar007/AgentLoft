import { GlassPanel } from "@/components/shared/primitives";
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingMiniTerminal({ isOpen, onClose }: Props) {
  const [lines, setLines] = useState<string[]>(["AgentLoft Terminal — type commands directly", ""]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "\\" && e.ctrlKey) {
        e.preventDefault();
        isOpen ? onClose() : onClose();
      }
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    setLines((prev) => [...prev, `$ ${cmd}`, `  (executed locally)`]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 left-4 right-4 z-40 animate-slide-up" style={{ maxHeight: "300px" }}>
      <GlassPanel blur="heavy" className="overflow-hidden">
        <div className="flex items-center justify-between border-b px-3 py-1.5" style={{ borderColor: "rgba(124, 199, 160, 0.1)" }}>
          <span className="text-xs font-medium text-[#8b949e]">Terminal (Ctrl+\\)</span>
          <button onClick={onClose} className="text-xs text-[#484f58] hover:text-[#c9d1d9]">Close</button>
        </div>
        <div className="max-h-48 overflow-y-auto p-2 font-mono text-xs text-[#8b949e]">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <div className="border-t p-2" style={{ borderColor: "rgba(124, 199, 160, 0.08)" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { handleCommand(input); } }}
            className="w-full border-none bg-transparent font-mono text-xs text-[#c9d1d9] outline-none placeholder-[#484f58]"
            placeholder="$ type a command..."
          />
        </div>
      </GlassPanel>
    </div>
  );
}