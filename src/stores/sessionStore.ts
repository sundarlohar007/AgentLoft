import { create } from "zustand";
import type { Session, Message, ToolCall, Checkpoint, ContextSnapshot } from "@/lib/types";

interface SessionState {
  activeSessionId: string | null;
  sessions: Map<string, Session>;
  messages: Message[];
  toolCalls: Map<string, ToolCall>;
  checkpoints: Checkpoint[];
  context: {
    used: number;
    limit: number;
    healthScore: number;
    warnings: string[];
  };
  cost: {
    totalUsd: number;
    lastTurnUsd: number;
    promptTokens: number;
    completionTokens: number;
    cacheHitRate: number;
  };

  setActiveSession: (id: string | null) => void;
  addMessage: (msg: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  addToolCall: (tc: ToolCall) => void;
  updateToolCall: (id: string, updates: Partial<ToolCall>) => void;
  addCheckpoint: (cp: Checkpoint) => void;
  updateContext: (ctx: Partial<SessionState["context"]>) => void;
  updateCost: (cost: Partial<SessionState["cost"]>) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  activeSessionId: null,
  sessions: new Map(),
  messages: [],
  toolCalls: new Map(),
  checkpoints: [],
  context: { used: 0, limit: 200000, healthScore: 100, warnings: [] },
  cost: { totalUsd: 0, lastTurnUsd: 0, promptTokens: 0, completionTokens: 0, cacheHitRate: 0 },

  setActiveSession: (id) => set({ activeSessionId: id }),

  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  updateMessage: (id, updates) =>
    set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)) })),

  addToolCall: (tc) =>
    set((s) => {
      const next = new Map(s.toolCalls);
      next.set(tc.id, tc);
      return { toolCalls: next };
    }),
  updateToolCall: (id, updates) =>
    set((s) => {
      const next = new Map(s.toolCalls);
      const existing = next.get(id);
      if (existing) next.set(id, { ...existing, ...updates });
      return { toolCalls: next };
    }),

  addCheckpoint: (cp) => set((s) => ({ checkpoints: [...s.checkpoints, cp] })),
  updateContext: (ctx) => set((s) => ({ context: { ...s.context, ...ctx } })),
  updateCost: (cost) => set((s) => ({ cost: { ...s.cost, ...cost } })),

  reset: () =>
    set({
      activeSessionId: null,
      messages: [],
      toolCalls: new Map(),
      checkpoints: [],
      context: { used: 0, limit: 200000, healthScore: 100, warnings: [] },
      cost: { totalUsd: 0, lastTurnUsd: 0, promptTokens: 0, completionTokens: 0, cacheHitRate: 0 },
    }),
}));