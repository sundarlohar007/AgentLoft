# AgentLoft — Brand Identity Guide

**Document Version:** 1.0  
**Status:** Draft — Founding Team  
**Last Updated:** May 2026

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Brand Personality & Voice](#2-brand-personality--voice)
3. [Logo System](#3-logo-system)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Iconography](#6-iconography)
7. [App Icon — All Platforms](#7-app-icon--all-platforms)
8. [Motion & Animation](#8-motion--animation)
9. [Brand in Context](#9-brand-in-context)
10. [Naming Conventions](#10-naming-conventions)
11. [Anti-Brand — What NOT to Do](#11-anti-brand--what-not-to-do)
12. [Launch Presence Templates](#12-launch-presence-templates)

---

## 1. Brand Foundation

### 1.1 The Name

**AgentLoft**

Always one word. Capital A, capital L. No hyphen. No space.

| Correct | Incorrect |
|---|---|
| AgentLoft | Agent Loft |
| AgentLoft | agent-loft |
| AgentLoft | Agentloft |
| AgentLoft | AGENTLOFT |

### 1.2 What the Name Means

A **loft** is an elevated, open-plan workspace — industrial architecture, large grid windows, high ceilings, full light. You can see everything from a loft. You have space to think. Work happens around you, visible, organized, under control.

**AgentLoft** is the loft where your AI agents work. You're the one with the elevated view — watching, directing, adjusting. The CLI agents (Claude Code, Codex CLI, Antigravity CLI) are the workers. AgentLoft is the space that gives you visibility, memory, and control over all of them at once.

The loft metaphor carries three things the product actually delivers:

| Loft quality | Product reality |
|---|---|
| **Elevated perspective** | You see every file touched, every dollar spent, every decision made — before it happens |
| **Open, transparent** | Glassmorphism UI, local-first, zero hidden data flows |
| **One unified space** | Three CLI agents in one workspace — no switching terminals |

### 1.3 Tagline

**Primary:**
> Your AI agents. One workspace.

**Alternatives (use contextually):**

| Tagline | Best context |
|---|---|
| "Your AI agents. One workspace." | Hero section, app store description, README subtitle |
| "Elevate your agent workflow." | Conference talks, splash screens, social bios |
| "See everything your agents do." | Observability-focused audiences, HN posts, dev Twitter |
| "Run Claude, Codex, and Antigravity. See everything." | Technical audiences who know the CLIs |
| "Free. Open-source. Your agents, finally visible." | Community / trust-focused messaging |

### 1.4 Brand Promise

> AgentLoft gives every developer — from first-time vibecoder to senior engineer — a clear, calm, and complete view of what their AI agents are doing, for less money, with zero lost work.

### 1.5 Positioning Statement (one sentence)

> AgentLoft is the free, open-source visual workbench that wraps Claude Code, Codex CLI, and Antigravity CLI — so you see every file touched, every dollar spent, and every decision made, with persistent memory across sessions.

### 1.6 What AgentLoft Is NOT

This is as important as what it is. Every piece of communication must stay honest.

- Not a replacement for Claude Code, Codex, or Antigravity — it wraps them
- Not a new AI model or API
- Not a subscription service (core is free + MIT forever)
- Not a terminal emulator
- Not another chat interface
- Not a VS Code extension

---

## 2. Brand Personality & Voice

### 2.1 Five Brand Words

**Transparent. Elevated. Developer-first. Calm. Honest.**

### 2.2 Personality Description

AgentLoft speaks like a senior engineer who has been burned by hype and now only trusts tools that show their work. It is confident but not boastful. It respects the user's intelligence. It never oversells. When something is a v2 feature, it says so.

It celebrates vibe coding culture without mocking traditional developers. It is equally at home in a HN comment thread and a team Slack channel.

### 2.3 Voice Examples

| Instead of this | Say this |
|---|---|
| "Revolutionize your AI-powered developer experience" | "See what your AI agent is doing, in real time" |
| "Unlock unprecedented workflow automation" | "Run Claude Code and Codex side-by-side on the same task" |
| "Next-generation context management" | "Memory that persists across sessions — the agent remembers your conventions" |
| "Industry-leading token optimization" | "On average, 40–65% fewer tokens consumed vs. running the CLI raw" |
| "Seamlessly integrates with your workflow" | "Wraps your existing CLI install — same API key, same model, same subscription" |

### 2.4 Writing Principles

1. **Lead with what it does, not what it is built with.** Nobody's opening tweet is "Built with Tauri 2 and React 19."
2. **Numbers over adjectives.** "40–65% token reduction" beats "massive efficiency gains."
3. **Show the cost, then show the savings.** Don't hide the money angle — developers respect transparency about pricing.
4. **One claim per sentence.** Dense marketing copy kills credibility.
5. **Use active voice.** "AgentLoft wraps your CLIs" not "Your CLIs are wrapped by AgentLoft."

---

## 3. Logo System

### 3.1 Concept

The primary mark is a **loft window** — an industrial grid window with six panes (2 columns × 3 rows), rendered in the glassmorphism style. Each pane has a subtle mint tint. One pane (top-left) glows brighter — the active agent.

The window represents:
- **Transparency** — you see through it (into CLI activity)
- **Multiple views** — each pane = a different agent or output stream
- **Elevation** — a loft window is high up, above the noise
- **The GUI metaphor** — a literal window into the CLI world

### 3.2 Logo Variations

**A — Primary (Icon + Wordmark, horizontal)**
```
[▣] AgentLoft
```
Icon on left, wordmark right. Used in: app title bar, README header, website nav, email signatures.

**B — Stacked (Icon above Wordmark)**
```
  [▣]
AgentLoft
```
Used in: app splash screen, social profile images, square-format contexts.

**C — Icon only**
The loft window mark alone. Used in: app icon, favicon, Discord avatar, small-format contexts.

**D — Wordmark only**
`AgentLoft` in Inter Bold — "Agent" in white, "Loft" in mint green. Used in: text-only contexts, sponsorship mentions, inline prose references.

### 3.3 Icon Geometry (Designer Brief)

The following spec is precise enough for an engineer to build the SVG without a designer.

```
Canvas:         40 × 40px at 1x (export at 2x, 3x)
Shape:          Rounded rectangle
Corner radius:  6px (outer), 3px (inner panes)
Grid:           2 columns × 3 rows = 6 panes
Gutter:         2px between panes, 4px from outer edge to first pane
Pane fill:      rgba(124, 199, 160, 0.08)   [all panes, base]
Active pane:    Top-left pane — rgba(124, 199, 160, 0.30) + 1px inset border #7cc7a0
Border:         1.5px stroke, #7cc7a0 at 55% opacity
Background:     linear-gradient(145deg, #0d1117 0%, #1a2535 100%)
Outer glow:     box-shadow: 0 0 20px rgba(124, 199, 160, 0.18)
```

**At 16×16 (favicon / small contexts):**
Simplify to a 2×2 grid (4 panes). Top-left pane filled solid mint at 60% opacity. 1px border. No gutter.

**At 512×512 (app icon full res):**
Same grid structure. Add a very subtle inner shadow on each pane border (inset 0 1px 2px rgba(0,0,0,0.4)) to create a glass depth effect. Background gains a radial mint glow centered behind the window mark.

### 3.4 Wordmark Specification

```
Typeface:   Inter
Weight:     700 (Bold)
Tracking:   -0.02em (slightly tight — modern, confident)
"Agent":    color #e6edf3  (primary text white)
"Loft":     color #7cc7a0  (brand mint)
No space between "Agent" and "Loft" — they are one word
```

### 3.5 Safe Space & Minimum Sizes

- Minimum rendered size for primary logo: 120px wide
- Minimum rendered size for icon only: 16px
- Safe space: equal to the height of the capital "A" on all four sides of the logo
- Never place the logo on a mid-gray background — use dark (#0d1117–#1a2535) or pure white only

### 3.6 Color Variants

| Variant | Background | Use |
|---|---|---|
| **Dark (primary)** | #0d1117 dark gradient | README, dark landing page, app UI, default |
| **Light** | #ffffff or #f6f8fa | Light-mode documentation, print |
| **Mint on dark** | #1a2535 | App title bar, subtle contexts |
| **Monochrome white** | Any dark bg | Embossed swag, t-shirts, dark embroidery |
| **Monochrome black** | Any light bg | Light-mode swag, stickers on white |

---

## 4. Color System

### 4.1 Core Palette

| Token | Hex | RGB | Use |
|---|---|---|---|
| `--color-brand` | `#7cc7a0` | rgb(124,199,160) | Primary actions, links, logo accent, active states |
| `--color-brand-dim` | `#4a9b78` | rgb(74,155,120) | Brand color on light backgrounds |
| `--color-brand-glow` | `rgba(124,199,160,0.20)` | — | Glow effects, shadows, focus rings |
| `--color-bg-base` | `#0d1117` | rgb(13,17,23) | App canvas, darkest layer |
| `--color-bg-surface` | `#1a1f2e` | rgb(26,31,46) | Panel backgrounds, sidebar |
| `--color-bg-elevated` | `#252d3f` | rgb(37,45,63) | Modals, dropdowns, tooltips |
| `--color-glass-fill` | `rgba(255,255,255,0.06)` | — | Glassmorphism panel fill |
| `--color-glass-border` | `rgba(255,255,255,0.10)` | — | Glassmorphism panel border |
| `--color-text-primary` | `#e6edf3` | rgb(230,237,243) | Primary text |
| `--color-text-secondary` | `#8b949e` | rgb(139,148,158) | Labels, secondary info |
| `--color-text-muted` | `#484f58` | rgb(72,79,88) | Disabled, hints, timestamps |
| `--color-success` | `#3fb950` | rgb(63,185,80) | Success states, approved |
| `--color-warning` | `#d29922` | rgb(210,153,34) | Warnings, rate limit notices |
| `--color-error` | `#f85149` | rgb(248,81,73) | Errors, destructive actions |
| `--color-info` | `#58a6ff` | rgb(88,166,255) | Informational states |

### 4.2 Gradients

```css
/* App canvas — behind all panels */
background: linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%);

/* Brand hero (marketing / landing page) */
background: linear-gradient(135deg, #0d1117 0%, #1a2535 50%, #0f1e14 100%);

/* Mint glow (behind logo, hero element) */
background: radial-gradient(ellipse 60% 40% at 50% 50%,
  rgba(124,199,160,0.15) 0%, transparent 70%);

/* Panel glass effect */
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.10);
backdrop-filter: blur(16px);

/* Brand gradient text (used sparingly — headlines only) */
background: linear-gradient(90deg, #7cc7a0 0%, #a0d8bc 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### 4.3 Color Usage Rules

1. **Never** use the brand mint as a large fill — always as accent, border, or glow only
2. **Never** use white text on a mint background — insufficient contrast
3. **Always** test color combinations at WCAG AA (4.5:1 for body text)
4. Dark mode is the primary mode — light mode is a secondary target
5. Status colors (success/warning/error) are reserved for semantic use only — never decorative

---

## 5. Typography

### 5.1 Typeface Stack

| Role | Font | Weight | Notes |
|---|---|---|---|
| Logo wordmark | Inter | 700 Bold | Tracking -0.02em |
| Page / section headlines | Inter | 700 Bold | — |
| Subheadings | Inter | 600 SemiBold | — |
| Body text | Inter | 400 Regular | Line height 1.6 |
| UI labels & captions | Inter | 500 Medium | 12–13px |
| Tagline / hero subtitle | Inter | 300 Light | Letter-spacing 0.01em |
| All code / terminal output | JetBrains Mono | 400 Regular | Ligatures enabled |
| README code blocks | JetBrains Mono | 400 Regular | Same |

Both **Inter** and **JetBrains Mono** are open source under the SIL Open Font License — no licensing friction.

### 5.2 Type Scale (desktop)

| Name | Size | Weight | Use |
|---|---|---|---|
| Hero | 64–80px | 700 | Landing page headline |
| H1 | 48px | 700 | Page title |
| H2 | 32px | 700 | Section heading |
| H3 | 24px | 600 | Subsection |
| H4 | 18px | 600 | Panel heading |
| Body Large | 18px | 400 | Lead paragraphs |
| Body | 16px | 400 | Normal prose |
| Small | 14px | 400 | UI text, descriptions |
| Caption | 12px | 500 | Labels, badges, hints |
| Mono | 14px | 400 | Code, terminal |

### 5.3 README Typography

GitHub renders Markdown. In README context:
- H1 (`#`) for the product name only — once, at the top
- H2 (`##`) for major sections
- H3 (`###`) for subsections
- Bold (`**`) for feature names in feature lists
- Code backticks for all commands, file paths, and config values
- Never use heading sizes for visual decoration — only for hierarchy

---

## 6. Iconography

### 6.1 Icon Library

**Feather Icons** (MIT license) — the established icon system for AgentLoft UI.

Rules:
- 2px stroke weight — never filled icons
- Rounded line caps and joins
- 24×24px base grid; 20×20 in dense/compact UI; 16×16 in status bar
- Never mix Feather Icons with any other icon library in the same surface

### 6.2 Key Icons and Their Uses

| Icon | Feather name | AgentLoft meaning |
|---|---|---|
| `activity` | Activity | Live agent feed, real-time events |
| `eye` | Eye | Blast radius, visibility |
| `dollar-sign` | Dollar Sign | Cost intelligence |
| `cpu` | Cpu | Agent / model indicator |
| `zap` | Zap | Fast action, auto-fallback, rate limit |
| `shield` | Shield | Safety & trust layer, permissions |
| `git-branch` | Git Branch | Session branching, checkpoints |
| `archive` | Archive | Session archive, memory storage |
| `sliders` | Sliders | Settings, configuration |
| `terminal` | Terminal | CLI output, raw mode |
| `layers` | Layers | Memory layers, context stack |
| `compass` | Compass | Navigation, project detection |
| `package` | Package | Marketplace, skills, MCPs |
| `rotate-ccw` | Rotate CCW | Rollback, undo, restore |
| `radio` | Radio | Live session, recording |

### 6.3 Custom Icons (to be created)

The following icons have no Feather equivalent and must be custom-drawn to match Feather's 2px stroke style:

| Icon | Description |
|---|---|
| Loft window | 2×3 grid window — same geometry as logo icon |
| Memory node | A circle with three radiating arcs (semantic memory) |
| Token counter | Stacked horizontal bars, left-to-right fill |
| Checkpoint | A flag with a clock overlay |
| Zero-waste chip | A leaf with a lightning bolt |

All custom icons must match Feather's visual language: 2px stroke, rounded caps, 24px canvas, no fills.

---

## 7. App Icon — All Platforms

### 7.1 Composition

| Layer | Description |
|---|---|
| Background | Radial gradient: #0d1117 center → #1a2535 outer edge |
| Mint glow | Soft radial glow behind the window mark: rgba(124,199,160,0.18) at 50% radius |
| Window mark | Centered, 60% of icon canvas width |
| Inner shadow | Subtle shadow inside pane borders: inset 0 1px 3px rgba(0,0,0,0.5) |

### 7.2 Platform Specs

| Platform | Size | Format | Notes |
|---|---|---|---|
| macOS App Store | 1024×1024 | PNG | macOS auto-applies squircle mask |
| macOS (Retina) | 512×512@2x | PNG | — |
| Windows Store | 300×300 | PNG | Square with 8px rounded corners in manifest |
| Windows taskbar | 256×256 | ICO | Multi-resolution .ico file |
| Linux (hicolor) | 256×256, 128×128, 64×64, 48×48, 32×32 | PNG | Hicolor icon theme |
| Favicon | 32×32, 16×16 | ICO + PNG | 2×2 simplified grid at 16px |
| GitHub Social Preview | 1280×640 | PNG | Logo centered, tagline below, dark gradient bg |
| Discord Server Icon | 512×512 | PNG | Circle crop auto-applied |
| Twitter/X Avatar | 400×400 | PNG | Circle crop |
| Open Graph | 1200×630 | PNG | Logo + tagline layout |

### 7.3 Favicon Simplification

At 16×16 pixels the full 2×3 grid is not readable. Simplify to:
- 2×2 grid (4 panes)
- Top-left pane: solid mint fill at 70% opacity (represents active agent)
- 1px border, #7cc7a0 at 80%
- Dark background

---

## 8. Motion & Animation

### 8.1 Principles

AgentLoft's animation language is **purposeful and calm** — motion confirms state, never performs for its own sake. A developer staring at an agent working for 10 minutes should not feel visual fatigue from unnecessary motion.

- **Duration:** 150–250ms for UI transitions; 400–600ms for complex state changes
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) for entrances; `ease-in` for exits
- **Never use:** bounce, overshoot, spring physics in productivity UI
- **Glassmorphism panels:** fade + scale(0.98→1.0) on appear; no slide unless it's a drawer

### 8.2 Key Animation Moments

| Event | Animation |
|---|---|
| Agent turn starts | Mint pulse on the active pane of the window icon in the title bar |
| New tool call in feed | Fade in from opacity 0, translate Y +4px → 0 (150ms) |
| Cost update in status bar | Number transition — old number fades down, new number fades up |
| Rate limit hit | Rate Limit Card slides up from bottom (300ms, ease-out) |
| Checkpoint saved | Brief "Checkpoint saved ✓" toast — slides in from right, auto-dismisses 2s |
| Memory extracted | Toast fades in from bottom-right (200ms), persists 4s |
| Glassmorphism blur | `backdrop-filter: blur(16px)` — hardware-accelerated, no JS |

### 8.3 Reduced Motion

Respect `prefers-reduced-motion`. When set:
- Replace all transitions with instant state changes
- Replace animated toasts with static banners
- Disable the title bar icon pulse

---

## 9. Brand in Context

### 9.1 GitHub Repository

```
Organization:   agentloft-ai
Repository:     agentloft-ai/agentloft
Description:    The free, open-source visual workbench for Claude Code, Codex CLI,
                and Antigravity CLI. Memory. Cost intelligence. Full observability.
Website:        https://agentloft.dev
Topics:         claude-code, codex-cli, ai-agents, developer-tools, tauri, vibe-coding,
                open-source, rust, typescript, react
```

### 9.2 Social Media Handles

| Platform | Handle |
|---|---|
| X / Twitter | @agentloft |
| Discord | discord.gg/agentloft |
| GitHub | github.com/agentloft-ai |
| Mastodon | @agentloft@hachyderm.io |
| YouTube (future) | youtube.com/@agentloft |

### 9.3 Domain & Email

| Use | Address |
|---|---|
| Primary domain | agentloft.dev |
| Documentation | docs.agentloft.dev |
| Pricing update API | prices.agentloft.dev |
| Founding team contact | team@agentloft.dev |
| Security disclosure | security@agentloft.dev |
| Community / general | hello@agentloft.dev |

### 9.4 Community Tone in Discord

- `#general` — casual, any topic
- `#help` — patient, no "RTFM" ever — always point to a specific doc section
- `#show-and-tell` — celebrate community builds without gatekeeping
- `#roadmap` — honest about what is v1/v2/v3, no fake urgency
- Staff responses always acknowledge bug reports within 24 hours (even if just "logged as #123")

---

## 10. Naming Conventions

All code-level names must follow these conventions. No exceptions — inconsistency destroys brand cohesion across docs, repos, and CLI output.

| Context | Convention | Example |
|---|---|---|
| Product name | PascalCase, one word | AgentLoft |
| CLI binary | lowercase, no hyphen | `agentloft` |
| GitHub org | kebab-case with `-ai` suffix | `agentloft-ai` |
| GitHub repo | lowercase | `agentloft-ai/agentloft` |
| npm package | lowercase, scoped | `@agentloft/core` |
| Rust crate | snake_case | `agentloft_core` |
| Config directory | dot-prefixed, lowercase | `~/.agentloft/` |
| Project config dir | dot-prefixed, lowercase | `.agentloft/` |
| Env variables | SCREAMING_SNAKE with prefix | `AGENTLOFT_ANTHROPIC_KEY` |
| Ignore file | dot-prefixed | `.agentloftignore` |
| Settings file | lowercase | `agentloft.config.yaml` |
| Winget package ID | PascalCase.PascalCase | `AgentLoft.AgentLoft` |
| Homebrew cask | lowercase, no hyphen | `agentloft` |
| Snap / Flatpak | lowercase | `agentloft` |

---

## 11. Anti-Brand — What NOT to Do

### 11.1 Naming violations

- Never write "Agent Loft" (space) — it's one word
- Never write "agentloft" in marketing copy — only in code/CLI contexts
- Never call it "AL" as a public abbreviation — always the full name

### 11.2 Visual violations

- Never place the primary logo on a mid-gray (#888–#aaa range) background — no contrast
- Never stretch or distort the logo mark asymmetrically
- Never use the logo in a color other than the defined variants (no red logos, no blue logos)
- Never use a light/white background as the primary app surface — this is dark-mode-first
- Never use drop shadows on UI panels — only glassmorphism (blur + border)
- Never use a rounded-rect window icon for the logo — it must be the grid window, not a plain box

### 11.3 Copy violations

- Never use hype language: "revolutionize," "game-changing," "next-generation," "unprecedented," "seamlessly"
- Never claim to "replace" Claude Code, Codex CLI, or Antigravity CLI
- Never hide the fact that API keys and costs are still billed by the underlying providers
- Never call a v2/v3 feature "available" or "supported" — always "coming in v2"
- Never use "simply" or "just" before an instruction that has more than one step

### 11.4 Community violations

- Never close a GitHub issue as "wontfix" without a written explanation
- Never respond to feature requests with "use the CLI directly"
- Never dismiss a Windows bug as lower priority without logging it

---

## 12. Launch Presence Templates

### 12.1 HN Show HN Post

```
Show HN: AgentLoft – free open-source GUI for Claude Code, Codex CLI, and Antigravity

I got tired of:
- switching between terminals to compare Claude vs Codex on the same task
- having no idea which files the agent wanted to touch until it was too late
- losing context between sessions and re-explaining the same project conventions

So I built AgentLoft — a Tauri 2 desktop app that wraps all three CLIs and gives you:
- Real-time blast radius preview (see every file before the agent writes)
- Persistent memory (CLAUDE.md + session conventions survive between sessions)
- Live cost per turn (per token, with budget caps)
- Zero-waste token architecture (40–65% fewer tokens vs running the CLI raw)
- Rollback to any checkpoint

MIT license. No telemetry by default. Wraps your existing CLI install — same API key, same model.

Repo: github.com/agentloft-ai/agentloft
```

### 12.2 r/ClaudeAI / r/LocalLLaMA Post

```
Title: I built a free GUI for Claude Code (also wraps Codex + Antigravity) — AgentLoft

After months of running Claude Code in the terminal and losing track of what it was doing,
I built AgentLoft.

What it does differently:
✅ Shows every file the agent wants to touch BEFORE it writes
✅ Memory that persists between sessions (it remembers your project conventions)
✅ Real-time cost tracker with hard budget caps
✅ Run Claude Code, Codex, and Antigravity side-by-side
✅ One-click rollback to any checkpoint
✅ 40–65% fewer tokens consumed (zero-waste architecture)

Free and MIT. No subscription. No server. Everything stays local.
[screenshot/GIF]

github.com/agentloft-ai/agentloft
```

### 12.3 X / Twitter Launch Thread

```
Tweet 1:
Shipping AgentLoft — a free, open-source GUI that wraps Claude Code, Codex, 
and Antigravity CLI.

Not another chat interface. A workbench.
→ github.com/agentloft-ai/agentloft

[demo GIF: blast radius preview + cost ticker]

Tweet 2:
What's different about AgentLoft:

→ Blast Radius: see every file the agent plans to touch before it touches them
→ Memory: conventions persist across sessions — agent knows your project on turn 1
→ Cost: per-turn cost, hard budget caps, zero surprises
→ Rollback: one click back to any checkpoint

Tweet 3:
The Karpathy Engineer profile ships built-in.

Same philosophy as @karpathy's 149K-star system prompt:
minimal footprint, read before write, no unnecessary changes.

One click to activate. Exports to CLAUDE.md.

Tweet 4:
MIT license.
No telemetry by default.
Wraps your existing CLI install — same API key, same models.
Local-first. Everything on disk.

Ships for macOS, Windows, and Linux.
`brew install --cask agentloft`
```

### 12.4 GitHub Social Preview Image (Text Layout)

```
[Logo centered, 200px]
         AgentLoft
  Your AI agents. One workspace.

[Three small badges below]
  MIT License    v1.0.0    Discord
```

Background: brand hero gradient. No screenshots in the social preview — just the mark, name, tagline, badges.

### 12.5 App Store / Package Manager Descriptions

**Short (under 80 characters):**
> Free GUI for Claude Code, Codex CLI, and Antigravity. Memory. Observability. MIT.

**Medium (under 250 characters):**
> AgentLoft is a free, open-source desktop app that wraps Claude Code, Codex CLI, and Antigravity CLI — giving you persistent memory, real-time cost tracking, blast radius preview, and one-click rollback. Local-first. MIT license.

**Long (package manager full description):**
> AgentLoft is the visual workbench for AI CLI agents. It wraps Claude Code, OpenAI Codex CLI, and Google Antigravity CLI in a Tauri 2 + React 19 desktop application, adding persistent cross-session memory (LanceDB, local ONNX embeddings), real-time cost tracking with budget caps, blast radius preview before every write, one-click rollback to any checkpoint, and a zero-waste token architecture that reduces token consumption by 40–65% vs. running the CLI directly. Free and open-source under the MIT license. No telemetry by default. Local-first — all data stays on your machine.

---

*Brand guide maintained by the AgentLoft founding team.*  
*For questions or contributions: team@agentloft.dev*
