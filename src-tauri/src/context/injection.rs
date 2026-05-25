use crate::types::MemoryEntry;
use crate::memory::retrieval::{RetrievalEngine, RetrievalResult};

/// Format retrieved memories as a context preamble for session injection.
/// Injects into the first turn of a new session.
pub fn format_memory_preamble(
    results: &[RetrievalResult],
    budget_tokens: usize,
) -> String {
    if results.is_empty() {
        return String::new();
    }

    let mut preamble = String::from("<memory>\n");
    preamble.push_str("The following context was retained from previous sessions:\n\n");

    let mut token_count = 0;
    for (i, result) in results.iter().enumerate() {
        let entry_line = format!(
            "[{}] ({}: {:.0}%) {}\n",
            i + 1,
            format!("{:?}", result.entry.category).to_lowercase(),
            result.entry.confidence * 100.0,
            result.entry.content,
        );
        let tokens = entry_line.split_whitespace().count();
        if token_count + tokens > budget_tokens {
            break;
        }
        token_count += tokens;
        preamble.push_str(&entry_line);
    }

    preamble.push_str("\n</memory>");
    preamble
}

/// Inject memories into a new session context.
/// Called before the first user message when starting a session.
pub fn inject_memories(
    engine: &RetrievalEngine,
    memories: &[MemoryEntry],
    project_context: &str,
    budget_tokens: usize,
) -> String {
    let query = format!("{} {}", project_context, "project conventions patterns preferences");
    let results = engine.retrieve(&query, memories, 10, budget_tokens, None, None);
    format_memory_preamble(&results, budget_tokens)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{MemoryScope, MemoryCategory};

    fn make_entry(content: &str, confidence: f64) -> MemoryEntry {
        MemoryEntry {
            id: uuid::Uuid::new_v4().to_string(),
            scope: MemoryScope::Project,
            category: MemoryCategory::Convention,
            content: content.into(),
            confidence,
            freshness: 1.0,
            verified: false,
            source_session_id: "s1".into(),
            created_at: chrono::Utc::now(),
            last_used_at: chrono::Utc::now(),
            use_count: 0,
            tags: vec![],
        }
    }

    #[test]
    fn test_format_empty_results() {
        let result = format_memory_preamble(&[], 4000);
        assert!(result.is_empty());
    }
}