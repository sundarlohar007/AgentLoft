use crate::process::ProcessEvent;
use serde_json::Value;

/// Parses stream-JSON output from Claude Code, Codex CLI, and Antigravity CLI.
/// Falls back to PTY regex parsing when JSON parsing fails.
pub fn parse_stream_json(line: &str) -> Option<ProcessEvent> {
    let parsed: Value = match serde_json::from_str(line) {
        Ok(v) => v,
        Err(_) => return None,
    };

    let event_type = parsed.get("type").and_then(|t| t.as_str()).unwrap_or("");

    match event_type {
        "thinking" => {
            let content = parsed.get("content").and_then(|c| c.as_str()).unwrap_or("");
            let is_final = parsed.get("is_final").and_then(|f| f.as_bool()).unwrap_or(false);
            Some(ProcessEvent::Thinking { content: content.to_string(), is_final })
        }

        "text" | "text_chunk" | "assistant" => {
            let content = parsed.get("content").and_then(|c| c.as_str()).unwrap_or("");
            let is_final = parsed.get("is_final").and_then(|f| f.as_bool()).unwrap_or(true);
            Some(ProcessEvent::Text { content: content.to_string(), is_final })
        }

        "tool_use" | "tool_call" => {
            let id = parsed.get("id").and_then(|i| i.as_str())
                .unwrap_or(&uuid::Uuid::new_v4().to_string()).to_string();
            let name = parsed.get("name").and_then(|n| n.as_str()).unwrap_or("unknown").to_string();
            let input = parsed.get("input").cloned().unwrap_or(Value::Object(Default::default()));
            Some(ProcessEvent::ToolCall { id, name, input })
        }

        "tool_result" => {
            let id = parsed.get("id").and_then(|i| i.as_str()).unwrap_or("").to_string();
            let output = parsed.get("output").map(|o| o.to_string()).unwrap_or_default();
            let error = parsed.get("error").and_then(|e| e.as_str()).map(|s| s.to_string());
            let duration_ms = parsed.get("duration_ms").and_then(|d| d.as_u64()).unwrap_or(0);
            Some(ProcessEvent::ToolResult { id, output, error, duration_ms })
        }

        "permission_request" => {
            let id = parsed.get("id").and_then(|i| i.as_str()).unwrap_or("").to_string();
            let tool_type = parsed.get("tool_type").and_then(|t| t.as_str()).unwrap_or("bash").to_string();
            let command = parsed.get("command").and_then(|c| c.as_str()).map(|s| s.to_string());
            let affected_paths = parsed.get("affected_paths")
                .and_then(|a| a.as_array())
                .map(|arr| arr.iter().filter_map(|v| v.as_str().map(|s| s.to_string())).collect())
                .unwrap_or_default();
            Some(ProcessEvent::PermissionRequest { id, tool_type, command, affected_paths })
        }

        "cost_update" | "token_info" => {
            let prompt_tokens = parsed.get("prompt_tokens").and_then(|t| t.as_i64()).unwrap_or(0);
            let completion_tokens = parsed.get("completion_tokens").and_then(|t| t.as_i64()).unwrap_or(0);
            let cache_read = parsed.get("cache_read").and_then(|t| t.as_i64()).unwrap_or(0);
            let cache_write = parsed.get("cache_write").and_then(|t| t.as_i64()).unwrap_or(0);
            let cost_usd = parsed.get("cost_usd").and_then(|c| c.as_f64()).unwrap_or(0.0);
            Some(ProcessEvent::CostUpdate { prompt_tokens, completion_tokens, cache_read, cache_write, cost_usd })
        }

        "context_warning" | "pre_compact" => {
            let message = parsed.get("message").and_then(|m| m.as_str()).unwrap_or("Context limit approaching").to_string();
            Some(ProcessEvent::ContextWarning { message })
        }

        _ => {
            // Unknown event type — try heuristics
            if parsed.get("tool").is_some() {
                let name = parsed.get("tool").and_then(|t| t.as_str()).unwrap_or("unknown").to_string();
                let input = parsed.clone();
                return Some(ProcessEvent::ToolCall {
                    id: uuid::Uuid::new_v4().to_string(), name, input,
                });
            }
            if parsed.get("error").is_some() {
                let message = parsed.get("error").and_then(|e| e.as_str()).unwrap_or("Unknown error").to_string();
                return Some(ProcessEvent::ToolResult {
                    id: uuid::Uuid::new_v4().to_string(),
                    output: String::new(),
                    error: Some(message),
                    duration_ms: 0,
                });
            }
            None
        }
    }
}

/// Attempt to parse a line of CLI output.
/// Tries stream-JSON first, then PTY regex fallback.
pub fn parse_cli_output(line: &str, cli_type: &str) -> Option<ProcessEvent> {
    // Try structured JSON
    if let Some(event) = parse_stream_json(line) {
        return Some(event);
    }

    // PTY regex fallback
    crate::process::pty_manager::PtyManager::parse_raw_output(&[line.to_string()]).into_iter().next()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_thinking() {
        let line = r#"{"type":"thinking","content":"Analyzing code...","is_final":false}"#;
        let event = parse_stream_json(line);
        assert!(event.is_some());
        match event.unwrap() {
            ProcessEvent::Thinking { content, is_final } => {
                assert_eq!(content, "Analyzing code...");
                assert!(!is_final);
            }
            _ => panic!("Expected Thinking event"),
        }
    }

    #[test]
    fn test_parse_tool_call() {
        let line = r#"{"type":"tool_use","id":"tc_1","name":"write_file","input":{"path":"src/main.rs","content":"fn main() {}"}}"#;
        let event = parse_stream_json(line);
        assert!(event.is_some());
        match event.unwrap() {
            ProcessEvent::ToolCall { id, name, .. } => {
                assert_eq!(id, "tc_1");
                assert_eq!(name, "write_file");
            }
            _ => panic!("Expected ToolCall event"),
        }
    }

    #[test]
    fn test_parse_cost_update() {
        let line = r#"{"type":"cost_update","prompt_tokens":1500,"completion_tokens":800,"cache_read":200,"cache_write":0,"cost_usd":0.042}"#;
        let event = parse_stream_json(line);
        assert!(event.is_some());
    }

    #[test]
    fn test_parse_unknown_type_returns_none() {
        let line = r#"{"type":"some_future_event","data":"value"}"#;
        let event = parse_stream_json(line);
        assert!(event.is_none());
    }
}