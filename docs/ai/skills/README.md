# Hydra Player AI Skills

These repo-local skills are written in Codex skill format so agents can load them directly from `docs/ai/skills/<skill>/SKILL.md`. They are intentionally project-local because the repository already has a `.codex` file path, not a `.codex/skills` directory.

## Skills

- `music-client-ui-ux`: simple, practical UI/UX rules for music player screens and workflows.
- `clean-smooth-ui`: visual polish, responsive behavior, interaction states, and smooth UI guidance.
- `tauri-ui-best-practices`: Tauri v2 command boundaries, permissions, native integration, and UI error handling.
- `audio-eq-enhancement`: EQ, loudness, ReplayGain, presets, and audio enhancement guidance.

## Use

When a task matches one of these domains:

1. Read the relevant `SKILL.md`.
2. Load only the linked reference file if the task needs deeper guidance.
3. Follow `AGENTS.md` and `CLAUDE.md` alongside the skill.
4. Include tests or manual verification in the final handoff.
