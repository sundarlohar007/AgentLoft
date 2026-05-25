# AgentLoft Constitution

## Core Principles

### I. Transparency Over Magic
Every agent action is visible, inspectable, and reversible. AgentLoft SHALL render every tool call, file change, and permission request as a visual component. No hidden agent behavior. No black-box outputs.

### II. Bring Your Own Keys
AgentLoft SHALL NOT require any AgentLoft-specific subscription or payment to use core features. Users connect their own API keys and subscriptions. Zero lock-in. Zero AgentLoft-managed billing for core agent functionality.

### III. Local-First
All memory, context, and session data SHALL be stored on the user's machine by default. No data SHALL be sent to AgentLoft servers without explicit opt-in. LanceDB, SQLite, and filesystem storage only. Telemetry MUST be opt-in.

### IV. Model-Agnostic
AgentLoft SHALL treat all AI providers equally. Claude Code, Codex CLI, Antigravity CLI, Ollama, Groq, and any OpenAI-compatible endpoint SHALL receive first-class support. No provider SHALL receive exclusive features unavailable to others.

### V. Community-Driven
The marketplace and plugin system SHALL make users into contributors. Skills, MCPs, and plugins SHALL be publishable by anyone via static registry PR. Revenue share SHALL be available for premium items (v3). No proprietary marketplace gatekeeping.

## Security Requirements

### VI. Sandboxed Extensions
All plugins SHALL execute in a sandbox (Web Worker v1.1, WASM v2). No direct filesystem or network access without declared permissions and user approval.

### VII. Secret Protection
All API keys SHALL be stored in OS keychain, never in plaintext files. Automatic secret scanning SHALL run before every API call.

## Performance Standards

### VIII. Binary Size
Compressed installer SHALL be <25MB. Total installed size SHALL be <200MB. No external runtime dependencies (Node.js, Python).

### IX. Responsiveness
Cold start SHALL be <2s (macOS), <3s (Windows NVMe). Tool call interception overhead SHALL be <5ms. Memory retrieval SHALL be <100ms.

## Governance
Constitution supersedes all other project practices. Amendments require PR with rationale, team review, and migration plan for affected code. All plan gates SHALL verify constitution compliance before Phase 0 research.

**Version**: 1.0.0 | **Ratified**: 2026-05-25 | **Last Amended**: 2026-05-25