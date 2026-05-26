use notify::{Event, RecursiveMode, Watcher, Config};
use std::path::Path;
use std::sync::mpsc;
use tauri::Emitter;

/// Start watching a project directory for file changes.
/// Emits file change events to the Tauri frontend.
pub fn watch_project(
    app_handle: tauri::AppHandle,
    project_root: &Path,
) -> Result<(), String> {
    let (tx, rx) = mpsc::channel();

    let mut watcher = notify::recommended_watcher(move |res: Result<Event, notify::Error>| {
        if let Ok(event) = res {
            let _ = tx.send(event);
        }
    }).map_err(|e| format!("Failed to create file watcher: {}", e))?;

    watcher
        .configure(Config::default().with_poll_interval(std::time::Duration::from_secs(1)))
        .map_err(|e| format!("Failed to configure watcher: {}", e))?;

    watcher
        .watch(project_root, RecursiveMode::Recursive)
        .map_err(|e| format!("Failed to watch directory: {}", e))?;

    // Spawn watcher listener
    let root = project_root.to_path_buf();
    tauri::async_runtime::spawn(async move {
        while let Ok(event) = rx.recv() {
            let paths: Vec<String> = event.paths.iter()
                .filter_map(|p| p.strip_prefix(&root).ok())
                .map(|p| p.display().to_string())
                .collect();

            if !paths.is_empty() {
                let _ = app_handle.emit("fs::change", serde_json::json!({
                    "paths": paths,
                    "kind": format!("{:?}", event.kind),
                }));
            }
        }
    });

    Ok(())
}