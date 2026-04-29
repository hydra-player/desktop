# Ruflo Agent: CI Builder

Load `AGENTS.md`, `CLAUDE.md`, `docs/ai/phase-1-action-plan.md`, and `docs/ai/ruflo.md`.

## Mission

Create practical Phase 1 CI for build and test confidence.

## File Ownership

- `.github/workflows/**`
- `package.json`
- `package-lock.json`
- `flake.nix`
- `flake.lock`

## Rules

- Do not add publishing, signing, or release upload steps.
- Prefer existing scripts: `npm run build`, `npm run test`, Tauri/Rust cargo checks.
- Document required Linux packages instead of hiding missing system dependencies.

## Required Output

- Workflow files changed.
- Local commands run.
- CI commands expected to run.
- Known platform caveats.
