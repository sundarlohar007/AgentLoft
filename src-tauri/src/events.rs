use tauri::Emitter;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct EventData<T: Serialize> {
    pub session_id: String,
    #[serde(flatten)]
    pub data: T,
}

pub fn emit_thinking(app: &tauri::AppHandle, session_id: &str, content: &str, is_final: bool) {
    let _ = app.emit("agent::thinking", serde_json::json!({
        "session_id": session_id, "content": content, "is_final": is_final
    }));
}

pub fn emit_text(app: &tauri::AppHandle, session_id: &str, content: &str, is_final: bool) {
    let _ = app.emit("agent::text", serde_json::json!({
        "session_id": session_id, "content": content, "is_final": is_final
    }));
}

pub fn emit_tool_call(app: &tauri::AppHandle, session_id: &str, id: &str, name: &str, input: &serde_json::Value, start_ms: u64) {
    let _ = app.emit("agent::tool_call", serde_json::json!({
        "session_id": session_id, "id": id, "name": name, "input": input, "start_ms": start_ms
    }));
}

pub fn emit_tool_result(app: &tauri::AppHandle, session_id: &str, id: &str, output: &serde_json::Value, error: Option<&str>, duration_ms: u64) {
    let _ = app.emit("agent::tool_result", serde_json::json!({
        "session_id": session_id, "id": id, "output": output, "error": error, "duration_ms": duration_ms
    }));
}

pub fn emit_diff(app: &tauri::AppHandle, session_id: &str, path: &str, before: &str, after: &str) {
    let _ = app.emit("agent::diff", serde_json::json!({
        "session_id": session_id, "path": path, "before": before, "after": after, "hunks": []
    }));
}

pub fn emit_token_info(app: &tauri::AppHandle, session_id: &str, prompt_tokens: i64, completion_tokens: i64, cache_read: i64, cache_write: i64, cost_usd: f64) {
    let _ = app.emit("agent::token_info", serde_json::json!({
        "session_id": session_id, "prompt_tokens": prompt_tokens, "completion_tokens": completion_tokens,
        "cache_read": cache_read, "cache_write": cache_write, "cost_usd": cost_usd
    }));
}

pub fn emit_context_stats(app: &tauri::AppHandle, session_id: &str, used: i64, limit: i64, health_score: i32, warnings: &[String]) {
    let _ = app.emit("agent::context_stats", serde_json::json!({
        "session_id": session_id, "used": used, "limit": limit, "health_score": health_score, "warnings": warnings
    }));
}

pub fn emit_permission_request(app: &tauri::AppHandle, session_id: &str, request: &serde_json::Value) {
    let _ = app.emit("agent::permission_request", serde_json::json!({
        "session_id": session_id, "data": request
    }));
}

pub fn emit_checkpoint(app: &tauri::AppHandle, session_id: &str, checkpoint_id: &str, label: Option<&str>, file_count: u32, timestamp: u64) {
    let _ = app.emit("agent::checkpoint", serde_json::json!({
        "session_id": session_id, "checkpoint_id": checkpoint_id, "label": label, "file_count": file_count, "timestamp": timestamp
    }));
}

pub fn emit_memory_suggestion(app: &tauri::AppHandle, session_id: &str, entries: &serde_json::Value, source: &str) {
    let _ = app.emit("agent::memory_suggestion", serde_json::json!({
        "session_id": session_id, "entries": entries, "source": source
    }));
}

pub fn emit_error(app: &tauri::AppHandle, session_id: &str, code: &str, message: &str, recoverable: bool) {
    let _ = app.emit("agent::error", serde_json::json!({
        "session_id": session_id, "code": code, "message": message, "recoverable": recoverable
    }));
}

pub fn emit_narrative(app: &tauri::AppHandle, session_id: &str, entry: &str, linked_tool_id: Option<&str>, timestamp: u64) {
    let _ = app.emit("agent::narrative", serde_json::json!({
        "session_id": session_id, "entry": entry, "linked_tool_id": linked_tool_id, "timestamp": timestamp
    }));
}

pub fn emit_context_snapshot(app: &tauri::AppHandle, session_id: &str, snapshot: &serde_json::Value, trigger: &str) {
    let _ = app.emit("agent::context_snapshot", serde_json::json!({
        "session_id": session_id, "snapshot": snapshot, "trigger": trigger
    }));
}

pub fn emit_cache_status(app: &tauri::AppHandle, session_id: &str, hit: bool, saved_tokens: i64) {
    let _ = app.emit("agent::cache_status", serde_json::json!({
        "session_id": session_id, "hit": hit, "saved_tokens": saved_tokens
    }));
}