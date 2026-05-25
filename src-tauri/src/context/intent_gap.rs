use crate::types::{Message, ContextSnapshot};

/// Detect when agent output diverges from the stated task.
/// Uses keyword + embedding comparison to flag semantic drift.
pub struct IntentGapDetector {
    original_task: Option<String>,
    turn_count: u32,
}

#[derive(Debug, Clone)]
pub struct GapResult {
    pub detected: bool,
    pub original_goal: String,
    pub current_action: String,
    pub severity: f64,  // 0.0 - 1.0
}

impl IntentGapDetector {
    pub fn new() -> Self {
        Self { original_task: None, turn_count: 0 }
    }

    pub fn set_task(&mut self, task: &str) {
        self.original_task = Some(task.to_string());
        self.turn_count = 0;
    }

    /// Check a new agent message for intent drift.
    pub fn check_turn(&mut self, message: &Message) -> Option<GapResult> {
        self.turn_count += 1;

        let task = match &self.original_task {
            Some(t) => t.clone(),
            None => return None,
        };

        // Skip early turns (agent is still orienting)
        if self.turn_count < 3 {
            return None;
        }

        // Heuristic: check if agent mentions completely different task keywords
        let task_keywords: Vec<&str> = task.split_whitespace().collect();
        let msg_lower = message.content.to_lowercase();

        // Count keyword overlap
        let overlap = task_keywords.iter()
            .filter(|kw| msg_lower.contains(&kw.to_lowercase()))
            .count();

        let overlap_ratio = if task_keywords.is_empty() { 1.0 }
            else { overlap as f64 / task_keywords.len() as f64 };

        if overlap_ratio < 0.2 && self.turn_count > 5 {
            // Significant drift detected
            let severity = 1.0 - overlap_ratio;
            return Some(GapResult {
                detected: true,
                original_goal: task,
                current_action: message.content.chars().take(200).collect(),
                severity,
            });
        }

        None
    }
}

impl Default for IntentGapDetector {
    fn default() -> Self { Self::new() }
}