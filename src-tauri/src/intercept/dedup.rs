use sha2::{Sha256, Digest};
use std::collections::HashMap;
use std::sync::Mutex;

/// SHA256 write registry. Prevents agent from re-reading files it just wrote.
pub struct DedupRegistry {
    writes: Mutex<HashMap<String, String>>, // path -> SHA256 hash
    tokens_saved: Mutex<u64>,
    dedup_count: Mutex<u64>,
}

impl DedupRegistry {
    pub fn new() -> Self {
        Self {
            writes: Mutex::new(HashMap::new()),
            tokens_saved: Mutex::new(0),
            dedup_count: Mutex::new(0),
        }
    }

    /// Register a file write. Called after every agent write_file tool call.
    pub fn register_write(&self, path: &str, content: &str) {
        let hash = format!("{:x}", Sha256::digest(content.as_bytes()));
        if let Ok(mut writes) = self.writes.lock() {
            writes.insert(path.to_string(), hash);
        }
    }

    /// Check if a file was just written by the agent and hasn't changed.
    /// Returns (was_just_written, current_hash).
    pub fn check_read(&self, path: &str, content: &str) -> bool {
        let current_hash = format!("{:x}", Sha256::digest(content.as_bytes()));
        if let Ok(writes) = self.writes.lock() {
            if let Some(stored_hash) = writes.get(path) {
                if stored_hash == &current_hash {
                    if let Ok(mut count) = self.dedup_count.lock() {
                        *count += 1;
                    }
                    // Estimate tokens saved (~4 tokens per word in file)
                    let tokens = content.split_whitespace().count() as u64 * 4;
                    if let Ok(mut saved) = self.tokens_saved.lock() {
                        *saved += tokens;
                    }
                    return true;
                }
            }
        }
        false
    }

    /// Clear the write registry for a new session.
    pub fn clear(&self) {
        if let Ok(mut writes) = self.writes.lock() {
            writes.clear();
        }
        if let Ok(mut saved) = self.tokens_saved.lock() {
            *saved = 0;
        }
        if let Ok(mut count) = self.dedup_count.lock() {
            *count = 0;
        }
    }

    pub fn stats(&self) -> (u64, u64) {
        let count = self.dedup_count.lock().map(|c| *c).unwrap_or(0);
        let saved = self.tokens_saved.lock().map(|s| *s).unwrap_or(0);
        (count, saved)
    }
}

impl Default for DedupRegistry {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_dedup_detects_same_content() {
        let reg = DedupRegistry::new();
        reg.register_write("src/main.rs", "fn main() { println!(\"hello\"); }");
        assert!(reg.check_read("src/main.rs", "fn main() { println!(\"hello\"); }"));
    }

    #[test]
    fn test_dedup_allows_changed_content() {
        let reg = DedupRegistry::new();
        reg.register_write("src/main.rs", "fn main() { println!(\"hello\"); }");
        assert!(!reg.check_read("src/main.rs", "fn main() { println!(\"world\"); }"));
    }
}