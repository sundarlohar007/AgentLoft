import { GlassPanel, GlassButton, GlassInput } from "@/components/shared/primitives";
import { useState, useEffect } from "react";
import type { MemoryEntry } from "@/lib/types";

interface Props {
  entry?: MemoryEntry | null;
  onSave: (entry: Partial<MemoryEntry>) => void;
  onCancel: () => void;
}

export function MemoryEditor({ entry, onSave, onCancel }: Props) {
  const [content, setContent] = useState("");
  const [scope, setScope] = useState<MemoryEntry["scope"]>("project");
  const [category, setCategory] = useState<MemoryEntry["category"]>("convention");
  const [tags, setTags] = useState("");
  const [confidence, setConfidence] = useState(1.0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (entry) {
      setContent(entry.content);
      setScope(entry.scope);
      setCategory(entry.category);
      setTags(entry.tags.join(", "));
      setConfidence(entry.confidence);
      setVerified(entry.verified);
    }
  }, [entry]);

  const handleSave = () => {
    onSave({
      id: entry?.id,
      content,
      scope,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      confidence,
      verified,
    });
  };

  return (
    <GlassPanel className="flex flex-col gap-3 p-4" blur="heavy">
      <h3 className="text-sm font-semibold text-[#c9d1d9]">
        {entry ? "Edit Memory" : "New Memory"}
      </h3>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Memory content..."
        rows={4}
        className="w-full resize-none rounded border bg-[#0d1117] p-2 text-sm text-[#c9d1d9] outline-none font-mono"
        style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          value={scope}
          onChange={(e) => setScope(e.target.value as MemoryEntry["scope"])}
          className="rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        >
          <option value="project">Project</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="org">Organization</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MemoryEntry["category"])}
          className="rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none"
          style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
        >
          <option value="convention">Convention</option>
          <option value="decision">Decision</option>
          <option value="constraint">Constraint</option>
          <option value="preference">Preference</option>
          <option value="fact">Fact</option>
          <option value="gotcha">Gotcha</option>
        </select>
      </div>

      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="rounded border bg-[#0d1117] px-2 py-1 text-xs text-[#c9d1d9] outline-none font-mono"
        style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
      />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 text-xs text-[#8b949e]">
          <span>Confidence:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(confidence * 100)}
            onChange={(e) => setConfidence(Number(e.target.value) / 100)}
            className="accent-[#7cc7a0]"
          />
          <span className="font-mono text-[#c9d1d9]">{(confidence * 100).toFixed(0)}%</span>
        </label>
        <label className="flex items-center gap-1.5 text-xs text-[#8b949e]">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            className="accent-[#7cc7a0]"
          />
          Verified
        </label>
      </div>

      <div className="flex gap-2">
        <GlassButton variant="primary" onClick={handleSave}>Save</GlassButton>
        <GlassButton variant="ghost" onClick={onCancel}>Cancel</GlassButton>
      </div>
    </GlassPanel>
  );
}