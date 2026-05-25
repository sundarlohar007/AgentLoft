use tauri::State;
use std::sync::Arc;
use crate::AppState;

#[tauri::command]
pub async fn handle_user_message(state: State<'_, Arc<AppState>>, session_id: String, content: String) -> Result<(), String> {
    crate::commands::session::send_message(state, session_id, content).await
}

#[tauri::command]
pub async fn handle_slash_command(_state: State<'_, Arc<AppState>>, session_id: String, command: String, args: Option<String>) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub async fn handle_cancel(state: State<'_, Arc<AppState>>, session_id: String, reason: Option<String>) -> Result<(), String> {
    crate::commands::session::cancel_session(state, session_id, reason).await
}

#[tauri::command]
pub async fn handle_raw_file(_state: State<'_, Arc<AppState>>, session_id: String, path: String, no_line_numbers: bool) -> Result<(), String> {
    Ok(())
}