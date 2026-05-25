use tauri::State;
use std::sync::Arc;
use crate::AppState;
use serde_json::Value;

#[tauri::command]
pub async fn fetch_registry(_state: State<'_, Arc<AppState>>) -> Result<Value, String> {
    let registry_path = std::env::current_dir()
        .map_err(|e| e.to_string())?
        .join("marketplace")
        .join("registry.json");

    let content = std::fs::read_to_string(&registry_path)
        .unwrap_or_else(|_| r#"{"version":"0","items":[]}"#.into());

    serde_json::from_str::<Value>(&content)
        .map_err(|e| format!("Failed to parse registry: {}", e))
}

#[tauri::command]
pub async fn install_item(
    state: State<'_, Arc<AppState>>,
    item_id: String,
) -> Result<(), String> {
    let registry = fetch_registry(state.clone()).await?;
    let items = registry.get("items").and_then(|i| i.as_array())
        .ok_or("Invalid registry format")?;

    let item = items.iter()
        .find(|i| i.get("id").and_then(|id| id.as_str()) == Some(&item_id))
        .ok_or(format!("Item '{}' not found", item_id))?;

    let item_type = item.get("type").and_then(|t| t.as_str()).unwrap_or("unknown");
    let name = item.get("name").and_then(|n| n.as_str()).unwrap_or("unknown");
    let version = item.get("version").and_then(|v| v.as_str()).unwrap_or("0.0.0");

    // Store in SQLite as installed item
    sqlx::query(
        "INSERT OR REPLACE INTO marketplace_items (id, type, name, version, author, description, source_url, license, verified_publisher, price_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(&item_id)
    .bind(item_type)
    .bind(name)
    .bind(version)
    .bind(item.get("author").and_then(|a| a.as_str()).unwrap_or(""))
    .bind(item.get("description").and_then(|d| d.as_str()).unwrap_or(""))
    .bind(item.get("source_url").and_then(|u| u.as_str()).unwrap_or(""))
    .bind(item.get("license").and_then(|l| l.as_str()).unwrap_or(""))
    .bind(item.get("verified_publisher").and_then(|v| v.as_bool()).unwrap_or(false) as i32)
    .bind(item.get("price_usd").and_then(|p| p.as_f64()).unwrap_or(0.0))
    .execute(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn uninstall_item(
    state: State<'_, Arc<AppState>>,
    item_id: String,
) -> Result<(), String> {
    sqlx::query("DELETE FROM marketplace_items WHERE id = ?")
        .bind(&item_id)
        .execute(&state.db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn list_installed(
    state: State<'_, Arc<AppState>>,
) -> Result<Vec<Value>, String> {
    let rows = sqlx::query_as::<_, (String, String, String, String, String, String, i32, f64)>(
        "SELECT id, type, name, version, description, source_url, verified_publisher, price_usd FROM marketplace_items"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(rows.into_iter().map(|(id, t, name, ver, desc, url, verified, price)| {
        serde_json::json!({
            "id": id, "type": t, "name": name, "version": ver,
            "description": desc, "source_url": url,
            "verified_publisher": verified != 0, "price_usd": price,
        })
    }).collect())
}