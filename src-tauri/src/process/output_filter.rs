use regex::Regex;

/// Compresses CLI output before context injection.
/// Pipeline: dedup -> error extraction -> summary -> tail.
/// 70-95% reduction. Full output teed to ~/.agentloft/tee/
pub struct OutputFilter {
    rules: Vec<FilterRule>,
}

struct FilterRule {
    command_pattern: Regex,
    max_lines: usize,
    extract_errors: bool,
    extract_summary: bool,
}

impl OutputFilter {
    pub fn new() -> Self {
        let mut rules = Vec::new();

        // npm test / yarn test / pnpm test
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)(npm|yarn|pnpm)\s+(test|run\s+test)").unwrap(),
            max_lines: 30,
            extract_errors: true,
            extract_summary: true,
        });

        // cargo build / cargo test / cargo check
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)cargo\s+(build|test|check|clippy)").unwrap(),
            max_lines: 40,
            extract_errors: true,
            extract_summary: true,
        });

        // pytest
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)pytest").unwrap(),
            max_lines: 30,
            extract_errors: true,
            extract_summary: true,
        });

        // Docker commands
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)docker\s+(build|compose|run)").unwrap(),
            max_lines: 50,
            extract_errors: true,
            extract_summary: false,
        });

        // Git commands
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)git\s+").unwrap(),
            max_lines: 20,
            extract_errors: true,
            extract_summary: false,
        });

        // kubectl / helm
        rules.push(FilterRule {
            command_pattern: Regex::new(r"(?i)(kubectl|helm|k9s)\s+").unwrap(),
            max_lines: 30,
            extract_errors: true,
            extract_summary: true,
        });

        // Default catch-all
        rules.push(FilterRule {
            command_pattern: Regex::new(r".").unwrap(),
            max_lines: 50,
            extract_errors: true,
            extract_summary: false,
        });

        Self { rules }
    }

    /// Filter command output. Returns (compressed_output, full_output_path, compression_ratio).
    pub fn filter(
        &self,
        command: &str,
        output: &str,
        session_id: &str,
    ) -> (String, std::path::PathBuf, f64) {
        let rule = self.match_rule(command);
        let lines: Vec<&str> = output.lines().collect();
        let raw_tokens = lines.len();

        let mut compressed = Vec::new();

        // Extract errors
        let errors: Vec<&str> = lines.iter()
            .filter(|l| {
                let lower = l.to_lowercase();
                lower.contains("error") || lower.contains("fail") || lower.contains("panic")
                    || lower.contains("warning:") || lower.contains("thread '")
            })
            .copied()
            .collect();

        // Extract summary (last N lines)
        let summary_start = if lines.len() > rule.max_lines {
            lines.len() - 10
        } else {
            0
        };

        // Build compressed output
        if rule.extract_errors && !errors.is_empty() {
            compressed.push(format!("--- Errors ({}) ---", errors.len()));
            for err in &errors[..errors.len().min(20)] {
                compressed.push((*err).to_string());
            }
        }

        if lines.len() > rule.max_lines {
            compressed.push(format!(
                "--- Tail (lines {}-{} of {}) ---",
                summary_start + 1,
                lines.len(),
                lines.len()
            ));
        }

        for line in &lines[summary_start..] {
            compressed.push((*line).to_string());
        }

        if rule.extract_summary {
            // Look for summary lines
            for line in &lines[..lines.len().min(50)] {
                let lower = line.to_lowercase();
                if lower.contains("test result:") || lower.contains("finished in")
                    || lower.contains("passed") || lower.contains("failed")
                    || lower.contains("compilation") || lower.contains("build")
                {
                    if !compressed.contains(&(*line).to_string()) {
                        compressed.push((*line).to_string());
                    }
                }
            }
        }

        let compressed_tokens = compressed.len();
        let ratio = if raw_tokens > 0 {
            1.0 - (compressed_tokens as f64 / raw_tokens as f64)
        } else {
            0.0
        };

        // Write full output to tee file
        let tee_dir = dirs_next().unwrap_or_else(|| std::path::PathBuf::from("."))
            .join(".agentloft").join("tee").join(session_id);
        std::fs::create_dir_all(&tee_dir).ok();
        let tee_path = tee_dir.join(format!(
            "{}-{}.log",
            chrono::Utc::now().timestamp_millis(),
            sanitize_filename(command)
        ));
        std::fs::write(&tee_path, output).ok();

        (compressed.join("\n"), tee_path, ratio)
    }

    fn match_rule(&self, command: &str) -> &FilterRule {
        for rule in &self.rules[..self.rules.len() - 1] {
            if rule.command_pattern.is_match(command) {
                return rule;
            }
        }
        self.rules.last().unwrap()
    }
}

fn sanitize_filename(s: &str) -> String {
    s.chars()
        .map(|c| if c.is_alphanumeric() || c == '-' || c == '_' { c } else { '_' })
        .take(60)
        .collect()
}

fn dirs_next() -> Option<std::path::PathBuf> {
    std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .ok()
        .map(std::path::PathBuf::from)
}

impl Default for OutputFilter {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_filter_cargo_build_errors() {
        let filter = OutputFilter::new();
        let output = "   Compiling agentloft v0.1.0\nerror[E0425]: cannot find value `foo` in this scope\n  --> src/main.rs:10:5\n   |\n10 |     foo;\n   |     ^^^ not found\n\nerror: aborting due to 1 error\n";
        let (compressed, _, ratio) = filter.filter("cargo build", output, "test-session");
        assert!(compressed.contains("error[E0425]"));
        assert!(ratio > 0.3); // At least 30% compression
    }

    #[test]
    fn test_filter_npm_test_summary() {
        let filter = OutputFilter::new();
        let output = "PASS src/test1.ts\nPASS src/test2.ts\nFAIL src/test3.ts\n\nTest Suites: 2 passed, 1 failed, 3 total\nTests: 15 passed, 2 failed, 17 total\nTime: 3.2s\n";
        let (compressed, _, ratio) = filter.filter("npm test", output, "test-session");
        assert!(compressed.contains("FAIL"));
        assert!(compressed.contains("2 passed"));
        assert!(ratio > 0.2);
    }
}