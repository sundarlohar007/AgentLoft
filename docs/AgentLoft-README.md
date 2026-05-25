<div align="center">

<!-- Replace with actual SVG logo once designed -->
<img src="docs/assets/agentloft-logo.svg" alt="AgentLoft" width="72" height="72" />

# AgentLoft

### Your AI agents. One workspace.

The free, open-source visual workbench for **Claude Code**, **Codex CLI**, and **Antigravity CLI** —  
memory across sessions, real-time cost tracking, and full visibility into every action before it happens.

[![MIT License](https://img.shields.io/badge/license-MIT-7cc7a0?style=flat-square)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/agentloft-ai/agentloft?style=flat-square&color=7cc7a0)](https://github.com/agentloft-ai/agentloft/releases)
[![Downloads](https://img.shields.io/github/downloads/agentloft-ai/agentloft/total?style=flat-square&color=7cc7a0)](https://github.com/agentloft-ai/agentloft/releases)
[![Discord](https://img.shields.io/discord/XXXXXXXXX?label=Discord&style=flat-square&color=7cc7a0)](https://discord.gg/agentloft)
[![GitHub Stars](https://img.shields.io/github/stars/agentloft-ai/agentloft?style=flat-square&color=7cc7a0)](https://github.com/agentloft-ai/agentloft/stargazers)

[**Download**](#installation) · [**Documentation**](https://docs.agentloft.dev) · [**Discord**](https://discord.gg/agentloft) · [**Changelog**](CHANGELOG.md)

---

<!-- Replace with actual demo GIF — 90 seconds, shows blast radius + memory + cost in one session -->
<img src="docs/assets/demo.gif" alt="AgentLoft demo — blast radius preview, memory panel, and real-time cost tracker" width="800" />

</div>

---

## What is AgentLoft?

AgentLoft wraps your existing **Claude Code**, **Codex CLI**, and **Antigravity CLI** installations and renders everything they do as a visual workbench — without replacing them, re-implementing them, or changing how they work.

Same API key. Same subscription. Same models. Just finally visible.

```bash
# Before AgentLoft: you type a prompt and hope for the best
$ claude "refactor the auth module"

# With AgentLoft: you see every file it plans to touch, every dollar it will spend,
# and you approve or reject before a single byte is written
```

AgentLoft does **not**:
- Replace Claude Code, Codex CLI, or Antigravity CLI
- Require a new subscription or account
- Send your code or conversations to AgentLoft servers
- Require Node.js, Python, or any runtime beyond the app itself

---

## Why AgentLoft exists

If you use AI CLI agents daily, you have hit at least one of these:

| Pain | What happens without AgentLoft |
|---|---|
| Agent edits the wrong files | No visibility into what it planned to touch until after the damage |
| Session context is lost | Re-explain project conventions every time |
| Cost spikes out of nowhere | No warning until the bill arrives |
| Rate limit hits mid-task | Silent failure or confusing error |
| No way to undo | `git reset --hard` is your only rollback |
| Switching CLIs is manual | Three terminals, three different interaction patterns |

AgentLoft closes all of these in v1.

---

## Key Features

### See before it writes — Blast Radius Preview
Every agent write batch shows you the full set of files it intends to touch, with a risk indicator per file. Approve, reject individual files, or stop entirely — before a single byte changes on disk.

### Memory that persists across sessions
AgentLoft reads your existing `CLAUDE.md`, `AGENTS.md`, and project manifests on first open and pre-populates project memory automatically. On every subsequent session, the agent already knows your conventions — you never re-explain the same thing twice.

### Real-time cost intelligence
Per-token cost shown as the agent works. Hard budget caps that stop the session (not just warn). Anomaly detection that fires when a session costs 2× the baseline. Cost Calm Mode for when you want flow without the ticker.

### One-click rollback
Auto-checkpoint before every agent write batch. One click to restore the previous state. No git required.

### Three CLIs, one workspace
Switch between Claude Code, Codex CLI, and Antigravity in the same session. Compare outputs on the same task. Auto-fallback to the next CLI when a rate limit hits.

### Zero-waste token architecture
40–65% fewer tokens consumed vs. running the CLI directly — without changing the model, the prompt, or the output quality. On-demand MCP schema loading, terminal output compression, self-edit deduplication, rolling state checkpoints.

### The Karpathy Engineer profile
Built-in agent profiles — including an implementation of the minimal-footprint engineer philosophy: read before write, surgical changes only, no unnecessary refactors. One click to activate. Exports to `CLAUDE.md`.

---

## Installation

### macOS
```bash
brew install --cask agentloft
```

### Windows
```powershell
winget install AgentLoft.AgentLoft
```

### Ubuntu / Debian
```bash
sudo apt install agentloft
# Add the PPA first: sudo add-apt-repository ppa:agentloft-ai/stable
```

### Arch Linux (AUR)
```bash
yay -S agentloft
```

### Direct download
Download the latest installer for your platform from [**GitHub Releases**](https://github.com/agentloft-ai/agentloft/releases).

| Platform | Format |
|---|---|
| macOS (Apple Silicon + Intel) | `.dmg` |
| Windows 10/11 | `.exe` (Authenticode signed) |
| Ubuntu/Debian | `.deb` |
| Linux (any) | `.AppImage` |

> **Requirements:** AgentLoft requires at least one CLI agent installed on your system.  
> Claude Code, Codex CLI, or Antigravity CLI. If you don't have one, the onboarding wizard will install it for you.

---

## Quick Start

1. **Launch AgentLoft** — the onboarding wizard runs on first launch
2. **Install a CLI** — if you don't have Claude Code/Codex/Antigravity, the wizard installs it in one click (Homebrew/winget/apt — no browser required)
3. **Add your API key** — stored in the OS keychain, never in a plaintext file
4. **Open a project** — AgentLoft reads your existing `CLAUDE.md` and pre-populates memory
5. **Start a session** — your first turn runs in Safe Mode by default (read-only, no writes)

Goal: **first successful agent turn within 3 minutes of install.**

---

## Screenshots

<div align="center">

| Blast Radius Preview | Memory Panel | Cost Intelligence |
|---|---|---|
| <img src="docs/assets/screenshot-blast-radius.png" width="260" alt="Blast Radius Preview" /> | <img src="docs/assets/screenshot-memory.png" width="260" alt="Memory Panel" /> | <img src="docs/assets/screenshot-cost.png" width="260" alt="Cost Intelligence" /> |

| Agent Cockpit | Session Replay | Zero-Waste Dashboard |
|---|---|---|
| <img src="docs/assets/screenshot-cockpit.png" width="260" alt="Agent Cockpit" /> | <img src="docs/assets/screenshot-replay.png" width="260" alt="Session Replay" /> | <img src="docs/assets/screenshot-zero-waste.png" width="260" alt="Zero-Waste Dashboard" /> |

</div>

---

## Feature Overview

### v1 — Available now

| Feature | Description |
|---|---|
| **Multi-CLI** | Claude Code, Codex CLI, Antigravity CLI — all three, one workspace |
| **Blast Radius** | See every file the agent plans to touch before it writes |
| **Memory** | LanceDB persistent memory — project + user + agent scope, survives sessions |
| **Memory Bootstrap** | Reads existing CLAUDE.md + project files on first open — no setup required |
| **Cost Tracker** | Per-token, per-session, hard budget caps, anomaly detection |
| **Cost Calm Mode** | Session total only — no per-turn anxiety |
| **Rollback** | Auto-checkpoint before every write, one-click restore |
| **Rate Limit Handling** | Auto-fallback chain, retry queue, quality warning on weaker fallback |
| **Context Engine** | Budget system, content pinning, health score, smart resume |
| **Agent Profiles** | Karpathy Engineer, Deep Work, Code Review, Safe Mode + custom |
| **Session Replay** | Full recording of every session — replay, export, search |
| **Zero-Waste Tokens** | 40–65% token reduction: MCP lazy-loading, terminal compression, dedup, checkpoints |
| **Marketplace** | Skills + MCP Hub — 20+ items at launch, one-click install |
| **Onboarding** | In-app CLI install (no browser), API key wizard, 3-minute-to-first-turn goal |
| **Help System** | Panel ? icons, first-visit tooltips, F1 Help Center (offline), expertise toggle |
| **Safety** | Permission system, regression shield, secret scanner, scope inheritance |
| **Crash Recovery** | 5-second autosave, session recovery on restart |

### v1.1 — Coming soon

Advanced Cockpit (Speculation Mode, Surgical Mode, Rollback Timeline), Smart Token Pipeline (6-stage, <50ms), MCP Composer, Side Chat, Context File Auditor, Prompt Batcher

### v2 — Planned

Graphify Knowledge Graph, Agentmemory 4-Tier, Visual Testing, Multi-Agent Orchestration, Session Branching, Docker Sandbox

### v3 — Planned

Team Mode, Flows (visual workflow automation), GUI-Vibe Cloud, Revenue Share Marketplace

---

## Built on open source

AgentLoft is built with and gratefully acknowledges:

| Dependency | License | Use |
|---|---|---|
| [Tauri 2](https://tauri.app) | MIT + Apache 2.0 | Desktop app shell, IPC, OS integration |
| [React 19](https://react.dev) | MIT | UI framework |
| [TypeScript](https://typescriptlang.org) | Apache 2.0 | Type safety |
| [LanceDB](https://lancedb.com) | Apache 2.0 | Embedded vector database for memory |
| [Monaco Editor](https://microsoft.github.io/monaco-editor) | MIT | In-app code editor |
| [xterm.js](https://xtermjs.org) | MIT | Terminal emulator component |
| [ONNX Runtime](https://onnxruntime.ai) | MIT | Local embedding model inference |
| [Feather Icons](https://feathericons.com) | MIT | UI icons |
| [Inter](https://rsms.me/inter) | SIL OFL | UI typeface |
| [JetBrains Mono](https://jetbrains.com/mono) | SIL OFL | Code typeface |
| [RTK](https://github.com/rtk-ai/rtk) | MIT | Terminal output filter patterns |
| [Caveman](https://github.com/juliusbrussee/caveman) | MIT | CLAUDE.md compression |

Full attribution in [`NOTICE`](NOTICE).

---

## Privacy & Security

- **Zero telemetry by default.** AgentLoft sends nothing to AgentLoft servers. Opt-in crash reports only.
- **Local-first.** All session data, memory, and configuration lives on your disk.
- **OS Keychain.** API keys are stored in the OS keychain (macOS Keychain, Windows Credential Manager, libsecret on Linux). Never in plaintext.
- **Secret scanner.** Scans outgoing content for API keys and tokens before every API call.
- **Open source.** Everything is auditable. No black boxes.

For security disclosures: security@agentloft.dev (PGP key in [`SECURITY.md`](SECURITY.md))

---

## Contributing

AgentLoft is MIT-licensed and welcomes contributions. Here is how to get started:

### Development setup

```bash
# Prerequisites: Rust (1.77+), Node.js (20+), pnpm

git clone https://github.com/agentloft-ai/agentloft
cd agentloft
pnpm install
pnpm tauri dev
```

### Run tests

```bash
pnpm test          # Unit + integration tests
pnpm test:e2e      # End-to-end tests (requires a CLI agent installed)
```

### Before opening a PR

- [ ] Tests pass on macOS, Windows, and Linux (CI will check)
- [ ] No AGPL-licensed code introduced (see [`CONTRIBUTING.md`](CONTRIBUTING.md))
- [ ] New features include a test
- [ ] UI changes tested in Guided, Standard, and Expert expertise modes

### Good first issues

Look for issues labeled [`good first issue`](https://github.com/agentloft-ai/agentloft/issues?q=label%3A%22good+first+issue%22) — these are scoped, well-documented, and mentored.

### What we are looking for

- Bug fixes (especially cross-platform)
- Skills and MCPs for the Marketplace (see [`marketplace/`](marketplace/))
- Translations / i18n
- Documentation improvements
- Accessibility improvements

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide.

---

## Community

- **Discord** — [discord.gg/agentloft](https://discord.gg/agentloft) — the primary community hub
- **GitHub Discussions** — long-form feature discussions and RFCs
- **GitHub Issues** — bugs and feature requests
- **X / Twitter** — [@agentloft](https://x.com/agentloft) — releases and updates

---

## Roadmap

The full roadmap is in [`ROADMAP.md`](ROADMAP.md). High-level:

| Phase | Target | Focus |
|---|---|---|
| **v1** | Q3 2026 | Core workbench — memory, cost, safety, multi-CLI |
| **v1.1** | Q4 2026 | Advanced Cockpit, Smart Token Pipeline |
| **v2** | Q1 2027 | Graphify, Multi-Agent, Visual Testing |
| **v3** | Q3 2027 | Team Mode, Flows, AgentLoft Cloud |

Vote on features and track progress in [GitHub Discussions → Roadmap](https://github.com/agentloft-ai/agentloft/discussions/categories/roadmap).

---

## License

AgentLoft core is **MIT licensed** — free to use, fork, and build on.

```
MIT License

Copyright (c) 2026 AgentLoft Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

[Full license text](LICENSE)

---

<div align="center">

**AgentLoft** is built by developers, for developers.  
If it saves you time or money, consider giving it a ⭐ — it helps others find it.

[agentloft.dev](https://agentloft.dev) · [docs.agentloft.dev](https://docs.agentloft.dev) · [@agentloft](https://x.com/agentloft)

</div>
