// CLI detection for onboarding wizard
use std::process::Command;

pub fn detect_cli(name: &str) -> Option<String> {
    let cmd = match name {
        "claude" => vec!["claude", "--version"],
        "codex" => vec!["codex", "--version"],
        "antigravity" => vec!["antigravity", "--version"],
        "node" => vec!["node", "--version"],
        "python" => vec!["python3", "--version"],
        "docker" => vec!["docker", "--version"],
        _ => return None,
    };

    Command::new(cmd[0]).arg(cmd.get(1).copied().unwrap_or("--version"))
        .output().ok()
        .and_then(|o| String::from_utf8(o.stdout).ok())
        .map(|s| s.trim().to_string())
}

pub fn get_install_command(cli: &str) -> Option<&str> {
    match cli {
        "claude" => {
            if cfg!(target_os = "macos") { Some("brew install claude-code") }
            else if cfg!(target_os = "windows") { Some("winget install Anthropic.ClaudeCode") }
            else { Some("npm install -g @anthropic-ai/claude-code") }
        }
        "codex" => {
            if cfg!(target_os = "macos") { Some("brew install codex") }
            else if cfg!(target_os = "windows") { Some("winget install OpenAI.Codex") }
            else { Some("npm install -g @openai/codex") }
        }
        "antigravity" => {
            if cfg!(target_os = "macos") { Some("brew install antigravity") }
            else if cfg!(target_os = "windows") { Some("winget install Google.Antigravity") }
            else { Some("npm install -g antigravity") }
        }
        _ => None,
    }
}

#[tauri::command]
pub fn detect_installed_clis() -> Result<Vec<serde_json::Value>, String> {
    let clis = ["claude", "codex", "antigravity", "node", "python", "docker"];
    let results: Vec<serde_json::Value> = clis.iter().map(|name| {
        let version = detect_cli(name);
        serde_json::json!({
            "name": name,
            "installed": version.is_some(),
            "version": version.unwrap_or_default(),
            "install_command": get_install_command(name),
        })
    }).collect();
    Ok(results)
}