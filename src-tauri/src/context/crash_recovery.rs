use std::path::PathBuf;
use std::fs;

pub struct CrashRecovery;

impl CrashRecovery {
    /// Autosave session state every 5 seconds.
    pub fn autosave(session_id: &str, state: &serde_json::Value, session_dir: &PathBuf) -> Result<(), String> {
        let autosave_dir = session_dir.join(session_id);
        fs::create_dir_all(&autosave_dir).map_err(|e| e.to_string())?;
        let autosave_path = autosave_dir.join("autosave.json");
        let json = serde_json::to_string(state).map_err(|e| e.to_string())?;
        fs::write(&autosave_path, json).map_err(|e| e.to_string())?;
        Ok(())
    }

    /// Write shutdown_complete marker on clean exit.
    pub fn mark_clean_shutdown(session_id: &str, session_dir: &PathBuf) {
        let marker = session_dir.join(session_id).join("shutdown_complete");
        fs::write(marker, chrono::Utc::now().to_rfc3339()).ok();
    }

    /// Check if a session crashed (missing shutdown_complete marker).
    pub fn detect_crash(session_id: &str, session_dir: &PathBuf) -> bool {
        let autosave = session_dir.join(session_id).join("autosave.json");
        let marker = session_dir.join(session_id).join("shutdown_complete");
        autosave.exists() && !marker.exists()
    }

    /// Try to recover a crashed session from autosave.
    pub fn recover_session(session_id: &str, session_dir: &PathBuf) -> Result<serde_json::Value, String> {
        let autosave_path = session_dir.join(session_id).join("autosave.json");
        let content = fs::read_to_string(&autosave_path).map_err(|e| e.to_string())?;
        serde_json::from_str(&content).map_err(|e| e.to_string())
    }
}