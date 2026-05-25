use super::*;
use async_trait::async_trait;
use tokio::process::Command;

pub struct CodexCliProcess;

#[async_trait]
impl CliProcess for CodexCliProcess {
    fn cli_type(&self) -> CliType { CliType::CodexCli }

    fn default_args(&self) -> Vec<String> {
        vec!["exec".into(), "--json".into()]
    }

    async fn spawn(&self, config: &CliConfig) -> Result<Child, String> {
        let mut cmd = Command::new(&config.command);
        cmd.args(&config.args)
            .args(self.default_args())
            .current_dir(&config.cwd)
            .envs(config.env.clone())
            .stdin(std::process::Stdio::piped())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .kill_on_drop(true);

        cmd.spawn().map_err(|e| format!("Failed to spawn Codex CLI: {}", e))
    }

    async fn parse_line(&self, line: &str) -> Option<ProcessEvent> {
        serde_json::from_str::<ProcessEvent>(line).ok()
    }
}