# Quickstart: AgentLoft Development

**Date**: 2026-05-25 | **Phase**: 1 — Design & Contracts

## Prerequisites

- **Rust** 1.78+ (`rustup default stable`)
- **Node.js** 20+ (LTS)
- **pnpm** 9+: `npm install -g pnpm`
- **Tauri CLI**: `cargo install tauri-cli --version "^2"`
- **Platform-specific**:
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
  - **Windows**: Microsoft Visual Studio C++ Build Tools + Windows 10 SDK
  - **Linux**: `sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`

## Quick Start

```bash
git clone https://github.com/multica-ai/AgentLoft.git
cd AgentLoft
pnpm install
cargo build --manifest-path src-tauri/Cargo.toml
pnpm tauri dev
```

## Project Structure

```
agentloft/
├── src/                    # React frontend (TypeScript)
│   ├── app/                # Next.js-style app layout
│   ├── components/         # chat, cockpit, diff, marketplace, memory, shared
│   ├── hooks/              # React hooks
│   ├── stores/             # Zustand stores
│   └── lib/                # Tauri IPC wrappers, types, models
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── commands/       # session, memory, process, context, cost, security
│   │   ├── process/        # claude_code, codex, antigravity, generic
│   │   ├── memory/         # store, embeddings (ONNX), retrieval
│   │   ├── context/        # budget, health, injection, pinning
│   │   ├── intercept/      # proxy, permission, blast_radius
│   │   └── db/             # schema.sql, migrations
│   └── Cargo.toml
├── marketplace/            # Static marketplace registry
└── tests/
    ├── rust/               # cargo test
    ├── frontend/           # Vitest + React Testing Library
    └── e2e/                # Playwright (tauri-driver)
```

## Development Workflow

### Frontend only (no Rust changes)

```bash
pnpm tauri dev
# Frontend hot-reloads on save. Rust backend persists.
```

### Rust backend changes

```bash
pnpm tauri dev
# Backend recompiles and restarts. Frontend reconnects.
```

### Running tests

```bash
cargo test --manifest-path src-tauri/Cargo.toml   # Rust tests
pnpm test                                          # Frontend unit tests
pnpm tauri build --debug && pnpm test:e2e          # E2E tests
```

### Building for release

```bash
pnpm tauri build
# macOS: src-tauri/target/release/bundle/dmg/
# Windows: src-tauri/target/release/bundle/msi/
# Linux: src-tauri/target/release/bundle/deb/
```

## Key Architecture Decisions

1. **Stream-JSON primary, PTY fallback**: CLIs spawned with `--output-format stream-json`. Structured events parsed from stdout. PTY fallback if stream-JSON unavailable.

2. **IPC via Tauri commands + events**: Frontend->backend via typed `invoke()`. Backend->frontend via `emit()`. See `contracts/ipc-events.md`.

3. **Local-first storage**: LanceDB for vector memory, SQLite for structured data, filesystem for config/checkpoints. No server.

4. **Plugin sandbox**: Web Workers + postMessage (v1.1). WASM upgrade in v2 (wasmtime/wazero, 100ms/1MB/100-instruction).

5. **Zero-Waste Architecture**: MCP lazy-load, terminal output filter, self-edit dedup, rolling state checkpoints. 40-65% token reduction target.

## Common Tasks

### Adding a new CLI integration

1. Create `src-tauri/src/process/{cli_name}.rs` implementing `CliProcess` trait
2. Add parser in `src-tauri/src/process/{cli_name}_parser.rs`
3. Register in `src-tauri/src/process/mod.rs`
4. Add connection template in `src/lib/models.ts`

### Adding a new cockpit panel

1. Create `src/components/cockpit/{PanelName}.tsx`
2. Subscribe to Tauri events via `useListen()`
3. Add to layout in `CockpitLayout.tsx`
4. Add toggle to cockpit settings

### Adding a marketplace item locally

1. Create directory in `marketplace/{type}/{name}/`
2. Add entry to `marketplace/registry.json`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `agentloft_SESSION_DIR` | `.claude/sessions/` | Session history + autosave |
| `agentloft_CONFIG_DIR` | `~/.agentloft/` | Global config |
| `agentloft_MEMORY_DIR` | `~/.agentloft/memory/` | LanceDB database |
| `agentloft_LOG_DIR` | `~/.agentloft/logs/` | IPC frame logs |
| `agentloft_PLUGIN_DIR` | `~/.agentloft/plugins/` | Installed plugins |
| `agentloft_ANTIGRAVITY_EXPERIMENTAL` | `false` | Enable Antigravity CLI |

## Documentation

- Full PRD: `docs/AgentLoft PRD.md`
- Implementation Plan: `specs/001-agentloft-gui/plan.md`
- Research: `specs/001-agentloft-gui/research.md`
- Data Models: `specs/001-agentloft-gui/data-model.md`
- IPC Contracts: `specs/001-agentloft-gui/contracts/ipc-events.md`
