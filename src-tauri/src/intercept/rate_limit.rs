use std::collections::VecDeque;
use std::time::{Instant, Duration};

/// Rate limit detection per provider with auto-fallback chain management.
pub struct RateLimitManager {
    pub provider_states: std::collections::HashMap<String, ProviderState>,
    pub retry_queue: VecDeque<RetryTask>,
}

#[derive(Debug, Clone)]
pub struct ProviderState {
    pub name: String,
    pub is_rate_limited: bool,
    pub rate_limit_until: Option<Instant>,
    pub retry_after_seconds: Option<u64>,
    pub consecutive_429s: u32,
}

#[derive(Debug, Clone)]
pub struct RetryTask {
    pub turn_content: String,
    pub queued_at: Instant,
}

impl RateLimitManager {
    pub fn new() -> Self {
        let mut states = std::collections::HashMap::new();
        for name in &["claude", "codex", "antigravity"] {
            states.insert(name.to_string(), ProviderState {
                name: name.to_string(),
                is_rate_limited: false,
                rate_limit_until: None,
                retry_after_seconds: None,
                consecutive_429s: 0,
            });
        }
        Self {
            provider_states: states,
            retry_queue: VecDeque::with_capacity(10),
        }
    }

    /// Detect rate limit from CLI error output.
    /// Returns Some(provider_name) if rate limited, None otherwise.
    pub fn detect_rate_limit(&mut self, provider: &str, error_line: &str) -> Option<String> {
        let lower = error_line.to_lowercase();

        let is_rate_limited = match provider {
            "claude" => lower.contains("429") || lower.contains("overloaded_error") || lower.contains("rate limit"),
            "codex" => lower.contains("rate_limit_error") || lower.contains("429") || lower.contains("too many requests"),
            "antigravity" => lower.contains("resource_exhausted") || lower.contains("429") || lower.contains("quota"),
            _ => false,
        };

        if is_rate_limited {
            let retry_after = self.parse_retry_after(error_line);
            if let Some(state) = self.provider_states.get_mut(provider) {
                state.is_rate_limited = true;
                state.consecutive_429s += 1;
                state.retry_after_seconds = retry_after;
                state.rate_limit_until = retry_after
                    .map(|s| Instant::now() + Duration::from_secs(s));
                return Some(provider.to_string());
            }
        }

        None
    }

    /// Parse Retry-After or similar hints from error messages.
    fn parse_retry_after(&self, error_line: &str) -> Option<u64> {
        // Try to find "retry after X seconds" or "try again in Xs"
        let re = regex::Regex::new(r"(\d+)\s*(?:second|sec|s)").ok()?;
        re.captures(error_line)
            .and_then(|caps| caps.get(1))
            .and_then(|m| m.as_str().parse::<u64>().ok())
    }

    /// Queue a turn for retry when rate limit clears.
    pub fn enqueue_retry(&mut self, content: &str) -> bool {
        if self.retry_queue.len() >= 10 {
            return false;
        }
        self.retry_queue.push_back(RetryTask {
            turn_content: content.to_string(),
            queued_at: Instant::now(),
        });
        true
    }

    /// Check if a rate-limited provider has recovered.
    pub fn check_recovery(&mut self, provider: &str) -> bool {
        if let Some(state) = self.provider_states.get_mut(provider) {
            if state.is_rate_limited {
                if let Some(until) = state.rate_limit_until {
                    if Instant::now() >= until {
                        state.is_rate_limited = false;
                        state.consecutive_429s = 0;
                        state.rate_limit_until = None;
                        return true;
                    }
                }
            }
        }
        false
    }

    /// Get the next available fallback provider from a connection profile chain.
    pub fn get_fallback(
        &self,
        chain: &[String],
        current: &str,
    ) -> Option<String> {
        let mut found_current = false;
        for provider in chain {
            if provider == current {
                found_current = true;
                continue;
            }
            if found_current {
                if let Some(state) = self.provider_states.get(provider) {
                    if !state.is_rate_limited {
                        return Some(provider.clone());
                    }
                }
            }
        }
        None
    }

    /// Check if fallback is a weaker tier than primary.
    pub fn is_weaker_tier(&self, primary: &str, fallback: &str) -> bool {
        let tier = |p: &str| -> u32 {
            match p {
                "claude" => 1,
                "codex" => 2,
                "antigravity" => 2,
                _ => 3,
            }
        };
        tier(fallback) > tier(primary)
    }
}

impl Default for RateLimitManager {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_detect_claude_rate_limit() {
        let mut mgr = RateLimitManager::new();
        let result = mgr.detect_rate_limit("claude", "Error: 429 Too Many Requests. Rate limit exceeded.");
        assert_eq!(result, Some("claude".into()));
        assert!(mgr.provider_states.get("claude").unwrap().is_rate_limited);
    }

    #[test]
    fn test_get_fallback_chain() {
        let mgr = RateLimitManager::new();
        let chain = vec!["claude".into(), "codex".into(), "antigravity".into()];
        let fallback = mgr.get_fallback(&chain, "claude");
        assert_eq!(fallback, Some("codex".into()));
    }
}