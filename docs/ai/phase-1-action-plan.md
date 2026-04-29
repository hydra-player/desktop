# Hydra Player Desktop Phase 1 Action Plan

## Overview

Hydra Player Desktop starts from the Psysonic desktop client: a React/Vite frontend, Tauri v2 shell, and Rust audio/native backend. Phase 1 should make the fork dependable for contributors and AI agents before deep feature work begins.

The first concrete outcome is a reviewable baseline: repository identity is clear, CI proves the inherited app still builds, AI-agent instructions are predictable, and the first local-library playback path is scoped into small implementation PRs.

## Actionable Tasks

### Milestone 1: Repository Setup

- Rename package metadata from Psysonic to Hydra Player in dedicated branding PRs.
- Preserve upstream copyright and GPLv3 notices.
- Inventory inherited Psysonic-specific names in npm, Cargo, Tauri config, icons, completions, docs, release artifacts, and app strings.
- Create a `docs/fork-notes.md` file explaining what remains intentionally upstream-branded during transition.
- Define supported Phase 1 platforms: Linux first for developer velocity, then Windows/macOS smoke coverage.

Example output:

```md
PR: chore(repo): establish Hydra fork baseline
- Updates package/app metadata where safe.
- Adds fork notes and migration checklist.
- Leaves release signing and package IDs unchanged pending maintainer checkpoint.
```

### Milestone 2: CI/CD Scaffolding

- Replace sentinel-only CI with build and test jobs.
- Add npm cache, `npm ci`, `npm run build`, and `npm run test`.
- Add Rust `cargo fmt --check` and `cargo test --manifest-path src-tauri/Cargo.toml`.
- Keep Tauri packaging as a later/manual workflow until signing and artifact naming are confirmed.
- Add branch protection guidance after the first green CI run.

Example output:

```yaml
name: ci
jobs:
  frontend:
    steps:
      - npm ci
      - npm run build
      - npm run test
  rust:
    steps:
      - cargo fmt --manifest-path src-tauri/Cargo.toml -- --check
      - cargo test --manifest-path src-tauri/Cargo.toml
```

### Milestone 3: AI-Agent Onboarding

- Maintain `AGENTS.md` as the stable shared instruction file for coding agents.
- Maintain `CLAUDE.md` for Claude Code-specific execution conventions.
- Add prompt templates for common PR classes.
- Add human checkpoints for license, privacy, updater, release signing, dependency, and filesystem permission changes.
- Use AI-generated plans only when they include tests or explicit manual verification.

Example output:

```md
Agent output:
- Loaded AGENTS.md and CLAUDE.md.
- Plan includes files, tests, and checkpoint decisions.
- No release credentials, telemetry, or copyrighted fixtures introduced.
```

### Milestone 4: Basic Playback And Local Library MVP

- Define local-library domain types: track, album, artist, folder, scan status, playback source.
- Add a local scan command in Rust using narrow filesystem access and `lofty` metadata parsing.
- Store indexed library data locally with `rusqlite` or an existing store boundary.
- Add frontend screens for onboarding, choose music folder, scan progress, local library list, and first playback.
- Reuse existing player store and Rust audio engine where possible.
- Add tests for metadata parsing, path filtering, track sorting, and empty/error states.

Example output:

```md
PR: feat(local-library): scan a selected folder into local tracks
- Adds Rust scan command returning normalized metadata.
- Adds TypeScript types and a local library store.
- Adds Vitest tests for sorting and empty metadata fallback.
- Manual check: selected folder scans and one track can be queued.
```

## AI Tooling Integration

### Uncodixfy

Use Uncodixfy for consistent React UI scaffolding, especially onboarding and setup surfaces. The repo-local implementation lives in `.uncodixfy/config.json` with prompt templates under `.uncodixfy/templates/`. Generated UI should land as draft components under `src/components/onboarding/` or pages under `src/pages/`, then be adapted to existing Hydra styles.

Rules:

- Use existing CSS variables and app layout conventions.
- Use lucide-react icons for controls.
- Keep onboarding functional, not a marketing page.
- Generate tests or stories only if the repository has the supporting harness.

### Ruflo

Use Ruflo to coordinate multi-agent coding flows when tasks split cleanly. The repo-local base lives in `.ruflo/ruflo.yaml`, with the first Phase 1 flow in `.ruflo/flows/phase-1-local-library.yaml` and lane prompts under `.ruflo/agents/`.

Suggested lanes:

- Agent A: repository metadata and docs.
- Agent B: CI workflow and build verification.
- Agent C: local-library Rust scan command.
- Agent D: frontend onboarding/local library UI.

Ruflo should require each agent to load `AGENTS.md` and `CLAUDE.md`, declare file ownership, and produce tests before handoff.

### Shannon

Use Shannon later as a placeholder security/test automation lane.

Possible Phase 1 uses:

- Check Tauri filesystem permissions and command exposure.
- Review CI for secret leakage and artifact handling.
- Generate negative tests for invalid paths, malformed metadata, and failed scans.
- Produce a hardening checklist for updater/signing before releases.

## General AI Workflow Model

1. Context loading: read `AGENTS.md`, `CLAUDE.md`, package scripts, relevant source files, and current git status.
2. Planning: break the request into small tasks with file ownership and expected outputs.
3. Test design: add expected unit tests, integration checks, or manual smoke tests to every implementation plan.
4. Implementation: generate the smallest useful code stub or feature slice.
5. Verification: run targeted checks and capture failures.
6. Checkpoints: stop for human review on legal, privacy, security, release, dependency, or product-scope questions.
7. Handoff: summarize files changed, commands run, residual risk, and next PR.

## Suggested Files And Descriptions

| File | Description |
| --- | --- |
| `AGENTS.md` | Shared instruction file for coding agents. |
| `CLAUDE.md` | Claude Code-specific workflow and review guidance. |
| `docs/ai/phase-1-action-plan.md` | This Phase 1 implementation and prompt plan. |
| `docs/fork-notes.md` | Tracks inherited Psysonic names and Hydra migration decisions. |
| `.github/workflows/ci.yml` | Main build/test workflow once sentinel CI is replaced. |
| `.uncodixfy/config.json` | UI-scaffolding config for consistent AI-generated React components. |
| `.uncodixfy/templates/onboarding-page.prompt.md` | Prompt template for the local-library onboarding page. |
| `.ruflo/ruflo.yaml` | Multi-agent orchestration base with agent lanes and ownership rules. |
| `.ruflo/flows/phase-1-local-library.yaml` | First staged Ruflo flow for Phase 1 local-library work. |
| `src/types/localLibrary.ts` | TypeScript domain types for local tracks and scan state. |
| `src/store/localLibraryStore.ts` | Zustand store for local scan status and indexed tracks. |
| `src/pages/Onboarding.tsx` | First-run setup flow for choosing local or server-backed library. |
| `src/components/onboarding/FolderPickerStep.tsx` | Folder selection and permission explanation. |
| `src-tauri/src/local_library.rs` | Rust commands for folder scanning and metadata extraction. |
| `src-tauri/src/local_library_db.rs` | SQLite persistence boundary for local-library index. |

## Code Stub Generation Plan

Generate stubs in this order so each PR has a clean review boundary.

### Stub PR 1: Domain Types

Files:

- `src/types/localLibrary.ts`
- `src/utils/localLibrarySort.ts`
- `src/utils/localLibrarySort.test.ts`

Example output:

```ts
export type LocalTrack = {
  id: string;
  path: string;
  title: string;
  artist?: string;
  album?: string;
  discNumber?: number;
  trackNumber?: number;
  durationMs?: number;
};

export type LocalLibraryScanState =
  | { status: 'idle' }
  | { status: 'scanning'; scanned: number }
  | { status: 'complete'; trackCount: number }
  | { status: 'error'; message: string };
```

### Stub PR 2: Rust Scan Boundary

Files:

- `src-tauri/src/local_library.rs`
- `src-tauri/src/local_library_db.rs`
- `src-tauri/src/lib.rs`

Example output:

```rust
#[tauri::command]
pub async fn scan_local_library(root: String) -> Result<LocalLibraryScanSummary, String> {
    // Validate root, walk supported files, parse metadata, persist index.
    todo!("local library scanner implementation")
}
```

Human checkpoint: confirm filesystem permission model and whether scans may recurse through symlinks.

### Stub PR 3: Frontend Store And Page

Files:

- `src/store/localLibraryStore.ts`
- `src/pages/Onboarding.tsx`
- `src/components/onboarding/FolderPickerStep.tsx`
- `src/App.tsx`

Example output:

```ts
type LocalLibraryStore = {
  scanState: LocalLibraryScanState;
  startScan: (folderPath: string) => Promise<void>;
};
```

### Stub PR 4: First Playback Path

Files:

- `src/utils/playLocalTrack.ts`
- `src/store/playerStore.ts`
- `src-tauri/src/audio.rs`

Example output:

```ts
export async function playLocalTrack(track: LocalTrack) {
  // Convert local metadata into the existing player queue shape.
  // Delegate actual playback to the existing player/audio boundary.
}
```

Human checkpoint: confirm whether local playback should share the current queue model or use a dedicated local queue source flag.

## AI Agent Prompt Templates

### First Scaffolding PR

```text
Load AGENTS.md and CLAUDE.md. Create a small PR that establishes the Hydra Player fork baseline without changing runtime behavior.

Scope:
- Add docs/fork-notes.md with a Psysonic-to-Hydra migration checklist.
- Identify package, Cargo, Tauri, icon, completion, README, and release naming surfaces.
- Do not change release signing, updater endpoints, package identifiers, or license text.

Tests:
- Run npm run test if docs-only changes unexpectedly touch code.
- Otherwise report docs-only verification.

Output:
- Files changed.
- Remaining human checkpoints.
- Next PR recommendation.
```

Expected output:

```md
Changed:
- docs/fork-notes.md

Verification:
- Docs-only change; no code tests run.

Checkpoints:
- Confirm package IDs and release signing before renaming binaries.
```

### Initial CI Config

```text
Load AGENTS.md and CLAUDE.md. Replace the sentinel CI with a practical Phase 1 workflow.

Scope:
- Add or update GitHub Actions for npm ci, npm run build, npm run test.
- Add Rust cargo fmt --check and cargo test for src-tauri.
- Use cache keys based on package-lock.json and Cargo.lock.
- Do not add release publishing or signing.

Tests:
- Validate YAML shape locally if tooling exists.
- Run npm run build and npm run test locally when feasible.

Checkpoint:
- If Linux Tauri system packages are required, document them instead of hiding failures.
```

Expected output:

```md
Changed:
- .github/workflows/ci.yml

Verification:
- npm run build
- npm run test
- cargo fmt --manifest-path src-tauri/Cargo.toml -- --check
```

### Test Case Skeleton

```text
Load AGENTS.md and CLAUDE.md. Add test skeletons for the local-library MVP.

Scope:
- Add TypeScript tests for local track sorting, empty metadata fallback, and duplicate path handling.
- Add Rust tests for path filtering and metadata normalization helpers.
- Keep fixtures synthetic and tiny; do not add copyrighted media.

Output:
- Test files with failing or pending cases only if the implementation PR will follow immediately.
- Notes on fixture strategy.
```

Expected output:

```ts
describe('local library sorting', () => {
  it('sorts by album disc, track number, then title', () => {
    // synthetic track metadata only
  });
});
```

### UI Component Templates With Uncodixfy

```text
Load AGENTS.md and CLAUDE.md. Use Uncodixfy to scaffold the local-library onboarding UI.

Design constraints:
- Desktop app surface, not landing page.
- Existing Hydra/Psysonic layout conventions and CSS variables.
- lucide-react icons for folder, scan, check, alert, and music controls.
- No telemetry, account creation, or external-service assumptions.

Components:
- OnboardingShell
- LibraryModeStep
- FolderPickerStep
- ScanProgressStep
- FirstPlaybackStep

Tests:
- Add lightweight render or utility tests only if the repo has the harness.
- Otherwise include manual viewport and keyboard checks.
```

Expected output:

```md
Generated:
- src/pages/Onboarding.tsx
- src/components/onboarding/LibraryModeStep.tsx
- src/components/onboarding/FolderPickerStep.tsx
- src/components/onboarding/ScanProgressStep.tsx

Manual checks:
- Tab order reaches folder picker and primary action.
- Empty, scanning, success, and error states fit desktop and narrow widths.
```
