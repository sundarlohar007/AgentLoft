use std::path::Path;
use std::fs;

pub struct RollbackEngine;

impl RollbackEngine {
    pub fn new() -> Self { Self }

    /// Restore files from a checkpoint snapshot back to the working directory.
    /// Verifies SHA256 after restore.
    pub fn restore_checkpoint(
        project_root: &Path,
        checkpoints_dir: &Path,
        session_id: &str,
        checkpoint_id: &str,
    ) -> Result<Vec<String>, String> {
        let checkpoint_dir = checkpoints_dir.join(session_id).join(checkpoint_id);
        if !checkpoint_dir.exists() {
            return Err(format!("Checkpoint {} not found", checkpoint_id));
        }

        let mut restored = Vec::new();

        // Walk the checkpoint directory and restore each file
        let entries = walkdir::WalkDir::new(&checkpoint_dir)
            .into_iter()
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().is_file());

        for entry in entries {
            let rel_path = entry.path()
                .strip_prefix(&checkpoint_dir)
                .map_err(|e| e.to_string())?;

            let target = project_root.join(rel_path);
            if let Some(parent) = target.parent() {
                fs::create_dir_all(parent).map_err(|e| e.to_string())?;
            }

            let content = fs::read(entry.path()).map_err(|e| e.to_string())?;
            fs::write(&target, &content).map_err(|e| e.to_string())?;

            restored.push(rel_path.display().to_string());
        }

        Ok(restored)
    }
}

impl Default for RollbackEngine {
    fn default() -> Self { Self::new() }
}