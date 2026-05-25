use std::collections::HashMap;

pub struct PermissionSystem {
    defaults: HashMap<String, PermissionDefault>,
    protected_paths: Vec<String>,
    session_overrides: HashMap<String, PermissionDecision>,
}

#[derive(Debug, Clone, Copy)]
pub enum PermissionDefault {
    Always,
    Ask,
    Deny,
}

#[derive(Debug, Clone)]
pub enum PermissionDecision {
    Allow,
    Deny(String),
    Ask,
}

impl PermissionSystem {
    pub fn new() -> Self {
        let mut defaults = HashMap::new();
        defaults.insert("write_file".into(), PermissionDefault::Ask);
        defaults.insert("bash".into(), PermissionDefault::Ask);
        defaults.insert("read_file".into(), PermissionDefault::Always);
        defaults.insert("network".into(), PermissionDefault::Ask);
        defaults.insert("mcp".into(), PermissionDefault::Ask);

        Self {
            defaults,
            protected_paths: vec![
                ".env".into(), ".env.*".into(), "*.key".into(),
                "*.pem".into(), "secrets/".into(), "credentials.*".into(),
            ],
            session_overrides: HashMap::new(),
        }
    }

    /// Check if a tool call needs permission.
    /// Returns Allow, Deny(reason), or Ask.
    pub fn check_permission(
        &self,
        _session_id: &str,
        tool_type: &str,
        affected_paths: &[String],
    ) -> PermissionDecision {
        // Check session overrides first
        if let Some(decision) = self.session_overrides.get(tool_type) {
            return decision.clone();
        }

        // Check if any affected path is protected
        for path in affected_paths {
            if self.is_protected_path(path) {
                return PermissionDecision::Deny(
                    format!("Path '{}' is protected. Remove from protected_paths to allow.", path)
                );
            }
        }

        // Use default for this tool type
        match self.defaults.get(tool_type).unwrap_or(&PermissionDefault::Ask) {
            PermissionDefault::Always => PermissionDecision::Allow,
            PermissionDefault::Deny => PermissionDecision::Deny(
                format!("Tool '{}' is denied by default.", tool_type)
            ),
            PermissionDefault::Ask => PermissionDecision::Ask,
        }
    }

    /// Check if a path matches any protected pattern.
    fn is_protected_path(&self, path: &str) -> bool {
        self.protected_paths.iter().any(|pattern| {
            if pattern.contains('*') {
                let re_pattern = pattern.replace(".", r"\.").replace("*", ".*");
                regex::Regex::new(&format!("^{}$", re_pattern))
                    .map(|re| re.is_match(path))
                    .unwrap_or(false)
            } else {
                path.contains(pattern.as_str())
            }
        })
    }

    /// Set a session-level permission override.
    pub fn set_session_override(&mut self, tool_type: &str, decision: PermissionDecision) {
        self.session_overrides.insert(tool_type.into(), decision);
    }
}

impl Default for PermissionSystem {
    fn default() -> Self { Self::new() }
}