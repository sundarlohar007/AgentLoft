use std::path::Path;
use walkdir::WalkDir;

/// Scans the project root for common directories that should never be sent to
/// an AI agent (node_modules, target, .git, venv, etc.) and returns coaching
/// suggestions for .agentloftignore additions.
pub struct SourceVisitor {
    project_root: String,
}

#[derive(Debug)]
pub struct VisitResult {
    pub project_root: String,
    pub findings: Vec<IgnoreSuggestion>,
    pub existing_ignore_patterns: Vec<String>,
    pub recommendation_count: usize,
}

#[derive(Debug)]
pub struct IgnoreSuggestion {
    pub path: String,
    pub reason: String,
    pub estimated_token_savings: u64,
}

impl SourceVisitor {
    pub fn new(project_root: &str) -> Self {
        Self {
            project_root: project_root.to_string(),
        }
    }

    pub fn visit(&self) -> VisitResult {
        let root = Path::new(&self.project_root);
        let mut findings = Vec::new();

        // Directories to check at the project root
        let known_large_dirs: &[(&str, &str, u64)] = &[
            ("node_modules", "Node.js dependencies — never needed by agent", 500_000),
            ("target", "Rust build artifacts", 200_000),
            (".git", "Git history — agent can use git commands instead", 1_000_000),
            ("venv", "Python virtual environment", 100_000),
            (".venv", "Python virtual environment", 100_000),
            ("__pycache__", "Python bytecode cache", 50_000),
            (".next", "Next.js build output", 200_000),
            ("dist", "Build output directory", 100_000),
            ("build", "Build output directory", 100_000),
            (".turbo", "Turborepo cache", 50_000),
            ("coverage", "Test coverage output", 50_000),
            (".pytest_cache", "Pytest cache", 10_000),
            (".mypy_cache", "MyPy cache", 10_000),
            (".sass-cache", "Sass cache", 10_000),
            ("vendor", "Vendored dependencies (Go, Ruby)", 100_000),
            (".terraform", "Terraform state", 50_000),
            ("cdk.out", "AWS CDK output", 50_000),
        ];

        for (dir_name, reason, token_estimate) in known_large_dirs {
            let dir_path = root.join(dir_name);
            if dir_path.exists() && dir_path.is_dir() {
                findings.push(IgnoreSuggestion {
                    path: dir_path.to_string_lossy().to_string(),
                    reason: reason.to_string(),
                    estimated_token_savings: *token_estimate,
                });
            }
        }

        // Estimate total savings
        let total_unignored: u64 = findings
            .iter()
            .map(|f| f.estimated_token_savings)
            .sum();

        // Read existing .agentloftignore if present
        let ignore_path = root.join(".agentloftignore");
        let existing_patterns = if ignore_path.exists() {
            std::fs::read_to_string(&ignore_path)
                .unwrap_or_default()
                .lines()
                .map(|l| l.trim().to_string())
                .filter(|l| !l.is_empty() && !l.starts_with('#'))
                .collect()
        } else {
            Vec::new()
        };

        // Filter out already-ignored patterns
        let findings: Vec<_> = findings
            .into_iter()
            .filter(|f| {
                let relative = f.path.strip_prefix(&self.project_root).unwrap_or(&f.path);
                let relative = relative.trim_start_matches('/').trim_start_matches('\\');
                !existing_patterns.iter().any(|p| relative.contains(p.as_str()) || p.contains(relative))
            })
            .collect();

        let recommendation_count = findings.len();

        VisitResult {
            project_root: self.project_root.clone(),
            findings,
            existing_ignore_patterns: existing_patterns,
            recommendation_count,
        }
    }

    /// Generates the .agentloftignore content that should be present
    pub fn generate_ignore_content(&self) -> String {
        let mut content = String::from(
            "# AgentLoft — files never sent to any AI model\n\
             # Auto-generated suggestions from SourceVisitor\n\n\
             # Dependencies\n\
             node_modules/\n\n\
             # Build artifacts\n\
             target/\n\
             dist/\n\
             build/\n\
             .next/\n\
             .turbo/\n\n\
             # Version control\n\
             .git/\n\n\
             # Python\n\
             venv/\n\
             .venv/\n\
             __pycache__/\n\
             .pytest_cache/\n\
             .mypy_cache/\n\n\
             # Secrets & environment\n\
             .env\n\
             .env.*\n\
             *.pem\n\
             *.key\n\
             credentials.json\n\
             service-account.json\n\n\
             # Logs & coverage\n\
             *.log\n\
             coverage/\n\n\
             # IDE\n\
             .idea/\n\
             .vscode/\n\
             *.swp\n\
             *.swo\n\n\
             # OS\n\
             .DS_Store\n\
             Thumbs.db\n\
             Desktop.ini\n"
        );
        content
    }

    /// Compute total estimated token savings if all suggestions applied
    pub fn total_savings(&self, result: &VisitResult) -> u64 {
        result.findings.iter().map(|f| f.estimated_token_savings).sum()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::io::Write;

    #[test]
    fn test_detects_node_modules() {
        let tmp = std::env::temp_dir().join("agentloft_test_source_visitor");
        let _ = fs::remove_dir_all(&tmp);
        fs::create_dir_all(tmp.join("node_modules")).unwrap();
        fs::create_dir_all(tmp.join("src")).unwrap();

        let visitor = SourceVisitor::new(&tmp.to_string_lossy());
        let result = visitor.visit();

        assert!(result.findings.iter().any(|f| f.path.contains("node_modules")));

        let _ = fs::remove_dir_all(&tmp);
    }

    #[test]
    fn test_generates_ignore_content() {
        let visitor = SourceVisitor::new("/fake/project");
        let content = visitor.generate_ignore_content();
        assert!(content.contains("node_modules/"));
        assert!(content.contains(".env"));
        assert!(content.contains(".git/"));
    }

    #[test]
    fn test_respects_existing_ignore() {
        let tmp = std::env::temp_dir().join("agentloft_test_ignore");
        let _ = fs::remove_dir_all(&tmp);
        fs::create_dir_all(tmp.join("node_modules")).unwrap();

        let ignore_path = tmp.join(".agentloftignore");
        let mut f = fs::File::create(&ignore_path).unwrap();
        writeln!(f, "node_modules/").unwrap();

        let visitor = SourceVisitor::new(&tmp.to_string_lossy());
        let result = visitor.visit();
        assert_eq!(result.findings.iter().filter(|f| f.path.contains("node_modules")).count(), 0);

        let _ = fs::remove_dir_all(&tmp);
    }
}
