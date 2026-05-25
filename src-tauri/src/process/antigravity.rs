use super::*;
use async_trait::async_trait;
use tokio::process::Command;

pub struct AntigravityProcess;

#[async_trait]
impl CliProcess for AntigravityProcess {
    fn cli_type(&self) -> CliType { CliType::AntigravityCli }

    fn default_args(&self) -> Vec<String> {
        vec!["--output-format".into(), "stream-json".into()]
    }

    async fn spawn(&self, config: &CliConfig) -> Result<Child, String> {
        let experimental = std::env::var("agentloft_ANTIGRAVITY_EXPERIMENTAL")
            .unwrap_or_else(|_| "false".into());
        if experimental != "true" {
            return Err("Antigravity CLI is experimental. Set agentloft_ANTIGRAVITY_EXPERIMENTAL=true to enable.".into());
        }

        let mut cmd = Command::new(&config.command);
        cmd.args(&config.args)
            .args(self.default_args())
            .current_dir(&config.cwd)
            .envs(config.env.clone())
            .stdin(std::process::Stdio::piped())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .kill_on_drop(true);

        cmd.spawn().map_err(|e| format!("Failed to spawn Antigravity CLI: {}", e))
    }

    async fn parse_line(&self, line: &str) -> Option<ProcessEvent> {
        serde_json::from_str::<ProcessEvent>(line).ok()
    }
}