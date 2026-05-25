use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContextHealth {
    pub score: u32,                    // 0-100
    pub status: HealthStatus,
    pub breakdown: HealthBreakdown,
    pub suggestions: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum HealthStatus {
    Healthy,     // >70
    Degraded,    // 40-70
    Critical,    // <40
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthBreakdown {
    pub context_utilization: f64,      // 0.0-1.0 — lower is better
    pub directive_freshness: f64,      // 0.0-1.0 — higher is better
    pub memory_coverage: f64,          // 0.0-1.0 — higher is better
    pub repetition_penalty: f64,       // 0.0-1.0 — 1.0 means no repetition
    pub warning_count: u32,
}

pub struct ContextHealthEngine;

impl ContextHealthEngine {
    pub fn new() -> Self { Self }

    pub fn compute(
        &self,
        context_used: u64,
        context_limit: u64,
        directive_last_injected_at: Option<u64>,
        current_turn: u64,
        memory_entries_found: usize,
        recent_message_hashes: &[String],
    ) -> ContextHealth {
        // Context utilization: lower = better (more room for conversation)
        let utilization = if context_limit > 0 {
            (context_used as f64 / context_limit as f64).min(1.0)
        } else {
            1.0
        };
        let context_utilization_score = 1.0 - utilization;

        // Directive freshness: 1.0 if injected this turn, decays by 0.1 per turn
        let directive_freshness = match directive_last_injected_at {
            Some(last_turn) => {
                let turns_since = current_turn.saturating_sub(last_turn);
                (1.0 - (turns_since as f64 * 0.1)).max(0.0)
            }
            None => 0.0,
        };

        // Memory coverage: good if >=5 memories found, proportional otherwise
        let memory_coverage = (memory_entries_found as f64 / 5.0).min(1.0);

        // Repetition: check for duplicate message hashes
        let unique_hashes: std::collections::HashSet<_> = recent_message_hashes.iter().collect();
        let repetition_penalty = if recent_message_hashes.is_empty() {
            1.0
        } else {
            unique_hashes.len() as f64 / recent_message_hashes.len() as f64
        };

        let mut suggestions = Vec::new();
        if utilization > 0.8 {
            suggestions.push("Context nearly full — consider /compact or pinning critical items".into());
        }
        if directive_freshness < 0.3 {
            suggestions.push("Directives may be stale — agent may have forgotten key instructions".into());
        }
        if memory_coverage < 0.5 {
            suggestions.push("Low memory coverage — consider running memory bootstrap or reviewing project CLAUDE.md".into());
        }
        if repetition_penalty < 0.7 {
            suggestions.push("Repetition detected — agent may be looping. Consider rewording your prompt.".into());
        }

        // Weighted composite score
        let raw_score = (context_utilization_score * 0.30)
            + (directive_freshness * 0.30)
            + (memory_coverage * 0.25)
            + (repetition_penalty * 0.15);

        let score = (raw_score * 100.0).round().clamp(0.0, 100.0) as u32;

        let status = if score > 70 {
            HealthStatus::Healthy
        } else if score >= 40 {
            HealthStatus::Degraded
        } else {
            HealthStatus::Critical
        };

        ContextHealth {
            score,
            status,
            breakdown: HealthBreakdown {
                context_utilization: context_utilization_score,
                directive_freshness,
                memory_coverage,
                repetition_penalty,
                warning_count: suggestions.len() as u32,
            },
            suggestions,
        }
    }
}

impl Default for ContextHealthEngine {
    fn default() -> Self { Self::new() }
}
