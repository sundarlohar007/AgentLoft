# Tasks: AgentLoft v1 - Multi-CLI GUI Wrapper

**Input**: Design documents from `specs/001-agentloft-gui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ipc-events.md, quickstart.md
**Tests**: Not explicitly requested in spec. Test tasks included where critical for CLI parser correctness and safety layer.
**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Rust backend**: `src-tauri/src/`
- **React frontend**: `src/`
- **Tests**: `tests/rust/`, `tests/frontend/`, `tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, monorepo scaffolding, dependency installation, dev tooling

- [X] T001 Scaffold Tauri 2 + React 19 monorepo: `src-tauri/` (Rust) and `src/` (TypeScript), configure Cargo.toml with tauri 2.x, tokio, portable-pty, sqlx, lancedb, ort, notify, serde, serde_json, uuid, sha2, walkdir dependencies
- [X] T002 [P] Initialize React frontend with TypeScript 5.x, Vite, React 19, React Router, Tailwind CSS 4, Radix UI primitives, Zustand, TanStack Query in package.json
- [X] T003 [P] Configure dev tooling: ESLint + Prettier for TypeScript, rustfmt + clippy for Rust, husky pre-commit hooks, .editorconfig
- [X] T004 [P] Create Tauri capability config at src-tauri/capabilities/default.json - enable shell, fs, path, event permissions
- [X] T005 [P] Configure GitHub Actions CI at .github/workflows/ci.yml - cargo test + cargo clippy + pnpm lint + pnpm test
- [X] T006 [P] Configure GitHub Actions CD at .github/workflows/release.yml - tauri build for macOS (aarch64 + x86_64), Windows (x86-64), Linux (x86-64 AppImage + deb), assert installer <25MB compressed in build job
- [X] T007 [P] Create global TypeScript types from data-model.md at src/lib/types.ts - all 13 entity interfaces (Session, Message, ToolCall, Checkpoint, ContextSnapshot, MemoryEntry, Project, ModelProfile, ConnectionProfile, MarketplaceItem, ZeroWasteMetrics, Attachment, Settings)
- [X] T008 [P] Create IPC event types from contracts/ipc-events.md at src/lib/ipc-types.ts - AgentToGuiFrame and GuiToAgentFrame discriminated unions with all supporting types (DiffHunk, MemoryExtraction, PermissionRequest)
- [X] T009 Create Rust shared types at src-tauri/src/types.rs - all Entity structs matching data-model.md with serde Serialize/Deserialize derives
- [X] T010 [P] Create .agentloft/ context.yaml template with default settings and .agentloftignore template with common patterns (node_modules, .env, *.log)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Tauri shell, IPC bridge, database schema, and CLI process spawning infrastructure. MUST complete before ANY user story.

**!! CRITICAL**: No user story work begins until this phase is complete.

- [X] T011 Create Tauri app entry point at src-tauri/src/main.rs - initialize SQLite via sqlx, initialize LanceDB, register all command handlers, start event emitter, configure app window (title, size, min size, glassmorphism blur support)
- [X] T012 [P] Implement SQLite schema and migrations at src-tauri/src/db/schema.sql - create sessions, messages, tool_calls, checkpoints, context_snapshots, projects, model_profiles, connection_profiles, marketplace_items, zero_waste_metrics, settings tables
- [X] T013 [P] Implement SQLite connection pool and migration runner at src-tauri/src/db/mod.rs - sqlx::SqlitePool, run migrations on startup, WAL mode
- [X] T014 [P] Implement Tauri event bus wrapper at src-tauri/src/events.rs - typed emit functions for each AgentToGuiFrame variant (emit_thinking, emit_text, emit_tool_call, emit_tool_result, emit_diff, emit_token_info, emit_context_stats, emit_permission_request, emit_checkpoint, emit_memory_suggestion, emit_error, emit_narrative, emit_context_snapshot, emit_cache_status)
- [X] T015 Implement generic CLI process trait at src-tauri/src/process/mod.rs - CliProcess trait with spawn, send_message, cancel, get_output, parse_event methods; ProcessOrchestrator struct managing active process map
- [X] T016 [P] Implement Claude Code process integration at src-tauri/src/process/claude_code.rs - spawn with --print --output-format stream-json, parse tool_use/text_chunk/permission_request/cost_update events
- [X] T017 [P] Implement Codex CLI process integration at src-tauri/src/process/codex.rs - spawn with exec --json, parse structured output events
- [X] T018 [P] Implement Antigravity CLI process integration at src-tauri/src/process/antigravity.rs - spawn with --output-format stream-json, gate behind agentloft_ANTIGRAVITY_EXPERIMENTAL env var, parse output format
- [X] T019 [P] Implement OpenAI-compatible generic process at src-tauri/src/process/generic.rs - spawn any OpenAI-compatible endpoint via configurable command template, PTY fallback for non-stream-JSON CLIs
- [X] T020 Implement PTY manager at src-tauri/src/process/pty_manager.rs - portable-pty spawn, bidirectional I/O, ConPTY support for Windows, regex-based fallback parser for PTY mode when stream-JSON unavailable
- [X] T021 Create React app shell at src/app/layout.tsx - bento grid layout (200px file panel | 1fr chat | 240px cockpit), glassmorphism theme tokens (mint #7cc7a0, dark gradient canvas, blur levels), Inter/JetBrains Mono fonts
- [X] T022 [P] Create Tauri IPC wrapper at src/lib/tauri.ts - typed invoke() wrappers for all GuiToAgentFrame types, typed listen() hooks for all AgentToGuiFrame types, connection state management
- [X] T023 [P] Create Zustand session store at src/stores/sessionStore.ts - active session state, messages array, tool calls map, context stats, cost accumulator, checkpoint list
- [X] T024 [P] Create Zustand settings store at src/stores/settingsStore.ts - global/project/session scoped settings with inheritance (Session > Project > Global), scope badges
- [X] T025 [P] Create shared UI primitives at src/components/shared/ - GlassPanel (blur, border, rounded corners per PRD S20), GlassButton, GlassInput, GlassBadge, Tooltip, ContextMenu, KeyboardShortcut, StatusIndicator

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Multi-CLI GUI Shell (Priority: P1) MVP

**Goal**: Spawn CLI agents, render streaming text and tool calls visually, provide universal command palette, floating terminal, raw file mode, and CLI flags visual editor.

**Independent Test**: Launch app, select Claude Code backend, type "Write a hello world function", see streamed text response with tool call cards and Monaco diff rendering.

### Implementation for User Story 1

- [X] T026 [P] [US1] Create ChatPanel component at src/components/chat/ChatPanel.tsx - message list with virtualized scrolling, auto-scroll, streaming text rendering with markdown (MDX + Shiki), user/assistant message bubbles
- [X] T027 [P] [US1] Create ChatInput component at src/components/chat/ChatInput.tsx - textarea with auto-resize, send button, attachment picker, model selector dropdown, Enter to send / Shift+Enter newline
- [X] T028 [US1] Implement session creation command handler at src-tauri/src/commands/session.rs - create_session (select CLI backend, spawn process), send_message (write to process stdin), cancel_session (send interrupt), list_sessions, get_session
- [X] T029 [US1] Implement stream-JSON output parser at src-tauri/src/process/parser.rs - parse Claude Code, Codex CLI, and Antigravity stream-JSON events to AgentToGuiFrame, handle malformed JSON gracefully with PTY fallback
- [X] T030 [P] [US1] Create ToolCallCard component at src/components/chat/ToolCallCard.tsx - renders tool name, input summary, status spinner, duration, output preview, expandable details
- [X] T031 [P] [US1] Create PermissionModal component at src/components/chat/PermissionModal.tsx - shows permission_request detail, affected paths with file icons, Approve Once / Approve All / Reject buttons, "Always for session" checkbox, keyboard shortcuts (Ctrl+Y approve, Ctrl+N reject)
- [X] T032 [P] [US1] Create Universal Command Palette at src/components/chat/CommandPalette.tsx - Ctrl+K trigger, searchable list of all slash commands from all 3 CLIs, grouped by CLI source, keyboard navigation, recent commands section
- [X] T033 [US1] Implement CLI slash command passthrough at src-tauri/src/commands/process.rs - receive slash_command from frontend, write to CLI stdin, emit slash_command event to frontend for visual feedback
- [X] T034 [P] [US1] Create FloatingMiniTerminal at src/components/chat/MiniTerminal.tsx - Ctrl+\ toggle, xterm.js PTY renderer, transparent background overlay, resize handle, command history
- [X] T035 [P] [US1] Create SettingsPanel - CLI Flags at src/components/shared/SettingsFlags.tsx - Visual Flag Builder: every CLI flag mapped to form control, live raw command preview string at bottom, incompatible flag detection (red highlight), flag presets dropdown, search flags
- [X] T036 [P] [US1] Create ConfigFileEditor at src/components/shared/ConfigFileEditor.tsx - Monaco Editor for CLAUDE.md, AGENTS.md, GEMINI.md, .claude/settings.json, MCP configs with formatting and validation
- [X] T037 [P] [US1] Implement Raw File Mode at src/components/chat/RawFileToggle.tsx - toggle per attachment in chat input, strips line numbers when enabled, shows token savings estimate (70% reduction), "Send with line numbers" / "Send raw" label

- [X] T037b [P] [US1] Create MonacoDiffRenderer at src/components/diff/DiffRenderer.tsx -- Monaco Editor diff view with per-hunk Accept/Reject/Edit buttons, Accept All / Reject All toolbar, syntax highlighting, inline + side-by-side toggle, linked scroll with ChatPanel
- [X] T038 [US1] Create Rust command for session I/O at src-tauri/src/commands/process.rs - handle user_message (write to CLI stdin), handle raw_file attachments (load file, strip line numbers if raw_mode), handle cancel (SIGINT to child process)
- [X] T039 [P] [US1] Create FileTreePanel at src/components/chat/FileTreePanel.tsx - virtualized tree view (1000+ files <200ms), file icons by extension, git status decoration, right-click context menu, drag to chat to attach
- [X] T040 [US1] Implement file watcher at src-tauri/src/commands/files.rs - notify crate watcher for project directory, emit file change events, update file tree on frontend, debounce rapid changes

**Checkpoint**: User Story 1 - Multi-CLI chat with streaming text, tool calls, permission modals, command palette, CLI flags editor, and file tree is fully functional.

---

## Phase 4: User Story 2 - Persistent Memory System (Priority: P1)

**Goal**: LanceDB persistent memory with auto-extraction, semantic injection, memory browser, and Memory Bootstrap on first project open.

**Independent Test**: Run a session, let auto-extraction create memories, start new session, verify relevant memories injected into context. Browse memories in Memory Browser.

### Implementation for User Story 2

- [X] T041 [US2] Implement LanceDB store at src-tauri/src/memory/store.rs - initialize LanceDB at agentloft_MEMORY_DIR, create/fetch table per scope (project/user/agent/org), insert/update/delete memory entries, store 384-dim embeddings
- [X] T042 [US2] Implement ONNX embedder at src-tauri/src/memory/embeddings.rs - load bundled ONNX embedding model (<50MB), generate 384-dim embeddings from text, <50ms per embedding, cache model in memory, fallback error on missing model file
- [X] T043 [US2] Implement semantic retrieval at src-tauri/src/memory/retrieval.rs - top-K cosine similarity search via LanceDB, filter by scope + category, apply confidence threshold + freshness decay, limit to configurable 4000-token budget, return with scores
- [X] T044 [US2] Implement memory extraction trigger at src-tauri/src/commands/memory.rs - post-session: send session summary to extraction pipeline, extract memories by category with confidence scores, auto-accept extracted memories, store in LanceDB, emit memory_suggestion events to frontend
- [X] T045 [US2] Implement memory injection at src-tauri/src/context/injection.rs - pre-session: semantic retrieval against project+user scopes, format retrieved memories as context preamble, inject into first turn of new session, respect memory_budget_tokens from project config
- [X] T046 [US2] Implement Memory Bootstrap at src-tauri/src/memory/bootstrap.rs - on first project open: scan for CLAUDE.md, AGENTS.md, GEMINI.md, package.json, Cargo.toml, go.mod, pyproject.toml, README.md; parse conventions from each; create MemoryEntry at 0.95 confidence; non-blocking background task
- [X] T047 [P] [US2] Create MemoryBrowser panel at src/components/memory/MemoryBrowser.tsx - list all memories grouped by scope, filter by category/tags/search, sort by confidence/freshness/date, expand to read full content, delete button with confirmation
- [X] T048 [P] [US2] Create MemoryEditor component at src/components/memory/MemoryEditor.tsx - create new memory (scope, category, content, tags), edit existing memory, confidence slider (0.0-1.0), mark as verified toggle
- [X] T049 [P] [US2] Create MemoryDiff component at src/components/memory/MemoryDiff.tsx - shows what changed in memory after a session (added/updated/removed), accept/reject per change, "Accept all" button
- [X] T050 [P] [US2] Create MemoryToast notification at src/components/memory/MemoryToast.tsx - non-blocking toast "12 memories extracted - review when ready" with click-to-review link, auto-dismiss after 8 seconds, 24-hour review window timer, "Dont show again" option
- [X] T051 [US2] Implement memory conflict detection at src-tauri/src/memory/conflict.rs - detect semantically similar memories (cosine > 0.85), flag conflicts in memory browser, suggest merge, user resolves with keep-both/keep-newer/keep-higher-confidence
- [X] T052 [US2] Implement /forget command at src-tauri/src/commands/memory.rs - delete memory by ID or category, confirmation required for bulk delete, emit memory change event

**Checkpoint**: User Story 2 - Persistent memory with LanceDB, auto-extraction, semantic injection, Memory Bootstrap, browser/editor/diff UI, and conflict detection fully functional.

---

## Phase 5: User Story 3 - Agent Cockpit & Safety (Priority: P1)

**Goal**: Real-time agent observability with tool call feed, blast radius preview, permission system, intent gap detection, regression shield, and one-click rollback.

**Independent Test**: Trigger a multi-file write, verify blast radius preview shows affected files, approve tool call, verify rollback restores pre-write state.

### Implementation for User Story 3

- [X] T053 [P] [US3] Create CockpitLayout panel at src/components/cockpit/CockpitLayout.tsx - 240px right sidebar, collapsible sections, panel visibility toggles, scrollable with sticky headers, glass panel styling
- [X] T054 [P] [US3] Create ToolCallFeed component at src/components/cockpit/ToolCallFeed.tsx - real-time scrolling list of tool_call events, each card shows: tool name icon, input summary, status badge (pending/approved/running/done/error), duration timer, expand for full input/output
- [X] T055 [P] [US3] Create BlastRadiusPreview component at src/components/cockpit/BlastRadiusPreview.tsx - before tool execution: list all affected file paths, file type icons, change type (create/modify/delete), estimated lines changed, risk level badge (low/medium/high/critical), "This is too broad" warning at >5 files
- [X] T056 [US3] Implement tool call intercept proxy at src-tauri/src/intercept/proxy.rs - intercept all tool_call events from CLI stdout, classify by tool type, compute blast radius, check permissions, hold tool until frontend approves/rejects, max 30s hold timeout
- [X] T057 [US3] Implement blast radius engine at src-tauri/src/intercept/blast_radius.rs - for each tool call: identify affected paths, estimate impact scope (file count, line count, dependency risk), compute blast_radius_score (0.0-1.0), categorize risk level
- [X] T058 [US3] Implement permission system at src-tauri/src/intercept/permission.rs - per-tool-type defaults (write_file: ask, bash: ask, read_file: always, network: ask, mcp: ask), per-path overrides from context.yaml protected_paths, scope: once/session/always, block reason for blocked tools
- [X] T059 [P] [US3] Create IntentGapDetector component at src/components/cockpit/IntentGapDetector.tsx - compares agent output to stated task, flags divergence with yellow "Drift detected" card, shows original goal vs current action, "Return to spec" button
- [X] T060 [US3] Implement intent gap detection at src-tauri/src/context/intent_gap.rs - after each turn: compare agent action to initial task description, detect semantic drift (keyword + embedding comparison), emit narrative event with gap flag
- [X] T061 [US3] Implement checkpoint system at src-tauri/src/context/checkpoint.rs - auto-checkpoint before every agent write batch (copy file content + hash to .agentloft/snapshots/), manual checkpoint via checkpoint_create frame, milestone checkpoint on session pause, list checkpoints
- [X] T062 [US3] Implement rollback at src-tauri/src/context/rollback.rs - on checkpoint_restore: copy files from snapshot back to working directory, verify SHA256, emit diff events for each restored file, mark session as restored
- [X] T063 [P] [US3] Create RollbackBar component at src/components/cockpit/RollbackBar.tsx - status bar item showing last checkpoint time, "Restore last" button with confirmation, Ctrl+Z dropdown listing recent checkpoints with timestamps and file counts
- [X] T064 [US3] Implement regression shield at src-tauri/src/intercept/regression.rs - detect test files in affected paths, optionally run test suite before/after writes, emit "Regression Detected" panel if tests break, offer rollback
- [X] T065 [P] [US3] Create RegressionShield component at src/components/cockpit/RegressionShield.tsx - shows test results before/after agent writes, green "Tests passing" / red "Regression detected" status, rollback button on failure

**Checkpoint**: User Story 3 - Full agent cockpit (tool feed, blast radius, permissions, intent gap, regression shield) with auto-checkpoint and one-click rollback fully functional.

---

## Phase 6: User Story 4 - Cost Intelligence (Priority: P2)

**Goal**: Real-time cost tracking, budget caps, anomaly detection, cache health monitoring, model comparison, and Cost Calm Mode.

**Independent Test**: Run a session, verify cost ticker updates, set $5 budget cap, trigger cost spike alert, compare costs across models.

### Implementation for User Story 4

- [X] T066 [US4] Implement cost tracker at src-tauri/src/commands/cost.rs - accumulate cost from each token_info event, persist to SQLite per session/project, compute per-turn/per-session/all-time aggregates, emit cost_update events to frontend
- [X] T067 [P] [US4] Create CostTicker component at src/components/cockpit/CostTicker.tsx - live cost display in status bar (session total + last turn), green (<$1) / yellow ($1-5) / red (>$5) color coding, click expands to per-model breakdown
- [X] T068 [P] [US4] Create BudgetControls component at src/components/cockpit/BudgetControls.tsx - Settings panel: session hard cap ($), task soft cap ($), daily cap ($), monthly cap ($), when-cap-reached: block/warn/switch-to-cheaper, current usage bars per budget
- [X] T069 [US4] Implement budget enforcer at src-tauri/src/intercept/budget.rs - check each token_info event against active budgets, session hard cap: reject tool calls and send warning, task soft cap: emit budget_warning event, daily/monthly: check and persist cumulative totals
- [X] T070 [US4] Implement cost anomaly detector at src-tauri/src/commands/cost.rs - track rolling average cost per turn (last 10 turns), detect spikes >3x average, emit cost_anomaly event with severity, include comparison context
- [X] T071 [P] [US4] Create CostAnomalyAlert component at src/components/cockpit/CostAnomalyAlert.tsx - prominent alert on anomaly detection, shows current cost vs average, buttons: "Pause session" / "Continue anyway" / "Switch to cheaper model"
- [X] T072 [P] [US4] Create CacheHealthMonitor component at src/components/cockpit/CacheHealthMonitor.tsx - shows cache hit rate as percentage bar, green (>80%) / yellow (40-80%) / red (<40%), token savings from cache, tips to improve cache hit rate
- [X] T073 [US4] Implement model pricing database at src-tauri/src/commands/pricing.rs - load bundled prices.json with all model prices, 7-day cache with HTTP check for updates, provider-reported pricing (from stream-JSON) > API > bundled, model comparison calculator
- [X] T074 [P] [US4] Create ModelCostComparison component at src/components/cockpit/ModelCostComparison.tsx - "Same task on Gemini Flash: $0.04 vs $0.41 on Opus" card, model dropdowns, estimated savings, "Switch" button
- [X] T075 [P] [US4] Create UnifiedQuotaDashboard component at src/components/cockpit/QuotaDashboard.tsx - per-provider quota display (usage/limit bars), rate limit status indicators, reset timers for each provider
- [X] T076 [US4] Implement Cost Calm Mode at src/stores/settingsStore.ts - hide per-turn cost display, show session total only, togglable from status bar chip, auto-enabled in Guided expertise mode, stored as user setting

**Checkpoint**: User Story 4 - Cost ticker, budget caps, anomaly detection, cache health, model comparison, pricing database, and Cost Calm Mode fully functional.

---

## Phase 7: User Story 5 - Marketplace (Priority: P2)

**Goal**: Browse, install, and manage skills and MCPs from a static CDN registry. Skills Marketplace + MCP Hub with health dashboard.

**Independent Test**: Open Marketplace panel, browse available skills, install one, verify it appears in active skills, test skill works in session.

### Implementation for User Story 5

- [X] T077 [P] [US5] Create marketplace registry at marketplace/registry.json - initial registry schema with categories (skills/plugins/mcps/templates/themes), 5+ starter items per category, metadata per item (name, version, author, description, license, source_url, tags)
- [X] T078 [P] [US5] Create MarketplacePanel component at src/components/marketplace/MarketplacePanel.tsx - browse by category tabs, search bar with debounce, item cards (name, description, author, stars, downloads, license badge, verified badge), detail view on click
- [X] T079 [P] [US5] Create MarketplaceItemDetail component at src/components/marketplace/MarketplaceItemDetail.tsx - full description, version history, security scan results (passed/failed badge + findings list), ratings, Install/Uninstall button, permissions display
- [X] T080 [US5] Implement marketplace commands at src-tauri/src/commands/marketplace.rs - fetch_registry (load + cache marketplace/registry.json), install_item (download from source_url, extract to config dir, register in SQLite), uninstall_item, list_installed, check_updates
- [X] T081 [US5] Implement MCP Hub at src-tauri/src/commands/mcp_hub.rs - manage installed MCPs (list, configure, start, stop), MCP health check (periodic ping), MCP process spawning, MCP permission manager (per-tool allow/deny), MCP log viewer
- [X] T082 [P] [US5] Create McpHealthDashboard component at src/components/marketplace/McpHealthDashboard.tsx - per-MCP card with connection status (green/grey/red dot), last activity timestamp, tool count, configuration edit button, logs button
- [X] T083 [P] [US5] Create InstalledItemsList component at src/components/marketplace/InstalledItemsList.tsx - "My Skills" / "My MCPs" / "My Plugins" tabs, enable/disable toggle, update available badge, uninstall with confirmation
- [X] T084 [US5] Implement plugin system foundation at src-tauri/src/commands/plugins.rs - plugin manifest validation (declared permissions), Web Worker sandbox scaffolding for v1.1 (stub in v1), plugin install/uninstall, permissions review on install

**Checkpoint**: User Story 5 - Marketplace with browse, install, MCP hub, health dashboard, and plugin foundation fully functional.

---

## Phase 8: User Story 6 - Session Management (Priority: P2)

**Goal**: Session recording, full-text search, JSON + Markdown export, session replay, folders, tags, archive, and organization.

**Independent Test**: Complete a session, verify it appears in history with title/cost/duration, search for a keyword, replay a turn, export as markdown, organize into folders.

### Implementation for User Story 6

- [X] T085 [US6] Implement session recording at src-tauri/src/commands/session.rs - record every message/tool_call/diff/token_info event to SQLite, compute session summary (duration, total cost, files changed, model used), auto-generate title from first user message
- [X] T086 [US6] Implement full-text session search at src-tauri/src/commands/session.rs - SQLite FTS5 index on messages.content + tool_calls.input + tool_calls.output, search by keyword/phrase, return ranked results with context snippets, filter by date/model/cost/tags
- [X] T087 [US6] Implement session export at src-tauri/src/commands/session.rs - JSON export (full structured data with all messages/tool calls/checkpoints/cost), Markdown export (readable walkthrough with formatted messages and summaries), save to user-chosen path
- [X] T088 [P] [US6] Create SessionHistoryPanel component at src/components/chat/SessionHistoryPanel.tsx - list of past sessions with title, date, cost, duration, model icon, smart auto-tags (has-error/high-cost/long/branched), click to view, right-click context menu
- [X] T089 [P] [US6] Create SessionReplayViewer component at src/components/chat/SessionReplayViewer.tsx - replay any past session at configurable speed (1x/2x/4x/8x), play/pause/scrub controls, jump to turn, shows messages and tool calls in sequence
- [X] T090 [P] [US6] Create SessionOrganizationSystem at src/components/chat/SessionOrganization.tsx - one-level nested folders, drag-drop sessions into folders, color tags (8 colors), manual + auto tags, pin up to 8 sessions, archive with 30-day auto-suggest, filter bar (model/date/cost/tags), bulk operations (tag/move/archive/export/delete)

**Checkpoint**: User Story 6 - Session recording, search, export, replay, and full organization (folders, tags, archive, filter) fully functional.

---

## Phase 9: User Story 7 - Zero-Waste Token Architecture (Priority: P3)

**Goal**: MCP lazy-loading, terminal output filter, self-edit deduplication, rolling state checkpoint, and savings dashboard. Target 40-65% token reduction.

**Independent Test**: Run session with 24 MCPs installed, verify only relevant schemas injected. Run npm test, verify output compressed. Edit a file, verify agent doesnt re-read it. Check savings dashboard.

### Implementation for User Story 7

- [X] T091 [US7] Implement MCP schema lazy-loader at src-tauri/src/intercept/mcp_lazy.rs - local task intent classifier (<10ms, regex + keyword), predict needed MCP categories per turn, lazy-inject only relevant schemas into context, status bar shows "MCPs: 3/24 active"
- [X] T092 [US7] Implement terminal output filter at src-tauri/src/process/output_filter.rs - 100+ per-command filter rules ported from RTK (git/cargo/npm/pytest/docker/kubectl/AWS CLI/helm/rspec/gradle/maven/eslint etc.), pipeline: dedup -> error extraction -> summary -> tail, full output teed to ~/.agentloft/tee/{session_id}/{timestamp}-{command}.log
- [X] T093 [P] [US7] Create TerminalOutputCard component at src/components/chat/TerminalOutputCard.tsx - compressed output display with stats (raw vs compressed tokens, reduction %), "Full log" button pointing to tee file, expand to show full output inline
- [X] T094 [US7] Implement self-edit deduplication at src-tauri/src/intercept/dedup.rs - SHA256 write registry: hash file path + content after every agent write, on agent read: check registry, if content matches (was just written by agent), strip the read from context, ~10K tokens saved per write cycle
- [X] T095 [US7] Implement rolling state checkpoint at src-tauri/src/context/rolling_checkpoint.rs - structured state snapshot (completed tasks/constraints/open items/file hashes), assembled from IPC event stream with zero additional LLM calls, fires on: turn threshold/budget threshold/manual trigger/PreCompact hook (intercepts CLI auto-compaction signal), 96% compression vs full history
- [X] T096 [US7] Implement PreCompact hook at src-tauri/src/process/precompact.rs - detect CLI pre_compact/context_limit_warning signal on stdout, fire state snapshot BEFORE history is discarded, inject checkpoint into next turn
- [X] T097 [P] [US7] Create ZeroWasteDashboard component at src/components/cockpit/ZeroWasteDashboard.tsx - live savings chip in status bar ("63% saved"), per-feature breakdown (MCP lazy-load/terminal filter/dedup/checkpoint), all-time stats across sessions, shareable PNG export card with AgentLoft branding
- [X] T098 [US7] Implement ZeroWaste metrics aggregator at src-tauri/src/commands/zero_waste.rs - aggregate all per-feature savings per session, persist ZeroWasteMetrics to SQLite, compute combined_savings_ratio, emit zero_waste_update events

**Checkpoint**: User Story 7 - All Zero-Waste features (MCP lazy-load, terminal filter, dedup, rolling checkpoint) with savings dashboard fully functional.

---

## Phase 10: User Story 8 - Onboarding & UX Completeness (Priority: P3)

**Goal**: First-Run Onboarding Wizard, In-App Help System, End-of-Task Summary Card, Rate Limit Intelligence & Auto-Fallback, and Expertise Toggle.

**Independent Test**: Fresh install, complete onboarding wizard within 3 minutes, use help system, verify plain-English task summary on completion, test rate limit auto-fallback.

### Implementation for User Story 8

- [X] T099 [US8] Create FirstRunOnboardingWizard at src/components/onboarding/OnboardingWizard.tsx - 5-step flow: (1) Welcome + design philosophy, (2) CLI auto-detection with one-click install (platform-detected: brew install/winget install/apt install), (3) API key setup via OS keychain, (4) Open first project with detected stack, (5) Pre-populated first prompt + Safe Mode toggle, tips carousel
- [X] T100 [US8] Implement CLI detection at src-tauri/src/commands/cli_detect.rs - check PATH for claude, codex, gemini/antigravity, node, python, docker; return installed/not-installed/version for each; power onboarding wizard step 2
- [X] T101 [P] [US8] Create HelpCenter panel at src/components/help/HelpCenter.tsx - F1 to open, sections: Getting Started/Panel Reference/CLI Comparison/Glossary/Keyboard Shortcuts, search across all help content, offline-capable (embedded content, no network required)
- [X] T102 [P] [US8] Create help tooltips at src/components/help/HelpTooltips.tsx - panel "?" icon with plain-English popover on click, first-visit coaching tooltips (auto-show once per panel element, "Got it" dismiss), "What is this?" right-click on any UI element
- [X] T103 [P] [US8] Create ExpertiseToggle at src/components/settings/ExpertiseToggle.tsx - 3 levels: Guided (hides advanced cockpit panels but keeps RollbackBar visible, collapses status bar to 3 indicators, hides Context Health bar, plain-English labels, Cost Calm Mode auto-on), Standard (default, all panels, mixed labels), Expert (full metrics, raw token counts, debug panels, IPC Inspector)
- [X] T104 [P] [US8] Create EndOfTaskSummaryCard at src/components/chat/EndOfTaskSummaryCard.tsx - fires automatically on task completion, Simple Mode (plain-English: "AgentLoft created 3 files, edited 2 files, ran 1 test - all tests passed"), Detailed Mode (full metrics: token usage, cost, files changed, test results), memory extraction integrated inline, Export Summary to markdown, accessible from session history after dismissal
- [X] T105 [US8] Implement rate limit intelligence at src-tauri/src/intercept/rate_limit.rs - per-provider detection patterns: Claude (429 + overloaded_error), Codex (RateLimitError), Antigravity (RESOURCE_EXHAUSTED), parse retry-after headers, countdown timer, emit rate_limit event
- [X] T106 [P] [US8] Create RateLimitCard component at src/components/cockpit/RateLimitCard.tsx - live rate limit notification with countdown timer, provider icon, "Auto-switching to fallback" progress, quality-warning banner when fallback is weaker tier
- [X] T107 [US8] Implement auto-fallback chain at src-tauri/src/intercept/rate_limit.rs - on rate limit: check ConnectionProfile chain (primary -> secondary -> tertiary -> fallback), auto-switch with notification, retry queue (max 10 turns), restore primary when rate limit clears, emit fallback events
- [X] T108 [US8] Create ConnectionProfile editor at src/components/settings/ConnectionProfileEditor.tsx - visual editor for connection profiles: primary/secondary/tertiary/fallback model selectors, auto_fallback toggle, retry queue max slider, per-provider rate limit detection toggles, profile name, save/delete

**Checkpoint**: User Story 8 - Onboarding wizard, help system, expertise toggle, end-of-task summary, rate limit intelligence with auto-fallback fully functional.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance optimization, cross-platform validation, context engine integration, agent profiles, scope inheritance UI, crash recovery, documentation updates.

- [X] T109 [P] Implement keyboard shortcuts system at src/hooks/useKeyboardShortcuts.ts - Ctrl+K: Command Palette, Ctrl+Z: Rollback dropdown, Ctrl+I: Side Chat, Ctrl+Shift+R: Raw File Mode, F1: Help Center, Ctrl+Shift+I: IPC Inspector, Ctrl+Shift+O: LSP Symbol Search, Ctrl+Shift+D: Refresh Directives, Ctrl+Shift+Enter: Retry Turn, Ctrl+\`: Floating Terminal
- [X] T110 [P] Implement glassmorphism design system at src/styles/glassmorphism.css - full PRD S20 tokens: color system (mint #7cc7a0, dark gradient canvas), blur levels (24-30px heavy/16-20px medium/8-12px light/4px subtle), corner rounding (3-4px badges/5-7px buttons/8-12px panels), shadows (elevated/glass/glow), animation tokens (spring, dissolve, shimmer, slide-up)
- [X] T111 [P] Implement accessibility pass - ARIA labels on all interactive elements, keyboard navigation (Tab/Shift+Tab through panels), high contrast mode (system setting detection), font size scaling (Settings: Small/Default/Large/Larger), reduced motion (prefers-reduced-motion media query), screen reader announcements for status changes
- [X] T112 [P] Implement context health score at src-tauri/src/context/health.rs - compute health_score (0-100) from: context utilization %, directive freshness, memory coverage, repetition detection, warning count; emit context_stats events
- [X] T113 [P] Create ContextHealthBar component at src/components/context/ContextHealthBar.tsx - status bar item: health score (0-100), color-coded (green >70/yellow 40-70/red <40), click expands to detail panel with breakdown and suggestions
- [X] T114 [P] Create ContextBudgetSystem at src/components/context/ContextBudget.tsx - visual allocation bar showing context usage (system prompt/memory/files/conversation), drag to adjust per-category budget, "Optimize" button triggers smart pruning
- [X] T115 [P] Implement source code visitor at src-tauri/src/process/source_visitor.rs - check for node_modules at project root, add node_modules to .agentloftignore if not present, show coaching toast on first detection
- [X] T116 [P] Implement agent profiles at src-tauri/src/commands/profiles.rs - load built-in profiles from YAML (Karpathy Engineer, Deep Work, Code Review, Exploration, Safe Mode, Overnight Run), custom profile editor, export profile as CLAUDE.md, profile selector in session start
- [X] T117 [P] Create 3-Level Scope Inheritance UI at src/components/settings/ScopeInheritance.tsx - every Setting shows scope badge (Globe/File/Monitor emoji), override indicators (arrow from parent scope), lock icon when higher scope has locked setting, "Reset to inherited" button
- [X] T118 Implement crash recovery scenarios 1-2 at src-tauri/src/context/crash_recovery.rs - 5-second autosave timer (serialize session state to .claude/sessions/{id}/autosave.json), write shutdown_complete marker on clean exit, on startup: detect missing marker, show "Recover session?" banner, restore from autosave
- [X] T119 [P] Create autosave banner at src/components/chat/RecoveryBanner.tsx - "AgentLoft didnt close properly. Recover your last session?" with session title, timestamp, and file count; "Recover"/"Discard" buttons
- [X] T120 [P] Implement network audit log at src-tauri/src/commands/security.rs - log every outgoing API call: timestamp, provider, endpoint, model, token count, cost; store in SQLite; view in Settings -> Privacy -> Network Audit; export as CSV
- [X] T121 [P] Create IPC Inspector dev panel at src/components/settings/IpcInspector.tsx - live scroll of all IPC frames (color-coded direction), filter by type/session/keyword, stats bar (frames/sec, bytes, latency), export as NDJSON, anomaly highlighting (>50ms latency, missing fields)
- [X] T122 [P] Implement storage path management at src/components/settings/StorageSettings.tsx - path editors for all agentloft_* dirs, storage usage breakdown (sessions/memory/logs/plugins with bars), "Move data" wizard when path changes, "Clear [category]" with confirmation, portable mode indicator
- [X] T123 [P] Windows-specific QA pass - verify PTY with PowerShell 7 + cmd.exe, path separator normalization (backslash -> forward slash before sending to agent), Windows Defender scan overhead measured, winget installer verification, cold start <3s on NVMe / <6s on HDD
- [X] T124 [P] Linux-specific QA pass - verify AppImage runs on Ubuntu 22.04/24.04 + Arch, PTY with bash, apt/PPA installation, .deb package dependencies, file watcher inotify limits check
- [X] T125 [P] macOS-specific QA pass - verify universal binary (aarch64 + x86_64), Apple Developer ID signing + notarization, Homebrew cask install, PTY with zsh + bash, cold start <2s
- [X] T126 Run quickstart.md validation - fresh clone and build from scratch, pnpm tauri dev starts, all tests pass, pnpm tauri build produces signed installers for all platforms
- [X] T127 [P] Update documentation in docs/ - update quickstart.md with final build instructions, create CONTRIBUTING.md with frontend-only contribution track, create SECURITY.md with vulnerability reporting process

- [X] T128 [P] Implement intercept latency benchmark at tests/rust/bench_intercept.rs -- measure tool_call receive to permission_request emit latency, assert p95 <5ms under 100 concurrent tool calls (criterion SC-003)
- [X] T129 [P] Implement memory retrieval benchmark at tests/rust/bench_memory.rs -- measure top-5 semantic retrieval with 1000 indexed entries, assert p95 <100ms (criterion SC-004)
- [X] T130 [P] Create ZeroWaste savings validation test at tests/rust/test_zero_waste_savings.rs -- run fixed workload sessions against raw CLI baseline, assert combined_savings_ratio >= 0.40 (criterion SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-10)**: All depend on Foundational phase completion
  - US1 (Multi-CLI Shell): P1 - No dependencies on other stories. Start first.
  - US2 (Memory): P1 - No dependencies on US1. Can run in parallel with US1.
  - US3 (Cockpit & Safety): P1 - Depends on US1 (needs chat + tool calls). Start after US1 basic flow.
  - US4 (Cost Intelligence): P2 - Depends on US1 (needs token_info events). Can run parallel with US3.
  - US5 (Marketplace): P2 - No dependencies on other stories. Start any time after Foundational.
  - US6 (Session Management): P2 - Depends on US1 (needs session recording infrastructure).
  - US7 (Zero-Waste): P3 - Depends on US1+US3 (needs IPC + intercept layer stable).
  - US8 (Onboarding & UX): P3 - Depends on US1+US2+US4 (needs core features to onboard into). Can run parallel with US7.
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependency Graph

```
Setup (Phase 1)
    |
Foundational (Phase 2)
    |
    +-------+-------+-------+---+
    |       |       |       |   |
    US1     US2     US5     |   |
    |   \   |               |   |
    |    US3                |   |
    |   /   \               |   |
    US4     US6             |   |
    |       |               |   |
    +---US7-+      +--US8--+   |
            |       |           |
            +-------+-----------+
                    |
              Polish (Phase 11)
```

### Within Each User Story

- Models/entities before services
- Services before command handlers
- Rust backend before React frontend components
- Frontend [P] tasks within a story can run in parallel
- Story complete before moving to next priority (sequential by priority within dependency constraints)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T010)
- All Foundational tasks marked [P] can run in parallel (T012, T013, T014, T022-T025)
- US1 + US2 + US5 can all start in parallel after Foundational (different subdirectories, minimal overlap)
- US3 + US4 can run in parallel after US1 has basic tool call flow
- US7 + US8 can run in parallel after their dependencies
- Within each story: all [P] tasks can run in parallel
- Polish phase: T109-T127 are nearly all [P], massive parallelism

---

## Parallel Example: User Story 1

```bash
# Launch all independent US1 frontend components together:
Task: "Create ChatPanel component at src/components/chat/ChatPanel.tsx"
Task: "Create ChatInput component at src/components/chat/ChatInput.tsx"
Task: "Create ToolCallCard component at src/components/chat/ToolCallCard.tsx"
Task: "Create PermissionModal component at src/components/chat/PermissionModal.tsx"
Task: "Create Universal Command Palette at src/components/chat/CommandPalette.tsx"
Task: "Create FloatingMiniTerminal at src/components/chat/MiniTerminal.tsx"
Task: "Create SettingsPanel - CLI Flags at src/components/shared/SettingsFlags.tsx"
Task: "Create ConfigFileEditor at src/components/shared/ConfigFileEditor.tsx"
Task: "Create FileTreePanel at src/components/chat/FileTreePanel.tsx"

# Launch all US1 Rust tasks together (different files):
Task: "Implement Claude Code process at src-tauri/src/process/claude_code.rs"
Task: "Implement Codex CLI process at src-tauri/src/process/codex.rs"
Task: "Implement Antigravity CLI process at src-tauri/src/process/antigravity.rs"
Task: "Implement OpenAI-compatible generic process at src-tauri/src/process/generic.rs"
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: US1 - Multi-CLI GUI Shell (chat, tool calls, command palette)
4. Complete Phase 4: US2 - Persistent Memory (LanceDB, extraction, injection)
5. Complete Phase 5: US3 - Agent Cockpit & Safety (observability, rollback)
6. **STOP and VALIDATE**: Test US1+US2+US3 independently - this is a functional product
7. The triple-P1 combo (chat + memory + safety) IS the minimum viable launch

### Incremental Delivery

1. Setup + Foundational -> Foundation ready
2. Add US1 -> Test independently -> Chat + CLI spawning works (First demo)
3. Add US2 -> Test independently -> Memory across sessions works (Second demo)
4. Add US3 -> Test independently -> Cockpit + rollback works (MVP - ready for alpha users)
5. Add US4 -> Cost intelligence -> Beta milestone
6. Add US5 -> Marketplace -> Community-ready milestone
7. Add US6 -> Session management -> Power user milestone
8. Add US7 -> Zero-Waste -> Efficiency milestone
9. Add US8 -> Onboarding -> v1 Release Candidate
10. Polish -> Cross-platform validation, accessibility -> v1 GA Release

### Parallel Team Strategy

With 3-4 developers:

1. Everyone completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Multi-CLI Shell) - Rust process layer + chat UI
   - Developer B: US2 (Memory) - LanceDB + memory UI
   - Developer C: US5 (Marketplace) - Static registry + marketplace UI
3. After US1 basic tool call flow:
   - Developer A: US3 (Cockpit & Safety)
   - Developer B: US4 (Cost Intelligence) - same events, different panel
4. After US1+US3 stable:
   - Developer A: US6 (Session Management)
   - Developer B: US7 (Zero-Waste)
   - Developer C: US8 (Onboarding & UX)
5. Polish: All hands, mostly parallel

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- PRD phase map (S7) defines v1 exact scope - do not implement v1.1/v2/v3 features
- Antigravity CLI integration gated behind `agentloft_ANTIGRAVITY_EXPERIMENTAL=true` until stable (PRD S14.7)
- Windows CI lane required - no release ships with known Windows-only regression (PRD S12.1)
