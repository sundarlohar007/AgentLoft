use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use std::sync::Arc;
use tauri::State;

use crate::AppState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginManifest {
    pub id: String,
    pub name: String,
    pub version: String,
    pub author: String,
    pub description: String,
    pub permissions: Vec<PluginPermission>,
    pub entry_point: String,           // Relative path to plugin JS
    pub icon: Option<String>,
    pub homepage: Option<String>,
    pub license: String,
    pub agentloft_version_min: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum PluginPermission {
    SessionRead,       // Can read session messages
    SessionWrite,      // Can inject messages into session
    MemoryRead,        // Can read memory entries
    MemoryWrite,       // Can create memory entries
    FileTreeRead,      // Can read project file tree
    UIInjection,       // Can add UI components
    NetworkOutbound,   // Can make outbound HTTP requests (v1.1+)
    ToolCallHook,      // Can hook into tool call lifecycle
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InstalledPlugin {
    pub manifest: PluginManifest,
    pub installed_at: String,
    pub enabled: bool,
    pub install_path: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginValidationResult {
    pub valid: bool,
    pub errors: Vec<String>,
    pub warnings: Vec<String>,
}

/// Validate a plugin manifest against AgentLoft requirements
fn validate_manifest(manifest: &PluginManifest) -> PluginValidationResult {
    let mut errors = Vec::new();
    let mut warnings = Vec::new();

    if manifest.id.is_empty() {
        errors.push("Plugin ID is required".into());
    }
    if manifest.name.is_empty() {
        errors.push("Plugin name is required".into());
    }
    if manifest.version.is_empty() {
        errors.push("Plugin version is required".into());
    }
    if manifest.entry_point.is_empty() {
        errors.push("Plugin entry_point is required".into());
    }

    // Validate version format (semver)
    if !manifest.version.is_empty()
        && manifest.version.split('.').count() != 3
    {
        errors.push(format!(
            "Version '{}' is not valid semver (expected MAJOR.MINOR.PATCH)",
            manifest.version
        ));
    }

    // Warnings
    if manifest.permissions.contains(&PluginPermission::NetworkOutbound) {
        warnings.push(
            "Plugin requests network access — this will be sandboxed in Web Worker in v1.1"
                .into(),
        );
    }
    if manifest.permissions.contains(&PluginPermission::UIInjection) {
        warnings.push(
            "Plugin requests UI injection — injected components run in sandboxed iframe"
                .into(),
        );
    }

    PluginValidationResult {
        valid: errors.is_empty(),
        errors,
        warnings,
    }
}

#[tauri::command]
pub async fn list_plugins(
    state: State<'_, Arc<AppState>>,
) -> Result<Vec<InstalledPlugin>, String> {
    let rows = sqlx::query_as::<_, (String, String, i64)>(
        "SELECT id, value, 1 FROM settings WHERE key LIKE 'plugin.%' AND scope = 'global'"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(rows
        .into_iter()
        .filter_map(|(key, value, _)| {
            serde_json::from_str::<InstalledPlugin>(&value).ok().map(|p| {
                let mut plugin = p;
                plugin.manifest.id = key.strip_prefix("plugin.").unwrap_or(&key).to_string();
                plugin
            })
        })
        .collect())
}

#[tauri::command]
pub async fn install_plugin(
    state: State<'_, Arc<AppState>>,
    manifest_json: Value,
) -> Result<PluginValidationResult, String> {
    let manifest: PluginManifest =
        serde_json::from_value(manifest_json).map_err(|e| format!("Invalid manifest: {}", e))?;

    let validation = validate_manifest(&manifest);

    if !validation.valid {
        return Ok(validation);
    }

    let plugin = InstalledPlugin {
        install_path: format!("~/.agentloft/plugins/{}", manifest.id),
        installed_at: chrono::Utc::now().to_rfc3339(),
        enabled: false, // Disabled until user reviews permissions
        manifest,
    };

    let key = format!("plugin.{}", plugin.manifest.id);
    let value = serde_json::to_string(&plugin).map_err(|e| e.to_string())?;

    sqlx::query(
        "INSERT OR REPLACE INTO settings (key, value, scope, updated_at) VALUES (?, ?, 'global', datetime('now'))"
    )
    .bind(&key)
    .bind(&value)
    .execute(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(validation)
}

#[tauri::command]
pub async fn uninstall_plugin(
    state: State<'_, Arc<AppState>>,
    plugin_id: String,
) -> Result<(), String> {
    let key = format!("plugin.{}", plugin_id);
    sqlx::query("DELETE FROM settings WHERE key = ? AND scope = 'global'")
        .bind(&key)
        .execute(&state.db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn toggle_plugin(
    state: State<'_, Arc<AppState>>,
    plugin_id: String,
    enabled: bool,
) -> Result<(), String> {
    let key = format!("plugin.{}", plugin_id);
    let row = sqlx::query_as::<_, (String,)>(
        "SELECT value FROM settings WHERE key = ? AND scope = 'global'"
    )
    .bind(&key)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    if let Some((value,)) = row {
        if let Ok(mut plugin) = serde_json::from_str::<InstalledPlugin>(&value) {
            plugin.enabled = enabled;
            let new_value = serde_json::to_string(&plugin).map_err(|e| e.to_string())?;
            sqlx::query(
                "UPDATE settings SET value = ?, updated_at = datetime('now') WHERE key = ? AND scope = 'global'"
            )
            .bind(&new_value)
            .bind(&key)
            .execute(&state.db)
            .await
            .map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}
