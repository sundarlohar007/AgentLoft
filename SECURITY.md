# Security Policy

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, email us at: **security@agentloft.dev** (or open a private vulnerability report via GitHub Security Advisories).

We respond within 48 hours and aim to publish fixes within 7 days of confirmation.

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x (v1 pre-release) | :white_check_mark: Security patches |
| main branch | :white_check_mark: Active development |

## Security Architecture

AgentLoft is **local-first by design**. Key security properties:

1. **All data stays on your machine** — No AgentLoft servers exist. Memory, sessions, and context are stored in LanceDB, SQLite, and local files.
2. **API keys in OS keychain** — Keys are stored via the platform-native credential store (macOS Keychain, Windows Credential Manager, Linux Secret Service), never in plaintext.
3. **Automatic secret scanning** — A built-in scanner checks outgoing content for 12 known secret patterns (API keys, tokens, private keys) before content is sent to any AI provider.
4. **Plugin sandbox** — All plugins execute in a sandboxed environment. v1.1 uses Web Workers with postMessage IPC (no direct filesystem/network access). v2 upgrades to WASM sandboxing with hard resource limits (100ms CPU, 1MB memory, 100 instructions).
5. **Network audit log** — Every outbound API call is logged with timestamp, provider, endpoint, model, token count, and cost. Viewable in Settings → Privacy → Network Audit.

## What AgentLoft Sends to External Services

- **AI provider APIs** (Anthropic, OpenAI, Google): Your prompts, attached files, and conversation context — using **your** API keys and **your** subscriptions.
- **Marketplace CDN** (GitHub Releases): Fetches registry metadata and downloads skills/MCPs/plugins on install. Static files, no telemetry.
- **Auto-update** (GitHub Releases): Checks for new versions on startup (configurable, can be disabled).

AgentLoft sends **zero telemetry** by default. Crash reports are opt-in only.

## Reporting Security Issues in Dependencies

If you discover a vulnerability in a dependency, please report it both to us and to the upstream maintainer. We pin and audit all dependencies in CI.

## Responsible Disclosure

We follow a 90-day disclosure timeline:
- Day 0-7: Acknowledge and confirm
- Day 7-30: Develop and test fix
- Day 30-90: Release fix, allow users to update
- Day 90+: Public disclosure (CVE, advisory)

## Hall of Fame

We maintain a hall of fame for security researchers who responsibly disclose vulnerabilities. Thank you for helping keep AgentLoft users safe.
