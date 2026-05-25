# Contributing to AgentLoft

AgentLoft is a free, open-source desktop GUI that wraps Claude Code, OpenAI Codex CLI, and Antigravity CLI. We welcome contributions of all kinds: bug fixes, new features, documentation, skills, MCPs, and plugins.

## Frontend-Only Contribution Track

Most AgentLoft features can be built entirely in TypeScript/React with **no Rust knowledge required**. This includes:

- New cockpit panels (src/components/cockpit/)
- New marketplace items (marketplace/)
- UI improvements (src/components/chat/, src/components/shared/)
- Help center content (src/components/help/)
- Settings panels (src/components/settings/)

Just run `pnpm tauri dev` and the frontend hot-reloads on save — the Rust backend persists across reloads. No Rust compilation needed for frontend work.

## Getting Started

### Prerequisites

- **Rust** 1.78+ (`rustup default stable`)
- **Node.js** 20+ (LTS)
- **pnpm** 9+: `npm install -g pnpm`
- **Tauri CLI**: `cargo install tauri-cli --version "^2"`

### Platform Setup

**macOS**: Xcode Command Line Tools (`xcode-select --install`)
**Windows**: Microsoft Visual Studio C++ Build Tools + Windows 10 SDK
**Linux**: `sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`

### Quick Start

```bash
git clone https://github.com/sundarlohar007/AgentLoft.git
cd AgentLoft
pnpm install
cargo build --manifest-path src-tauri/Cargo.toml
pnpm tauri dev
```

## Development Workflow

1. Find or create an issue
2. Comment that you're working on it
3. Create a feature branch (`git checkout -b 002-feature-name`)
4. Make changes following the task checklist format
5. Run `cargo test && pnpm test` to verify nothing broke
6. Commit with conventional commit format (`feat:`, `fix:`, `chore:`)
7. Push and open a PR against `master`

## Project Structure

```
src/                    # React frontend (TypeScript) — most contributions go here
src-tauri/              # Rust backend — minimal, well-documented modules
marketplace/            # Static registry — community skills/MCPs/plugins
specs/                  # Planning artifacts per feature
```

## Code Style

- **Rust**: `rustfmt` + `clippy` (CI enforces)
- **TypeScript**: ESLint + Prettier (CI enforces)
- **Components**: Functional components with hooks, no class components
- **CSS**: Inline styles or Tailwind CSS classes
- **Imports**: Group by external libraries → internal modules → relative imports

## Adding a New CLI Integration

1. Create `src-tauri/src/process/{cli_name}.rs` implementing the `CliProcess` trait
2. Add parser in `src-tauri/src/process/{cli_name}_parser.rs`
3. Register in `src-tauri/src/process/mod.rs`
4. Add connection template in `src/lib/models.ts`

## Adding a Marketplace Item

1. Create directory in `marketplace/{type}/{name}/` (e.g., `marketplace/skills/my-skill/`)
2. Add entry to `marketplace/registry.json`
3. Open a PR — community items ship in the next AgentLoft release

## Adding a New Cockpit Panel

1. Create `src/components/cockpit/{PanelName}.tsx`
2. Subscribe to Tauri events via `useListen()` hook
3. Add panel to layout in `src/components/cockpit/CockpitLayout.tsx`
4. Add panel toggle to cockpit settings

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance, deps, config
- `docs:` — documentation
- `refactor:` — code restructuring
- `test:` — adding tests

## Good First Issues

Look for issues tagged `good-first-issue` — these are designed for new contributors and require only TypeScript/React knowledge. Every sprint adds at least 3 frontend-only issues.

## Community

- Monthly contributor call (details in Discussions)
- Feature ideas: open a Discussion before coding
- Bug reports: use the Bug Report template
- Security issues: see SECURITY.md (do not file public issues for vulnerabilities)

## License

AgentLoft is licensed under MIT. By contributing, you agree that your contributions will be licensed under the same terms.
