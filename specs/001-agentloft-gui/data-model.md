# Data Models: AgentLoft v1

**Date**: 2026-05-25 | **Phase**: 1 — Design & Contracts

All data models local-first. Storage: SQLite (sessions, settings, audit log) + LanceDB (memory embeddings) + filesystem (checkpoints in `.agentloft/snapshots/`, config in `.agentloft/`, sessions autosave in `.claude/sessions/`).

## Entity Overview

```
Session 1----* Message
Session 1----* ToolCall
Session 1----* Checkpoint
Session 1----* ContextSnapshot
Session *----1 Project
Project 1----* MemoryEntry
Project 1----1 ConnectionProfile (active)
Session *----1 ModelProfile
MarketplaceItem (standalone, cached in SQLite)
ZeroWasteMetrics 1----1 Session
```

## 1. Session

One session = one continuous conversation with a CLI agent.

```typescript
interface Session {
  id: string;                    // UUID v7 (time-sortable)
  project_id: string;
  created_at: Date;
  updated_at: Date;
  model_profile_id: string;
  title: string;                 // Auto-generated from first user message
  status: 'active' | 'completed' | 'error' | 'paused';
  total_cost_usd: number;
  total_tokens_in: number;
  total_tokens_out: number;
  cache_hit_rate: number;        // 0.0 - 1.0
  messages: Message[];
  tool_calls: ToolCall[];
  checkpoints: Checkpoint[];
  context_snapshots: ContextSnapshot[];
  metadata: Record<string, unknown>;
}
```

**State machine**: active -> paused -> active; active -> completed; active -> error.

## 2. Message

```typescript
interface Message {
  id: string;                    // UUID v7
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;               // Markdown
  created_at: Date;
  token_count?: number;
  cost_usd?: number;
  attachments?: Attachment[];
  tool_calls_in_message?: string[];
}
```

## 3. Attachment

```typescript
interface Attachment {
  id: string;
  message_id: string;
  type: 'file' | 'directory' | 'image' | 'clipboard';
  path?: string;
  content?: string;
  raw_mode: boolean;             // PRD S7.0.11 - strips line numbers when true
  token_count: number;
}
```

## 4. ToolCall

Every agent tool invocation, recorded and inspectable.

```typescript
interface ToolCall {
  id: string;
  session_id: string;
  message_id: string;
  turn: number;
  type: 'read_file' | 'write_file' | 'bash' | 'browser' | 'mcp' | 'search' | 'todo_write' | string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'error';
  started_at: Date;
  completed_at?: Date;
  duration_ms?: number;
  permission_required: boolean;
  permission_granted?: boolean;
  cost_usd?: number;
  affected_files?: string[];
  blast_radius_score?: number;   // 0.0 - 1.0
}
```

**State machine**: pending -> approved -> completed | error; pending -> rejected.

## 5. Checkpoint

Snapshot of working directory before agent writes. Enables one-click rollback (PRD S7.8.8).

```typescript
interface Checkpoint {
  id: string;
  session_id: string;
  turn: number;
  created_at: Date;
  label?: string;
  type: 'auto' | 'manual' | 'milestone';
  file_snapshot: FileSnapshot[];
  context_snapshot: ContextSnapshot;
  cost_at_checkpoint: number;
}

interface FileSnapshot {
  path: string;                  // Relative to project root
  hash: string;                  // SHA256
  content: string;               // Stored in .agentloft/snapshots/
  size_bytes: number;
}
```

**Storage**: `.agentloft/snapshots/{session_id}/{checkpoint_id}/`

## 6. ContextSnapshot

Structured state of agent context at a point in time.

```typescript
interface ContextSnapshot {
  id: string;
  session_id: string;
  created_at: Date;
  trigger: 'periodic' | 'checkpoint' | 'resume' | 'manual';
  completed_tasks: string[];
  constraints: string[];
  open_items: string[];
  file_hashes: Record<string, string>; // path -> SHA256
  token_usage: {
    prompt: number;
    completion: number;
    cache_read: number;
    cache_write: number;
  };
  health_score: number;          // 0-100
  warnings: string[];
}
```

## 7. MemoryEntry

Persistent memory stored in LanceDB with semantic retrieval.

```typescript
interface MemoryEntry {
  id: string;
  scope: 'project' | 'user' | 'agent' | 'org';
  category: 'convention' | 'decision' | 'constraint' | 'preference' | 'fact' | 'gotcha';
  content: string;
  embedding: Float32Array;       // 384-dim, LanceDB
  confidence: number;            // 0.0 - 1.0
  freshness: number;             // 0.0 - 1.0, decays 0.01/day, reset to 1.0 on use
  verified: boolean;
  source_session_id: string;
  created_at: Date;
  last_used_at: Date;
  use_count: number;
  tags: string[];
}
```

**Memory Bootstrap (PRD S7.3.3a)**: First project open reads existing CLAUDE.md, AGENTS.md, manifest files; pre-populates project memory at 0.95 confidence.

**Memory Extraction**: Post-session, auto-accepted with non-blocking toast. 24-hour review window.

## 8. Project

```typescript
interface Project {
  id: string;
  name: string;
  root_path: string;
  created_at: Date;
  updated_at: Date;
  stack: string[];               // Detected: ['typescript', 'react', 'prisma']
  active_model_profile_id?: string;
  active_connection_profile_id?: string;
  memory_budget_tokens: number;  // Default 4000
  context_yaml_path: string;     // .agentloft/context.yaml
  protected_paths: string[];
  agentloft_ignore: string[];
  session_count: number;
  total_cost_usd: number;
  metadata: Record<string, unknown>;
}
```

**Auto-detect (PRD S7.7.3)**: Scans package.json, pyproject.toml, Cargo.toml, go.mod. Generates `.agentloft/context.yaml`, seeds project memory, suggests MCPs.

## 9. ModelProfile

```typescript
interface ModelProfile {
  id: string;
  name: string;
  provider: 'claude_code' | 'codex_cli' | 'antigravity_cli' | 'ollama' | 'groq' | 'together' | 'openai_compatible';
  model_id: string;
  context_window: number;
  max_output_tokens: number;
  pricing: {
    prompt_per_1k: number;
    completion_per_1k: number;
    cache_read_per_1k?: number;
    cache_write_per_1k?: number;
  };
  supports_vision: boolean;
  supports_streaming: boolean;
  supports_tools: boolean;
  capabilities: string[];
  is_default: boolean;
  metadata: Record<string, unknown>;
}
```

## 10. ConnectionProfile

Model chain with automatic fallback (PRD S7.0.12).

```typescript
interface ConnectionProfile {
  id: string;
  name: string;
  models: {
    primary: string;             // ModelProfile ID
    secondary?: string;
    tertiary?: string;
    fallback?: string;
  };
  auto_fallback: boolean;
  fallback_notify: boolean;
  quality_warning: boolean;      // Banner when fallback is weaker tier
  restore_primary: boolean;
  retry_queue_max: number;       // Default 10
  rate_limit_detection: {
    claude: boolean;             // 429 / overloaded_error
    codex: boolean;              // RateLimitError
    antigravity: boolean;        // RESOURCE_EXHAUSTED
  };
  created_at: Date;
  updated_at: Date;
}
```

## 11. MarketplaceItem

Cached from static CDN registry in SQLite.

```typescript
interface MarketplaceItem {
  id: string;
  type: 'skill' | 'plugin' | 'mcp' | 'template' | 'theme' | 'flow';
  name: string;
  version: string;
  author: string;
  description: string;
  long_description?: string;
  tags: string[];
  category: string;
  downloads: number;
  rating: number;               // 1.0 - 5.0
  rating_count: number;
  license: string;
  source_url: string;
  security_scan: {
    passed: boolean;
    scanned_at: Date;
    findings: SecurityFinding[];
  };
  verified_publisher: boolean;
  price_usd: number;
  created_at: Date;
  updated_at: Date;
}
```

## 12. ZeroWasteMetrics

Per-session token savings (PRD S7.21).

```typescript
interface ZeroWasteMetrics {
  session_id: string;
  mcp_schema_tokens_saved: number;
  mcp_schemas_active: number;
  mcp_schemas_total: number;
  terminal_raw_tokens: number;
  terminal_compressed_tokens: number;
  terminal_compression_ratio: number;
  self_edit_dedup_count: number;
  self_edit_tokens_saved: number;
  full_history_tokens_estimate: number;
  checkpoint_tokens_actual: number;
  checkpoint_compression_ratio: number;
  total_tokens_saved: number;
  combined_savings_ratio: number;
  updated_at: Date;
}
```

## 13. Settings

Key-value scoped by 3-Level Scope Inheritance (PRD S7.18).

```typescript
interface Setting {
  key: string;
  value: unknown;
  scope: 'global' | 'project' | 'session';
  updated_at: Date;
}
```

Scope inheritance: Session > Project > Global. Lock icon indicates higher scope has locked the value.

## Storage Layout

```
~/.agentloft/                    # Global config
├── config.json
├── memory/                      # LanceDB
│   └── lancedb/
├── logs/                        # IPC frame logs
├── plugins/                     # Installed plugins
├── cache/
│   ├── marketplace.json         # Cached registry
│   └── prices.json              # Model pricing (7-day TTL)
└── tee/                         # Terminal output full logs
    └── {session_id}/
        └── {timestamp}-{command}.log

<project>/.agentloft/            # Per-project config
├── context.yaml                 # Protected paths, constraints
├── snapshots/                   # Checkpoints
│   └── {checkpoint_id}/
└── .agentloftignore            # Files never sent to any model

<project>/.claude/sessions/      # Session autosave + crash recovery
└── {session_id}/
    ├── autosave.json            # 5-second autosave
    └── shutdown_complete        # Marker file -- absence triggers recovery
```
