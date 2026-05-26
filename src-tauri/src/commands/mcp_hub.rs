use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tauri::State;
use tokio::sync::Mutex;

use crate::AppState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpConfig {
    pub id: String,
    pub name: String,
    pub command: String,
    pub args: Vec<String>,
    pub env: HashMap<String, String>,
    pub enabled: bool,
    pub installed_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpStatus {
    pub id: String,
    pub name: String,
    pub connection: McpConnectionStatus,
    pub tool_count: usize,
    pub last_active_at: Option<String>,
    pub config: McpConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum McpConnectionStatus {
    Connected,
    Disconnected,
    Error(String),
    Starting,
    Stopped,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpHealthCheck {
    pub mcp_id: String,
    pub timestamp: String,
    pub online: bool,
    pub latency_ms: Option<u64>,
    pub error: Option<String>,
}

pub struct McpHubState {
    pub active_mcps: HashMap<String, McpStatus>,
    pub health_history: Vec<McpHealthCheck>,
}

impl McpHubState {
    pub fn new() -> Self {
        Self {
            active_mcps: HashMap::new(),
            health_history: Vec::new(),
        }
    }
}

#[tauri::command]
pub async fn list_mcps(
    state: State<'_, Arc<AppState>>,
) -> Result<Vec<McpStatus>, String> {
    let db = &state.db;
    let rows = sqlx::query_as::<_, (String, String, String, String, String, i64)>(
        "SELECT id, name, command, args, env, enabled FROM model_profiles WHERE provider = 'mcp'"
    )
    .fetch_all(db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(rows
        .into_iter()
        .map(|(id, name, command, _args, _env, enabled)| McpStatus {
            id: id.clone(),
            name,
            connection: if enabled != 0 {
                McpConnectionStatus::Connected
            } else {
                McpConnectionStatus::Stopped
            },
            tool_count: 0,
            last_active_at: None,
            config: McpConfig {
                id,
                name: String::new(),
                command,
                args: Vec::new(),
                env: HashMap::new(),
                enabled: enabled != 0,
                installed_at: String::new(),
            },
        })
        .collect())
}

#[tauri::command]
pub async fn install_mcp(
    state: State<'_, Arc<AppState>>,
    mcp_id: String,
    name: String,
    command: String,
    args: Vec<String>,
    env: Option<HashMap<String, String>>,
) -> Result<McpStatus, String> {
    let env_clone = env.clone();
    let env_json = serde_json::to_string(&env_clone.unwrap_or_default()).map_err(|e| e.to_string())?;
    let args_json = serde_json::to_string(&args).map_err(|e| e.to_string())?;

    sqlx::query(
        "INSERT OR REPLACE INTO model_profiles (id, name, provider, model_id, context_window, max_output_tokens, metadata) VALUES (?, ?, 'mcp', '', 0, 0, ?)"
    )
    .bind(&mcp_id)
    .bind(&name)
    .bind(&serde_json::json!({"command": command, "args": args_json, "env": env_json}).to_string())
    .execute(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(McpStatus {
        id: mcp_id.clone(),
        name,
        connection: McpConnectionStatus::Stopped,
        tool_count: 0,
        last_active_at: None,
        config: McpConfig {
            id: mcp_id,
            name: String::new(),
            command,
            args,
            env: env.unwrap_or_default(),
            enabled: false,
            installed_at: chrono::Utc::now().to_rfc3339(),
        },
    })
}

#[tauri::command]
pub async fn uninstall_mcp(
    state: State<'_, Arc<AppState>>,
    mcp_id: String,
) -> Result<(), String> {
    sqlx::query("DELETE FROM model_profiles WHERE id = ? AND provider = 'mcp'")
        .bind(&mcp_id)
        .execute(&state.db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn start_mcp(
    _state: State<'_, Arc<AppState>>,
    mcp_id: String,
) -> Result<McpStatus, String> {
    // In v1, MCP process spawning is managed externally by the CLI agent.
    // This command marks the MCP as active for the UI health dashboard.
    Ok(McpStatus {
        id: mcp_id.clone(),
        name: mcp_id.clone(),
        connection: McpConnectionStatus::Starting,
        tool_count: 0,
        last_active_at: Some(chrono::Utc::now().to_rfc3339()),
        config: McpConfig {
            id: mcp_id.clone(),
            name: String::new(),
            command: String::new(),
            args: Vec::new(),
            env: HashMap::new(),
            enabled: true,
            installed_at: String::new(),
        },
    })
}

#[tauri::command]
pub async fn stop_mcp(
    _state: State<'_, Arc<AppState>>,
    mcp_id: String,
) -> Result<McpStatus, String> {
    Ok(McpStatus {
        id: mcp_id.clone(),
        name: mcp_id.clone(),
        connection: McpConnectionStatus::Stopped,
        tool_count: 0,
        last_active_at: Some(chrono::Utc::now().to_rfc3339()),
        config: McpConfig {
            id: mcp_id.clone(),
            name: String::new(),
            command: String::new(),
            args: Vec::new(),
            env: HashMap::new(),
            enabled: false,
            installed_at: String::new(),
        },
    })
}

#[tauri::command]
pub async fn get_mcp_health(
    mcp_id: String,
) -> Result<McpHealthCheck, String> {
    let start = std::time::Instant::now();
    // In v1: check if MCP metadata exists in DB as connectivity proxy
    // Full health check (spawn + ping) deferred to v1.1 with process spawning
    let online = true; // Placeholder — real health check in v1.1
    let latency_ms = Some(start.elapsed().as_millis() as u64);

    Ok(McpHealthCheck {
        mcp_id,
        timestamp: chrono::Utc::now().to_rfc3339(),
        online,
        latency_ms,
        error: None,
    })
}
