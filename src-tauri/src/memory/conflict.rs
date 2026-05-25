use crate::types::MemoryEntry;

/// Detect semantically similar memories (cosine similarity > 0.85).
/// Flag conflicts for user review in the Memory Browser.
pub struct ConflictDetector {
    threshold: f32,
}

#[derive(Debug, Clone)]
pub struct MemoryConflict {
    pub entry_a: MemoryEntry,
    pub entry_b: MemoryEntry,
    pub similarity: f32,
    pub resolution: ConflictResolution,
}

#[derive(Debug, Clone, PartialEq)]
pub enum ConflictResolution {
    Unresolved,
    KeepBoth,
    KeepNewer,
    KeepHigherConfidence,
}

impl ConflictDetector {
    pub fn new(threshold: f32) -> Self {
        Self { threshold }
    }

    /// Detect conflicts among a set of memory entries.
    /// Returns pairs where cosine similarity exceeds the threshold.
    pub fn detect_conflicts(&self, entries: &[MemoryEntry]) -> Vec<MemoryConflict> {
        let mut conflicts = Vec::new();

        // Compute pairwise similarities
        // In production: use LanceDB vector search for efficient pairwise comparison
        for i in 0..entries.len() {
            for j in (i + 1)..entries.len() {
                let similarity = self.compute_text_similarity(
                    &entries[i].content,
                    &entries[j].content,
                );
                if similarity > self.threshold {
                    conflicts.push(MemoryConflict {
                        entry_a: entries[i].clone(),
                        entry_b: entries[j].clone(),
                        similarity,
                        resolution: ConflictResolution::Unresolved,
                    });
                }
            }
        }

        conflicts
    }

    /// Simple Jaccard similarity on word sets as a lightweight conflict detector.
    /// In production: use embedding cosine similarity.
    fn compute_text_similarity(&self, a: &str, b: &str) -> f32 {
        let words_a: std::collections::HashSet<&str> = a.split_whitespace().collect();
        let words_b: std::collections::HashSet<&str> = b.split_whitespace().collect();

        let intersection = words_a.intersection(&words_b).count();
        let union = words_a.union(&words_b).count();

        if union == 0 { return 0.0; }
        intersection as f32 / union as f32
    }
}

impl Default for ConflictDetector {
    fn default() -> Self {
        Self::new(0.85)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_entry(id: &str, content: &str) -> MemoryEntry {
        MemoryEntry {
            id: id.into(), scope: crate::types::MemoryScope::Project,
            category: crate::types::MemoryCategory::Convention,
            content: content.into(), confidence: 0.9, freshness: 1.0,
            verified: false, source_session_id: "s1".into(),
            created_at: chrono::Utc::now(), last_used_at: chrono::Utc::now(),
            use_count: 0, tags: vec![],
        }
    }

    #[test]
    fn test_identical_content_high_similarity() {
        let detector = ConflictDetector::new(0.5);
        let entries = vec![
            make_entry("1", "Use TypeScript for all new code"),
            make_entry("2", "Use TypeScript for all new code"),
        ];
        let conflicts = detector.detect_conflicts(&entries);
        assert_eq!(conflicts.len(), 1);
        assert!((conflicts[0].similarity - 1.0).abs() < 0.01);
    }

    #[test]
    fn test_different_content_low_similarity() {
        let detector = ConflictDetector::new(0.5);
        let entries = vec![
            make_entry("1", "Use TypeScript for all new code"),
            make_entry("2", "Database uses PostgreSQL with Prisma ORM"),
        ];
        let conflicts = detector.detect_conflicts(&entries);
        assert_eq!(conflicts.len(), 0);
    }
}