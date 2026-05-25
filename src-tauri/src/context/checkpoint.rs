use std::path::{Path, PathBuf};
use crate::types::{Checkpoint, CheckpointType, FileSnapshot, ContextSnapshot};
use sha2::{Sha256, Digest};
use std::fs;

pub struct CheckpointManager {
    snapshots_dir: PathBuf,
}

impl CheckpointManager {
    pub fn new(project_root: &Path) -> Self {
        let dir = project_root.join(".agentloft").join("snapshots");
        Self { snapshots_dir: dir }
    }

    /// Create an auto-checkpoint before an agent write batch.
    /// Captures SHA256 hashes and content of all files about to be modified.
    pub fn create_checkpoint(
        &self,
        session_id: &str,
        turn: i32,
        checkpoint_type: CheckpointType,
        label: Option<&str>,
        affected_files: &[String],
        project_root: &Path,
    ) -> Result<Checkpoint, String> {
        let id = uuid::Uuid::new_v4().to_string();
        let checkpoint_dir = self.snapshots_dir.join(session_id).join(&id);
        fs::create_dir_all(&checkpoint_dir)
            .map_err(|e| format!("Failed to create checkpoint dir: {}", e))?;

        let mut file_snapshots = Vec::new();

        for file_path in affected_files {
            let abs_path = project_root.join(file_path);
            if !abs_path.exists() { continue; }

            let content = fs::read_to_string(&abs_path).unwrap_or_default();
            let hash = format!("{:x}", Sha256::digest(content.as_bytes()));
            let size = content.len() as u64;

            // Store snapshot in checkpoint directory
            let snap_path = checkpoint_dir.join(file_path);
            if let Some(parent) = snap_path.parent() {
                fs::create_dir_all(parent).ok();
            }
            fs::write(&snap_path, &content).ok();

            file_snapshots.push(FileSnapshot {
                path: file_path.clone(),
                hash,
                content,
                size_bytes: size,
            });
        }

        Ok(Checkpoint {
            id,
            session_id: session_id.to_string(),
            turn,
            created_at: chrono::Utc::now(),
            label: label.map(|s| s.to_string()),
            r#type: checkpoint_type,
            file_snapshot: file_snapshots,
            context_snapshot: ContextSnapshot {
                id: uuid::Uuid::new_v4().to_string(),
                session_id: session_id.to_string(),
                created_at: chrono::Utc::now(),
                trigger: crate::types::SnapshotTrigger::Checkpoint,
                completed_tasks: vec![],
                constraints: vec![],
                open_items: vec![],
                file_hashes: std::collections::HashMap::new(),
                token_usage: crate::types::TokenUsage { prompt: 0, completion: 0, cache_read: 0, cache_write: 0 },
                health_score: 100,
                warnings: vec![],
            },
            cost_at_checkpoint: 0.0,
        })
    }

    /// List all checkpoints for a session.
    pub fn list_checkpoints(&self, session_id: &str) -> Result<Vec<Checkpoint>, String> {
        let dir = self.snapshots_dir.join(session_id);
        if !dir.exists() { return Ok(vec![]); }

        let mut checkpoints = Vec::new();
        for entry in fs::read_dir(&dir).map_err(|e| e.to_string())? {
            let entry = entry.map_err(|e| e.to_string())?;
            if entry.file_type().map(|t| t.is_dir()).unwrap_or(false) {
                // Read checkpoint metadata from the directory
                let id = entry.file_name().to_string_lossy().to_string();
                checkpoints.push(Checkpoint {
                    id,
                    session_id: session_id.to_string(),
                    turn: 0,
                    created_at: chrono::Utc::now(),
                    label: None,
                    r#type: CheckpointType::Auto,
                    file_snapshot: vec![],
                    context_snapshot: ContextSnapshot {
                        id: String::new(),
                        session_id: session_id.to_string(),
                        created_at: chrono::Utc::now(),
                        trigger: crate::types::SnapshotTrigger::Checkpoint,
                        completed_tasks: vec![],
                        constraints: vec![],
                        open_items: vec![],
                        file_hashes: std::collections::HashMap::new(),
                        token_usage: crate::types::TokenUsage { prompt: 0, completion: 0, cache_read: 0, cache_write: 0 },
                        health_score: 100,
                        warnings: vec![],
                    },
                    cost_at_checkpoint: 0.0,
                });
            }
        }
        Ok(checkpoints)
    }
}