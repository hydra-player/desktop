# Uncodixfy Prompt: Hydra Onboarding Page

Load these files first:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/uncodixfy.md`
- `src/App.tsx`
- `src/pages/Login.tsx`
- `src/styles/theme.css`
- `src/styles/layout.css`
- `src/styles/components.css`

Generate a first-run onboarding page for Hydra Player's local-library MVP.

## Outputs

- `src/pages/Onboarding.tsx`
- `src/components/onboarding/LibraryModeStep.tsx`
- `src/components/onboarding/FolderPickerStep.tsx`
- `src/components/onboarding/ScanProgressStep.tsx`
- `src/components/onboarding/FirstPlaybackStep.tsx`

## Requirements

- Use React, TypeScript, existing app styles, and lucide-react icons.
- Keep the first screen operational: library mode selection, folder selection, scan state, first playback state.
- Include loading, empty, success, and error states for scan-related surfaces.
- Do not create a marketing hero, decorative gradients, telemetry copy, or account/signup assumptions.
- Keep folder permission language short and privacy-first.
- Add explicit TODO comments only where a Tauri command or store does not exist yet.

## Verification

Return:

- Files changed.
- Any generated TODOs.
- Tests added or a manual verification checklist.
- Human checkpoints, especially filesystem permissions and persistent path storage.
