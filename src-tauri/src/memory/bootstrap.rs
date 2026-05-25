use std::path::Path;
use crate::types::{MemoryEntry, MemoryScope, MemoryCategory};

/// Bootstrap project memory by scanning existing config files.
/// Reads CLAUDE.md, AGENTS.md, GEMINI.md, and project manifests
/// to pre-populate memory entries at high confidence (0.95).
pub async fn bootstrap_project_memory(project_root: &Path) -> Vec<MemoryEntry> {
    let mut entries = Vec::new();

    let files_to_scan = [
        "CLAUDE.md",
        "AGENTS.md",
        "GEMINI.md",
        "package.json",
        "Cargo.toml",
        "go.mod",
        "pyproject.toml",
        "README.md",
    ];

    for filename in &files_to_scan {
        let path = project_root.join(filename);
        if path.exists() {
            if let Ok(content) = std::fs::read_to_string(&path) {
                let conventions = extract_conventions(filename, &content);
                for convention in conventions {
                    entries.push(MemoryEntry {
                        id: uuid::Uuid::new_v4().to_string(),
                        scope: MemoryScope::Project,
                        category: MemoryCategory::Convention,
                        content: format!("[{}] {}", filename, convention),
                        confidence: 0.95,
                        freshness: 1.0,
                        verified: true,
                        source_session_id: "bootstrap".into(),
                        created_at: chrono::Utc::now(),
                        last_used_at: chrono::Utc::now(),
                        use_count: 0,
                        tags: vec!["bootstrap".into(), filename.replace('.', "-")],
                    });
                }
            }
        }
    }

    entries
}

/// Extract convention-like statements from a config file.
fn extract_conventions(filename: &str, content: &str) -> Vec<String> {
    let mut conventions = Vec::new();

    if filename == "CLAUDE.md" || filename == "AGENTS.md" || filename == "GEMINI.md" {
        // Extract top-level bullet points and headings as conventions
        for line in content.lines() {
            let trimmed = line.trim();
            if trimmed.starts_with("- ") || trimmed.starts_with("* ") {
                let convention = trimmed[2..].trim().to_string();
                if convention.len() > 10 && convention.len() < 500 {
                    conventions.push(convention);
                }
            }
            if trimmed.starts_with("## ") {
                conventions.push(trimmed[3..].trim().to_string());
            }
        }
    }

    if filename == "package.json" {
        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(content) {
            if let Some(name) = parsed.get("name").and_then(|n| n.as_str()) {
                conventions.push(format!("Project name: {}", name));
            }
            if let Some(deps) = parsed.get("dependencies").and_then(|d| d.as_object()) {
                let keys: Vec<&str> = deps.keys().map(|k| k.as_str()).collect();
                conventions.push(format!("Dependencies: {}", keys.join(", ")));
            }
        }
    }

    if filename == "Cargo.toml" {
        if let Some(name_line) = content.lines().find(|l| l.starts_with("name")) {
            conventions.push(name_line.trim().to_string());
        }
    }

    conventions.truncate(20); // Cap at 20 conventions per file
    conventions
}