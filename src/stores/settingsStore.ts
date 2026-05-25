import { create } from "zustand";
import type { Setting } from "@/lib/types";

type ExpertiseLevel = "guided" | "standard" | "expert";

interface SettingsState {
  settings: Map<string, Setting>;
  expertise: ExpertiseLevel;
  costCalmMode: boolean;
  theme: "dark" | "light";

  getSetting: (key: string) => unknown;
  setSetting: (key: string, value: unknown, scope: "global" | "project" | "session") => void;
  resetToInherited: (key: string, scope: "project" | "session") => void;
  setExpertise: (level: ExpertiseLevel) => void;
  setCostCalmMode: (enabled: boolean) => void;
}

// Scope inheritance: Session > Project > Global
const scopePriority: Record<string, number> = { global: 0, project: 1, session: 2 };

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: new Map(),
  expertise: "standard",
  costCalmMode: false,
  theme: "dark",

  getSetting: (key) => {
    const { settings } = get();
    const scopes = ["session", "project", "global"] as const;
    for (const scope of scopes) {
      const entry = settings.get(`${key}:${scope}`);
      if (entry) return entry.value;
    }
    return undefined;
  },

  setSetting: (key, value, scope) => {
    set((s) => {
      const next = new Map(s.settings);
      next.set(`${key}:${scope}`, { key, value, scope, updated_at: new Date().toISOString() });
      return { settings: next };
    });
  },

  resetToInherited: (key, scope) => {
    set((s) => {
      const next = new Map(s.settings);
      next.delete(`${key}:${scope}`);
      return { settings: next };
    });
  },

  setExpertise: (level) => set({ expertise: level, costCalmMode: level === "guided" ? true : get().costCalmMode }),
  setCostCalmMode: (enabled) => set({ costCalmMode: enabled }),
}));