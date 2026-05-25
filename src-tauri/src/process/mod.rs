pub mod claude_code;
pub mod codex;
pub mod antigravity;
pub mod generic;
pub mod parser;
pub mod pty_manager;
pub mod output_filter;
pub mod precompact;

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::process::Child;
use tokio::io::{BufReader, AsyncBufReadExt};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CliConfig {
    pub session_id: String,
    pub command: String,
    pub args: Vec<String>,
    pub cwd: String,
    pub env: Vec<(String, String)>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SessionHandle {
    pub session_id: String,
    pub cli_type: CliType,
    pub config: CliConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum CliType {
    ClaudeCode,
    CodexCli,
    AntigravityCli,
    Generic(String),
}

#[async_trait]
pub trait CliProcess: Send + Sync {
    fn cli_type(&self) -> CliType;
    fn default_args(&self) -> Vec<String>;
    async fn spawn(&self, config: &CliConfig) -> Result<Child, String>;
    async fn parse_line(&self, line: &str) -> Option<ProcessEvent>;
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum ProcessEvent {
    #[serde(rename = "thinking")]
    Thinking { content: String, is_final: bool },
    #[serde(rename = "text")]
    Text { content: String, is_final: bool },
    #[serde(rename = "tool_call")]
    ToolCall { id: String, name: String, input: serde_json::Value },
    #[serde(rename = "tool_result")]
    ToolResult { id: String, output: String, error: Option<String>, duration_ms: u64 },
    #[serde(rename = "permission_request")]
    PermissionRequest { id: String, tool_type: String, command: Option<String>, affected_paths: Vec<String> },
    #[serde(rename = "cost_update")]
    CostUpdate { prompt_tokens: i64, completion_tokens: i64, cache_read: i64, cache_write: i64, cost_usd: f64 },
    #[serde(rename = "context_warning")]
    ContextWarning { message: String },
}

pub struct ProcessOrchestrator;

impl ProcessOrchestrator {
    pub fn new() -> Self { Self }

    pub async fn read_output(child: &mut Child) -> Result<Vec<ProcessEvent>, String> {
        let stdout = child.stdout.take().ok_or("No stdout")?;
        let reader = BufReader::new(stdout);
        let mut lines = reader.lines();
        let mut events = Vec::new();

        while let Ok(Some(line)) = lines.next_line().await {
            if let Ok(parsed) = serde_json::from_str::<ProcessEvent>(&line) {
                events.push(parsed);
            }
        }

        Ok(events)
    }
}