# Uncodixfy Integration

Uncodixfy is used in this repository as the UI-scaffolding prompt/config layer for AI-generated React surfaces. The current implementation is intentionally repo-local: it provides context files, design rules, output paths, and prompt templates without adding a runtime dependency.

## Entry Points

- Config: `.uncodixfy/config.json`
- Schema: `.uncodixfy/schema.json`
- Page prompt: `.uncodixfy/templates/onboarding-page.prompt.md`
- Component prompt: `.uncodixfy/templates/onboarding-component.prompt.md`

## Required Workflow

1. Load `AGENTS.md`, `CLAUDE.md`, and `.uncodixfy/config.json`.
2. Load `docs/ai/uncodixfy.md` and the requested prompt template.
3. Inspect nearby components and CSS before generating code.
4. Produce a small implementation plan with files, states, tests, and human checkpoints.
5. Generate components under the configured output roots.
6. Run `npm run build` or explain why it was not run.

## Design Contract

- Hydra is a desktop music player. Generate app surfaces, not marketing pages.
- Prefer existing CSS variables, spacing, typography, and route layout patterns.
- Keep onboarding compact and practical: choose mode, select folder, scan, play.
- Use lucide-react icons where icons are needed.
- Include empty, loading, success, and error states where the data flow can produce them.
- Do not add telemetry, analytics, external accounts, paid-service assumptions, or copyrighted media samples.

## Human Checkpoints

Ask before:

- Changing Tauri filesystem capabilities.
- Persisting local paths in a new storage layer.
- Adding UI libraries, CSS frameworks, animation packages, or icon sets.
- Changing first-run network behavior.
