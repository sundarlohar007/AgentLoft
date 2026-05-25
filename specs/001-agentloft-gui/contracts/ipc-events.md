# IPC Event Schema: AgentLoft v1

**Date**: 2026-05-25 | **Phase**: 1 — Design & Contracts

Full bidirectional frame protocol between Rust backend and React frontend. All events serialized as JSON over Tauri event system.

## Protocol Overview

```
React Frontend  <---- Tauri Events ----  Rust Backend  <---- stdout ----  CLI Child Process
                 ---- Tauri Commands -->                ---- stdin ----->
```

- **Backend -> Frontend**: Tauri `emit()` events. Frontend `listen()`.
- **Frontend -> Backend**: Tauri `invoke()` commands. Async Rust functions.
- **CLI I/O**: Stream-JSON on stdout (primary), PTY for fallback/interactive.

## Agent -> GUI Frames

```typescript
type AgentToGuiFrame =
  // Text Streaming
  | { type: 'thinking'; data: { session_id: string; content: string; is_final: boolean } }
  | { type: 'text'; data: { session_id: string; content: string; is_final: boolean } }

  // Tool Lifecycle
  | { type: 'tool_call'; data: { id: string; session_id: string; name: string; input: Record<string, unknown>; start_ms: number } }
  | { type: 'tool_result'; data: { id: string; session_id: string; output: unknown; error?: string; duration_ms: number } }

  // Slash Command
  | { type: 'slash_command'; data: { session_id: string; command: string; args: string } }

  // Error
  | { type: 'error'; data: { session_id: string; code: string; message: string; recoverable: boolean } }

  // File Changes
  | { type: 'diff'; data: { session_id: string; path: string; before: string; after: string; hunks: DiffHunk[] } }

  // Cost & Context
  | { type: 'token_info'; data: { session_id: string; prompt_tokens: number; completion_tokens: number; cache_read: number; cache_write: number; cost_usd: number } }
  | { type: 'context_stats'; data: { session_id: string; used: number; limit: number; health_score: number; warnings: string[] } }

  // Narrative
  | { type: 'narrative'; data: { session_id: string; entry: string; linked_tool_id?: string; timestamp: number } }

  // Memory
  | { type: 'memory_suggestion'; data: { session_id: string; entries: MemoryExtraction[]; source: 'auto' | 'manual' } }

  // Context Lifecycle
  | { type: 'context_snapshot'; data: { session_id: string; snapshot: ContextSnapshot; trigger: 'periodic' | 'checkpoint' | 'resume' } }
  | { type: 'cache_status'; data: { session_id: string; hit: boolean; saved_tokens: number } }

  // Checkpoints
  | { type: 'checkpoint'; data: { session_id: string; checkpoint_id: string; label?: string; file_count: number; timestamp: number } }

  // Permission
  | { type: 'permission_request'; data: PermissionRequest }

// Supporting Types
interface DiffHunk {
  old_start: number; old_lines: number;
  new_start: number; new_lines: number;
  content: string;              // Unified diff format
}

interface MemoryExtraction {
  content: string;
  category: 'convention' | 'decision' | 'constraint' | 'preference' | 'fact' | 'gotcha';
  confidence: number;
  source_line?: string;
}

interface ContextSnapshot {
  completed_tasks: string[];
  constraints: string[];
  open_items: string[];
  file_hashes: Record<string, string>;
  token_usage: { prompt: number; completion: number; cache_read: number; cache_write: number };
  health_score: number;
  warnings: string[];
}

interface PermissionRequest {
  id: string;
  session_id: string;
  tool_type: 'write_file' | 'bash' | 'network' | 'mcp';
  description: string;
  command?: string;
  affected_paths: string[];
  blast_radius_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  can_proceed: boolean;
  block_reason?: string;
}
```

## GUI -> Agent Frames

```typescript
type GuiToAgentFrame =
  // User Input
  | { type: 'user_message'; data: { session_id: string; content: string; attachments?: Attachment[] } }
  | { type: 'slash_command'; data: { session_id: string; command: string; args?: string } }

  // Control
  | { type: 'cancel'; data: { session_id: string; reason?: string } }
  | { type: 'config_change'; data: { session_id: string; key: string; value: unknown; scope: 'session' | 'project' | 'global' } }

  // Session Branching
  | { type: 'fork'; data: { session_id: string; from_message_id: string; new_session_id: string } }

  // File Attachments
  | { type: 'raw_file'; data: { session_id: string; path: string; no_line_numbers: boolean; content?: string } }

  // Memory Management
  | { type: 'memory_inject'; data: { session_id: string; entries: MemoryEntry[]; scope: 'working' | 'episodic' | 'semantic' | 'procedural' } }

  // Context Pruning
  | { type: 'context_prune'; data: { session_id: string; prune_ids: string[]; compress_to?: string } }

  // Checkpoint Management
  | { type: 'checkpoint_restore'; data: { session_id: string; checkpoint_id: string } }
  | { type: 'checkpoint_create'; data: { session_id: string; label?: string } }

  // Permission Response
  | { type: 'permission_response'; data: { session_id: string; request_id: string; decision: 'approve' | 'reject' | 'approve_all' | 'reject_all'; scope?: 'once' | 'session' | 'always' } }
```

## Frame Lifecycle: File Write

```
1. Agent emits 'tool_call' (name: "write_file", input: {path, content})
2. Backend computes blast_radius_score, checks permissions
3. If permission_required AND NOT auto-approved:
   a. Backend emits 'permission_request' -> Frontend shows modal
   b. Frontend sends 'permission_response' -> Backend
4. If approved:
   a. Backend creates auto-checkpoint (emits 'checkpoint')
   b. Backend writes file to disk
   c. Backend emits 'diff' (before/after with hunks)
   d. Backend emits 'tool_result' (success)
5. If rejected:
   a. Backend emits 'tool_result' (error: "Rejected by user")
6. Backend emits 'token_info' (updated cost)
```

## Contract Guarantees

1. **Ordering**: Frames within session strictly ordered by emission time.
2. **Delivery**: At-most-once. Lost frames handled by session autosave recovery.
3. **Idempotency**: `tool_call.id` and `checkpoint.id` are unique. Frontend deduplicates.
4. **Backpressure**: If frontend >500ms behind, drop narrative frames first, then thinking frames. Never drop tool_call, diff, error, or checkpoint.
5. **Versioning**: Schema versioned. Backend negotiates version on session start.

## IPC Inspector Dev Panel

Settings -> Developer -> IPC Inspector:

- **Live scroll**: Real-time frame feed, color-coded (green=Agent->GUI, blue=GUI->Agent)
- **Filter**: By frame type, session ID, or keyword
- **Search**: Full-text search across all frames in session
- **Stats bar**: Frames/sec, total bytes, avg latency, anomaly count
- **Export**: Download full session frame log as NDJSON
- **Anomaly highlighting**: Missing fields, unexpected types, latency >50ms highlighted red
