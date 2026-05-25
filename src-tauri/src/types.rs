// AgentLoft v1 — Rust type definitions
// Sourced from specs/001-agentloft-gui/data-model.md

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub id: String,
    pub project_id: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub model_profile_id: String,
    pub title: String,
    pub status: SessionStatus,
    pub total_cost_usd: f64,
    pub total_tokens_in: i64,
    pub total_tokens_out: i64,
    pub cache_hit_rate: f64,
    pub metadata: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SessionStatus {
    Active,
    Completed,
    Error,
    Paused,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub id: String,
    pub session_id: String,
    pub role: MessageRole,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub token_count: Option<i64>,
    pub cost_usd: Option<f64>,
    pub attachments: Option<Vec<Attachment>>,
    pub tool_calls_in_message: Option<Vec<String>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MessageRole { User, Assistant, System }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Attachment {
    pub id: String,
    pub message_id: String,
    pub r#type: AttachmentType,
    pub path: Option<String>,
    pub content: Option<String>,
    pub raw_mode: bool,
    pub token_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AttachmentType { File, Directory, Image, Clipboard }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ToolCall {
    pub id: String,
    pub session_id: String,
    pub message_id: String,
    pub turn: i32,
    pub r#type: String,
    pub input: serde_json::Value,
    pub output: Option<serde_json::Value>,
    pub status: ToolCallStatus,
    pub started_at: DateTime<Utc>,
    pub completed_at: Option<DateTime<Utc>>,
    pub duration_ms: Option<i64>,
    pub permission_required: bool,
    pub permission_granted: Option<bool>,
    pub cost_usd: Option<f64>,
    pub affected_files: Option<Vec<String>>,
    pub blast_radius_score: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ToolCallStatus { Pending, Approved, Rejected, Completed, Error }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Checkpoint {
    pub id: String,
    pub session_id: String,
    pub turn: i32,
    pub created_at: DateTime<Utc>,
    pub label: Option<String>,
    pub r#type: CheckpointType,
    pub file_snapshot: Vec<FileSnapshot>,
    pub context_snapshot: ContextSnapshot,
    pub cost_at_checkpoint: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CheckpointType { Auto, Manual, Milestone }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileSnapshot {
    pub path: String,
    pub hash: String,
    pub content: String,
    pub size_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContextSnapshot {
    pub id: String,
    pub session_id: String,
    pub created_at: DateTime<Utc>,
    pub trigger: SnapshotTrigger,
    pub completed_tasks: Vec<String>,
    pub constraints: Vec<String>,
    pub open_items: Vec<String>,
    pub file_hashes: HashMap<String, String>,
    pub token_usage: TokenUsage,
    pub health_score: i32,
    pub warnings: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SnapshotTrigger { Periodic, Checkpoint, Resume, Manual }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenUsage {
    pub prompt: i64,
    pub completion: i64,
    pub cache_read: i64,
    pub cache_write: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryEntry {
    pub id: String,
    pub scope: MemoryScope,
    pub category: MemoryCategory,
    pub content: String,
    pub confidence: f64,
    pub freshness: f64,
    pub verified: bool,
    pub source_session_id: String,
    pub created_at: DateTime<Utc>,
    pub last_used_at: DateTime<Utc>,
    pub use_count: i32,
    pub tags: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryScope { Project, User, Agent, Org }

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryCategory { Convention, Decision, Constraint, Preference, Fact, Gotcha }

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub root_path: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub stack: Vec<String>,
    pub active_model_profile_id: Option<String>,
    pub active_connection_profile_id: Option<String>,
    pub memory_budget_tokens: i64,
    pub context_yaml_path: String,
    pub protected_paths: Vec<String>,
    pub agentloft_ignore: Vec<String>,
    pub session_count: i32,
    pub total_cost_usd: f64,
    pub metadata: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelProfile {
    pub id: String, pub name: String, pub provider: String,
    pub model_id: String, pub context_window: i64, pub max_output_tokens: i64,
    pub pricing: ModelPricing, pub supports_vision: bool,
    pub supports_streaming: bool, pub supports_tools: bool,
    pub capabilities: Vec<String>, pub is_default: bool,
    pub metadata: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelPricing {
    pub prompt_per_1k: f64, pub completion_per_1k: f64,
    pub cache_read_per_1k: Option<f64>, pub cache_write_per_1k: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConnectionProfile {
    pub id: String, pub name: String, pub models: ConnectionModels,
    pub auto_fallback: bool, pub fallback_notify: bool,
    pub quality_warning: bool, pub restore_primary: bool,
    pub retry_queue_max: i32, pub rate_limit_detection: RateLimitDetection,
    pub created_at: DateTime<Utc>, pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConnectionModels {
    pub primary: String, pub secondary: Option<String>,
    pub tertiary: Option<String>, pub fallback: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RateLimitDetection {
    pub claude: bool, pub codex: bool, pub antigravity: bool,
}