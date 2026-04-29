# AGENTS.md

AGENTS.md is the predictable instruction file for coding AI agents working in this repository. Load this file before planning or editing, then load `CLAUDE.md` when operating from Claude Code.

## Repository Goals

- Hydra Player is a FOSS desktop music player forked from Psysonic.
- The desktop app is a Tauri v2 application with a React/Vite/TypeScript frontend and a Rust backend for native integration and audio work.
- Phase 1 focuses on a clean fork baseline, trustworthy CI, AI-agent onboarding, and a basic local-library playback MVP.
- Maintain the privacy-first stance: no telemetry, analytics harvesting, or unexpected network calls.

## Current Stack

- Frontend: React 18, TypeScript, Vite, Zustand, React Router, i18next, lucide-react.
- Desktop shell: Tauri v2.
- Native/audio: Rust, rodio, symphonia, cpal patch, rusqlite, lofty.
- Tests: Vitest for TypeScript units; Rust tests should use `cargo test` where practical.
- Package manager: npm with `package-lock.json`.
- AI scaffolding: Uncodixfy repo-local config under `.uncodixfy/`; Ruflo repo-local orchestration under `.ruflo/`.

## Build And Test Flows

- Install dependencies: `npm install`.
- Frontend development: `npm run dev`.
- Tauri development: `npm run tauri:dev`.
- Frontend production build: `npm run build`.
- Tauri production build: `npm run tauri:build`.
- TypeScript/unit tests: `npm run test`.
- Rust checks: `cargo test --manifest-path src-tauri/Cargo.toml`.
- Rust formatting check: `cargo fmt --manifest-path src-tauri/Cargo.toml -- --check`.

## Working Conventions

- Prefer small, reviewable PRs with one behavioral goal.
- Read nearby code before editing; follow existing stores, page patterns, CSS conventions, and Tauri command style.
- Keep React components typed and colocate focused tests beside related utilities when possible.
- Avoid large rewrites, dependency swaps, or styling-system changes unless the task explicitly calls for them.
- Use `rg` for search and inspect existing helpers before creating new ones.
- Do not revert user changes or unrelated files.

## Testing Conventions

- Every implementation plan should propose at least one automated test or a clear manual verification path.
- Add Vitest tests for pure TypeScript utilities, store transformations, URL/path handling, and library indexing logic.
- Add Rust unit tests for pure metadata parsing, path filtering, and command helper logic.
- For Tauri command behavior that is hard to unit test, document a manual smoke check in the PR.
- Prefer deterministic fixtures with tiny generated metadata samples; do not commit copyrighted music files.

## Safety And Legal Constraints

- Preserve GPLv3 licensing obligations inherited from Psysonic.
- Do not add proprietary codecs, DRM bypasses, scraping of paid services, or piracy-oriented features.
- Never commit user credentials, server URLs, tokens, private media paths, or personal library dumps.
- Do not add telemetry or analytics. Any crash/logging change must be local-first and clearly disclosed.
- Treat local music folders as sensitive user data; request the minimum filesystem capability needed.
- Keep updater/signing/release credentials out of the repository and CI logs.

## Developer Preferences

- Prefer boring, maintainable architecture over clever abstractions.
- Keep UI dense, accessible, and desktop-native rather than marketing-oriented.
- Use lucide-react icons for common controls.
- Preserve existing keyboard, queue, playback, and accessibility expectations.
- Name fork-renaming work explicitly: do not mix broad Psysonic-to-Hydra branding changes into unrelated feature PRs.

## AI Workflow

1. Load context from `AGENTS.md`, then `CLAUDE.md` if available.
2. For UI scaffolding tasks, load `.uncodixfy/config.json` and `docs/ai/uncodixfy.md`.
3. For multi-agent or staged work, load `.ruflo/ruflo.yaml` and `docs/ai/ruflo.md`.
4. Inspect the relevant files and current git status.
5. Produce a short plan with files to touch, tests to add, and human checkpoints.
6. Implement the smallest useful slice.
7. Run targeted tests or explain why they could not run.
8. Summarize changes, risks, and next actions.

## Tooling Bases

- Uncodixfy: use `.uncodixfy/config.json` plus prompt templates in `.uncodixfy/templates/` to generate consistent onboarding and local-library UI scaffolds.
- Ruflo: use `.ruflo/ruflo.yaml` plus `.ruflo/flows/phase-1-local-library.yaml` to split Phase 1 work into file-owned agent lanes.
- Repo-local AI skills: use `docs/ai/skills/README.md` and the matching `docs/ai/skills/<skill>/SKILL.md` for music UI/UX, clean UI polish, Tauri UI work, and audio EQ/enhancement work.

## Human Checkpoints

- Ask before changing license text, release signing, updater endpoints, privacy policy, or default network behavior.
- Ask before adding dependencies that affect binary size, audio behavior, security posture, or platform packaging.
- Stop and report if the implementation requires copyrighted sample media, credentials, or OS permissions that are not already part of the app.
