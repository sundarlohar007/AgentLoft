import { useEffect } from "react";

type ShortcutHandler = () => void;
type ShortcutMap = Record<string, ShortcutHandler>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = [
        e.ctrlKey || e.metaKey ? "Ctrl" : "",
        e.shiftKey ? "Shift" : "",
        e.altKey ? "Alt" : "",
        e.key.length === 1 ? e.key.toUpperCase() : e.key,
      ].filter(Boolean).join("+");

      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}

export const DEFAULT_SHORTCUTS: Record<string, string> = {
  "Ctrl+K": "Universal Command Palette",
  "Ctrl+Z": "Rollback dropdown",
  "Ctrl+\\": "Floating terminal",
  "Ctrl+Shift+R": "Raw file mode toggle",
  "F1": "Help Center",
  "Ctrl+Shift+I": "IPC Inspector",
  "Ctrl+Shift+Enter": "Retry turn",
};