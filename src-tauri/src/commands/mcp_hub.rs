use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct McpHubConfig {
    pub enabled: bool,
}