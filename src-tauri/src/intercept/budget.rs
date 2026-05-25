use std::collections::HashMap;

pub struct BudgetEnforcer {
    caps: BudgetCaps,
    usage: BudgetUsage,
}

#[derive(Debug, Clone)]
pub struct BudgetCaps {
    pub session_hard_cap: Option<f64>,
    pub task_soft_cap: Option<f64>,
    pub daily_cap: Option<f64>,
    pub monthly_cap: Option<f64>,
}

#[derive(Debug, Clone, Default)]
pub struct BudgetUsage {
    pub session_total: f64,
    pub task_total: f64,
    pub daily_total: f64,
    pub monthly_total: f64,
}

#[derive(Debug, Clone, PartialEq)]
pub enum BudgetAction {
    Allow,
    Warn(String),
    Block(String),
    SwitchToCheaper(String),
}

impl BudgetEnforcer {
    pub fn new(caps: BudgetCaps) -> Self {
        Self { caps, usage: BudgetUsage::default() }
    }

    pub fn with_defaults() -> Self {
        Self::new(BudgetCaps {
            session_hard_cap: None,
            task_soft_cap: Some(5.0),
            daily_cap: Some(20.0),
            monthly_cap: Some(100.0),
        })
    }

    /// Record token spend. Returns the action to take.
    pub fn record_spend(&mut self, cost: f64) -> BudgetAction {
        self.usage.session_total += cost;
        self.usage.task_total += cost;
        self.usage.daily_total += cost;
        self.usage.monthly_total += cost;

        // Check session hard cap (blocks immediately)
        if let Some(cap) = self.caps.session_hard_cap {
            if self.usage.session_total >= cap {
                return BudgetAction::Block(
                    format!("Session hard cap reached: ${:.2} / ${:.2}", self.usage.session_total, cap)
                );
            }
        }

        // Check task soft cap (warns)
        if let Some(cap) = self.caps.task_soft_cap {
            if self.usage.task_total >= cap {
                return BudgetAction::Warn(
                    format!("Task soft cap reached: ${:.2} / ${:.2}", self.usage.task_total, cap)
                );
            }
        }

        // Check daily cap
        if let Some(cap) = self.caps.daily_cap {
            if self.usage.daily_total >= cap * 0.9 {
                return BudgetAction::SwitchToCheaper(
                    format!("Approaching daily cap: ${:.2} / ${:.2}", self.usage.daily_total, cap)
                );
            }
        }

        BudgetAction::Allow
    }

    /// Reset task counter (new task started).
    pub fn reset_task(&mut self) {
        self.usage.task_total = 0.0;
    }

    /// Get current usage summary.
    pub fn get_usage(&self) -> &BudgetUsage {
        &self.usage
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_session_hard_cap_blocks() {
        let mut enforcer = BudgetEnforcer::new(BudgetCaps {
            session_hard_cap: Some(10.0),
            task_soft_cap: None,
            daily_cap: None,
            monthly_cap: None,
        });

        assert_eq!(enforcer.record_spend(9.0), BudgetAction::Allow);
        assert_eq!(enforcer.record_spend(1.5), BudgetAction::Block("Session hard cap reached: $10.50 / $10.00".into()));
    }

    #[test]
    fn test_task_soft_cap_warns() {
        let mut enforcer = BudgetEnforcer::new(BudgetCaps {
            session_hard_cap: None,
            task_soft_cap: Some(5.0),
            daily_cap: None,
            monthly_cap: None,
        });

        enforcer.record_spend(3.0);
        let result = enforcer.record_spend(3.0);
        assert!(matches!(result, BudgetAction::Warn(_)));
    }
}