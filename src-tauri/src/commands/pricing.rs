use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelPrice {
    pub provider: String,
    pub model_id: String,
    pub prompt_per_1k: f64,
    pub completion_per_1k: f64,
    pub cache_read_per_1k: Option<f64>,
    pub cache_write_per_1k: Option<f64>,
    pub context_window: i64,
}

pub struct PricingDatabase {
    prices: HashMap<String, ModelPrice>,
    last_updated: chrono::DateTime<chrono::Utc>,
}

impl PricingDatabase {
    pub fn new() -> Self {
        let mut prices = HashMap::new();

        // Bundled default prices
        let defaults = vec![
            ("claude_code/claude-opus-4-7", 15.0, 75.0, Some(3.75), Some(15.0), 200000),
            ("claude_code/claude-sonnet-4-6", 3.0, 15.0, Some(0.75), Some(3.0), 200000),
            ("claude_code/claude-haiku-4-5", 0.80, 4.0, Some(0.20), Some(0.80), 200000),
            ("codex_cli/gpt-4o", 2.50, 10.0, Some(1.25), None, 128000),
            ("codex_cli/gpt-4o-mini", 0.15, 0.60, Some(0.075), None, 128000),
            ("antigravity_cli/gemini-3-flash", 0.075, 0.30, None, None, 1000000),
            ("antigravity_cli/gemini-3-pro", 1.25, 5.0, None, None, 1000000),
            ("ollama/llama-3.3-70b", 0.0, 0.0, None, None, 128000),
            ("ollama/qwen-3-14b", 0.0, 0.0, None, None, 128000),
            ("groq/llama-3.3-70b", 0.59, 0.79, None, None, 128000),
            ("together/mixtral-8x22b", 0.90, 0.90, None, None, 65536),
        ];

        for (key, prompt, completion, cache_read, cache_write, ctx) in defaults {
            let parts: Vec<&str> = key.split('/').collect();
            prices.insert(key.to_string(), ModelPrice {
                provider: parts[0].to_string(),
                model_id: parts[1].to_string(),
                prompt_per_1k: prompt,
                completion_per_1k: completion,
                cache_read_per_1k: cache_read,
                cache_write_per_1k: cache_write,
                context_window: ctx,
            });
        }

        Self { prices, last_updated: chrono::Utc::now() }
    }

    pub fn get_price(&self, provider: &str, model_id: &str) -> Option<&ModelPrice> {
        self.prices.get(&format!("{}/{}", provider, model_id))
    }

    pub fn calculate_cost(
        &self,
        provider: &str,
        model_id: &str,
        prompt_tokens: i64,
        completion_tokens: i64,
        cache_read_tokens: i64,
        cache_write_tokens: i64,
    ) -> f64 {
        let price = match self.get_price(provider, model_id) {
            Some(p) => p,
            None => return 0.0,
        };

        let prompt_cost = (prompt_tokens as f64 / 1000.0) * price.prompt_per_1k;
        let completion_cost = (completion_tokens as f64 / 1000.0) * price.completion_per_1k;
        let cache_read_cost = cache_read_tokens as f64 / 1000.0
            * price.cache_read_per_1k.unwrap_or(0.0);
        let cache_write_cost = cache_write_tokens as f64 / 1000.0
            * price.cache_write_per_1k.unwrap_or(0.0);

        prompt_cost + completion_cost + cache_read_cost + cache_write_cost
    }

    /// Estimate cost for the same task on a different model.
    pub fn estimate_alternative_cost(
        &self,
        current_provider: &str,
        current_model: &str,
        alt_provider: &str,
        alt_model: &str,
        prompt_tokens: i64,
        completion_tokens: i64,
    ) -> Option<f64> {
        let alt_price = self.get_price(alt_provider, alt_model)?;
        let prompt_cost = (prompt_tokens as f64 / 1000.0) * alt_price.prompt_per_1k;
        let completion_cost = (completion_tokens as f64 / 1000.0) * alt_price.completion_per_1k;
        Some(prompt_cost + completion_cost)
    }

    pub fn should_update(&self) -> bool {
        let age = chrono::Utc::now() - self.last_updated;
        age > chrono::Duration::days(7)
    }
}

impl Default for PricingDatabase {
    fn default() -> Self { Self::new() }
}