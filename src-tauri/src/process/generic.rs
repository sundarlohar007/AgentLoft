use super::*;
use async_trait::async_trait;
use tokio::process::Command;

pub struct GenericProcess {
    pub name: String,
}

#[async_trait]
impl CliProcess for GenericProcess {
    fn cli_type(&self) -> CliType { CliType::Generic(self.name.clone()) }

    fn default_args(&self) -> Vec<String> { vec![] }

    async fn spawn(&self, config: &CliConfig) -> Result<Child, String> {
        let mut cmd = Command::new(&config.command);
        cmd.args(&config.args)
            .current_dir(&config.cwd)
            .envs(config.env.clone())
            .stdin(std::process::Stdio::piped())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::piped())
            .kill_on_drop(true);

        cmd.spawn().map_err(|e| format!("Failed to spawn {}: {}", self.name, e))
    }

    async fn parse_line(&self, line: &str) -> Option<ProcessEvent> {
        serde_json::from_str::<ProcessEvent>(line).ok()
    }
}