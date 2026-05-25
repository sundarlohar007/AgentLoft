use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;

use crate::AppState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkAuditEntry {
    pub id: Option<i64>,
    pub timestamp: String,
    pub provider: String,
    pub endpoint: String,
    pub model: String,
    pub token_count: i64,
    pub cost_usd: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SecretScanResult {
    pub passed: bool,
    pub findings: Vec<SecretFinding>,
    pub scanned_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SecretFinding {
    pub pattern: String,
    pub matched_type: String,
    pub redacted: String,
    pub position: Option<SecretPosition>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SecretPosition {
    pub line: usize,
    pub column: usize,
}

/// Known secret patterns used for scanning
const SECRET_PATTERNS: &[(&str, &str)] = &[
    ("sk-[a-zA-Z0-9]{32,}", "OpenAI API Key"),
    ("sk-ant-[a-zA-Z0-9_-]{32,}", "Anthropic API Key"),
    ("AIza[0-9A-Za-z_-]{35}", "Google API Key"),
    ("ghp_[a-zA-Z0-9]{36}", "GitHub Personal Access Token"),
    ("gho_[a-zA-Z0-9]{36}", "GitHub OAuth Token"),
    ("ghu_[a-zA-Z0-9]{36}", "GitHub User Token"),
    ("ghs_[a-zA-Z0-9]{36}", "GitHub Server Token"),
    ("ghr_[a-zA-Z0-9]{36}", "GitHub Refresh Token"),
    ("xox[baprs]-[a-zA-Z0-9-]+", "Slack Token"),
    ("AKIA[0-9A-Z]{16}", "AWS Access Key ID"),
    ("eyJ[a-zA-Z0-9_-]*\\.eyJ[a-zA-Z0-9_-]*\\.[a-zA-Z0-9_-]*", "JWT Token"),
    ("Bearer [a-zA-Z0-9._-]+", "Bearer Token"),
    ("-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----", "Private Key"),
];

/// Scan content for secrets. Returns findings if any patterns match.
pub fn scan_content(content: &str) -> SecretScanResult {
    let mut findings = Vec::new();
    let now = chrono::Utc::now().to_rfc3339();

    for (pattern, secret_type) in SECRET_PATTERNS {
        if let Ok(re) = regex::Regex::new(pattern) {
            for capture in re.find_iter(content) {
                let matched = capture.as_str();
                // Redact: keep first 4 and last 4 chars
                let redacted = if matched.len() > 8 {
                    format!(
                        "{}...{}",
                        &matched[..4],
                        &matched[matched.len() - 4..]
                    )
                } else {
                    "***".to_string()
                };

                // Estimate line/column
                let before = &content[..capture.start()];
                let line = before.chars().filter(|c| *c == '\n').count() + 1;
                let last_newline = before.rfind('\n').map(|i| i + 1).unwrap_or(0);
                let column = capture.start() - last_newline + 1;

                findings.push(SecretFinding {
                    pattern: pattern.to_string(),
                    matched_type: secret_type.to_string(),
                    redacted,
                    position: Some(SecretPosition { line, column }),
                });
            }
        }
    }

    SecretScanResult {
        passed: findings.is_empty(),
        findings,
        scanned_at: now,
    }
}

#[tauri::command]
pub async fn get_network_audit_log(
    state: State<'_, Arc<AppState>>,
    limit: Option<i64>,
    provider: Option<String>,
) -> Result<Vec<NetworkAuditEntry>, String> {
    let limit_val = limit.unwrap_or(100);
    let mut query = String::from(
        "SELECT id, timestamp, provider, endpoint, model, token_count, cost_usd FROM network_audit_log"
    );

    if provider.is_some() {
        query.push_str(" WHERE provider = ? ORDER BY timestamp DESC LIMIT ?");
        let rows = sqlx::query_as::<_, (i64, String, String, String, String, i64, f64)>(&query)
            .bind(provider.unwrap())
            .bind(limit_val)
            .fetch_all(&state.db)
            .await
            .map_err(|e| e.to_string())?;

        Ok(rows
            .into_iter()
            .map(|(id, timestamp, provider, endpoint, model, token_count, cost_usd)| {
                NetworkAuditEntry {
                    id: Some(id),
                    timestamp,
                    provider,
                    endpoint,
                    model,
                    token_count,
                    cost_usd,
                }
            })
            .collect())
    } else {
        query.push_str(" ORDER BY timestamp DESC LIMIT ?");
        let rows = sqlx::query_as::<_, (i64, String, String, String, String, i64, f64)>(&query)
            .bind(limit_val)
            .fetch_all(&state.db)
            .await
            .map_err(|e| e.to_string())?;

        Ok(rows
            .into_iter()
            .map(|(id, timestamp, provider, endpoint, model, token_count, cost_usd)| {
                NetworkAuditEntry {
                    id: Some(id),
                    timestamp,
                    provider,
                    endpoint,
                    model,
                    token_count,
                    cost_usd,
                }
            })
            .collect())
    }
}

#[tauri::command]
pub async fn scan_content_for_secrets(
    content: String,
) -> Result<SecretScanResult, String> {
    Ok(scan_content(&content))
}

#[tauri::command]
pub async fn record_network_audit_entry(
    state: State<'_, Arc<AppState>>,
    provider: String,
    endpoint: String,
    model: String,
    token_count: i64,
    cost_usd: f64,
) -> Result<(), String> {
    sqlx::query(
        "INSERT INTO network_audit_log (provider, endpoint, model, token_count, cost_usd) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(&provider)
    .bind(&endpoint)
    .bind(&model)
    .bind(token_count)
    .bind(cost_usd)
    .execute(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

/// Export network audit log as CSV string
#[tauri::command]
pub async fn export_network_audit_csv(
    state: State<'_, Arc<AppState>>,
) -> Result<String, String> {
    let rows = sqlx::query_as::<_, (i64, String, String, String, String, i64, f64)>(
        "SELECT id, timestamp, provider, endpoint, model, token_count, cost_usd FROM network_audit_log ORDER BY timestamp DESC"
    )
    .fetch_all(&state.db)
    .await
    .map_err(|e| e.to_string())?;

    let mut csv = String::from("id,timestamp,provider,endpoint,model,token_count,cost_usd\n");
    for (id, ts, provider, endpoint, model, tokens, cost) in rows {
        csv.push_str(&format!(
            "{},{},{},{},{},{},{:.6}\n",
            id, ts, provider, endpoint, model, tokens, cost
        ));
    }

    Ok(csv)
}
