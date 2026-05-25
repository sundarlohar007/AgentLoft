use serde_json::Value;

pub struct BlastRadiusEngine;

impl BlastRadiusEngine {
    pub fn new() -> Self { Self }

    /// Identify affected paths from a tool call input.
    pub fn compute_affected_paths(&self, tool_name: &str, input: &Value) -> Vec<String> {
        match tool_name {
            "write_file" | "write_to_file" | "replace_in_file" => {
                let mut paths = Vec::new();
                if let Some(path) = input.get("path").and_then(|p| p.as_str()) {
                    paths.push(path.to_string());
                }
                if let Some(path) = input.get("filePath").and_then(|p| p.as_str()) {
                    paths.push(path.to_string());
                }
                // Check for multi-file operations
                if let Some(files) = input.get("files").and_then(|f| f.as_array()) {
                    for file in files {
                        if let Some(p) = file.as_str() {
                            paths.push(p.to_string());
                        }
                        if let Some(p) = file.get("path").and_then(|p| p.as_str()) {
                            paths.push(p.to_string());
                        }
                    }
                }
                paths
            }
            "bash" | "execute_command" => {
                // Heuristic: extract file paths from bash commands
                extract_paths_from_command(input)
            }
            _ => vec![],
        }
    }

    /// Compute blast radius score (0.0 - 1.0) based on:
    /// - Number of files affected
    /// - Type of change (create/modify/delete)
    /// - File sensitivity (config, test, src, etc.)
    pub fn compute_blast_score(&self, tool_name: &str, input: &Value, paths: &[String]) -> f64 {
        let file_count_factor = (paths.len() as f64 / 10.0).min(1.0);

        let sensitivity_factor = paths.iter()
            .map(|p| {
                if p.contains(".env") || p.contains("secret") || p.contains("credential") { 1.0 }
                else if p.contains("Cargo.toml") || p.contains("package.json") || p.contains("config") { 0.7 }
                else if p.contains("test") || p.contains("spec") { 0.5 }
                else if p.contains("src/") || p.contains("lib/") { 0.6 }
                else { 0.3 }
            })
            .fold(0.0f64, |a, b| a.max(b));

        let tool_factor = match tool_name {
            "bash" | "execute_command" => 0.8,
            "write_file" | "write_to_file" => 0.4,
            _ => 0.2,
        };

        let _ = input;
        (file_count_factor * 0.4 + sensitivity_factor * 0.4 + tool_factor * 0.2).min(1.0)
    }
}

/// Extract potential file paths from bash command strings.
fn extract_paths_from_command(input: &Value) -> Vec<String> {
    let cmd = input.get("command")
        .and_then(|c| c.as_str())
        .unwrap_or("");

    let mut paths = Vec::new();
    let re = regex::Regex::new(
        r"(?:^|\s)(?:\.{0,2}/)?(?:[\w.-]+/)*[\w.-]+\.\w{1,10}"
    ).ok();

    if let Some(re) = re {
        for cap in re.captures_iter(cmd) {
            let path = cap[0].trim().to_string();
            if !path.is_empty() {
                paths.push(path);
            }
        }
    }

    // Also check for common destructive patterns
    let destructive = ["rm ", "rm -rf", "git reset --hard", "DROP TABLE", "DELETE FROM"];
    if destructive.iter().any(|d| cmd.contains(d)) {
        paths.push("[DESTRUCTIVE COMMAND]".into());
    }

    paths
}

impl Default for BlastRadiusEngine {
    fn default() -> Self { Self::new() }
}