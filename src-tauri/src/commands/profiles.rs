use tauri::State;
use std::sync::Arc;
use crate::AppState;

#[tauri::command]
pub async fn list_profiles(_state: State<'_, Arc<AppState>>) -> Result<Vec<serde_json::Value>, String> {
    Ok(vec![
        serde_json::json!({"id": "karpathy", "name": "Karpathy Engineer", "description": "Pragmatic, no-frills engineering."}),
        serde_json::json!({"id": "deep-work", "name": "Deep Work", "description": "Focused, distraction-free coding."}),
        serde_json::json!({"id": "code-review", "name": "Code Review", "description": "Thorough review mode."}),
        serde_json::json!({"id": "exploration", "name": "Exploration", "description": "Breadth-first codebase understanding."}),
        serde_json::json!({"id": "safe-mode", "name": "Safe Mode", "description": "Read-only. No writes, no bash."}),
        serde_json::json!({"id": "overnight", "name": "Overnight Run", "description": "Autonomous batch mode."}),
    ])
}

#[tauri::command]
pub async fn get_profile(_state: State<'_, Arc<AppState>>, id: String) -> Result<serde_json::Value, String> {
    let profiles = serde_json::json!({
        "karpathy": { "system_prompt": "You are a pragmatic engineer. Write correct, minimal code. No over-engineering." },
        "deep-work": { "system_prompt": "Focus on the task. No side tangents. Complete the assigned work efficiently." },
    });
    Ok(profiles.get(&id).cloned().unwrap_or(serde_json::json!({"error": "not found"})))
}