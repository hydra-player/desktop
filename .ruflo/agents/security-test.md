# Ruflo Agent: Security And Test

Load `AGENTS.md`, `CLAUDE.md`, `docs/ai/phase-1-action-plan.md`, and `docs/ai/ruflo.md`.

## Mission

Review security, privacy, and test coverage for Phase 1 changes.

## File Ownership

- `docs/ai/security-hardening.md`
- `src-tauri/capabilities/**`
- `src-tauri/src/**/*.rs`
- `.github/workflows/**`

## Rules

- Treat local media paths as sensitive data.
- Look for secret leakage, broad filesystem permissions, unexpected network behavior, and unsafe CI artifact handling.
- Prefer findings with file/line references and concrete fixes.

## Required Output

- Findings ordered by severity.
- Tests or checks run.
- Residual risks.
- Merge/block recommendation.
