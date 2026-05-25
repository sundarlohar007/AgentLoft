# Research: AgentLoft v1 Technical Decisions

**Date**: 2026-05-25 | **Phase**: 0 — Outline & Research

## Decision Log

### 1. Desktop Shell: Tauri 2 vs Electron

**Decision**: Tauri 2 (Rust backend, React frontend)

**Rationale**: ~15MB binary vs ~200MB for Electron. Rust performance critical for process orchestration (spawning/managing 3 CLI child processes simultaneously). AionUi (26.4k stars) uses Electron — its 200MB install is cited as a weakness. Opcode (21.9k stars) uses Tauri 2 and validates the approach.

**Alternatives considered**:
- Electron: larger install, heavier memory footprint. Rejected for binary size NFR (<25MB installer).
- Neutralino.js: smaller than Electron but less mature IPC, no PTY support. Rejected.
- SwiftUI + AppKit (macOS only): violates cross-platform requirement. Rejected.

### 2. Vector Database: LanceDB vs Chroma vs Qdrant

**Decision**: LanceDB (embedded, Rust-native)

**Rationale**: No server process required — embedded directly in the Tauri binary. Rust-native bindings, zero-copy reads. Fast semantic search for memory retrieval (<100ms target).

**Alternatives considered**:
- Chroma: Python-native, requires Python runtime. Violates "no external runtime deps" constraint. Rejected.
- Qdrant: requires separate server process. Violates local-first requirement. Rejected.
- SQLite with sqlite-vss: less mature vector support. Rejected.
- FAISS: C++ dependency, complex cross-compilation. Rejected.

### 3. Embedding Model: ONNX Runtime

**Decision**: Bundled ONNX embedding model (<50MB), 384-dim vectors

**Rationale**: Runs locally, no API calls needed. ONNX Runtime has Rust bindings (ort crate). Model loaded once at app start, inference <50ms per embedding.

**Alternatives considered**:
- OpenAI Embeddings API: requires network + API key. Violates local-first. Rejected.
- sentence-transformers: Python runtime required. Rejected.
- candle (Rust-native ML): promising but less mature. Evaluate for v1.1.

### 4. Relational DB: SQLite

**Decision**: SQLite via sqlx (Rust), WAL mode

**Rationale**: Embedded, zero-config, battle-tested. WAL mode for concurrent reads during writes. Sessions, settings, audit log, marketplace cache.

**Alternatives considered**:
- PostgreSQL: requires server. Violates local-first. Rejected.
- libSQL: adds network dependency. Rejected.

### 5. Process Spawning: Tokio + portable-pty

**Decision**: Tokio async runtime + portable-pty crate

**Rationale**: CLI agents run as child processes. Stream-JSON mode (`--output-format stream-json`) is primary path. PTY fallback for interactive access. portable-pty provides cross-platform PTY (Unix PTY, Windows ConPTY).

**Alternatives considered**:
- std::process::Command: synchronous, no PTY. Rejected.
- ptyprocess: unmaintained. Rejected.

### 6. State Management: Zustand + React Query

**Decision**: Zustand + TanStack Query

**Rationale**: Lightweight, minimal boilerplate, sufficient for desktop app state. React Query handles async IPC calls and cache invalidation.

**Alternatives considered**:
- Redux Toolkit: more boilerplate. Overkill for v1.
- Jotai: may adopt in v1.1 if Zustand insufficient for cockpit state.

### 7. UI Components: Radix UI + Tailwind CSS

**Decision**: Radix UI primitives + Tailwind CSS 4

**Rationale**: Accessible, unstyled primitives. Tailwind for glassmorphism design system (PRD §20). Full visual control.

**Alternatives considered**:
- shadcn/ui: useful as reference, not as dependency. May adopt in v1.1.
- Ant Design/MUI: too heavy, don't match glassmorphism. Rejected.

### 8. Diff Rendering: Monaco Editor

**Decision**: Monaco Editor for diff view

**Rationale**: Best-in-class diff rendering. Familiar to VS Code users. Per-hunk accept/reject/edit. npm package, no native dependency.

**Alternatives considered**:
- CodeMirror 6: less mature diff support. Rejected.
- Custom diff renderer: high maintenance burden. Rejected.

### 9. Markdown Rendering: MDX + Shiki

**Decision**: MDX for chat messages, Shiki for syntax highlighting

**Rationale**: Shiki uses TextMate grammars (same as VS Code). MDX allows rich components within markdown.

**Alternatives considered**:
- react-markdown + Prism: less accurate highlighting. Rejected.

### 10. Marketplace Backend: Static CDN Registry

**Decision**: GitHub Releases as static CDN (v1)

**Rationale**: No server infrastructure. Registry is static JSON with metadata and download URLs. Community submits via PR. Auto-update via Tauri updater.

**Alternatives considered**:
- Custom backend API: requires server infra. Deferred to v3 (AgentLoft Cloud).
- npm registry: tight coupling to Node ecosystem. Rejected.

### 11. IPC Protocol: Tauri Commands + Events

**Decision**: Tauri invoke (frontend->backend) + events (backend->frontend)

**Rationale**: Typed, bidirectional, fast. In-process communication, no network stack overhead.

**Alternatives considered**:
- WebSocket (localhost): adds network overhead. Rejected.
- gRPC: overkill for in-process. Rejected.

### 12. Plugin Sandbox: Web Worker + postMessage

**Decision**: Web Worker sandbox (v1.1). WASM upgrade (v2).

**Rationale**: Process isolation within browser runtime. postMessage is well-defined IPC boundary. Declared permissions in manifest. WASM adds resource limits (100ms/1MB/100-instruction) in v2.

**Alternatives considered**:
- Deno subprocess: requires Deno runtime. Rejected.
- Docker sandbox: requires Docker. Deferred to v2 as optional (PRD §15.4.5).

### 13. Cross-Platform PTY: portable-pty + ConPTY

**Decision**: portable-pty crate for Unix + Windows ConPTY

**Rationale**: Single API abstracts both platforms. Windows is primary platform tier.

### 14. Distribution: Multi-Channel Package Managers

**Decision**: GitHub Releases + Homebrew + Winget + apt/PPA + AppImage + AUR

**Rationale**: Day-one availability on all major package managers. Code signing on all platforms.

## Unresolved Items

None. All NEEDS CLARIFICATION items resolved by the PRD.

## Open Questions for Future Phases

- **Antigravity CLI stability** (PRD §14.7): New CLI. Gate behind `agentloft_ANTIGRAVITY_EXPERIMENTAL=true`.
- **WASM runtime**: wasmtime vs wazero for v2. Evaluate later.
- **Portable Python bundling**: Graphify v2 needs Python. PyOxidizer vs standalone embed.
