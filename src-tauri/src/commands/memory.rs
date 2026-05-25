use tauri::State;
use std::sync::Arc;
use crate::AppState;

#[tauri::command]
pub async fn list_memories(state: State<'_, Arc<AppState>>, scope: Option<String>) -> Result<Vec<serde_json::Value>, String> {
    Ok(vec![])
}

#[tauri::command]
pub async fn create_memory(state: State<'_, Arc<AppState>>, memory: serde_json::Value) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub async fn delete_memory(state: State<'_, Arc<AppState>>, id: String) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub async fn extract_memories(state: State<'_, Arc<AppState>>, session_id: String) -> Result<Vec<serde_json::Value>, String> {
    Ok(vec![])
}