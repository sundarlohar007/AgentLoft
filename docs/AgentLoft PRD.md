# AgentLoft — Complete Product Requirements Document

**Document Version:** 4.8  
**Status:** Draft  
**Classification:** Internal — Founding Team  
**Last Updated:** May 2026  
**Changelog:**

- v1.0 — Initial PRD (18 sections)
- v2.0 — Added Section 19: User Control Layer
- v3.0 — Replaced Section 15 with full research-backed competitive analysis: real star counts, 12 identified gaps, 12 gap-closing feature specs, full feature matrix vs. 7 competitors, positioning statement
- v4.0 — Major competitive landscape update: all three target vendors (Anthropic, OpenAI, Google) have shipped first-party GUIs; Gemini CLI deprecated in favor of Antigravity CLI; GUI-wrapper space now crowded (Opcode, Nimbalyst, Warp Oz); RooCode team shutdown; OpenCode original repo archived; 5 new gap-closing features added (§15.4.13–15.4.17); feature matrix and positioning statement revised accordingly. Second-round research additions: CC-Switch (~79,600 stars — highest in space), AionUi (~26,400 stars, Electron multi-CLI GUI), Vibe Kanban (26,500 stars, SUNSETTED April 2026), Claude Squad (~7,600 stars, Go TUI), CodePilot (~5,800 stars, BSL), Parallel Code; two new gaps (§15.3 Gap 18–19) and two new gap-closing specs (§15.4.18–19) added; §15.5 second-round matrix and §15.6 CC-Switch acquisition positioning added. Research doc integration: 18 new findings added — Smart Token Pipeline §7.17 (6-stage, <50ms, 40–60% savings), Graphify Knowledge Graph §7.3.7, Agentmemory 4-tier §7.3.8, 3-Level Scope Inheritance §7.18, Crash Recovery §7.19, Narrative View §7.8.10, Raw File Mode §7.0.11, Smart Resume §7.4.9, Side Chat §7.1.8, Karpathy/Agent Profiles §7.20, Visual Flag Builder raw preview §7.0.7, Plugin WASM Sandbox §7.6.3, Fork Tree Visualization §7.15.5, IPC Full Frame Spec §9.4, Configurable Storage Paths §9.5, Section 20 Visual Design System (glassmorphism tokens), Section 21 Legal & Compliance (4 P0 blockers + SBOM requirement)
- v4.8 — User drop-off fixes (9 spec improvements derived from adoption simulation): §7.0.13 Onboarding Wizard gains in-app CLI auto-install — platform-detected one-click commands (Homebrew/winget/apt) run inside the wizard without opening a browser; §7.0.12 Rate Limit Auto-Fallback adds quality-warning banner when switching to a substantially weaker fallback model; §7.1.9 Expertise Toggle Guided mode spec strengthened — hides Agent Cockpit panel entirely, collapses status bar to 3 indicators, hides Context Health bar; §7.3 Memory Bootstrap added — on first project open, AgentLoft reads existing CLAUDE.md, AGENTS.md, and project manifest files and pre-populates project memory so the agent references conventions on turn 1; §7.3.3 Memory Extraction UX changed from blocking review modal to auto-accept with non-blocking toast ("12 memories extracted — review when ready") and a 24-hour review window; §7.10.9 Cost Calm Mode added — hides per-turn cost display, shows session total only, togglable from status bar; §7.8.8 Rollback System split between v1 (basic: auto-checkpoint + one-click restore) and v1.1 (advanced: timeline view, branch-from-checkpoint); Phase Map updated accordingly; §8 v1 deliverables updated with basic Rollback; §12.1 Performance NFRs expanded with Windows-specific metrics and a cross-platform test matrix requirement; §17.5 Marketplace Seeding Strategy added — founding team commits to 20+ skills/MCPs before public launch; TOC updated.
- v4.7 — Legal, compliance, and license audit pass: §21.3 Russia embargo corrected (Russia is targeted OFAC sanctions, not a comprehensive EAR embargo like Cuba/Iran/DPRK/Syria); §21.4 expanded with AI provider data transmission disclosure (memory extraction sends session content to third-party APIs — must be disclosed in Privacy Policy); §21.6 dependency table expanded from 6 to 14 entries — added RTK (MIT), Caveman (MIT), ONNX Runtime (MIT), Monaco Editor (MIT), xterm.js (MIT), Tauri (MIT+Apache 2.0), tree-sitter (MIT), Playwright (Apache 2.0), Context Mode (ELv2 — restricted license requiring legal review before Marketplace listing); §21.7 vs_execute Code Execution Liability (new P1 — ToS must disclaim agent-written code execution before v2); §21.8 GDPR & Cloud Data Compliance (new P1 — DPA template, right-to-erasure, data residency required before Cloud launch); §21.9 AGPL Contamination Prevention (new P1 — contributor policy must prohibit AGPL-derived code, Opcode shares same stack); §21.10 AI-Generated Code Ownership (new P1 — ToS must defer to each provider's terms); §21.11 Remediation Priority Summary (renumbered from §21.7, 8 new entries added); §17.1 BSL community risk note added; TOC updated.
- v4.6 — Structural correctness pass: §8 v1 deliverables backfilled with 7 features added in v4.2–v4.4 (Rate Limit Intelligence, Onboarding Wizard, In-App Help System, End-of-Task Summary Card, Session Organization, Model Pricing Database, Zero-Waste Token Architecture); §14.2 rewritten — "Vendors Ship GUI" risk materialized and resolved, replaced with ongoing exposure framing; §13.4 header corrected (v1.0 → v3); three new risks added: §14.6 Opcode Adds Memory (direct moat threat), §14.7 Antigravity CLI Instability (new CLI, transition window risk), §14.8 Open-Source Sustainability (contributor retention post-launch); §13.5 Token Efficiency KPIs added (6 metrics for Zero-Waste Architecture with social proof flywheel rationale); §10 expanded with four missing data models: Project (§10.6), ConnectionProfile (§10.7), ZeroWasteMetrics (§10.8), StateCheckpoint (§10.9).
- v4.5 — Three open-source repo integrations: (1) RTK (rtk-ai/rtk, MIT): §7.21.2 Terminal Output Filter expanded with 100+ calibrated per-command filter patterns ported from RTK's battle-tested Rust handlers — git/cargo/npm/pytest/docker/kubectl/AWS CLI/helm/rspec/gradle/maven/eslint/etc.; full output tee to ~/.agentloft/tee/ for on-demand recovery; (2) Context Mode (mksglu/context-mode, ELv2): §7.21.4 Rolling State Checkpoint gains a PreCompact hook trigger (intercepts CLI auto-compaction signal, fires state snapshot before CLI discards history); §7.21.8 Code-Execution-as-Retrieval (new, v2): vs_execute MCP tool lets agent write extraction scripts instead of reading raw files — 94-99% token reduction on large data sources; Context Mode surfaced as Marketplace MCP for users who prefer the original; (3) Caveman (juliusbrussee/caveman, MIT): §7.21.5 Context File Auditor gains Operation B Text Densification — rewrites active CLAUDE.md section text 30-50% shorter while preserving semantics, diff shown before applying; Caveman bundled as pre-installed Marketplace skill (§7.6.2) with /caveman, /caveman-commit, /caveman-review, /caveman-compress; Phase Map, TOC, Zero-Waste Dashboard breakdown all updated.
- v4.4 — Zero-Waste Token Architecture (§7.21): research-backed response to community complaints about unnecessary token consumption in Claude Code / Codex CLI / Gemini CLI. Seven subsections: §7.21.1 On-Demand MCP Schema Loading (v1) — lazy-inject MCP schemas only when task intent classifier predicts they are needed, closes 18-25K tokens/message overhead for unused schemas; §7.21.2 Terminal Output Filter (v1) — bash output (npm test, cargo build, pytest) compressed to errors+summary before context injection, 70-95% reduction, full output always shown to user; §7.21.3 Self-Edit Deduplication (v1) — SHA256 write registry at IPC layer strips agent self-notification re-reads (~10K tokens per write cycle saved); §7.21.4 Rolling State Checkpoint (v1) — replaces §7.4.5 narrative summarization with a structured state snapshot (completed/constraints/open-items/file-hashes), 96% compression vs. full history with higher continuation accuracy, assembled from IPC event stream with zero additional LLM calls; §7.21.5 Context File Auditor (v1.1) — tracks which CLAUDE.md sections are referenced per session, surfaces unused sections with monthly cost estimate, proposes compressed CLAUDE.md; §7.21.6 Prompt Batcher & Anti-Re-Prompt System (v1.1) — detects sequential re-prompting pattern, non-blocking coaching tip after 3 quick follow-ups, Prompt Composer (structured form with token estimate and savings preview), Instruction Queue for deliberate batching; §7.21.7 Zero-Waste Dashboard (v1) — live savings chip in status bar, per-feature breakdown, all-time stats, shareable PNG export card for social proof. Expected combined savings: 40-65% token reduction vs raw CLI. Phase Map and TOC updated.
- v4.3 — Newcomer UX completion pass: three gaps identified via persona review — all fixed. §7.1.9 In-App Help System (v1): panel ? icons with plain-English popovers; first-visit coaching tooltips for every major panel; Help Center panel (F1) with Getting Started / Panel Reference / CLI Comparison / Glossary sections — works offline; What is this? right-click on any UI element; three expertise levels (Guided/Standard/Expert) that adjust help verbosity and metric labels across the whole app. §7.8.11 End-of-Task Summary Card (v1): fires automatically on task completion; Simple Mode shows plain-English summary of file changes for newcomers; Detailed Mode shows full metrics for experts; memory extraction integrated inline; Export Summary as markdown; accessible from session history after dismissal. §7.15.6 Session Organization (v1): folders (one level nested), drag-drop sessions, color tags, automatic smart tags (has-error/high-cost/long/branched), pin up to 8 sessions, archive with auto-archive suggestion after 30 days, filter bar (model/date/cost/tags), right-click session context menu, bulk operations (tag/move/archive/export/delete), default time-based auto-grouping replaced by folder view once first folder created.
- v4.2 — Gap analysis and fixes: §2.1 updated for Antigravity CLI; §2.2 rewritten (AionUi/Nimbalyst invalidate the "no multi-CLI GUI" claim); §2.3 completely rewritten (all three vendors shipped GUIs — the new moat is memory+safety+marketplace, not "being first"); §6.1 architecture diagram updated (Antigravity); §7.0.12 Rate Limit Intelligence & Auto-Fallback (new, v1 — closes Critical pain point gap with full spec: detection, fallback chain, retry queue, rate limit dashboard); §7.0.13 First-Run Onboarding Wizard (new, v1 — CLI detection, API key wizard, first-project flow, safe-mode first turn, tips carousel); §7.10.8 Model Pricing Database (new — specifies how cost intelligence gets accurate pricing data: provider-reported > API > bundled prices.json + 7-day update cache); §12.6 Distribution Channels (new — Homebrew, Winget, apt, AppImage, AUR, Snap, Flatpak, code signing, release cadence); §5.2 Market Analysis updated (added AionUi and CC-Switch); §18.3 Keyboard Shortcuts expanded (added Ctrl+Shift+R raw file mode, Ctrl+Shift+I side chat, Ctrl+Shift+Y replay, Ctrl+Shift+E memory browser, Ctrl+Shift+O LSP symbol search, Ctrl+Shift+D refresh directives, Ctrl+Shift+Enter retry turn); Phase Map updated with §7.0.12 and §7.0.13 rows
- v4.1 — Scope discipline pass: added §7 Feature Phase Map table (v1/v1.1/v2/v3 assignments for every subsection); added phase banners to all 20 subsections; explicitly deferred §7.11 Visual Testing (v2), §7.12 Workflow Automation/Flows (v3), §7.13 Multi-Agent (v2), §7.14 Team Mode (v3), §7.3.7 Graphify (v2), §7.3.8 Agentmemory (v2), §7.15.2-5 Branching/Fork Tree (v2), §7.17 Smart Token Pipeline (v1.1), §7.7.1-2 Project Wizard/Templates (v2), advanced cockpit/safety subsections (v1.1); rewrote Executive Summary §1 to state v1 scope boundary explicitly

-----

## Table of Contents

1. [Executive Summary](#1-executive-summary)
1. [Problem Statement](#2-problem-statement)
1. [Vision & Mission](#3-vision--mission)
1. [Target Users & Personas](#4-target-users--personas)
1. [Market Analysis](#5-market-analysis)
1. [Product Architecture](#6-product-architecture)
1. [Feature Specifications — Complete](#7-feature-specifications--complete)
- 7.0 CLI Feature Parity Foundation
  - 7.0.1 Parity Principle
  - 7.0.2 Stream-JSON / PTY Architecture
  - 7.0.3 Universal Command Palette
  - 7.0.4–7.0.6 Per-CLI Slash Commands
  - 7.0.7 CLI Flags → Settings Panel + Visual Flag Builder (raw preview, presets)
  - 7.0.8 Config Files → Visual Editors
  - 7.0.9 Output Event Types → Visual Components
  - 7.0.10 Cross-CLI Parity Gaps
  - 7.0.11 Raw File Mode (line-number toggle, ~70% overhead reduction)
  - 7.0.12 Rate Limit Intelligence & Auto-Fallback (detection, queue, fallback chain, retry)
  - 7.0.13 First-Run Onboarding Wizard (CLI detection, API key setup, guided first session)
- 7.1 UI/UX Shell
  - 7.1.1–7.1.7 Layout, Status Bar, Diff Renderer, Terminal, Accessibility
  - 7.1.8 Side Chat (branch mini-conversation, read-only context, promote to session)
  - 7.1.9 In-App Help System (panel ? icons, first-visit tooltips, Help Center F1, expertise toggle)
- 7.2 Multi-Model Engine
- 7.3 Persistent Memory System
  - 7.3.1–7.3.6 Memory architecture, storage, extraction, injection, UI, confidence
  - 7.3.7 Graphify Knowledge Graph Engine (AST/tree-sitter, Obsidian vault, MCP server)
  - 7.3.8 Agentmemory 4-Tier Memory (Working/Episodic/Semantic/Procedural, 95.2% R@5, ~1,900 tokens/session)
- 7.4 Context Maintenance Engine
  - 7.4.1–7.4.8 Budget, pinning, heartbeat, summarization, health, continuity, config
  - 7.4.9 Smart Resume (Graph Summary ~5K / Full History / Fresh Start, token comparison)
- 7.5 External Endpoints & Platform Connectivity
- 7.6 Marketplace
  - 7.6.1–7.6.2 Overview, Skills
  - 7.6.3 Plugins + WebAssembly Sandbox (100ms/1MB/100-instruction limits, declared permissions)
  - 7.6.4–7.6.6 MCP Hub, Backend, Revenue Share
- 7.7 Auto Project Setup
- 7.8 Agent Cockpit & Observability
  - 7.8.1–7.8.9 Tool feed, Intent gap, Blast radius, Speculation, Surgical, Assumption logger, Scope meter, Rollback, Repetition detector
  - 7.8.10 Narrative / Semantic View (Log ↔ Narrative toggle, session summary, export)
  - 7.8.11 End-of-Task Summary Card (plain-English task completion, file impact list, memory review integration)
- 7.9 Safety & Trust Layer
- 7.10 Cost Intelligence
  - 7.10.1–7.10.7 Real-time tracker, anomaly detector, cache monitor, burn rate, budget controls, model comparison, quota dashboard
  - 7.10.8 Model Pricing Database (provider-reported, API, bundled prices.json + update cache)
  - 7.10.9 Cost Calm Mode (hide per-turn cost, show session total only; togglable from status bar)
- 7.11 Visual Testing & Preview
- 7.12 Workflow Automation (Flows)
- 7.13 Multi-Agent Orchestration
- 7.14 Team Mode & Collaboration
- 7.15 Session Replay & Branching
  - 7.15.1–7.15.4 Replay, Branching, Export, Search
  - 7.15.5 Fork Tree Visualization (visual hierarchy, cost per branch, compare/merge)
  - 7.15.6 Session Organization — Folders, Tags, Archive (drag-drop folders, color tags, filter bar, bulk ops)
- 7.16 Security & Privacy
- 7.17 Smart Token Pipeline (6-stage, <50ms, 40–60% token reduction, no LLM calls)
  - 7.17.1 Prompt Minifier (Off/Conservative/Balanced/Aggressive)
  - 7.17.2 Context Deduplicator (SHA256 hash registry)
  - 7.17.3 Smart File Loader (Full/Summary/Signature/Omit tiers, TF-IDF relevance)
  - 7.17.4 Conversation Pruner (low-value turn detection, prune preview, restoration)
  - 7.17.5 Output Density Controller (task-type templates, density slider)
  - 7.17.6 Token Budget Forecaster (pre-send estimation, 5K/10K/25K warnings, accuracy tracker)
- 7.18 3-Level Scope Inheritance System (Global 🌐 / Project 📁 / Session 🖥, scope badges, lock mechanism)
- 7.19 Crash Recovery & Session Autosave (4 scenarios, 5s autosave, OS signal handling)
- 7.20 Agent Profiles
  - Built-in: Karpathy Engineer (MIT, 149K stars), Deep Work, Code Review, Exploration, Safe Mode, Overnight Run
  - Custom profiles + CLAUDE.md / AGENTS.md export
- 7.21 Zero-Waste Token Architecture (40-65% token reduction, zero quality loss)
  - 7.21.1 On-Demand MCP Schema Loading (lazy inject, 18-25K tokens/msg waste closed)
  - 7.21.2 Terminal Output Filter (bash output compressed 70-95% before context injection)
  - 7.21.3 Self-Edit Deduplication (SHA256 registry, ~10K tokens saved per write cycle)
  - 7.21.4 Rolling State Checkpoint (state snapshot replaces history, 96% compression)
  - 7.21.5 Context File Auditor (CLAUDE.md unused sections + text densification via Caveman paradigm, v1.1)
  - 7.21.6 Prompt Batcher & Anti-Re-Prompt System (sequential prompting prevention, v1.1)
  - 7.21.7 Zero-Waste Dashboard (live savings chip, per-command breakdown, shareable card, all-time stats)
  - 7.21.8 Code-Execution-as-Retrieval — vs_execute MCP tool (agent writes extraction scripts, 94-99% reduction, v2)
1. [Release Roadmap](#8-release-roadmap)
1. [Technical Architecture](#9-technical-architecture)
  - 9.1–9.3 App structure, process orchestration, memory architecture
  - 9.4 IPC Event Schema — Full Frame Spec (Agent→GUI + GUI→Agent frames, IPC Inspector dev panel)
  - 9.5 Configurable Storage Paths (env vars, Settings → Storage, portable mode)
1. [Data Models](#10-data-models)
1. [API Specifications](#11-api-specifications)
1. [Non-Functional Requirements](#12-non-functional-requirements)
  - 12.1–12.5 Performance, Reliability, Security, Privacy, Binary Size
  - 12.6 Distribution Channels (Homebrew, Winget, apt, AppImage, AUR, Snap, code signing, release cadence)
1. [Success Metrics & KPIs](#13-success-metrics--kpis)
1. [Risks & Mitigations](#14-risks--mitigations)
1. [Competitive Analysis](#15-competitive-analysis)
- 15.1 The Real Competitive Landscape (May 2026) — Tiers 1–4
  - Tier 1: Dominant Open-Source Agents (incl. CC-Switch ~79.6k, Claude Squad ~7.6k)
  - Tier 2: GUI Wrappers (incl. Opcode, AionUi ~26.4k, Vibe Kanban †sunsetted, CodePilot, Parallel Code)
  - Tier 3: Proprietary / Paid Leaders
  - Tier 4: First-Party CLI + Desktop Apps (Claude Code app, Codex app, Antigravity 2.0)
- 15.2 Where AgentLoft Leads — Confirmed Advantages
- 15.3 Where AgentLoft Is Behind — Gaps 1–19
  - Gaps 1–12: Speed, Git, Background Agents, LSP, Docker, GitHub, Autocomplete, Modes, Self-hosted, Perf, Issue-to-PR, Live Co-pilot
  - Gap 13: Antigravity CLI integration
  - Gap 14: UX parity vs. first-party GUIs
  - Gap 15: Opcode differentiation
  - Gap 16: Warp Oz counter-positioning
  - Gap 17: Zed ACP interoperability
  - Gap 18: AionUi — Electron multi-CLI GUI (26,400 stars)
  - Gap 19: CC-Switch — 79,600-star multi-CLI config audience
- 15.4 Gap-Closing Feature Specifications (§15.4.1–15.4.19)
  - §15.4.1–12: Speed Engine, Git, Background Agents, LSP, Docker, GitHub, Autocomplete, Modes, Self-hosted, Perf, Issue-to-PR, Live Co-pilot
  - §15.4.13: Antigravity CLI Integration
  - §15.4.14: UX Parity + Premium Initiative
  - §15.4.15: Memory-First Launch (Opcode differentiation)
  - §15.4.16: Warp Oz Counter-Positioning
  - §15.4.17: ACP Compatibility
  - §15.4.18: AionUi Differentiation Strategy
  - §15.4.19: CC-Switch Audience Acquisition Strategy
- 15.5 Full Feature Matrix (Tier 1 vs. first-party GUIs; Tier 2 vs. open-source/wrappers; second-round competitors)
- 15.6 Positioning Statement
1. [Monetization Strategy](#16-monetization-strategy)
1. [Open Source Strategy](#17-open-source-strategy)
  - 17.1–17.4 License, Contribution Model, Community Infrastructure, RFC Process
  - 17.5 Marketplace Seeding Strategy (20+ skills/MCPs committed before public launch)
1. [Appendix](#18-appendix)
1. [User Control Layer](#19-user-control-layer)
  - 19.1–19.15 Control philosophy, model/context/agent/memory/cost/diff/UI/marketplace/security/multi-agent/automation/session controls, profiles, data model
1. [Visual Design System](#20-visual-design-system)
  - 20.1 Design Philosophy (Glassmorphism + Developer Workbench Constraint)
  - 20.2 Color System (mint #7cc7a0, dark gradient canvas, glass backgrounds)
  - 20.3 Typography (Inter / JetBrains Mono / Georgia)
  - 20.4 Blur Levels (24-30px heavy / 16-20px medium / 8-12px light / 4px subtle)
  - 20.5 Layout System (bento grid 200px | 1fr | 240px)
  - 20.6 Corner Rounding (3-4px badges / 5-7px buttons / 8-12px panels)
  - 20.7 Required Control Surfaces
  - 20.8 Shadows & Animation
  - 20.9 Iconography (Feather Icons MIT)
  - 20.10 Dark Mode & Theme Extensibility
1. [Legal & Compliance](#21-legal--compliance)
  - 21.1 CLI Wrapping License Review (P1)
  - 21.2 Plugin WASM Sandbox compliance (P0)
  - 21.3 Export Controls (P0)
  - 21.4 Data Privacy — Local-First Claim (P0)
  - 21.5 Agentmemory & Graphify Privacy (P1)
  - 21.6 Open Source Dependency Compliance + SBOM (P1)
  - 21.7 vs_execute Code Execution Liability (P1)
  - 21.8 GDPR & Cloud Data Compliance (P1)
  - 21.9 AGPL Contamination Prevention (P1)
  - 21.10 AI-Generated Code Ownership (P1)
  - 21.11 Remediation Priority Summary

-----

## 1. Executive Summary

**What AgentLoft is (v1):** A free, open-source GUI that wraps Claude Code, OpenAI Codex CLI, and Antigravity CLI as child processes — so users get the full power of all three agents through a premium visual interface instead of a terminal. Same API keys, same subscriptions, same models. Just no terminal required.

**What AgentLoft adds on top:** Persistent memory across sessions, real-time context health monitoring, live cost tracking, agent observability (every tool call visible and inspectable), permission control with blast radius preview, and a marketplace for skills and MCPs. All local-first; nothing leaves your machine by default.

**What AgentLoft is NOT in v1:** A visual testing engine, a workflow pipeline builder, a multi-agent orchestration platform, or a team collaboration SaaS. Those are v2/v3 features. See the Phase Map in §7 for the full scope boundary.

**The core thesis:** The raw intelligence of these CLI agents is world-class. The developer experience around them is a wall. AgentLoft tears down the wall without replacing the engine.

**Important update (May 2026):** All three target vendors have now shipped first-party desktop GUIs (Anthropic April 2026, OpenAI March 2026, Google Antigravity 2.0 May 2026). Additionally, Google's Gemini CLI is being deprecated June 18, 2026 in favor of Antigravity CLI. AgentLoft's core differentiator shifts from "the only GUI" to "the only unified, model-agnostic GUI with persistent memory, cost intelligence, and a community marketplace." See Section 15 for the full updated competitive analysis.

**Target GitHub star milestone:** 50,000–80,000 stars within 18 months of launch. *Revised upward in v4.0 based on market comparables: Codex CLI (75.6k), Gemini CLI (105k at deprecation), OpenHands (74k+), Cline (60k), and Opcode/Claudia (21.9k for a Claude-only GUI wrapper with no memory). AgentLoft's multi-model + memory + marketplace positioning places it in the platform tier rather than the single-tool GUI tier.*

**Primary monetization:** Free and open-source core. AgentLoft Cloud (team sync, shared memory, session sharing) is a paid SaaS layer. Marketplace revenue share is a future vector.

-----

## 2. Problem Statement

### 2.1 The Vibecoder’s Actual Day

A developer using Claude Code, Codex CLI, or Antigravity CLI (formerly Gemini CLI) today experiences the following pain points repeatedly, every session:

|Pain Point                                           |Frequency             |Severity|
|-----------------------------------------------------|----------------------|--------|
|Context lost mid-task due to auto-compaction         |Every long session    |Critical|
|Agent touches files it wasn’t asked to touch         |Multiple times per day|Critical|
|Cost spikes 10–20x with no warning                   |Unpredictable         |Critical|
|Model “forgets” the codebase between sessions        |Every new session     |Critical|
|No visual way to see what the agent changed and where|Every session         |High    |
|Agent fixes one bug, creates two new ones            |Multiple times per day|High    |
|Rate limits hit with no visibility or fallback       |Daily                 |High    |
|Skills activate or refuse to activate unpredictably  |Often                 |High    |
|Long autonomous runs drift from the original spec    |Every long session    |High    |
|No way to verify UI changes without manual testing   |Every frontend task   |High    |
|Terminal UX is a wall for non-expert vibecoders      |Always                |High    |
|No replay or rollback when agent goes wrong          |Every bad session     |Medium  |
|MCP setup is complex and undiscoverable              |Onboarding            |Medium  |

### 2.2 What Doesn’t Exist Yet

> **May 2026 landscape note:** AionUi (~26,400 stars) and Nimbalyst now offer multi-CLI GUIs. All three target vendors (Anthropic, OpenAI, Google) have shipped first-party desktop apps. The gaps that remain are specifically around memory, cost intelligence, safety rails, and a unified cross-provider community marketplace. The items below reflect the updated honest assessment.

- **No free, open-source, cross-CLI GUI with persistent memory.** AionUi wraps many CLIs but has no persistent memory, no cost intelligence, and runs on heavy Electron (~200MB). First-party apps are single-provider and have no cross-session memory.
- **No tool gives real-time context health monitoring** with dead-zone detection, directive heartbeat, and automatic rescue — this is unique to AgentLoft.
- **No tool provides autonomous agent safety rails at the tool-call level** — blast radius preview, assumption logger, regression shield, and prompt decay detection do not exist anywhere else.
- **No tool has a community marketplace for skills, plugins, and MCPs** with one-click install, sandboxed execution, and revenue share. Cline has an MCP catalog; nothing has a full three-tier marketplace.
- **No free tool has model-agnostic cost intelligence** — real-time spend tracking, anomaly detection, cache health monitoring, and cross-model cost comparison exist in no open-source tool.
- **No tool has built-in visual testing / live preview tied to agent output** — embedded Chromium, screenshot diff, and auto-interaction testing tied to agent writes are unique to AgentLoft (v2).

### 2.3 Why Now

The first-party GUI moment has passed — and that's actually the opening. In April–May 2026, Anthropic, OpenAI, and Google each shipped their own desktop GUI for their own CLI. Each one is polished, fast, and free. And each one is a dead end: single-provider, no persistent memory, no cross-model cost intelligence, no community marketplace.

The developer community responded predictably: CC-Switch (79,600 GitHub stars) shows a massive audience already managing 5 CLIs simultaneously. AionUi (26,400 stars) proves users want a multi-CLI GUI even if it's built on heavy Electron with no memory. Opcode (21,900 stars) proves that even a Claude-only GUI with no memory earns tens of thousands of stars on "better UX than the terminal" alone.

**The window now open is not "build a GUI before vendors do" — it's "build the memory, safety, and marketplace layer that vendors will never build, because it requires being model-agnostic."** No single vendor will ever ship persistent cross-provider memory. No single vendor will ever compare costs across competitor models. No single vendor will ever build a marketplace for community plugins that work across Claude, Codex, and Antigravity. These are AgentLoft's structural moats — and they are permanent because they require multi-model neutrality.

The community is large (millions of CLI agent users), the market is fragmented (first-party apps fragment the audience further), the tooling is still hostile for non-expert users, and the memory+safety+marketplace gap is real, measured, and unaddressed by any competitor.

-----

## 3. Vision & Mission

**Vision:** The operating system for AI-assisted software development.

**Mission:** Give every developer — from first-time vibecoder to senior engineer — a safe, observable, memorable, and delightful experience using AI coding agents, regardless of which model they use or how complex their project is.

**Design Principles:**

1. **Transparency over magic** — every agent action is visible, inspectable, and reversible
1. **Bring your own keys** — zero lock-in, zero subscriptions required to use core features
1. **Local-first** — all memory, context, and session data stored on your machine by default
1. **Model-agnostic** — Claude, Codex, Gemini, Ollama, Groq all treated equally
1. **Community-driven** — the marketplace and plugin system make users contributors

-----

## 4. Target Users & Personas

### Persona 1: The Vibecoder (Primary)

- **Who:** Non-traditional developer, designer, founder, or product manager building software with AI
- **Technical level:** Low to medium
- **Pain:** Terminal feels hostile; loses context constantly; can’t tell if agent is doing the right thing
- **Goal:** Build a working product without needing to understand every line of code
- **AgentLoft value:** Gives them a GUI that feels like a premium app, not a terminal hack

### Persona 2: The Power Developer (Primary)

- **Who:** Senior engineer using CLI agents daily as a productivity multiplier
- **Technical level:** High
- **Pain:** Agents are smart but unpredictable; cost explosions; no rollback; bad multi-file edits
- **Goal:** Use AI agents reliably in production-grade codebases without babysitting every action
- **AgentLoft value:** Agent cockpit, blast radius preview, regression shield, surgical mode

### Persona 3: The Indie Hacker / Solo Founder (Primary)

- **Who:** Building a SaaS or product solo, shipping fast
- **Technical level:** Medium
- **Pain:** Constantly context-switching between models, managing costs, setting up new projects
- **Goal:** Ship faster, waste less time on setup and debugging AI mistakes
- **AgentLoft value:** Auto project setup, cost intelligence, cross-model comparison

### Persona 4: The Team Lead (Secondary)

- **Who:** Engineering lead whose team is adopting AI coding agents
- **Technical level:** High
- **Pain:** No visibility into what AI is generating across the team; code review is overwhelmed
- **Goal:** Maintain code quality while letting the team move fast with AI
- **AgentLoft value:** Team mode, shared memory, audit log, drift guard

### Persona 5: The Learner (Secondary)

- **Who:** Developer learning to code, using AI as a teacher and collaborator
- **Technical level:** Low
- **Pain:** Agent output is overwhelming; no explanation of what it’s doing or why
- **Goal:** Learn while building, not just accept code blindly
- **AgentLoft value:** Assumption logger, thought trace rendering, session replay as tutorial

-----

## 5. Market Analysis

### 5.1 Market Size

- 27M+ professional developers globally (Stack Overflow 2025)
- ~40% actively using AI coding tools (up from 10% in 2023)
- AI coding tools market: $4.7B in 2025, projected $22B by 2028
- CLI agent users (Claude Code + Codex + Gemini CLI): estimated 3–5M monthly active as of mid-2026

### 5.2 Competitive Landscape

> **May 2026 update:** All three target CLI vendors have shipped first-party GUIs (see Section 15 for full analysis). AgentLoft’s positioning has evolved from "the only GUI wrapper" to "the only unified, model-agnostic GUI with persistent memory, cost intelligence, and a community marketplace."

|Tool              |Type                  |Strength                        |Gap AgentLoft Fills                          |
|------------------|----------------------|--------------------------------|-----------------------------------------------|
|Cursor            |IDE ($20–200/mo)      |Polished, best autocomplete     |Lock-in, subscription, single model, no memory|
|Windsurf          |IDE ($15/mo)          |Cascade agentic mode, codemaps  |Proprietary, acquired by Cognition, no memory  |
|GitHub Copilot    |IDE extension ($10/mo)|Deep GH integration, 20M users  |No persistent memory, usage-based billing 2026 |
|Claude Code       |CLI + desktop app     |Best-in-class reasoning         |Claude-only, no memory, no marketplace         |
|Codex CLI / app   |CLI + desktop app     |OpenAI ecosystem, 75k stars     |OpenAI-only, no memory, no marketplace         |
|Antigravity CLI   |CLI + desktop app     |Google grounding, large context |Google-only, no memory, no marketplace         |
|Aider             |CLI (41k stars)       |Solid git workflow              |CLI only, no GUI, no memory, no marketplace    |
|OpenHands         |Autonomous platform   |Docker sandbox, 74k stars       |No GUI, steep setup, cloud-only for teams      |
|OpenCode/Crush    |Terminal agent        |75+ model providers, LSP        |No GUI, no persistent memory, no marketplace   |
|Opcode (Claudia)  |Desktop GUI (21.9k★)  |Claude Code GUI, Tauri 2        |Claude-only, no memory, no marketplace         |
|Nimbalyst         |Desktop GUI           |Claude + Codex GUI, free        |No persistent memory, no marketplace           |
|Warp (Oz)         |Terminal + agents     |700k users, runs all 3 CLIs     |Terminal-centric, not a true GUI workspace     |
|Zed (ACP)         |Editor (40k stars)    |Fast, hosts external CLI agents |Editor-first, not a standalone agent GUI       |
|Continue.dev      |VS Code/JetBrains ext |Open source, model-agnostic     |No persistent memory, not agentic              |
|AionUi            |Desktop GUI (26.4k★)  |GUI for 20+ CLIs, Discord/Slack bridges|Electron (200MB), no persistent memory, no cost intelligence, no marketplace|
|CC-Switch         |CLI config (79.6k★)   |Config switcher for 5 CLIs — highest-starred tool in space|No GUI, no memory, no sessions — pure CLI config. Primary acquisition target.|

**AgentLoft’s unique position:** The only tool that unifies Claude Code, Codex CLI, and Antigravity CLI (plus open-source agents and local models) in a single model-agnostic GUI with persistent cross-session memory, cost intelligence, agent safety rails, visual testing, and a community marketplace — all free and open-source.

-----

## 6. Product Architecture

### 6.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AgentLoft App                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React Frontend                        │   │
│  │  Chat UI │ File Tree │ Agent Cockpit │ Marketplace       │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │ IPC / Tauri Commands                   │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │                   Rust Core (Tauri)                      │   │
│  │  Process Manager │ IPC Bridge │ File Watcher │ Security  │   │
│  └──────┬───────────────────────────────────┬──────────────┘   │
│         │                                   │                   │
│  ┌──────▼──────────┐              ┌─────────▼──────────────┐   │
│  │  CLI Process    │              │   Local Services        │   │
│  │  Orchestrator   │              │   LanceDB (memory)      │   │
│  │  ┌───────────┐  │              │   SQLite (sessions)     │   │
│  │  │Claude Code│  │              │   File Watcher          │   │
│  │  │Codex CLI  │  │              │   Secret Scanner        │   │
│  │  │Antigravity│  │              │   Context Engine        │   │
│  │  │Custom API │  │              │   Cost Tracker          │   │
│  │  └───────────┘  │              └────────────────────────┘   │
│  └─────────────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Technology Stack

|Layer              |Technology                     |Rationale                                             |
|-------------------|-------------------------------|------------------------------------------------------|
|Desktop shell      |Tauri 2 (Rust)                 |~15MB binary, native performance, better than Electron|
|Frontend           |React 19 + TypeScript          |Ecosystem, component reuse, dev familiarity           |
|UI components      |Radix UI + Tailwind CSS        |Accessible, unstyled primitives + utility CSS         |
|State management   |Zustand + React Query          |Lightweight, no boilerplate                           |
|Local vector DB    |LanceDB (embedded)             |No server needed, Rust-native, fast                   |
|Local relational DB|SQLite via sqlx                |Sessions, settings, audit log                         |
|File watching      |Notify (Rust crate)            |Cross-platform, low overhead                          |
|Process spawning   |Tokio process (Rust)           |Async, PTY support via portable-pty                   |
|Markdown rendering |MDX + Shiki                    |Code highlighting, math, diagrams                     |
|Diff rendering     |Monaco Editor                  |Best-in-class diff view, familiar                     |
|IPC                |Tauri commands + events        |Typed, bidirectional, fast                            |
|Installer          |Tauri Updater + GitHub Releases|Auto-update, signed binaries                          |

### 6.3 Cross-Platform Support

|Platform             |Status   |Notes                          |
|---------------------|---------|-------------------------------|
|macOS (Apple Silicon)|Primary  |First-class support, native ARM|
|macOS (Intel)        |Primary  |Universal binary               |
|Windows 10/11        |Primary  |Full feature parity            |
|Linux (Ubuntu/Debian)|Primary  |AppImage + .deb                |
|Linux (other distros)|Community|AppImage covers most           |

-----

## 7. Feature Specifications — Complete

> **How to read this section:** Every subsection is tagged with its target phase. Build in phase order. Do not implement a v2 feature to unblock a v1 feature — redesign the v1 feature instead.

### Phase Map — What Ships When

| Section | Feature | Phase | Rationale |
|---------|---------|-------|-----------|
| 7.0 | CLI Feature Parity Foundation | **v1** | The entire product thesis. Nothing ships without this. |
| 7.0.12 | Rate Limit Intelligence & Auto-Fallback | **v1** | Rate limits are a daily High-severity pain point (§2.1). Not shipping this makes v1 feel broken. |
| 7.0.13 | First-Run Onboarding Wizard | **v1** | Essential for Persona 1. Goal: first successful agent turn within 3 minutes of install. |
| 7.1.1–7.1.7 | UI/UX Shell (layout, status bar, diff, terminal, accessibility) | **v1** | Core shell required for everything else. |
| 7.1.8 | Side Chat | **v1.1** | Useful, not blocking. |
| 7.1.9 | In-App Help System | **v1** | No help system = newcomers are lost. First-visit tooltips + Help Center + expertise toggle. |
| 7.2 | Multi-Model Engine | **v1** | Multi-CLI is the key differentiator over Opcode. |
| 7.3.1–7.3.6 | Persistent Memory (LanceDB, extraction, injection, UI) | **v1** | Memory is the launch differentiator vs. all first-party GUIs. |
| 7.3.7 | Graphify Knowledge Graph | **v2** | Bundled Python runtime adds complexity. Powerful but not core GUI wrapper. |
| 7.3.8 | Agentmemory 4-Tier | **v2** | Layered on top of existing memory, not a replacement. Add after v1 memory is stable. |
| 7.4 | Context Maintenance Engine | **v1** | Context health is directly tied to the cost/usability thesis. |
| 7.5 | External Endpoints & Connectivity | **v1** | Required to support multi-CLI architecture. |
| 7.6.1–7.6.2 | Marketplace — Skills + MCP Hub | **v1** | Community flywheel starts here. Keep it simple: browse + one-click install. |
| 7.6.3 | Plugins (Web Worker sandbox) | **v1.1** | Web Worker version ships in v1.1; WASM upgrade in v2. |
| 7.6.4 | MCP Hub full (Composer) | **v1.1** | Basic MCP install in v1; visual MCP Composer is v1.1. |
| 7.6.5–7.6.6 | Marketplace Backend / Revenue Share | **v1 / v3** | Static registry ships v1; revenue share is v3. |
| 7.7.3 | Auto-Detect on Existing Projects | **v1** | Low effort, high impact — generates context.yaml + CLAUDE.md on open. |
| 7.7.1–7.7.2 | Project Wizard + Templates | **v2** | Valuable but requires template maintenance infrastructure. |
| 7.8.1–7.8.3 | Cockpit — Tool feed, Intent gap, Blast radius | **v1** | Core observability. This is what makes AgentLoft a workbench, not a chat box. |
| 7.8.8 | Rollback System — basic (auto-checkpoint before every write batch + one-click restore) | **v1** | Losing work with no undo is a day-1 trust killer. Auto-checkpoint is trivially cheap; basic restore ships v1. Timeline view and branch-from-checkpoint are v1.1. |
| 7.8.4–7.8.7, 7.8.9–7.8.10 | Cockpit advanced (Speculation, Surgical, Assumption logger, Scope meter, Repetition Detector, Narrative view) | **v1.1** | Polish features after core cockpit is solid. Advanced Rollback UI (timeline, branch) also v1.1. |
| 7.8.11 | End-of-Task Summary Card | **v1** | Mission-critical for Vibecoder persona. Plain-English answer to "what just happened?" |
| 7.9.1–7.9.2 | Safety — Permission system, Regression shield | **v1** | Permission system is non-negotiable for trust. Regression shield is a key differentiator. |
| 7.9.3–7.9.5 | Safety advanced (Drift guard, Protected zones, Prompt decay) | **v1.1** | Refine safety model after v1 usage data. |
| 7.10 | Cost Intelligence (§7.10.1–7.10.8 incl. Model Pricing DB) | **v1** | Real-time cost visibility is a core pain-point from §2.1. Pricing database spec added in §7.10.8. |
| 7.11 | Visual Testing & Preview | **v2** | Bundled Playwright, screenshot diffing — standalone product complexity. Not a GUI wrapper feature. Deferred. |
| 7.12 | Workflow Automation (Flows) | **v3** | This is a separate product (visual pipeline builder). Deferred until v1+v2 are proven. |
| 7.13 | Multi-Agent Orchestration | **v2** | Legitimate feature, but requires stable single-agent foundation first. |
| 7.14 | Team Mode & Collaboration | **v3** | Requires AgentLoft Cloud backend. Out of scope until SaaS infrastructure exists. |
| 7.15.1 | Session Replay (recording + playback) | **v1** | Recording is cheap; playback is high-value for debugging. |
| 7.15.2 | Session Branching | **v2** | Needs stable session model first. Complex in-memory context clone. |
| 7.15.3 | Session Export | **v1** | JSON + markdown export is a few hours of work. Ships in v1. |
| 7.15.4 | Session Search | **v1** | Full-text search across SQLite. Ships in v1. |
| 7.15.5 | Fork Tree Visualization | **v2** | Visual hierarchy of branched sessions; requires §7.15.2 Branching to exist first. |
| 7.15.6 | Session Organization — Folders, Tags, Archive | **v1** | Without organization, session history is unusable within 2 weeks of regular use. |
| 7.16 | Security & Privacy | **v1** | Local-first claim requires this from day one. |
| 7.17 | Smart Token Pipeline | **v1.1** | 40–60% savings is compelling, but the pipeline adds complexity. Prove the core product first. |
| 7.18 | 3-Level Scope Inheritance | **v1** | Scope badges and override arrows are pure UI — no new backend. Ships with Settings panel. |
| 7.19.1–7.19.2 | Crash Recovery (clean exit + crash detection) | **v1** | Autosave is trivial. `shutdown_complete` marker detection is a weekend of work. |
| 7.19.3–7.19.4 | Crash Recovery (OS restart + agent crash) | **v1.1** | OS signal handling is platform-specific. Add after v1 crash basics are solid. |
| 7.20 | Agent Profiles (Karpathy + built-ins) | **v1** | Profiles are YAML + system prompt — almost zero implementation cost, high marketing value. |
| 7.21.1 | Zero-Waste: On-Demand MCP Schema Loading | **v1** | #1 documented waste source: 18-25K tokens/message for unused MCP schemas. Fixes at IPC layer. |
| 7.21.2 | Zero-Waste: Terminal Output Filter | **v1** | npm test / cargo build dumps 8K+ tokens of output. Compress to errors + summary before context injection. |
| 7.21.3 | Zero-Waste: Self-Edit Deduplication | **v1** | Agent rereads files it just wrote. SHA256 registry at IPC layer, ~10K tokens saved per write cycle. |
| 7.21.4 | Zero-Waste: Rolling State Checkpoint | **v1** | Replaces §7.4.5 narrative summary with a state snapshot. 96% compression with higher continuation accuracy. |
| 7.21.7 | Zero-Waste: Savings Dashboard | **v1** | Aggregates all savings counters. High marketing value — shareable proof of AgentLoft efficiency. |
| 7.21.5 | Zero-Waste: Context File Auditor | **v1.1** | Needs v1 session data to compute accurate last-referenced dates. Ships with v1.1. |
| 7.21.6 | Zero-Waste: Prompt Batcher | **v1.1** | Behavioral intervention. Needs v1 usage data to calibrate detection threshold. |
| 7.21.8 | Zero-Waste: Code-Execution-as-Retrieval (vs_execute MCP tool) | **v2** | Requires Docker Sandbox (§15.4.5, v2). 94-99% reduction on raw data injection. |

**V1 definition:** Everything tagged `v1` above, shipped together. Goal: first public release that earns the first 1,000 GitHub stars.
**V1.1 definition:** Polish release 6–8 weeks after v1. Fills in the advanced features of already-present panels.
**V2 definition:** Platform expansion — Graphify, Agentmemory, Multi-Agent, Visual Testing. Goal: 10,000 stars.
**V3 definition:** SaaS layer — Team Mode, Flows, Revenue Share. Goal: first paying customers.

-----

### 7.0 CLI Feature Parity Foundation

> **Phase: v1 — Core thesis. Every feature in 7.0 ships in v1. Nothing in AgentLoft can launch without complete CLI parity.**

> **This section is the bedrock.** Before any extra feature ships, AgentLoft must provide a complete visual equivalent for every action a user can take in the CLI. If you can do it in the terminal, you can do it in AgentLoft. This section specifies exactly what that means.

#### 7.0.1 The Parity Principle

AgentLoft is not a reimplementation of Claude Code, Codex CLI, or Antigravity CLI. It wraps the user's existing installed CLI tools and renders their output visually. The rule is simple:

> **Every command, flag, permission mode, keyboard shortcut, and configuration option that exists in the CLI must have a discoverable visual equivalent in AgentLoft. No CLI feature is dropped or hidden.**

This means:
- A user who has used Claude Code in the terminal for 6 months can open AgentLoft and immediately find everything they already know — just with buttons, dropdowns, and panels instead of typed commands.
- A user who has never touched a terminal can use AgentLoft and get the full power of all three CLI agents without ever learning a single slash command.
- Both users are using the same underlying CLI — same API key, same subscription, same models.

#### 7.0.2 Integration Architecture — Stream-JSON Primary, PTY Fallback

AgentLoft does **not** emulate a terminal. It uses each CLI's native structured output mode — designed specifically for programmatic integration — and renders the structured events as visual components.

```
┌─────────────────────────────────────────────────────────────────┐
│                        AgentLoft                              │
│                                                                 │
│  User types prompt → AgentLoft writes to CLI's stdin          │
│                                                                 │
│  CLI launched as:                                               │
│    claude --print --output-format stream-json --continue        │
│    codex exec --json                                            │
│    gemini --output-format stream-json                           │
│                                                                 │
│  CLI emits structured JSON events on stdout:                    │
│  {"type":"text_chunk","content":"..."}                          │
│  {"type":"tool_use","name":"write_file","input":{...}}          │
│  {"type":"permission_request","action":"bash","command":"..."}  │
│  {"type":"cost_update","total_usd":0.043}                       │
│                                                                 │
│  AgentLoft parses events → renders as visual components       │
│                                                                 │
│  ┌──────────┐  ┌────────────┐  ┌───────────────┐  ┌─────────┐  │
│  │Chat panel│  │Tool call   │  │Permission     │  │Cost     │  │
│  │          │  │feed        │  │modal dialog   │  │ticker   │  │
│  └──────────┘  └────────────┘  └───────────────┘  └─────────┘  │
│                                                                 │
│  PTY fallback: xterm.js panel for commands that require a real  │
│  terminal (vim inside agent, raw bash, interactive git rebase)  │
└─────────────────────────────────────────────────────────────────┘
```

**Why stream-json mode, not PTY:**
- Structured, reliable — not fragile string/ANSI parsing
- Every new CLI feature emits structured events automatically
- Permission prompts arrive as JSON objects — rendered as proper modal dialogs
- Cost data comes pre-parsed — no regex scraping
- Works headlessly for background agents

**When PTY is used:**
- When the user opens the embedded "Escape Hatch Terminal" panel (`⌘\`)
- When the agent spawns an interactive subprocess (vim, htop, git interactive rebase)
- For any command the CLI runs that requires full TTY interaction

**Session continuity:** AgentLoft uses `--continue` / `--resume` flags to resume sessions. All session state lives in the CLI's own `~/.claude/`, `~/.codex/`, `~/.gemini/` directories — AgentLoft never maintains a parallel session store that could drift from CLI state.

---

#### 7.0.3 Universal Command Palette — All CLI Commands in One Place

Every slash command from every CLI is surfaced in AgentLoft's Command Palette (`⌘K`). Commands are tagged by which CLI they belong to and organized by functional group. Typing any command name, alias, or description finds it.

```
⌘K  Search commands...
────────────────────────────────
SESSION          [Claude] [Codex] [Gemini]
  New session              /clear  /new    /clear
  Resume session           /resume /resume /chat
  Branch conversation      /branch /fork   —
  Rename session           /rename —       —
  Export session           /export —       —

CONTEXT
  Compress context         /compact /compact /compress
  View context usage       /context —        —
  Add directory to context /add-dir  /add-dir  /directory
  Edit project memory      /memory  —         /memory
  Refresh memory           —        —         /memory refresh

MODEL & EFFORT
  Switch model             /model   /model   /model
  Set effort level         /effort  —        —
  Toggle fast mode         /fast    /fast    —
  Toggle extended thinking (Option+T) —      —

PERMISSION & SAFETY
  Set permission mode      Shift+Tab Shift+Tab Shift+Tab
  Enter plan mode          /plan    /plan    /plan
  Manage permissions       /permissions /permissions /permissions
  Restore files            —        —        /restore

OBSERVABILITY
  Session cost & stats     /usage   /status  /stats
  View diff                /diff    /diff    —
  View tool call log       Ctrl+O   Ctrl+O   Ctrl+O

GIT & CODE REVIEW
  Review PR                /review  /review  —
  Security review          /security-review — —
  Install GitHub app       /install-github-app — /setup-github

MCP
  Manage MCP servers       /mcp     /mcp     /mcp

BACKGROUND & AUTOMATION
  Run as background agent  /background — —
  View background tasks    /tasks   —   /shells
  Set a goal               /goal    /goal —
  Schedule routine         /schedule — —

CONFIG & SETTINGS
  Open settings            /config  —       /settings
  Diagnose installation    /doctor  —       —
  View/edit hooks          /hooks   —       /hooks
  Manage skills            /skills  /plugins /skills

ACCOUNT
  Login                    /login   /login   /auth
  Logout                   /logout  /logout  —
```

---

#### 7.0.4 Claude Code: Slash Commands → GUI Elements

**Session Management**

| CLI Command | Aliases | GUI Element | Location |
|---|---|---|---|
| `/clear` | `/reset`, `/new` | "New session" button | Session header |
| `/resume [session]` | `/continue` | Session history panel → double-click to resume | Left sidebar |
| `/branch [name]` | `/fork` | "Branch here" button in conversation | Per-message menu |
| `/rename [name]` | — | Session title → click to rename | Session header |
| `/export [filename]` | — | "Export session" in session menu | Session overflow menu |
| `/rewind` | `/checkpoint`, `/undo` | Timeline slider → drag to rewind | Checkpoint panel |
| `/background [prompt]` | `/bg` | "Send to background" button | Session toolbar |
| `/goal [condition]` | — | Goal input field above chat | Session header |

**Context & Memory**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/compact [instructions]` | "Compress context" button + optional instructions field | Context health panel |
| `/context [all]` | Token usage bar with color-coded segments (system/memory/files/conversation) | Status bar + Context panel |
| `/add-dir <path>` | "Add directory" folder picker | File tree header |
| `/memory` | Memory editor panel — view, add, edit, delete entries | Right panel → Memory tab |
| `/memory edit` | Opens CLAUDE.md in built-in editor | Memory editor |

**Model & Effort**

| CLI Command / Shortcut | GUI Element | Location |
|---|---|---|
| `/model [model]` | Model selector dropdown with full model list | Session header |
| `/effort [level]` | Effort slider: Low / Medium / High / XHigh / Max | Session header |
| `/fast [on\|off]` | "Fast mode" toggle | Session toolbar |
| `Option+T` (thinking toggle) | "Extended thinking" toggle with visual indicator | Session toolbar |
| `Shift+Tab` (permission mode cycle) | Permission mode selector: segmented control | Session header |

**Permission Modes (Shift+Tab cycle)**

| CLI Mode | GUI Label | Visual State |
|---|---|---|
| `default` | Ask | Blue shield icon |
| `acceptEdits` | Auto-edit | Yellow pencil icon |
| `plan` | Plan only | Purple eye icon (read-only indicator) |
| `auto` | Auto | Green auto icon |
| `bypassPermissions` | YOLO | Red warning icon + red header bar |

**Observability**

| CLI Command / Shortcut | GUI Element | Location |
|---|---|---|
| `/usage` / `/cost` / `/stats` | Cost dashboard: session cost, tokens, cache hit rate | Status bar + Usage panel |
| `/diff` | Diff viewer: uncommitted changes + per-turn diffs with navigation | Diff panel |
| `/status` | Status chip showing version, model, account, connectivity | Status bar |
| `Ctrl+O` (transcript viewer) | Tool call feed panel — expandable per-message | Cockpit panel |
| `/context` | Context window visualization: colored segments + optimization tips | Context panel |

**Git & Review**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/review [PR]` | "Review PR" button → PR selector | Git panel |
| `/security-review` | "Security scan" button | Git panel |
| `/install-github-app` | GitHub integration setup wizard | Settings → Integrations |
| `/ultrareview [PR]` | "Deep review" button (cloud multi-agent review) | Git panel |

**MCP**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/mcp` | MCP server manager: list, add, remove, test connection, view logs | Right panel → MCP tab |
| `claude mcp add` | "Add MCP server" form: name, command, args, env vars | MCP manager |
| `claude mcp add-json` | JSON paste-in field | MCP manager → Advanced |
| `claude mcp add-from-claude-desktop` | "Import from Claude Desktop" one-click button | MCP manager |

**Background & Automation**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/background [prompt]` | "Run in background" button → minimizes to tray with progress | Session toolbar |
| `/tasks` | Background task manager panel: status, progress, cost, kill button | Bottom panel |
| `/goal [condition]` | Goal input field + completion indicator | Session header |
| `/schedule [description]` | Routines manager: create, list, run, delete | Settings → Routines |
| `/hooks` | Hooks configuration: event → command mappings | Settings → Hooks |
| `/loop [interval]` | "Loop this" button + interval picker | Session toolbar |

**Skills & Commands**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/skills` | Skill browser: list, enable/disable, sort by tokens | Skill browser panel |
| Any skill (`/run`, `/verify`, etc.) | Listed in Command Palette with skill description | ⌘K |
| `/plugin` | Plugin manager: install, remove, configure | Settings → Plugins |
| `/mcp__<server>__<prompt>` | MCP prompt listed in Command Palette under server name | ⌘K → MCP section |

**Utility & Settings**

| CLI Command | GUI Element | Location |
|---|---|---|
| `/config` | Settings panel | `⌘,` |
| `/doctor` | Diagnostics view: checks with status and auto-fix button | Help → Diagnostics |
| `/init` | Project setup wizard → generates CLAUDE.md | Project menu |
| `/permissions` | Permission rules editor: allow/ask/deny per tool | Settings → Permissions |
| `/terminal-setup` | Terminal keybinding setup (for the escape hatch terminal) | Settings → Terminal |
| `/theme` | Theme picker | Settings → Appearance |
| `/keybindings` | Keybinding editor | Settings → Keybindings |
| `/login` / `/logout` | Account panel | Settings → Account |
| `/feedback` | Feedback form | Help → Send feedback |
| `/voice [hold\|tap\|off]` | Voice mode toggle with mode selector | Session toolbar |
| `/mobile` | QR code panel for mobile app | Help → Mobile app |
| `/copy [N]` | "Copy response" button on each message | Per-message action bar |
| `/desktop` | "Open in AgentLoft" (if inside another UI) | N/A — already in AgentLoft |

---

#### 7.0.5 Codex CLI: Slash Commands → GUI Elements

| CLI Command | GUI Element | Location |
|---|---|---|
| `/new` | "New thread" button | Session header |
| `/resume` | Session history → resume | Left sidebar |
| `/fork` | "Branch here" per-message button | Per-message menu |
| `/compact` | "Compress context" button | Context panel |
| `/side` | "Side question" input (ephemeral, not added to history) | Chat input → overflow |
| `/status` | Status panel: model, approval mode, token usage, rate limits | Status bar |
| `/model` | Model selector dropdown | Session header |
| `/fast` | Fast tier toggle | Session toolbar |
| `/personality [style]` | Communication style selector: Friendly / Pragmatic / None | Settings → Model behavior |
| `/plan` | Plan mode toggle → shows proposed steps before execution | Session header |
| `/goal` | Goal field | Session header |
| `/permissions` | Permission rules editor | Settings → Permissions |
| `/approve` | "Retry denied action" button | Inline on rejected tool call |
| `/mcp` | MCP server list panel | Right panel → MCP tab |
| `/ide` | IDE context sync toggle | Session toolbar |
| `/mention` | File attachment picker | Chat input → `@` |
| `/diff` | Diff panel | Diff tab |
| `/review` | PR review launcher | Git panel |
| `/copy` | Copy button on messages | Per-message action bar |
| `/theme` | Theme picker | Settings → Appearance |
| `/init` | Project setup wizard → generates AGENTS.md | Project menu |
| `/apps` | Connector browser | Settings → Connectors |
| `/plugins` | Plugin manager | Settings → Plugins |
| `/feedback` | Feedback form | Help → Send feedback |
| `/experimental` | Feature flags panel | Settings → Experimental |
| `/sandbox-add-read-dir` | "Add read directory" in sandbox settings | Settings → Sandbox |
| `/debug-config` | Diagnostics panel | Help → Diagnostics |
| `/image` | Image attachment button | Chat input toolbar |

**Codex-specific approval modes** (mapped to same visual state machine as Claude Code):

| Codex Mode | GUI Label | Visual State |
|---|---|---|
| `untrusted` | Ask everything | Blue shield |
| `on-request` | Auto-read, ask for writes | Yellow pencil |
| `never` | Full auto | Green auto icon |

**Codex-specific sandbox modes:**

| Codex Sandbox Mode | GUI Label | Visual Indicator |
|---|---|---|
| `read-only` | Read only | Lock icon in status bar |
| `workspace-write` | Project only | Folder-scoped icon |
| `danger-full-access` | Full access | Red warning icon |

---

#### 7.0.6 Antigravity / Gemini CLI: Slash Commands → GUI Elements

| CLI Command | Aliases | GUI Element | Location |
|---|---|---|---|
| `/clear` | — | Clear terminal screen button | Session toolbar |
| `/chat` | `/resume` | Session history panel | Left sidebar |
| `/compress` | — | "Compress context" button | Context panel |
| `/copy` | — | Copy button on messages | Per-message action bar |
| `/directory` | `/dir` | "Add directory" folder picker | File tree header |
| `/editor` | — | External editor selector | Settings → Editor |
| `/extensions` | — | Extensions manager | Settings → Extensions |
| `/hooks` | — | Hooks configuration panel | Settings → Hooks |
| `/ide` | — | IDE integration toggle | Session toolbar |
| `/init` | — | Project setup wizard → generates GEMINI.md | Project menu |
| `/mcp` | — | MCP server manager | Right panel → MCP tab |
| `/memory` | — | Memory editor: list, show, refresh GEMINI.md entries | Right panel → Memory tab |
| `/model` | — | Model selector dropdown | Session header |
| `/permissions` | — | Permission rules editor | Settings → Permissions |
| `/plan` | — | Plan mode toggle | Session header |
| `/policies` | — | Policy viewer by approval mode | Settings → Permissions |
| `/privacy` | — | Privacy settings panel | Settings → Privacy |
| `/quit` | `/exit` | Close session button | Session header |
| `/restore` | — | "Restore files" button (reverts pre-tool state) | Checkpoint panel |
| `/rewind` | — | Timeline slider → rewind | Checkpoint panel |
| `/settings` | — | Settings panel | `⌘,` |
| `/shells` | `/bashes` | Background shell processes panel | Bottom panel |
| `/skills` | — | Skill browser | Skill browser panel |
| `/stats` | — | Usage stats panel | Status bar → click |
| `/theme` | — | Theme picker | Settings → Appearance |
| `/tools` | — | Tool call list panel | Right panel → Tools tab |
| `/agents` | — | Subagent manager | Right panel → Agents tab |
| `/commands` | — | Custom command manager: list, reload | Settings → Commands |
| `/upgrade` | — | Upgrade prompt | Account panel |
| `/vim` | — | Vim mode toggle | Settings → Editor |

---

#### 7.0.7 CLI Flags → Settings Panel Mapping

Rather than exposing raw CLI flags, AgentLoft maps every flag to a settings control. Users never type flags — they use UI controls that AgentLoft translates back into the correct flags when launching the CLI.

**Session Launch Controls (applied when starting a session)**

| CLI Flag (Claude/Codex/Gemini) | AgentLoft UI Control | Settings Location |
|---|---|---|
| `--model` | Model selector dropdown | Session header |
| `--effort` (Claude) / `model_reasoning_effort` (Codex) | Effort slider (5 levels) | Session header |
| `--permission-mode` / `--approval-mode` / `--approval-mode` | Permission mode segmented control | Session header |
| `--sandbox` / `--sandbox` | Sandbox mode radio buttons | Settings → Sandbox |
| `--continue` / `--resume` / `--resume` | Resume toggle on session start | Session history |
| `--worktree` | "New worktree" checkbox | New session dialog |
| `--add-dir` / `--add-dir` / `--include-directories` | "Add directories" picker | Session → Directories |
| `--allowedTools` / `--disallowedTools` | Allow/deny tool rules editor | Settings → Permissions |
| `--max-turns` | Max turns slider | Settings → Safety |
| `--max-budget-usd` | Budget cap input | Settings → Cost |
| `--system-prompt` / `--append-system-prompt` | System prompt editor | Settings → Prompts |
| `--mcp-config` | MCP server config (imported from file or UI) | Settings → MCP |
| `--debug` | Debug mode toggle | Settings → Advanced |
| `--output-format stream-json` | **Always set by AgentLoft internally** | Not user-facing |
| `--print` | **Always set by AgentLoft internally** | Not user-facing |
| `--dangerously-skip-permissions` / `--yolo` | YOLO mode toggle (red warning) | Session toolbar (with confirmation) |

**Key Claude Code environment variables → Settings UI**

| Env Variable | AgentLoft UI | Location |
|---|---|---|
| `ANTHROPIC_API_KEY` | API key field (stored in OS keychain) | Settings → Account |
| `CLAUDE_CODE_EFFORT_LEVEL` | Effort slider | Session header |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Auto-memory toggle | Settings → Memory |
| `CLAUDE_CODE_MAX_TURNS` | Max turns input | Settings → Safety |
| `BASH_DEFAULT_TIMEOUT_MS` | Bash timeout slider | Settings → Safety |
| `CLAUDE_CODE_USE_BEDROCK` | Bedrock toggle + wizard button | Settings → Account → AWS |
| `CLAUDE_CODE_USE_VERTEX` | Vertex AI toggle + wizard button | Settings → Account → Google |

**Visual Flag Builder — Raw Preview:**

The settings panel includes a **Raw Preview** field at the bottom that shows the exact CLI command string that AgentLoft will invoke — updated live as the user changes UI controls:

```
claude --model claude-opus-4-5 --effort high --permission-mode auto-edit \
  --max-turns 50 --max-budget-usd 2.00 --print --output-format stream-json \
  --continue
```

This gives power users full transparency and lets them copy the command for manual CLI use. Additional features:

- **Incompatible flags highlighted red** — e.g., enabling `--dangerously-skip-permissions` while also having `--permission-mode ask` shows a conflict warning
- **Flag presets** (dropdown in session toolbar): "Overnight run" (`--max-turns 200 --effort high`), "Review mode" (`--effort low --permission-mode ask`), "Full access" (`--dangerously-skip-permissions`)
- **Per-session flags persisted on resume** — when resuming a session, AgentLoft restores the exact flag configuration used in that session

---

#### 7.0.8 Config Files → Visual Editors

Every config file that the CLIs read is surfaced as a first-class visual editor in AgentLoft. No user should need to open a file manager or text editor to configure the CLIs.

| Config File | AgentLoft Editor | Features |
|---|---|---|
| `CLAUDE.md` | Memory editor — Markdown with live preview | Syntax highlighting, section headers detected, per-entry enable/disable, `@./import` syntax supported |
| `AGENTS.md` (Codex) | Memory editor (same component, different file) | Same as CLAUDE.md |
| `GEMINI.md` (Antigravity) | Memory editor (same component, different file) | Same as CLAUDE.md; hierarchy viewer (global → project → subdirectory) |
| `.claude/settings.json` | Settings panel (Settings → Project) | Form-based UI; raw JSON view toggle; diff-from-defaults view |
| `~/.claude/settings.json` | Settings panel (Settings → User) | Same; shows which settings are overridden by project settings |
| `.mcp.json` / MCP config | MCP server manager | Add/remove/edit servers; test connection button; import from Claude Desktop |
| `~/.codex/config.toml` | Codex settings panel | Form-based; profile manager; sandox policy radio buttons |
| `~/.gemini/settings.json` | Antigravity settings panel | Form-based; theme, autoAccept, checkpointing, fileFiltering |
| `~/.claude/keybindings.json` | Keybinding editor | Table with key → action; conflict detection; reset to default |
| Custom commands (`.toml`) | Command editor | Name, description, prompt with variable substitution; live preview |
| Skills (`SKILL.md`) | Skill editor | Markdown editor; variable definitions; test runner |
| `.claude/CLAUDE.md.local` | Local memory editor | Marked as "local only, not synced to git" |

---

#### 7.0.9 Output Event Types → Visual Components

AgentLoft listens to the stream-json event stream from each CLI and renders each event type as a specific visual component. This table is the rendering spec.

| Event Type | Visual Component | Details |
|---|---|---|
| `text_chunk` | Streaming text in chat bubble | Markdown rendered as it streams; code blocks syntax-highlighted |
| `tool_use` (start) | Tool call card in Cockpit feed | Icon (read/write/bash/browser/mcp) + file/command name + "running" spinner |
| `tool_use` (end, success) | Tool call card updated | Duration + ✓ check + expandable output |
| `tool_use` (end, error) | Tool call card updated | Red ✗ + error message + "Ask agent to fix" button |
| `permission_request` | Permission modal dialog | Tool type + target + "What this will do" description + Yes / Yes always / No |
| `cost_update` | Cost ticker in status bar | Real-time $X.XX, flashes on spike |
| `context_usage` | Token bar in status bar | Used/total with color: green→yellow→red |
| `thinking` | Collapsible "Thinking..." block | Collapsed by default; expand button shows full reasoning trace |
| `bash_output` | Scrollable terminal output block | Monospace; exit code badge; copy button |
| `file_write` | Diff card in Cockpit + staging area | Monaco diff view; per-hunk Accept/Reject; "What changed" summary |
| `file_read` | File read card (collapsed) | Filename + line range; expand to show content |
| `web_search` | Search card | Query + result count + expandable results |
| `mcp_call` | MCP call card | Server name + tool name + collapsed I/O |
| `session_start` | Session header populated | Model, effort, permission mode, memory loaded summary |
| `session_end` | Session footer | Total cost, total tokens, duration, memory extraction prompt |
| `checkpoint_created` | Timeline entry added | Checkpoint timestamp + file snapshot count |
| `background_detached` | Tray badge + notification | "Agent running in background" with session name |
| `memory_extracted` | Memory review panel | Proposed new memories; Approve / Reject / Edit each |
| `rate_limit_hit` | Alert banner | Provider name + reset time + fallback offer |
| `error` | Error card with recovery options | Error message + "Retry", "Ask agent to fix", "Report" buttons |

---

#### 7.0.10 Cross-CLI Parity Gaps (Known Intentional Differences)

Some CLI features exist in one tool but not others. AgentLoft handles these consistently:

| Feature | Claude Code | Codex | Antigravity | AgentLoft handling |
|---|---|---|---|---|
| Extended thinking | ✅ `Option+T` | Via reasoning effort | ❌ | Toggle shown only when Claude backend active |
| Vim mode | ✅ `/vim` | ❌ | ✅ `/vim` | Toggle in settings; applies to AgentLoft's chat input |
| Voice input | ✅ `/voice` | Via dictation | ✅ (v0.41+) | Unified voice button; uses each CLI's own voice feature when available, else Whisper |
| Worktree isolation | ✅ `--worktree` | ✅ worktree support | ✅ `--worktree` | "New worktree session" option in session creation dialog |
| Sandbox mode | ✅ `--sandbox` | ✅ `--sandbox` | ✅ `--sandbox` | Sandbox policy selector; shown as lock icon in status bar |
| Cloud/remote execution | ✅ `/schedule`, `/remote` | ✅ `codex cloud exec` | ✅ Antigravity Managed Agents | Surfaced per-provider as "Run in cloud" button; not unified (provider-specific) |
| Custom slash commands | ✅ `.claude/commands/` | ❌ | ✅ `.gemini/commands/` | Custom command editor in Settings; file format shown per active CLI |
| Session branching | ✅ `/branch` | ✅ `/fork` | ❌ `/rewind` (backward only) | "Branch from here" available for Claude + Codex; Gemini gets "Rewind" only |
| MCP server mgmt | ✅ full | ✅ full | ✅ full | Unified MCP panel — shows servers active for the current CLI backend |

---

#### 7.0.11 Raw File Mode

When Claude Code attaches a file to context, it injects line numbers by default (e.g., `1→ import React...`). Line numbers add ~70% token overhead for large files and are often unnecessary. AgentLoft exposes a per-attachment toggle to strip them.

**Behavior:**

- Default **on** for source files (`.ts`, `.tsx`, `.py`, `.go`, `.rs`, `.java`, `.cpp`) — line numbers help the agent reference specific lines
- Default **off** for data files (`.json`, `.yaml`, `.md`, `.csv`, `.xml`) — no benefit, pure overhead
- Right-click any attached file → **"Attach as Raw"** to strip line numbers for that attachment
- Keyboard shortcut: `Ctrl+Shift+R` while a file is selected in the attachment list
- Token savings indicator shown per file: **"~1,200 tokens saved"**

**IPC integration:**

```json
{
  "type": "raw_file",
  "path": "src/utils/parser.ts",
  "no_line_numbers": true,
  "content": "import { ..."
}
```

The `no_line_numbers` flag is passed in the attachment metadata to the CLI subprocess. AgentLoft strips line numbers from the rendered preview as well so the user sees exactly what the agent receives.

**Community origin:** Reported in Claude Code GitHub issue #20223. ~70% overhead reduction confirmed for files >300 lines.

---

#### 7.0.12 Rate Limit Intelligence & Auto-Fallback

> **Phase: v1** — Rate limits are cited as a daily **High**-severity pain point in §2.1. Shipping v1 without handling them would undermine user trust on day one.

AgentLoft intercepts rate limit responses from all CLI backends and handles them transparently — no manual model-switching required.

**Rate Limit Detection:**

AgentLoft monitors the CLI subprocess output stream for rate limit signals from each provider:
- Claude Code: `429 Too Many Requests` / `overloaded_error` / `rate_limit_error` in stream-JSON
- Codex CLI: `429` / `RateLimitError` in JSON output
- Antigravity CLI: `RESOURCE_EXHAUSTED` gRPC code or HTTP 429

On detection, AgentLoft immediately pauses the turn and shows a structured **Rate Limit Card** in the agent feed:

```
⚠️ Rate limit hit — Claude Code (claude-sonnet-4-6)
Resets in: ~2 min 30 sec
 
Options:
  [Switch to Codex CLI →]   [Switch to Antigravity →]   [Wait and retry]   [Pause session]
```

**Auto-Fallback Chain:**

Configured in the Connection Profile (§7.5.5). When `auto_fallback: true`, AgentLoft switches to the next model in the chain without user action:

```yaml
profile: "resilient-work"
models:
  primary:   claude_code/claude-sonnet-4-6
  secondary: codex_cli/codex-mini
  tertiary:  antigravity_cli/gemini-3-flash
  fallback:  local/ollama-qwen3-14b   # always available, no rate limits

auto_fallback: true
fallback_notify: true   # show a notification when fallback activates
restore_primary: true   # switch back when primary is available again
```

**Retry Queue:**

Rather than failing a turn silently, AgentLoft queues the pending turn and retries automatically after the reset window:

- Countdown timer shown in the Rate Limit Card
- "Queue for retry" button adds the turn to a retry queue
- Queue is visible in the status bar: "1 turn queued — retrying in 2:14"
- Multiple queued turns execute in order when the limit resets
- Hard cap: queue holds a max of 10 turns; older turns are evicted with a notification

**Rate Limit Dashboard (in §7.10.7 Unified Quota):**

- Per-provider rate limit status: current / limit / reset time
- Historical: how many times each provider was rate-limited this week
- "Rate limit forecast" — based on current burn rate, projects when the next limit will be hit
- Alert settings: notify before hitting a limit (e.g., "warn when 80% of hourly limit used")

**Quality Warning on Fallback:**

Not all fallback models are equivalent. When the fallback model is substantially weaker than the primary, AgentLoft shows a persistent warning banner for the duration of the fallback session:

```
⚠️  Running on fallback model (codex-mini) — responses may differ in quality
    Primary model (claude-opus-4-7) resets in 14 min.   [Switch back now]
```

Fallback models are rated against the primary in the Connection Profile. The warning fires when the fallback tier drops by more than one quality level (e.g., Opus → Mini, Sonnet → Flash). It does **not** fire for same-tier switches (e.g., Sonnet → Gemini 3 Pro). The banner is persistent (cannot be dismissed mid-session) but unobtrusive — it sits above the input bar, below the cockpit.

**Offline / Provider Down detection:**

Distinguishes between rate limits and provider outages:
- Rate limit: known reset time → queue with countdown
- 5xx / connection error → "Provider may be down" banner with status page link
- Complete network loss → graceful degradation to local models (if configured)

---

#### 7.0.13 First-Run Onboarding Wizard

> **Phase: v1** — AgentLoft targets non-expert vibecoders (Persona 1, §4). A cold install that dumps the user into an empty workspace is a conversion killer. The onboarding wizard must get users to their first successful agent turn within 3 minutes.

The onboarding wizard is a modal flow that runs exactly once: on first launch after installation. It is dismissible at any step (the user can skip to an empty workspace), but each step offers real value.

**Step 1 — CLI Detection (automatic):**

AgentLoft scans for installed CLIs on launch:

```
Checking your system for AI CLI agents...

✅  Claude Code found    (claude 1.9.2 — /usr/local/bin/claude)
✅  Codex CLI found      (codex 3.1.0 — /usr/local/bin/codex)
❌  Antigravity CLI      not found

[Install Antigravity CLI →]   [Skip — I'll add it later]
```

- Uses `which`/`where` + version flag probing, no PATH hacks
- When a CLI is missing, AgentLoft auto-detects the user's platform and shows a ready-to-run install command **directly inside the wizard** — no browser required:

```
❌  Antigravity CLI      not found

Install Antigravity CLI:
  macOS:           brew install antigravity
  Windows:         winget install Google.Antigravity
  Ubuntu/Debian:   sudo apt install antigravity
  Other Linux:     curl -fsSL ... | bash

  [Copy command]   [Run now — AgentLoft will install it for you]   [Skip]
```

- **"Run now"** executes the install command in a sandboxed terminal panel inside the wizard (no shell injection — command is a static string per platform, not user-interpolated). Progress stream shown inline.
- After install completes, AgentLoft auto-runs "Refresh scan" and advances the step if the CLI is now detected.
- If the user is on a platform with no package manager (e.g., bare Linux without apt), a direct download link is shown as fallback.
- User can still skip; skipped CLIs can be added later from Settings → CLI Connections.

**Step 2 — API Key Setup:**

For each detected CLI, AgentLoft requests the API key (if not already in the OS keychain):

```
Claude Code is installed — add your Anthropic API key to get started.

[____________________________]  (paste your key here)
                                 Your key is stored in the OS keychain.
                                 AgentLoft never sends it anywhere else.

[Get a free API key →]   (opens console.anthropic.com)
[Skip — I'll add it in Settings later]
```

- Keys are stored immediately in the OS keychain (never written to disk in plaintext)
- Key validity tested with a cheap `/health` or token-count call before confirming
- Visual confirmation: "✅ Key valid — Claude claude-sonnet-4-6 connected"

**Step 3 — Open First Project:**

```
Open a project to get started

[Open Existing Project →]   (folder picker)
[Start with a Sample Project →]   (clones agentloft/starter-project from GitHub)
[Start Empty — no project]
```

- "Open Existing Project" runs the auto-detect flow (§7.7.3): scans for CLAUDE.md, AGENTS.md, package.json, Cargo.toml, etc., generates context.yaml and CLAUDE.md draft
- "Start with Sample Project" downloads a minimal demo project and auto-opens it — gives the user something to ask the agent about immediately

**Step 4 — First Turn:**

AgentLoft pre-populates the chat input with a context-appropriate starter prompt based on the detected project type:

| Project type | Pre-populated starter |
|---|---|
| Node.js / TypeScript | "Explain the structure of this project and what each directory is for." |
| Python | "Describe what this codebase does and identify any obvious issues." |
| Rust | "Give me an overview of this project's architecture." |
| Empty | "Hello! Ask me to build something — I'll help you start." |

The user can edit or clear the prompt before sending. The first turn is always run in **Safe Mode** (read-only, no writes) automatically with a banner: "Your first turn runs in Safe Mode — the agent can read files but not write them. Change this in the toolbar above."

**Step 5 — Tips Carousel (post-first-turn):**

After the first successful turn, a dismissible tips sidebar appears with 5 tips rotated one at a time:

1. "Press ⌘S to create a checkpoint before any risky change"
2. "Right-click any file in the tree to pin it to context permanently"
3. "Use the Model Switcher in the toolbar to compare Claude vs Codex on the same task"
4. "Your session cost is shown live in the status bar — set a budget cap in Settings"
5. "Install Skills from the Marketplace to give the agent reusable prompt templates"

Tips are skippable and can be revisited from Help → "Show Onboarding Tips".

---

### 7.1 UI/UX Shell

> **Phase: v1** (§7.1.1–7.1.7) | **v1.1** (§7.1.8 Side Chat)

#### 7.1.1 Layout System

**Primary Layout Modes:**

|Mode    |Description                          |Keyboard|
|--------|-------------------------------------|--------|
|Focus   |Full-width chat, all panels collapsed|⌘⇧F     |
|Standard|Chat + File Tree + Status            |Default |
|Split   |Two chat panels side by side         |⌘⇧S     |
|Quad    |2x2 grid for multi-model comparison  |⌘⇧Q     |
|Cockpit |Chat + Agent Action Feed + File Diff |⌘⇧C     |

**Panels (all resizable, hideable):**

- Left: Project File Tree with agent activity overlay
- Center: Main Chat / Conversation
- Right: Context Inspector / Memory Viewer / Marketplace
- Bottom: Agent Tool Call Feed / Terminal Escape Hatch / Cost Ticker

#### 7.1.2 Command Palette

Triggered by `⌘K` (Mac) / `Ctrl+K` (Win/Linux). Searches across:

- All AgentLoft commands
- Loaded skills (run directly)
- Recent sessions
- Project files (open in context)
- MCPs (invoke directly)
- Memory entries (view/edit)
- Marketplace (search and install)

**Implementation:** Fuzzy search with WASM-compiled fzf. Results ranked by recency + frequency.

#### 7.1.3 Theming

|Theme   |Description                                 |
|--------|--------------------------------------------|
|Midnight|Dark navy, gold accents — flagship          |
|Hacker  |Pure black, green monospace — terminal users|
|Eclipse |Dark gray, purple accents                   |
|Daylight|Clean light mode, minimal                   |
|System  |Follows OS preference                       |
|Custom  |User-defined via JSON token file            |

Themes are community-shareable as `.vstheme` files, installable from Marketplace.

#### 7.1.4 Status Bar

Always-visible strip at the bottom of the app showing:

- Active model + current effort level
- Token usage: used / limit (color-coded green→yellow→red)
- Cache hit rate (%)
- Memory load: how many memories active
- Cost this session ($X.XX)
- Active MCPs count
- Git branch of open project

#### 7.1.5 Inline Diff Renderer

When an agent proposes file changes:

- Monaco Editor diff view with before/after columns
- Per-hunk accept / reject / edit buttons
- Accept All / Reject All / Review Each
- “What changed and why” — auto-generates a plain-English summary of each diff
- Staging area: accepted changes queue before final write

#### 7.1.6 Floating Mini Terminal

- `⌘\` opens an embedded terminal panel without leaving AgentLoft
- Shares the same working directory as the active session
- Agent can be instructed to run commands in this terminal
- Full PTY support (vim, htop, git interactive rebase all work)

#### 7.1.7 Accessibility

- Full keyboard navigation — no action requires a mouse
- Screen reader support via ARIA labels on all interactive elements
- High contrast mode (WCAG AA minimum, AAA target)
- Font size scaling (12px–20px)
- Motion reduction mode (respects prefers-reduced-motion)

#### 7.1.8 Side Chat

Side Chat lets users branch a mini-conversation off any message in the main session to ask follow-up questions, explore alternatives, or request clarification — without polluting the main session history.

**How it works:**

- **Right-click any message** → "Ask in Side Chat" — opens a floating mini-chat panel anchored to that message
- The Side Chat **reads the full session context** (everything before the anchor message) but writes nothing back to the main history
- Side Chat responses are collapsed as a sub-thread under the parent message in the main transcript
- A **"Promote to session"** button moves a Side Chat exchange into the main session history if the user wants to keep it

**Use cases:**
- "What would happen if we used approach B here?" — without risking the main session
- Ask for a code explanation without changing the agent's context state
- Request a quick web search that doesn't affect cost tracking for the main task
- Compare two model responses to the same prompt side-by-side

**UI:**
- Side Chat panel floats over the right side of the screen (draggable)
- Collapsed sub-thread shown with a dotted left border and `↳ 3 exchanges` count
- Side Chat indicator in the message: a small branch icon `⎇` shows the message has an attached Side Chat
- Side Chats are stored in session history but excluded from cost totals and context injection

#### 7.1.9 In-App Help System

> **Phase: v1** — AgentLoft's mission is to serve "first-time vibecoder to senior engineer." A newcomer looking at a panel labelled "Blast Radius" or "Regression Shield" with no in-app guidance is immediately lost. This section ships in v1 so the UI can explain itself without requiring a documentation site.

**Panel `?` Icons:**

Every panel header has a `?` icon (visible on hover). Clicking it opens an inline popover anchored to that panel. Each popover contains:

- A one-sentence plain-English description of what this panel does
- A two-item "key things to know" list
- A "Learn more" link that opens the full Help Center entry for that panel

Example — Blast Radius popover:

```
Blast Radius
─────────────────────────────────────────────────────
Shows every file the agent plans to touch before it
writes anything. Red = high risk. Green = low risk.

• Hover any file to see why it's included
• Click "Approve" to let writes proceed, or edit the list

[Learn more →]
```

**First-Visit Panel Tooltips:**

The first time any panel becomes visible in a user's session, a dismissible coaching tooltip appears on the most important control in that panel. Shown exactly once per panel per installation; never repeated unless the user resets tips from Settings → Help.

| Panel | Coaching tooltip target | Message |
|---|---|---|
| Agent Cockpit | Blast Radius indicator | "This shows which files the agent wants to touch. Click to review before it writes." |
| Memory Viewer | Memory cards | "These facts persist across sessions. Approve or reject each one." |
| Cost Ticker | Session cost | "This is your running spend for this session. Set a hard cap in Settings." |
| Context Health | Health score | "Below 60 means context is degrading. Click to see why and fix it." |
| Diff Renderer | Accept/Reject buttons | "Review each change before it's written. Use Accept All only when you trust the output." |

**Help Center Panel (F1):**

`F1` (or `?` in the Command Palette) opens a full Help Center panel. Not a browser — embedded in the app, works offline.

Structure:
- **Getting Started** — 5 steps: install a CLI, add your key, open a project, send your first prompt, review the diff
- **Panel Reference** — one entry per panel, with screenshots, key controls, and common mistakes
- **CLI Comparison** — side-by-side table of Claude Code vs Codex vs Antigravity capabilities in AgentLoft
- **Keyboard Shortcuts** — full interactive reference (same as §18.3, searchable)
- **FAQ** — "Why is my context score low?", "What's the difference between rollback and undo?", "How do I stop the agent?"
- **Glossary** — all jargon (blast radius, context dead zone, directive heartbeat, etc.) with plain-English definitions

Help content is bundled in the app binary — no internet required. The help index is also searchable from the Command Palette: typing "what is" or "how do I" in `⌘K` shows help results alongside commands.

**"What is this?" Right-Click:**

Right-clicking any labeled UI element (button, badge, icon, metric) exposes a "What is this?" option in the context menu. Selecting it opens the relevant Help Center entry. This requires zero discoverability — it works everywhere without requiring the user to find the `?` icon first.

**Expertise Toggle (Settings → Help → Experience Level):**

Three modes that adjust help verbosity across the entire UI:

| Mode | Who | Effect |
|---|---|---|
| **Guided** (default for new installs) | Newcomers | First-visit tooltips always on; coaching prompts in empty states; simplified metric labels ("Spend" not "$/1M tokens"); **Agent Cockpit panel hidden by default** (accessible via toolbar button); **status bar collapsed to 3 indicators only** (active model, session cost, connection status); **Context Health bar hidden**; layout shifts to a clean 2-column view (chat + file tree only) |
| **Standard** | Daily users | First-visit tooltips shown once; normal labels; full panel layout including Cockpit; Context Health bar visible |
| **Expert** | Power developers | All tips suppressed; raw metric labels; no coaching; maximum density; all panels always shown |

The Guided → Standard transition is explicitly opt-in. After 10 sessions, AgentLoft shows a non-blocking upgrade prompt: "You've been using AgentLoft for a while — want to switch to Standard mode to unlock the Agent Cockpit and full observability?" The user can dismiss permanently; no auto-promotion occurs.

-----

### 7.2 Multi-Model Engine

> **Phase: v1** — All of 7.2. Multi-CLI support is the primary differentiator over every Claude-only competitor.

#### 7.2.1 Supported Backends

**Tier 1 — Native Integration (full feature support):**

- Claude Code (Anthropic) — via process spawning + MCP passthrough
- OpenAI Codex CLI — via process spawning
- Antigravity CLI (Google) — via process spawning + PTY; SDK integration in v0.5 (replaces Gemini CLI, deprecated June 18, 2026)
- Gemini CLI (Google, legacy) — maintained for compatibility; users prompted to migrate to Antigravity CLI

**Tier 2 — API Direct (most features):**

- OpenAI API (GPT-4o, o3, o4-mini) — via OpenAI SDK
- Anthropic API (Claude 3.5/4.x Sonnet, Opus) — via Anthropic SDK
- Google AI API (Gemini 2.x Pro, Flash) — via Google AI SDK

**Tier 3 — OpenAI-Compatible (core features):**

- Ollama (local models — Llama, Mistral, Qwen, etc.)
- LM Studio
- Groq
- Together AI
- Fireworks AI
- Any endpoint with `/v1/chat/completions`

#### 7.2.2 Model Profiles

Each model configuration saved as a profile:

```yaml
profile_name: "Claude Opus — Deep Work"
backend: claude_code
model: claude-opus-4-5
effort: high
system_prompt: "You are working on a production codebase..."
max_tokens: 32000
temperature: 0.2
context_budget:
  memory: 4000
  files: 8000
  conversation: 12000
  system: 2000
```

Profiles are project-portable (saved in `.agentloft/profiles/`).

#### 7.2.3 Model Router

User-defined routing rules applied automatically:

```
IF task_type == "architecture" → use Claude Opus (high effort)
IF task_type == "refactor" → use Claude Sonnet
IF file_count_in_context > 20 → use Antigravity (large context, 1M token window)
IF estimated_cost > $1.00 → ask user to confirm
IF primary_model rate_limited → fallback to secondary
```

Router UI: visual rule builder, no JSON editing required.

#### 7.2.4 Side-by-Side Comparison Mode

- Send identical prompt to 2 or 3 models simultaneously
- Responses rendered in parallel columns
- Diff view between any two responses
- “Pick winner” button — accept one response, log the comparison for future routing decisions
- Cost comparison shown per model

#### 7.2.5 Model Behavior Monitor

Tracks each model’s behavior over time:

- Average tokens per response
- Cache hit rate
- Task completion rate (did the agent finish what it started?)
- Regression detection: alerts when a model’s performance on similar tasks degrades
- Surfaced as a mini-dashboard per model in settings

-----

### 7.3 Persistent / Permanent Memory System

> **Phase: v1** (§7.3.1–7.3.6 — LanceDB memory, extraction, injection, UI, confidence scoring) | **v2** (§7.3.7 Graphify knowledge graph — requires bundled Python runtime) | **v2** (§7.3.8 Agentmemory 4-tier — adds on top of stable v1 memory)

#### 7.3.1 Memory Architecture

Four independent memory scopes:

**Project Memory** (`.agentloft/memory/project.json`)

- Architecture decisions and rationale
- Tech stack and version constraints
- Naming conventions and patterns
- Known bugs / gotchas / workarounds
- External API integrations and quirks
- Environment variables and their purposes

**User Memory** (global, `~/.agentloft/memory/user.json`)

- Preferred coding style and patterns
- Language and framework preferences
- Communication preferences (verbose vs. concise)
- Historical skill proficiencies
- Personal shortcuts and aliases

**Agent Memory** (per-session, auto-generated)

- What the agent did in this session
- What approaches failed and why
- Current task state
- Files touched and why
- Decisions made mid-session

**Org Memory** (AgentLoft Cloud — team plan)

- Shared conventions
- Internal API documentation
- Onboarding knowledge
- Shared gotchas and decisions

#### 7.3.2 Memory Storage

- **Backend:** LanceDB (embedded columnar vector database, Rust-native)
- **Embeddings:** Generated locally using a bundled ONNX embedding model (no external API call required for memory)
- **Index:** HNSW approximate nearest neighbor for fast semantic retrieval
- **Storage location:** `~/.agentloft/memory/` (user-level) and `.agentloft/memory/` (project-level)

#### 7.3.3 Memory Extraction (Automatic)

After every session, AgentLoft runs a lightweight extraction pass:

- Scans conversation for facts, decisions, and conventions
- Assigns a confidence score and category tag
- Extracted memories are **auto-accepted by default** — no blocking review required

**Non-blocking review flow:**

When extraction completes, a dismissible toast appears in the bottom-right corner:

```
💡  12 memories extracted from this session.   [Review]   [✕]
```

The toast is non-blocking — the user can ignore it, start a new session, or close the app. Extracted memories are already saved and will be injected in future sessions.

Clicking **Review** opens the Memory Browser (§7.3.5) filtered to the just-extracted memories, where the user can edit, delete, or re-tag any entry. This review window remains available for **24 hours** — after that, the session's extracted memories merge into the standard memory pool and the per-session filter is removed.

**Confidence gating:** Memories below 0.3 confidence are held in a “pending” state and shown with a caution badge in the Memory Browser. They are not injected until the user explicitly confirms them or they age out after 7 days.

**Settings override:** Users who want the old blocking-review behavior can enable “Require memory review before save” in Settings → Memory. This is off by default.

**Extraction patterns detected:**

- “This project uses X” → convention
- “We decided to Y because Z” → decision + rationale
- “Never do X in this codebase” → constraint
- “The API endpoint for X is Y” → integration fact
- “User prefers X over Y” → preference

#### 7.3.3a Memory Bootstrap — First Project Open

The first time any project is opened in AgentLoft, a one-time bootstrap pass runs before the first session. This ensures the agent already knows the project's conventions on **turn 1** — the user never has to manually explain their codebase.

**Bootstrap sources (read-only scan, no writes to project files):**

| Source file | What gets extracted |
|---|---|
| `CLAUDE.md` | All conventions, constraints, patterns, and instructions the developer has already written for Claude Code — imported verbatim as project memories |
| `AGENTS.md` | Same as CLAUDE.md but cross-agent — imported alongside |
| `package.json` | Project name, description, dependencies, scripts → tech stack + framework memories |
| `Cargo.toml` | Crate name, dependencies, workspace structure |
| `pyproject.toml` / `setup.py` | Python project metadata, deps |
| `go.mod` | Go module name and dependencies |
| `README.md` (first 3,000 tokens) | Project purpose, architecture overview if present |

**Bootstrap behavior:**

1. Bootstrap runs silently in the background on first project open (no blocking spinner)
2. Extracted memories are tagged `source: bootstrap` and shown in a non-blocking toast: "Memory bootstrapped from your existing CLAUDE.md and project files — the agent already knows your conventions."
3. CLAUDE.md/AGENTS.md content is imported at high confidence (0.95) since it was written by the developer explicitly for AI agents
4. Remaining sources (package.json etc.) are imported at medium confidence (0.70) with category tags
5. User can review the bootstrapped memories in the Memory Browser (§7.3.5) at any time; they are editable and deleteable like any other memory
6. Bootstrap is re-run if CLAUDE.md is detected to have changed significantly since the last bootstrap (measured by SHA256 of the file)

**Why this matters:** Without bootstrapping, the first session in any real project starts with a blank-slate agent that does not know the project's conventions. The developer has to re-explain context that already exists in CLAUDE.md. Bootstrap eliminates this friction — the agent references project conventions on turn 1 without being asked.

#### 7.3.4 Memory Injection

On session start, AgentLoft:

1. Loads project memory (always injected)
1. Retrieves top-K relevant user memory based on current task description (semantic search)
1. Loads any agent memory from the last session on this project
1. Shows a “Memory Loaded” summary panel (collapsible)
1. Injects as a structured block at the top of the system prompt

**Memory Budget:** Configurable. Default: 4,000 tokens max for memory injection.

#### 7.3.5 Memory Management UI

- **Memory Browser:** Full list of all memory entries, searchable, filterable by scope/category/date
- **Memory Editor:** Edit any entry directly
- **Memory Diff:** Compare memory state before and after a session
- **Manual Pin:** Right-click any message → “Remember this forever”
- **Forget Command:** `/forget [search term]` — removes matching memory entries
- **Memory Export:** Export to `.json` or markdown for version control
- **Conflict Detector:** Alerts when a new memory contradicts an existing one

#### 7.3.6 Memory Confidence Scoring

Each memory entry has:

- `confidence`: 0.0–1.0 (how certain the extraction was)
- `freshness`: decays over time; stale memories shown with a warning
- `source`: which session created it
- `verified`: whether the user manually confirmed it

Memories below 0.3 confidence are not auto-injected without user approval.

#### 7.3.7 Graphify Knowledge Graph Engine *(v2)*

> **v2 — Deferred from v1.** Graphify requires bundling a portable Python runtime, shipping a tree-sitter binary, writing an MCP server, and building the Obsidian vault viewer. That is a significant app-within-an-app. The v1 memory system (§7.3.1–7.3.6) already uses LanceDB with ONNX embeddings; the codebase structural data from Graphify augments it rather than replacing it. Add in v2 once v1 memory is proven.

AgentLoft bundles **Graphify** — an AST-based knowledge graph engine that auto-builds a structural map of the codebase on project open. No user setup required; the engine ships with a portable Python runtime so users never install Python manually.

**How it works:**

- On project open, Graphify runs `tree-sitter` to parse all source files into ASTs
- Extracts: classes, functions, imports, exports, call sites, type references, file relationships
- Builds a directed graph: `src/auth/login.ts` → calls → `src/db/users.ts:getUser()`
- Writes to `graphify-out/graph.json`, `GRAPH_REPORT.md`, `graph.html` (interactive browser view), and `obsidian/` vault
- Live filesystem watcher: debounced 2-second delay re-runs incremental updates on file save
- **Semantic extraction** (opt-in only): uses the active LLM to add semantic annotations ("this function validates JWT tokens") — requires explicit user opt-in per project

**Built-in Obsidian Vault Viewer:**

AgentLoft embeds a full vault viewer panel without requiring Obsidian to be installed:
- Wiki-link navigation (`[[ComponentName]]` jumps to that node)
- Graph view (force-directed node graph, zoom/pan/filter)
- Canvas view (2D spatial layout of related files)
- Full-text search across all graph nodes
- Inline note editing and note creation (adds to `obsidian/` directory)
- Auto-refresh on graph update
- **"Open in Obsidian"** button — opens the vault in the user's Obsidian installation if present

**Graph Explorer Panel:**

A dedicated sidebar panel for querying the graph:
- Natural language queries: "Show me all files that import from the auth module"
- "What calls this function?" — reverse lookup with call chain visualization
- "Which files changed most in the last 10 sessions?" — cross-references with session history
- Filter by file type, directory, dependency depth

**MCP Server Integration:**

Graphify auto-starts as a local MCP server when a session opens. The active agent can query the graph directly via MCP tool calls — e.g., "List all exported functions in src/payments/" without reading every file.

**Storage:** Bundled portable Python runtime + graphify package. No global Python install required. All graph data stored in `graphify-out/` (configurable). Respects `.gitignore` and `.agentloftignore`.

#### 7.3.8 Agentmemory — 4-Tier Long-Term Memory *(v2)*

> **v2 — Deferred from v1.** Agentmemory layers on top of, not instead of, the existing LanceDB memory (§7.3.1–7.3.6). Adding it in v1 means debugging two memory systems simultaneously. Ship the LanceDB system first, validate that it works, then integrate Agentmemory's tier structure as an upgrade in v2.

AgentLoft integrates **Agentmemory** (rohitg00/agentmemory, Apache 2.0, 16,700+ stars) as the long-term memory backend, complementing the existing LanceDB session memory with a structured 4-tier hierarchy.

**The 4 Tiers:**

| Tier | What it stores | Retention | Token budget |
|------|----------------|-----------|-------------|
| **Working** | Current task context, immediate results, active variables | Session only | ~200 tokens |
| **Episodic** | What happened in past sessions: actions taken, outcomes, errors | Days/weeks | ~500 tokens |
| **Semantic** | Extracted facts, concepts, relationships about the codebase and project | Long-term | ~800 tokens |
| **Procedural** | Learned patterns, coding conventions, successful strategies | Permanent | ~400 tokens |

**Automatic compression:** When episodic memory exceeds threshold, important entries are compressed into semantic or procedural tiers. Users never manage this manually.

**Retrieval:** Hybrid search — BM25 (exact keyword) + dense vector + graph traversal. Benchmark: **95.2% R@5** (correct memory in top 5 results). Typical injection: **~1,900 tokens per session** vs 45,000+ tokens for full history replay.

**GUI Panel — Memory Tier Browser:**

- Tiered view: four sections, collapsible, showing entry count and last-used date per tier
- Real-time feed: new memories appear as they're extracted mid-session
- Cross-agent filter: show memories created by Claude vs Codex vs Antigravity sessions
- Session replay from memory: reconstruct a past session's context state using only its memory snapshot
- Memory promotion: manually move an episodic entry to semantic or procedural tier
- Export tier: download any tier as JSON for backup or migration

-----

### 7.4 Context Maintenance Engine

> **Phase: v1** — All of 7.4. Context health is the solution to the #1 pain point in §2.1. Ships in full.

#### 7.4.1 Context Budget System

Visual allocation of the context window across sources:

```
Total Context Window: 200,000 tokens
├── System Prompt + Rules:    2,000  (1.0%)
├── Memory Injection:         4,000  (2.0%)
├── File Context:            12,000  (6.0%)
├── Conversation History:    60,000 (30.0%)
└── Available:              122,000 (61.0%)
```

User can manually adjust allocations via sliders. Hard mode: lock allocations so the agent cannot exceed them.

#### 7.4.2 Context Position Monitor

Real-time heatmap of the context window:

- Divides context into 10 segments
- Colors each segment: green (high attention), yellow (medium), red (dead zone)
- Research baseline: 40–80% of context is the low-attention “dead zone”
- Warns when critical files or instructions have drifted into the dead zone
- Auto-rescue: re-injects pinned content to escape the dead zone

#### 7.4.3 Content Pinning

Users can pin any of the following to always appear at the top of context:

- Specific files
- Memory entries
- Custom instruction blocks
- CLAUDE.md / AGENTS.md content
- API documentation snippets

Pinned content is always re-injected at the start of each turn, not just once.

#### 7.4.4 Directive Heartbeat

Addresses the “prompt decay” failure mode where the model gradually ignores initial instructions:

- Every N turns (configurable, default: 10), silently re-injects the project rules and constraints
- Works with pinned content, CLAUDE.md, and custom system prompts
- “Decay risk” indicator shows estimated instruction adherence based on conversation length
- Can be triggered manually via `/refresh-directives` command

#### 7.4.5 Smart Summarization

When the conversation history approaches the configured budget:

- Summarizes older turns using a fast, cheap model (configurable)
- Summary preserves: decisions made, files changed, errors encountered, current task state
- User sees a “Summarized N turns” indicator with option to expand/review
- Checkpoint is created before any summarization (allowing rollback)

#### 7.4.6 Context Health Score

A 0–100 score computed in real time:

- Penalizes for: dead-zone drift, high conversation-to-file ratio, missing CLAUDE.md, stale memory
- Bonuses for: recent summarization, pinned directives, within-budget allocation
- Score shown in status bar; drops below 60 triggers a warning

#### 7.4.7 Cross-Session Continuity

“Continue from last session” feature:

- Saves a session snapshot: full context state, task description, files open, memory loaded
- On next open, offers to resume from the snapshot
- Snapshot includes a plain-English summary: “You were implementing the auth module, last action was writing the JWT validation function”
- Managed via `.agentloft/snapshots/` directory

#### 7.4.8 Context Config File

Per-project declarative context configuration:

```yaml
# .agentloft/context.yaml
always_include:
  - src/types/**
  - CLAUDE.md
  - docs/architecture.md

never_include:
  - node_modules/**
  - .env*
  - dist/**
  - "**/*.test.ts"  # exclude tests unless asked

max_depth: 3  # folders
auto_index: true
index_on_open: true

pinned_instructions:
  - "This project uses PostgreSQL 15, never suggest SQLite"
  - "All components must have unit tests"
  - "Never modify files in src/legacy/"

heartbeat_interval: 10  # turns
context_budget:
  memory_tokens: 4000
  file_tokens: 12000
```

#### 7.4.9 Smart Resume

When a user reopens a project or resumes a session, AgentLoft selects the optimal context injection depth to avoid burning tokens on boilerplate history reconstruction.

**Three depth options (user selects at resume dialog):**

| Option | Tokens injected | What's included | Best for |
|--------|----------------|-----------------|----------|
| **Graph Summary** (default) | ~2,000–5,000 | Graphify project graph summary + top-5 semantic memories + last session outcome | Most sessions — fresh start with structural awareness |
| **Full History** | ~20,000–60,000+ | Complete conversation history + all memory tiers + current file context | Debugging a specific past thread; needs exact prior context |
| **Fresh Start** | 0 | Nothing from past sessions | Truly new task with no continuity needed |

**Auto-detection of project phase:**

AgentLoft analyzes the last session and suggests a depth automatically:
- Session ended mid-task with open tool calls → suggests "Full History"
- Session ended with "all done" / `/clear` → suggests "Graph Summary"
- First session on project → shows onboarding prompt, no memory yet

**Resume dialog shows a token cost comparison:**

```
Resume "Fix auth bug" session
─────────────────────────────
● Graph Summary    ~4,200 tokens    ~$0.01    (Recommended)
○ Full History    ~48,000 tokens    ~$0.09
○ Fresh Start           0 tokens    $0.00

Without AgentLoft:  60,000+ tokens required to reconstruct context manually
```

This comparison is shown on every resume so users build intuition about the token savings.

-----

### 7.5 External Endpoints & Platform Connectivity

> **Phase: v1** — All of 7.5. These integrations are the product's plumbing. Nothing else runs without them.

#### 7.5.1 Claude Code Integration

Native integration via child process spawning:

- Spawns `claude` CLI as a managed subprocess with PTY
- Intercepts all tool calls via a local proxy layer
- Parses structured output (JSON tool calls) in real time
- Renders tool calls in the Agent Cockpit panel
- MCP server passthrough: AgentLoft’s MCP configs are injected into Claude Code’s context
- Project knowledge base sync: reads/writes `.claude/` directory
- Extended thinking: toggle per-session, with visual reasoning trace renderer
- `/effort` control exposed as a UI control (not buried in terminal)
- Usage limit monitoring via API polling

#### 7.5.2 OpenAI Codex CLI Integration

- Spawns `codex` CLI as a managed subprocess with PTY
- Parses streaming output for tool call interception
- Function calling schema builder UI: drag-drop to define tools, generates JSON schema
- Assistant API thread management: persistent thread IDs surfaced in UI
- Fine-tuned model support: add custom model IDs in settings
- Organization ID and project ID support

#### 7.5.3 Antigravity CLI Integration (formerly Gemini CLI)

> **Note:** Google’s Gemini CLI (TypeScript, ~105k stars) is deprecated for non-enterprise users effective **June 18, 2026**. AgentLoft will target the **Antigravity CLI** (Go-based replacement, announced at Google I/O May 2026) going forward. Legacy Gemini CLI support will be maintained for users who remain on it.

**Antigravity CLI (primary target):**
- Spawns `antigravity` CLI (Go binary) with full PTY integration
- Integrates with the Antigravity Managed Agents API and SDK
- Native support for multi-agent orchestration features Google ships in Antigravity 2.0
- Google AI Studio / Firebase / Android toolchain integration via Antigravity connectors
- Two-way real-time feed for stateful interactive processes (vim, git rebase, etc.)
- Grounding toggle: enable/disable Google Search integration per session
- Multimodal input: drag images, PDFs, audio directly into the chat (Gemini 3.5 Flash default)
- Code execution sandbox output rendered as rich output blocks (not raw text)
- Full 1M+ token context window utilization with automatic large-file handling
- Voice mode support (Antigravity v0.41+ real-time voice)

**Legacy Gemini CLI (maintained for compatibility):**
- Spawns `gemini` CLI with PTY integration (for users who remain on v0.43 or earlier)
- All original Gemini CLI features remain supported
- Users who upgrade to Antigravity CLI get automatic migration path in AgentLoft settings

#### 7.5.4 Universal Endpoint Layer

Add any OpenAI-compatible endpoint:

- URL, API key, model name
- Custom headers support
- Per-endpoint timeout and retry configuration
- Health check: tests connectivity before use
- Capability detection: auto-detects tool use, vision, streaming support

Pre-configured endpoint templates:

- Ollama (localhost:11434)
- LM Studio (localhost:1234)
- Groq
- Together AI
- Fireworks AI
- Perplexity AI
- AWS Bedrock (via proxy)
- Azure OpenAI

#### 7.5.5 Connection Profiles

Save and switch between endpoint configurations per project:

```yaml
profile: "production-work"
models:
  primary: claude_code/claude-opus-4-5
  secondary: gemini_cli/gemini-2-pro
  fallback: openai_api/gpt-4o
  cheap: anthropic_api/claude-haiku-4-5
```

#### 7.5.6 MCP Native Support

AgentLoft is itself an MCP client and can also act as an MCP server:

- Install MCPs from the Marketplace with one click
- Configure MCP servers per project via `.agentloft/mcps.yaml`
- MCP health dashboard: status of each installed MCP
- MCP permission manager: what each MCP can access
- MCP logs: every call and response logged and inspectable
- AgentLoft exposes its own MCP tools (memory, context, file tree) to the active agent

-----

### 7.6 Marketplace

> **Phase: v1** (§7.6.1–7.6.2 Skills + §7.6.4 MCP Hub basic install + §7.6.5 Static registry backend) | **v1.1** (§7.6.3 Plugins with Web Worker sandbox; §7.6.4 MCP Composer visual chaining) | **v2** (§7.6.3 WASM sandbox upgrade) | **v3** (§7.6.6 Revenue share / paid tier)

#### 7.6.1 Overview

The Marketplace is the community flywheel. Three categories of installable content:

**Skills** — Reusable prompt templates with variables and logic
**Plugins** — JS/Python modules that extend the AgentLoft UI and workflow
**MCP Hub** — Curated MCP servers with one-click install and configuration

#### 7.6.2 Skills Specification

A skill is a `.skill.yaml` file with the following structure:

```yaml
name: scaffold-react-component
version: 1.2.0
author: agentloft-community
description: Scaffold a typed React component with tests and Storybook story
category: frontend
tags: [react, typescript, component, testing]
model_optimized_for: claude-code
variables:
  - name: component_name
    type: string
    required: true
    description: PascalCase component name
  - name: has_props
    type: boolean
    default: true
  - name: test_framework
    type: enum
    options: [vitest, jest, none]
    default: vitest
prompt: |
  Create a complete React component named {{component_name}}.
  {% if has_props %}Include a typed Props interface.{% endif %}
  Include a test file using {{test_framework}}.
  Follow the project conventions in memory.
hooks:
  before: |
    // runs before skill executes
    context.injectFile('src/components/index.ts')
  after: |
    // runs after skill executes
    tools.runLinter()
user_invocable: true
shortcut: /scaffold
```

Skills appear in the Command Palette and as slash commands.

#### 7.6.3 Plugins Specification

A plugin is a directory with:

- `plugin.json` — manifest (name, version, author, permissions)
- `index.js` — entry point (sandboxed in Web Worker)
- `ui.jsx` (optional) — UI panel component

**Plugin API (exposed to sandboxed plugin):**

```typescript
// Read-only access to session state
agentloft.session.getMessages(): Message[]
agentloft.session.getActiveFiles(): File[]
agentloft.session.getMemory(): MemoryEntry[]

// UI injection
agentloft.ui.addSidebarPanel(component: React.FC)
agentloft.ui.addOutputRenderer(mimeType: string, renderer: React.FC)
agentloft.ui.addStatusBarItem(item: StatusBarItem)

// Hooks
agentloft.hooks.onAgentWrite(callback: (diff: FileDiff) => void)
agentloft.hooks.onToolCall(callback: (call: ToolCall) => Promise<void>)
agentloft.hooks.onSessionEnd(callback: (session: Session) => void)

// Limited write access (requires permission in manifest)
agentloft.agent.injectContext(text: string)
agentloft.agent.blockToolCall(callId: string, reason: string)
```

**Plugin sandboxing — WebAssembly VM:**

Plugins run in a **WebAssembly-based sandbox** (wasmtime/wazero) rather than a plain Web Worker — providing stronger isolation with a documented permission model:

| Capability | Default | How to grant |
|------------|---------|-------------|
| `fs` (filesystem read) | ❌ blocked | Declare `// permission: fs.read` in plugin manifest |
| `fs` (filesystem write) | ❌ blocked | Declare `// permission: fs.write` with path patterns |
| `net` (network requests) | ❌ blocked | Declare `// permission: net` with allowed host list |
| `process` / `require` | ❌ blocked | Never grantable — no Node.js runtime access |
| `gui.notify` | ❌ off by default | Declare `// permission: gui.notify` |
| `agentloft.agent.*` | Limited read-only | Write access requires separate `agent.inject` permission |

**Resource limits (hard-coded, not user-configurable):**
- Execution time: **100ms per event hook** — kills execution if exceeded
- Memory heap: **1MB** — prevents memory exhaustion attacks
- Instruction budget: **100 instructions per event** — prevents CPU spin loops

**Third-party hook verification:**

When a plugin is installed from the marketplace, AgentLoft scans its source for:
- `eval()` calls — flagged as high risk
- `fetch()` to unknown hosts — must match declared `net` permissions
- File writes outside declared path patterns — blocked at runtime
- Obfuscated code — requires manual review before install

Resource limit violations **kill the hook execution** with a visible error in the Plugin Manager — the plugin does not crash AgentLoft.

#### 7.6.4 MCP Hub

Curated registry of MCP servers with:

- Category browse: Databases, APIs, DevOps, Web, Files, AI/ML, Communication
- Community ratings (1–5 stars) and download count
- Security scan badge (automated scan result + last scan date)
- Verified publisher badge
- One-click install → auto-generates config and injects into active project
- Version pinning per project
- Changelog per MCP version

**MCP Composer** *(v1.1 — deferred from v1):* Visual tool to chain MCPs:

- Drag MCPs onto a canvas
- Connect outputs to inputs
- Define conditions and transformations
- Export as a named workflow

#### 7.6.5 Marketplace Backend

- Hosted on GitHub (packages as GitHub Releases)
- Registry index as a static JSON file on CDN
- Publishing CLI: `agentloft publish skill ./my-skill.yaml`
- OAuth via GitHub for publisher identity
- Automated security scanning on submission (Semgrep + OWASP checks)
- Community moderation: flag, review, remove pipeline
- Featured picks curated by maintainers weekly

#### 7.6.6 Revenue Share (Future — v3+)

- Premium skills/plugins: one-time purchase or subscription
- 70/30 split (creator/platform)
- Stripe Connect integration
- Free tier remains for all core community content

-----

### 7.7 Auto Project Setup

> **Phase: v1** (§7.7.3 Auto-detect on existing projects — scans repo and generates `context.yaml` + `CLAUDE.md` stub. Low effort, high impact.) | **v2** (§7.7.1 Project Wizard — requires template infrastructure + LLM parse step) | **v2** (§7.7.2 Project Templates — requires community template marketplace)

#### 7.7.1 Project Wizard

> **v2 — Deferred from v1.** The wizard requires a template library and an LLM parse step to interpret project descriptions. Build §7.7.3 auto-detect first; add the wizard in v2 once the template ecosystem exists.

On new project creation, a wizard flow:

**Step 1 — Describe in Plain English**

- Free-form text: “A SaaS app for managing restaurant menus with a Next.js frontend and Supabase backend”
- AgentLoft uses a lightweight model to parse intent and propose a setup plan

**Step 2 — Confirm or Adjust Stack**

- Detected or proposed: framework, language, database, hosting, test framework, CI
- User can override any item
- Shows estimated setup time and which steps are automated

**Step 3 — Scaffold and Configure**
AgentLoft executes the setup plan:

```
✓ Cloned template: nextjs-supabase-saas
✓ Installed dependencies (npm install)
✓ Configured ESLint + Prettier + Husky + lint-staged
✓ Set up Vitest with sample test
✓ Generated .agentloft/context.yaml
✓ Initialized memory with project conventions
✓ Created CLAUDE.md with project rules
✓ Generated AGENTS.md for cross-tool compatibility
✓ Installed recommended MCPs: filesystem, supabase, browser-tools
✓ Pre-loaded skills: scaffold-component, write-tests, document-api
✓ Generated .env.example with required keys
✓ Initialized git with .gitignore
✓ Set up GitHub Actions CI template
```

**Step 4 — First Session Seeding**

- Opens a session with a pre-populated context: “You’ve just set up this project. The architecture is X…”
- First message from the agent: a brief summary of what was set up and suggested first tasks

#### 7.7.2 Project Templates

> **v2 — Deferred from v1.** Templates are content, not code. They require community seeding and ongoing maintenance. Add in v2 alongside the broader Marketplace expansion.

Community-maintained template library in the Marketplace:

- SaaS starter (Next.js + Stripe + Supabase)
- Mobile app (React Native + Expo)
- CLI tool (Node.js + Commander or Python + Click)
- REST API (FastAPI / Express / Go Fiber)
- Data pipeline (Python + dbt + Airflow)
- Browser extension (Plasmo framework)
- Desktop app (Tauri)
- Discord/Slack bot
- Machine learning project (PyTorch + W&B)

Each template ships with:

- Pre-seeded project memory
- Recommended skill set
- MCP configuration
- CLAUDE.md and AGENTS.md
- GitHub Actions workflows

#### 7.7.3 Auto-Detect on Existing Projects

Drop AgentLoft on an existing repo:

1. Scans `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, etc.
1. Reads directory structure and infers patterns
1. Detects: framework, dependencies, test setup, linting, CI
1. Generates an initial `.agentloft/context.yaml`
1. Seeds project memory with detected conventions
1. Suggests MCPs based on detected integrations (e.g., detects Prisma → suggests database MCP)
1. Generates a CLAUDE.md stub with project-specific rules

-----

### 7.8 Agent Cockpit & Observability

> **Phase: v1** (§7.8.1 Tool Call Feed, §7.8.2 Intent Gap Detector, §7.8.3 Blast Radius Preview — these three make AgentLoft a workbench, not a chat box) | **v1.1** (§7.8.4–7.8.10: Speculation Mode, Surgical Mode, Assumption Logger, Change Scope Meter, Rollback System, Repetition Detector, Narrative View)

#### 7.8.1 Tool Call Feed

Real-time panel showing every agent action:

```
▶ read_file      src/auth/jwt.ts          12ms
▶ read_file      src/middleware/auth.ts   8ms
● write_file     src/auth/jwt.ts          ← live
▶ bash           npm test -- --watch=false
✓ bash           (exit 0, 2.3s)
▶ write_file     src/auth/jwt.test.ts
```

Each row:

- Tool type icon
- File/command argument
- Duration
- Status (pending, running, success, error)
- Expandable: full input and output of the tool call

#### 7.8.2 Intent Gap Detector

Before execution begins, compares the user’s request against the agent’s planned actions:

- Parses the agent’s stated plan (from thinking output or first response)
- Flags divergences: “You asked for 1 component, agent plans to modify 4 files”
- Shows a diff of “requested scope” vs “planned scope”
- User can approve the expanded scope or constrain it before execution

#### 7.8.3 Blast Radius Preview

Before any multi-file edit executes:

- Builds a dependency graph of all files the agent plans to touch
- Extends the graph to all files that import/depend on those files
- Renders as a visual graph with node colors: green (direct edit), yellow (dependency), red (high-risk)
- Shows count: “3 direct changes, 7 downstream dependencies”
- User approves or narrows scope before execution begins

#### 7.8.4 Speculation Mode *(v1.1)*

A read-only planning pass before execution:

- Runs the agent with tools blocked (no writes, no bash)
- Agent describes everything it plans to do
- Output rendered as a structured plan: step-by-step, with file names and action types
- User approves the plan (executes) or edits it (re-plans) or rejects it
- Configurable: always use speculation mode, use for tasks touching >N files, never

#### 7.8.5 Surgical Mode *(v1.1)*

Session-level constraint preventing unasked changes:

- Any file write not matching the currently stated task is flagged
- “Unrequested change” marked in the diff — user must explicitly approve it
- Agent cannot modify files in user-defined protected zones
- Protected zones configured in `.agentloft/context.yaml` under `protected_paths`

#### 7.8.6 Assumption Logger *(v1.1)*

Sidebar panel that captures every assumption the agent makes:

- “I assumed TypeScript strict mode is enabled”
- “I assumed this project uses Zod for validation”
- “I used Postgres syntax — is that correct?”

Each assumption has Confirm / Correct / Ignore buttons. Corrections are automatically added to project memory.

#### 7.8.7 Change Scope Meter *(v1.1)*

Visual indicator showing the ratio of:

- Files changed vs files touched
- Lines added vs lines deleted
- Functions modified vs functions added

High change-to-ask ratio (agent wrote a lot more than asked for) triggers a warning before acceptance.

#### 7.8.8 Rollback System *(v1 — basic) | (v1.1 — advanced)*

> **v1 scope:** Auto-checkpoint creation before every write batch + one-click restore to any checkpoint. This is what prevents the “agent wrecked my codebase and I can't undo it” drop-off. Implementation cost is low — checkpoints are file snapshots stored in `.agentloft/snapshots/`.
>
> **v1.1 scope:** Timeline UI, preview diff, branch-from-checkpoint. Requires polished UI and the session branching foundation.

**Checkpoint types:**

- Auto checkpoint: created before every agent write batch *(v1)*
- Manual checkpoint: `⌘S` or `/checkpoint` *(v1)*
- Milestone: named, persistent, user-created *(v1.1)*

**v1 Rollback UI:**

```
Agent cockpit status bar:   ● 4 checkpoints this session   [Restore last →]
```

- “Restore last” undoes all file changes since the previous auto-checkpoint — one click, no confirmation dialog required (undo is always safe)
- Full restore list accessible via `⌘Z` → dropdown shows all checkpoints in reverse chronological order with timestamps
- Each checkpoint entry shows: timestamp, what triggered it (auto/manual), file count changed

**v1.1 Rollback UI (advanced):**

- Timeline view of all checkpoints in the current session
- Preview diff of any checkpoint vs current state
- Branch from checkpoint: “I want to try a different approach from this point”

**Implementation:** Checkpoints store a git-compatible snapshot of all modified files. No git integration required — AgentLoft maintains its own internal snapshot store at `.agentloft/snapshots/{session-id}/`.

#### 7.8.9 Repetition Detector *(v1.1)*

Detects when the agent is re-implementing something that already exists:

- Before each significant write, checks if a semantically similar function/module exists in the indexed codebase
- “This looks like `parseUserToken()` in `src/utils/auth.ts` — use that instead?”
- Similarity threshold configurable (default: 80%)

#### 7.8.10 Narrative / Semantic View *(v1.1)*

The default **Log View** in the Cockpit shows raw tool calls, JSON frames, and event IDs. Narrative View converts the same session into a human-readable story, suitable for sharing with non-technical teammates or reviewing long sessions quickly.

**Toggle:** `Narrative` / `Log` button in the Cockpit header (per-session preference).

**How it works:**

Each narrative entry is a **1–2 sentence summary** of what the agent did, generated inline using a lightweight local pass (no additional API call — uses rule-based summarization for tool calls, short LLM call only for complex reasoning turns if explicitly enabled):

```
Log View:                          Narrative View:
──────────────────────────────     ──────────────────────────────────────────────
tool_use: bash                     Ran the test suite — 3 tests failed in
  cmd: npm test                    auth.test.ts (JWT expiry handling).
  exit: 1
  stdout: 3 tests failed...

tool_use: read_file                Read the failing test file to understand
  path: src/auth/auth.test.ts      what behavior is expected.
  lines: 45–89

tool_use: write_file               Fixed the JWT expiry check in login.ts —
  path: src/auth/login.ts          changed `>` to `>=` on the token expiry
  ...diff...                       comparison (line 67).
```

**Narrative panel features:**
- Timestamped entries with expandable raw tool call detail (click to expand)
- Collapsible **reasoning timeline** — shows the agent's thinking blocks as a visual decision tree
- **”Export Narrative”** button — downloads the session as a readable markdown document
- **Session summary** at the bottom: what was accomplished, files changed, open questions
- Searchable — `Cmd+F` within the narrative finds entries by keywords

#### 7.8.11 End-of-Task Summary Card

> **Phase: v1** — When the agent finishes a task, the current spec shows a session footer with total cost, tokens, and duration. Those are engineer metrics. The Vibecoder persona (§4, Persona 1) needs a human-readable answer to the question: "What just happened?" This card is the answer.

The Summary Card appears automatically whenever a task ends. It does not require user action to find — it pushes to the foreground at the moment the user cares most.

**Trigger conditions (any one fires the card):**

- Agent sends a completion message ("I've finished", "Done", "All changes have been applied")
- User types `/clear`, `/new`, or closes the session
- Session reaches a checkpoint and idle for 30+ seconds with no new turns
- Background agent completes and returns to foreground

**Two-tier display — toggled by Experience Level (§7.1.9):**

---

**Simple Mode (Guided / Newcomer):**

```
✅ Task Complete
─────────────────────────────────────────────────────────

The agent updated your login flow:
  • Created   src/pages/LoginPage.tsx
  • Modified  src/api/auth.ts  (added JWT validation)
  • Modified  src/routes.tsx  (added /login route)
  • Created   src/tests/auth.test.ts

All changes are saved. Nothing was deleted.

💾 3 checkpoints created — you can roll back at any time.
💰 Cost: $0.31   ⏱ 4 min 12 sec

[Review Changes →]   [Keep Working]   [Start New Task]
```

---

**Detailed Mode (Standard / Expert):**

```
Task Complete — Login Flow Implementation
─────────────────────────────────────────────────────────
Model: claude-sonnet-4-6     Effort: Medium
Duration: 4 min 12 sec       Turns: 14
Cost: $0.31                  Tokens: 48,200 (↑12% vs baseline)
Cache hit rate: 71%          Checkpoints: 3

Files changed (4):
  + src/pages/LoginPage.tsx        (+187 lines)
  ~ src/api/auth.ts                (+34 / -8 lines)
  ~ src/routes.tsx                 (+6 / -0 lines)
  + src/tests/auth.test.ts         (+92 lines)

Tool calls: write_file ×4  read_file ×11  bash ×3
Memory extracted: 2 new facts queued for review

[Review Diff]   [Export Summary]   [Review Memories]   [Continue]
```

---

**Memory extraction integration:**

If the memory extractor identified new facts during this session, the Summary Card shows a "Review Memories" count badge. Clicking it opens the Memory Review panel inline — the user can approve/reject memories without leaving the card.

**Export Summary:**

Downloads a markdown file:
```markdown
# Task: Login Flow Implementation
**Date:** 2026-05-25  **Model:** claude-sonnet-4-6  **Cost:** $0.31

## What happened
The agent implemented a login page with JWT authentication...

## Files changed
- `src/pages/LoginPage.tsx` — Created (187 lines)
...

## Checkpoints
- Checkpoint 1 (turn 5): before auth.ts modification
...
```

**Persistent access:**

After dismissal, the Summary Card is accessible from:
- The session history entry (hover → "View Summary")
- `⌘⇧Y` (Session Replay shortcut) shows the summary before entering full replay

-----

### 7.9 Safety & Trust Layer

> **Phase: v1** (§7.9.1 Permission System, §7.9.2 Regression Shield — non-negotiable for trust; ships in v1) | **v1.1** (§7.9.3 Drift Guard, §7.9.4 Protected Zones, §7.9.5 Prompt Decay Monitor)

#### 7.9.1 Permission System

Every potentially destructive or sensitive action requires explicit permission:

|Action Type                  |Default           |User Control                         |
|-----------------------------|------------------|-------------------------------------|
|Write files in project       |Allow             |Can restrict to specific paths       |
|Run bash commands            |Ask first time    |Can set to always allow or always ask|
|Delete files                 |Always ask        |Cannot disable                       |
|Git operations (commit, push)|Ask               |Can allow                            |
|Network requests             |Ask               |Can allow per domain                 |
|MCP server calls             |Allow enabled MCPs|Can restrict per MCP                 |
|Read files outside project   |Ask               |Can allow                            |
|Environment variable access  |Ask               |Can allow specific vars              |

#### 7.9.2 Regression Shield

After any agent write batch:

1. Runs the project’s test suite in a subprocess
1. Compares pass/fail status before and after the changes
1. If any previously passing tests now fail: shows a “Regression Detected” panel
1. Options: Accept anyway, Rollback, Ask agent to fix regressions

Test runner auto-detected from project config (package.json scripts, pyproject.toml, etc.).

#### 7.9.3 Drift Guard (Git Hook Integration) *(v1.1)*

Optional git hook that reviews AI-generated commits:

- Detects commits containing AI-generated code (flagged by AgentLoft session metadata)
- Runs: test suite, Semgrep security scan, complexity analysis, dependency audit
- Generates a “vibe report” with a confidence score per file
- Blocks commits below a configurable threshold
- Can be overridden with `--no-verify` (logged for audit)
- GitHub Actions version for PR-level gates

#### 7.9.4 Protected Zones *(v1.1)*

Files and directories that the agent can never modify without explicit override:

```yaml
# .agentloft/context.yaml
protected_paths:
  - src/payments/**      # payment processing is off-limits
  - .env*               # never touch env files
  - prisma/migrations/** # never auto-modify migrations
  - CHANGELOG.md        # never auto-update changelog
```

Violations are blocked at the tool-call interception layer, not just the prompt layer.

#### 7.9.5 Prompt Decay Monitor *(v1.1)*

Tracks instruction adherence over a session:

- Baseline: agent’s first 10 responses
- Ongoing: semantic similarity between current behavior and initial instructions
- “Drift score” shown in status bar
- Below 70%: yellow warning
- Below 50%: red alert + offer to refresh directives

-----

### 7.10 Cost Intelligence

> **Phase: v1** — All of 7.10. Real-time cost visibility is cited as a Critical pain point in §2.1. Ships in full with v1.

#### 7.10.1 Real-Time Cost Tracker

Shown in the status bar, updated every token:

- Session cost: $X.XX
- Project total (all-time): $X.XX
- Per-model breakdown
- Cost per task (grouped by conversation thread)

#### 7.10.2 Cost Anomaly Detector

Baselines expected cost per session based on history:

- Fires an alert if current session is 2x over baseline
- Shows why: “Cache miss rate is 94% — check for prompt caching issues”
- “Cost spike at turn 12” — pinpoints when costs accelerated
- Integrates with the documented caching bug detection

#### 7.10.3 Cache Health Monitor

Tracks prompt cache effectiveness per model:

- Cache hit rate % per turn
- Visual graph of cache hits over session
- Detects the known Claude Code caching bugs (cache invalidating every turn)
- Alert: “Cache appears broken — consider restarting the session”

#### 7.10.4 Burn Rate Projections

- “At this rate, this task will cost ~$0.80 total”
- “You’ll hit your Claude Pro limit in approximately 34 minutes at current usage”
- “This model costs 3x more than Gemini for this type of task”

#### 7.10.5 Budget Controls

Per-project and per-session budget caps:

```yaml
budgets:
  session_hard_cap: 5.00   # stop and ask if session exceeds $5
  task_soft_cap: 1.00      # warn if a single task exceeds $1
  daily_total: 20.00       # warn if daily spend exceeds $20
  monthly_total: 100.00    # block if monthly spend exceeds $100
  low_balance_alert: 10.00 # alert when prepaid balance < $10
```

#### 7.10.6 Model Cost Comparison

When a task completes:

- Shows cost breakdown by model
- “The same task using Gemini Flash would have cost $0.04 vs $0.41 with Claude Opus”
- Recommendations: “For tasks like this, consider using [cheaper model] — saves ~75%”

#### 7.10.7 Unified Quota Dashboard

Shows current limits and usage for all connected platforms:

- Claude Code: Pro/Max plan limits, reset time, used this period
- OpenAI: Rate limits, tier, remaining requests/tokens
- Antigravity (formerly Gemini): Free tier / AI Ultra quota, Gemini 3.5 usage
- Visual burn-down chart per platform

#### 7.10.8 Model Pricing Database

Cost Intelligence computes live costs — but it needs accurate price data. This section specifies how AgentLoft maintains and updates its token pricing table.

**Price data sources (priority order):**

1. **Provider-reported (highest accuracy):** Claude Code and Codex CLI report token counts + cost in their stream-JSON output. AgentLoft derives cost directly from these values — no internal price table needed for the primary CLIs.
2. **Provider API (for non-CLI endpoints):** For OpenAI-compatible API endpoints, AgentLoft calls `/v1/models` and uses the `pricing` field where available (OpenRouter, Together AI, Fireworks AI all expose this).
3. **Bundled pricing table (fallback):** For providers that don't expose pricing in their API, AgentLoft ships a bundled `prices.json` file (updated with each release):

```json
{
  "version": "2026-05-01",
  "providers": {
    "anthropic": {
      "claude-opus-4-7":    { "input": 15.00, "output": 75.00, "cache_write": 3.75, "cache_read": 1.50 },
      "claude-sonnet-4-6":  { "input":  3.00, "output": 15.00, "cache_write": 0.75, "cache_read": 0.30 },
      "claude-haiku-4-5":   { "input":  0.80, "output":  4.00, "cache_write": 0.20, "cache_read": 0.08 }
    },
    "openai": {
      "codex-mini":         { "input":  1.50, "output":  6.00 },
      "gpt-4o":             { "input":  2.50, "output": 10.00 }
    },
    "google": {
      "gemini-3-flash":     { "input":  0.10, "output":  0.40 },
      "gemini-3-pro":       { "input":  1.25, "output":  5.00 }
    }
  },
  "units": "USD per million tokens"
}
```

**Pricing update mechanism:**

- AgentLoft checks for a pricing update on startup (one HTTP GET to `prices.agentloft.dev/latest.json`), with a 7-day cache
- If a provider's API reports a different price than the bundled table, AgentLoft uses the live API value and flags the discrepancy in the developer console
- Users can inspect and override individual prices in Settings → Cost Intelligence → "Price Overrides" (e.g., for custom fine-tuned models)
- `agentloft_DISABLE_PRICE_FETCH=true` env var disables the update check entirely (air-gap mode)

**Stale price warning:**

If the bundled `prices.json` is older than 90 days and the update fetch has failed, AgentLoft shows a non-blocking notice: "Cost estimates may be inaccurate — pricing data is over 90 days old." Users can dismiss or trigger a manual refresh.

#### 7.10.9 Cost Calm Mode

> **Phase: v1** — Real-time per-turn cost display can generate anxiety that interrupts flow. Cost Calm Mode gives users who find the live ticker stressful a way to stay informed without being distracted.

**What it does:**

- Hides the per-turn cost indicator in the agent feed (the cost shown next to each individual response)
- Shows only the **session total** in the status bar — updated at the end of each turn, not per-token
- Cost Anomaly Detector (§7.10.2) and Budget Cap alerts (§7.10.5) still fire normally — Calm Mode hides granular display only, never suppresses warnings

**How to toggle:**

- **Status bar**: Click the cost indicator in the status bar → dropdown: "Cost Calm Mode: On / Off"
- **Settings**: Settings → Cost Intelligence → "Display mode: Live (per-turn) / Calm (session total)"

**Status bar in Calm Mode:**

```
Normal mode:  claude-sonnet-4-6  |  $0.023 / turn  |  $0.41 session  |  ●
Calm mode:    claude-sonnet-4-6  |  $0.41 session  |  ●
```

**Note:** Cost Calm Mode is automatically enabled when Expertise Toggle (§7.1.9) is set to **Guided** — newcomers see session totals only by default. Standard and Expert modes default to Live display.

-----

### 7.11 Visual Testing & Preview

> **Phase: v2 — Not in v1 scope.**
>
> This section describes a standalone visual testing product — bundled Playwright, screenshot diffing, visual regression baselines, auto-interaction tester. These are valuable features but they are not "GUI wrapper" features: they require a separate Playwright process, a headless Chromium instance, a screenshot storage system, and a pixel-diff engine. Building this in v1 would triple the implementation surface.
>
> **v1 substitute:** The Embedded Preview Pane (§7.11.1) ships in v1 as a simple webview that opens the user’s dev server URL. Hot-reload observation and DevTools are included. Screenshot diff, auto-interaction testing, and visual regression guard are v2.

#### 7.11.1 Embedded Preview Pane *(v1 — basic webview only; §7.11.2–7.11.5 are v2)*

- Integrated Chromium webview (via Tauri’s WebviewWindow)
- Auto-detects dev server URL from project config (package.json dev script, Vite, Next.js, etc.)
- Live hot-reload: preview updates the moment an agent writes a file
- DevTools accessible via context menu
- Mobile preview mode: select a device and see responsive behavior

#### 7.11.2 Screenshot Diff *(v2)*

Before/after comparison on every agent UI write:

- Captures a screenshot of the relevant page/component before the agent writes
- Captures after the dev server hot-reloads
- Shows pixel diff with highlighted changes
- “No visual changes” vs “Changed N pixels” indicator
- History of all visual changes in the session

#### 7.11.3 Auto-Interaction Tester *(v2)*

After an agent writes a UI component:

- Automatically clicks every button, link, and interactive element
- Fills form fields with test data
- Reports: “All interactions succeeded” or “Error on click of [element]: [error]”
- Screenshot on each interaction
- Powered by a headless Playwright instance bundled with AgentLoft

#### 7.11.4 Visual Regression Guard *(v2)*

Opt-in baseline system:

- User marks a UI state as the baseline (“this is correct”)
- After every subsequent agent write, the current state is compared to baseline
- Diff shown with threshold control (default: 2% pixel change = warning)
- Can block agent from finalizing changes if regression detected

#### 7.11.5 Console Error Monitor *(v1 — basic; auto-send to agent is v1.1)*

- Captures all browser console errors from the preview pane
- Surfaces them in the agent feed: “Console error detected after last write”
- Optionally auto-sends the error to the agent: “Fix this console error: [error]”
- Network error capture: failed fetch calls shown with status codes

-----

### 7.12 Workflow Automation (Flows)

> **Phase: v3 — Not in v1 or v2 scope.**
>
> Flows is a visual pipeline builder with node types, conditionals, loops, schedules, and webhooks. It is a separate product — think Zapier or n8n for AI agents. Building it requires a custom node-graph editor, a `.flow.yaml` runtime engine, a scheduler daemon, and webhook infrastructure. None of this is "GUI wrapper" functionality.
>
> **Why it's in the PRD:** Flows is the right long-term direction for power users who want to automate repeatable multi-step AI tasks. It belongs in the vision. But it cannot be allowed to influence v1 architecture decisions.
>
> **v1/v2 substitute:** The Skills system (§7.6.2) covers the simple case — reusable prompt templates. The Agent Profile system (§7.20) covers behavioral automation. These ship in v1 and serve 80% of the use cases Flows addresses.

#### 7.12.1 Overview

Flows are visual pipelines that chain agent actions, tool calls, and conditionals into repeatable workflows.

#### 7.12.2 Flow Node Types

|Node Type |Description                                             |
|----------|--------------------------------------------------------|
|Prompt    |Send a message to the active agent                      |
|Skill     |Run a marketplace skill                                 |
|Condition |Branch based on output content or test results          |
|Loop      |Repeat until condition met (max iterations configurable)|
|Bash      |Run a shell command                                     |
|MCP Call  |Invoke a specific MCP tool                              |
|File      |Read/write a specific file                              |
|Notify    |Send a system notification                              |
|Checkpoint|Save a session checkpoint                               |
|Human     |Pause and wait for user input                           |
|Webhook   |POST results to an external URL                         |

#### 7.12.3 Flow Examples

**“Test-Driven Development Loop”**

```
Prompt: "Write tests for {{feature}}"
→ Bash: "npm test"
→ Condition: tests pass?
  → No: Prompt: "Fix the failing tests: {{test_output}}"
         → Loop back to Bash
  → Yes: Prompt: "Now implement {{feature}} to pass the tests"
         → Bash: "npm test"
         → Checkpoint: "Feature complete"
```

**“PR Review Pipeline”**

```
Bash: "git diff main"
→ Prompt: "Review this diff for security issues"
→ Condition: security issues found?
  → Yes: Notify user + Human: "Review security findings"
  → No: Prompt: "Review for code quality"
       → Bash: "npm run lint"
       → Checkpoint
```

#### 7.12.4 Flow File Format

Flows are saved as `.flow.yaml` and can be shared via the Marketplace:

```yaml
name: test-driven-feature
version: 1.0.0
trigger: manual  # or: git_commit, file_change, schedule
variables:
  - name: feature
    type: string
    required: true
nodes:
  - id: write_tests
    type: prompt
    content: "Write comprehensive tests for {{feature}}"
    next: run_tests
  - id: run_tests
    type: bash
    command: "npm test -- --reporter=json"
    next: check_tests
  - id: check_tests
    type: condition
    check: "exit_code == 0"
    on_true: implement
    on_false: fix_tests
  # ... etc
```

#### 7.12.5 Flow Scheduler

Flows can be triggered automatically:

- On git commit (pre-commit or post-commit)
- On file change (watch mode)
- On schedule (cron expression)
- Via webhook (external trigger)
- On rate limit hit (auto-fallback flow)

-----

### 7.13 Multi-Agent Orchestration

> **Phase: v2 — Not in v1 scope.**
>
> Multi-agent orchestration requires a stable single-agent foundation: proven IPC, session management, permission model, and memory system. Building multi-agent before single-agent is stable inverts the dependency graph. Every architectural mistake in v1 gets multiplied by the number of agents.
>
> **v1 substitute:** The Session Grid (§7.1.3) already lets users run multiple independent sessions side-by-side. This covers the "parallel workstreams" use case without requiring inter-agent coordination infrastructure.
>
> **v2 prerequisite:** v1 IPC protocol (§9.4) is stable and the session model (§10.1) has been proven in production.

#### 7.13.1 Agent Roles

Spawn multiple specialized agents working in parallel:

|Role      |Default Model  |Responsibility                  |
|----------|---------------|--------------------------------|
|Architect |Claude Opus    |High-level design, API contracts|
|Builder   |Claude Sonnet  |Implementation                  |
|Tester    |GPT-4o / Sonnet|Test writing and execution      |
|Reviewer  |Claude Opus    |Code review, security audit     |
|Documenter|Gemini Flash   |Documentation, comments         |

#### 7.13.2 Shared Scratchpad

Agents communicate through a shared workspace:

- `scratchpad.md`: Notes, decisions, open questions
- `task_queue.json`: Tasks with status (pending, in_progress, complete, blocked)
- `contract.yaml`: API contracts and interfaces (Architect writes, Builder reads)
- File system: agents can read each other’s file writes

#### 7.13.3 Orchestration UI

Visual swimlane view:

- Each agent has a lane
- Messages, file writes, and tool calls shown as events on the timeline
- Inter-agent dependencies shown as arrows
- Pause/resume/terminate individual agents
- Message an individual agent while others continue

#### 7.13.4 Task Decomposer

Given a high-level goal, AgentLoft decomposes it into parallel tasks:

- “Build the user authentication module” →
  - Architect: design the auth API contracts
  - Builder: implement JWT handling
  - Tester: write auth test suite
  - Reviewer: security audit of auth code

User reviews and approves the decomposition before agents are spawned.

#### 7.13.5 Conflict Resolution

When two agents try to write the same file:

- Merge attempt: semantic merge if changes are compatible
- Conflict alert: if incompatible, pauses both agents and asks user to resolve
- Lock system: agent can acquire a file lock (other agents see it as locked)

-----

### 7.14 Team Mode & Collaboration

> **Phase: v3 — Not in v1 or v2 scope.**
>
> Team Mode requires AgentLoft Cloud: a backend sync service, authentication/authorization, real-time session sharing infrastructure, org-level storage, and audit log persistence. This is a SaaS product, not a desktop app feature. Building it prematurely creates a cloud dependency that contradicts the local-first promise of v1.
>
> **v1 substitute:** Users can share sessions by exporting them as JSON or markdown (§7.15.2). Org memory can be bootstrapped by checking a shared `CLAUDE.md` into the repo — this costs zero infrastructure and works with all three CLIs natively.
>
> **v3 prerequisite:** AgentLoft Cloud infrastructure exists and is paying for itself. Do not build this speculatively.

*Requires AgentLoft Cloud subscription*

#### 7.14.1 Shared Memory

- Org-level memory synced across all team members
- Edit in browser or desktop app
- Conflict resolution: last-write-wins with history
- Role-based: owners can write, contributors can suggest, viewers read-only
- Memory audit log: who added/changed what and when

#### 7.14.2 Session Sharing

- Share a session URL with a teammate
- Teammate sees your session in read-only live mode
- “Request control” — hand off to a teammate for pair programming
- Session recording for async review
- Comment on any agent action in a shared session

#### 7.14.3 Team Marketplace Shelf

- Private marketplace tier for team-internal skills, plugins, MCPs
- Only visible to members of the org
- Admin controls: required skills (auto-installed for all team members), banned plugins

#### 7.14.4 Audit Log

Immutable, append-only log of all AI-generated changes across the team:

- Who ran what agent
- What model and settings were used
- What files were changed
- Cost per change
- Test results before/after
- Exportable as CSV or JSON for compliance

#### 7.14.5 AI Change Attribution in Git

Optional git integration:

- Commits from AgentLoft are tagged with metadata: model used, session ID, cost
- `git log` shows: “feat: add OAuth login [AgentLoft/Claude Opus, $0.34, 34 tests passing]”
- GitHub PR integration: shows AI-generation metadata in PR description

-----

### 7.15 Session Replay & Branching

> **Phase: v1** (§7.15.1 Replay recording + §7.15.3 JSON/markdown export + §7.15.4 Full-text search — all built on top of SQLite session data that already exists) | **v2** (§7.15.2 Session Branching + §7.15.5 Fork Tree Visualization — requires stable session state model and in-memory context clone; add after v1 session data format is locked)

#### 7.15.1 Session Replay

Full recording of every session:

- Every message (user and agent)
- Every file change (before/after)
- Every tool call (input/output)
- Timing data (ms per operation)
- Cost per turn

Replay UI:

- Playback controls: play, pause, 1x/2x/5x speed
- Seek: click on any event in the timeline to jump to that moment
- File diff view synced to playback position
- “What the agent knew” panel: shows context state at any point in replay

#### 7.15.2 Session Branching *(v2)*

Branch from any point in session history:

- “What if I had described the task differently?”
- Opens a new session with context state rewound to the branch point
- Original session preserved
- Branches tracked in a session tree visualization

#### 7.15.3 Session Export *(v1)*

Export sessions as:

- **Blog post / tutorial:** Auto-generated markdown walkthrough with code snippets
- **JSON:** Full structured session for programmatic processing
- **Video:** Animated replay as MP4/GIF (via headless recording)
- **Gist:** Push key prompts and diffs to GitHub Gist

#### 7.15.4 Session Search *(v1)*

Full-text search across all past sessions:

- “Find the session where I fixed the JWT bug”
- “Show all sessions that touched src/payments/”
- Semantic search: “Find sessions about authentication”
- Filters: date range, model, project, cost, duration

#### 7.15.5 Fork Tree Visualization *(v2)*

When a session has been branched (via “Branch from here”), AgentLoft renders a visual fork tree in the left sidebar showing the full hierarchy of forked sessions.

**Tree display:**

```
● main — “Fix auth bug” (active)
  ├── ⎇ branch-1 — “Alt: use bcrypt” (2h ago, $0.04)
  │     └── ⎇ branch-1a — “bcrypt perf test” (1h ago, $0.01)
  └── ⎇ branch-2 — “Alt: use Argon2” (1h ago, $0.07)
```

Each node in the tree shows:
- **Session name** (user-set or auto-generated from first message)
- **Agent / model** used in that branch
- **Total cost** accumulated in that branch
- **Branch point** — which message/turn was the fork origin
- **Changed files** — hover tooltip showing which files differ from parent

**Interactions:**
- Click any node to **switch to that session** — AgentLoft loads its history and context
- Right-click → “Compare with parent” — opens a side-by-side diff of the file changes between the branch and its parent
- Right-click → “Merge branch” — (advanced) brings the branch's file changes back to the parent session for review
- “Prune” button — archive old branches to declutter (not deleted, just hidden)

The fork tree panel collapses to an icon in the sidebar when there are no branches.

#### 7.15.6 Session Organization — Folders, Tags & Archive

> **Phase: v1** — A daily user accumulates 50+ sessions per week and 200+ per month. The current spec has a session history panel with full-text search. Search works when you know what you are looking for; it fails for browsing. Without organization, the session history becomes unusable noise within 2 weeks of regular use.

**Session Sidebar Layout:**

The left sidebar session panel is reorganized to support scale:

```
Sessions                              [+ New]  [⚙]
──────────────────────────────────────────────────
🔍  Search sessions...

📌 PINNED
   Auth refactor (claude)        Today  $0.41
   Dashboard perf fix (codex)    Mon    $0.22

📁 Work Projects
   └ api-gateway/
       Fix rate limiting         Tue    $0.18
       Add JWT middleware         Mon    $0.31
   └ frontend/
       Redesign nav bar          Wed    $0.55

📁 Side Projects
   └ agentloft-plugin/
       Write unit tests           Fri    $0.09

🗓 UNGROUPED — This Week
   Quick regex fix               Thu    $0.04
   Explore new schema            Thu    $0.12

[Show Archived →]
```

**Folders:**

- Create folders from the sidebar: `+` icon → "New Folder"
- Drag any session card into any folder
- Folders can be nested one level deep (folder → subfolder, no deeper)
- Right-click a folder: rename, archive all sessions inside, export all, delete (with confirmation)
- Folders are per-machine (local), not synced to AgentLoft Cloud by default (configurable)

**Tags:**

- Right-click any session card → "Add Tag" → type a tag name or pick from existing
- Tags are colored chips shown on the session card
- Multiple tags per session
- Click any tag in the filter bar to filter to sessions with that tag
- Built-in smart tags applied automatically (non-editable, shown in grey):
  - `has-error` — session contained an agent error
  - `high-cost` — session cost > 2× your baseline
  - `long` — session > 30 minutes
  - `branched` — session has child branches

**Pin:**

- Pin up to 8 sessions (they appear at the top, above all folders)
- Right-click → "Pin" / "Unpin"
- Pinned sessions survive archiving — archiving a pinned session unpins it first with a confirmation

**Archive:**

- Archive removes a session from the main list without deleting it
- Archived sessions remain fully searchable and accessible via "Show Archived"
- Auto-archive suggestion: after 30 days of inactivity, AgentLoft offers to auto-archive (opt-in, configurable)
- Bulk archive: select multiple sessions → "Archive selected"

**Filter Bar:**

A compact filter strip above the session list:

```
[All ▾]  [Model: Any ▾]  [Date: Any ▾]  [Cost: Any ▾]  [Tags ▾]  [Clear filters]
```

Filters stack — selecting "Claude" + "This week" + tag "auth" shows only Claude sessions from this week tagged "auth".

**Session Card:**

Each session card shows:

```
┌──────────────────────────────────────────────────────┐
│  🔵 Fix JWT validation bug                           │
│  api-gateway  •  claude-sonnet-4-6  •  Tue 3:42pm    │
│  $0.31  •  14 turns  •  4m 12s                       │
│  [auth] [backend]                                    │
└──────────────────────────────────────────────────────┘
```

Right-click a session card: open, rename, pin, add tag, move to folder, duplicate, export, archive, delete.

**Bulk Operations:**

Select multiple session cards (Shift+click or Ctrl+click) → action bar appears at bottom:

```
3 sessions selected  [Add Tag]  [Move to Folder]  [Archive]  [Export]  [Delete]  [Cancel]
```

**Default Auto-Grouping (before first manual folder is created):**

Sessions sorted into time groups: Today / Yesterday / This Week / Last Week / Older. Once the user creates their first folder, auto-grouping is replaced by the folder view (auto-grouping visible as a toggle for ungrouped sessions only).

-----

### 7.16 Security & Privacy

> **Phase: v1** — All of 7.16. Local-first is a launch promise, not a roadmap item. If §21 compliance items are not met before v1 ships, the local-first claim is false.

#### 7.16.1 Local-First Architecture

By default, all data stays on the user’s machine:

- Memory: `~/.agentloft/memory/`
- Sessions: `~/.agentloft/sessions/`
- Settings: `~/.agentloft/config.yaml`
- Project data: `.agentloft/`

No data is sent to AgentLoft servers in the free tier.

#### 7.16.2 Secret Scanner

Before any content is sent to an external API:

- Scans for API keys, passwords, tokens, private keys, JWT secrets
- Patterns: AWS keys, GitHub tokens, Stripe keys, common `.env` patterns, certificate headers
- Detected secrets are redacted and user is warned
- “Never scan this file” option

`.agentloftignore` file: patterns for files to never send to any model, ever.

#### 7.16.3 Network Audit

Transparent log of everything sent to external APIs:

- Every API call: model, endpoint, token count, cost
- User can export this log
- “What did you send?” — human-readable summary of data sent in a session

#### 7.16.4 Encryption

- Memory files encrypted at rest using OS keychain
- API keys stored in OS keychain (not in plain text config)
- Session data encrypted at rest (optional, performance tradeoff)

#### 7.16.5 Air-Gap Mode

For high-security environments:

- Block all external API calls
- Use only locally-running models (Ollama, LM Studio)
- All features that require external APIs are hidden
- Network connection indicator shows “Air-gapped” in status bar

-----

### 7.17 Smart Token Pipeline

> **Phase: v1.1 — Not in v1 scope.**
>
> The pipeline is a compelling differentiator (40–60% token reduction) but adds architectural complexity on top of the core IPC layer. Building it in v1 risks entangling it with the stream-JSON integration before that integration is stable. Ship the CLI wrapper in v1 and prove it works cleanly. Then layer the pipeline in v1.1 with real usage data to tune the thresholds.
>
> **v1 substitute:** The Raw File Mode toggle (§7.0.11) and the Token Budget Forecaster warning UI (§7.4.1) cover the most impactful quick wins and ship in v1.

A 6-stage middleware layer that runs every prompt through a series of deterministic optimizations before it is sent to the CLI. Target: **40–60% token reduction** on typical developer workloads. All stages run in < 50ms total. No additional LLM calls. Every optimization is visible and bypassable.

**Safety contract:**
- “Send raw” button always available — skips the entire pipeline for one prompt
- All modifications shown to user before sending (diff-style preview)
- Pipeline can be disabled per-session or globally in Settings → Token Pipeline
- No silent modifications — every change is logged in the IPC Inspector

#### 7.17.1 Stage 1 — Prompt Minifier

Reduces unnecessary verbosity in user prompts before they reach the CLI.

**Four modes (user selects per-session):**

| Mode | What it does | Typical savings |
|------|-------------|-----------------|
| **Off** | No changes to prompt | 0% |
| **Conservative** | Remove trailing whitespace, normalize newlines, deduplicate adjacent identical lines | 2–5% |
| **Balanced** (default) | Conservative + remove filler phrases (“please”, “could you”, “I'd like you to”), normalize code block fences | 8–15% |
| **Aggressive** | Balanced + semantic deduplication within the prompt, abbreviate repeated technical terms, remove preamble/politeness framing | 20–35% |

The user sees a before/after token count indicator: `Prompt: 1,240 → 890 tokens (28% saved)`.

#### 7.17.2 Stage 2 — Context Deduplicator

Detects and removes duplicate content injected into context from multiple sources (memory, file attachments, conversation history, system prompt).

**Implementation:**
- SHA256 hash registry maintained for all content blocks in the current context window
- When two blocks hash to the same value → second is replaced with a `[see above — identical block]` reference
- When two blocks are semantically similar (cosine similarity > 0.95 using the bundled ONNX embedder) → deduplication prompt shown with “Keep both / Use first / Use second” option

**Typical scenario:** User has a `CLAUDE.md` that says “always use TypeScript strict mode”, AND a project memory entry that says the same thing, AND a system prompt that repeats it. Deduplicator collapses these to one instance, saving ~200–800 tokens depending on file sizes.

#### 7.17.3 Stage 3 — Smart File Loader

Rather than injecting every attached file at full fidelity, assigns each file to a loading tier based on its relevance to the current prompt.

**Four tiers:**

| Tier | Content included | Token cost | Triggered when |
|------|-----------------|-----------|----------------|
| **Full** | Complete file content | 100% | File directly referenced in prompt, or is a dependency of a referenced file |
| **Summary** | First 50 lines + last 10 lines + function signature list | ~20–30% | File is in the project but not directly referenced |
| **Signature** | Only exported function/class names and their type signatures | ~5–8% | File exists in project but is architecturally adjacent, not task-relevant |
| **Omit** | Not included | 0% | File matches an ignore pattern or is outside the task's directory scope |

**Relevance scoring:** TF-IDF against the current prompt + semantic similarity using the bundled embedder. Score threshold configurable (default: 0.4 for Full, 0.2 for Summary, <0.2 for Signature).

User can override any file's tier by right-clicking the attachment in the context panel.

#### 7.17.4 Stage 4 — Conversation Pruner

Identifies low-value turns in the conversation history and replaces them with compressed summaries before injecting history into the next prompt.

**Low-value turn detection (any of these signals):**

- Turn contains only a tool call result with no reasoning
- Turn is a pure acknowledgment (“Got it”, “OK, working on it”, “Sure!”)
- Turn repeats content already present in a pinned directive or memory
- Turn is more than 20 turns ago AND has not been referenced since
- Turn cost: 0 (agent output with zero tokens generated — metadata-only events)

**Prune preview:** Before pruning, AgentLoft shows a diff-style preview:

```
Turns to compress (saves ~8,400 tokens):
  ✓ Turn 3: Tool result (npm install output) → “[npm install: 24 packages, 0 vulnerabilities]”
  ✓ Turn 7: Acknowledgment → [removed]
  ✓ Turns 9–14: File read results → “[Read 6 files in src/auth/]”
  ✗ Turn 15: Architecture decision [kept — contains reasoning]
```

**Restoration:** Pruned turns are never deleted — they exist in the full session history. “Expand compressed turn” button restores the full content on demand.

#### 7.17.5 Stage 5 — Output Density Controller

Controls the verbosity of agent responses using structured output templates per task type, reducing unnecessary explanation and padding in agent output.

**Task-type templates:**

| Task type | Default output format | Saves |
|-----------|----------------------|-------|
| **Debug** | Error + root cause + fix (no explanation of what the bug is if the user already described it) | 30–40% |
| **Refactor** | Diff only + one-line rationale per change | 40–50% |
| **Code Review** | Bullet list of issues with severity, no preamble | 25–35% |
| **Architecture** | Decision + tradeoffs + recommendation (narrative format, full verbosity) | 0% |
| **Search / Find** | File path + line number + relevant excerpt only | 50–60% |

**Density slider** in the status bar: `Concise ◄────────►  Detailed`. Overrides the task-type template for fine-grained control. User preference saved per project.

System prompt injection: The selected density template appends a brief instruction to the active system prompt. Not shown to users in the main chat — shown only in Settings → Token Pipeline → “Active density instruction”.

#### 7.17.6 Stage 6 — Token Budget Forecaster

Estimates the token cost of the assembled prompt *before* it is sent, giving users a chance to prune context or switch to a cheaper model.

**Pre-send estimation:**
- Counts tokens in the assembled prompt (using tiktoken or the provider's tokenizer)
- Estimates likely response size based on task type + historical response lengths for this user
- Shows: `Estimated cost: ~$0.08 (prompt: 18,400 tokens, est. response: 4,200 tokens)`

**Warning thresholds (configurable):**

| Threshold | Warning type | Default |
|-----------|-------------|---------|
| 5,000 tokens | Info badge in status bar | Always on |
| 10,000 tokens | Yellow banner before send | On |
| 25,000 tokens | Orange modal requiring confirmation | On |

**Post-send accuracy tracking:**
- After each response, records: forecasted tokens vs. actual tokens
- Running accuracy tracker improves estimation over time: stored locally per-user, never uploaded

**Model suggestion:** If the forecasted cost exceeds the user's session budget, the forecaster suggests a cheaper model: “This prompt costs $0.18 on Opus. Switch to Sonnet for ~$0.03?”

-----

### 7.18 3-Level Scope Inheritance System

> **Phase: v1** — Ships with the Settings panel. The scope badges and override indicators are pure UI layered on top of the existing config file structure. No new backend required — Global is `~/.agentloft/config.yaml`, Project is `.agentloft/config.yaml`, Session is in-memory. Implementation cost: one config merge function + badge rendering.

Every configurable element in AgentLoft — permissions, memory settings, CLI flags, tool rules, MCP servers, model profiles, skills, plugins, hooks — exists at three nested scopes. Lower scopes override higher scopes; deny rules propagate up.

**The three scopes:**

| Scope | Symbol | Config location | Who sets it |
|-------|--------|-----------------|-------------|
| **Global** | 🌐 | `~/.agentloft/config.yaml` | User (applies to all projects) |
| **Project** | 📁 | `.agentloft/config.yaml` | Team/project (checked into git) |
| **Session** | 🖥 | In-memory (not persisted by default) | User (overrides for this session only) |

**Inheritance rules:**
1. **Deny in any scope = denied** — if Global denies a tool, Project and Session cannot re-enable it
2. **Project overrides Global** for everything except deny rules
3. **Session overrides Project** for the duration of the session
4. **Session overrides reset on next session** unless “Save as project default” is clicked

#### 7.18.1 Scope UI — Tabs in Every Settings Panel

Every settings panel has three tabs: **🌐 Global / 📁 Project / 🖥 Session**. Settings edited in the active tab are saved to that scope's config file.

Visual indicators:
- **Scope badge** next to each setting value: shows which scope the current value comes from (e.g., a Project-level value shows `📁` even when viewing the Global tab)
- **Override indicator arrows**: a value overridden by a lower scope shows a downward arrow → with the overriding scope
- **”Compare with Global”** diff view: shows a visual diff of Project vs. Global settings with overrides highlighted
- **Lock mechanism**: a padlock icon on any setting locks it at the current scope — lower scopes cannot override it

#### 7.18.2 Bulk Scope Operations

- **”Promote to global”** — move a project-level setting to the global config
- **”Apply to project”** — save a session-level override as a project default
- **”Reset scope”** — revert a scope's settings to what it inherits from the scope above
- **”Import scope”** — import another project's `.agentloft/config.yaml` as a starting point

#### 7.18.3 Scope Examples

```yaml
# ~/.agentloft/config.yaml (Global)
permissions:
  bash: ask                    # 🌐 ask before running bash globally
  write_files: allow           # 🌐 allow writes globally
memory:
  auto_extract: true           # 🌐 extract memories after sessions

# .agentloft/config.yaml (Project — overrides Global)
permissions:
  bash: allow                  # 📁 allow bash in this project (overrides global “ask”)
  write_files: ask             # 📁 ask before writes in this project

# Session (in-memory — overrides Project)
permissions:
  bash: deny                   # 🖥 deny bash for this session (exploratory run)
```

-----

### 7.19 Crash Recovery & Session Autosave

> **Phase: v1** (§7.19.1 Intentional close + §7.19.2 Crash/power loss — autosave loop + `shutdown_complete` marker is ~1 day of implementation; critical for user trust) | **v1.1** (§7.19.3 OS restart signal handling — platform-specific per OS, add after v1 is stable) | **v1.1** (§7.19.4 Agent crash auto-restart — requires stable subprocess monitoring)

AgentLoft handles four distinct crash/exit scenarios so sessions are never lost.

**Autosave cadence:**
- **Continuous autosave:** Every 5 seconds, writes `messages.jsonl` with all new events
- **Deep save:** Every 2 minutes, writes full context snapshot (`context.json`, `panels.json`, `timeline.json`)

**Session state file structure:**

```
~/.agentloft/state/
  {session-id}/
    messages.jsonl     # full message history, append-only
    context.json       # context window state at last deep save
    panels.json        # UI panel layout and scroll positions
    timeline.json      # tool call timeline with timestamps
    shutdown_complete  # marker file: written on clean exit, absent on crash
```

#### 7.19.1 Scenario 1 — Intentional Close

User closes the window or uses File → Exit:

1. Autosave runs immediately (flush all pending events)
2. `shutdown_complete` marker file written
3. Session status set to `completed`

On next open: session listed in history with full cost/duration summary. “Resume” starts a new session with Smart Resume context injection (§7.4.9).

#### 7.19.2 Scenario 2 — Crash or Power Loss

Process exits unexpectedly (OOM, segfault, OS kill, power loss):

1. `shutdown_complete` marker is absent
2. On next launch, AgentLoft detects the incomplete session
3. Shows: **”Recover session?”** banner with session name + last event timestamp + estimated unsaved work
4. “Recover” option: restores all events from `messages.jsonl` up to last flush, restores panel positions, re-injects context at the last deep save point
5. “Discard” option: archives the session as-is and starts fresh

#### 7.19.3 Scenario 3 — OS Restart *(v1.1)*

AgentLoft intercepts OS shutdown signals (SIGTERM on Linux/macOS, WM_QUERYENDSESSION on Windows) and triggers a forced deep save:

- **500ms force-save**: writes all pending state in under 500ms before the OS kills the process
- Marks session as `suspended` (not completed, not crashed) — clean resume on next login
- Autosave interval tightened to 1 second when the OS indicates impending shutdown

#### 7.19.4 Scenario 4 — Agent Crash Mid-Task *(v1.1)*

The CLI subprocess crashes while a tool call is in flight:

1. AgentLoft detects the subprocess exit with a non-zero code
2. Shows: **”Agent crashed during [tool name]”** with the last known state of the tool call
3. **Auto-restart** with max 3 attempts in 5 minutes — attempts to resume the session with `--continue` flag
4. If auto-restart fails 3 times: shows a “Manual recovery” panel with the crashed tool call details and options to retry, skip, or start fresh

**OS signal handling:**
- `SIGTERM`: graceful shutdown (flush + write `shutdown_complete`)
- `SIGINT` (Ctrl+C): treated as intentional close (same as Scenario 1)
- `SIGHUP`: session suspension (same as Scenario 3, no banner on reopen)

-----

### 7.20 Agent Profiles

> **Phase: v1** — Profiles are YAML files + system prompt strings. Near-zero implementation cost, high marketing value. The Karpathy Engineer profile specifically is a launch hook — 149K stars worth of existing audience recognizes the name. Ships in v1.

Agent Profiles are pre-configured combinations of system prompt, behavior guidelines, tool permissions, context budget, and model settings that define how an agent approaches a task. Users can switch profiles per session or per project.

#### 7.20.1 Built-in Profiles

**Karpathy Engineer** (MIT license — based on multica-ai/karpathy-skills, 149,000+ stars)

Based on Andrej Karpathy's public coding guidelines. Four core principles:

1. **Think Before Coding** — The agent must reason through the task and write a brief plan before writing any code. Plan shown in a collapsible “Thinking” block.
2. **Simplicity First** — Prefer the simplest correct solution. Flag when a proposed solution adds unnecessary complexity; offer a simpler alternative.
3. **Surgical Changes** — Make the minimum change that solves the problem. Do not refactor surrounding code, rename variables, or “clean up” unless asked.
4. **Goal-Driven Execution** — Refuse to implement features that don't serve the stated goal. Ask for clarification rather than guessing intent.

Profile configuration:
```yaml
name: “Karpathy Engineer”
source: “multica-ai/karpathy-skills (MIT)”
system_prompt: |
  Think step by step before writing any code. Prefer simplicity.
  Make surgical, minimal changes. If unsure of the goal, ask first.
effort: medium
max_turns: 30
permission_mode: ask
context_injection:
  include_readme: true
  include_architecture: true
also_available_as: CLAUDE.md template (export to .claude/CLAUDE.md)
```

**Other built-in profiles:**

| Profile | Best for | Key behaviors |
|---------|----------|--------------|
| **Deep Work** | Long autonomous tasks | High effort, max turns 200, aggressive context pruning |
| **Code Review** | Reviewing PRs or diffs | Read-only permission mode, Output Density: bullet-list only |
| **Exploration** | Research / prototyping | Speculative mode on, branching encouraged, no write limits |
| **Safe Mode** | Production codebases | All writes require approval, protected paths enforced, budget cap $0.50 |
| **Overnight Run** | Unattended long tasks | Background mode, notifications on completion, auto-checkpoint every 20 turns |

#### 7.20.2 Custom Profiles

Users can create custom profiles:
- Start from a built-in profile as a base
- Edit system prompt inline (with syntax highlighting for common directives)
- “Export as CLAUDE.md / AGENTS.md / GEMINI.md” — saves the profile as a memory file the active CLI will read
- Share profiles as YAML files or publish to the Marketplace

-----

### 7.21 Zero-Waste Token Architecture

> **Phase: v1** (§7.21.1–7.21.4, §7.21.7) | **v1.1** (§7.21.5–7.21.6)
>
> AgentLoft's single most important infrastructure promise: **every token that reaches the model earns its place.** Community data across Claude Code, Codex CLI, and Gemini CLI shows that 35–60% of tokens in a typical agentic session are wasted on content the model either already has, does not need, or will never use. AgentLoft fixes this at the IPC interception layer — transparently, without requiring user configuration.
>
> Note: §7.17 Smart Token Pipeline (v1.1) handles prompt-level compression. §7.21 handles infrastructure-level waste — the sources that exist before a prompt is even composed.

**Documented waste sources this section closes:**

| Waste source | Typical overhead per session | Community reports | AgentLoft fix |
|---|---|---|---|
| MCP tool schemas injected every turn regardless of need | 18–25K tokens/message × every turn | GitHub #4804, #13579 | §7.21.1 On-Demand Schema Loading |
| Terminal output floods (npm test, cargo build, pytest) | 2–8K tokens per bash run | GitHub #9388 | §7.21.2 Terminal Output Filter |
| Agent re-reads files it just wrote (self-notification loop) | 2–10K tokens per write cycle | Community Discord | §7.21.3 Self-Edit Deduplication |
| Conversation history reprocessed exponentially (turn 30 = 31× turn 1 cost) | Compounds every turn | HN #47653082 | §7.21.4 Rolling State Checkpoint |
| Unused CLAUDE.md sections injected every session | 500–3K tokens/session | Community Discord | §7.21.5 Context File Auditor |
| Sequential re-prompting instead of batching (3–5 follow-up turns) | 3–5× cost multiplier per task | Reddit r/ClaudeAI | §7.21.6 Prompt Batcher |

**Combined expected savings: 40–65% token reduction vs. raw CLI, zero quality degradation.**

-----

#### 7.21.1 On-Demand MCP Schema Loading

> **Phase: v1** — The single largest identifiable waste source in the CLI ecosystem. Fixing it in v1 means every session from launch is efficient.

**The problem:**

When MCP tools are installed, their full JSON schemas are injected into the system prompt on every single turn — regardless of whether any MCP tool is needed for the current task. With 20 MCPs installed at ~500 tokens each, that is 10,000 tokens of schema overhead per turn. By turn 30 of a session, 300,000 tokens have been spent on tool schemas for a session that may never have called a single MCP tool.

**AgentLoft's fix — Lazy Schema Injection:**

MCP schemas live in a local schema registry (SQLite). Nothing is injected into context at session start. Schemas are injected on-demand only.

**Injection triggers (in priority order):**

1. **Task intent pre-classification** (local, no API call, <10ms): before sending the user's prompt, AgentLoft runs a lightweight local classifier against the prompt text to predict which MCP categories are likely needed. Categories: `filesystem`, `browser`, `database`, `git`, `search`, `custom`. Predicted schemas are pre-loaded before the turn.
2. **Agent explicit request**: the agent requests a tool by name in its response → its schema is injected on the *next* turn.
3. **User `@mcp:toolname` annotation**: user can force-inject any schema by mentioning it in their prompt.

**Session schema tracking:**

- Schema injection is session-scoped: once a schema is injected, it stays in context for the rest of the session (no repeated injection)
- Status bar chip: `MCPs: 3/24 active` — shows how many schemas are live vs. installed

**User control:** Settings → MCPs → Schema loading: `Auto (recommended)` / `Always inject all` / `Manual only`

**Savings example:**

```
Session: "Fix the bug in auth.ts" (no MCP tools needed)

Without lazy loading:  24 MCPs × 500 tokens × 30 turns = 360,000 tokens overhead
With lazy loading:     0 schemas injected (task classifier: no MCP needed)
Savings:               360,000 tokens  (~$1.08 at Sonnet pricing)
```

-----

#### 7.21.2 Terminal Output Filter

> **Phase: v1** — Pure string processing at the IPC layer. Zero model calls required. A single npm test run can produce 8,000+ tokens of output; AgentLoft compresses it to under 500 before it reaches the model.

**The problem:**

When the agent runs bash commands, the full stdout/stderr is injected into context as a tool result. Build tools, test runners, and package managers produce verbose output that the model rarely needs in full. A single `cargo build --release` on a large project can produce 15,000 tokens. The model needs: did it succeed, and if not, what failed.

**AgentLoft's filtering pipeline** (applied to all bash output before context injection):

```
Raw terminal output  →  Dedup repeated lines  →  Error/warning extraction
    →  Summary compression  →  Tail prioritization  →  Filtered output → model
```

**Compression modes (auto-selected by output pattern, overridable per-command):**

| Mode | What it sends to model | Typical compression |
|---|---|---|
| `summary` | "47 tests passed, 3 failed" + failure details only | 90–95% |
| `errors_only` | ERROR, WARN, FAILED lines only + last 10 lines | 80–90% |
| `tail_N` | Last N lines only (most recent state) | Variable |
| `smart` (default) | AgentLoft decides based on output size and content | 70–90% |
| `full` | No compression — user override | 0% |

**Per-command configuration** (`.agentloft/terminal_filter.yaml`):

The filter rule library ships with 100+ pre-calibrated command patterns, derived from and compatible with the [RTK (Rust Token Killer)](https://github.com/rtk-ai/rtk) open-source project (MIT). These patterns have been validated across real-world usage; AgentLoft ports them to its Rust IPC layer rather than building from scratch.

```yaml
terminal_filter:
  default_mode: smart
  max_lines_before_compress: 100
  rules:
    # — Test runners —
    - pattern: "npm test|jest|vitest|mocha"
      mode: summary          # "47 passed, 3 failed" + failure details only
    - pattern: "pytest|python -m pytest"
      mode: summary
    - pattern: "go test"
      mode: summary
    - pattern: "cargo test"
      mode: summary
    - pattern: "rspec|bundle exec rspec"
      mode: summary

    # — Build tools —
    - pattern: "cargo (build|check|clippy)"
      mode: errors_only      # strip "Compiling X v1.2.3" lines; keep errors/warnings
    - pattern: "tsc|npx tsc"
      mode: errors_only
    - pattern: "gradle (build|test|assemble)"
      mode: errors_only
    - pattern: "mvn (compile|test|package)"
      mode: errors_only
    - pattern: "make|cmake"
      mode: errors_only

    # — Package managers —
    - pattern: "npm install|yarn|pnpm install|bun install"
      mode: summary          # "added 247 packages" replaces full dependency tree
    - pattern: "pip install|pip3 install|uv pip install"
      mode: summary
    - pattern: "cargo add|cargo update"
      mode: summary

    # — Git —
    - pattern: "git log"
      mode: tail_20          # recent history; model rarely needs full log
    - pattern: "git diff --stat"
      mode: full             # always send stat lines; they are already compact
    - pattern: "git push"
      mode: result_only      # "ok main" or error — nothing else

    # — Docker / containers —
    - pattern: "docker (build|compose up|compose build)"
      mode: errors_only
    - pattern: "docker ps|docker images"
      mode: tail_30
    - pattern: "docker logs"
      mode: tail_50_plus_errors

    # — Kubernetes —
    - pattern: "kubectl (get|describe|apply|delete)"
      mode: smart
    - pattern: "kubectl logs"
      mode: tail_50_plus_errors
    - pattern: "helm (install|upgrade|status)"
      mode: errors_only

    # — Cloud CLIs —
    - pattern: "aws (s3|ec2|lambda|ecs|cloudformation)"
      mode: result_only      # JSON responses truncated to key fields
    - pattern: "gcloud|gsutil"
      mode: result_only
    - pattern: "az (group|vm|storage|webapp)"
      mode: result_only

    # — Linters / formatters —
    - pattern: "eslint|prettier|ruff|black|golangci-lint"
      mode: errors_only
```

**Full output recovery:**

When smart compression is applied, the full unfiltered output is saved to a local file (`~/.agentloft/tee/{session-id}/{timestamp}-{command}.log`). If the agent encounters an unexpected error and needs to see the raw output, it can request it: "Show me the full output of the last cargo build" — AgentLoft reads the tee file and injects the full content on demand. No information is ever discarded; it is just not injected automatically.

**User visibility (critical for trust):**

The terminal output card in the Cockpit shows the **full output** to the user. A badge on the card shows what was sent to the model:
```
✓ npm test completed   [Sent to model: 380 tokens ↓94% filtered]   [Show what was sent ▾]   [Full log →]
```

"Show what was sent" expands to show the filtered version. "Full log →" opens the tee file. "Override: send full output" forces the unfiltered version into context for the current run only. The user always has full control and full visibility; the model never silently receives less than the user expects.

-----

#### 7.21.3 Self-Edit Deduplication

> **Phase: v1** — SHA256 hash comparison at the IPC layer. Implementation is trivial; savings are 5,000–10,000 tokens per file write cycle.

**The problem:**

Some CLI backends (including Claude Code) emit a "file change notification" event after the agent writes a file. This notification includes the full file content — content the agent just wrote and already has in its working memory. AgentLoft's IPC layer intercepts these events and strips the redundant content before it reaches the context.

**Detection mechanism:**

- AgentLoft maintains an in-memory write registry: `{ filepath: SHA256(content) }` for every file written this session
- When an incoming context event contains file content (file_read, file_notification, tool_result with file content): compare the content hash to the write registry
- **Match**: content the agent already has → strip the file body, inject a lightweight reference token instead:
  ```
  [Reference: src/auth.ts — agent wrote this content at turn 18; content unchanged since write]
  ```
- **No match**: new or externally modified content → inject normally and update the registry

**Registry lifecycle:**

- Cleared on session end and session resume (fresh context each time)
- Invalidated per-file when the user externally edits a file (File Watcher notifies AgentLoft → the registry entry is cleared → next read injects fresh content)
- User can manually clear with `Settings → Context → "Reset file registry"`

**Savings:**

```
File write: src/auth.ts (300 lines × ~35 tokens/line = ~10,500 tokens)
Without dedup: file re-injected as self-notification → 10,500 tokens wasted
With dedup:    reference token (~25 tokens) injected instead
Savings per write cycle: ~10,475 tokens
Across a session with 8 file writes: ~84,000 tokens saved
```

-----

#### 7.21.4 Rolling "Where We Are" State Checkpoint

> **Phase: v1** — Replaces the §7.4.5 Smart Summarization approach with a richer state-preserving checkpoint. The difference: §7.4.5 summarizes *what happened*; §7.21.4 captures *where we are*. The model needs the latter to continue accurately.

**The problem:**

Standard conversation summarization produces a narrative of past events. For agentic work, what the model actually needs to continue is a precise state snapshot: what is done, what constraints apply, what files were modified, and what the next step is. Narrative summaries lose the technical precision that makes agentic continuation reliable.

Research from the Cline framework and A-Mem system shows that state-preserving checkpoints achieve 85–93% token reduction while maintaining *higher* task continuation accuracy than full-history replay.

**Checkpoint format (injected in place of compressed turns):**

```
=== agentloft STATE CHECKPOINT (compresses turns 1–24) ===
Task: Implement JWT authentication for /api/user endpoint

COMPLETED (do not redo):
  ✓ src/api/auth.ts — added validateJWT(token: string): User | null
  ✓ src/middleware/index.ts — JWT middleware registered on all /api/* routes
  ✓ Diagnosed issue: session tokens expire after 15min; refresh logic missing

ACTIVE CONSTRAINTS (from CLAUDE.md + user instructions this session):
  • PostgreSQL only — never SQLite
  • TypeScript strict mode — no implicit any
  • All /api/* routes require auth except /api/health and /api/auth/*

CURRENT STATE / OPEN ITEMS:
  • Token refresh endpoint does not exist yet (next step)
  • Tests for validateJWT() not yet written

FILES WRITTEN THIS SESSION (do not re-read unless content changed):
  • src/api/auth.ts [turn 18, hash: a3f7...]
  • src/middleware/index.ts [turn 22, hash: 9c2b...]

CONTEXT: You are continuing this session. The completed items above are done.
=== END STATE CHECKPOINT ===
```

**Trigger conditions (any one fires the checkpoint):**

- Every 15 turns (configurable: Settings → Context → Checkpoint interval)
- When conversation history exceeds 35% of the context budget
- User manually triggers with `⌘S` (Checkpoint shortcut, same as §7.19 autosave — extends to also trigger a state checkpoint)
- **PreCompact hook** — when the CLI backend signals it is about to auto-compact context (Claude Code emits a `pre_compact` event in stream-JSON; Codex emits `context_limit_warning`), AgentLoft intercepts this signal and fires a state checkpoint *before* the CLI discards history. This ensures the structured state snapshot is injected into the compacted context rather than relying on the CLI's own summarization — which produces a narrative, not a state snapshot. Inspired by Context Mode's PreCompact session hook pattern.

**State extraction:**

AgentLoft generates the checkpoint by analyzing the session's IPC event stream (tool calls, file writes, agent decisions) — not by making an additional LLM call. The checkpoint is assembled from structured data AgentLoft has already captured, not from asking the model to summarize itself. Zero additional tokens spent on checkpoint generation.

**Token cost:**

```
Conversation turns 1–24 (full history):   ~28,000 tokens
State checkpoint (replaces turns 1–24):      ~900 tokens
Net savings per checkpoint:               ~27,100 tokens (96.8%)
```

**User visibility:** A "Checkpoint created" event appears in the Cockpit timeline. Users can expand any checkpoint to read the full state snapshot. "Restore from checkpoint" rolls context back to any prior checkpoint (§7.19 integration).

-----

#### 7.21.5 Context File Auditor

> **Phase: v1.1** — Requires session usage data from v1 to compute accurate "last referenced" dates. Ships 6–8 weeks after v1 once usage patterns are established.

**The problem:**

CLAUDE.md, AGENTS.md, and system prompt files grow over time. Sections added for one sprint persist indefinitely. Every session injects the entire file regardless of relevance. Community reports show these files ballooning to 3,000+ tokens for projects with 6+ months of history — most of which is never referenced in any given session.

**The Auditor:**

AgentLoft tracks which CLAUDE.md sections the agent referenced or acted on during each session (derived from which directives appeared in tool calls, file choices, and constraint-following behavior — no additional model call required). After 10 sessions, the Auditor has enough signal to identify unused sections.

**Auditor panel** (Settings → Context → File Auditor):

```
CLAUDE.md Token Audit  [2,847 tokens injected every session → ~$4.20/month]
────────────────────────────────────────────────────────────────────────────
Section                       Tokens   Referenced    Status
─────────────────────────────────────────────────────────────
# Project Overview             180     Every session  ✅ Keep
# Tech Stack Constraints        340     Every session  ✅ Keep
# Database Rules (PostgreSQL)   220     4 days ago     ✅ Keep
# Testing Standards             190     2 days ago     ✅ Keep
# Deployment Procedures         410     47 days ago    ⚠️  Rarely used
# Legacy REST API Notes         520     Never          ❌ Unused (65 sessions)
# Design Token Reference        380     3 days ago     ✅ Keep

Potential savings if you archive flagged sections: 930 tokens/session
Monthly cost of flagged sections at current usage: $1.34/month
────────────────────────────────────────────────────────────────────────────
[Archive: Legacy REST API Notes]   [Archive: Deployment Procedures]   [Edit in place]
```

**Two operations — distinct, non-destructive:**

**Operation A — Archive unused sections** (the auditor panel above): removes sections the agent never uses from the active injection. The sections are not deleted — they move to `.agentloft/archived-context/` and remain restorable at any time.

**Operation B — Text Densification** ("Compress text"):

Inspired by the [Caveman](https://github.com/juliusbrussee/caveman) MIT skill's `/caveman-compress` command. Where Operation A removes whole sections, Operation B rewrites the *text of active sections* to be 30–50% shorter while preserving all semantic meaning. Filler phrases, verbose explanations, and redundant restatements are eliminated.

Example:

```
Before (78 tokens):
"This project uses PostgreSQL as its primary database. When writing any
 database-related code, you should always use PostgreSQL-compatible SQL
 syntax. Please do not suggest SQLite or any other database system as
 an alternative under any circumstances."

After (12 tokens):
"DB: PostgreSQL only. Never suggest SQLite or alternatives."
```

Triggering: Settings → Context → File Auditor → "Compress text" button, or `/optimize-context` slash command.

Process:
1. AgentLoft sends the active CLAUDE.md sections to the agent with the instruction: "Compress this to the minimum tokens that preserve all technical constraints and rules. Remove filler, consolidate redundancies, use terse imperative style."
2. A diff of the compressed version is shown — original vs. proposed
3. User reviews and approves section by section before any change is written
4. Savings estimate shown per section and total

Operations A and B are independent and composable: a user can archive stale sections first, then densify the remaining active text.

-----

#### 7.21.6 Prompt Batcher & Anti-Re-Prompt System

> **Phase: v1.1** — Behavioral intervention that requires usage data to tune the detection threshold. Ships with v1.1 after calibration from v1 session patterns.

**The problem:**

Community data shows a common pattern: users send 3–5 short sequential prompts that together form one coherent instruction. Each follow-up prompt forces the model to reprocess the full conversation history at the current (exponentially growing) cost. A user who sends 5 sequential instructions at turn 15 pays 5× more than a user who sends one batched prompt.

```
❌ Sequential pattern (5 turns at turn 15 each — ~5× cost):
Turn 15: "Make the button blue"          → model processes 15 turns of history
Turn 16: "Center it"                     → model processes 16 turns of history
Turn 17: "Increase font to 18px"         → model processes 17 turns of history
Turn 18: "Add loading state"             → model processes 18 turns of history
Turn 19: "Disable while loading"         → model processes 19 turns of history

✅ Batched equivalent (1 turn at turn 15):
Turn 15: "Update button: blue, centered, 18px, loading state, disabled while loading"
         → model processes 15 turns once. Total cost: ~20% of sequential approach.
```

**Re-prompt detection:**

AgentLoft detects this pattern: user sends a prompt within 45 seconds of the previous agent response completing, AND the prompt content is topically related to the previous turn. After 3 such sequential prompts, a non-blocking coaching tip appears:

```
💡 You've sent 3 quick follow-ups. Combining them into one prompt saves tokens.
   [Open Prompt Composer →]   [Dismiss — I'll continue this way]
```

The tip is non-blocking and non-judgmental. It appears at most twice per session. Users who dismiss it twice never see it again (stored in settings).

**Prompt Composer (`⌘⇧B`):**

Before sending any prompt, `⌘⇧B` opens the Prompt Composer — a structured form that helps users write complete, efficient prompts:

```
Prompt Composer
──────────────────────────────────────────────────────
What to do:    [Update the login button                    ]
Where:         [src/components/LoginButton.tsx              ]
Specifics:     [blue, centered, 18px font, loading state,   ]
               [disabled while loading                      ]
Don't touch:   [LoginForm.tsx, the auth logic               ]

Preview:
"Update the login button in src/components/LoginButton.tsx:
 blue color, centered, 18px font size, add a loading state
 and disable the button while loading. Do not modify
 LoginForm.tsx or any auth logic."

Token estimate: ~420 tokens for this turn  [↑ vs 5 sequential: saves ~1,800 tokens]

[Send]   [Back to chat]
```

**Instruction Queue** (for deliberate multi-step batching):

The chat input has a dropdown on the Send button: `Send now ▾` / `Add to queue`. Users can queue multiple instructions, then send all as one batched prompt. Queue persists within the session. "Send all" compresses the queue into one optimized prompt using the Prompt Composer format.

-----

#### 7.21.7 Zero-Waste Dashboard

> **Phase: v1** — Aggregates savings data from §7.21.1–7.21.4 and §7.0.11. Low implementation cost (reading existing counters), high marketing value (concrete proof of AgentLoft's efficiency claims).

Every waste-reduction feature AgentLoft runs logs its savings to a local counter store (SQLite, `agentloft_savings` table). The Zero-Waste Dashboard visualizes these savings — making AgentLoft's efficiency work tangible and shareable.

**Dashboard layout** (accessible from status bar → savings chip, or `⌘⇧T`):

```
AgentLoft Zero-Waste Report                             May 2026
──────────────────────────────────────────────────────────────────

THIS MONTH
  Tokens saved:     4,847,200 tokens
  Est. cost saved:       $14.54  (vs. raw CLI at same task volume)
  Savings rate:            63%   (tokens saved / tokens that would have been sent)
  Sessions this month:      94
  Avg savings/session:  51,566 tokens  (~$0.15)

BREAKDOWN BY FEATURE
  MCP lazy loading         2,100,000 tokens  41%  ████████████████████░░░░░
  Code-exec retrieval        560,000 tokens  11%  █████░░░░░░░░░░░░░░░░░░░░  (v2)
  State checkpoints          910,000 tokens  18%  ████████░░░░░░░░░░░░░░░░░
  Terminal output filter     820,000 tokens  16%  ███████░░░░░░░░░░░░░░░░░░
    ↳ per-command detail: npm test ↓94% | cargo build ↓87% | docker logs ↓79%
  Self-edit deduplication    640,000 tokens  12%  █████░░░░░░░░░░░░░░░░░░░░
  Raw file mode (§7.0.11)    377,200 tokens   7%  ███░░░░░░░░░░░░░░░░░░░░░░

ALL TIME
  Total tokens saved:  31,200,000 tokens  (~$93.60)

[Export as image]   [Export as markdown]   [View by session]
```

**Status bar live chip** (always visible):

```
💚 61% saved  $0.09 saved this session
```

Updates in real time as the pipeline runs. Clicking expands the full dashboard.

**Shareable card** ("Export as image"):

Generates a clean PNG card:
```
┌───────────────────────────────────────────┐
│  AgentLoft saved me                     │
│                                           │
│  4.8M tokens this month                  │
│  ($14.54 vs raw Claude Code)              │
│                                           │
│  63% fewer tokens. Same results.          │
│  agentloft.dev                          │
└───────────────────────────────────────────┘
```

Intended for Twitter/X, Discord, GitHub Discussions — organic social proof from users who see their own savings.

-----

#### 7.21.8 Code-Execution-as-Retrieval

> **Phase: v2** — Requires the Docker Sandbox infrastructure (§15.4.5), which is v2. The paradigm itself is specced here so the IPC protocol and MCP interface are designed with it in mind from v1.

**The paradigm (from [Context Mode](https://github.com/mksglu/context-mode)):**

Current approach (§7.17.3 Smart File Loader): decide how much of a file to inject — Full / Summary / Signature / Omit. Even "Signature" mode still injects content.

Code-Execution-as-Retrieval: instead of injecting raw content at all, AgentLoft gives the agent a tool to write a short extraction script. The script runs in a sandboxed subprocess and returns only stdout — exactly the data the agent asked for.

**Why this is transformational:**

| Scenario | Current injection | Code-execution approach | Reduction |
|---|---|---|---|
| Read a 56KB Playwright DOM snapshot | 56,000 bytes (~14,000 tokens) | Agent writes 3-line script → returns 2 matching elements (299 bytes) | **99.5%** |
| Read 59KB GitHub issues JSON | 15,000 tokens | Agent writes filter script → 8 relevant issues returned (1,100 bytes) | **99.3%** |
| Scan 200-file project for imports | 200 file reads × 3,000 tokens avg | Agent writes AST query → returns 12 relevant files (800 bytes) | **98.7%** |
| Read large log file for errors | 40,000 tokens | Agent writes grep pattern → 23 matching lines (400 bytes) | **99.0%** |

Instead of 10 tool calls reading raw files, the agent makes 1 call that returns exactly what it needs.

**AgentLoft implementation:**

The `vs_execute` MCP tool (exposed by AgentLoft to the active agent):

```json
{
  "name": "vs_execute",
  "description": "Run a short script to extract specific data. Use instead of reading large files raw. Returns only stdout.",
  "inputSchema": {
    "code": "string — script to run (Python, JS, bash, or 9 other languages)",
    "language": "python | javascript | bash | ruby | go | rust | ...",
    "timeout_ms": "number — default 5000, max 30000"
  }
}
```

The agent uses this naturally:

```python
# Agent writes this when it needs to find all API routes:
import ast, os
routes = []
for root, _, files in os.walk("src"):
    for f in files:
        if f.endswith(".ts"):
            content = open(os.path.join(root, f)).read()
            if "@Get(" in content or "@Post(" in content:
                routes.append(f)
print("\n".join(routes))
```

AgentLoft runs this in the Docker sandbox (§15.4.5), captures stdout (12 filenames), injects those 12 filenames into context. The 400 source files that don't have routes are never read.

**Sandbox constraints (same as §15.4.5):**
- Network: blocked by default (no exfiltration)
- Filesystem: read-only access to the project directory; no writes
- CPU: 2s wall-clock timeout by default
- No shell injection — code runs in subprocess, not eval

**Marketplace MCP:**

Context Mode (ELv2, not embeddable in MIT core) is surfaced in the AgentLoft MCP Marketplace as a featured partner MCP for users who want to use the original Context Mode implementation instead of AgentLoft's native `vs_execute`. Both work; the native version is MIT and ships with v2.

**Session persistence hooks (PreCompact integration with §7.21.4):**

When `vs_execute` runs successfully, AgentLoft logs the extraction result in the session state. When a PreCompact checkpoint fires (§7.21.4), the extracted data is included in the state snapshot rather than requiring the script to run again — the extraction result is preserved across context compaction.

-----

## 8. Release Roadmap

> **Naming:** This roadmap uses the same v1/v1.1/v2/v3 naming as the §7 Feature Phase Map. Every deliverable listed here maps directly to a section in §7 tagged with the same phase. If a feature is not in the Phase Map as v1, it is not in v1 here.

-----

### v1 — Launch: The GUI Wrapper (Month 1–4)

**Goal:** The product that earns the first GitHub stars. Proves the core thesis: a premium GUI for the three CLI agents, with memory and cost visibility that none of the first-party tools ship. Every deliverable is directly derived from §7 sections tagged `v1`.

**What this is:** A complete, polished GUI wrapper. Not a toy. Not an alpha. A tool that a Claude Code power user installs, opens on their existing project, and never goes back to the terminal for.

**Deliverables — CLI Parity (§7.0):**
- Tauri 2 + React 19 app shell, macOS + Windows + Linux builds via GitHub Actions
- Claude Code + OpenAI Codex CLI + Antigravity CLI process spawning (stream-JSON primary, PTY fallback)
- Universal Command Palette `⌘K` — all slash commands from all three CLIs in one searchable panel
- Full CLI flags → Settings Panel mapping with **Visual Flag Builder** (live raw command preview, incompatible flag detection, flag presets)
- Config file visual editors: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.claude/settings.json`, MCP configs, custom commands, skills
- All output event types rendered as visual components (tool call cards, diff cards, permission modals, cost ticker, thinking blocks)
- **Raw File Mode** toggle per attachment — strips line numbers, ~70% token overhead reduction
- Session continuity via `--continue`/`--resume` flags; AgentLoft never maintains a parallel session store

**Deliverables — UI Shell (§7.1.1–7.1.7):**
- Bento grid layout (200px file panel | 1fr chat | 240px cockpit), 1px gaps, glassmorphism design system (§20)
- Full status bar: model, effort, token usage, cost, cache hit rate, memory load, active MCPs, git branch
- Monaco diff renderer with per-hunk accept/reject/edit + "Accept All / Reject All"
- Floating mini terminal `⌘\` with full PTY support
- Keyboard navigation, ARIA labels, high contrast mode, font size scaling, reduced motion

**Deliverables — Multi-Model Engine (§7.2):**
- All supported backends: Claude Code, Codex CLI, Antigravity CLI, Ollama, Groq, Together AI, any OpenAI-compatible endpoint
- Model profiles (YAML, project-portable), model router (rule builder UI), side-by-side model comparison

**Deliverables — Memory (§7.3.1–7.3.6, §7.3.3a):**
- LanceDB persistent memory: project + user + agent + org scopes
- **Memory Bootstrap on first project open** (§7.3.3a) — reads existing CLAUDE.md, AGENTS.md, package.json/Cargo.toml/go.mod/pyproject.toml/README.md; pre-populates project memory so agent knows conventions on turn 1; non-blocking background scan; CLAUDE.md imported at 0.95 confidence
- Auto-extraction after sessions — **non-blocking**: memories auto-accepted, non-blocking toast ("12 memories extracted — review when ready"), 24-hour review window; blocking review optional via Settings
- Semantic injection on session start (top-K retrieval, configurable 4,000-token budget)
- Memory Browser, Memory Editor, Memory Diff, `/forget` command, Conflict Detector
- Memory confidence scoring (0.0–1.0), freshness decay, user verification flag

**Deliverables — Context Engine (§7.4):**
- Context Budget System with visual allocation bar
- Context Position Monitor — dead zone detection, preemptive compression trigger
- Content Pinning (always-in-context regardless of compression)
- Directive Heartbeat — auto re-injects key instructions every N turns
- Smart Summarization (agent-powered or rule-based)
- Context Health Score shown in status bar (0–100, color-coded)
- **Smart Resume** (§7.4.9) — Graph Summary / Full History / Fresh Start options with token cost comparison

**Deliverables — Endpoints & MCP (§7.5 + §7.6 Skills + MCP Hub):**
- Claude Code, Codex, Antigravity full integration (PTY + stream-JSON, all features)
- Universal endpoint layer with pre-configured templates (Ollama, LM Studio, Groq, Together, Fireworks, Bedrock, Azure)
- Connection profiles (YAML, project-portable)
- MCP native support: install, configure, health dashboard, permission manager, logs
- Skills Marketplace (browse, install, local publish); MCP Hub (curated registry, one-click install, security scan badge)
- Static CDN registry backend (GitHub Releases); no server infrastructure required

**Deliverables — Auto-Detect on Existing Projects (§7.7.3):**
- Scans `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, etc.
- Generates `.agentloft/context.yaml`, seeds project memory, generates `CLAUDE.md` stub
- Suggests MCPs based on detected integrations (detects Prisma → suggests database MCP)

**Deliverables — Agent Cockpit core (§7.8.1–7.8.3, §7.8.8 basic):**
- Tool Call Feed — real-time panel, every agent action with timing + outcome
- Intent Gap Detector — flags when agent output diverges from the stated task
- Blast Radius Preview — shows affected files and estimated impact before write executes
- **Rollback System — basic** (§7.8.8): auto-checkpoint before every agent write batch; one-click "Restore last" in cockpit status bar; full checkpoint list via `⌘Z` dropdown; stored in `.agentloft/snapshots/` with no git dependency

**Deliverables — Safety core (§7.9.1–7.9.2):**
- Permission System — tool-call interception for all write/bash/network/MCP actions; configurable per-action defaults
- Regression Shield — runs test suite before/after agent writes; "Regression Detected" panel with rollback option

**Deliverables — Cost Intelligence (§7.10):**
- Real-time cost ticker (per-token, per-session, all-time by project)
- Cost Anomaly Detector with 3x spike alerts
- Budget caps (session hard cap, task soft cap, daily, monthly)
- Model cost comparison ("same task on Gemini Flash: $0.04 vs $0.41 on Opus")
- Unified quota dashboard for all connected providers
- **Cost Calm Mode** (§7.10.9) — hides per-turn cost display, shows session total only; togglable from status bar; auto-enabled in Guided expertise mode

**Deliverables — Preview (§7.11.1 basic):**
- Embedded Chromium webview — opens dev server URL, live hot-reload, DevTools access
- Console Error Monitor — captures browser console errors, surfaces in cockpit feed

**Deliverables — Session (§7.15.1 recording + §7.15.3 JSON/markdown export + §7.15.4 search):**
- Full session recording (every message, tool call, file change, timing, cost)
- Export: JSON (full structured) + markdown (readable walkthrough)
- Full-text session search across all past sessions (SQLite FTS5)

**Deliverables — Security, Scope, Crash, Profiles (§7.16, §7.18, §7.19.1–7.19.2, §7.20):**
- Local-first architecture — all data on disk, zero AgentLoft server calls
- Secret Scanner — scans outgoing content for API keys, tokens, certificates before send
- Network Audit log — every API call logged with model, endpoint, token count, cost
- OS Keychain credential storage; `.agentloftignore` for files never sent to any model
- 3-Level Scope Inheritance — Global/Project/Session tabs in every Settings panel with scope badges
- Crash Recovery Scenarios 1–2 — 5-second autosave + `shutdown_complete` marker detection + "Recover session?" banner
- **Agent Profiles** — Karpathy Engineer (MIT), Deep Work, Code Review, Exploration, Safe Mode, Overnight Run built-in; custom profile editor + CLAUDE.md export

**Deliverables — Rate Limiting, Onboarding & UX Completeness (§7.0.12, §7.0.13, §7.1.9, §7.8.11, §7.10.8, §7.15.6):**
- **Rate Limit Intelligence & Auto-Fallback** (§7.0.12) — per-provider detection (Claude 429/overloaded_error, Codex RateLimitError, Antigravity RESOURCE_EXHAUSTED); Rate Limit Card with live countdown; auto-fallback chain through Connection Profile (primary → secondary → tertiary → local); retry queue (max 10 turns); visual auto-fallback notification; **quality-warning banner when fallback is a weaker tier** ("Running on fallback model — responses may differ in quality")
- **Model Pricing Database** (§7.10.8) — powers cost intelligence with accurate per-model pricing; priority stack: provider-reported stream-JSON → provider API → bundled `prices.json`; 7-day update cache; patches without app release
- **First-Run Onboarding Wizard** (§7.0.13) — 5 steps: CLI auto-detection with **in-app one-click install** (Homebrew/winget/apt commands run inside the wizard, no browser required), API key setup via OS keychain, first project open, pre-populated first prompt by detected project type, safe-mode first turn; tips carousel; goal: first successful agent turn within 3 minutes of install
- **In-App Help System** (§7.1.9) — panel `?` icons with plain-English popovers; first-visit coaching tooltips for every major panel; Help Center (F1, offline-capable, embedded); "What is this?" right-click on any UI element; Expertise Toggle (Guided/Standard/Expert) adjusts verbosity and metric labels across the whole app
- **End-of-Task Summary Card** (§7.8.11) — fires automatically on task completion; Simple Mode (plain-English file impact summary for newcomers); Detailed Mode (full metrics for experts); memory extraction integrated inline; Export as markdown; accessible from session history after dismissal
- **Session Organization** (§7.15.6) — folders (one-level nested, drag-drop sessions); color tags; smart auto-tags (has-error/high-cost/long/branched); pin up to 8 sessions; archive with 30-day auto-suggest; filter bar (model/date/cost/tags); right-click context menu; bulk operations (tag/move/archive/export/delete)

**Deliverables — Zero-Waste Token Architecture (§7.21.1–7.21.4, §7.21.7):**
- **On-Demand MCP Schema Loading** (§7.21.1) — local task intent classifier (<10ms) predicts needed MCP categories; lazy-injects only relevant schemas per turn; status bar shows `MCPs: 3/24 active`; closes 18–25K tokens/message overhead for unused schemas
- **Terminal Output Filter** (§7.21.2) — CLI output (npm test, cargo build, pytest, etc.) compressed via dedup → error extraction → summary → tail pipeline before context injection; 70–95% reduction; 100+ RTK-derived per-command rules across 7 categories; full output teed to `~/.agentloft/tee/{session-id}/{timestamp}-{command}.log` for on-demand recovery; "Full log →" button on terminal card
- **Self-Edit Deduplication** (§7.21.3) — SHA256 write registry at IPC layer strips agent self-notification re-reads; ~10K tokens saved per write cycle
- **Rolling State Checkpoint** (§7.21.4) — structured state snapshot (completed/constraints/open-items/file-hashes) replaces narrative summarization; 96.8% compression vs. full history with higher continuation accuracy; assembled from IPC event stream, zero additional LLM calls; fires on turn threshold, budget threshold, manual trigger, and PreCompact hook (intercepts CLI's `pre_compact` / `context_limit_warning` signal — fires before history is discarded)
- **Zero-Waste Dashboard** (§7.21.7) — live savings chip in status bar (`💚 63% saved`); per-feature breakdown; all-time stats across sessions; shareable PNG export card; expected combined savings: 40–65% token reduction vs. raw CLI

**Launch strategy:** Ship to r/ClaudeAI, r/LocalLLaMA, Hacker News Show HN, and X/Twitter with a 90-second demo video. Lead with three bullets: "Wraps Claude Code + Codex + Antigravity. Memory across sessions. See every dollar spent, every file touched." The Karpathy Engineer profile is a launch hook — post about it directly to the Karpathy community.

**Star target:** 3,000 at launch week → **15,000–25,000** by end of v1 cycle
*(Opcode reached 21.9k with Claude-only + no memory; AgentLoft ships with multi-CLI + memory + cost intelligence from day one)*

-----

### v1.1 — Polish: Advanced Workbench (Month 5–6)

**Goal:** Fill in the advanced features of every panel already present in v1. No new panels — just making each panel smarter. Plus the Smart Token Pipeline, which needs v1 IPC stability before layering on top.

**Deliverables — Advanced Cockpit (§7.8.4–7.8.10):**
- Speculation Mode (read-only planning pass before execution)
- Surgical Mode (blocks unasked changes at tool-call level)
- Assumption Logger (sidebar captures every agent assumption)
- Change Scope Meter (asked vs. actual change ratio)
- Rollback System — advanced (§7.8.8): timeline view of all checkpoints; preview diff vs current state; branch from checkpoint ("try a different approach from this point")
- Repetition Detector (flags when agent re-implements existing code)
- **Narrative / Semantic View** (Log ↔ Narrative toggle; 1-2 sentence summaries per tool call; session summary export)

**Deliverables — Advanced Safety (§7.9.3–7.9.5):**
- Drift Guard (git hook + GitHub Actions version for PR-level gates)
- Protected Zones (`.agentloft/context.yaml` `protected_paths` config, blocked at tool-call intercept layer)
- Prompt Decay Monitor (instruction adherence score in status bar; red alert below 50%)

**Deliverables — Smart Token Pipeline (§7.17):**
- Stage 1: Prompt Minifier (Off/Conservative/Balanced/Aggressive modes, before/after token counter)
- Stage 2: Context Deduplicator (SHA256 hash registry, semantic similarity dedup)
- Stage 3: Smart File Loader (Full/Summary/Signature/Omit tiers, TF-IDF relevance scoring)
- Stage 4: Conversation Pruner (low-value turn detection, prune preview, turn restoration)
- Stage 5: Output Density Controller (task-type templates, density slider in status bar)
- Stage 6: Token Budget Forecaster (pre-send estimation, 5K/10K/25K warning thresholds, accuracy tracker)
- "Send raw" bypass always available; all changes shown before send

**Deliverables — Plugins (§7.6.3 Web Worker):**
- Plugin system (Web Worker sandbox, postMessage IPC, no direct fs/network)
- Plugin manifest with declared permissions; Plugin API v1 (session read, UI injection, hooks)
- Plugin Manager: install, enable/disable, permissions review
- *(WASM sandbox upgrade deferred to v2)*

**Deliverables — Advanced Session + UI (§7.1.8, §7.6.4 MCP Composer):**
- **Side Chat** — right-click any message → branch mini-conversation; reads context, doesn’t write to history; "Promote to session" button
- **MCP Composer** — visual tool to chain MCPs (drag-drop canvas, connect outputs, export as named workflow)

**Deliverables — Gap Closers:**
- **[GAP CLOSER §15.4.1] Speed Engine** — zero-copy streaming, <50ms IPC overhead, virtualized message list, latency monitor in status bar
- **[GAP CLOSER §15.4.2] Git-Native Workflow** — auto-commit after agent write batch, branch-per-task option, PR draft generator (title + body from session narrative), git timeline panel
- **[GAP CLOSER §15.4.8] Agent Modes** — Architect/Builder/Debugger/Reviewer/Refactor built-in + custom mode builder (extends Agent Profiles with mode-specific tool permissions)
- **[GAP CLOSER §15.4.10] Large Codebase Performance** — incremental ONNX indexing, streaming context injection, lazy file tree loading (handles repos >100K files)

**Crash Recovery advanced (§7.19.3–7.19.4):**
- OS Restart signal handling (SIGTERM/WM_QUERYENDSESSION → 500ms force-save)
- Agent crash auto-restart (detects subprocess exit, auto-resumes with `--continue`, max 3 attempts)

**Star target:** **25,000–45,000**
*(v1.1’s Speed Engine + git workflow directly targets the Aider/Cline audience — 100k+ combined stars worth of users who already know what they want from a CLI wrapper)*

-----

### v2 — Platform Expansion (Month 7–12)

**Goal:** Layer the advanced intelligence features on top of a proven v1 foundation. Graphify, Agentmemory, multi-agent, and visual testing all require stable v1 IPC, session model, and memory system before they can be built correctly.

**Deliverables — Advanced Memory (§7.3.7–7.3.8):**
- **Graphify Knowledge Graph** — AST/tree-sitter parsing, `graphify-out/` directory, built-in Obsidian vault viewer, Graph Explorer panel, MCP server auto-start per session, live filesystem watcher, bundled portable Python runtime
- **Agentmemory 4-Tier** (Working/Episodic/Semantic/Procedural) — automatic compression, hybrid retrieval (BM25 + dense + graph), ~1,900 token injection, Memory Tier Browser panel

**Deliverables — Advanced Visual Testing (§7.11.2–7.11.5):**
- Screenshot diff (before/after capture on every agent UI write)
- Auto-Interaction Tester (Playwright — clicks every button, fills forms, reports errors)
- Visual Regression Guard (opt-in pixel diff baseline system)
- Console Error auto-send to agent

**Deliverables — Multi-Agent (§7.13 basic):**
- 2-agent parallel sessions (Architect + Builder roles)
- Shared scratchpad (`scratchpad.md`, `task_queue.json`, `contract.yaml`)
- Swimlane UI — per-agent lane with event timeline and dependency arrows
- File lock system (prevents simultaneous write conflicts)

**Deliverables — Session Branching (§7.15.2 + §7.15.5):**
- "Branch from here" — new session with context rewound to branch point
- **Fork Tree Visualization** — sidebar tree showing branch hierarchy, cost per branch, compare/merge controls

**Deliverables — Project Setup (§7.7.1–7.7.2):**
- Project Wizard — plain English → stack detection → scaffold + configure
- Project Template Library (10 templates: SaaS, REST API, CLI tool, Mobile, Browser ext, ML project, etc.)
- WASM sandbox upgrade for Plugins (wasmtime/wazero, 100ms/1MB/100-instruction hard limits)

**Deliverables — Gap Closers:**
- **[GAP CLOSER §15.4.3] Background Agent Mode** — tray icon, background session queue, mobile push notifications via ntfy/Pushover, safety constraints for unattended runs
- **[GAP CLOSER §15.4.4] LSP Intelligence Layer** — bundled language servers (TS, Python, Rust, Go), LSP-augmented context injection (diagnostics, symbol lookup, type info injected into agent prompt)
- **[GAP CLOSER §15.4.5] Docker Sandbox Mode** — optional containerized execution (rootless Docker/Podman), snapshot/restore per session, resource limits, multi-version testing
- **[GAP CLOSER §15.4.6] GitHub & GitLab Native Integration** — issue browser, PR review mode, CI headless runner, GitHub Actions template
- **[GAP CLOSER §15.4.7] VS Code Companion Extension** — memory-aware autocomplete, inline agent invoke, diff accept from VS Code
- **[GAP CLOSER §15.4.11] Issue-to-PR Autonomous Pipeline** — batch mode (queue issues overnight), memory-aware implementation, auto PR with cost + test metadata
- **[GAP CLOSER §15.4.13] Antigravity SDK Integration** — Managed Agents SDK path as alternative to PTY spawning (evaluated vs. stream-JSON; ship whichever is more stable)
- **[GAP CLOSER §15.4.14] Appshots / Screenshot-to-Agent** — drag screenshot into chat, annotate regions, send to any multimodal model
- **[GAP CLOSER §15.4.17] ACP Compatibility** — expose AgentLoft as an ACP server so Zed/JetBrains can connect to it

**Deliverables — Zero-Waste Token Architecture v2 (§7.21.8):**
- **Code-Execution-as-Retrieval** (`vs_execute` MCP tool) — agent writes short extraction scripts (Python, JS, bash, and 9 other languages) instead of reading large raw files; scripts execute in the Docker Sandbox (§15.4.5, same v2 prerequisite); only stdout returned to context; 94–99% token reduction on large data sources; session persistence of extraction results in the Rolling State Checkpoint; Context Mode (ELv2) surfaced as featured Marketplace MCP for users who prefer the original implementation

**Star target:** **45,000–70,000**
*(Graphify + multi-agent + Docker sandbox + GitHub integration closes the gap on OpenHands (74k), which is the benchmark for "platform" vs. "tool" positioning)*

-----

### v3 — SaaS Layer: Team & Cloud (Month 13–18)

**Goal:** First revenue. AgentLoft Cloud goes live. Flows ships as the automation platform. Multi-agent expands to N agents. Team Mode adds the collaboration infrastructure.

**Prerequisites:** AgentLoft Cloud backend infrastructure exists and is self-sustaining. Do not build Team Mode speculatively — v1 and v2 must generate enough open-source traction to justify the backend investment.

**Deliverables — Workflow Automation (§7.12):**
- Flows node editor (visual pipeline builder: Prompt, Skill, Condition, Loop, Bash, MCP Call, File, Notify, Checkpoint, Human, Webhook nodes)
- `.flow.yaml` format (shareable via Marketplace)
- Flow Scheduler (git commit, file watch, cron, webhook triggers)
- Flow Marketplace category (community-published flows)

**Deliverables — Team Mode & Cloud (§7.14):**
- AgentLoft Cloud launch (paid SaaS, org accounts)
- Shared org memory (sync with conflict resolution, role-based write access, audit log)
- Session sharing (live read-only mode, "Request control" for pair programming, async comment on any agent action)
- Team Marketplace shelf (private org content with admin controls)
- Audit log (immutable append-only, CSV/JSON export, SOC 2 compatible structure)
- AI change attribution in git (`git log` metadata: model, session ID, cost, tests passing)

**Deliverables — Advanced Multi-Agent (§7.13 full):**
- N-agent parallel (full role set: Architect, Builder, Tester, Reviewer, Documenter)
- Task Decomposer (high-level goal → parallel task breakdown with user approval)
- Conflict Resolution (semantic merge attempt; lock system; user arbitration UI)
- Swimlane UI (full: inter-agent dependency arrows, pause/resume individual agents)

**Deliverables — Marketplace Revenue (§7.6.6):**
- Premium skills/plugins (one-time purchase or subscription)
- 70/30 split (creator/platform); Stripe Connect integration
- MCP Hub premium tier

**Deliverables — Gap Closers:**
- **[GAP CLOSER §15.4.9] AgentLoft Server** — Docker-composable self-hosted backend, SSO (Okta/Azure AD/SAML), RBAC, data residency control, air-gap enterprise deployment, admin dashboards
- **[GAP CLOSER §15.4.12] Live Co-Pilot Mode** — real-time shared session (both parties can message agent simultaneously), require-both-accept diff mode, cost attribution per user
- JetBrains companion extension
- Mobile companion app (iOS + Android) — session monitor, push notifications, approve/deny permission requests from phone

**Star target:** **70,000–100,000 stars + $100k MRR**
*(Cloud + live co-pilot + enterprise server opens B2B revenue. Cline’s $32M Series A at ~60k stars sets the benchmark: platform valuations in this space scale with GitHub presence, not revenue multiples.)*

-----

### Version Summary Table

| Release | Theme | Key §7 sections shipping | Gaps closed | Est. Stars | Timeline |
|---------|-------|--------------------------|-------------|------------|----------|
| **v1.0** | GUI wrapper launch — multi-CLI, memory, cost | 7.0, 7.1.1–7, 7.2, 7.3.1–6, 7.4, 7.5, 7.6 Skills+MCP, 7.7.3, 7.8.1–3, 7.9.1–2, 7.10, 7.11.1, 7.15.1+2+4, 7.16, 7.18, 7.19.1–2, 7.20 | Opcode (no memory, Claude-only); all first-party GUIs (single-vendor) | **15,000–25,000** | Month 4 |
| **v1.1** | Advanced workbench — token pipeline, git, speed | 7.1.8, 7.6.3, 7.6.4 Composer, 7.8.4–10, 7.9.3–5, 7.17, 7.19.3–4 + §15.4.1/2/8/10 | Aider + Cline (git, safety, observability); speed benchmarks | **25,000–45,000** | Month 6 |
| **v2.0** | Platform — Graphify, multi-agent, visual testing | 7.3.7–8, 7.7.1–2, 7.11.2–5, 7.13, 7.15.2–5 + §15.4.3/4/5/6/7/11/13/14/17 | OpenHands (sandbox, multi-agent); Cursor (LSP, background); GitHub (issue-to-PR) | **45,000–70,000** | Month 12 |
| **v3.0** | SaaS — Cloud, Flows, Team Mode, revenue | 7.12, 7.14 + §15.4.9/12 | Tabby (self-hosted); Devin (autonomous pipelines); first-party team features | **70,000–100,000 + $100k MRR** | Month 18 |

-----

## 9. Technical Architecture

### 9.1 Tauri Application Structure

```
agentloft/
├── src-tauri/                    # Rust backend
│   ├── src/
│   │   ├── main.rs               # App entry point
│   │   ├── commands/             # Tauri command handlers
│   │   │   ├── session.rs        # Session CRUD
│   │   │   ├── memory.rs         # Memory read/write
│   │   │   ├── process.rs        # CLI process management
│   │   │   ├── context.rs        # Context engine
│   │   │   ├── cost.rs           # Cost tracking
│   │   │   └── security.rs       # Secret scanning, permissions
│   │   ├── process/              # CLI process orchestration
│   │   │   ├── claude_code.rs
│   │   │   ├── codex.rs
│   │   │   ├── gemini.rs
│   │   │   └── generic.rs        # OpenAI-compatible
│   │   ├── memory/               # LanceDB integration
│   │   │   ├── store.rs
│   │   │   ├── embeddings.rs     # ONNX embedding model
│   │   │   └── retrieval.rs
│   │   ├── context/              # Context engine
│   │   │   ├── budget.rs
│   │   │   ├── health.rs
│   │   │   ├── injection.rs
│   │   │   └── pinning.rs
│   │   ├── intercept/            # Tool call interception
│   │   │   ├── proxy.rs          # Local MitM for tool calls
│   │   │   ├── permission.rs
│   │   │   └── blast_radius.rs
│   │   └── db/                   # SQLite
│   │       ├── schema.sql
│   │       └── migrations/
│   └── Cargo.toml
│
├── src/                          # React frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── chat/                 # Chat interface
│   │   ├── cockpit/              # Agent cockpit panels
│   │   ├── context/              # Context health UI
│   │   ├── diff/                 # File diff renderer
│   │   ├── marketplace/          # Marketplace UI
│   │   ├── memory/               # Memory browser
│   │   ├── preview/              # Embedded browser preview
│   │   └── shared/               # Common components
│   ├── hooks/
│   ├── stores/                   # Zustand stores
│   └── lib/
│       ├── tauri.ts              # Tauri IPC wrappers
│       ├── models.ts             # Model configuration
│       └── types.ts
│
└── marketplace/                  # Marketplace registry
    ├── registry.json
    ├── skills/
    ├── plugins/
    └── mcps/
```

### 9.2 Process Orchestration Architecture

```
┌──────────────────────────────────────────────────┐
│              ProcessOrchestrator (Rust)           │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │              PTY Manager                     │ │
│  │  Spawns: claude / codex / gemini as PTY      │ │
│  │  Bidirectional I/O stream                    │ │
│  └──────────────────┬──────────────────────────┘ │
│                     │                             │
│  ┌──────────────────▼──────────────────────────┐ │
│  │           Output Parser                      │ │
│  │  Parses: JSON tool calls from stdout stream  │ │
│  │  Emits: ToolCallEvent, TextChunkEvent        │ │
│  └──────────────────┬──────────────────────────┘ │
│                     │                             │
│  ┌──────────────────▼──────────────────────────┐ │
│  │           Tool Call Interceptor              │ │
│  │  Intercepts: write_file, bash, read_file     │ │
│  │  Checks: permissions, protected paths, budget│ │
│  │  Can: approve, reject, modify, delay         │ │
│  └──────────────────┬──────────────────────────┘ │
│                     │                             │
│  ┌──────────────────▼──────────────────────────┐ │
│  │           Event Emitter (to frontend)        │ │
│  │  Tauri events: tool_call, text_chunk, cost   │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### 9.3 Memory Architecture

```
┌─────────────────────────────────────────────────┐
│                Memory Engine                     │
│                                                  │
│  ┌──────────────┐   ┌──────────────────────┐    │
│  │ ONNX Embedder│   │   LanceDB Instance   │    │
│  │ (local, fast)│→  │   Tables:            │    │
│  └──────────────┘   │   - project_memory   │    │
│                     │   - user_memory      │    │
│  ┌──────────────┐   │   - agent_memory     │    │
│  │  Extractor   │→  │   - org_memory       │    │
│  │ (post-session│   └──────────────────────┘    │
│  │  summarizer) │            │                  │
│  └──────────────┘   ┌────────▼─────────────┐    │
│                     │   Retrieval Engine   │    │
│  ┌──────────────┐   │   Top-K semantic     │    │
│  │   Injector   │←  │   + confidence score │    │
│  │ (pre-session │   │   + freshness decay  │    │
│  │  context)    │   └──────────────────────┘    │
│  └──────────────┘                               │
└─────────────────────────────────────────────────┘
```

### 9.4 IPC Event Schema — Full Frame Spec

All Tauri events use a typed schema. This section specifies the complete bidirectional frame protocol between the Rust backend (CLI process layer) and the React frontend.

#### Agent → GUI Frames (Backend emits, Frontend renders)

```typescript
type AgentToGuiFrame =
  // Text streaming
  | { type: 'thinking';          data: { session_id: string; content: string; is_final: boolean } }
  | { type: 'text';              data: { session_id: string; content: string; is_final: boolean } }

  // Tool lifecycle
  | { type: 'tool_call';         data: { id: string; session_id: string; name: string; input: Record<string, unknown>; start_ms: number } }
  | { type: 'tool_result';       data: { id: string; session_id: string; output: unknown; error?: string; duration_ms: number } }

  // Slash command passthrough
  | { type: 'slash_command';     data: { session_id: string; command: string; args: string } }

  // Error
  | { type: 'error';             data: { session_id: string; code: string; message: string; recoverable: boolean } }

  // File changes
  | { type: 'diff';              data: { session_id: string; path: string; before: string; after: string; hunks: DiffHunk[] } }

  // Cost & context
  | { type: 'token_info';        data: { session_id: string; prompt_tokens: number; completion_tokens: number; cache_read: number; cache_write: number; cost_usd: number } }
  | { type: 'context_stats';     data: { session_id: string; used: number; limit: number; health_score: number; warnings: string[] } }

  // Narrative
  | { type: 'narrative';         data: { session_id: string; entry: string; linked_tool_id?: string; timestamp: number } }

  // Memory
  | { type: 'memory_suggestion'; data: { session_id: string; entries: MemoryExtraction[]; source: 'auto' | 'manual' } }

  // Context lifecycle
  | { type: 'context_snapshot';  data: { session_id: string; snapshot: ContextSnapshot; trigger: 'periodic' | 'checkpoint' | 'resume' } }
  | { type: 'cache_status';      data: { session_id: string; hit: boolean; saved_tokens: number } }

  // Checkpoints
  | { type: 'checkpoint';        data: { session_id: string; checkpoint_id: string; label?: string; file_count: number; timestamp: number } }

  // Permission
  | { type: 'permission_request'; data: PermissionRequest }
```

#### GUI → Agent Frames (Frontend sends, Backend executes)

```typescript
type GuiToAgentFrame =
  // User input
  | { type: 'user_message';      data: { session_id: string; content: string; attachments?: Attachment[] } }
  | { type: 'slash_command';     data: { session_id: string; command: string; args?: string } }

  // Control
  | { type: 'cancel';            data: { session_id: string; reason?: string } }
  | { type: 'config_change';     data: { session_id: string; key: string; value: unknown; scope: 'session' | 'project' | 'global' } }

  // Session branching
  | { type: 'fork';              data: { session_id: string; from_message_id: string; new_session_id: string } }

  // File attachments
  | { type: 'raw_file';          data: { session_id: string; path: string; no_line_numbers: boolean; content?: string } }

  // Memory management
  | { type: 'memory_inject';     data: { session_id: string; entries: MemoryEntry[]; scope: 'working' | 'episodic' | 'semantic' | 'procedural' } }

  // Context pruning
  | { type: 'context_prune';     data: { session_id: string; prune_ids: string[]; compress_to?: string } }

  // Checkpoint management
  | { type: 'checkpoint_restore'; data: { session_id: string; checkpoint_id: string } }
  | { type: 'checkpoint_create';  data: { session_id: string; label?: string } }
```

#### 9.4.1 IPC Inspector Dev Panel

A developer-facing panel (visible in Settings → Developer → IPC Inspector) that exposes the live frame stream for debugging:

- **Live scroll**: real-time frame feed with direction color-coding (green = Agent→GUI, blue = GUI→Agent)
- **Filter**: by frame type, session ID, or keyword in payload
- **Search**: full-text search across all frames in the session
- **Stats bar**: frames/sec, total bytes, avg latency, anomaly count
- **Export**: download full session frame log as NDJSON
- **Replay**: replay any past session's frame sequence at configurable speed
- **Anomaly highlighting**: frames with missing required fields, unexpected types, or high latency (>50ms) are highlighted in red

### 9.5 Configurable Storage Paths

All AgentLoft data directories are configurable via environment variables and/or the Settings → Storage panel. Moving a path offers to copy/move existing data to the new location.

**Environment variable overrides (take priority over Settings UI):**

| Variable | Default path | What it controls |
|----------|-------------|-----------------|
| `agentloft_SESSION_DIR` | `.claude/sessions/` | Session history, autosave state, crash recovery files |
| `agentloft_CONFIG_DIR` | `~/.agentloft/` | Global config, API keys reference (keys in OS keychain) |
| `agentloft_MEMORY_DIR` | `~/.agentloft/memory/` | LanceDB memory database, Agentmemory tiers |
| `agentloft_GRAPHIFY_DIR` | `graphify-out/` | Graphify graph output, Obsidian vault, GRAPH_REPORT.md |
| `agentloft_LOG_DIR` | `~/.agentloft/logs/` | IPC frame logs, error logs, audit trail |
| `agentloft_PLUGIN_DIR` | `~/.agentloft/plugins/` | Installed plugins and their sandboxed data |

**Settings UI — Storage panel (Settings → Storage):**

- Path editor for each directory above
- "Open in Explorer/Finder" button per path
- Storage usage breakdown: sessions / memory / logs / plugins (with used/free bars)
- "Move data" wizard: when path is changed, offers to move existing data (copy + verify + delete original)
- "Clear [category]" buttons with confirmation dialogs

**Portable mode:** When AgentLoft is launched with `--portable` flag or detects a `portable.flag` file in its executable directory, all paths default to subdirectories adjacent to the executable — useful for USB-drive or restricted corporate environments.

-----

## 10. Data Models

### 10.1 Session

```typescript
interface Session {
  id: string;                    // UUID
  project_id: string;
  created_at: Date;
  updated_at: Date;
  model_profile_id: string;
  title: string;                 // auto-generated from first message
  status: 'active' | 'completed' | 'error';
  total_cost_usd: number;
  total_tokens_in: number;
  total_tokens_out: number;
  cache_hit_rate: number;
  messages: Message[];
  tool_calls: ToolCall[];
  checkpoints: Checkpoint[];
  context_snapshots: ContextSnapshot[];
  metadata: Record<string, unknown>;
}
```

### 10.2 Memory Entry

```typescript
interface MemoryEntry {
  id: string;
  scope: 'project' | 'user' | 'agent' | 'org';
  category: 'convention' | 'decision' | 'constraint' | 'preference' | 'fact' | 'gotcha';
  content: string;
  embedding: Float32Array;       // 384-dim, stored in LanceDB
  confidence: number;            // 0.0 - 1.0
  freshness: number;             // 0.0 - 1.0, decays over time
  verified: boolean;             // user manually confirmed
  source_session_id: string;
  created_at: Date;
  last_used_at: Date;
  use_count: number;
  tags: string[];
}
```

### 10.3 Tool Call

```typescript
interface ToolCall {
  id: string;
  session_id: string;
  turn: number;
  type: 'read_file' | 'write_file' | 'bash' | 'browser' | 'mcp' | string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'error';
  started_at: Date;
  completed_at?: Date;
  duration_ms?: number;
  permission_required: boolean;
  permission_granted?: boolean;
  cost_usd?: number;
}
```

### 10.4 Checkpoint

```typescript
interface Checkpoint {
  id: string;
  session_id: string;
  turn: number;
  created_at: Date;
  label?: string;                // user-provided name
  type: 'auto' | 'manual' | 'milestone';
  file_snapshot: FileSnapshot[]; // diff from previous checkpoint
  context_snapshot: ContextSnapshot;
  cost_at_checkpoint: number;
}
```

### 10.5 Marketplace Item

```typescript
interface MarketplaceItem {
  id: string;
  type: 'skill' | 'plugin' | 'mcp' | 'template' | 'theme' | 'flow';
  name: string;
  version: string;
  author: string;
  description: string;
  long_description?: string;
  tags: string[];
  category: string;
  downloads: number;
  rating: number;               // 1.0 - 5.0
  rating_count: number;
  license: string;
  source_url: string;
  security_scan: {
    passed: boolean;
    scanned_at: Date;
    findings: SecurityFinding[];
  };
  verified_publisher: boolean;
  price_usd: number;            // 0 = free
  created_at: Date;
  updated_at: Date;
}
```

### 10.6 Project

```typescript
interface Project {
  id: string;                    // UUID
  name: string;
  root_path: string;             // absolute path on disk
  created_at: Date;
  updated_at: Date;
  stack: string[];               // detected: ['typescript', 'react', 'prisma']
  active_model_profile_id?: string;
  memory_budget_tokens: number;  // default 4000
  context_yaml_path: string;     // .agentloft/context.yaml
  protected_paths: string[];     // from context.yaml protected_paths
  agentloft_ignore: string[];  // .agentloftignore patterns
  session_count: number;
  total_cost_usd: number;
  metadata: Record<string, unknown>;
}
```

### 10.7 ConnectionProfile

```typescript
interface ConnectionProfile {
  id: string;
  name: string;                  // e.g. "resilient-work"
  models: {
    primary: string;             // e.g. "claude_code/claude-sonnet-4-6"
    secondary?: string;          // e.g. "codex_cli/codex-mini"
    tertiary?: string;           // e.g. "antigravity_cli/gemini-3-flash"
    fallback?: string;           // e.g. "local/ollama-qwen3-14b"
  };
  auto_fallback: boolean;
  fallback_notify: boolean;
  restore_primary: boolean;
  retry_queue_max: number;       // default 10
  rate_limit_detection: {
    claude: boolean;             // watches for 429 / overloaded_error
    codex: boolean;              // watches for RateLimitError
    antigravity: boolean;        // watches for RESOURCE_EXHAUSTED
  };
  created_at: Date;
  updated_at: Date;
}
```

### 10.8 ZeroWasteMetrics

```typescript
interface ZeroWasteMetrics {
  session_id: string;
  as_of: Date;
  // Per-session savings
  mcp_schema_tokens_saved: number;      // §7.21.1 — schemas not injected
  terminal_tokens_saved: number;        // §7.21.2 — output compressed
  terminal_compression_ratio: number;   // 0.0–1.0
  self_edit_tokens_saved: number;       // §7.21.3 — re-read loops stripped
  checkpoint_tokens_saved: number;      // §7.21.4 — history → state snapshot
  checkpoint_compression_ratio: number; // 0.0–1.0
  context_file_tokens_saved: number;    // §7.21.5 — unused CLAUDE.md sections
  prompt_batch_savings: number;         // §7.21.6 — consolidated prompts
  total_tokens_saved: number;
  total_tokens_would_have_used: number;
  savings_pct: number;                  // 0.0–1.0
  // Lifetime (across all sessions for this installation)
  lifetime_tokens_saved: number;
  lifetime_sessions_tracked: number;
}
```

### 10.9 StateCheckpoint

```typescript
interface StateCheckpoint {
  id: string;
  session_id: string;
  created_at: Date;
  trigger: 'turn_threshold' | 'budget_threshold' | 'manual' | 'pre_compact';
  turns_compressed: number;       // e.g. 24
  task_description: string;
  completed_items: Array<{
    description: string;
    file_path?: string;
    turn: number;
  }>;
  active_constraints: string[];   // e.g. ["PostgreSQL only", "TypeScript strict mode"]
  open_items: string[];
  files_written: Array<{
    path: string;
    turn: number;
    sha256: string;
  }>;
  tokens_before: number;          // estimated tokens if full history kept
  tokens_after: number;           // tokens used by this checkpoint text
  compression_ratio: number;      // tokens_after / tokens_before
}
```

-----

## 11. API Specifications

### 11.1 Plugin API (v1)

Full specification for plugin development:

```typescript
// agentloft-plugin-api v1.0.0
interface AgentLoftPluginAPI {
  // Read-only access
  session: {
    getMessages(): Promise<Message[]>;
    getActiveFiles(): Promise<ActiveFile[]>;
    getMemory(): Promise<MemoryEntry[]>;
    getContextHealth(): Promise<ContextHealth>;
    getCost(): Promise<CostInfo>;
  };

  // UI extension
  ui: {
    addSidebarPanel(id: string, component: React.FC, options?: PanelOptions): void;
    addOutputRenderer(mimeType: string, renderer: React.FC<{data: unknown}>): void;
    addStatusBarItem(item: StatusBarItem): () => void; // returns cleanup fn
    addCommandPaletteItem(item: CommandItem): () => void;
    showNotification(notification: Notification): void;
    showModal(modal: ModalConfig): Promise<unknown>;
  };

  // Hooks (observe, optionally intercept)
  hooks: {
    onAgentWrite(cb: (diff: FileDiff) => void | Promise<void>): () => void;
    onToolCall(cb: (call: ToolCall) => 'allow' | 'block' | Promise<'allow' | 'block'>): () => void;
    onSessionStart(cb: (session: Session) => void): () => void;
    onSessionEnd(cb: (session: Session) => void): () => void;
    onMemoryExtracted(cb: (entries: MemoryEntry[]) => MemoryEntry[]): () => void;
    onContextHealthChange(cb: (health: ContextHealth) => void): () => void;
  };

  // Write access (requires manifest permissions)
  agent: {
    injectContext(text: string, position?: 'top' | 'bottom'): Promise<void>;
    sendMessage(message: string): Promise<void>;
  };

  storage: {
    get(key: string): Promise<unknown>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
  };
}
```

### 11.2 Skill Variable Types

```typescript
type SkillVariableType =
  | { type: 'string'; required?: boolean; default?: string }
  | { type: 'number'; required?: boolean; default?: number; min?: number; max?: number }
  | { type: 'boolean'; required?: boolean; default?: boolean }
  | { type: 'enum'; options: string[]; required?: boolean; default?: string }
  | { type: 'file'; filter?: string[] }    // file picker
  | { type: 'multiline'; required?: boolean; default?: string }
```

### 11.3 Flow Node API

Each flow node type implements:

```typescript
interface FlowNode {
  id: string;
  type: FlowNodeType;
  config: Record<string, unknown>;
  next?: string | { condition: string; on_true: string; on_false: string };
  on_error?: string;
  timeout_ms?: number;
  retry?: { max_attempts: number; delay_ms: number };
}

interface FlowContext {
  variables: Record<string, unknown>;
  last_output: unknown;
  session: Session;
  step: number;
  set(key: string, value: unknown): void;
  get(key: string): unknown;
}
```

-----

## 12. Non-Functional Requirements

### 12.1 Performance

|Metric                           |Target        |
|---------------------------------|--------------|
|App cold start time              |< 2 seconds   |
|Session load time                |< 500ms       |
|File tree render (1000 files)    |< 200ms       |
|Memory retrieval (top-5 semantic)|< 100ms       |
|Tool call interception latency   |< 5ms overhead|
|Diff render (1000 line file)     |< 300ms       |
|Context health score calculation |< 50ms        |
|Marketplace search (10k items)   |< 200ms       |

**Windows-specific performance targets** (Windows 10/11, x86-64, mid-range hardware — measured separately from macOS baselines):

|Metric                                   |Target             |
|-----------------------------------------|-------------------|
|Cold start (Windows 11, NVMe SSD)        |< 3 seconds        |
|Cold start (Windows 10, HDD)             |< 6 seconds        |
|PTY process spawn (cmd.exe / PowerShell) |< 500ms            |
|File watcher latency (NTFS)              |< 200ms            |
|Path separator normalization overhead    |< 1ms per operation|
|Windows Defender scan on app launch      |acceptable (no mitigation required)|

**Cross-platform test matrix** (required before every release):

| Platform | OS version | Arch | CLI tested | Must pass |
|---|---|---|---|---|
| macOS | 13 (Ventura) | Apple Silicon (arm64) | Claude Code, Codex, Antigravity | All NFRs |
| macOS | 12 (Monterey) | Intel x86-64 | Claude Code, Codex | All NFRs |
| Windows | 11 (22H2+) | x86-64 | Claude Code, Codex | All NFRs incl. Windows targets |
| Windows | 10 (22H2) | x86-64 | Claude Code | Core + Windows targets |
| Ubuntu | 22.04 LTS | x86-64 | Claude Code, Codex | All NFRs |
| Ubuntu | 24.04 LTS | x86-64 | Claude Code, Codex, Antigravity | All NFRs |
| Arch Linux | rolling | x86-64 | Claude Code | Core NFRs |

The Windows CI lane runs on a dedicated Windows runner (GitHub Actions `windows-latest`). PTY-based CLI integration (§7.0.2) is tested with PowerShell 7 as the host shell on Windows; `cmd.exe` is tested as a secondary path. Windows-specific bugs are P1 by default — no release ships with a known Windows-only regression.

### 12.2 Reliability

- App crash rate: < 0.1% of sessions
- Data integrity: zero data loss on crash (WAL-mode SQLite + LanceDB durability)
- Auto-save: all session data persisted every 5 seconds
- Process crash recovery: automatically restart child CLI processes
- Offline mode: full functionality for local model endpoints; graceful degradation for cloud APIs

### 12.3 Security

- All API keys stored in OS keychain, never in plaintext files
- Plugin sandboxing: Web Worker + postMessage, no direct filesystem access
- Automatic secret scanning before every API call
- Supply chain: all dependencies pinned and audited in CI
- Code signing: all release binaries signed (Apple Developer ID, Windows Authenticode, Linux GPG)

### 12.4 Privacy

- Default: zero telemetry, zero data sent to AgentLoft servers
- Opt-in telemetry: crash reports only, anonymized
- Clear documentation of what is sent where for each feature
- GDPR/CCPA compliance for AgentLoft Cloud tier

### 12.5 Binary Size & Installation

- App binary target: < 25MB compressed installer
- Bundled ONNX embedding model: < 50MB
- Total installed size: < 200MB
- No external runtime dependencies (Node.js, Python not required)

### 12.6 Distribution Channels

AgentLoft ships across all major package managers and distribution methods on day one of v1 launch.

| Channel | Platform | Command | Priority |
|---|---|---|---|
| **GitHub Releases** | All | Download from github.com/multica-ai/AgentLoft/releases | P0 — primary |
| **Homebrew** | macOS | `brew install --cask agentloft` | P0 — macOS primary |
| **Winget** | Windows | `winget install AgentLoft.AgentLoft` | P0 — Windows primary |
| **apt / .deb** | Ubuntu/Debian | `sudo apt install agentloft` (via signed PPA) | P0 — Linux primary |
| **AppImage** | Linux (any) | Download .AppImage, chmod +x, run | P0 — Linux fallback |
| **AUR** | Arch Linux | `yay -S agentloft` | P1 — community |
| **Snap** | Ubuntu | `sudo snap install agentloft` | P1 — secondary Linux |
| **Flatpak** | Linux | `flatpak install agentloft` | P2 — post-v1 |

**Auto-update:** Tauri's built-in updater checks for new releases on startup (configurable). Update notification shown as a non-blocking banner with Install Now / Remind me later options. Users can disable auto-update in Settings > About.

**Code signing:** All release binaries signed before distribution:
- macOS: Apple Developer ID (notarized and stapled)
- Windows: Authenticode certificate (EV code signing for SmartScreen trust)
- Linux: GPG-signed SHA256 checksums (SHA256SUMS.gpg in each release)

**Release cadence:** Every 2 weeks (matching §13.3 quality target). Hotfix releases within 48 hours of a P0 bug.

-----

## 13. Success Metrics & KPIs

### 13.1 GitHub Health

|Metric                   |3 months|6 months|12 months|18 months|
|-------------------------|--------|--------|---------|---------|
|GitHub stars             |10,000  |25,000  |55,000   |85,000   |
|Forks                    |800     |2,500   |8,000    |15,000   |
|Contributors             |30      |150     |600      |1,200    |
|Marketplace items        |80      |300     |1,500    |4,000    |
|Open issues resolved/week|15      |40      |100      |180      |

### 13.2 Product Usage

|Metric                                   |Target           |
|-----------------------------------------|-----------------|
|DAU / MAU ratio                          |> 30%            |
|Sessions per active user per week        |> 5              |
|Memory retention: users with >10 memories|> 60%            |
|Marketplace installs per active user     |> 3              |
|Session length                           |> 15 minutes avg |
|Rollback usage (signal of trust)         |> 10% of sessions|

### 13.3 Quality

|Metric                |Target         |
|----------------------|---------------|
|App crash rate        |< 0.1%         |
|Critical bugs open    |< 5 at any time|
|P1 bug resolution time|< 48 hours     |
|Release cadence       |Every 2 weeks  |

### 13.4 Cloud Revenue (v3 — SaaS Layer)

|Metric            |3 months post-v3-launch|12 months post-v3-launch|
|------------------|-----------------------|------------------------|
|Cloud paying users|1,000                  |10,000                  |
|MRR               |$12,000                |$100,000                |
|Net churn         |< 5% monthly           |< 3% monthly            |

### 13.5 Token Efficiency

Token savings are the most concrete, shareable proof of AgentLoft's Zero-Waste Architecture (§7.21). These metrics are sourced from the Zero-Waste Dashboard (§7.21.7) and surfaced in the aggregate via anonymous opt-in telemetry.

|Metric                                             |Target (per active session)   |
|---------------------------------------------------|------------------------------|
|MCP schema tokens saved (§7.21.1)                 |> 12,000 tokens/session       |
|Terminal output compression ratio (§7.21.2)        |> 70% reduction               |
|Self-edit dedup tokens saved (§7.21.3)             |> 8,000 tokens/session        |
|Rolling checkpoint compression (§7.21.4)           |> 90% vs. full history        |
|Combined Zero-Waste savings — all §7.21 v1 features|> 40% token reduction vs. raw CLI|
|Zero-Waste savings card share rate                 |> 5% of active users/month    |

> **Why track share rate:** The shareable PNG export card in §7.21.7 is an organic distribution flywheel. A user sharing "I saved 63% of tokens this session with AgentLoft" is higher-credibility marketing than any ad. If 5%+ of monthly active users share their savings card, that compounds into a low-cost, high-trust acquisition channel directly targeting the community most likely to convert.

-----

## 14. Risks & Mitigations

### 14.1 Vendor API Changes

**Risk:** Anthropic/OpenAI/Google change their CLI output format and break AgentLoft’s parsing.

**Mitigation:**

- Output parsers are versioned and can be hot-patched without a full app release
- Community can submit format updates via a simple PR to `parsers/` directory
- Graceful degradation: if parsing fails, fall back to raw text display
- Maintain a test suite of known CLI outputs

### 14.2 Vendors Have Shipped First-Party GUIs — Risk Materialized ✓

**Status:** This risk materialized in early 2026. Anthropic shipped Claude Code desktop (April 2026), OpenAI shipped Codex desktop + ChatGPT superapp (March 2026), and Google shipped Antigravity 2.0 (May 2026). AgentLoft’s positioning has been updated (§2.3, §15) to reflect this reality.

**Outcome so far:** The moat held. Each first-party GUI is single-provider, has no persistent cross-session memory, no community marketplace, and no cost intelligence across competing models. These gaps are structurally permanent for any single vendor — no vendor can build cross-provider memory or compare costs against their own competitors. AgentLoft’s core differentiators are not temporary advantages; they require multi-model neutrality that vendors are constitutionally unable to ship.

**Ongoing exposure:** First-party apps will improve rapidly on UX, polish, and single-provider depth. The risk shifts from "they ship a GUI" to "their GUI becomes good enough that multi-model support stops mattering to a meaningful segment." Mitigation: ship persistent memory, marketplace, and cross-model cost intelligence faster than the first-party apps can close those gaps — and make the multi-model angle the primary narrative from launch day so AgentLoft is never framed as a single-provider alternative.

### 14.3 Tauri/Rust Complexity

**Risk:** Rust is harder to onboard contributors to than TypeScript/Electron.

**Mitigation:**

- Clear contribution guide showing how to contribute frontend-only (pure TypeScript)
- Rust core is minimal — most logic lives in well-documented, isolated modules
- Electron fallback: if Tauri adoption is a barrier, the frontend can be ported to Electron with a compatibility shim

### 14.4 Malicious Marketplace Content

**Risk:** A malicious skill or plugin steals API keys or executes harmful code.

**Mitigation:**

- Plugins sandboxed in Web Worker — cannot access filesystem or network directly
- Automated Semgrep security scanning on all marketplace submissions
- API key access requires explicit manifest permission + user approval
- Community flagging system + response SLA
- Verified publisher badge for vetted contributors

### 14.5 Context Window & API Changes

**Risk:** Vendors change context window sizes, pricing, or rate limits and break AgentLoft features.

**Mitigation:**

- Context window sizes are configurable per model, not hardcoded
- Community-sourced limit changelog (surfaced in-app)
- Cost projections include a 20% buffer for pricing changes

### 14.6 Opcode Adds Persistent Memory — Direct Moat Threat

**Risk:** Opcode (21,900 GitHub stars, Tauri 2, AGPL, same tech stack as AgentLoft) ships persistent memory support. This would eliminate AgentLoft's single biggest Phase 0–1 differentiator — "the only Claude Code GUI with memory" — before AgentLoft ships.

**Why this risk is elevated:** Opcode is actively developed, well-starred, and uses the same Tauri 2 + Rust + React architecture. The gap between Opcode and AgentLoft is primarily the memory layer (LanceDB). Opcode is one motivated sprint away from closing that gap for the Claude-only audience.

**Mitigation:**

- Ship v1 fast. Time-to-market is the primary defense.
- Opcode is Claude-only; AgentLoft's multi-CLI unification (Codex + Antigravity) is structurally harder to copy and gives AgentLoft's story depth beyond any single differentiator.
- Lead launch with "the GUI with memory" but immediately follow with the multi-model and marketplace angles so AgentLoft's positioning doesn't collapse if memory parity ships elsewhere.
- Monitor Opcode's `CHANGELOG.md` and GitHub issues weekly for memory-related PRs — if a memory feature appears, accelerate AgentLoft's v1 timeline.

### 14.7 Antigravity CLI Instability During Transition

**Risk:** Google's Antigravity CLI launched in May 2026 and officially replaces Gemini CLI on June 18, 2026. As a brand-new CLI, its stream-JSON output format, flags, and behavior may change frequently during the transition window — breaking AgentLoft's Antigravity integration without warning.

**Why this risk is elevated:** AgentLoft targets Antigravity CLI as a first-class integration (§7.2.3, §7.5.3). The CLI is days old at AgentLoft's planned build start. Its format is unproven at production scale.

**Mitigation:**

- Isolate the Antigravity parser in `parsers/antigravity/` with the same versioning layer used for all CLI parsers (§14.1 mitigation).
- Maintain Gemini CLI compatibility via PTY fallback through the transition period — users who haven't yet upgraded from Gemini CLI still work.
- Assign one contributor to monitor the Antigravity CLI GitHub repo and release notes proactively.
- Gate Antigravity integration under `agentloft_ANTIGRAVITY_EXPERIMENTAL=true` in early v1 builds until two consecutive releases pass without format breakage; promote to stable with clear in-app messaging.

### 14.8 Open-Source Sustainability — Contributor Retention After Launch

**Risk:** AgentLoft launches, earns stars, gets initial PRs — then contributor activity drops as the exciting "first GUI" work gives way to harder Rust internals, performance work, and test infrastructure in v1.1+. The project stagnates despite high star count.

**Why this risk is elevated:** This is the most common failure mode for developer tools that launch with momentum. The Vibe Kanban sunset (26,500 stars, shut down April 2026) is a concrete reminder that star count does not guarantee sustainability.

**Mitigation:**

- Structure the codebase so the majority of new features (new cockpit panels, CLI parsers, marketplace items) can be built entirely in TypeScript/React with no Rust knowledge required. Document this explicitly in `CONTRIBUTING.md`.
- Maintain a `good-first-issue` label policy from day one — every sprint adds at least 3 issues covering pure frontend work.
- Create a "Skill and Plugin" contribution track that never requires touching the Rust core — community contributors add value through the Marketplace without needing to understand process orchestration.
- Run a monthly contributor call (§17.3) from v1 launch, not v2. Spotlight contributors publicly on social.
- The Marketplace revenue share (§16.3, v3+) is a long-term retention mechanism — creators who earn revenue from published skills have structural incentive to stay engaged.

-----

## 15. Competitive Analysis

### 15.1 The Real Competitive Landscape (May 2026)

The AI coding agent market has fractured into distinct tiers. AgentLoft must be aware of and better than all of them.

> **Critical update since v3.0:** All three target CLI vendors (Anthropic, OpenAI, Google) have shipped first-party desktop GUIs. Google’s Gemini CLI is deprecated June 18, 2026, replaced by Antigravity CLI. The GUI-wrapper space is now crowded with new entrants. This section reflects the updated landscape.

#### Tier 1 — Dominant Open-Source Agents (by GitHub Stars)

|Tool                      |Stars (May 2026)|Category                    |Core Strength                                                                                      |Fatal Gap                                                              |
|--------------------------|----------------|----------------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
|**OpenCode** (community)  |~162,000        |Terminal agent              |75+ model providers, LSP, privacy-first, editor-agnostic                                           |No GUI, no persistent memory, no marketplace                           |
|**Crush** (original author)|24,600          |Terminal agent (Go)         |Successor to OpenCode by original author; Charm ecosystem, LSP, MCP, Agent Skills, Android support |No GUI, no persistent memory, no marketplace                           |
|**OpenHands**             |74,400+         |Autonomous agent platform   |Docker sandbox, SDK, $18.8M Series A, 87% same-day bug resolution                                  |No GUI, steep setup, cloud pricing                                     |
|**Cline**                 |~60,000         |VS Code/JetBrains/CLI agent |$32M Series A, 8M devs, 3.85M installs, MCP ecosystem, multi-IDE + CLI preview                    |VS Code-primary, no persistent memory, 90s latency vs Cursor’s 45s    |
|**Aider**                 |~42,000         |Terminal CLI                |Git-native, automatic commits, multi-model, 4.1M installations                                     |CLI only, no GUI, no memory, no marketplace                            |
|**Zed Editor**            |40,000+         |Code editor (Rust)          |Sub-500ms start, ACP (Agent Client Protocol), hosts Claude/Codex/OpenCode as external agents       |Editor-first (not standalone agent GUI), no persistent memory          |
|**Tabby**                 |~33,000         |Self-hosted server          |Data residency, self-hosted team completions, 12+ IDEs                                             |Completions only, not agentic                                          |
|**Goose** (Linux Foundation)|~28,000       |Terminal agent              |Donated to AAIF/Linux Foundation, Apache 2.0, 3,000+ MCP tools                                    |No GUI, no memory                                                      |
|**Continue**              |~32,000         |VS Code/JetBrains → CI agent|Pivoted to async CI agent (runs on every PR), 2.4M installs                                        |No persistent memory, pivoting away from interactive IDE assistant      |
|**Warp Terminal (Oz)**    |~26,000         |GPU-accelerated terminal    |700k+ active devs, Oz platform runs Claude/Codex/Gemini simultaneously, open-sourced April 2026    |Terminal-centric, not a visual workspace, subscription pricing          |
|**RooCode**               |~23,900         |VS Code extension           |⚠️ **Original team shut down April 2026.** 3M installs, community forks likely continuing.         |VS Code-locked, no GUI, team shutdown creates uncertainty               |
|**bolt.diy**              |19,400          |Browser-based               |19 LLM providers, Supabase, one-click deploys, open-source companion to bolt.new                   |Browser/web-app generation only, not a serious codebase coding agent    |
|**CC-Switch**             |~79,600         |CLI config layer            |Config switcher for Claude Code, Codex CLI, Gemini CLI, OpenCode, and Anthropic Console — manages auth profiles, API keys, and one-command switching between 5 CLIs|No GUI, no persistent memory, no sessions — pure CLI config management. Its 79.6k stars (highest in the space) reveal the scale of the multi-CLI audience AgentLoft targets|
|**Claude Squad**          |~7,600          |Multi-agent TUI (Go)        |Runs multiple Claude Code instances in isolated tmux sessions in parallel; git worktrees per agent, task routing, agent coordination from a terminal TUI|Terminal TUI only, no visual workspace, no memory, Claude Code-only     |

**Note on CC-Switch:** CC-Switch's 79,600 stars make it the single most-starred tool in the entire AI CLI space — surpassing Cline, OpenHands, and all GUI tools. The star count reflects a massive latent audience of developers already managing multiple CLI agents. These developers are AgentLoft's highest-intent acquisition target: they've proven they run multiple CLIs, they just need the upgrade from config management to a visual workspace with memory.

**Note on OpenCode:** The original `opencode-ai/opencode` repo was **archived September 18, 2025** (12.7k stars on that repo) after the original author joined Charmbracelet. The explosive ~162k star count refers to the community-maintained successor project that kept the brand alive. The author-blessed successor is **Crush** (charmbracelet/crush, 24.6k stars), built with the Charm ecosystem in Go.

#### Tier 2 — GUI Wrappers for CLI Agents (AgentLoft’s Most Direct Competitors)

|Tool              |Stars  |Stack      |Core Strength                                              |Fatal Gap vs. AgentLoft                            |
|------------------|-------|-----------|-----------------------------------------------------------|-----------------------------------------------------|
|**Opcode** (Claudia)|21,900|Tauri 2, AGPL|Claude Code GUI: file tree, diff, cost analytics, background agents|Claude-only, no persistent memory, no marketplace|
|**Nimbalyst**     |—      |Web/desktop|Claude + Codex, parallel sessions, kanban, inline diff, iOS app, MCP, git worktrees|No persistent memory, no marketplace, no Antigravity|
|**VibeAround**    |Small  |Tauri + web|Routes Claude/Codex/Gemini/OpenCode, multi-provider profile routing|Early stage, limited feature depth                  |
|**HAPI**          |Small  |Web/PWA    |Web/PWA/Telegram Mini App bridge for all 4 agents          |Feature-limited, no memory, no marketplace           |
|**CloudCLI**      |Small  |Web        |Remote access to Claude/Cursor/Codex/Gemini from any device|Web-only, no memory, no marketplace                  |
|**AionUi**        |~26,400|Electron/React|GUI for 20+ CLIs including Claude Code, Codex, Gemini, OpenCode; chat platform bridges (Discord, Slack), multi-agent task routing, cloud sync|Electron (200MB+ install vs. AgentLoft ~15MB), no persistent memory, no cost intelligence, no marketplace|
|**Vibe Kanban**   |~26,500|Web/Electron|⚠️ **SUNSETTED April 2026.** Kanban-style visual AI task management for Claude and Codex. 26,500 stars at shutdown. Community forks likely continuing.|Product shut down; represents market validation that users want visual task-oriented AI management — AgentLoft's kanban-in-flows feature should explicitly reference this gap|
|**CodePilot**     |~5,800 |Electron/web|17 AI providers, multi-agent orchestration, task tracking, BSL 1.1 license|BSL = not freely open source for commercial use (4-year delay before Apache 2.0); no persistent memory, no marketplace|
|**Parallel Code** |~646   |Electron/React|Per-task Docker sandboxing for Claude Code; each coding task runs in an isolated container — strong security model|Very early stage, Claude Code-only, no memory, no marketplace, no multi-model support|

**Note on Vibe Kanban sunset:** The April 2026 shutdown of a 26,500-star tool in this space is a cautionary tale. Vibe Kanban's star count proves strong demand for visual, task-oriented AI coding workflows. Its shutdown creates a migration opportunity: users searching for a Vibe Kanban alternative should land on AgentLoft.

#### Tier 3 — Proprietary / Paid Leaders

|Tool              |Price              |Users     |Core Strength                                                  |Fatal Gap                                                                         |
|------------------|-------------------|----------|---------------------------------------------------------------|----------------------------------------------------------------------------------|
|**Cursor**        |$20–200/mo         |Half of Fortune 500, $2B ARR|Best-in-class autocomplete, background agents, VS Code fork|Credit-based backlash (June 2025), IDE lock-in, context drift on large codebases|
|**Windsurf**      |Free/$15/$30/$60/mo|Large     |SWE-1.5 model, codemaps, Fast Context (10x retrieval)          |Acquired by Cognition (Dec 2025, ~$250M), now part of Devin umbrella              |
|**GitHub Copilot**|$10–39/mo          |20M devs  |Deep GitHub integration, agent mode GA (March 2026)            |Usage-based billing switch June 2026, no persistent memory                        |
|**Devin 2.0**     |$20/mo + ACUs      |Niche     |Fully autonomous, 67% PR merge rate, now owns Windsurf          |Opaque, no BYOK, black-box; ACUs ($2.25 each) add up fast                        |
|**Codex / OpenAI superapp**|$20/mo+   |Growing   |GitHub native, Goal Mode (hours/days), 75.6k stars, 14.5M dl/mo|OpenAI-only models, no local models, merged into ChatGPT superapp                |
|**Augment Intent**|$20–60/mo          |Beta      |macOS multi-agent spec-driven workspace, Coordinator → sub-agents|macOS-only, proprietary, requires Augment subscription                           |

#### Tier 4 — First-Party CLI + Desktop Apps (New Category Since v3.0)

These represent the most significant structural change in the landscape since the last PRD version.

|Tool                             |Launched           |Core Strength                                                                                      |Why AgentLoft Still Wins                             |
|---------------------------------|-------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------|
|**Claude Code desktop app**      |Redesigned April 2026|Parallel session sidebar, integrated terminal, diff viewer, Routines (scheduled automations)       |Claude-only; no memory; no marketplace; no cost intelligence|
|**OpenAI Codex desktop app**     |macOS 2025, Windows March 2026|Goal Mode, Appshots (macOS), merged into ChatGPT + Atlas superapp               |OpenAI-only; no persistent memory; no marketplace      |
|**Antigravity 2.0** (Google)     |Google I/O May 2026|Full desktop app + Go CLI + SDK + managed agents; replaces Gemini CLI June 18, 2026               |Google-only; no persistent memory; no marketplace; $100/mo AI Ultra|

**Key insight:** Each first-party GUI is single-provider by definition. A developer using Claude Code’s desktop app for their Anthropic tasks still has no GUI when they want to use Codex for OpenAI features, or Antigravity for Google Search grounding. AgentLoft is the only tool that handles all three in one workspace.

-----

### 15.2 Where AgentLoft Leads (Confirmed Advantages)

These are areas where AgentLoft’s PRD specifies capabilities that no competitor ships — including the first-party GUIs now in the market:

|Capability                               |AgentLoft                                                       |Best Competitor            |Gap                                                    |
|-----------------------------------------|------------------------------------------------------------------|---------------------------|-------------------------------------------------------|
|**Persistent cross-session memory**      |4-scope LanceDB, semantic retrieval, confidence scoring           |None (all first-party apps lack this)|AgentLoft is the only tool with this        |
|**Unified multi-model GUI**              |Claude + Codex + Antigravity + 75+ endpoints in one app           |First-party apps are single-provider|AgentLoft is the only unified GUI             |
|**Context dead-zone detection**          |Real-time heatmap, auto-rescue, position monitor                  |None                       |Unique to AgentLoft                                  |
|**Prompt decay / directive heartbeat**   |Automatic re-injection every N turns, drift detector              |None                       |Unique to AgentLoft                                  |
|**Cost anomaly detection**               |Baseline comparison, cache bug detection, real-time alerts        |None                       |No competitor does this                                |
|**Blast radius preview**                 |Dependency graph before any write, visual risk coloring           |None                       |No competitor does this                                |
|**Speculation mode**                     |Read-only planning pass with user-editable plan                   |Partial in Devin           |Far more granular in AgentLoft                       |
|**Full user control layer**              |12 control dimensions, control profiles, every default overridable|Partial in Cline           |Far more granular in AgentLoft                       |
|**Visual testing + preview pane**        |Embedded Chromium, screenshot diff, auto-interaction tester       |None                       |Unique to AgentLoft                                  |
|**Marketplace (Skills + Plugins + MCPs)**|Three-tier, community-driven, one-click install                   |Cline MCP only             |AgentLoft is broader and structured                  |
|**Session replay + branching**           |Full replay with branch-from-any-point                            |None                       |Unique to AgentLoft                                  |
|**Assumption logger**                    |Sidebar showing all agent assumptions for confirmation            |None                       |Unique to AgentLoft                                  |
|**Free + open-source + BYOK**            |MIT core, local-first, no subscription required                   |All first-party apps require subscriptions|AgentLoft works without any subscription|

-----

### 15.3 Where AgentLoft Is Behind (Gaps to Close)

This is the honest gap analysis from real-world competitive research. Every gap below has a corresponding feature specification added in Section 15.4.

#### Gap 1: Raw Speed

Real-world testing shows Cursor completing a React component generation in 45 seconds, Copilot in 60 seconds, and Cline in 90 seconds. AgentLoft wrapping a CLI process adds additional IPC overhead. If AgentLoft is slower than the raw CLI, early adopters will reject it immediately.

**Target:** AgentLoft overhead must add < 200ms vs. raw CLI latency. See Section 15.4.1.

#### Gap 2: Git-Native Workflow

Aider continues to thrive in a specific niche: developers who want agentic behavior but prefer git-native, CLI-based workflows. People like Aider because it fits into existing habits — diffs, commits, branches — and because it works well with multiple models. AgentLoft currently has no first-class git integration. Aider’s automatic commit-per-change workflow is beloved and has no equivalent in AgentLoft.

**Target:** Full git integration panel that matches and exceeds Aider’s workflow. See Section 15.4.2.

#### Gap 3: Background / Cloud Agents

RooCode’s cloud agents can work autonomously — you assign a task from the web or GitHub, and the agent works independently in the cloud. This is powerful for teams that want to parallelize development work. Cursor’s background agents introduce a parallel workflow no other IDE matches — spinning up agents on separate tasks while you focus on the hardest problem is a genuine force multiplier. AgentLoft has multi-agent locally but no “fire and forget” background agent or cloud delegation.

**Target:** Background agent mode + mobile notifications. See Section 15.4.3.

#### Gap 4: LSP / Real Code Intelligence

OpenCode has LSP integration, giving it real semantic understanding of the codebase — go-to-definition, find-references, type information — that pure file-reading agents lack. AgentLoft currently relies on the CLI agent’s own file reading with no language server integration.

**Target:** Bundled LSP client that feeds semantic context to the agent. See Section 15.4.4.

#### Gap 5: Sandboxed / Docker Execution

OpenHands runs agents inside a Docker runtime designed for isolated execution. This is the enterprise-grade safety feature — agents that can’t escape the sandbox, can’t touch the host filesystem beyond the project, can’t make unexpected network calls. AgentLoft’s current safety model is permission-based but not sandboxed.

**Target:** Optional Docker sandbox mode. See Section 15.4.5.

#### Gap 6: GitHub / GitLab Native Integration

Native GitHub integration (February 2026) lets Codex work directly within repos, issues, and pull requests. Cline connects to Slack, Discord, Telegram, and Linear, and runs headlessly inside GitHub Actions or GitLab pipelines. AgentLoft has no GitHub issue-to-code pipeline, no PR integration, no CI/CD headless mode.

**Target:** GitHub App + headless CI mode. See Section 15.4.6.

#### Gap 7: Inline Autocomplete

Every top proprietary tool (Cursor, Copilot, Windsurf) has inline autocomplete as a first-class feature. Cursor’s Supermaven autocomplete is considered best-in-class in the industry. AgentLoft is purely conversational/agentic with no keystroke-level autocomplete. For developers who live in their editor alongside AgentLoft, this is a missing daily touchpoint.

**Target:** VS Code extension companion with autocomplete powered by AgentLoft’s memory context. See Section 15.4.7.

#### Gap 8: Custom Agent Modes / Roles

RooCode has structured modes — Architect, Code, Debug, Custom — with reduced hallucinations. Custom modes and role-based agents are clearly what users want — they literally forked Cline to get it. AgentLoft has multi-agent orchestration but no single-agent role modes that change behavior (tone, caution level, focus area) without spawning a full second agent.

**Target:** Agent Modes system. See Section 15.4.8.

#### Gap 9: Self-Hosted Team Server

Teams with data residency requirements should start with Tabby because it is built around a self-hosted code-completion server. AgentLoft Cloud is a hosted SaaS. Enterprises in regulated industries (finance, healthcare, government) require on-premises deployment. No competitor offers a full-featured self-hosted option that also includes memory sync and team collaboration.

**Target:** AgentLoft Server — Docker-composable self-hosted backend. See Section 15.4.9.

#### Gap 10: Performance on Large Codebases

Cursor users report UI lag on files over 500 lines, increased crashes with heavy AI usage, and memory leaks during long editing sessions. Performance can sometimes be impacted on larger projects or lower-spec machines where indexing and context can lag. No tool handles large monorepos well. This is a universal complaint across Cursor, Cline, and Claude Code.

**Target:** Incremental indexing, streaming context, lazy loading. See Section 15.4.10.

#### Gap 11: Issue-to-PR Autonomous Pipeline

OpenCode hit 147,000 GitHub stars partly through its GitHub Copilot partnership allowing paid Copilot subscribers to authenticate directly. GitHub Copilot Workspace and Codex can take a GitHub issue and produce a PR autonomously. No open-source GUI tool does this end-to-end with the sophistication AgentLoft could bring (memory-aware, cost-controlled, with blast radius preview).

**Target:** Issue → Branch → Code → PR pipeline. See Section 15.4.11.

#### Gap 12: Real-Time Collaboration (Live Pair Programming)

Zed’s multiplayer lets multiple developers edit the same file in real-time like Google Docs, which is a game-changer for remote pair programming. AgentLoft’s team mode is async (session sharing, replay). No tool combines live collaborative editing with a shared AI agent session.

**Target:** Live co-pilot mode. See Section 15.4.12.

#### Gap 13: Antigravity CLI Integration (Gemini CLI Deprecation)

Google deprecated Gemini CLI for non-enterprise users effective June 18, 2026, replacing it with **Antigravity CLI** (Go-based rewrite) and **Antigravity 2.0** (full desktop app + SDK + managed agents, announced at Google I/O). AgentLoft’s process-spawning and PTY integration was designed around `gemini` CLI. The new Go binary has a different command interface, and Antigravity 2.0 ships with a managed agents SDK that may offer richer integration than PTY-spawning alone.

**Target:** Full Antigravity CLI integration and evaluation of Antigravity Managed Agents SDK as an alternative integration path. See Section 15.4.13.

#### Gap 14: Differentiation from First-Party GUIs on UX Polish

Anthropic’s redesigned Claude Code desktop app (April 2026) ships with a parallel session sidebar, integrated terminal, in-app diff viewer, preview pane, and Routines (scheduled automations). OpenAI’s Codex app has Goal Mode and the ChatGPT superapp integration. These are polished, first-party experiences. If AgentLoft’s UX is meaningfully worse than what users already get from the free first-party GUI, they will not switch. AgentLoft must set a higher bar on UX polish than first-party options — not just feature depth.

**Target:** UX Parity + Premium initiative — benchmark every first-party GUI feature and ensure AgentLoft’s equivalent is at least as polished. See Section 15.4.14.

#### Gap 15: The Opcode Threat (21,900 Stars, Same Stack)

Opcode (formerly Claudia) is an open-source Claude Code GUI built with Tauri 2 — the exact same stack as AgentLoft. It has 21,900 GitHub stars, AGPL-3.0 license, and ships background agents, cost analytics, file tree, and diff viewer. It is the most direct architectural competitor to AgentLoft’s Phase 0–1 feature set. If AgentLoft launches Phase 0 before shipping unique differentiators (memory, marketplace, cost intelligence), it risks being perceived as a re-implementation of Opcode with no clear advantage.

**Target:** Ship persistent memory in Phase 0 or Phase 1 before any major launch push, making memory the first-mover moat that Opcode cannot easily replicate. See Section 15.4.15.

#### Gap 16: Warp Oz — Funded Competitor with 700k Users

Warp Terminal (Apache 2.0 open-sourced April 2026, ~26k stars) has 700k+ active developers and its **Oz platform** (February 2026) runs multiple AI agents simultaneously — including Claude Code, Codex CLI, and Gemini CLI — from within the terminal. It has free tier (75 credits/mo), Build $18/mo, and Max $180/mo. Warp is funded, has brand awareness, and is positioned as an "Agentic Development Environment." The primary gap vs. AgentLoft: Warp is still fundamentally a terminal, not a visual workspace, and it has no persistent memory, no cost intelligence, and no marketplace.

**Target:** AgentLoft must clearly articulate the visual workspace + memory advantage over Warp Oz in all positioning materials. See Section 15.4.16.

#### Gap 17: Zed ACP — Open Interoperability Standard

Zed 1.0 (April 2026, 40k+ stars) introduced the **Agent Client Protocol (ACP)** — an open standard for connecting external AI agents (Claude Code, Codex, OpenCode) to any editor. Co-developed with JetBrains. If ACP gains wide adoption, it could reduce the need for a standalone GUI — developers could get multi-agent unification inside their existing editor. AgentLoft’s response: implement ACP as an output format so AgentLoft can feed context and session state into ACP-compatible editors, positioning AgentLoft as complementary to (not competing with) ACP-enabled editors.

**Target:** Implement ACP compatibility as a AgentLoft extension point. See Section 15.4.17.

#### Gap 18: AionUi — The Electron Multi-CLI GUI (26,400 Stars)

AionUi ships an Electron-based GUI for 20+ CLIs including Claude Code, Codex, Gemini, and OpenCode. It also bridges chat platforms (Discord, Slack) and supports multi-agent routing. With 26,400 stars, it is AgentLoft's most direct multi-CLI GUI competitor by feature scope. The primary gap: AionUi is Electron (~200MB install, high RAM), has no persistent memory, no cost intelligence, no blast radius preview, and no marketplace.

**Target:** AgentLoft must win on native app performance (Tauri ~15MB), memory, cost intelligence, and premium design. See Section 15.4.18.

#### Gap 19: CC-Switch (79,600 Stars) — The Multi-CLI Config Audience

CC-Switch is the highest-starred tool in the entire AI CLI tooling space at ~79,600 GitHub stars. It is not an agent GUI — it is a config switcher that helps developers manage auth profiles and API keys for five CLIs (Claude Code, Codex, Gemini, OpenCode, Anthropic Console) from a single command. Its star count is the single best signal in the space: it reveals a massive population of developers who are already running multiple AI CLI agents and actively managing that complexity. These developers are AgentLoft's highest-intent acquisition channel.

**Target:** Position AgentLoft as the natural visual upgrade from CC-Switch. See Section 15.4.19.

-----

### 15.4 Gap-Closing Feature Specifications

Each feature below directly addresses a competitive gap and is designed to be better than the competitor it targets.

-----

#### 15.4.1 AgentLoft Speed Engine

*Closes Gap 1 — Raw Speed. Target: faster than raw CLI by removing IPC bottlenecks.*

**The problem:** AgentLoft spawns a CLI child process (Claude Code, Codex, Gemini) and proxies I/O through Rust IPC layers. Naïve implementation adds 200–800ms per turn.

**The solution — Zero-Copy Streaming Architecture:**

- PTY output is read directly into a ring buffer in Rust — no intermediate string allocations
- Token streaming is pushed to the frontend via WebSocket (not Tauri events) for minimum latency
- Tool call JSON is parsed with a streaming parser (no buffering the full output before parsing)
- File writes are dispatched as soon as the write_file call is intercepted — no waiting for the agent’s turn to complete
- Context injection (memory, pinned content) is pre-computed at session start — not assembled on each turn

**Benchmark target:** AgentLoft IPC overhead < 50ms per turn. Total response latency indistinguishable from raw CLI for the user.

**Latency monitor:** A developer-facing latency panel (hidden by default, toggleable) shows per-turn breakdown: IPC overhead / parsing time / rendering time / tool call round-trip. If IPC overhead exceeds 100ms, it files an automatic performance issue.

-----

#### 15.4.2 Git-Native Workflow (Better Than Aider)

*Closes Gap 2 — Git integration. Target: Aider’s git workflow, with AgentLoft’s observability on top.*

**What Aider does that AgentLoft must match:**

- Every agent change is automatically committed with a descriptive message
- Changes are staged to a branch, not directly to main
- `git diff` output is the primary review surface
- Supports `--no-auto-commits` mode for users who want to stage manually

**What AgentLoft does that Aider cannot:**

- Blast radius preview before commits (Aider has no concept of this)
- Visual diff with per-hunk accept/reject (Aider is text only)
- Rollback to any checkpoint (Aider uses git revert — AgentLoft’s checkpoints are more granular)
- Cost per commit (track exactly which agent actions cost how much)
- Session replay tied to git log

**AgentLoft Git Panel features:**

- **Auto-commit mode** (matches Aider): every agent write batch is committed with an AI-generated message and a `[agentloft]` tag
- **Branch-per-task mode**: each new task automatically creates a branch (`vs/fix-auth-bug-20260524`), keeping main clean
- **Commit message control**: auto-generated / user-edits-before-commit / template-based
- **Staged commit review**: all changes from a session accumulated in a staging area; single commit when user approves
- **Git timeline panel**: visual git log showing which commits were AI-generated, with session metadata per commit
- **Stash integration**: “pause this task, stash changes, let me do something else, come back” flow
- **Conflict-aware writes**: before writing a file, checks if it has been modified externally since last read; warns before overwriting
- **Pre-commit hooks UI**: configure git hooks visually — no editing `.git/hooks` manually
- **PR draft generator**: when a task is complete, auto-generates a PR description with: what was changed, why, what was tested, cost of generation

**`.agentloft/git.yaml` config:**

```yaml
git:
  auto_commit: true
  commit_prefix: "[agentloft]"
  branch_per_task: true
  branch_prefix: "vs/"
  auto_push: false       # never auto-push without explicit user action
  stash_on_task_switch: true
  sign_commits: false    # GPG signing support
  commit_template: |
    {task_summary}

    Generated by AgentLoft/{model_name}
    Cost: ${cost_usd} | Turns: {turn_count} | Files: {files_changed}
```

-----

#### 15.4.3 Background Agent Mode

*Closes Gap 3 — Background/cloud agents. Target: better than Cursor’s background agents + RooCode’s cloud agents.*

**Background Agent Mode (local):**

- Minimize AgentLoft to the system tray while an agent runs
- Agent continues executing tool calls, writing files, running tests
- System notification when: task complete / agent needs input / error / cost threshold hit
- Badge on tray icon shows agent status: running (animated) / waiting (static) / error (red)
- Click tray icon → shows mini session card: task name, progress, cost, last action
- “Nudge” from tray: send a quick instruction without opening the full app

**Background Agent Constraints (safety):**

- Background agents cannot run with `bash: always_allow` — all bash requires either pre-approval or a hit your allowlist
- Hard time limit: background agents auto-pause after N minutes (configurable, default 30)
- Hard cost limit: background agents auto-pause when session cost hits threshold
- No file writes outside project directory while backgrounded — enforced at kernel level via OS sandbox APIs

**Task Queue:**

- Queue multiple tasks to run sequentially in background
- Drag to reorder queue
- Per-task configuration: model, effort, scope, budget
- Queue visualization in tray popup

**Mobile Companion Notifications (AgentLoft Cloud):**

- Push notification to iOS/Android when background agent needs input or completes
- Approve/reject permission requests from phone notification
- View session cost and progress from notification
- “Kill agent” action from notification without opening app

-----

#### 15.4.4 LSP Intelligence Layer

*Closes Gap 4 — LSP/code intelligence. Target: better semantic context than OpenCode’s LSP integration.*

**What LSP gives the agent that file-reading doesn’t:**

- Go-to-definition: knows that `parseToken` is defined in `src/auth/jwt.ts:47`
- Find-all-references: knows every call site before modifying a function signature
- Type information: knows that `user.id` is a `string`, not a `number`, before generating code
- Diagnostics: knows which files have TypeScript errors before the agent starts
- Symbol index: can answer “where is the `AuthMiddleware` class?” without reading every file

**AgentLoft LSP Integration:**

- Bundled LSP clients for: TypeScript/JavaScript (ts-server), Python (Pylsp), Rust (rust-analyzer), Go (gopls), Java (Eclipse JDT), C/C++ (clangd)
- LSP is started automatically when a project is opened, runs in background
- Agent context injection is LSP-aware:
  - Before writing a function, agent receives: current diagnostics for the file, all references to the symbol being modified, type signature of the function
  - Before deleting a function, agent receives: all call sites
  - Before renaming a variable, agent receives: all references across the codebase
- **“LSP Context Augment”** — a toggle that, when on, enriches every file injection with LSP metadata (types, references, diagnostics)
- **Diagnostic Feed** — sidebar showing all current errors/warnings across the project, with “Ask agent to fix this” button per diagnostic
- **Symbol Search** — `⌘⇧O` opens a symbol search powered by LSP, found symbols can be added to context directly

-----

#### 15.4.5 Docker Sandbox Mode

*Closes Gap 5 — Sandboxed execution. Target: better than OpenHands’ Docker runtime.*

**What OpenHands does:** Agents run inside a Docker container. Code changes and bash commands are isolated. The host filesystem is not accessible except via explicit volume mounts.

**What AgentLoft does better:**

**Sandbox configuration (more granular than OpenHands):**

```yaml
sandbox:
  enabled: false  # opt-in, not mandatory
  image: "agentloft/sandbox:latest"  # or custom image
  
  mounts:
    - host: "./src"
      container: "/workspace/src"
      mode: rw
    - host: "./docs"
      container: "/workspace/docs"
      mode: ro     # documentation is read-only
  
  network:
    mode: restricted  # none / restricted / full
    allowed_hosts:
      - "registry.npmjs.org"
      - "pypi.org"
  
  resources:
    cpu_limit: "2.0"
    memory_limit: "4GB"
    disk_limit: "10GB"
    timeout_minutes: 60
  
  pre_run_script: "./scripts/sandbox-init.sh"
  post_run_script: "./scripts/sandbox-cleanup.sh"
```

**Sandbox-specific features:**

- **Snapshot/restore**: save the container state at any point, restore to any previous snapshot — faster and more reliable than git for binary artifacts
- **Multi-version testing**: spin up two sandbox instances with different dependency versions and compare results
- **Clean-room mode**: each new session gets a fresh container from the base image — no state leakage between sessions
- **Sandbox diff export**: export the diff between sandbox state and host as a clean patch file
- **Resource usage monitor**: CPU, memory, disk, network usage of the sandbox shown in the Cockpit panel
- **One-click sandbox setup**: AgentLoft detects the project type and suggests an appropriate base image

-----

#### 15.4.6 GitHub & GitLab Native Integration

*Closes Gap 6 — Issue-to-PR pipeline. Target: better than Codex CLI’s GitHub integration.*

**Issue-to-Code Pipeline:**

1. Connect GitHub/GitLab account (OAuth)
1. Browse issues directly in AgentLoft’s sidebar
1. Select an issue → AgentLoft creates a branch, loads issue context into agent memory
1. Agent works on the issue with full AgentLoft tooling (blast radius, rollback, cost control)
1. When complete: auto-generate PR description, push branch, open PR — all from within AgentLoft
1. PR includes: session cost, models used, files changed, test results

**PR Review Mode:**

- Pull open PRs into AgentLoft for AI-assisted review
- Agent reads the full diff and comments on: bugs, security issues, style violations, missing tests
- Comments are staged — user reviews before posting to GitHub
- “Fix this comment” — agent fixes the flagged issue in the codebase directly

**CI Integration:**

- AgentLoft can run headlessly in GitHub Actions / GitLab CI
- `agentloft run --task "fix failing tests" --model claude-sonnet --budget 2.00`
- Outputs: changed files as PR diff, cost report, session replay JSON
- Configurable: only run on certain labels, branches, or events

**`.github/workflows/agentloft.yml` template:**

```yaml
name: AgentLoft Auto-Fix
on:
  issues:
    types: [labeled]
jobs:
  fix:
    if: contains(github.event.label.name, 'ai-fix')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: agentloft/action@v1
        with:
          task: "Fix the issue: ${{ github.event.issue.title }}"
          model: claude-sonnet-4-5
          budget_usd: "3.00"
          create_pr: true
          api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Notification integration:**

- GitHub/GitLab PR comments that @mention you → appear as AgentLoft notifications
- “Reply with AI” — draft a response to a PR comment using the agent

-----

#### 15.4.7 VS Code Companion Extension

*Closes Gap 7 — Inline autocomplete. Target: Continue.dev-level integration powered by AgentLoft’s memory.*

**What it is:** A lightweight VS Code (and JetBrains) extension that bridges VS Code’s editor features with AgentLoft’s memory and session system.

**Features:**

- **Memory-aware autocomplete**: suggestions are informed by AgentLoft’s project memory (knows your naming conventions, preferred patterns, stack constraints) — not just file content
- **Inline agent invoke**: `⌘I` opens an inline agent prompt in VS Code that runs inside AgentLoft (with all safety features, cost tracking, and rollback)
- **Diff accept from VS Code**: when AgentLoft proposes a change, accept/reject directly in VS Code’s diff editor
- **Context push**: right-click a function in VS Code → “Add to AgentLoft context” → the function is pinned in the active session
- **Session status bar**: shows active AgentLoft session status, cost, and model in VS Code’s status bar
- **Open in AgentLoft**: right-click any file → “Open in AgentLoft” — launches AgentLoft focused on that file

**What makes it better than Continue.dev:**

- Backed by AgentLoft’s persistent memory — autocomplete knows your project’s history, not just current files
- Cost-aware — inline suggestions show estimated token cost before accepting
- Full AgentLoft session available with one click — not just chat

-----

#### 15.4.8 Agent Modes

*Closes Gap 8 — Custom agent roles. Target: better than RooCode’s Architect/Code/Debug modes.*

**What RooCode does:** Pre-defined modes that change the agent’s behavior, tools available, and system prompt focus.

**What AgentLoft does better — fully user-customizable modes:**

**Built-in modes:**

|Mode          |Focus                               |Default Model            |Key Constraints                         |Auto-activates when                    |
|--------------|------------------------------------|-------------------------|----------------------------------------|---------------------------------------|
|**Architect** |High-level design, no code writing  |Claude Opus / High effort|Read-only, writes only to `docs/`       |Task starts with “design” or “plan”    |
|**Builder**   |Implementation, test writing        |Claude Sonnet / Medium   |Normal write access                     |Task starts with “build” or “implement”|
|**Debugger**  |Root cause analysis, minimal changes|Claude Opus / High       |Surgical mode on, protected zones broad |Task starts with “fix” or “debug”      |
|**Reviewer**  |Code review, no rewrites            |Any / Medium             |Read-only, writes to review notes only  |Task starts with “review”              |
|**Documenter**|Docs, comments, changelogs          |Gemini Flash / Low       |Writes only to `docs/`, `*.md`, comments|Task starts with “document”            |
|**Refactor**  |Restructure without behavior change |Claude Sonnet / Medium   |Regression shield always on, test-first |Task starts with “refactor”            |
|**Security**  |Vulnerability analysis              |Claude Opus / High       |Read-only unless user approves          |Task starts with “audit” or “secure”   |
|**Explorer**  |Understand unfamiliar codebase      |Any / Low                |Read-only, high verbosity               |New project first session              |

**Custom mode builder:**
Users can create their own modes with full configuration:

```yaml
mode:
  name: "My Terse Builder"
  icon: "⚡"
  extends: builder
  overrides:
    model: claude-sonnet-4-5
    effort: medium
    response_length: brief
    system_prompt_additions: |
      Be extremely concise. No explanations unless asked.
      Never suggest refactoring outside the task scope.
    tool_overrides:
      bash.confirmation: allow   # trust bash in this mode
    protected_paths:
      - "src/legacy/**"
    post_write_actions:
      - run: "npm test -- --passWithNoTests"
```

**Mode auto-detection:** AgentLoft reads the task description and suggests a mode before execution. User confirms or changes. Mode shown in status bar at all times.

**Mode marketplace:** Custom modes are shareable as `.vsmode` files — publishable to the Marketplace. “The Paranoid Banker” (finance-industry security constraints), “The Speed Demon” (maximum autonomy for trusted projects), etc.

-----

#### 15.4.9 AgentLoft Server (Self-Hosted)

*Closes Gap 9 — Enterprise self-hosted. Target: better than Tabby’s self-hosted model.*

**What it is:** A Docker-composable backend that replaces AgentLoft Cloud for enterprises requiring on-premises deployment.

**Deployment:**

```yaml
# docker-compose.yml
services:
  agentloft-server:
    image: agentloft/server:latest
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
      - ./config:/config
    environment:
      - VS_LICENSE_KEY=${LICENSE_KEY}
      - VS_AUTH_PROVIDER=okta  # okta / azure-ad / github / local
      - VS_AUTH_DOMAIN=${AUTH_DOMAIN}
      - VS_ENCRYPTION_KEY=${ENCRYPTION_KEY}
      - VS_STORAGE_BACKEND=s3  # s3 / gcs / azure-blob / local

  agentloft-vector-db:
    image: lancedb/lancedb-server:latest
    volumes:
      - ./vector-data:/data

  agentloft-db:
    image: postgres:16
    volumes:
      - ./pg-data:/var/lib/postgresql/data
```

**Enterprise features included in AgentLoft Server:**

- **SSO integration**: Okta, Azure AD, GitHub Enterprise, Google Workspace, SAML 2.0, OIDC
- **RBAC**: fine-grained roles — who can use which models, which MCPs, which tools
- **Org memory management**: admins can view, edit, and audit all org memory
- **Data residency**: all memory, sessions, and context data stays in the organization’s infrastructure
- **Compliance exports**: SOC 2 compatible audit log exports (JSON, CSV)
- **Air-gap deployment**: AgentLoft Server runs fully offline with local model providers (Ollama cluster)
- **Usage dashboards**: per-user, per-team, per-project cost and usage analytics for admins
- **License seat management**: see active users, deactivate seats, transfer licenses
- **Custom marketplace**: private internal marketplace not connected to the public registry
- **Webhook integrations**: Slack, Teams, PagerDuty — fire events on agent completions, errors, cost thresholds

-----

#### 15.4.10 Large Codebase Performance Engine

*Closes Gap 10 — Performance at scale. Target: the tool that works where Cursor crashes.*

Cursor users report UI lag on files over 500 lines and memory leaks during long editing sessions. AgentLoft will be architecturally designed to handle codebases that break every other tool.

**Incremental Indexing:**

- Project index is built incrementally — only changed files are re-indexed on save
- Index stored as a binary file (`.agentloft/index.bin`) — loads in < 500ms even on 100k-file repos
- Background indexing never blocks the UI thread
- Partial index: even an incomplete index is useful — AgentLoft uses what it has

**Streaming Context:**

- Files are never fully loaded into the frontend renderer — they’re streamed in chunks
- Context injection uses streaming: the agent starts receiving context while the rest is still being assembled
- Large file handling: files over 500KB are automatically chunked and only relevant sections are sent

**Lazy Loading:**

- File tree is virtualized — only visible nodes are rendered regardless of repo size
- Memory entries are paginated — only top-K are loaded, rest fetched on scroll
- Session history is lazy-loaded — only the last 20 turns are in memory, older turns fetched on scroll

**Memory-Efficient Diffing:**

- Large file diffs use a streaming diff algorithm — no need to hold both versions in memory simultaneously
- Diff rendering is virtualized — only visible hunks are rendered

**Benchmarks (target):**

|Metric                           |Target |Cursor reported    |
|---------------------------------|-------|-------------------|
|App start on 100k-file repo      |< 3s   |8–12s reported     |
|File tree render (10k files)     |< 100ms|Laggy              |
|Memory usage at idle             |< 200MB|400–800MB reported |
|Memory usage during large session|< 800MB|1.5–2GB reported   |
|Crash rate on 500+ line files    |0%     |“Increased crashes”|

-----

#### 15.4.11 Issue-to-PR Autonomous Pipeline

*Closes Gap 11 — GitHub issue automation. Target: better than Copilot Workspace.*

**End-to-end flow:**

1. Open GitHub/GitLab issues in AgentLoft’s Issue Browser
1. Select one or more issues to work on
1. AgentLoft reads the issue, labels, comments, linked PRs
1. Proposes an approach (Speculation Mode) — user approves
1. Creates a branch, names it from the issue title
1. Agent implements the fix with full AgentLoft tooling
1. Runs tests, shows results
1. Generates PR description with: closes #issue, summary, test evidence, cost
1. User reviews diff, approves, AgentLoft pushes and opens PR

**What makes it better than Copilot Workspace:**

- Full blast radius preview before any code is written
- Cost-controlled — set a budget per issue
- Memory-aware — knows your codebase’s conventions from persistent memory
- Rollback at any point
- Works with any model (not just GitHub’s choice)
- Session replay of the full implementation for PR reviewers

**Batch issue mode:** Select 5 issues → AgentLoft queues them as background tasks → processes sequentially overnight → you wake up to 5 draft PRs

-----

#### 15.4.12 Live Co-Pilot Mode (Real-Time Collaboration)

*Closes Gap 12 — Live pair programming. Target: better than Zed’s multiplayer.*

**What it is:** Two developers sharing a single AgentLoft session with a shared agent, in real time.

**How it works (AgentLoft Cloud):**

- Host shares a session link
- Guest joins — sees the host’s conversation and agent output in real time
- Both can type — messages are attributed to “Host” or “Guest” with distinct colors
- Both can accept/reject diffs — requires both to accept before a file is written (configurable: host only / either / both)
- Either can pause the agent
- “Take the wheel” — guest can request primary control; host approves

**What makes it better than Zed’s multiplayer:**

- Shared AI agent (Zed’s multiplayer is for editing, not agent collaboration)
- Agent actions are visible to both parties with full cockpit observability
- Cost split: session cost is attributed per user’s messages (for billing fairness)
- Session is recorded — late joiners can see the full history
- Async mode: guest leaves, host continues; guest re-joins and sees what happened

-----

#### 15.4.13 Antigravity CLI Integration

*Closes Gap 13 — Gemini CLI deprecation. Target: full first-class support for Antigravity CLI before June 18, 2026 cutover.*

**What changed:** Google deprecated Gemini CLI (TypeScript) and shipped Antigravity CLI (Go) + Antigravity 2.0 desktop app at Google I/O May 2026. The new CLI has a different binary name (`antigravity`), updated command interface, and integrates with Google AI Studio, Firebase, and Android toolchains. The Antigravity SDK exposes a Managed Agents API.

**Phase 1 — Process-Spawning Compatibility (launch requirement):**
- Detect whether the user has `gemini` CLI (legacy) or `antigravity` CLI installed; prompt migration if needed
- Update PTY integration to handle `antigravity` binary's output format, command flags, and interactive shell behavior
- Map legacy `gemini` profile configurations to `antigravity` equivalents automatically on first launch after update
- Maintain `gemini` CLI as a supported backend for users on legacy installs (enterprise Gemini CLI users are not deprecating until later)

**Phase 2 — Antigravity SDK Integration (v0.5):**
- Evaluate the Antigravity Managed Agents SDK as an alternative to PTY spawning
- If the SDK exposes structured tool call events, switch from PTY parsing to SDK integration — more reliable than parsing stdout
- Antigravity connectors (Google AI Studio, Firebase, Android) surfaced as first-class context sources in AgentLoft
- Voice mode integration: Antigravity v0.41+ real-time voice → expose as AgentLoft's voice input option when using Antigravity backend

**Backend naming in settings:**
- Display name: "Antigravity CLI (Google)" with a badge "⚠ Gemini CLI deprecated June 2026"
- Legacy path: "Gemini CLI (legacy)" — selectable but shown with a deprecation warning and migration prompt

-----

#### 15.4.14 UX Parity + Premium Initiative

*Closes Gap 14 — Differentiation from first-party GUIs on UX polish.*

**The benchmark:** Every feature the first-party GUIs ship must have a AgentLoft equivalent that is at least as polished — plus AgentLoft's differentiators on top.

**Parity checklist vs. first-party GUIs (tracked feature-by-feature):**

| First-Party Feature                              | AgentLoft Equivalent                    | Status  |
|--------------------------------------------------|-------------------------------------------|---------|
| Claude Code: parallel session sidebar            | Multi-session manager (§7.1.1 Split/Quad) | ✅ spec'd|
| Claude Code: integrated terminal                 | Floating mini terminal (§7.1.6)           | ✅ spec'd|
| Claude Code: in-app diff viewer                  | Inline diff renderer (§7.1.5)             | ✅ spec'd|
| Claude Code: preview pane                        | Embedded preview pane (§7.11.1)           | ✅ spec'd|
| Claude Code: Routines (scheduled automations)    | Flows + Flow Scheduler (§7.12.5)          | ✅ spec'd|
| Codex: Goal Mode (hours/days autonomous)         | Background Agent Mode (§15.4.3)           | ✅ spec'd|
| Codex: Appshots (screenshot → agent)             | **Not yet spec'd — add to Phase 3**       | ⚠ gap   |
| Antigravity: multi-agent orchestration UI        | Multi-Agent Orchestration (§7.13)         | ✅ spec'd|
| Antigravity: background task scheduling          | Background Agent Mode + Flows             | ✅ spec'd|
| Antigravity: voice commands                      | **Not yet spec'd — add to Phase 4**       | ⚠ gap   |

**Appshots equivalent (Phase 3 addition):**
- Drag or paste a screenshot of any app, error, or UI into the AgentLoft chat
- Routes to whichever backend is active (Claude, Codex, Antigravity all support multimodal)
- Screenshot is annotated: user can draw on it ("fix this button", "this error appears here") before sending
- Works with any model that supports vision

**Voice input (Phase 4 addition):**
- Push-to-talk or continuous voice transcription via Whisper (local ONNX model)
- Voice input routes to whichever agent is active
- Transcription shown as text in the input box before sending (editable)
- "AgentLoft Voice" — always-on hotword activation (opt-in)

-----

#### 15.4.15 Memory-First Launch Strategy (Opcode Differentiation)

*Closes Gap 15 — Differentiation from Opcode/Claudia before launch.*

**The risk:** If AgentLoft launches Phase 0 (basic Claude Code GUI) before persistent memory is shipped, it will be indistinguishable from Opcode to casual observers. Opcode already has 21,900 stars and momentum.

**The fix:** Ship a visible memory feature in Phase 0 or early Phase 1, before any major launch push.

**Minimum viable memory for Phase 0 (added to Phase 0 roadmap):**

- Simple project memory file (`.agentloft/memory/project.md`) — plain markdown, no vector DB required yet
- Memory panel in the UI: a sidebar that shows the current project memory file
- Auto-inject: on session start, prepend the memory file to the system prompt
- Manual capture: "Remember this" right-click on any agent message → appends a bullet to the memory file
- `/forget [text]` command to remove a line from memory

This is not the full LanceDB-backed memory system from §7.3 — it is a lightweight v0 that delivers clear user value and creates a visible differentiation story from Opcode at launch.

**Full LanceDB memory** (§7.3) ships in Phase 1 as originally planned.

**Positioning:** AgentLoft's launch headline = "The Claude Code GUI with memory." Opcode cannot match this claim without a significant development investment.

-----

#### 15.4.16 Warp Oz Counter-Positioning

*Closes Gap 16 — Differentiation from Warp Terminal's Oz platform.*

**What Warp Oz does:** Runs multiple AI agents (Claude Code, Codex, Gemini CLI) simultaneously from a terminal environment. Funded, 700k users, open-sourced April 2026, $18/mo Build tier.

**What AgentLoft does that Warp Oz does not:**

| Feature                                 | AgentLoft | Warp Oz |
|-----------------------------------------|-------------|---------|
| Persistent cross-session memory         | ✅           | ❌       |
| Visual diff renderer (Monaco)           | ✅           | ❌       |
| Embedded browser preview + screenshot diff | ✅       | ❌       |
| Blast radius preview (dependency graph) | ✅           | ❌       |
| Cost anomaly detection                  | ✅           | ❌       |
| Session replay + branching              | ✅           | ❌       |
| Marketplace (Skills + Plugins + MCPs)   | ✅           | ❌       |
| Agent Cockpit (full tool call feed)     | ✅           | Limited |
| Context health score                    | ✅           | ❌       |
| Full user control layer                 | ✅           | ❌       |

**The core distinction:** Warp is a better terminal. AgentLoft is a visual workspace. A developer who lives in their terminal will prefer Warp. A developer who wants a premium GUI — visual diffs, cost visibility, memory, session replay — will prefer AgentLoft. The two products are not directly competing for the same user segment.

**Positioning language to add to README and landing page:**
> *"AgentLoft is not a terminal. It is a visual agent workspace. If you love living in the terminal, Warp is excellent. If you want to see what your agent is doing, control what it touches, and remember what it learned — AgentLoft is built for you."*

-----

#### 15.4.17 ACP (Agent Client Protocol) Compatibility

*Closes Gap 17 — Zed ACP interoperability standard.*

**What ACP is:** An open standard (Zed + JetBrains, April 2026) for connecting external AI agents to any editor. Allows Claude Code, Codex, OpenCode to be driven from inside Zed, IntelliJ, or any ACP-compliant editor.

**What this means for AgentLoft:** ACP could reduce the need for a standalone GUI for developers who live in their editor. AgentLoft's response is to become ACP-compatible — not to resist the standard but to integrate with it.

**AgentLoft as an ACP Server (Phase 3):**

- AgentLoft exposes an ACP server endpoint
- ACP-compliant editors (Zed, JetBrains) can connect to a running AgentLoft instance
- The editor can: send tasks to AgentLoft's active session, receive diff proposals from AgentLoft, display cost and memory state in the editor's status bar
- AgentLoft handles all the heavy lifting (memory, cost tracking, blast radius, checkpoints) while the developer stays in their editor

**AgentLoft as an ACP Client:**

- AgentLoft can connect to any ACP server (e.g., Zed's LSP-backed context)
- Pull semantic context (types, references, diagnostics) from an ACP-compatible editor into AgentLoft's context engine
- Complements the LSP Intelligence Layer (§15.4.4) with editor-native context

**The positioning:** ACP makes AgentLoft and the best code editors complementary rather than competitive. A developer can use Zed for writing code and AgentLoft as the agent intelligence layer behind it — connected via ACP.

-----

#### 15.4.18 AionUi Differentiation Strategy

*Closes Gap 18 — Electron multi-CLI GUI competition. Target: outperform AionUi on the dimensions developers care most about.*

**What AionUi does:** Electron-based GUI for 20+ CLI agents including Claude Code, Codex, and Gemini. Chat platform bridges (Discord, Slack integration), multi-agent task routing, cloud sync. 26,400 GitHub stars.

**Why AionUi users will switch to AgentLoft:**

| Dimension              | AgentLoft                                | AionUi                         |
|------------------------|--------------------------------------------|---------------------------------|
| Install size           | ~15MB (Tauri 2 / Rust native)              | 200MB+ (Electron/Chromium)      |
| RAM at idle            | < 200MB target                             | 400–800MB typical for Electron  |
| Persistent memory      | ✅ 4-scope LanceDB, semantic retrieval      | ❌                               |
| Cost intelligence      | ✅ anomaly detection, per-session tracking  | ❌                               |
| Blast radius preview   | ✅                                          | ❌                               |
| Marketplace            | ✅ Skills + Plugins + MCPs                 | ❌                               |
| Session replay         | ✅                                          | ❌                               |
| Open source license    | MIT core                                   | Unknown / varying               |

**Messaging for AionUi users:**

> *AgentLoft does what AionUi does — connect all your CLI agents in one GUI — and adds everything AionUi is missing: persistent memory so the agent remembers your project, cost intelligence so you're never surprised by a bill, blast radius preview before any file is touched, and a native app that doesn't eat your RAM.*

**AionUi migration path:** When a user connects their first agent in AgentLoft, the onboarding wizard detects existing AionUi profiles (config file locations are known) and offers one-click import of their agent profiles, API keys, and model preferences.

-----

#### 15.4.19 CC-Switch Audience Acquisition Strategy

*Closes Gap 19 — Capturing the 79,600-star multi-CLI config audience.*

**The opportunity:** CC-Switch's 79,600 stars prove an enormous population of developers who are already running 2–5 CLI agents simultaneously. These developers have demonstrated the behavior AgentLoft is built for. They are not browsing for solutions — they already know the pain. They just don't know AgentLoft exists yet.

**Acquisition channels:**

1. **README positioning:** AgentLoft's README should explicitly name CC-Switch: *"If you're using CC-Switch to manage multiple CLIs, AgentLoft is the visual workspace that replaces the terminal config dance."*

2. **CC-Switch compatibility:** On first launch, AgentLoft detects a CC-Switch config file (typically `~/.cc-switch/config.json` or similar) and offers to import all configured CLI profiles automatically. Zero re-configuration for CC-Switch users.

3. **GitHub presence:** Open a GitHub Discussion or pinned issue on AgentLoft repo: "Coming from CC-Switch? Read this." — explains how AgentLoft extends the multi-CLI workflow into a GUI. Cross-post in the CC-Switch discussions.

4. **Search targeting:** "CC-Switch GUI", "CC-Switch alternative with GUI", "CC-Switch visual interface" — these are zero-competition search terms that lead directly to AgentLoft's core value proposition.

**The upgrade narrative:**

CC-Switch users have already solved the hardest cultural problem — they are committed multi-CLI users. AgentLoft offers them:
- No more switching terminals — all CLIs in one tabbed workspace
- Memory that persists across all CLI sessions
- Cost visibility across all agents from a single dashboard
- Visual diffs instead of terminal scrollback

**Target:** ≥ 5% of CC-Switch's star audience converts to AgentLoft within 6 months of launch. At 79,600 stars with typical 5–10% conversion to installs, this is ~4,000 downloads from this channel alone.

-----

### 15.5 Full Feature Matrix — AgentLoft vs. All Competitors

**Tier 1: vs. First-Party Vendor GUIs (New competition since v3.0)**

|Feature                              |AgentLoft|Claude Code app|Codex app / superapp|Antigravity 2.0|
|-------------------------------------|-----------|---------------|---------------------|---------------|
|**Free & open source**               |✅          |❌ subscription |❌ subscription       |❌ $100/mo Ultra|
|**Unified multi-model GUI**          |✅ all 3+   |❌ Claude only  |❌ OpenAI only        |❌ Google only  |
|**Persistent memory**                |✅ 4-scope  |⚠️ "Dreaming" preview|❌               |❌              |
|**BYOK / local-first**               |✅          |❌              |❌                   |❌              |
|**Cost anomaly detection**           |✅          |❌              |❌                   |❌              |
|**Blast radius preview**             |✅          |❌              |❌                   |❌              |
|**Marketplace**                      |✅          |❌              |❌                   |❌              |
|**Session replay + branching**       |✅          |❌              |❌                   |❌              |
|**Scheduled automations**            |✅ (Flows)  |✅ (Routines)   |✅ (Goal Mode)        |✅              |
|**Background agents**                |✅          |❌              |✅                   |✅              |
|**Multi-agent orchestration**        |✅          |❌              |Partial              |✅              |
|**Voice input**                      |✅ v1.0     |❌              |❌                   |✅              |

**Tier 2: vs. Open-Source Agents and GUI Wrappers**

|Feature                              |AgentLoft|Cursor        |Cline         |OpenHands|Crush/OpenCode|Aider |Opcode|Warp Oz|Zed (ACP)|
|-------------------------------------|-----------|--------------|--------------|---------|--------------|------|------|-------|---------|
|**Free & open source**               |✅          |❌ $20/mo      |✅             |✅        |✅             |✅     |✅ AGPL|✅ Apache|✅ GPL  |
|**Persistent memory**                |✅ 4-scope  |❌             |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Unified multi-model GUI**          |✅          |Partial       |❌             |❌        |❌             |❌     |❌     |✅ terminal|Partial|
|**Context dead-zone detection**      |✅          |❌             |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Blast radius preview**             |✅          |❌             |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Cost anomaly detection**           |✅          |❌             |❌             |❌        |❌             |❌     |Partial|❌     |❌       |
|**Visual testing / preview**         |✅          |❌             |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Marketplace (Skills+Plugins+MCPs)**|✅          |Partial       |MCP only      |❌        |❌             |❌     |❌     |❌      |❌       |
|**Session replay + branching**       |✅          |❌             |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Full user control layer**          |✅          |Partial       |Partial       |❌        |❌             |❌     |Partial|❌     |❌       |
|**Git-native workflow**              |✅ v0.4     |Partial       |Partial       |Partial  |✅             |✅ best|❌     |❌      |❌       |
|**Background agents**                |✅ v0.4     |✅             |❌             |❌        |❌             |❌     |✅     |✅      |❌       |
|**LSP integration**                  |✅ v0.4     |✅             |❌             |❌        |✅             |❌     |❌     |❌      |✅ best  |
|**Docker sandbox**                   |✅ v0.5     |❌             |❌             |✅        |❌             |❌     |❌     |❌      |❌       |
|**GitHub/GitLab native**             |✅ v0.5     |❌             |CI only       |✅        |❌             |❌     |❌     |❌      |❌       |
|**VS Code companion**                |✅ v0.5     |✅ (is VS Code)|✅ (is VS Code)|❌        |❌             |❌     |❌     |❌      |❌       |
|**Agent modes**                      |✅ v0.3     |Partial       |❌             |❌        |❌             |❌     |❌     |❌      |❌       |
|**Self-hosted server**               |✅ v1.0     |❌             |❌             |✅        |❌             |❌     |❌     |❌      |❌       |
|**Large codebase perf**              |✅ v0.4     |⚠️ known issues|⚠️             |❌        |✅             |✅     |⚠️     |✅      |✅ best  |
|**Issue-to-PR pipeline**             |✅ v0.5     |❌             |❌             |Partial  |❌             |❌     |❌     |❌      |❌       |
|**Live co-pilot mode**               |✅ v1.0     |❌             |❌             |❌        |❌             |❌     |❌     |❌      |Partial  |
|**Inline autocomplete**              |✅ via ext  |✅ best        |✅             |❌        |❌             |❌     |❌     |❌      |✅       |
|**Local/offline models**             |✅          |Partial       |✅             |✅        |✅             |✅     |✅     |✅      |✅       |
|**Air-gap mode**                     |✅          |❌             |✅             |✅        |✅             |✅     |✅     |Partial |✅       |
|**ACP compatibility**                |✅ v0.5     |❌             |❌             |❌        |❌             |❌     |❌     |❌      |✅ native|

**Second-round competitors (abbreviated) — full analysis in §15.4.18–19:**

|Feature                              |AgentLoft|AionUi (Electron)|CC-Switch|Claude Squad|Vibe Kanban (†)|
|-------------------------------------|-----------|-----------------|---------|------------|---------------|
|**GitHub Stars (May 2026)**          |—          |~26,400          |~79,600  |~7,600      |~26,500 (†dead)|
|**Free & open source**               |✅ MIT      |✅                |✅        |✅           |✅ (archived)  |
|**Multi-model / multi-CLI**          |✅ 3+ CLIs  |✅ 20+ CLIs       |✅ 5 CLIs|❌ Claude only|✅ Claude+Codex|
|**GUI (not terminal/TUI)**           |✅ native   |✅ Electron       |❌ CLI    |❌ tmux TUI  |✅ Web         |
|**Persistent memory**                |✅ 4-scope  |❌                |❌        |❌           |❌             |
|**Cost intelligence**                |✅          |❌                |❌        |❌           |❌             |
|**Marketplace**                      |✅          |❌                |❌        |❌           |❌             |
|**Install size**                     |~15MB       |200MB+           |< 5MB    |< 10MB      |Web app        |
|**Active maintenance**               |✅          |✅                |✅        |✅           |❌ sunset Apr 2026|

† Vibe Kanban shut down April 2026. Community forks may exist.

-----

### 15.6 The Positioning Statement

> **Updated for v4.0** — the original positioning ("the only GUI wrapper for CLI agents") is no longer accurate given first-party GUIs from Anthropic, OpenAI, and Google. The updated positioning leans into multi-model unification, memory, and community.

**AgentLoft is not a Cursor alternative. It is not a first-party GUI alternative. It is a different product category entirely.**

- **vs. Cursor:** Cursor is an IDE. AgentLoft is an AI agent command center. Cursor competes with VS Code. AgentLoft works *alongside* VS Code (and Cursor, and Zed, and Neovim). Cursor’s value is in the edit loop. AgentLoft’s value is in the agent loop.

- **vs. First-party GUIs (Claude Code app, Codex app, Antigravity):** Each first-party GUI is locked to one provider. A developer who uses Claude for architecture, Codex for OpenAI-specific work, and Antigravity for Google Search grounding needs three apps. AgentLoft is one app for all three — with memory that persists across all of them.

- **vs. Opcode / Nimbalyst / Warp Oz / AionUi:** AgentLoft ships persistent memory, cost intelligence, session replay, the full control layer, and a community marketplace. Every tool in this tier is a GUI without memory or observability depth. AionUi specifically has 20+ CLI support but runs on Electron (200MB+, high RAM) — AgentLoft's Tauri native app wins on performance alone, before accounting for any feature differences.

- **vs. CC-Switch ecosystem (79,600 stars):** CC-Switch users are the most valuable acquisition target in the space — they already run multiple CLI agents and actively manage that complexity. AgentLoft does not compete with CC-Switch; it is the visual upgrade path. See §15.4.19 for the acquisition strategy.

- **vs. Zed + ACP:** AgentLoft is not an editor and does not compete with Zed. ACP-compatible: AgentLoft can feed context to ACP editors. AgentLoft is the agent intelligence layer; Zed is the editing layer — complementary.

**The sharpened positioning (v4.0):**

> *AgentLoft is the only open-source, model-agnostic AI agent workspace that gives you Claude, Codex, and Antigravity in one place — with the memory that makes each session smarter than the last, the cost intelligence that keeps you in control, and the community marketplace that makes it endlessly extensible. If you're managing multiple CLI agents with tools like CC-Switch, AgentLoft is the visual workspace that replaces the config dance.*

The GitHub Desktop analogy still holds for explaining the category to new users:

> *AgentLoft is to Claude Code / Codex / Antigravity CLI what GitHub Desktop is to git — the GUI that makes powerful but hostile CLIs accessible, observable, and safe. But unlike GitHub Desktop, AgentLoft adds capabilities the underlying tools don’t have at all: persistent memory, cost intelligence, agent safety rails, visual testing, session replay, and a marketplace.*

**What AgentLoft is NOT:**
- Not a code editor (use Cursor, Zed, VS Code alongside it)
- Not a first-party Claude / OpenAI / Google experience (it wraps them; it does not replace them)
- Not a terminal emulator (Warp is better at that)
- Not subscription-required (free forever for solo use with BYOK)

-----

## 16. Monetization Strategy

### 16.1 Free Tier (Permanent)

Everything in the core open-source app is free forever:

- Full multi-model GUI (Claude, Codex, Gemini, local models)
- Persistent memory (local)
- Context engine
- Agent cockpit and safety features
- Marketplace (community content, free items)
- Flows and multi-agent (local)
- Visual testing and preview

### 16.2 AgentLoft Cloud (Paid SaaS)

Monthly subscription, billed per seat:

|Plan      |Price         |Features                                                       |
|----------|--------------|---------------------------------------------------------------|
|Solo      |$12/month     |Cloud memory backup, session sync across devices               |
|Team      |$25/seat/month|Shared org memory, session sharing, team marketplace, audit log|
|Enterprise|Custom        |SSO, private deployment, SLA, custom compliance                |

### 16.3 Marketplace Revenue Share (v3+)

- Premium skills, plugins, and MCPs sold via Marketplace
- 70% to creator, 30% to AgentLoft
- Stripe Connect integration
- Target: 1,000 paid items × $5 avg × 30% = $1,500/month passive at launch scale

### 16.4 Sponsorship

- GitHub Sponsors for individual contributors
- Corporate sponsors (model providers, developer tool companies) get a “Powered by” mention in-app
- No advertising. No model provider pays for placement or promotion.

-----

## 17. Open Source Strategy

### 17.1 License

**Core application:** MIT License — maximum permissiveness, maximum contribution potential.

**Marketplace content:** Each item has its own license declared in manifest.

**AgentLoft Cloud:** Source-available (BSL or similar) — community can read and audit but not fork a competing Cloud service.

> **BSL community risk:** BSL has generated significant backlash in the open-source community (HashiCorp/Terraform → OpenTF fork, 2023; CodePilot's BSL 1.1 is already cited as a negative differentiator in §15.4). Before adopting BSL for Cloud, evaluate alternatives: (a) **AGPL** — forces competitors to open-source their forks but has viral copyleft that may deter enterprise contributors; (b) **SSPL** — similar to AGPL but specifically targets SaaS deployment; (c) **Custom proprietary license** — requires legal drafting but avoids the "open-source washing" perception. Whichever is chosen, the rationale must be documented publicly and communicated to the community before v3 launch to prevent a legitimacy crisis.

### 17.2 Contribution Model

**GitHub repository structure:**

- `main` branch: stable releases only
- `dev` branch: active development
- Feature branches: community PRs target `dev`

**Contribution tiers:**

- **Contributor:** PR merged
- **Maintainer:** Regular PR reviewer, triage access
- **Core team:** Full write access, roadmap input
- **Steering committee (future):** Roadmap ownership

### 17.3 Community Infrastructure

- **Discord:** Primary community hub (general, #help, #plugins, #skills, #roadmap)
- **GitHub Discussions:** Long-form feature discussions and RFCs
- **GitHub Issues:** Bug reports and feature requests only
- **Weekly changelog:** Published every Friday as a GitHub Discussion
- **Monthly community call:** Roadmap review, contributor highlights

### 17.4 RFC Process

For significant features:

1. Issue opened with `[RFC]` prefix
1. 2-week community comment period
1. Core team writes final spec
1. Appears on roadmap with assigned milestone

### 17.5 Marketplace Seeding Strategy

> **Problem:** An empty Marketplace on launch day is a conversion killer. If the first user to visit the Marketplace sees zero skills and zero MCPs, the entire Marketplace premise feels abandoned — and a key differentiator (§7.6, §15.4.3) delivers no value at the moment it matters most.

**Commitment: 20+ Marketplace items before public launch.**

The founding team commits to shipping the following Marketplace content as part of the v1 launch package:

**Skills (pre-installed, by the founding team):**

| Skill | Description |
|---|---|
| Karpathy Engineer | Minimal-footprint engineer mode (full spec in §7.20) |
| Deep Work | Extended focus session, no interruptions |
| Code Review | Thorough review against project conventions |
| Exploration | Safe read-only discovery pass |
| Safe Mode | Maximum caution, minimal blast radius |
| Overnight Run | Autonomous long-session profile with scheduled checkpoints |
| PR Description Writer | Writes structured PR descriptions from git diff |
| Changelog Generator | Generates CHANGELOG.md entries from recent commits |
| Test Writer | Writes unit tests for selected functions |
| Refactor Mode | Structural refactor with no behavior changes |
| Documentation Writer | Generates JSDoc / Rustdoc / docstrings inline |
| Debug Detective | Systematic root cause analysis mode |

**Pre-installed MCPs (curated integrations, one-click install):**

| MCP | Description |
|---|---|
| Caveman (via §7.21.5) | CLAUDE.md compression + commit message generation |
| GitHub | PR creation, issue fetch, branch management |
| Filesystem Extended | Advanced file ops beyond what the CLI exposes |
| SQLite | Direct database read/write for local SQLite files |
| Playwright | Browser automation and visual testing (v2, pre-listed) |
| Context Mode | vs_execute paradigm for high-efficiency data extraction (ELv2, pre-listed with legal review status) |
| Web Search | Real-time search integration |
| Memory Export | Export AgentLoft memories to external formats |

**Launch checklist for Marketplace:**

- [ ] All 12 Skills published to the static registry at launch
- [ ] All 8 MCPs listed (some may show "Coming soon — v2" but are visible)
- [ ] Each item has a description, author (AgentLoft Team), and license (MIT)
- [ ] Marketplace search returns results immediately
- [ ] "Install" works end-to-end for all 12 Skills before launch day

**Post-launch flywheel:** The first 10 community contributors who publish a Skill or MCP to the Marketplace are recognized in the README "Community Builders" section and in the in-app Marketplace "Community" tab. This is the seeding mechanism for the long-term community flywheel.

-----

## 18. Appendix

### 18.1 Glossary

|Term             |Definition                                                                                                        |
|-----------------|------------------------------------------------------------------------------------------------------------------|
|Vibecoder        |Developer using AI agents to write software with minimal manual coding                                            |
|CLI agent        |A command-line AI tool that can autonomously read/write files (Claude Code, Codex CLI, Gemini CLI)                |
|Context window   |The maximum amount of text (measured in tokens) a model can process in one call                                   |
|Context dead zone|The 40–80% middle section of the context window where model attention is weakest                                  |
|Prompt decay     |Gradual degradation of model adherence to initial instructions over a long conversation                           |
|MCP              |Model Context Protocol — Anthropic’s standard for giving AI models tools and integrations                         |
|CLAUDE.md        |A project file that Claude Code reads automatically to understand project conventions                             |
|AGENTS.md        |A cross-tool equivalent of CLAUDE.md, supported by multiple CLI agents                                            |
|Blast radius     |All files that will be touched or affected by an agent’s planned changes                                          |
|Checkpoint       |A saved snapshot of session + file state allowing rollback to that point                                          |
|Skill            |A reusable prompt template with variables, installable from the Marketplace                                       |
|PTY              |Pseudo-terminal — allows AgentLoft to spawn and interact with CLI processes that require an interactive terminal|

### 18.2 File Structure Conventions

```
my-project/
├── .agentloft/
│   ├── context.yaml        # Context engine configuration
│   ├── memory/
│   │   └── project.json    # Project-scoped memories
│   ├── profiles/           # Model configuration profiles
│   ├── snapshots/          # Cross-session continuity snapshots
│   ├── skills/             # Local skills (not from Marketplace)
│   ├── flows/              # Local automation flows
│   └── mcps.yaml           # MCP configuration for this project
├── CLAUDE.md               # Claude Code project instructions
├── AGENTS.md               # Cross-agent project instructions
└── .agentloftignore      # Files never sent to any model
```

### 18.3 Keyboard Shortcuts Reference

|Action          |macOS             |Windows/Linux |
|----------------|------------------|--------------|
|Command Palette |⌘K                |Ctrl+K        |
|New Session     |⌘N                |Ctrl+N        |
|Toggle Memory   |⌘M                |Ctrl+M        |
|Toggle Cockpit  |⌘⇧C               |Ctrl+Shift+C  |
|Mini Terminal   |⌘\                |Ctrl+\        |
|Focus Mode      |⌘⇧F               |Ctrl+Shift+F  |
|Checkpoint      |⌘S                |Ctrl+S        |
|Rollback        |⌘Z (session-level)|Ctrl+Z        |
|Accept All Diffs|⌘⏎                |Ctrl+Enter    |
|Reject All Diffs|⌘⌫                |Ctrl+Backspace|
|Switch Model    |⌘⇧M               |Ctrl+Shift+M  |
|Open Marketplace|⌘⇧P               |Ctrl+Shift+P  |
|New Flow        |⌘⇧W               |Ctrl+Shift+W  |
|Toggle Preview  |⌘⇧V               |Ctrl+Shift+V  |
|Raw File Mode (toggle)|⌘⇧R          |Ctrl+Shift+R  |
|Side Chat       |⌘⇧I               |Ctrl+Shift+I  |
|Session Replay  |⌘⇧Y               |Ctrl+Shift+Y  |
|Memory Browser  |⌘⇧E               |Ctrl+Shift+E  |
|Symbol Search (LSP)|⌘⇧O            |Ctrl+Shift+O  |
|Refresh Directives|⌘⇧D             |Ctrl+Shift+D  |
|Retry Turn (after rate limit)|⌘⇧⏎  |Ctrl+Shift+Enter|

### 18.4 Environment Variables

```bash
# API Keys (stored in OS keychain — these are fallback/dev overrides only)
agentloft_ANTHROPIC_KEY=
agentloft_OPENAI_KEY=
agentloft_GOOGLE_KEY=

# Configuration overrides
agentloft_DATA_DIR=~/.agentloft       # Override data directory
agentloft_LOG_LEVEL=info                # debug / info / warn / error
agentloft_DISABLE_TELEMETRY=true        # Explicitly opt out
agentloft_OFFLINE=true                  # Air-gap mode

# Development
agentloft_DEV_TOOLS=true               # Enable React DevTools in production
agentloft_MOCK_APIS=true               # Use mock responses (for UI dev)
```

### 18.5 Roadmap Items Under Consideration (Post-v1)

These are community-requested features not yet committed to a version:

- **JetBrains plugin** — AgentLoft panels embedded in IntelliJ/WebStorm
- **Mobile companion app** — View session status, approve permissions, get notifications
- **Voice input** — Speak prompts instead of typing (Whisper integration)
- **AgentLoft API** — Headless mode for CI/CD pipelines
- **Agent marketplace** — Pre-configured multi-agent setups for common workflows
- **Custom model fine-tuning integration** — Use your own fine-tuned model as a AgentLoft backend
- **GitHub App** — AgentLoft as a GitHub bot that comments on PRs with agent-powered reviews
- **Local model benchmarking** — Run and compare local Ollama models on your own codebase
- **AI pair programming mode** — Two users + one agent, real-time collaboration

-----

## 19. User Control Layer

-----

### 19.1 Control Philosophy

#### The Shift

Every AI coding tool on the market today operates on a **“trust the model”** principle. Decisions about what to write, what to touch, how much to spend, and when to stop are made by the model, surfaced to the user after the fact, and accepted or rejected as a whole.

AgentLoft operates on a fundamentally different principle: **“you are the director, the model is the crew.”**

This means:

- Every default the model applies is visible
- Every default can be overridden before, during, or after execution
- No action is irreversible without explicit user acknowledgment
- The user can zoom in to line-level control or zoom out to full autopilot — and switch between them instantly

#### The Control Spectrum

AgentLoft exposes a continuous spectrum from maximum autonomy to maximum oversight:

```
AUTOPILOT ←————————————————————————————→ LOCKDOWN
Agent runs    Agent asks    Agent plans    Agent waits
freely        on errors     first          for approval
                                           at every step
```

Users set their position on this spectrum globally, then override it per session, per task, or per tool call type. The position is never fixed.

#### The Principle of Visible Defaults

Every default AgentLoft or a model applies is shown in the UI as a visible, labeled setting — not hidden in a config file or buried in documentation. If AgentLoft makes a decision on the user’s behalf, the user can see it, change it, and save their preference.

-----

### 19.2 Model Behavior Control

#### 19.2.1 Effort & Reasoning Controls

|Control                    |Type               |Options                               |Default        |
|---------------------------|-------------------|--------------------------------------|---------------|
|Effort level               |Slider             |Low / Medium / High / Max             |Medium         |
|Per-message effort override|Context menu       |Same options                          |Inherit session|
|Re-run with higher effort  |Context menu action|—                                     |—              |
|Thinking trace visibility  |Toggle             |Show / Hide / Show on error           |Hide           |
|Response length            |Selector           |Brief / Normal / Detailed / Exhaustive|Normal         |
|Temperature                |Slider + presets   |0.0–1.0                               |0.3            |
|Top-P                      |Slider             |0.0–1.0                               |0.95           |
|Stop sequences             |Tag input          |Custom strings                        |None           |

**Effort slider** is exposed as a first-class UI control in the session header — not a slash command. Changing it mid-session does not restart the conversation.

**Per-message effort override:** Right-click any sent message → “Re-run with effort: [Low/Medium/High/Max]” — regenerates from that point in the conversation with the new effort setting.

**Temperature presets:**

- Deterministic (0.0) — identical outputs on re-run, best for code generation
- Balanced (0.3) — default, slight variation
- Creative (0.7) — varied solutions, good for brainstorming
- Exploratory (1.0) — maximum variation, use for ideation only

#### 19.2.2 System Prompt Control

- **Full raw editor**: open the exact system prompt being sent, edit it, save it as a named variant
- **Diff from default**: shows what the user has changed from the AgentLoft baseline system prompt
- **System prompt versions**: save named versions (“strict”, “permissive”, “terse”) and switch per session
- **Section toggles**: the system prompt is broken into labeled sections (safety rules / project context / formatting rules / memory injection). Each section can be individually enabled or disabled
- **Injection order editor**: drag to reorder sections — order affects model attention weighting
- **Preview mode**: before sending, preview exactly what the full system prompt looks like with all injections applied

#### 19.2.3 Tool Use Controls

|Control                |Granularity  |Options                                                        |
|-----------------------|-------------|---------------------------------------------------------------|
|Tool enable/disable    |Per tool type|On / Off / Ask                                                 |
|Confirmation level     |Per tool type|Always Ask / Ask Once Per Session / Always Allow / Always Block|
|Max tool calls per turn|Session-level|1–100, default 20                                              |
|Tool call timeout      |Per tool type|5s–300s                                                        |
|Bash allowlist         |Pattern-based|Regex patterns for allowed commands                            |
|Bash blocklist         |Pattern-based|Regex patterns for blocked commands (hard block)               |
|Network tool scope     |Domain-based |Whitelist of allowed domains                                   |
|File read scope        |Path-based   |Restrict `read_file` to specific directories                   |
|File write scope       |Path-based   |Restrict `write_file` to specific directories                  |

**Bash allowlist/blocklist examples:**

```yaml
bash_controls:
  always_allow:
    - "^npm (test|run|install).*"
    - "^git (status|log|diff).*"
    - "^echo .*"
  always_block:
    - "^rm -rf.*"
    - "^sudo .*"
    - ".*> /dev/null.*"
  always_ask:
    - "^git (commit|push|merge).*"
    - "^npm publish.*"
```

These rules are enforced at the Rust interception layer — the model cannot bypass them with a cleverly-worded prompt.

-----

### 19.3 Context Control

#### 19.3.1 File Inclusion Controls

Every file and folder in the project file tree has a context state indicator and control:

|State         |Icon|Meaning                               |
|--------------|----|--------------------------------------|
|Auto          |◐   |AgentLoft decides based on relevance|
|Always Include|✓   |Always in context regardless of task  |
|Always Exclude|✗   |Never sent to any model               |
|Ask Each Time |?   |Prompts user before including         |

**Controls available:**

- Right-click any file/folder → set context state
- Bulk select + set state
- Pattern rules: `*.test.ts` → Always Exclude / `src/types/**` → Always Include
- File size threshold: files over X KB excluded from auto-context (configurable per project)
- Binary file handling: include path only / include as description / exclude entirely
- Depth limit: auto-context never goes deeper than N levels in a given folder

#### 19.3.2 Context Composition Editor

A visual drag-and-drop editor for the context window composition:

```
┌─────────────────────────────────────────┐
│  Context Composition (this session)     │
├─────────────────────────────────────────┤
│  ① [System Prompt]          2,000 tok  │  ← drag to reorder
│  ② [Pinned Instructions]      400 tok  │
│  ③ [Memory Injection]       3,800 tok  │
│  ④ [Active Files]          11,200 tok  │
│  ⑤ [Conversation History]  48,000 tok  │
├─────────────────────────────────────────┤
│  Total: 65,400 / 200,000 tokens used    │
└─────────────────────────────────────────┘
```

User can:

- Drag sections to reorder (affects model attention weighting)
- Click any section to expand and edit its contents
- Set a hard token cap per section
- Disable any section entirely for this session

#### 19.3.3 Summarization Controls

|Control              |Options                                            |Default                      |
|---------------------|---------------------------------------------------|-----------------------------|
|Auto-summarization   |On / Off / Ask me first                            |Ask me first                 |
|Summarization trigger|At X% context fill (50/70/80/90%)                  |80%                          |
|Summary review       |Always review before applying / Apply automatically|Always review                |
|Summary model        |Same as active / Cheaper model (e.g. Haiku/Flash)  |Cheaper model                |
|Summary depth        |Minimal (task state only) / Normal / Detailed      |Normal                       |
|Eviction priority    |User-defined ranking of what gets dropped first    |Conversation > Files > Memory|

**Summary reviewer UI:** Before any compaction, a panel appears showing:

- The proposed summary text (editable)
- What will be removed (expandable list)
- What will be kept
- Estimated token savings
- Accept / Edit / Reject / Postpone buttons

#### 19.3.4 Cross-Session Continuity Controls

- **Snapshot frequency**: after every session / every N sessions / manual only / never
- **Snapshot contents**: what’s included — conversation summary / file state / memory state / cost snapshot
- **Snapshot retention**: keep last N snapshots / keep forever / auto-delete after N days
- **Resume behavior**: always ask / auto-resume if last session < 24h ago / never auto-resume
- **Snapshot diff viewer**: compare any two snapshots side by side

-----

### 19.4 Agent Behavior Control

#### 19.4.1 Pre-Execution Controls

**Speculation Mode Settings:**

|Option              |Description                                                     |
|--------------------|----------------------------------------------------------------|
|Always plan first   |Agent always runs a read-only planning pass before executing    |
|Plan for large tasks|Plan only when >N files will be touched (configurable threshold)|
|Plan on request     |Only when user types `/plan` before their message               |
|Never               |Straight to execution                                           |

**Plan Editor** (when speculation mode runs):

- The agent’s proposed plan is rendered as an editable list of steps
- User can: delete steps, reorder steps, edit step descriptions, add new steps
- Editing a step adds a note to the agent’s context: “User modified step 3: [original] → [edited]”
- Only after plan approval does execution begin

**Pre-task Conditions:**
User-defined conditions that must be true before any task starts:

```yaml
pre_task_conditions:
  - type: tests_passing
    command: "npm test"
    on_fail: block  # block / warn / ignore
  - type: git_clean
    on_fail: warn
  - type: file_not_modified
    path: "src/payments/**"
    on_fail: block
```

**Scope Limiter:**
Per-task scope: “This task may only touch files matching: `src/auth/**`”

- Set via a scope input field above the message box
- Can also be set as a session default
- Agent receives scope constraint in its system prompt AND it’s enforced at the write interception layer

#### 19.4.2 Mid-Execution Controls

**Control available while agent is running:**

|Control       |Action                                       |Keyboard|
|--------------|---------------------------------------------|--------|
|Pause         |Suspend after current tool call completes    |⌘P      |
|Resume        |Continue from paused state                   |⌘P      |
|Skip step     |Cancel current tool call, agent continues    |⌘⇧S     |
|Redirect      |Inject new instruction into running agent    |⌘⇧R     |
|Bump effort   |Increase effort level mid-run without restart|—       |
|Kill          |Terminate agent immediately                  |⌘⌫      |
|Checkpoint now|Force-save current state                     |⌘S      |

**Live Tool Call Editor:**
When a tool call is intercepted (before execution), if `confirmation: ask` is set, user sees:

- Tool type and target
- All parameters (editable)
- “What this will do” plain-English description
- Approve (with or without edits) / Reject / Reject All Remaining

Example: agent wants to run `bash: npm install lodash`
User edits to `npm install lodash --save-dev` before approving.
The edit is logged in the tool call audit trail.

**Redirect Mid-Session:**
While agent is running or paused, user can type a redirect message:

- Injected into the conversation as an assistant interruption
- Agent receives it at the next turn boundary
- Does not restart the session — agent continues with the new instruction
- Shown in conversation as “[User redirected]” marker

#### 19.4.3 Post-Turn Controls

|Control            |Description                                                                     |
|-------------------|--------------------------------------------------------------------------------|
|Accept turn        |Accept the agent’s response and continue                                        |
|Reject turn        |Discard the agent’s response (files not written, turn removed from history)     |
|Edit response      |Modify the agent’s response text before it’s committed to history               |
|Regenerate         |Re-run the same turn with same or different settings                            |
|Branch from here   |Fork the session at this turn                                                   |
|Inject into history|Add a synthetic message to conversation history (powerful for course correction)|
|Re-run with        |Same turn, different model / effort / system prompt                             |

**Inject into history** is a power-user feature:

- Adds a message to the conversation as if it was sent at that point
- Use case: “I want the model to think it was told X at turn 5 without re-running everything”
- Shown in conversation with a “⚡ injected” badge

-----

### 19.5 Memory Control

#### 19.5.1 Capture Controls

|Control                           |Options                                          |Default       |
|----------------------------------|-------------------------------------------------|--------------|
|Memory capture mode               |Automatic / Review Everything / Manual Only / Off|Automatic     |
|Per-session capture               |On / Off (doesn’t affect existing memory)        |On            |
|Extraction sensitivity            |Conservative / Normal / Aggressive               |Normal        |
|Category controls                 |Toggle per category                              |All on        |
|Active scopes                     |Project / User / Agent / Org (mix and match)     |Project + User|
|Confidence threshold for auto-save|0.0–1.0                                          |0.6           |

**Category controls (all individually toggleable):**

- Code conventions
- Architecture decisions
- Technical constraints
- Integration facts
- User preferences
- Known bugs / gotchas
- External API details
- Deployment configuration

#### 19.5.2 Injection Controls

|Control                          |Options                                                                |Default            |
|---------------------------------|-----------------------------------------------------------------------|-------------------|
|Minimum confidence to inject     |0.0–1.0 slider                                                         |0.3                |
|Max memories injected per session|1–50                                                                   |20                 |
|Freshness gate                   |Don’t inject memories older than N days                                |90 days            |
|Memory order                     |Drag to reorder                                                        |By recency         |
|Per-memory injection toggle      |On / Off per entry                                                     |All on             |
|Injection position               |Top of system prompt / After system prompt / Before files / After files|After system prompt|

**Memory Browser injection controls:**
In the Memory Browser panel, each memory entry has:

- Enable/disable toggle for current session
- Confidence score (editable)
- Pin button (always inject, ignores confidence gate)
- Move to top (prioritize attention)
- Edit content directly
- Delete permanently
- “Refresh this” — re-confirm with the agent in the next turn

#### 19.5.3 Memory Conflict Resolution

When two memory entries conflict:

- Surfaced in Memory Browser with a “⚠ Conflict” badge
- User sees both entries side by side
- Options: Keep A / Keep B / Merge (editable merged text) / Keep Both (mark as context-dependent)
- Resolution is logged with timestamp

-----

### 19.6 Cost & Quota Control

#### 19.6.1 Budget Controls

All caps configurable at four levels: per task / per session / per day / per month.

```yaml
budget_controls:
  task:
    soft_cap: 0.50       # warn when task hits $0.50
    hard_cap: 2.00       # stop and require override at $2.00
    confirmation_threshold: 1.00  # ask before any task estimated over $1.00
  session:
    soft_cap: 5.00
    hard_cap: 10.00
  daily:
    soft_cap: 25.00
    hard_cap: 50.00
  monthly:
    soft_cap: 150.00
    hard_cap: 200.00
  low_balance_alert: 10.00  # alert when API balance < $10
```

**Hard cap behavior (user-configurable):**

- Stop completely and show cost summary
- Stop and offer to continue with a cheaper model
- Stop and wait for explicit user override (with cost display)

**Cost confirmation UX:**
When a task is estimated to exceed the confirmation threshold, before execution starts:

```
┌────────────────────────────────────────┐
│  ⚠ Cost Estimate: ~$1.40              │
│                                        │
│  This task will:                       │
│  • Touch 12 files                      │
│  • Run ~8 tool calls                   │
│  • Use Claude Opus (high effort)       │
│                                        │
│  [Proceed]  [Use cheaper model]  [Cancel] │
└────────────────────────────────────────┘
```

#### 19.6.2 Model Auto-Downgrade Rules

User-defined rules that automatically switch to a cheaper model:

```yaml
auto_downgrade:
  - condition: "estimated_cost > 1.00"
    switch_to: "claude-sonnet-4-5"
    notify: true
  - condition: "task_type == 'documentation'"
    switch_to: "antigravity_cli/gemini-3-5-flash"   # Antigravity CLI; or gemini_cli/gemini-2-flash for legacy
    notify: false
  - condition: "file_count_in_context > 30"
    switch_to: "antigravity_cli/gemini-3-5-pro"    # large context, lower cost; or gemini_cli/gemini-2-pro for legacy
    notify: true
```

#### 19.6.3 Cache Controls

|Control                   |Options                                                     |Default|
|--------------------------|------------------------------------------------------------|-------|
|Force cache-friendly mode |On / Off                                                    |Off    |
|System prompt freeze      |Lock system prompt for session (prevents cache invalidation)|Off    |
|Cache miss alert threshold|Alert when cache hit rate drops below X%                    |50%    |
|Cache debug view          |Show cache hit/miss per turn                                |Off    |

**Force cache-friendly mode** enforces:

- System prompt is never modified mid-session
- Memory injection uses a stable, sorted format
- File content is injected in consistent alphabetical order
- Eliminates the documented Claude Code caching bug pattern

#### 19.6.4 Quota Reserve

```yaml
quota_reserve:
  claude: 20%    # never use the last 20% of Claude quota
  openai: 10%
  gemini: 0%     # no reserve for Gemini
```

When quota reserve is active and the threshold is reached:

- New sessions with that model are blocked
- Existing sessions are warned
- Fallback model is offered

#### 19.6.5 Fallback Chain Control

User defines the exact fallback sequence:

```yaml
fallback_chain:
  - model: claude_code/claude-opus-4-5
    trigger: [rate_limit, quota_reserve]
  - model: anthropic_api/claude-sonnet-4-5
    trigger: [rate_limit, quota_reserve, cost_threshold]
  - model: antigravity_cli/gemini-3-5-pro   # Antigravity CLI (Google); use gemini_cli/gemini-2-pro for legacy Gemini CLI
    trigger: [rate_limit, quota_reserve, cost_threshold, error]
  - model: ollama/llama3.1
    trigger: [all]  # always available offline fallback

fallback_notification: notify  # silent / notify / always_ask
fallback_context_transfer: true  # carry conversation context to fallback model
```

-----

### 19.7 Diff & File Change Control

#### 19.7.1 Acceptance Granularity

AgentLoft offers four levels of diff acceptance granularity:

|Level          |Scope                                 |Use case                               |
|---------------|--------------------------------------|---------------------------------------|
|File level     |Accept/reject an entire file’s changes|Quick review of small files            |
|Hunk level     |Accept/reject each changed block      |Standard code review                   |
|Line level     |Accept/reject individual lines        |Surgical review of critical files      |
|Character level|Accept/reject character-level changes |Reviewing string changes, regex, config|

Default granularity is set globally and overridden per file based on protected path rules.

**Edit before accept:** In any granularity mode, user can directly edit the proposed change in the diff view before accepting. The edit is shown as a “[User modified]” annotation in the audit log.

#### 19.7.2 Auto-Accept Rules

```yaml
auto_accept:
  always:
    - "*.test.ts"       # always auto-accept test file changes
    - "*.md"            # always auto-accept documentation changes
  always_ask:
    - "src/payments/**" # always require review for payment code
    - ".env*"           # always require review for env files
  never:
    - "prisma/migrations/**"  # never auto-accept migration changes
```

#### 19.7.3 Staged Acceptance

Changes accumulate in a staging area before being written to disk:

```
Staging Area (4 files pending)
├── ✓ src/auth/jwt.ts          (accepted, ready to write)
├── ✓ src/auth/jwt.test.ts     (accepted, ready to write)
├── ⏸ src/middleware/auth.ts   (pending review)
└── ✗ src/config/db.ts         (rejected)

[Write Accepted]  [Review Pending]  [Clear All]
```

User can write accepted changes without reviewing pending ones, allowing partial acceptance.

#### 19.7.4 Timing Controls

|Control            |Options                                        |Default          |
|-------------------|-----------------------------------------------|-----------------|
|Write delay        |0–10 seconds after each write                  |0                |
|Post-write action  |Nothing / Lint / Format / Test / Custom command|Nothing          |
|Batch writes       |Write all at end of turn / Write immediately   |Write immediately|
|Change notification|System notification on write while unfocused   |On               |

**Write delay** is the “think time” feature — if set to 3 seconds, after each file write the agent pauses for 3 seconds before the next tool call. Gives the user a chance to spot problems in real time.

**Post-write actions (configurable per file pattern):**

```yaml
post_write_actions:
  "*.ts":
    - run: "npx eslint --fix {file}"
    - run: "npx prettier --write {file}"
  "*.py":
    - run: "black {file}"
    - run: "ruff check --fix {file}"
  "src/**":
    - run: "npm test -- --testPathPattern={file} --passWithNoTests"
```

-----

### 19.8 UI & UX Control

#### 19.8.1 Layout Controls

|Control               |Options                                                    |
|----------------------|-----------------------------------------------------------|
|Default layout mode   |Focus / Standard / Split / Quad / Cockpit                  |
|Panel persistence     |Remember last position per project / global / reset on open|
|Panel arrangement     |Drag any panel to any zone                                 |
|Panel visibility      |Show/hide each panel independently                         |
|Named layout profiles |Save and switch named layouts                              |
|Auto-collapse on run  |Collapse all panels when agent starts running              |
|Auto-restore after run|Restore panels when agent finishes                         |

**Layout profiles** with one-click switching from the status bar:

- **Coding** — Chat + File Tree + Diff (default)
- **Review** — Chat + Full-width Diff + Cockpit
- **Debugging** — Chat + Console + Preview
- **Autopilot** — Minimal UI, progress bar only
- **Custom** — user-defined, saved by name

#### 19.8.2 Interruption & Notification Controls

|Control                 |Options                                                            |Default            |
|------------------------|-------------------------------------------------------------------|-------------------|
|Interruption level      |Minimal / Normal / Verbose / Everything                            |Normal             |
|Permission prompts      |Always show / Batch (show at end of turn) / Show only for new types|Always show        |
|Error notifications     |Immediate / At turn end / Silent                                   |Immediate          |
|Completion notification |System notification / In-app / None                                |System notification|
|Sound alerts            |Per event type with custom sound or Off                            |Off                |
|Focus mode auto-activate|On agent run / Never / Always                                      |Never              |
|Notification cooldown   |Min seconds between notifications                                  |5s                 |

**Interruption levels explained:**

- **Minimal** — only interrupts for permission on destructive actions
- **Normal** — interrupts for permissions, errors, and task completion
- **Verbose** — also interrupts for significant decisions and cost milestones
- **Everything** — interrupts between every tool call (step-through mode)

#### 19.8.3 Chat Interface Controls

|Control                  |Options                                       |Default      |
|-------------------------|----------------------------------------------|-------------|
|Message rendering        |Markdown / Plain text / Raw (show token-level)|Markdown     |
|Timestamps               |Per message / Per session / Hidden            |Hidden       |
|Tool call verbosity      |All / Errors only / Hidden                    |All          |
|Thinking trace default   |Expanded / Collapsed / Hidden                 |Collapsed    |
|Token count display      |Per message / Per session / Hidden            |Per session  |
|Conversation view        |Linear / Tree (shows branches)                |Linear       |
|Assistant message actions|Show on hover / Always show / Hidden          |Show on hover|

#### 19.8.4 Editor Controls

|Control                  |Options                            |Default       |
|-------------------------|-----------------------------------|--------------|
|Font family              |Any system font + monospace presets|JetBrains Mono|
|Font size                |10–24px                            |14px          |
|Line height              |1.2–2.0                            |1.6           |
|Tab size                 |2 / 4 / 8                          |2             |
|Word wrap                |On / Off / At column N             |Off           |
|Minimap                  |Show / Hide                        |Show          |
|Bracket pair colorization|On / Off                           |On            |
|Diff gutter width        |Compact / Normal / Wide            |Normal        |

-----

### 19.9 Marketplace & Plugin Control

#### 19.9.1 Plugin Permission Model

Before any plugin is installed, a detailed permission review is shown:

```
Plugin: "SQL Query Renderer" v1.2.0
By: community-verified publisher

Requesting permissions:
✓ Read session messages (needed to detect SQL output)
✓ Add output renderer panel (needed to render tables)
✗ Write to active session context (not needed — denied)
✗ Network access (not needed — denied)
✗ Filesystem access (not needed — denied)

[Install with these permissions]  [Customize]  [Cancel]
```

**Permission customization:** User can grant only a subset of requested permissions. Plugin installs with reduced capability. Reduced-permission install is shown with a “⚡ Limited” badge.

#### 19.9.2 Plugin Runtime Controls

|Control              |Granularity              |Options                                    |
|---------------------|-------------------------|-------------------------------------------|
|Sandbox level        |Per plugin               |Strict (Web Worker only) / Normal / Trusted|
|Permission revocation|Per permission per plugin|Revoke any time                            |
|Auto-update          |Per plugin               |Auto / Notify / Manual only                |
|Resource limits      |Per plugin               |Max CPU%, max memory MB                    |
|Plugin enable/disable|Per plugin per session   |On / Off / Ask                             |
|Plugin execution log |Per plugin               |View all calls and responses               |

#### 19.9.3 MCP Controls

```yaml
mcp_controls:
  "filesystem-mcp":
    enabled: true
    read_paths:
      - "src/**"
      - "docs/**"
    write_paths:
      - "src/**"            # restrict writes to src only
    blocked_paths:
      - "src/payments/**"   # even if write_paths allows it
    max_calls_per_session: 100
    require_confirmation: false

  "database-mcp":
    enabled: true
    read_only: true         # override to never allow writes
    require_confirmation: true
    allowed_operations:
      - SELECT
      # INSERT, UPDATE, DELETE blocked
```

#### 19.9.4 Skill Controls

|Control                   |Options                                                                     |
|--------------------------|----------------------------------------------------------------------------|
|Variable defaults override|Set your own default for any skill variable, overriding marketplace defaults|
|Skill token budget        |Max tokens this skill can consume per invocation                            |
|Output review             |Skill outputs always go to diff review / auto-apply / ask per skill         |
|Auto-trigger confirmation |Show confirmation when a skill auto-triggers from keyword detection         |
|Skill editor              |Fork any marketplace skill to a local version                               |
|Skill disable             |Disable any installed skill without uninstalling                            |

-----

### 19.10 Security & Privacy Control

#### 19.10.1 Outbound Data Controls

**Network traffic monitor panel:**
Live feed of every outbound request:

```
[14:32:01] api.anthropic.com    POST /v1/messages    2,847 tokens → 412 tokens    $0.043
[14:32:04] api.anthropic.com    POST /v1/messages    3,102 tokens → 891 tokens    $0.051
[14:32:09] mcp.filesystem       tool: read_file      src/auth/jwt.ts              local
```

Each row expandable to show:

- Full request headers (with API key redacted)
- Request body summary (not raw content — summarized for privacy)
- Response summary

**Per-domain controls:**

```yaml
network_controls:
  allowed_domains:
    - "api.anthropic.com"
    - "api.openai.com"
  blocked_domains:
    - "*.analytics.com"  # block all analytics domains
  require_confirmation:
    - "api.openai.com"   # ask before sending to OpenAI
```

#### 19.10.2 Content Redaction Controls

```yaml
content_redaction:
  auto_scan: true
  patterns:
    - type: api_key
      action: redact
      notify: true
    - type: aws_credentials
      action: block  # block send entirely, not just redact
      notify: true
    - type: jwt_token
      action: redact
      notify: false  # silent redaction
    - type: custom
      pattern: "INTERNAL-[A-Z0-9]{8}"  # custom internal IDs
      action: redact
      replacement: "[REDACTED-INTERNAL-ID]"
      notify: false
```

**Redaction action types:**

- `redact` — replace with `[REDACTED]` before sending, continue
- `block` — refuse to send the message/file, show warning
- `warn` — send with a warning to the user first
- `silent` — redact without notifying (use sparingly)

#### 19.10.3 Local Storage Controls

|Control              |Options                                           |Default                    |
|---------------------|--------------------------------------------------|---------------------------|
|Memory encryption    |None / OS Keychain / Full AES-256                 |OS Keychain                |
|Session retention    |Keep forever / Last N sessions / Older than N days|Keep forever               |
|Memory purge schedule|Never / Purge low-confidence after N days         |Never                      |
|Data directory       |Any path                                          |~/.agentloft             |
|Telemetry            |Off / Crash reports only / Full (anonymized)      |Off                        |
|Export everything    |Export all data as ZIP                            |Available on demand        |
|Delete everything    |Nuclear option — wipes all AgentLoft data       |Requires typed confirmation|

#### 19.10.4 Air-Gap Mode Controls

When air-gap mode is active:

- All external API calls are blocked at the Rust network layer
- Only Ollama and LM Studio endpoints (localhost) are permitted
- Features that require external APIs are hidden from UI (not just grayed out)
- A clear “AIR-GAPPED” indicator in the status bar
- Whitelist exceptions: specific local network IPs can be allowed (for on-premise deployments)

-----

### 19.11 Multi-Agent Control

#### 19.11.1 Per-Agent Configuration

Each agent in an orchestration is independently configurable:

```yaml
agents:
  architect:
    model: claude_code/claude-opus-4-5
    effort: high
    system_prompt_variant: "architect"
    file_read_scope: "**"
    file_write_scope: "docs/architecture/**"
    bash_allowed: false
    max_turns: 5
    token_budget: 20000

  builder:
    model: anthropic_api/claude-sonnet-4-5
    effort: medium
    file_write_scope: "src/**"
    bash_allowed: true
    bash_allowlist: ["npm test", "npm run build"]
    max_turns: 30
    token_budget: 80000

  reviewer:
    model: openai_api/gpt-4o
    effort: high
    file_write_scope: []    # read-only agent
    bash_allowed: false
    max_turns: 5
```

#### 19.11.2 Inter-Agent Communication Controls

|Control                       |Options                                   |Default            |
|------------------------------|------------------------------------------|-------------------|
|Shared scratchpad access      |Read+Write / Read only / None (per agent) |Read+Write         |
|Agent messaging               |Allow / Block / Log only                  |Allow              |
|File lock system              |Manual / Automatic / Off                  |Automatic          |
|Conflict resolution           |Ask user / Latest wins / Architect decides|Ask user           |
|Agent A reads Agent B’s writes|Immediate / After turn boundary / Never   |After turn boundary|

#### 19.11.3 Orchestration Execution Controls

|Control                   |Options                                       |Default      |
|--------------------------|----------------------------------------------|-------------|
|Spawn delay between agents|0–30 seconds                                  |0            |
|Max parallel agents       |1–10                                          |3            |
|Task decomposer review    |Always review / Auto-approve / Never decompose|Always review|
|Individual agent pause    |Pause specific agent while others continue    |Available    |
|Individual agent kill     |Kill specific agent without stopping others   |Available    |
|Resource fairness         |Equal token budgets / Weighted / Manual       |Manual       |

**Task decomposer review UI:**
Before agents are spawned, user sees the proposed decomposition:

```
┌──────────────────────────────────────────────────────┐
│  Task: "Build user authentication module"             │
│                                                      │
│  Proposed decomposition:                             │
│  ① Architect — Design API contracts      (Claude O) │  ← edit/delete
│  ② Builder   — Implement JWT handling    (Claude S) │
│  ③ Tester    — Write auth test suite     (GPT-4o)  │
│  ④ Reviewer  — Security audit            (Claude O) │
│                                                      │
│  + Add agent                                        │
│                                                      │
│  [Approve & Spawn]  [Edit]  [Cancel]                │
└──────────────────────────────────────────────────────┘
```

-----

### 19.12 Automation & Flows Control

#### 19.12.1 Execution Mode Controls

|Control            |Options                                        |Default              |
|-------------------|-----------------------------------------------|---------------------|
|Execution mode     |Run / Step-through / Dry run                   |Run                  |
|Breakpoints        |Set on any node                                |None                 |
|Variable inspector |View/edit at any pause point                   |Available when paused|
|Error handling     |Stop / Skip / Retry / Ask / Fallback (per node)|Ask                  |
|Timeout per node   |5s–3600s (per node override)                   |60s                  |
|Max retries        |0–10 per node                                  |3                    |
|Loop max iterations|1–100                                          |10                   |

**Step-through mode UI:**
Each node shows before execution:

```
┌──────────────────────────────────────────────┐
│  ▶ Next step: run_tests                      │
│                                              │
│  Type: bash                                  │
│  Command: npm test -- --reporter=json        │
│                                              │
│  Variables in scope:                         │
│  feature = "oauth-login"                     │
│  last_output = [agent response text...]      │
│                                              │
│  [Execute]  [Edit]  [Skip]  [Stop Flow]     │
└──────────────────────────────────────────────┘
```

#### 19.12.2 Trigger Controls

```yaml
flow_triggers:
  git_pre_commit:
    enabled: true
    conditions:
      - "changed_files match src/**"   # only trigger if src/ changed
      - "changed_files count < 20"     # don't trigger for massive commits
    cooldown_minutes: 1
    confirmation: false  # run silently

  file_watch:
    enabled: false
    pattern: "src/api/**/*.ts"
    debounce_ms: 2000  # wait 2s after last change before triggering
    confirmation: true  # always ask before running

  schedule:
    enabled: false
    cron: "0 9 * * 1-5"  # weekdays at 9am
    timezone: "America/New_York"
    confirmation: false
```

#### 19.12.3 Flow Variable Controls

- **Variable editor**: view and edit all flow variables at any pause point
- **Variable types**: string / number / boolean / file / enum / secret (masked in UI)
- **Variable defaults**: set project-level defaults for common variables
- **Variable validation**: regex or range validation on input variables
- **Secret variables**: values are masked in logs and UI, never exported in plain text

-----

### 19.13 Session & History Control

#### 19.13.1 Replay Controls

|Control            |Options                                                                     |
|-------------------|----------------------------------------------------------------------------|
|Playback speed     |0.25x / 0.5x / 1x / 2x / 5x / 10x / Frame-by-frame                          |
|Event filter       |All / File writes only / Bash only / Errors only / Cost spikes only / Custom|
|Replay annotation  |Add timestamped notes at any replay position                                |
|Replay privacy mode|Strip message content / Strip file content / Show everything                |
|Auto-pause on      |Errors / Cost spikes / File writes / Never                                  |

**Frame-by-frame mode:** advance the replay one tool call at a time, regardless of timing.

#### 19.13.2 Branch Controls

|Control                 |Options                                                  |
|------------------------|---------------------------------------------------------|
|Branch naming           |Auto-generated or user-provided label                    |
|Branch visibility       |Show all / Current only / Side-by-side comparison        |
|Branch color coding     |Each branch gets a unique color in the tree view         |
|Branch merge            |Attempt merge of two branches’ file changes              |
|Branch pruning          |Auto-delete branches with no commits after N days / never|
|Max branches per session|1–50                                                     |

#### 19.13.3 Search & Filter Controls

Session search advanced filters:

```
Search: [oauth login fix           ]

Filters:
  Date:      [Last 7 days ▼]
  Model:     [Any ▼]
  Project:   [agentloft-backend ▼]
  Cost:      [$0.00] to [$10.00]
  Duration:  [Any ▼]
  Has:       [☑ File writes] [☑ Errors] [☐ Bash commands] [☐ Regressions]

Sort:        [Most relevant ▼]
```

#### 19.13.4 Export Controls

|Export format       |Contents                  |Controls                        |
|--------------------|--------------------------|--------------------------------|
|JSON                |Full session data         |Select which fields to include  |
|Markdown / Blog post|Auto-formatted walkthrough|Choose code inclusion level     |
|Video (MP4/GIF)     |Animated replay           |Set resolution, speed, watermark|
|GitHub Gist         |Key prompts + diffs       |Select which turns to include   |
|CSV                 |Cost and timing data      |Date range selection            |

**Privacy controls on export:**

- Strip message content (show only tool calls and diffs)
- Strip file contents (show only filenames)
- Strip cost data
- Strip model names
- Anonymize timestamps

-----

### 19.14 Control Center & Control Profiles

#### 19.14.1 The Control Center

Accessible via `⌘,` (Settings). Organized into the same sections as this document (19.2–19.13). Each section has:

- **Plain-English summary** at the top: “With these settings, the agent will ask before every bash command, auto-accept test file changes, and hard-stop if the session exceeds $10.”
- **Quick toggles** for the most common controls without scrolling into sub-settings
- **Advanced toggle**: reveals the full control surface for that section
- **Reset to default**: per section or global
- **Import / Export**: share settings as a `.vscfg` file

#### 19.14.2 Control Profiles

Named configurations that can be switched with one click from the status bar:

**Built-in profiles:**

|Profile         |Description                                        |Key settings                                                                              |
|----------------|---------------------------------------------------|------------------------------------------------------------------------------------------|
|**Autopilot**   |Maximum autonomy, minimum interruption             |No confirmation except destructive actions, auto-accept most diffs, silent cost management|
|**Balanced**    |The default — reasonable autonomy with safety rails|Ask for bash, review multi-file diffs, cost warnings on                                   |
|**Review Mode** |Everything pauses at diffs — full inspection       |Every diff requires approval, speculation mode on, write delay 5s                         |
|**Lockdown**    |Maximum oversight — agent waits at every step      |Step-through execution, every tool call requires approval, no auto-accept                 |
|**Budget Saver**|Optimize for cost                                  |Auto-downgrade to cheaper models, hard cap $2/session, verbose cache controls             |
|**Speed Run**   |Optimize for velocity                              |Auto-accept all diffs, no confirmation, max effort, no write delay                        |

**Custom profiles:**

- Create from current settings
- Name and describe
- Assign a keyboard shortcut
- Share as `.vscfg` on Marketplace
- Per-project profile: different profile for different repos

**Profile inheritance:**
Profiles can extend other profiles and override specific settings:

```yaml
profile: "my-production-profile"
extends: "lockdown"
overrides:
  bash_controls.always_allow:
    - "^npm test.*"
  cost.hard_cap: 5.00
```

#### 19.14.3 Context-Aware Profile Suggestions

AgentLoft notices patterns and suggests profile switches:

- “You’ve been approving every tool call for the last 20 minutes. Switch to Step-through mode?”
- “This session cost $8 — consider switching to Budget Saver for the rest of the task”
- “You’re running tests on a protected branch. Lockdown mode is recommended”

User can dismiss, apply once, or set as default for the detected context.

-----

### 19.15 Control Data Model

#### 19.15.1 ControlProfile Schema

```typescript
interface ControlProfile {
  id: string;
  name: string;
  description: string;
  icon?: string;
  keyboard_shortcut?: string;
  extends?: string;                  // parent profile ID
  is_builtin: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  model_behavior: ModelBehaviorControls;
  context: ContextControls;
  agent_behavior: AgentBehaviorControls;
  memory: MemoryControls;
  cost: CostControls;
  diff: DiffControls;
  ui: UIControls;
  marketplace: MarketplaceControls;
  security: SecurityControls;
  multi_agent: MultiAgentControls;
  flows: FlowControls;
  session: SessionControls;
}
```

#### 19.15.2 ModelBehaviorControls

```typescript
interface ModelBehaviorControls {
  default_effort: 'low' | 'medium' | 'high' | 'max';
  default_temperature: number;        // 0.0–1.0
  default_top_p: number;             // 0.0–1.0
  show_thinking_trace: boolean;
  response_length: 'brief' | 'normal' | 'detailed' | 'exhaustive';
  stop_sequences: string[];
  system_prompt_variant_id?: string;
  tool_controls: {
    [tool_type: string]: {
      enabled: boolean;
      confirmation: 'always' | 'once' | 'allow' | 'block';
      timeout_ms: number;
    }
  };
  max_tool_calls_per_turn: number;
  bash_allowlist: string[];
  bash_blocklist: string[];
  network_allowed_domains: string[];
}
```

#### 19.15.3 ContextControls

```typescript
interface ContextControls {
  file_inclusion_rules: FileInclusionRule[];
  file_size_cap_kb: number;
  context_composition_order: ContextSection[];
  section_budgets: { [section: string]: number };
  summarization_mode: 'auto' | 'ask' | 'manual' | 'never';
  summarization_trigger_pct: number;
  eviction_priority: ContextSection[];
  snapshot_frequency: 'every_session' | 'manual' | 'never';
  resume_behavior: 'ask' | 'auto' | 'never';
  memory_injection_enabled: boolean;
  memory_injection_position: 'top' | 'after_system' | 'before_files' | 'after_files';
  pinned_content: PinnedContent[];
  heartbeat_interval_turns: number;
  protected_paths: string[];
}
```

#### 19.15.4 CostControls

```typescript
interface CostControls {
  task_soft_cap_usd: number;
  task_hard_cap_usd: number;
  session_soft_cap_usd: number;
  session_hard_cap_usd: number;
  daily_soft_cap_usd: number;
  daily_hard_cap_usd: number;
  monthly_soft_cap_usd: number;
  monthly_hard_cap_usd: number;
  confirmation_threshold_usd: number;
  hard_cap_behavior: 'stop' | 'offer_cheaper' | 'require_override';
  auto_downgrade_rules: AutoDowngradeRule[];
  force_cache_friendly: boolean;
  cache_miss_alert_threshold_pct: number;
  fallback_chain: FallbackEntry[];
  fallback_notification: 'silent' | 'notify' | 'ask';
  quota_reserves: { [model_id: string]: number };
  low_balance_alert_usd: number;
}
```

#### 19.15.5 AgentBehaviorControls

```typescript
interface AgentBehaviorControls {
  speculation_mode: 'always' | 'large_tasks' | 'on_request' | 'never';
  speculation_large_task_threshold: number;  // file count
  scope_limiter?: string;               // glob pattern
  pre_task_conditions: PreTaskCondition[];
  pause_resume_available: boolean;
  live_tool_edit_enabled: boolean;
  redirect_mid_session: boolean;
  write_delay_ms: number;
  post_write_actions: PostWriteAction[];
  assumption_logger_enabled: boolean;
  repetition_detector_enabled: boolean;
  drift_guard_enabled: boolean;
  regression_shield_enabled: boolean;
  blast_radius_preview: 'always' | 'large_changes' | 'never';
  surgical_mode: boolean;
  checkpoint_auto_interval_turns: number;
}
```

-----

*This section (19) defines AgentLoft’s core differentiator: the belief that control and autonomy are not opposites. A well-designed control system enables more autonomy by making it trustworthy. Users who trust their tools go further with them.*

-----

## 20. Visual Design System

> **Status:** Approved. All component implementations must reference this section as the canonical token source.

### 20.1 Design Philosophy

**Glassmorphism first** — translucent panels with heavy blur create layered depth. The background gradient is always visible through surfaces.

**Developer Workbench Constraint:** AgentLoft competes on trust, observability, and long-session usability. Visual polish must never reduce readability or make the app feel like a demo wrapper.

- **Workbench first** — dense, scannable information surfaces beat decorative presentation
- **Legibility over glass** — if blur/transparency lowers contrast in transcript, diff, token, permission, or context panels, increase opacity for that panel
- **No decorative-only elements in core work views** — glow/orb effects may appear in empty states, but not behind dense transcript, diff, file, context, or permission surfaces
- **Accessibility is v1** — transcript text, diffs, warnings, permission prompts, and token/cost indicators must meet practical contrast and sizing requirements before release
- **Theme extensibility** — glassmorphism is the signature theme; the architecture must support a high-contrast "Workbench" theme for daily use

### 20.2 Color System

**Background canvas (gradient — always visible through glass):**

```css
background: linear-gradient(135deg,
  #0d0d24 0%, #1a0a30 25%, #0f1a2e 50%, #0a1f1a 75%, #1a0a20 100%);
```

Decorative glow orbs behind glass:
```css
/* Top-right */  radial-gradient(circle, rgba(124,199,160,0.12), transparent 70%)
/* Bottom-left */radial-gradient(circle, rgba(100,150,255,0.10), transparent 70%)
```

**Glass panel backgrounds:**

| Element | Background | backdrop-filter | Border |
|---------|-----------|-----------------|--------|
| Side panels | rgba(255,255,255,0.04) | blur(24px) | rgba(255,255,255,0.03) |
| Center panel | rgba(255,255,255,0.02) | blur(20px) | rgba(255,255,255,0.03) |
| Bottom bar | rgba(255,255,255,0.02) | blur(20px) | rgba(255,255,255,0.04) top |
| Top bar | rgba(255,255,255,0.03) | blur(30px) | rgba(255,255,255,0.06) bottom |
| Input bar | rgba(255,255,255,0.03) | blur(16px) | rgba(255,255,255,0.06) |
| Tool buttons | rgba(255,255,255,0.04) | blur(8px) | rgba(255,255,255,0.03) |
| Active tab | rgba(124,199,160,0.06) | blur(4px) | rgba(124,199,160,0.04) |

**Accent color:** `#7cc7a0` (Mint Green)
- Used for: active file highlight (2px left border), agent indicator dot, inline diff accept, toggle on, selection, links, focus rings, progress bars
- Opacity variants: rgba(124,199,160, 0.03–0.15) for backgrounds, 0.04–0.10 for borders

**Semantic colors:**
- Green (diff add, success): `#27c93f`
- Red (diff remove, error): `#ff5f56`
- Yellow (warning): `#ffbd2e`
- Blue (active state bg): rgba(100,150,255, 0.08–0.10)

**Text colors:**

| Token | Color | Usage |
|-------|-------|-------|
| Primary | rgba(255,255,255, 0.70–0.75) | Panel headers, file names |
| Secondary | rgba(255,255,255, 0.35–0.45) | Labels, captions |
| Tertiary | rgba(255,255,255, 0.15–0.25) | Meta info, muted labels |
| Placeholder | rgba(255,255,255, 0.25) | Input placeholders |
| Agent name | #7cc7a0 | Agent identity badge |

### 20.3 Typography System

| Role | Font Stack | Weight | Size | Usage |
|------|-----------|--------|------|-------|
| UI Labels | Inter, -apple-system, sans-serif | 500 | 9–11px | Panel headers, tabs, buttons |
| Body text | Inter, -apple-system, sans-serif | 400 | 11px | Chat messages, descriptions |
| Code | JetBrains Mono, ‘Fira Code’, monospace | 400 | 9–10px | Diffs, tool calls, file paths |
| Narrative | Georgia, ‘Times New Roman’, serif | 400 | 11px | Agent decision text, summaries |

Line height: 1.5 (body/code), 1.2 (labels). Uppercase labels: 0.5px letter-spacing.

**Font licensing:** Inter (SIL OFL 1.1, free commercial use). JetBrains Mono (SIL OFL, free commercial use). Georgia (system font, no license). No proprietary fonts bundled.

### 20.4 Glassmorphism Blur Levels

| Level | backdrop-filter | Usage |
|-------|-----------------|-------|
| Heavy | blur(24–30px) | Top bar, side panels |
| Medium | blur(16–20px) | Center panel, bottom bar, input |
| Light | blur(8–12px) | Cards inside panels, buttons |
| Subtle | blur(4px) | Active tab, hover states |

All glass borders are 1px solid. Depth comes from blur differentials, gradient orb visibility, and border highlights — no reflection pseudo-elements.

### 20.5 Layout System (Bento Grid)

```css
grid-template-columns: 200px 1fr 240px;
grid-template-rows: 1fr auto;
gap: 1px;
```

- Left (200px): file explorer, project tree
- Center (1fr): chat / conversation thread
- Right (240px): agent activity, token/cost gauge
- Bottom (auto): tab bar spanning all columns

Panel inner padding: 10px. Card inner padding: 6–8px. Stack spacing: 6–8px.

### 20.6 Corner Rounding

| Radius | Usage |
|--------|-------|
| 3–4px | Badges, scope tags, meta labels |
| 5–7px | Buttons, tool buttons, cards |
| 8–12px | Panels, input bar, main window |
| 14px | Outer window border |

### 20.7 Required Control Surfaces

These high-density panels are the product’s competitive advantage over raw CLI usage. They must remain readable at default theme in laptop scale. Decorative blur/glass must auto-reduce if it interferes with scanning.

| Surface | Design requirement |
|---------|--------------------|
| Transcript timeline | Dense, virtualized, searchable event stream; clear hierarchy for user/agent/tool/diff/token frames |
| Context inspector | Table/tree with token counts, source, last reference, scope, pin/remove/summarize actions |
| Token dashboard | Always-visible status readout + expandable per-turn/per-item breakdown |
| Permission approval queue | High-contrast risk cards with args, affected files, impact estimate, allow/deny/modify |
| MCP inspector | Server list, status badges, transport labels, logs, tool schemas, auth/timeout errors |
| Session grid | Compact cards: status, cost, branch, changed files, duration, waiting/blocked state |
| Diff review | Side-by-side and unified modes; accept/reject per hunk; conflict indicators |
| Replay/export view | Timeline scrubber, event filters, redaction toggles, export preview |
| Config hub | Scannable settings tables with scope badges, inherited values, override arrows, errors |

### 20.8 Shadows & Animation

**Outer window shadow only:**
```css
box-shadow: 0 20px 60px rgba(0,0,0,0.5);
```
No shadow on individual panels — depth comes from blur differential.

**Animation timings:**
- Panel open/close: 200ms ease-out opacity + transform
- Hover: 150ms background-color transition
- Tab switch: 200ms crossfade
- Agent thinking pulse: 1.5s slow CSS opacity animation
- Scrollbar: 4px width, transparent track, rgba(255,255,255,0.08) thumb, visible on hover only

### 20.9 Iconography

Implementation phase: Feather Icons (MIT license, 16px inline / 18px standalone). Attribution in app About dialog and NOTICE file: *"Feather Icons — MIT License — https://feathericons.com"*.

### 20.10 Dark Mode & Theme Extensibility

Dark mode only in v1. Glassmorphism is designed for dark backgrounds. Architecture must support a high-contrast "Workbench" theme via CSS custom properties — all color and blur values must be tokenized (no hardcoded values in component files). Light mode deferred to v2.

-----

## 21. Legal & Compliance

> **Status:** Required before v1 public release. Items marked P0 are launch blockers. Items marked P1 must be resolved before any paid tier or marketplace goes live.

### 21.1 CLI Wrapping License Review (P1)

AgentLoft wraps Claude Code CLI, OpenAI Codex CLI, and Antigravity CLI as child processes. Wrapping a CLI in a GUI does not constitute derivative work under most licenses, but each vendor’s EULA must be reviewed:

| CLI | License concern | Required action |
|-----|----------------|----------------|
| **Claude Code** (Anthropic) | Anthropic’s EULA may restrict commercial wrapping or resale | Review EULA §1–3; confirm AgentLoft free tier is compliant; confirm paid tier does not constitute "reselling API access" |
| **Codex CLI** (OpenAI) | OpenAI usage policies prohibit certain use cases; wrapping may require attribution | Review OpenAI Terms §2; verify no "service wrapper" prohibition applies |
| **Antigravity CLI** (Google) | Google’s Terms of Service govern API usage even when CLI is the user-facing tool | Review Google AI Studio Terms; confirm AgentLoft does not facilitate ToS violations |

**Architecture note:** If any CLI’s EULA restricts bundling, the adapter for that CLI must be architected as a community-maintained plugin (shifting liability to the user) rather than a bundled first-party integration. The plugin architecture (§7.6) already supports this.

### 21.2 Plugin JavaScript / WebAssembly Sandbox (P0)

Any plugin runtime that executes third-party code is a critical security and compliance surface. The WASM sandbox spec (§7.6.3) covers the technical design. Compliance requirements:

- [ ] Declarative permission model documented and enforced at runtime — not just install time
- [ ] `npm` dependency tree scanning before marketplace acceptance
- [ ] No plugin may access OS keychain, `~/.ssh/`, or any path outside declared permissions
- [ ] Marketplace Terms of Service for plugin developers must explicitly prohibit data exfiltration
- [ ] Incident response plan: process for emergency revocation of a published plugin

### 21.3 Export Controls (P0)

AI models and API access may be subject to US Export Administration Regulations (EAR) and ITAR:

- **Ollama / Hugging Face model downloads**: Some open-weight models are subject to US export controls. AgentLoft must display model licenses before download and implement geoblocking for models restricted in comprehensively embargoed jurisdictions under US EAR: **Cuba, Iran, North Korea, Syria**, and the Crimea/Donetsk/Luhansk regions. Note: Russia is **not** a comprehensive EAR embargo — it has targeted OFAC sectoral sanctions on specific entities and industries, but general software use is not prohibited. Do not implement blanket Russia geoblocking; instead, screen against the OFAC SDN (Specially Designated Nationals) list for any commercial transactions in the Cloud tier.
- **API access**: AgentLoft does not provide API keys — users provide their own. This materially reduces export control exposure, but the app must not facilitate access for users in prohibited jurisdictions.
- **Required**: Terms of Service section stating user’s responsibility for compliance with their local jurisdiction’s export control and sanctions laws. Cloud tier requires OFAC SDN screening at account creation.

### 21.4 Data Privacy — Local-First Claim (P0)

AgentLoft’s "local-first" claim (§7.16.1, §9.5) requires the following to be verifiably true:

| Claim | Verification required |
|-------|----------------------|
| No telemetry | Code audit: no analytics SDK bundled; no network calls to AgentLoft servers in free tier |
| No cloud sync by default | Settings UI must have cloud sync **off by default** with explicit opt-in |
| No hosted crash reports | Crash recovery (§7.19) writes to local disk only |
| Manifest fetch (update check) | Must use `HEAD` / 304-Not-Modified; no tracking parameters in URL; privacy policy must disclose what the server logs |

**Autosave & crash recovery data:** Session files (`messages.jsonl`, `context.json`) may contain API keys, code snippets, or private data. Storage location and retention period must be configurable (§9.5). Autosaved drafts must be excluded from any cloud sync feature by default.

**Session export / share (§7.15.3):** Exports must run a redaction pass before any data leaves the machine. Redaction must cover: API keys, env vars, tokens, private keys, cookies, MCP credentials, and absolute file paths (when anonymization is enabled).

**Zero-Waste share card (§7.21.7):** The shareable PNG export card must contain only aggregate numeric metrics (tokens saved, compression ratios, session count). It must not include session IDs, project names, file paths, model names, or any content that could identify the user's codebase or employer. Pre-export preview must clearly show all data included in the PNG.

**AI provider data transmission — disclosure required (P0):** AgentLoft's local-first claim applies to data stored by AgentLoft. It does not apply to data sent to third-party AI providers (Anthropic, OpenAI, Google) during normal operation. The Privacy Policy must explicitly state: (1) which features send data to which third-party providers; (2) that Anthropic/OpenAI/Google's own privacy policies and data retention terms govern that data; (3) that memory extraction (§7.3.2) sends session content to the user's configured AI provider for extraction processing. Users who want fully offline operation must use local models (Ollama, LM Studio) exclusively — the app must surface this clearly in the Privacy section of Settings.

### 21.5 Agentmemory & Graphify — Privacy (P1)

**Agentmemory (§7.3.8):** All 4 tiers stored locally. No data leaves the machine unless AgentLoft Cloud sync is explicitly enabled. The GUI must show a "Memory data is stored locally at [path]" indicator in the Memory panel.

**Graphify (§7.3.7):** Background indexing runs on project open. Must:
- Respect `.gitignore` and `.agentloftignore` for excluded paths
- Respect user-denied paths (from Permission Matrix)
- **LLM semantic extraction is opt-in per project** — the UI must present a clear prompt: "Allow AgentLoft to send file summaries to [model] for semantic annotation?" before the first semantic extraction run

### 21.6 Open Source Dependency Compliance (P1)

| Dependency | License | Compliance action |
|-----------|---------|------------------|
| Tauri framework | MIT + Apache 2.0 | Attribution in NOTICE file; dual-license, use MIT terms for distribution |
| Monaco Editor (Microsoft) | MIT | Attribution in NOTICE file and About dialog; copyright notice must be preserved |
| xterm.js | MIT | Attribution in NOTICE file; required for PTY fallback (§7.0.2) |
| ONNX Runtime | MIT | Attribution in NOTICE file; covers bundled embedding model inference |
| tree-sitter | MIT | Attribution in NOTICE file; used by Graphify (§7.3.7) AST parsing |
| Playwright | Apache 2.0 | Attribution in NOTICE file; used by Visual Testing (§7.11); no copyleft concerns |
| RTK (rtk-ai/rtk) | MIT | Attribution in NOTICE file; §7.21.2 explicitly derives 100+ filter rules from RTK — attribution must be in-app in the Terminal Output Filter settings panel, not only in NOTICE |
| Caveman (juliusbrussee/caveman) | MIT | Attribution in NOTICE file and in the Marketplace listing for the bundled Caveman skill; §7.6.2 bundles it as a pre-installed skill |
| Agentmemory (rohitg00/agentmemory) | Apache 2.0 | Attribution in NOTICE file; no copyleft propagation concerns |
| Graphify package | **Audit required** | Verify license before bundling; audit all transitive Python dependencies for GPL/AGPL |
| LanceDB | Apache 2.0 | Attribution in NOTICE file |
| Feather Icons | MIT | Attribution already specified in §20.9 |
| Inter / JetBrains Mono fonts | SIL OFL 1.1 | No commercial restrictions; attribution in About dialog |
| Bundled Python runtime | PSF License | Commercial use permitted; security update obligation |
| **Context Mode (mksglu/context-mode)** | **ELv2 (Elastic License 2.0)** | **Legal review required.** ELv2 prohibits: (a) providing the software as a managed/hosted service, (b) using it in a product that competes substantially with the original. AgentLoft's native `vs_execute` (§7.21.8) re-implements the same paradigm under MIT — that is compliant. Surfacing Context Mode as a "featured partner MCP" in the Marketplace requires confirming this does not constitute prohibited competitive use. Do not list Context Mode in the Marketplace until legal review is complete. |

**SBOM requirement:** AgentLoft v1 must ship a Software Bill of Materials (SBOM) in SPDX format, generated as part of the release pipeline. This covers all bundled dependencies including the Graphify Python runtime, ONNX model, and all Rust/npm transitive dependencies.

### 21.7 vs_execute Code Execution Liability (P1 — Before v2)

§7.21.8 introduces `vs_execute`, an MCP tool that allows AI agents to autonomously write and execute arbitrary code (12 languages) inside a Docker sandbox. This is a fundamentally higher-risk surface than plugin sandboxing because the code is written by an AI, not a vetted human developer.

**Required before v2 ships:**

- [ ] **ToS clause — agent-written code execution**: The Terms of Service must explicitly state that AgentLoft provides the execution environment but bears no liability for the behavior, output, or side effects of code autonomously written by AI agents and executed via `vs_execute`. User assumes full responsibility.
- [ ] **Sandbox escape disclosure**: The Privacy Policy / Security section must acknowledge that Docker sandbox escapes are a known category of risk, describe the mitigations in place (rootless Docker, seccomp profile, no network by default), and state that AgentLoft cannot guarantee perfect isolation.
- [ ] **Execution scope limits documented**: The permitted resource limits (§7.21.8: `timeout_ms` max 30,000; no persistent filesystem by default; no outbound network unless explicitly allowed) must be disclosed to the user before they enable `vs_execute`.
- [ ] **Opt-in activation**: `vs_execute` must be explicitly opt-in per project (disabled by default), with a confirmation dialog summarizing the above risks on first enable.

### 21.8 GDPR & Cloud Data Compliance (P1 — Before Cloud Launch)

AgentLoft Cloud (v3) handles persistent memory sync, session sharing, and team collaboration for users globally, including EU residents. GDPR obligations apply from the moment any EU user's data is processed.

**Required before AgentLoft Cloud v3 launches:**

- [ ] **Data Processing Agreement (DPA)**: Publish a standard DPA template for Team/Enterprise customers. Must cover: data controller / processor roles, processing purposes, sub-processors (infrastructure providers), data subject rights, breach notification timeline (72 hours).
- [ ] **Right to erasure**: Cloud memory sync must support a "Delete all my cloud data" action that is complete and verifiable within 30 days. Local data is user-controlled; cloud copies must be erasable on request.
- [ ] **Data residency option**: Enterprise tier must offer EU data residency (servers in EU). This is a common requirement for regulated industries and governments.
- [ ] **Privacy Policy**: Must specify data retention periods for Cloud, list all sub-processors (Stripe for payments, infrastructure CDN, etc.), and include a GDPR-compliant consent mechanism for EU users.
- [ ] **CCPA compliance**: California users have the right to know what personal data is collected and to opt out of sale. AgentLoft Cloud does not sell data, but this must be stated explicitly.

### 21.9 AGPL Contamination Prevention (P1 — Before First External PR Merged)

Opcode (§14.6), AgentLoft's most direct architectural competitor, is licensed under AGPL-3.0. Opcode uses the same Tauri 2 + Rust + React stack. If any contributor to AgentLoft unknowingly copies code, UI patterns, or logic from Opcode's AGPL codebase, AGPL's copyleft would require AgentLoft to relicense its modifications under AGPL — directly conflicting with the MIT core and creating a legal crisis at the worst possible moment.

**Required in `CONTRIBUTING.md` before the repository goes public:**

- [ ] Explicit prohibition: "Do not copy, port, or derive code from any AGPL-licensed project (including but not limited to Opcode/Claudia). If you are unsure whether a pattern is independently developed, ask in the PR discussion before submitting."
- [ ] License compatibility checklist in the PR template: contributors must confirm they have not used AGPL source material.
- [ ] Automated license scanning in CI: `cargo-deny` (Rust) and `license-checker` (npm) must run on every PR and fail on any AGPL or GPL-licensed transitive dependency introduced without prior approval.
- [ ] Approved license list: MIT, Apache 2.0, ISC, BSD-2, BSD-3, SIL OFL, PSF, CC0. Any new license type requires core team approval before merging.

### 21.10 AI-Generated Code Ownership (P1 — Before v1 Launch)

AgentLoft facilitates AI-assisted code generation via Claude Code (Anthropic), Codex CLI (OpenAI), and Antigravity CLI (Google). The ownership and licensing status of AI-generated code varies by jurisdiction, provider, and is still being actively litigated globally.

**Required in the Terms of Service:**

- [ ] **Ownership deferral clause**: AgentLoft takes no position on who owns AI-generated code produced through AgentLoft. Users are responsible for reviewing and complying with their AI provider's content ownership terms (Anthropic's usage policy, OpenAI's terms §3, Google's Generative AI terms).
- [ ] **No warranty on generated code**: AgentLoft does not warrant that AI-generated code is original, non-infringing, or fit for any particular purpose. Users are responsible for reviewing generated code before use in production.
- [ ] **Git attribution (§7.14.5)**: The AI change attribution feature in git logs (model, session ID, cost metadata) is a transparency feature only and does not constitute a legal assertion of authorship.

### 21.11 Remediation Priority Summary

| Priority | Item | Section |
|----------|------|---------|
| P0 — Launch blocker | Plugin WASM sandbox fully implemented + ToS | §7.6.3, §21.2 |
| P0 — Launch blocker | Local-first claim verifiable (no phone-home) | §21.4 |
| P0 — Launch blocker | AI provider data transmission disclosed in Privacy Policy | §21.4 |
| P0 — Launch blocker | Export controls section added to user-facing ToS + OFAC SDN note | §21.3 |
| P0 — Launch blocker | Graphify semantic extraction requires explicit opt-in | §21.5 |
| P1 — Before v1 | CLI wrapping EULA review completed | §21.1 |
| P1 — Before v1 | AGPL contamination prevention policy in CONTRIBUTING.md + CI license scan | §21.9 |
| P1 — Before v1 | AI-generated code ownership disclaimer in ToS | §21.10 |
| P1 — Before v1 | SBOM generated and published with v1 release | §21.6 |
| P1 — Before v1 | All 14 NOTICE file attributions complete (RTK, Caveman, Monaco, xterm.js, ONNX, Tauri, tree-sitter, Playwright + existing 6 — Context Mode excluded: ELv2, not bundled) | §21.6 |
| P1 — Before marketplace | Plugin marketplace DMCA policy published | §21.2 |
| P1 — Before marketplace | Graphify transitive dependency audit | §21.6 |
| P1 — Before marketplace | Context Mode (ELv2) legal review before Marketplace listing | §21.6 |
| P1 — Before v2 | vs_execute opt-in activation + ToS liability clause + sandbox disclosure | §21.7 |
| P1 — Before Cloud | GDPR: DPA template, right to erasure, data residency option, Privacy Policy update | §21.8 |
| P1 — Before Cloud | BSL/SSPL/custom license decision documented and communicated | §17.1 |
| P2 — Post-launch | Manifest fetch privacy spec + server-side logging policy | §21.4 |
| P2 — Post-launch | Session export redaction audit | §21.4 |
| P2 — Post-launch | Zero-Waste share card data exposure audit (no identifying fields in PNG) | §21.4 |

-----

*Document maintained by the AgentLoft founding team. For questions, open a GitHub Discussion.*

*AgentLoft is an independent open-source project and is not affiliated with Anthropic, OpenAI, or Google.*