use tauri::State;
use std::sync::Arc;
use crate::AppState;

// ── Session CRUD ──────────────────────────────────

#[tauri::command]
pub async fn create_session(
    state: State<'_, Arc<AppState>>,
    provider: String,
    project_id: String,
) -> Result<serde_json::Value, String> {
    let session_id = uuid::Uuid::new_v4().to_string();
    sqlx::query(
        "INSERT INTO sessions (id, project_id, model_profile_id, status, title) VALUES (?, ?, ?, 'active', 'New Session')"
    )
    .bind(&session_id).bind(&project_id).bind(&provider)
    .execute(&state.db).await.map_err(|e| e.to_string())?;
    Ok(serde_json::json!({"session_id": session_id}))
}

#[tauri::command]
pub async fn send_message(
    state: State<'_, Arc<AppState>>,
    session_id: String,
    content: String,
) -> Result<(), String> {
    let msg_id = uuid::Uuid::new_v4().to_string();
    sqlx::query(
        "INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, 'user', ?)"
    )
    .bind(&msg_id).bind(&session_id).bind(&content)
    .execute(&state.db).await.map_err(|e| e.to_string())?;

    // Update session title from first message
    let title: String = content.chars().take(60).collect();
    sqlx::query("UPDATE sessions SET title = ?, updated_at = datetime('now') WHERE id = ? AND title = 'New Session'")
        .bind(&title).bind(&session_id)
        .execute(&state.db).await.ok();

    // Insert into FTS index
    sqlx::query("INSERT INTO messages_fts (content) VALUES (?)")
        .bind(&content)
        .execute(&state.db).await.ok();

    Ok(())
}

#[tauri::command]
pub async fn cancel_session(
    state: State<'_, Arc<AppState>>,
    session_id: String,
    reason: Option<String>,
) -> Result<(), String> {
    sqlx::query(
        "UPDATE sessions SET status = 'completed', updated_at = datetime('now') WHERE id = ?"
    )
    .bind(&session_id).execute(&state.db).await.map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn list_sessions(
    state: State<'_, Arc<AppState>>,
    project_id: String,
) -> Result<Vec<serde_json::Value>, String> {
    let rows = sqlx::query_as::<_, (String, String, String, String, f64, i64, i64)>(
        "SELECT id, title, status, created_at, total_cost_usd, total_tokens_in, total_tokens_out FROM sessions WHERE project_id = ? ORDER BY created_at DESC LIMIT 50"
    )
    .bind(&project_id).fetch_all(&state.db).await.map_err(|e| e.to_string())?;
    Ok(rows.into_iter().map(|(id, title, status, created, cost, tin, tout)| {
        serde_json::json!({
            "id": id, "title": title, "status": status,
            "created_at": created, "total_cost_usd": cost,
            "total_tokens_in": tin, "total_tokens_out": tout,
        })
    }).collect())
}

#[tauri::command]
pub async fn get_session(
    state: State<'_, Arc<AppState>>,
    session_id: String,
) -> Result<serde_json::Value, String> {
    let row = sqlx::query_as::<_, (String, String, String, String, f64, i64, i64, f64)>(
        "SELECT id, project_id, title, status, total_cost_usd, total_tokens_in, total_tokens_out, cache_hit_rate FROM sessions WHERE id = ?"
    )
    .bind(&session_id).fetch_one(&state.db).await.map_err(|e| e.to_string())?;

    let messages = sqlx::query_as::<_, (String, String, String, String)>(
        "SELECT id, role, content, created_at FROM messages WHERE session_id = ? ORDER BY created_at ASC"
    )
    .bind(&session_id).fetch_all(&state.db).await.unwrap_or_default();

    Ok(serde_json::json!({
        "id": row.0, "project_id": row.1, "title": row.2, "status": row.3,
        "total_cost_usd": row.4, "total_tokens_in": row.5, "total_tokens_out": row.6,
        "cache_hit_rate": row.7,
        "messages": messages.into_iter().map(|(id, role, content, created)| {
            serde_json::json!({"id": id, "role": role, "content": content, "created_at": created})
        }).collect::<Vec<_>>(),
    }))
}

// T085: Session recording — record events to SQLite
#[tauri::command]
pub async fn record_session_event(
    state: State<'_, Arc<AppState>>,
    session_id: String,
    event_type: String,
    event_data: serde_json::Value,
) -> Result<(), String> {
    match event_type.as_str() {
        "message" => {
            let msg_id = uuid::Uuid::new_v4().to_string();
            let role = event_data.get("role").and_then(|r| r.as_str()).unwrap_or("assistant");
            let content = event_data.get("content").and_then(|c| c.as_str()).unwrap_or("");
            sqlx::query("INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)")
                .bind(&msg_id).bind(&session_id).bind(role).bind(content)
                .execute(&state.db).await.map_err(|e| e.to_string())?;
        }
        "tool_call" => {
            let tc_id = event_data.get("id").and_then(|i| i.as_str()).unwrap_or("");
            let name = event_data.get("name").and_then(|n| n.as_str()).unwrap_or("");
            let input = event_data.get("input").map(|v| v.to_string()).unwrap_or_default();
            sqlx::query(
                "INSERT OR REPLACE INTO tool_calls (id, session_id, message_id, turn, type, input, status) VALUES (?, ?, '', 0, ?, ?, 'completed')"
            )
            .bind(tc_id).bind(&session_id).bind(name).bind(&input)
            .execute(&state.db).await.map_err(|e| e.to_string())?;
        }
        "token_info" => {
            let cost = event_data.get("cost_usd").and_then(|c| c.as_f64()).unwrap_or(0.0);
            let prompt = event_data.get("prompt_tokens").and_then(|t| t.as_i64()).unwrap_or(0);
            let completion = event_data.get("completion_tokens").and_then(|t| t.as_i64()).unwrap_or(0);
            sqlx::query(
                "UPDATE sessions SET total_cost_usd = total_cost_usd + ?, total_tokens_in = total_tokens_in + ?, total_tokens_out = total_tokens_out + ?, updated_at = datetime('now') WHERE id = ?"
            )
            .bind(cost).bind(prompt).bind(completion).bind(&session_id)
            .execute(&state.db).await.map_err(|e| e.to_string())?;
        }
        _ => {}
    }
    Ok(())
}

// T086: Full-text session search
#[tauri::command]
pub async fn search_sessions(
    state: State<'_, Arc<AppState>>,
    query: String,
    project_id: Option<String>,
) -> Result<Vec<serde_json::Value>, String> {
    let rows = sqlx::query_as::<_, (String, String, String, f64, String)>(
        r#"SELECT DISTINCT s.id, s.title, s.status, s.total_cost_usd, s.created_at
           FROM sessions s
           JOIN messages m ON m.session_id = s.id
           JOIN messages_fts fts ON fts.content_rowid = m.rowid
           WHERE messages_fts MATCH ?
           ORDER BY s.created_at DESC LIMIT 20"#
    )
    .bind(&query)
    .fetch_all(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(rows.into_iter().map(|(id, title, status, cost, created)| {
        serde_json::json!({
            "id": id, "title": title, "status": status,
            "total_cost_usd": cost, "created_at": created,
        })
    }).collect())
}

// T087: Session export (JSON + Markdown)
#[tauri::command]
pub async fn export_session(
    state: State<'_, Arc<AppState>>,
    session_id: String,
    format: String,
) -> Result<String, String> {
    let session = get_session(state.clone(), session_id.clone()).await?;

    match format.as_str() {
        "json" => {
            serde_json::to_string_pretty(&session).map_err(|e| e.to_string())
        }
        "markdown" => {
            let mut md = String::new();
            md.push_str(&format!("# {}\n\n", session.get("title").and_then(|t| t.as_str()).unwrap_or("Session")));
            md.push_str(&format!("**Date**: {}\n", session.get("created_at").and_then(|d| d.as_str()).unwrap_or("")));
            md.push_str(&format!("**Cost**: ${}\n\n", session.get("total_cost_usd").and_then(|c| c.as_f64()).unwrap_or(0.0)));

            if let Some(messages) = session.get("messages").and_then(|m| m.as_array()) {
                for msg in messages {
                    let role = msg.get("role").and_then(|r| r.as_str()).unwrap_or("");
                    let content = msg.get("content").and_then(|c| c.as_str()).unwrap_or("");
                    md.push_str(&format!("### {}\n\n{}\n\n---\n\n", role, content));
                }
            }

            Ok(md)
        }
        _ => Err(format!("Unsupported format: {}", format)),
    }
}