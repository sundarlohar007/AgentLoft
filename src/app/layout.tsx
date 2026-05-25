import { Outlet } from "react-router-dom";
import { StatusBar } from "@/components/shared/StatusBar";
import { FileTreePanel } from "@/components/chat/FileTreePanel";
import { CockpitLayout } from "@/components/cockpit/CockpitLayout";

export default function AppLayout() {
  return (
    <div
      className="grid min-h-screen w-full overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr 240px",
        gridTemplateRows: "1fr 32px",
        gap: "1px",
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
      }}
    >
      {/* File Tree Panel — 200px left */}
      <aside
        className="overflow-y-auto border-r"
        style={{
          background: "rgba(22, 27, 34, 0.6)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(124, 199, 160, 0.08)",
        }}
      >
        <FileTreePanel />
      </aside>

      {/* Main Chat Area — 1fr center */}
      <main className="flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Cockpit Panel — 240px right */}
      <aside
        className="overflow-y-auto border-l"
        style={{
          background: "rgba(22, 27, 34, 0.6)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(124, 199, 160, 0.08)",
        }}
      >
        <CockpitLayout />
      </aside>

      {/* Status Bar — 32px bottom, full width */}
      <footer
        className="col-span-3 flex items-center gap-3 border-t px-3 text-xs"
        style={{
          background: "rgba(13, 17, 23, 0.9)",
          backdropFilter: "blur(28px)",
          borderColor: "rgba(124, 199, 160, 0.12)",
          color: "#c9d1d9",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <StatusBar />
      </footer>
    </div>
  );
}