# Feature Specification: AgentLoft v1 — Multi-CLI GUI Wrapper

**Feature Branch**: `001-agentloft-gui`
**Created**: 2026-05-25
**Input**: User description: "Build AgentLoft v1: a free, open-source, local-first desktop GUI that wraps Claude Code, OpenAI Codex CLI, and Antigravity CLI."

## User Stories

### User Story 1 — Multi-CLI GUI Shell (Priority: P1) :star: MVP

As a developer using CLI AI agents, I want to spawn Claude Code, Codex CLI, and Antigravity CLI as child processes with a visual chat interface, so I can use all three agents through a premium GUI instead of a terminal.

**Why this priority**: The entire product thesis. Nothing ships without this. Core differentiator over Opcode (Claude-only).

**Independent Test**: Launch app, select a CLI backend, send a prompt, see streamed text response and tool calls rendered as visual components. Verify stream-JSON parsing works for all three CLI backends.

**Acceptance Scenarios**:
1. **Given** a fresh install, **when** I select Claude Code and type "Write a hello world function", **then** the agent responds with streamed text, tool calls appear as styled cards, and file diffs render in Monaco editor.
2. **Given** a session using Codex CLI, **when** I press :kK, **then** the Universal Command Palette shows all slash commands from all three CLIs, searchable.
3. **Given** a session, **when** the CLI emits an error, **then** it renders as a styled error card with recovery options.

---

### User Story 2 — Persistent Memory System (Priority: P1)

As a developer who switches between sessions, I want the app to remember project conventions, decisions, and preferences across sessions, so I don't have to re-explain my codebase every time.

**Why this priority**: Memory is the launch differentiator vs. all first-party GUIs and Opcode. Every first-party CLI GUI loses context between sessions.

**Independent Test**: Run a session, let auto-extraction create memories, start a new session, verify relevant memories are injected into context. Check Memory Browser for stored entries.

**Acceptance Scenarios**:
1. **Given** a completed session on a React project, **when** I start a new session, **then** relevant project conventions from past sessions are injected into the initial context.
2. **Given** the Memory Browser panel, **when** I search for a convention, **then** matching memories display with confidence scores and freshness indicators.
3. **Given** a first project open, **when** the project has an existing CLAUDE.md, **then** its contents are auto-imported as memories at 0.95 confidence.

---

### User Story 3 — Agent Cockpit & Safety (Priority: P1)

As a power developer, I want real-time observability into every agent tool call with blast radius preview and permission control, so I can trust the agent on production-grade codebases.

**Why this priority**: This is what makes AgentLoft a workbench, not a chat box. Core safety and trust.

**Independent Test**: Trigger a multi-file write, verify blast radius preview shows affected files before execution, approve/reject individual tool calls, verify rollback restores previous state.

**Acceptance Scenarios**:
1. **Given** an agent that wants to write 5 files, **when** the tool call appears in the cockpit, **then** the Blast Radius Preview shows all 5 file paths with impact estimates before execution.
2. **Given** a tool call requiring permission, **when** I click "Approve once," **then** the single tool executes and subsequent tools re-prompt.
3. **Given** an agent write batch, **when** I click "Restore last checkpoint," **then** all files from that batch revert to their pre-write state.

---

### User Story 4 — Cost Intelligence (Priority: P2)

As an indie hacker, I want real-time cost tracking with budget caps and anomaly detection, so I never get surprised by a $50 API bill.

**Why this priority**: Cost spikes are a Critical-frequency pain point (PRD S2.1). Core value-add over all first-party GUIs.

**Independent Test**: Run a session, verify cost ticker updates in real-time, set a session budget cap, verify session hard-stops at cap, trigger a simulated cost spike, verify anomaly alert fires.

**Acceptance Scenarios**:
1. **Given** an active session, **when** the agent processes a large prompt, **then** the cost ticker updates within 1 second of each token_info event.
2. **Given** a $5 session budget cap, **when** the session reaches $5, **then** the agent is blocked from further API calls with a clear "Budget reached" message.
3. **Given** a session costing $2/turn that suddenly costs $20/turn, **when** the anomaly detector fires, **then** a prominent alert appears with the option to pause or continue.

---

### User Story 5 — Marketplace (Priority: P2)

As a developer who wants extended functionality, I want to browse, install, and manage skills and MCPs from a community marketplace, so I can extend AgentLoft without writing code.

**Why this priority**: Community flywheel starts here. Low implementation cost (static CDN), high ecosystem value.

**Independent Test**: Open Marketplace panel, browse available skills, install one, verify it appears in the active skills list, test the installed skill works in a session.

**Acceptance Scenarios**:
1. **Given** the Marketplace panel, **when** I browse available skills, **then** items display with name, description, author, rating, and install button.
2. **Given** a skill listing, **when** I click "Install," **then** the skill downloads, installs, and appears in "My Skills" within 10 seconds.
3. **Given** an installed MCP, **when** I check the MCP health dashboard, **then** it shows connection status, last activity, and configuration.

---

### User Story 6 — Session Management (Priority: P2)

As a developer who runs many agent sessions, I want to record, replay, search, organize, and export my sessions, so I can review past work and never lose important context.

**Why this priority**: Session recording is cheap to implement; full-text search and organization are essential for retention beyond 2 weeks.

**Independent Test**: Complete a session, verify it appears in session history with title/cost/duration, search for a keyword, replay a turn, export as markdown, organize into folders.

**Acceptance Scenarios**:
1. **Given** a completed session, **when** I open session history, **then** the session shows with auto-generated title, cost, duration, and smart tags.
2. **Given** session search, **when** I type "database migration," **then** it finds sessions where that phrase appeared in messages or tool calls.
3. **Given** a session, **when** I click "Export as Markdown," **then** a readable walkthrough of the session saves to disk.

---

### User Story 7 — Zero-Waste Token Architecture (Priority: P3)

As a cost-conscious developer, I want automatic token savings through MCP lazy-loading, terminal output filtering, and self-edit deduplication, so I get 40-65% fewer tokens used compared to raw CLI.

**Why this priority**: High value (massive token savings), but depends on v1 IPC stability. Core infrastructure must work before layering optimization.

**Independent Test**: Run a session with MCPs installed but not used, verify only relevant schemas are injected. Run npm test, verify output is compressed before context injection. Make an edit, verify agent doesn't re-read the file.

**Acceptance Scenarios**:
1. **Given** 24 installed MCPs, **when** a session uses only 3 MCP categories, **then** only those 3 categories' schemas are injected into context.
2. **Given** a terminal command producing 8000 tokens of output, **when** the output filter processes it, **then** only errors and summary (under 2000 tokens) enter context.
3. **Given** the Zero-Waste Dashboard, **when** I complete a session, **then** it shows per-feature savings and total token reduction vs. raw CLI baseline.

---

### User Story 8 — Onboarding & UX Completeness (Priority: P3)

As a vibecoder or newcomer, I want a guided onboarding flow, in-app help, plain-English task summaries, and a non-intimidating cost display, so I can be productive within 3 minutes of install.

**Why this priority**: Critical for Persona 1 (Vibecoder) adoption. Low implementation complexity — mostly UI. Ships last in v1 because core functionality must exist first.

**Independent Test**: Fresh install, complete onboarding wizard, verify first agent turn succeeds within 3 minutes. Use help panel, verify explanations. Enable Cost Calm Mode, verify per-turn cost hidden.

**Acceptance Scenarios**:
1. **Given** a fresh install, **when** the onboarding wizard runs, **then** it detects installed CLIs, offers one-click install for missing CLIs, sets up API keys, and pre-populates a first prompt.
2. **Given** Guided expertise mode, **when** I hover over any panel, **then** first-visit tooltips explain what each UI element does in plain English.
3. **Given** Cost Calm Mode enabled, **when** the agent completes a turn, **then** the status bar shows session total cost but not per-turn cost.

---

## Edge Cases

- What happens when a CLI child process crashes mid-session? → Crash recovery: 5-second autosave, `shutdown_complete` marker detection, "Recover session?" banner on restart.
- How does the app handle 2+ CLIs not installed? → Onboarding wizard detects missing CLIs, offers one-click install via Homebrew/winget/apt.
- What if stream-JSON parsing fails (new CLI version, format change)? → Fall back to PTY with regex-based parsing. Show "Format changed — using terminal fallback" banner.
- What about rate limits (429 errors)? → Auto-fallback through ConnectionProfile chain, quality-warning banner when falling back to weaker model, retry queue.
- How does offline mode work? → Local models (Ollama, LM Studio) work fully offline. Cloud CLIs show "No connection" status. Memory and session history are always local.
- What about disk space for auto-checkpoints? → Show storage usage in Settings → Storage. Auto-prune checkpoints older than 30 days (configurable).

## Requirements

### Functional Requirements

- **FR-001**: Spawn Claude Code, Codex CLI, and Antigravity CLI as child processes via stream-JSON (primary) or PTY (fallback).
- **FR-002**: Universal Command Palette (:kK) with all slash commands from all three CLIs, searchable.
- **FR-003**: Visual Flag Builder — all CLI flags mapped to Settings panel with live raw command preview.
- **FR-004**: Monaco Editor diff renderer with per-hunk accept/reject/edit and Accept All/Reject All.
- **FR-005**: LanceDB persistent memory with auto-extraction post-session, semantic injection pre-session.
- **FR-006**: Memory Bootstrap — read existing CLAUDE.md/AGENTS.md on first project open.
- **FR-007**: Agent Cockpit with Tool Call Feed, Intent Gap Detector, Blast Radius Preview.
- **FR-008**: Permission system — intercept all write/bash/network/MCP tool calls, configurable defaults.
- **FR-009**: Auto-checkpoint before every agent write batch, one-click rollback (restore last).
- **FR-010**: Real-time cost ticker, budget caps (session/task/daily/monthly), cost anomaly detector.
- **FR-011**: Skills Marketplace + MCP Hub with browse, one-click install, and health dashboard.
- **FR-012**: Session recording, full-text search (SQLite FTS5), JSON + markdown export.
- **FR-013**: On-Demand MCP Schema Loading — lazy-inject only relevant schemas per turn.
- **FR-014**: Terminal Output Filter — compress CLI output (npm test, cargo build) before context injection.
- **FR-015**: Self-Edit Deduplication — SHA256 write registry prevents agent re-reading its own writes.
- **FR-016**: Rolling State Checkpoint — structured state snapshot replaces full history for context compression.
- **FR-017**: First-Run Onboarding Wizard with CLI detection, one-click install, API key setup.
- **FR-018**: In-App Help System — panel "?" icons, first-visit tooltips, Help Center (F1), expertise toggle.
- **FR-019**: End-of-Task Summary Card with plain-English file impact summary for newcomers.
- **FR-020**: Session Organization — folders, color tags, smart auto-tags, pin, archive, filter bar.

### Key Entities (from data-model.md)

- Session, Message, Attachment, ToolCall, Checkpoint, ContextSnapshot, MemoryEntry, Project, ModelProfile, ConnectionProfile, MarketplaceItem, ZeroWasteMetrics, Settings

## Success Criteria

### Measurable Outcomes

- **SC-001**: First successful agent turn within 3 minutes of install for new users.
- **SC-002**: App cold start under 2 seconds (macOS), under 3 seconds (Windows NVMe).
- **SC-003**: Tool call interception latency under 5ms overhead.
- **SC-004**: Memory retrieval (top-5 semantic) under 100ms.
- **SC-005**: Zero-Waste combined token savings of 40% or more vs. raw CLI.
- **SC-006**: Session autosave persists within 5 seconds of any state change.
- **SC-007**: 100% of CLI flags discoverable through Visual Flag Builder (no hidden CLI-only features).
- **SC-008**: Installer under 25MB compressed, total installed under 200MB.
- **SC-009**: Zero AgentLoft server calls by default (local-first verified by network audit log).
- **SC-010**: All 13 data model entities persisted and queryable (Session, Message, Attachment, ToolCall, Checkpoint, ContextSnapshot, MemoryEntry, Project, ModelProfile, ConnectionProfile, MarketplaceItem, ZeroWasteMetrics, Settings).
