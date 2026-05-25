use tauri::State;
use std::sync::Arc;
use crate::AppState;

#[derive(Debug, Clone, serde::Serialize)]
pub struct CostSnapshot {
    pub session_id: String,
    pub total_cost_usd: f64,
    pub last_turn_cost_usd: f64,
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub cache_read: i64,
    pub cache_write: i64,
    pub cache_hit_rate: f64,
    pub turns: i32,
    pub anomalies: Vec<CostAnomaly>,
}

#[derive(Debug, Clone, serde::Serialize)]
pub struct CostAnomaly {
    pub turn: i32,
    pub cost: f64,
    pub average: f64,
    pub multiplier: f64,
    pub timestamp: String,
}

#[tauri::command]
pub async fn get_session_cost(
    state: State<'_, Arc<AppState>>,
    session_id: String,
) -> Result<CostSnapshot, String> {
    let row = sqlx::query_as::<_, (f64, i64, i64, i64, i64)>(
        "SELECT total_cost_usd, total_tokens_in, total_tokens_out, 0, 0 FROM sessions WHERE id = ?"
    )
    .bind(&session_id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    let turns = sqlx::query_scalar::<_, i32>(
        "SELECT COUNT(*) FROM messages WHERE session_id = ? AND role = 'assistant'"
    )
    .bind(&session_id)
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    Ok(CostSnapshot {
        session_id,
        total_cost_usd: row.0,
        last_turn_cost_usd: 0.0,
        prompt_tokens: row.1,
        completion_tokens: row.2,
        cache_read: row.3,
        cache_write: row.4,
        cache_hit_rate: if (row.1 + row.2) > 0 {
            row.3 as f64 / (row.1 + row.2) as f64
        } else {
            0.0
        },
        turns,
        anomalies: vec![],
    })
}

#[tauri::command]
pub async fn get_project_cost(
    state: State<'_, Arc<AppState>>,
    project_id: String,
) -> Result<serde_json::Value, String> {
    let total: (f64,) = sqlx::query_as(
        "SELECT COALESCE(SUM(total_cost_usd), 0) FROM sessions WHERE project_id = ?"
    )
    .bind(&project_id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    let session_count: (i32,) = sqlx::query_as(
        "SELECT COUNT(*) FROM sessions WHERE project_id = ?"
    )
    .bind(&project_id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(serde_json::json!({
        "project_id": project_id,
        "total_cost_usd": total.0,
        "session_count": session_count.0,
    }))
}

/// Track rolling average cost per turn and detect anomalies.
pub struct CostAnomalyDetector {
    recent_costs: Vec<f64>,
    window_size: usize,
    threshold: f64,
}

impl CostAnomalyDetector {
    pub fn new() -> Self {
        Self {
            recent_costs: Vec::with_capacity(10),
            window_size: 10,
            threshold: 3.0,
        }
    }

    /// Record a new turn cost. Returns Some(anomaly) if spike detected.
    pub fn record_turn(&mut self, cost: f64) -> Option<CostAnomaly> {
        self.recent_costs.push(cost);
        if self.recent_costs.len() > self.window_size {
            self.recent_costs.remove(0);
        }

        if self.recent_costs.len() < 3 {
            return None;
        }

        let avg: f64 = self.recent_costs[..self.recent_costs.len() - 1]
            .iter()
            .sum::<f64>()
            / (self.recent_costs.len() - 1) as f64;

        let multiplier = cost / avg.max(0.0001);

        if multiplier > self.threshold && cost > 0.05 {
            Some(CostAnomaly {
                turn: self.recent_costs.len() as i32,
                cost,
                average: avg,
                multiplier,
                timestamp: chrono::Utc::now().to_rfc3339(),
            })
        } else {
            None
        }
    }
}

impl Default for CostAnomalyDetector {
    fn default() -> Self { Self::new() }
}