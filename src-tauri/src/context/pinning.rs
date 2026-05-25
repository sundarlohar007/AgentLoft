use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PinnedItem {
    pub id: String,
    pub content: String,
    pub category: PinnedCategory,
    pub pinned_at: u64,        // Unix timestamp ms
    pub expires_at: Option<u64>,
    pub token_count: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum PinnedCategory {
    Directive,      // System instructions that survive compaction
    File,           // Critical file content
    Memory,         // Key memory entries
    Constraint,     // Safety or budget constraints
    Custom(String),
}

pub struct PinningManager {
    items: Arc<RwLock<HashMap<String, PinnedItem>>>,
    max_pinned_tokens: u64,
}

impl PinningManager {
    pub fn new(max_pinned_tokens: u64) -> Self {
        Self {
            items: Arc::new(RwLock::new(HashMap::new())),
            max_pinned_tokens,
        }
    }

    pub async fn pin(&self, item: PinnedItem) -> Result<(), String> {
        let current = self.current_pinned_tokens().await;
        if current + item.token_count > self.max_pinned_tokens {
            return Err(format!(
                "Pinning this item would exceed max pinned tokens ({} + {} > {})",
                current, item.token_count, self.max_pinned_tokens
            ));
        }
        self.items.write().await.insert(item.id.clone(), item);
        Ok(())
    }

    pub async fn unpin(&self, id: &str) -> bool {
        self.items.write().await.remove(id).is_some()
    }

    pub async fn get_pinned(&self) -> Vec<PinnedItem> {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as u64;

        self.items
            .read()
            .await
            .values()
            .filter(|item| {
                item.expires_at.map_or(true, |expiry| now < expiry)
            })
            .cloned()
            .collect()
    }

    pub async fn get_pinned_context(&self) -> String {
        let pinned = self.get_pinned().await;
        if pinned.is_empty() {
            return String::new();
        }

        let mut ctx = String::from("<!-- PINNED CONTEXT — survives compaction -->\n");
        for item in &pinned {
            ctx.push_str(&format!(
                "<!-- [{}] {} -->\n{}\n\n",
                item.category_label(),
                item.id,
                item.content
            ));
        }
        ctx.push_str("<!-- END PINNED CONTEXT -->\n");
        ctx
    }

    pub async fn current_pinned_tokens(&self) -> u64 {
        self.items.read().await.values().map(|i| i.token_count).sum()
    }

    pub async fn max_pinned_tokens(&self) -> u64 {
        self.max_pinned_tokens
    }

    pub async fn clear_expired(&self) -> usize {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as u64;

        let mut items = self.items.write().await;
        let before = items.len();
        items.retain(|_, item| item.expires_at.map_or(true, |e| now < e));
        before - items.len()
    }
}

impl PinnedItem {
    fn category_label(&self) -> &str {
        match self.category {
            PinnedCategory::Directive => "DIRECTIVE",
            PinnedCategory::File => "FILE",
            PinnedCategory::Memory => "MEMORY",
            PinnedCategory::Constraint => "CONSTRAINT",
            PinnedCategory::Custom(ref s) => s.as_str(),
        }
    }
}
