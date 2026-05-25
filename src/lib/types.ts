// AgentLoft v1 — TypeScript type definitions
// Sourced from specs/001-agentloft-gui/data-model.md

// ── Core Entities ───────────────────────────────

export interface Session {
  id: string;                    // UUID v7
  project_id: string;
  created_at: string;            // ISO 8601
  updated_at: string;
  model_profile_id: string;
  title: string;                 // Auto-generated from first user message
  status: "active" | "completed" | "error" | "paused";
  total_cost_usd: number;
  total_tokens_in: number;
  total_tokens_out: number;
  cache_hit_rate: number;        // 0.0–1.0
  messages: Message[];
  tool_calls: ToolCall[];
  checkpoints: Checkpoint[];
  context_snapshots: ContextSnapshot[];
  metadata: Record<string, unknown>;
}

export interface Message {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;               // Markdown
  created_at: string;
  token_count?: number;
  cost_usd?: number;
  attachments?: Attachment[];
  tool_calls_in_message?: string[];
}

export interface Attachment {
  id: string;
  message_id: string;
  type: "file" | "directory" | "image" | "clipboard";
  path?: string;
  content?: string;
  raw_mode: boolean;
  token_count: number;
}

export interface ToolCall {
  id: string;
  session_id: string;
  message_id: string;
  turn: number;
  type: "read_file" | "write_file" | "bash" | "browser" | "mcp" | "search" | "todo_write" | string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: "pending" | "approved" | "rejected" | "completed" | "error";
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
  permission_required: boolean;
  permission_granted?: boolean;
  cost_usd?: number;
  affected_files?: string[];
  blast_radius_score?: number;
}

export interface Checkpoint {
  id: string;
  session_id: string;
  turn: number;
  created_at: string;
  label?: string;
  type: "auto" | "manual" | "milestone";
  file_snapshot: FileSnapshot[];
  context_snapshot: ContextSnapshot;
  cost_at_checkpoint: number;
}

export interface FileSnapshot {
  path: string;
  hash: string;                  // SHA256
  content: string;
  size_bytes: number;
}

export interface ContextSnapshot {
  id: string;
  session_id: string;
  created_at: string;
  trigger: "periodic" | "checkpoint" | "resume" | "manual";
  completed_tasks: string[];
  constraints: string[];
  open_items: string[];
  file_hashes: Record<string, string>;
  token_usage: {
    prompt: number;
    completion: number;
    cache_read: number;
    cache_write: number;
  };
  health_score: number;          // 0–100
  warnings: string[];
}

export interface MemoryEntry {
  id: string;
  scope: "project" | "user" | "agent" | "org";
  category: "convention" | "decision" | "constraint" | "preference" | "fact" | "gotcha";
  content: string;
  embedding: Float32Array;       // 384-dim, LanceDB
  confidence: number;            // 0.0–1.0
  freshness: number;             // 0.0–1.0
  verified: boolean;
  source_session_id: string;
  created_at: string;
  last_used_at: string;
  use_count: number;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  root_path: string;
  created_at: string;
  updated_at: string;
  stack: string[];
  active_model_profile_id?: string;
  active_connection_profile_id?: string;
  memory_budget_tokens: number;  // Default 4000
  context_yaml_path: string;
  protected_paths: string[];
  agentloft_ignore: string[];
  session_count: number;
  total_cost_usd: number;
  metadata: Record<string, unknown>;
}

export interface ModelProfile {
  id: string;
  name: string;
  provider: "claude_code" | "codex_cli" | "antigravity_cli" | "ollama" | "groq" | "together" | "openai_compatible";
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

export interface ConnectionProfile {
  id: string;
  name: string;
  models: {
    primary: string;
    secondary?: string;
    tertiary?: string;
    fallback?: string;
  };
  auto_fallback: boolean;
  fallback_notify: boolean;
  quality_warning: boolean;
  restore_primary: boolean;
  retry_queue_max: number;       // Default 10
  rate_limit_detection: {
    claude: boolean;
    codex: boolean;
    antigravity: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface MarketplaceItem {
  id: string;
  type: "skill" | "plugin" | "mcp" | "template" | "theme" | "flow";
  name: string;
  version: string;
  author: string;
  description: string;
  long_description?: string;
  tags: string[];
  category: string;
  downloads: number;
  rating: number;               // 1.0–5.0
  rating_count: number;
  license: string;
  source_url: string;
  security_scan: {
    passed: boolean;
    scanned_at: string;
    findings: SecurityFinding[];
  };
  verified_publisher: boolean;
  price_usd: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityFinding {
  severity: "low" | "medium" | "high" | "critical";
  rule_id: string;
  description: string;
  location: string;
}

export interface ZeroWasteMetrics {
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
  updated_at: string;
}

export interface Setting {
  key: string;
  value: unknown;
  scope: "global" | "project" | "session";
  updated_at: string;
}