// AgentLoft v1 — Tauri 2 App Entry Point

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod context;
mod db;
mod events;
mod intercept;
mod memory;
mod process;
mod types;

use std::sync::Arc;
use tauri::Manager;
use tokio::sync::Mutex;

struct AppState {
    db: sqlx::SqlitePool,
    active_sessions: Mutex<std::collections::HashMap<String, process::SessionHandle>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            let app_handle = app.handle().clone();

            // Initialize SQLite
            let pool = tauri::async_runtime::block_on(async {
                db::init_db(&app_handle).await.expect("Failed to initialize SQLite")
            });

            // Initialize LanceDB (placeholder — real init deferred to memory module)
            tauri::async_runtime::block_on(async {
                memory::store::init_lancedb().await.ok();
            });

            app.manage(Arc::new(AppState {
                db: pool,
                active_sessions: Mutex::new(std::collections::HashMap::new()),
            }));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::session::create_session,
            commands::session::send_message,
            commands::session::cancel_session,
            commands::session::list_sessions,
            commands::session::get_session,
            commands::process::handle_user_message,
            commands::process::handle_slash_command,
            commands::process::handle_cancel,
            commands::process::handle_raw_file,
            commands::memory::list_memories,
            commands::memory::create_memory,
            commands::memory::delete_memory,
            commands::memory::extract_memories,
            commands::cost::get_session_cost,
            commands::cost::get_project_cost,
            commands::marketplace::fetch_registry,
            commands::marketplace::install_item,
            commands::marketplace::uninstall_item,
            commands::cli_detect::detect_installed_clis,
            commands::profiles::list_profiles,
            commands::profiles::get_profile,
        ])
        .run(tauri::generate_context!())
        .expect("error while running AgentLoft");
}

fn main() {
    run();
}