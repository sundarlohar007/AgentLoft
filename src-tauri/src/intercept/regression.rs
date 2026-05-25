use std::process::Command;

pub struct RegressionShield;

#[derive(Debug, Clone)]
pub struct TestResult {
    pub passed: u32,
    pub failed: u32,
    pub total: u32,
    pub output: String,
}

impl RegressionShield {
    pub fn new() -> Self { Self }

    /// Detect test files in a list of affected paths.
    /// Returns list of test paths that were modified.
    pub fn detect_test_files(&self, affected_paths: &[String]) -> Vec<String> {
        affected_paths.iter()
            .filter(|p| {
                p.contains("test") || p.contains("spec") || p.contains("__tests__")
                    || p.ends_with(".test.ts") || p.ends_with(".test.tsx")
                    || p.ends_with(".spec.ts") || p.ends_with("_test.rs")
                    || p.ends_with(".test.py") || p.ends_with("_test.go")
            })
            .cloned()
            .collect()
    }

    /// Run the project's test suite.
    /// Returns parsed test results.
    pub fn run_tests(&self, project_root: &std::path::Path) -> Result<TestResult, String> {
        // Detect test runner from project config
        let test_cmd = if project_root.join("package.json").exists() {
            vec!["npm", "test", "--", "--reporter=json"]
        } else if project_root.join("Cargo.toml").exists() {
            vec!["cargo", "test"]
        } else {
            return Ok(TestResult {
                passed: 0, failed: 0, total: 0,
                output: "No test runner detected".into(),
            });
        };

        let output = Command::new(test_cmd[0])
            .args(&test_cmd[1..])
            .current_dir(project_root)
            .output()
            .map_err(|e| format!("Failed to run tests: {}", e))?;

        let stdout = String::from_utf8_lossy(&output.stdout).to_string();
        let stderr = String::from_utf8_lossy(&output.stderr).to_string();
        let combined = format!("{}\n{}", stdout, stderr);

        // Simple heuristic parsing of test results
        let passed = combined.matches("pass").count() as u32;
        let failed = combined.matches("fail").count() as u32;
        let total = passed + failed;

        Ok(TestResult { passed, failed: failed.min(total), total: total.max(1), output: combined })
    }
}

impl Default for RegressionShield {
    fn default() -> Self { Self::new() }
}