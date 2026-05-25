-- AgentLoft v1 — SQLite Schema

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    model_profile_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','completed','error','paused')),
    total_cost_usd REAL NOT NULL DEFAULT 0,
    total_tokens_in INTEGER NOT NULL DEFAULT 0,
    total_tokens_out INTEGER NOT NULL DEFAULT 0,
    cache_hit_rate REAL NOT NULL DEFAULT 0,
    metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK(role IN ('user','assistant','system')),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    token_count INTEGER,
    cost_usd REAL,
    attachments TEXT,
    tool_calls_in_message TEXT
);

CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
    content,
    content_rowid='rowid'
);

CREATE TABLE IF NOT EXISTS tool_calls (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    message_id TEXT NOT NULL,
    turn INTEGER NOT NULL,
    type TEXT NOT NULL,
    input TEXT NOT NULL DEFAULT '{}',
    output TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected','completed','error')),
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT,
    duration_ms INTEGER,
    permission_required INTEGER NOT NULL DEFAULT 0,
    permission_granted INTEGER,
    cost_usd REAL,
    affected_files TEXT,
    blast_radius_score REAL
);

CREATE TABLE IF NOT EXISTS checkpoints (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    turn INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    label TEXT,
    type TEXT NOT NULL DEFAULT 'auto' CHECK(type IN ('auto','manual','milestone')),
    file_snapshot TEXT NOT NULL DEFAULT '[]',
    context_snapshot TEXT NOT NULL DEFAULT '{}',
    cost_at_checkpoint REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS context_snapshots (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    trigger TEXT NOT NULL CHECK(trigger IN ('periodic','checkpoint','resume','manual')),
    completed_tasks TEXT NOT NULL DEFAULT '[]',
    constraints TEXT NOT NULL DEFAULT '[]',
    open_items TEXT NOT NULL DEFAULT '[]',
    file_hashes TEXT NOT NULL DEFAULT '{}',
    prompt_tokens INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    cache_read INTEGER NOT NULL DEFAULT 0,
    cache_write INTEGER NOT NULL DEFAULT 0,
    health_score INTEGER NOT NULL DEFAULT 100,
    warnings TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    root_path TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    stack TEXT NOT NULL DEFAULT '[]',
    active_model_profile_id TEXT,
    active_connection_profile_id TEXT,
    memory_budget_tokens INTEGER NOT NULL DEFAULT 4000,
    context_yaml_path TEXT NOT NULL,
    protected_paths TEXT NOT NULL DEFAULT '[]',
    agentloft_ignore TEXT NOT NULL DEFAULT '[]',
    session_count INTEGER NOT NULL DEFAULT 0,
    total_cost_usd REAL NOT NULL DEFAULT 0,
    metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS model_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    model_id TEXT NOT NULL,
    context_window INTEGER NOT NULL,
    max_output_tokens INTEGER NOT NULL,
    pricing TEXT NOT NULL DEFAULT '{}',
    supports_vision INTEGER NOT NULL DEFAULT 0,
    supports_streaming INTEGER NOT NULL DEFAULT 1,
    supports_tools INTEGER NOT NULL DEFAULT 1,
    capabilities TEXT NOT NULL DEFAULT '[]',
    is_default INTEGER NOT NULL DEFAULT 0,
    metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS connection_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    models TEXT NOT NULL DEFAULT '{}',
    auto_fallback INTEGER NOT NULL DEFAULT 1,
    fallback_notify INTEGER NOT NULL DEFAULT 1,
    quality_warning INTEGER NOT NULL DEFAULT 1,
    restore_primary INTEGER NOT NULL DEFAULT 1,
    retry_queue_max INTEGER NOT NULL DEFAULT 10,
    rate_limit_detection TEXT NOT NULL DEFAULT '{"claude":true,"codex":true,"antigravity":true}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_items (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    tags TEXT NOT NULL DEFAULT '[]',
    category TEXT NOT NULL DEFAULT '',
    downloads INTEGER NOT NULL DEFAULT 0,
    rating REAL NOT NULL DEFAULT 0,
    rating_count INTEGER NOT NULL DEFAULT 0,
    license TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL,
    security_scan TEXT NOT NULL DEFAULT '{"passed":false}',
    verified_publisher INTEGER NOT NULL DEFAULT 0,
    price_usd REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS zero_waste_metrics (
    session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
    mcp_schema_tokens_saved INTEGER NOT NULL DEFAULT 0,
    mcp_schemas_active INTEGER NOT NULL DEFAULT 0,
    mcp_schemas_total INTEGER NOT NULL DEFAULT 0,
    terminal_raw_tokens INTEGER NOT NULL DEFAULT 0,
    terminal_compressed_tokens INTEGER NOT NULL DEFAULT 0,
    terminal_compression_ratio REAL NOT NULL DEFAULT 0,
    self_edit_dedup_count INTEGER NOT NULL DEFAULT 0,
    self_edit_tokens_saved INTEGER NOT NULL DEFAULT 0,
    full_history_tokens_estimate INTEGER NOT NULL DEFAULT 0,
    checkpoint_tokens_actual INTEGER NOT NULL DEFAULT 0,
    checkpoint_compression_ratio REAL NOT NULL DEFAULT 0,
    total_tokens_saved INTEGER NOT NULL DEFAULT 0,
    combined_savings_ratio REAL NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
    key TEXT NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    scope TEXT NOT NULL DEFAULT 'global' CHECK(scope IN ('global','project','session')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (key, scope)
);

CREATE TABLE IF NOT EXISTS network_audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    provider TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    model TEXT NOT NULL,
    token_count INTEGER NOT NULL,
    cost_usd REAL NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_project ON sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_tool_calls_session ON tool_calls(session_id);
CREATE INDEX IF NOT EXISTS idx_tool_calls_status ON tool_calls(status);
CREATE INDEX IF NOT EXISTS idx_checkpoints_session ON checkpoints(session_id);
CREATE INDEX IF NOT EXISTS idx_context_snapshots_session ON context_snapshots(session_id);