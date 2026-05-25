use std::collections::{HashMap, HashSet};

/// On-demand MCP schema loader. Classifies task intent and injects only relevant schemas.
pub struct McpLazyLoader {
    category_keywords: HashMap<String, Vec<String>>,
    active_schemas: HashSet<String>,
    total_schemas: usize,
}

impl McpLazyLoader {
    pub fn new() -> Self {
        let mut category_keywords = HashMap::new();
        category_keywords.insert("database".into(), vec!["sql".into(), "query".into(), "database".into(), "table".into(), "migration".into(), "schema".into(), "postgres".into(), "mysql".into()]);
        category_keywords.insert("filesystem".into(), vec!["file".into(), "read".into(), "write".into(), "directory".into(), "path".into()]);
        category_keywords.insert("git".into(), vec!["git".into(), "commit".into(), "branch".into(), "merge".into(), "pull request".into(), "pr".into(), "diff".into()]);
        category_keywords.insert("api".into(), vec!["api".into(), "http".into(), "rest".into(), "fetch".into(), "endpoint".into(), "request".into()]);
        category_keywords.insert("browser".into(), vec!["browser".into(), "web".into(), "puppeteer".into(), "playwright".into(), "screenshot".into()]);
        category_keywords.insert("slack".into(), vec!["slack".into(), "message".into(), "channel".into(), "notify".into()]);

        Self {
            category_keywords,
            active_schemas: HashSet::new(),
            total_schemas: 0,
        }
    }

    /// Register available MCP schemas with their categories.
    pub fn register_schemas(&mut self, schemas: &[(String, String)]) {
        self.total_schemas = schemas.len();
        // In production: store schema_id -> category mapping
        let _ = schemas;
    }

    /// Predict needed MCP categories from the user's task description.
    /// Returns the set of category names that should have their schemas injected.
    pub fn predict_categories(&self, task: &str) -> HashSet<String> {
        let task_lower = task.to_lowercase();
        let mut needed = HashSet::new();

        for (category, keywords) in &self.category_keywords {
            for keyword in keywords {
                if task_lower.contains(keyword) {
                    needed.insert(category.clone());
                    break;
                }
            }
        }

        needed
    }

    /// Get the list of schemas to inject for the current turn.
    /// Only returns schemas whose categories were predicted as needed.
    pub fn get_active_schemas(
        &self,
        needed_categories: &HashSet<String>,
        schema_category_map: &HashMap<String, String>,
    ) -> Vec<String> {
        schema_category_map
            .iter()
            .filter(|(_, category)| needed_categories.contains(*category))
            .map(|(schema_id, _)| schema_id.clone())
            .collect()
    }

    /// Calculate tokens saved by NOT loading unused schemas.
    pub fn tokens_saved(&self, active_count: usize, avg_schema_tokens: usize) -> usize {
        let unused = self.total_schemas.saturating_sub(active_count);
        unused * avg_schema_tokens
    }
}

impl Default for McpLazyLoader {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_predict_database_category() {
        let loader = McpLazyLoader::new();
        let categories = loader.predict_categories("Write a SQL migration for the users table");
        assert!(categories.contains("database"));
        assert!(!categories.contains("browser"));
    }

    #[test]
    fn test_predict_git_category() {
        let loader = McpLazyLoader::new();
        let categories = loader.predict_categories("Create a PR for the database migration changes");
        assert!(categories.contains("git"));
        assert!(categories.contains("database"));
    }

    #[test]
    fn test_tokens_saved() {
        let mut loader = McpLazyLoader::new();
        loader.total_schemas = 24;
        let saved = loader.tokens_saved(3, 8000);
        assert_eq!(saved, 21 * 8000); // 168K tokens saved
    }
}