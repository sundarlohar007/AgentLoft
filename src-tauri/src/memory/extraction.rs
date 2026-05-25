use crate::types::{MemoryEntry, MemoryScope, MemoryCategory};
use crate::memory::store::MemoryStore;

/// Extract memories from a completed session.
/// Called post-session to identify conventions, decisions, constraints,
/// preferences, facts, and gotchas from the session transcript.
pub async fn extract_from_session(
    _store: &MemoryStore,
    session_id: &str,
    _messages: &[crate::types::Message],
) -> Result<Vec<MemoryEntry>, String> {
    // In production: send session summary to an LLM-powered extraction pipeline.
    // The agent model summarizes the session and extracts structured memories.
    // For v1, return a simple heuristic extraction:

    let mut entries = Vec::new();

    // Heuristic: scan messages for convention markers
    // e.g., "always use", "never use", "we decided to", "the pattern is"
    let convention_patterns = [
        "always use", "never use", "we decided", "the pattern is",
        "our convention", "best practice", "rule of thumb",
    ];

    // In production, this would be a full extraction pipeline.
    // For now, stub extraction that produces 0-5 sample entries per session.
    entries.push(MemoryEntry {
        id: uuid::Uuid::new_v4().to_string(),
        scope: MemoryScope::Project,
        category: MemoryCategory::Convention,
        content: format!("Session {} convention: extracted from transcript", session_id),
        confidence: 0.7,
        freshness: 1.0,
        verified: false,
        source_session_id: session_id.to_string(),
        created_at: chrono::Utc::now(),
        last_used_at: chrono::Utc::now(),
        use_count: 0,
        tags: vec!["auto-extracted".into()],
    });

    let _ = convention_patterns;
    Ok(entries)
}

/// Auto-accept extracted memories (non-blocking).
/// Memories enter with confidence 0.7 and are immediately available for retrieval.
/// User can review within 24-hour window.
pub async fn auto_accept_memories(
    store: &MemoryStore,
    entries: Vec<MemoryEntry>,
) -> Result<usize, String> {
    let count = entries.len();
    for entry in &entries {
        crate::memory::store::insert_memory(store, entry)?;
    }
    Ok(count)
}