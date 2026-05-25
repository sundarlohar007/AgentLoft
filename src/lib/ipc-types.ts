// AgentLoft v1 — IPC Event Type Definitions
// Sourced from specs/001-agentloft-gui/contracts/ipc-events.md

import type { Attachment, ContextSnapshot, MemoryEntry } from "./types";

// ── Agent → GUI Frames (Backend emits, Frontend renders) ──

export type AgentToGuiFrame =
  // Text Streaming
  | { type: "thinking"; data: { session_id: string; content: string; is_final: boolean } }
  | { type: "text"; data: { session_id: string; content: string; is_final: boolean } }

  // Tool Lifecycle
  | { type: "tool_call"; data: { id: string; session_id: string; name: string; input: Record<string, unknown>; start_ms: number } }
  | { type: "tool_result"; data: { id: string; session_id: string; output: unknown; error?: string; duration_ms: number } }

  // Slash Command
  | { type: "slash_command"; data: { session_id: string; command: string; args: string } }

  // Error
  | { type: "error"; data: { session_id: string; code: string; message: string; recoverable: boolean } }

  // File Changes
  | { type: "diff"; data: { session_id: string; path: string; before: string; after: string; hunks: DiffHunk[] } }

  // Cost & Context
  | { type: "token_info"; data: { session_id: string; prompt_tokens: number; completion_tokens: number; cache_read: number; cache_write: number; cost_usd: number } }
  | { type: "context_stats"; data: { session_id: string; used: number; limit: number; health_score: number; warnings: string[] } }

  // Narrative
  | { type: "narrative"; data: { session_id: string; entry: string; linked_tool_id?: string; timestamp: number } }

  // Memory
  | { type: "memory_suggestion"; data: { session_id: string; entries: MemoryExtraction[]; source: "auto" | "manual" } }

  // Context Lifecycle
  | { type: "context_snapshot"; data: { session_id: string; snapshot: ContextSnapshot; trigger: "periodic" | "checkpoint" | "resume" } }
  | { type: "cache_status"; data: { session_id: string; hit: boolean; saved_tokens: number } }

  // Checkpoints
  | { type: "checkpoint"; data: { session_id: string; checkpoint_id: string; label?: string; file_count: number; timestamp: number } }

  // Permission
  | { type: "permission_request"; data: PermissionRequest }

  // Zero-Waste
  | { type: "zero_waste_update"; data: { session_id: string; total_saved: number; ratio: number } };

// ── GUI → Agent Frames (Frontend sends, Backend executes) ──

export type GuiToAgentFrame =
  // User Input
  | { type: "user_message"; data: { session_id: string; content: string; attachments?: Attachment[] } }
  | { type: "slash_command"; data: { session_id: string; command: string; args?: string } }

  // Control
  | { type: "cancel"; data: { session_id: string; reason?: string } }
  | { type: "config_change"; data: { session_id: string; key: string; value: unknown; scope: "session" | "project" | "global" } }

  // Session Branching
  | { type: "fork"; data: { session_id: string; from_message_id: string; new_session_id: string } }

  // File Attachments
  | { type: "raw_file"; data: { session_id: string; path: string; no_line_numbers: boolean; content?: string } }

  // Memory Management
  | { type: "memory_inject"; data: { session_id: string; entries: MemoryEntry[]; scope: "working" | "episodic" | "semantic" | "procedural" } }

  // Context Pruning
  | { type: "context_prune"; data: { session_id: string; prune_ids: string[]; compress_to?: string } }

  // Checkpoint Management
  | { type: "checkpoint_restore"; data: { session_id: string; checkpoint_id: string } }
  | { type: "checkpoint_create"; data: { session_id: string; label?: string } }

  // Permission Response
  | { type: "permission_response"; data: { session_id: string; request_id: string; decision: "approve" | "reject" | "approve_all" | "reject_all"; scope?: "once" | "session" | "always" } };

// ── Supporting Types ──

export interface DiffHunk {
  old_start: number;
  old_lines: number;
  new_start: number;
  new_lines: number;
  content: string;
}

export interface MemoryExtraction {
  content: string;
  category: "convention" | "decision" | "constraint" | "preference" | "fact" | "gotcha";
  confidence: number;
  source_line?: string;
}

export interface PermissionRequest {
  id: string;
  session_id: string;
  tool_type: "write_file" | "bash" | "network" | "mcp";
  description: string;
  command?: string;
  affected_paths: string[];
  blast_radius_score: number;
  risk_level: "low" | "medium" | "high" | "critical";
  can_proceed: boolean;
  block_reason?: string;
}