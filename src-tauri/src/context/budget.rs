use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContextBudget {
    pub total_tokens: u64,
    pub used_tokens: u64,
    pub allocations: BudgetAllocations,
    pub warnings: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BudgetAllocations {
    pub system_prompt: u64,
    pub memory: u64,
    pub files: u64,
    pub conversation: u64,
}

impl Default for BudgetAllocations {
    fn default() -> Self {
        Self {
            system_prompt: 2000,
            memory: 4000,
            files: 16000,
            conversation: 10000,
        }
    }
}

pub struct ContextBudgetManager {
    current: Arc<Mutex<ContextBudget>>,
    hard_limit: u64,
}

impl ContextBudgetManager {
    pub fn new(hard_limit: u64) -> Self {
        let total = hard_limit;
        Self {
            current: Arc::new(Mutex::new(ContextBudget {
                total_tokens: total,
                used_tokens: 0,
                allocations: BudgetAllocations::default(),
                warnings: Vec::new(),
            })),
            hard_limit,
        }
    }

    pub async fn get_usage(&self) -> ContextBudget {
        self.current.lock().await.clone()
    }

    pub async fn record_usage(&self, tokens: u64, category: &str) -> BudgetResult {
        let mut budget = self.current.lock().await;
        budget.used_tokens += tokens;

        let category_limit = match category {
            "memory" => budget.allocations.memory,
            "files" => budget.allocations.files,
            "conversation" => budget.allocations.conversation,
            "system" => budget.allocations.system_prompt,
            _ => 0,
        };

        let usage_ratio = budget.used_tokens as f64 / budget.total_tokens as f64;

        if usage_ratio >= 0.95 {
            budget.warnings.push(format!(
                "Context budget critical: {}/{} tokens ({}%)",
                budget.used_tokens, budget.total_tokens,
                (usage_ratio * 100.0) as u32
            ));
            BudgetResult::Critical {
                used: budget.used_tokens,
                limit: budget.total_tokens,
            }
        } else if usage_ratio >= 0.80 {
            budget.warnings.push(format!(
                "Context budget warning: {}% used", (usage_ratio * 100.0) as u32
            ));
            BudgetResult::Warning {
                used: budget.used_tokens,
                limit: budget.total_tokens,
            }
        } else {
            BudgetResult::Ok {
                used: budget.used_tokens,
                limit: budget.total_tokens,
                remaining: budget.total_tokens.saturating_sub(budget.used_tokens),
            }
        }
    }

    pub async fn set_allocation(&self, category: &str, tokens: u64) {
        let mut budget = self.current.lock().await;
        match category {
            "memory" => budget.allocations.memory = tokens,
            "files" => budget.allocations.files = tokens,
            "conversation" => budget.allocations.conversation = tokens,
            "system" => budget.allocations.system_prompt = tokens,
            _ => {}
        }
    }

    pub async fn reset(&self) {
        let mut budget = self.current.lock().await;
        budget.used_tokens = 0;
        budget.warnings.clear();
    }

    pub async fn get_warnings(&self) -> Vec<String> {
        self.current.lock().await.warnings.clone()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "status")]
pub enum BudgetResult {
    Ok {
        used: u64,
        limit: u64,
        remaining: u64,
    },
    Warning {
        used: u64,
        limit: u64,
    },
    Critical {
        used: u64,
        limit: u64,
    },
}
