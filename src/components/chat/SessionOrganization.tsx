import { useState } from "react";

interface SessionFolder {
  id: string; name: string; sessionIds: string[];
}

interface Props {
  folders: SessionFolder[];
  onCreateFolder: (name: string) => void;
  _onMoveToFolder: (sessionId: string, folderId: string) => void;
  _onArchive: (sessionId: string) => void;
  onBulkAction: (sessionIds: string[], action: "tag" | "move" | "archive" | "export" | "delete") => void;
}

const TAG_COLORS = ["#f85149", "#d29922", "#3fb950", "#58a6ff", "#bc8cff", "#ff80bf", "#79c0ff", "#7cc7a0"];

export function SessionOrganization({ folders, onCreateFolder, onBulkAction }: Props) {
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedSessions] = useState<Set<string>>(new Set());

  return (
    <div className="p-3 text-xs space-y-3">
      {/* Folders */}
      <div>
        <h4 className="text-[#8b949e] font-medium mb-1">Folders</h4>
        <div className="space-y-0.5">
          {folders.map((folder) => (
            <div key={folder.id} className="flex items-center justify-between rounded px-2 py-1 hover:bg-[#7cc7a004]">
              <span className="text-[#c9d1d9]">{'\u{1F4C1}'} {folder.name}</span>
              <span className="font-mono text-[#484f58]">{folder.sessionIds.length}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-1">
          <input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder..."
            className="flex-1 rounded border bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#c9d1d9] outline-none font-mono"
            style={{ borderColor: "rgba(124, 199, 160, 0.12)" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newFolderName.trim()) {
                onCreateFolder(newFolderName.trim());
                setNewFolderName("");
              }
            }}
          />
        </div>
      </div>

      {/* Color tags */}
      <div>
        <h4 className="text-[#8b949e] font-medium mb-1">Color Tags</h4>
        <div className="flex gap-1">
          {TAG_COLORS.map((color) => (
            <button key={color}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
              style={{ background: color, borderColor: "rgba(255,255,255,0.1)" }}
              onClick={() => onBulkAction(Array.from(selectedSessions), "tag")}
            />
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      {selectedSessions.size > 0 && (
        <div className="rounded-md border p-2" style={{ borderColor: "rgba(124, 199, 160, 0.1)" }}>
          <span className="text-[#8b949e]">{selectedSessions.size} selected</span>
          <div className="mt-1.5 flex gap-1 flex-wrap">
            {(["tag", "move", "archive", "export", "delete"] as const).map((action) => (
              <button key={action}
                onClick={() => onBulkAction(Array.from(selectedSessions), action)}
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  action === "delete" ? "text-[#f85149] hover:bg-[#f8514910]" : "text-[#7cc7a0] hover:bg-[#7cc7a008]"
                }`}>
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Archive info */}
      <div className="text-[#484f58] italic">
        Sessions inactive for 30+ days are suggested for archive.
      </div>
    </div>
  );
}