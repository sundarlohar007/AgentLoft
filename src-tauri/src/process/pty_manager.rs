use portable_pty::{PtySize, CommandBuilder, PtySystem, native_pty_system};
use std::io::{Read, Write};

pub struct PtyManager {
    pty_system: Box<dyn PtySystem + Send>,
}

impl PtyManager {
    pub fn new() -> Self {
        Self {
            pty_system: native_pty_system(),
        }
    }

    pub fn spawn(&self, command: &str, args: &[String], cwd: &str, envs: &[(String, String)]) -> Result<PtyHandle, String> {
        let pty_pair = self.pty_system
            .openpty(PtySize::default())
            .map_err(|e| format!("Failed to open PTY: {}", e))?;

        let mut cmd = CommandBuilder::new(command);
        cmd.args(args);
        cmd.cwd(cwd);
        for (k, v) in envs {
            cmd.env(k, v);
        }

        let child = pty_pair.slave
            .spawn_command(cmd)
            .map_err(|e| format!("Failed to spawn in PTY: {}", e))?;

        Ok(PtyHandle {
            master: pty_pair.master,
            child,
        })
    }

    /// Regex-based fallback parser for PTY mode when stream-JSON unavailable.
    /// Extracts tool calls, file writes, and errors from raw terminal output.
    pub fn parse_raw_output(lines: &[String]) -> Vec<super::ProcessEvent> {
        let mut events = Vec::new();
        let write_re = regex::Regex::new(r"(?i)(?:Writing|Creating|Updating)\s+(?:file\s+)?`?([^\s`]+)`?").ok();
        let error_re = regex::Regex::new(r"(?i)(?:Error|ERROR|FAILED):\s*(.+)").ok();
        let bash_re = regex::Regex::new(r"(?i)(?:Running|Executing):\s*`?([^`]+)`?").ok();

        for line in lines {
            if let Some(re) = &write_re {
                if let Some(caps) = re.captures(line) {
                    events.push(super::ProcessEvent::ToolCall {
                        id: uuid::Uuid::new_v4().to_string(),
                        name: "write_file".into(),
                        input: serde_json::json!({"path": caps[1].to_string()}),
                    });
                    continue;
                }
            }
            if let Some(re) = &bash_re {
                if let Some(caps) = re.captures(line) {
                    events.push(super::ProcessEvent::ToolCall {
                        id: uuid::Uuid::new_v4().to_string(),
                        name: "bash".into(),
                        input: serde_json::json!({"command": caps[1].to_string()}),
                    });
                    continue;
                }
            }
            if let Some(re) = &error_re {
                if let Some(caps) = re.captures(line) {
                    events.push(super::ProcessEvent::ToolResult {
                        id: uuid::Uuid::new_v4().to_string(),
                        output: String::new(),
                        error: Some(caps[1].to_string()),
                        duration_ms: 0,
                    });
                    continue;
                }
            }
        }

        events
    }
}

pub struct PtyHandle {
    pub master: Box<dyn portable_pty::MasterPty + Send>,
    pub child: Box<dyn portable_pty::Child + Send + std::fmt::Debug>,
}

impl PtyHandle {
    pub fn write(&mut self, data: &[u8]) -> Result<(), String> {
        self.master.write_all(data).map_err(|e| format!("PTY write error: {}", e))
    }

    pub fn read(&mut self, buf: &mut [u8]) -> Result<usize, String> {
        self.master.read(buf).map_err(|e| format!("PTY read error: {}", e))
    }
}