use tauri::State;
use std::sync::Arc;
use crate::AppState;

#[tauri::command]
pub async fn get_zero_waste_metrics(
    state: State<'_, Arc<AppState>>,
    session_id: String,
) -> Result<serde_json::Value, String> {
    let row = sqlx::query_as::<_, (
        i64, i64, i64, i64, i64, f64, i64, i64, i64, i64, f64, i64, f64,
    )>(
        "SELECT mcp_schema_tokens_saved, mcp_schemas_active, mcp_schemas_total,
                terminal_raw_tokens, terminal_compressed_tokens, terminal_compression_ratio,
                self_edit_dedup_count, self_edit_tokens_saved,
                full_history_tokens_estimate, checkpoint_tokens_actual, checkpoint_compression_ratio,
                total_tokens_saved, combined_savings_ratio
         FROM zero_waste_metrics WHERE session_id = ?"
    )
    .bind(&session_id)
    .fetch_optional(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    match row {
        Some((mcp_saved, mcp_active, mcp_total, term_raw, term_comp, term_ratio,
              dedup_count, dedup_saved, hist_est, ckpt_actual, ckpt_ratio,
              total_saved, combined_ratio)) => {
            Ok(serde_json::json!({
                "session_id": session_id,
                "mcp": {
                    "tokens_saved": mcp_saved,
                    "schemas_active": mcp_active,
                    "schemas_total": mcp_total,
                },
                "terminal": {
                    "raw_tokens": term_raw,
                    "compressed_tokens": term_comp,
                    "compression_ratio": term_ratio,
                },
                "dedup": {
                    "count": dedup_count,
                    "tokens_saved": dedup_saved,
                },
                "checkpoint": {
                    "full_history_estimate": hist_est,
                    "actual_tokens": ckpt_actual,
                    "compression_ratio": ckpt_ratio,
                },
                "total_tokens_saved": total_saved,
                "combined_savings_ratio": combined_ratio,
            }))
        }
        None => Ok(serde_json::json!({
            "session_id": session_id,
            "combined_savings_ratio": 0.0,
            "total_tokens_saved": 0,
        })),
    }
}

#[tauri::command]
pub async fn update_zero_waste_metrics(
    state: State<'_, Arc<AppState>>,
    session_id: String,
    metric_type: String,
    value: serde_json::Value,
) -> Result<(), String> {
    let _ = (state, session_id, metric_type, value);
    // In production: update specific metric columns and recompute combined_ratio
    Ok(())
}