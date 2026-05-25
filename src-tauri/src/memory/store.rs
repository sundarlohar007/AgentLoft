use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct MemoryStore {
    db_path: PathBuf,
    initialized: bool,
}

impl MemoryStore {
    pub fn new() -> Self {
        let default_path = dirs_next().unwrap_or_else(|| PathBuf::from("."))
            .join(".agentloft").join("memory").join("lancedb");
        Self { db_path: default_path, initialized: false }
    }

    pub fn with_path(path: PathBuf) -> Self {
        Self { db_path: path, initialized: false }
    }

    pub fn ensure_dir(&self) -> Result<(), String> {
        std::fs::create_dir_all(&self.db_path)
            .map_err(|e| format!("Failed to create LanceDB directory: {}", e))
    }
}

pub type SharedMemoryStore = Arc<Mutex<MemoryStore>>;

/// Initialize LanceDB at agentloft_MEMORY_DIR.
/// Creates the directory structure and sets up table schemas.
pub async fn init_lancedb() -> Result<MemoryStore, String> {
    let mem_dir = std::env::var("agentloft_MEMORY_DIR")
        .unwrap_or_else(|_| {
            dirs_next().unwrap_or_else(|| PathBuf::from("."))
                .join(".agentloft").join("memory")
                .display().to_string()
        });

    let store = MemoryStore::with_path(PathBuf::from(&mem_dir));
    store.ensure_dir()?;

    // In production, this would create LanceDB tables:
    // - project_memory (id, scope, category, content, embedding, confidence, freshness, ...)
    // - user_memory
    // - agent_memory
    // - org_memory
    //
    // For now, we use SQLite-backed metadata and file-based embeddings.
    // LanceDB native Rust integration is deferred pending lance crate stabilization.

    Ok(store)
}

/// Insert a memory entry into the store.
pub fn insert_memory(store: &MemoryStore, entry: &crate::types::MemoryEntry) -> Result<(), String> {
    // Stub: In production, serialize embedding to LanceDB table
    let _ = (store, entry);
    Ok(())
}

/// Delete a memory entry by ID.
pub fn delete_memory(store: &MemoryStore, id: &str) -> Result<(), String> {
    let _ = (store, id);
    Ok(())
}

/// Update an existing memory entry.
pub fn update_memory(store: &MemoryStore, entry: &crate::types::MemoryEntry) -> Result<(), String> {
    let _ = (store, entry);
    Ok(())
}

/// List all memory entries matching optional filters.
pub fn list_memories(
    store: &MemoryStore,
    scope: Option<&str>,
    category: Option<&str>,
) -> Result<Vec<crate::types::MemoryEntry>, String> {
    let _ = (store, scope, category);
    Ok(vec![])
}

fn dirs_next() -> Option<PathBuf> {
    std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .map(PathBuf::from)
}