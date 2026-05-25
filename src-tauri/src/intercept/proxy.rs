use crate::intercept::blast_radius::BlastRadiusEngine;
use crate::intercept::permission::PermissionSystem;
use serde_json::Value;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct InterceptProxy {
    blast_radius: BlastRadiusEngine,
    permission_system: PermissionSystem,
    pending_tools: Arc<Mutex<HashMap<String, PendingTool>>>,
}

struct PendingTool {
    pub event: Value,
    pub hold_start: std::time::Instant,
}

impl InterceptProxy {
    pub fn new() -> Self {
        Self {
            blast_radius: BlastRadiusEngine::new(),
            permission_system: PermissionSystem::new(),
            pending_tools: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    /// Intercept a tool_call event before it executes.
    /// Returns Some(modified_event) if the tool should proceed after approval,
    /// or None if the tool is held awaiting permission.
    pub async fn intercept(
        &self,
        session_id: &str,
        tool_name: &str,
        tool_input: &Value,
    ) -> InterceptResult {
        // Classify tool type
        let tool_type = classify_tool(tool_name);

        // Compute blast radius
        let affected_paths = self.blast_radius
            .compute_affected_paths(tool_name, tool_input);
        let blast_score = self.blast_radius
            .compute_blast_score(tool_name, tool_input, &affected_paths);

        // Check permissions
        let perm_check = self.permission_system
            .check_permission(session_id, tool_type, &affected_paths);

        match perm_check {
            PermissionDecision::Allow => InterceptResult::Approved,
            PermissionDecision::Deny(reason) => InterceptResult::Blocked(reason),
            PermissionDecision::Ask => InterceptResult::Pending {
                affected_paths,
                blast_radius_score: blast_score,
                risk_level: classify_risk(blast_score),
            },
        }
    }

    /// Release a held tool after user approval.
    pub async fn approve(&self, _tool_id: &str) {
        // Remove from pending map
    }

    /// Reject a held tool.
    pub async fn reject(&self, _tool_id: &str) {
        // Remove from pending map and emit rejection
    }
}

#[derive(Debug, Clone)]
pub enum InterceptResult {
    Approved,
    Blocked(String),
    Pending {
        affected_paths: Vec<String>,
        blast_radius_score: f64,
        risk_level: RiskLevel,
    },
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum RiskLevel {
    Low,
    Medium,
    High,
    Critical,
}

#[derive(Debug, Clone, Copy)]
pub enum PermissionDecision {
    Allow,
    Deny(String),
    Ask,
}

fn classify_tool(name: &str) -> &str {
    match name {
        "write_file" | "write_to_file" | "replace_in_file" => "write_file",
        "bash" | "execute_command" | "run_command" => "bash",
        "read_file" | "read" | "view" => "read_file",
        "browser" | "web_fetch" | "web_search" => "network",
        _ => "mcp",
    }
}

fn classify_risk(score: f64) -> RiskLevel {
    if score > 0.7 { RiskLevel::Critical }
    else if score > 0.4 { RiskLevel::High }
    else if score > 0.2 { RiskLevel::Medium }
    else { RiskLevel::Low }
}

impl Default for InterceptProxy {
    fn default() -> Self { Self::new() }
}