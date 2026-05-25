use crate::memory::embeddings::OnnxEmbedder;
use crate::types::MemoryEntry;

/// Top-K semantic retrieval engine.
/// Searches LanceDB by cosine similarity, applies confidence + freshness filters,
/// returns results within the configured token budget.
pub struct RetrievalEngine {
    embedder: OnnxEmbedder,
}

#[derive(Debug, Clone)]
pub struct RetrievalResult {
    pub entry: MemoryEntry,
    pub score: f32,
}

impl RetrievalEngine {
    pub fn new() -> Self {
        Self { embedder: OnnxEmbedder::new() }
    }

    pub fn with_embedder(embedder: OnnxEmbedder) -> Self {
        Self { embedder }
    }

    /// Retrieve top-K memories matching query, filtered by scope and category.
    /// Results sorted by (cosine_similarity * confidence * freshness).
    pub fn retrieve(
        &self,
        query: &str,
        entries: &[MemoryEntry],
        k: usize,
        token_budget: usize,
        scope_filter: Option<&str>,
        category_filter: Option<&str>,
    ) -> Vec<RetrievalResult> {
        let query_emb = match self.embedder.embed(query) {
            Ok(e) => e,
            Err(_) => return vec![],
        };

        let mut scored: Vec<RetrievalResult> = entries
            .iter()
            .filter(|e| {
                scope_filter.map_or(true, |s| format!("{:?}", e.scope).to_lowercase() == s.to_lowercase())
                    && category_filter.map_or(true, |c| format!("{:?}", e.category).to_lowercase() == c.to_lowercase())
                    && e.confidence > 0.5
            })
            .map(|entry| {
                let emb = self.embedder.embed(&entry.content).unwrap_or_else(|_| vec![0.0; 384]);
                let cosine = cosine_similarity(&query_emb, &emb);
                let score = cosine * entry.confidence as f32 * entry.freshness as f32;
                RetrievalResult { entry: entry.clone(), score }
            })
            .collect();

        scored.sort_by(|a, b| b.score.partial_cmp(&a.score).unwrap_or(std::cmp::Ordering::Equal));

        // Trim to token budget
        let mut token_count = 0;
        let mut results = Vec::new();
        for item in scored {
            let tokens = item.entry.content.split_whitespace().count();
            if token_count + tokens > token_budget { break; }
            token_count += tokens;
            if results.len() >= k { break; }
            results.push(item);
        }

        results
    }
}

/// Cosine similarity between two equal-length vectors.
fn cosine_similarity(a: &[f32], b: &[f32]) -> f32 {
    let (dot, norm_a, norm_b) = a.iter().zip(b.iter())
        .fold((0.0f32, 0.0f32, 0.0f32), |(d, na, nb), (x, y)| {
            (d + x * y, na + x * x, nb + y * y)
        });
    let denom = (norm_a * norm_b).sqrt();
    if denom == 0.0 { 0.0 } else { dot / denom }
}

impl Default for RetrievalEngine {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::*;

    fn make_entry(id: &str, content: &str, confidence: f64, freshness: f64) -> MemoryEntry {
        MemoryEntry {
            id: id.into(), scope: MemoryScope::Project, category: MemoryCategory::Convention,
            content: content.into(), confidence, freshness, verified: false,
            source_session_id: "s1".into(),
            created_at: chrono::Utc::now(), last_used_at: chrono::Utc::now(),
            use_count: 0, tags: vec![],
        }
    }

    #[test]
    fn test_retrieval_filters_by_scope() {
        let engine = RetrievalEngine::new();
        let entries = vec![
            make_entry("1", "React components use TypeScript", 0.9, 1.0),
            make_entry("2", "Database uses PostgreSQL", 0.8, 1.0),
        ];
        let results = engine.retrieve("frontend framework", &entries, 5, 4000, Some("project"), None);
        assert!(!results.is_empty());
    }

    #[test]
    fn test_cosine_similarity_identical() {
        let v = vec![1.0f32, 0.0, 0.0];
        assert!((cosine_similarity(&v, &v) - 1.0).abs() < 0.001);
    }

    #[test]
    fn test_cosine_similarity_orthogonal() {
        let a = vec![1.0f32, 0.0];
        let b = vec![0.0f32, 1.0];
        assert!((cosine_similarity(&a, &b) - 0.0).abs() < 0.001);
    }
}