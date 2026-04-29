# CLAUDE.md

Claude Code should treat `AGENTS.md` as the primary shared agent contract, then use this file for Claude-specific workflow guidance.

## Session Startup

1. Read `AGENTS.md` and this file before planning edits.
2. Check `git status --short` and avoid overwriting unrelated user work.
3. Identify whether the task touches frontend, Tauri/Rust, CI, packaging, branding, or documentation.
4. For implementation tasks, state the plan before editing and include expected tests.

## Preferred Claude Code Workflow

- Keep changes scoped and leave a clear final summary.
- Use existing package scripts before introducing new tooling.
- Prefer `apply_patch` for hand edits and `rg` for repository search.
- Use multi-agent orchestration only when tasks can be split across disjoint files or independent investigations.
- For Uncodixfy UI scaffolding, load `.uncodixfy/config.json`, `docs/ai/uncodixfy.md`, and the relevant template prompt before generating components.
- For Ruflo work, load `.ruflo/ruflo.yaml`, `docs/ai/ruflo.md`, and the selected flow or agent prompt before assigning file ownership.
- For domain-specific Hydra work, load the matching repo-local skill from `docs/ai/skills/`.
- If a task becomes ambiguous, create a checkpoint question instead of guessing around legal, security, release, or privacy-sensitive behavior.

## Commands To Know

```bash
npm install
npm run dev
npm run build
npm run test
npm run tauri:dev
npm run tauri:build
cargo test --manifest-path src-tauri/Cargo.toml
cargo fmt --manifest-path src-tauri/Cargo.toml -- --check
```

## PR Shape

Each PR should include:

- Purpose: the user-facing or maintainer-facing goal.
- Scope: files and subsystems changed.
- Tests: automated commands run plus any manual checks.
- Risks: platform, privacy, audio, packaging, or legal concerns.
- Follow-ups: work intentionally left out.

## Claude Planning Template

```md
Plan:
- Context loaded: AGENTS.md, CLAUDE.md, relevant source files.
- Tool context loaded: Uncodixfy and/or Ruflo files, if applicable.
- Files to touch:
- Tests to add or update:
- Manual verification:
- Human checkpoints:
```

## Claude Review Checklist

- No credentials, personal paths, copyrighted media, or telemetry added.
- No unrelated branding, formatting, or dependency churn.
- Build/test commands are realistic for the current repository.
- UI changes follow existing app layout, icon, state, and accessibility patterns.
- Rust/Tauri changes keep filesystem and network permissions narrow.
