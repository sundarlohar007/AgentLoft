// PreCompact hook for CLI auto-compaction signal detection.
// Fires state snapshot BEFORE the CLI discards history.

/// Detect a pre_compact or context_limit_warning signal from CLI stdout.
pub fn detect_precompact_signal(line: &str) -> bool {
    let lower = line.to_lowercase();
    lower.contains("pre_compact")
        || lower.contains("context_limit_warning")
        || lower.contains("auto-compacting")
        || lower.contains("compacting conversation")
        || lower.contains("context window")
}

/// Format a structured state snapshot as a compact string for re-injection.
pub fn format_snapshot_injection(
    completed: &[String],
    open_items: &[String],
    file_hashes: &std::collections::HashMap<String, String>,
) -> String {
    let mut injection = String::from("<state_snapshot>\n");

    if !completed.is_empty() {
        injection.push_str("## Completed\n");
        for item in completed.iter().take(10) {
            injection.push_str(&format!("- {}\n", item));
        }
    }

    if !open_items.is_empty() {
        injection.push_str("\n## Still In Progress\n");
        for item in open_items.iter().take(10) {
            injection.push_str(&format!("- {}\n", item));
        }
    }

    if !file_hashes.is_empty() {
        injection.push_str(&format!("\n## File State ({} files)\n", file_hashes.len()));
        for (path, hash) in file_hashes.iter().take(5) {
            injection.push_str(&format!("- {}: {}\n", path, &hash[..8]));
        }
        if file_hashes.len() > 5 {
            injection.push_str(&format!("- ... and {} more files\n", file_hashes.len() - 5));
        }
    }

    injection.push_str("\n</state_snapshot>");
    injection
}