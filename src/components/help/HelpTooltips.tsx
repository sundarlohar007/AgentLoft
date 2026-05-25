import { useEffect } from "react";

export function HelpTooltips() {
  useEffect(() => {
    // Register first-visit tooltips
    // In production: track which tooltips have been shown per user
    // Auto-show tooltip on first visit to each panel
  }, []);

  return null; // Tooltips managed by global tooltip system
}

export function getPanelHelp(panelId: string): string {
  const helps: Record<string, string> = {
    chat: "Type your message here. The agent responds with streaming text and tool calls. Use Ctrl+K for slash commands.",
    filetree: "Your project files. Drag files into chat to attach them. Right-click for context menu.",
    cockpit: "Real-time agent observability. See every tool call, check blast radius, and detect intent drift.",
    memory: "Memories the agent has learned about your project. Auto-extracted from sessions.",
    cost: "Track your API spending in real-time. Set budget caps to control costs.",
  };
  return helps[panelId] || "";
}