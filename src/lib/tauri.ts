import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import type { AgentToGuiFrame } from "./ipc-types";

// ── Frontend → Backend (invoke commands) ──

export async function createSession(provider: string, projectId: string): Promise<{ session_id: string }> {
  return invoke("create_session", { provider, projectId });
}

export async function sendMessage(sessionId: string, content: string): Promise<void> {
  return invoke("send_message", { sessionId, content });
}

export async function cancelSession(sessionId: string, reason?: string): Promise<void> {
  return invoke("cancel_session", { sessionId, reason });
}

export async function listSessions(projectId: string): Promise<unknown[]> {
  return invoke("list_sessions", { projectId });
}

export async function getSession(sessionId: string): Promise<unknown> {
  return invoke("get_session", { sessionId });
}

export async function handleUserMessage(sessionId: string, content: string): Promise<void> {
  return invoke("handle_user_message", { sessionId, content });
}

export async function handleSlashCommand(sessionId: string, command: string, args?: string): Promise<void> {
  return invoke("handle_slash_command", { sessionId, command, args });
}

export async function handleCancel(sessionId: string, reason?: string): Promise<void> {
  return invoke("handle_cancel", { sessionId, reason });
}

export async function handleRawFile(sessionId: string, path: string, noLineNumbers: boolean): Promise<void> {
  return invoke("handle_raw_file", { sessionId, path, noLineNumbers });
}

export async function listMemories(scope?: string): Promise<unknown[]> {
  return invoke("list_memories", { scope });
}

export async function createMemory(memory: Record<string, unknown>): Promise<void> {
  return invoke("create_memory", { memory });
}

export async function deleteMemory(id: string): Promise<void> {
  return invoke("delete_memory", { id });
}

export async function getSessionCost(sessionId: string): Promise<{ total_cost_usd: number }> {
  return invoke("get_session_cost", { sessionId });
}

export async function getProjectCost(projectId: string): Promise<{ total_cost_usd: number }> {
  return invoke("get_project_cost", { projectId });
}

export async function fetchRegistry(): Promise<unknown[]> {
  return invoke("fetch_registry");
}

export async function installItem(itemId: string): Promise<void> {
  return invoke("install_item", { itemId });
}

export async function uninstallItem(itemId: string): Promise<void> {
  return invoke("uninstall_item", { itemId });
}

export async function detectInstalledClis(): Promise<Record<string, { installed: boolean; version?: string }>> {
  return invoke("detect_installed_clis");
}

// ── Backend → Frontend (event listeners) ──

export function onAgentEvent(handler: (frame: AgentToGuiFrame) => void): Promise<UnlistenFn> {
  return listen<AgentToGuiFrame>("agent::thinking", (e) => handler(e.payload));
}

// Generic helper to listen on all agent event types
export function onAgentEventAll(handler: (eventType: string, payload: unknown) => void): UnlistenFn[] {
  const eventTypes = [
    "agent::thinking", "agent::text", "agent::tool_call", "agent::tool_result",
    "agent::diff", "agent::token_info", "agent::context_stats", "agent::permission_request",
    "agent::checkpoint", "agent::memory_suggestion", "agent::error", "agent::narrative",
    "agent::context_snapshot", "agent::cache_status",
  ];

  const unlisteners: UnlistenFn[] = [];
  for (const eventType of eventTypes) {
    listen(eventType, (e) => {
      handler(eventType, e.payload);
    }).then((unlisten) => unlisteners.push(unlisten));
  }

  return unlisteners;
}