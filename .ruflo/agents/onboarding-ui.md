# Ruflo Agent: Onboarding UI

Load `AGENTS.md`, `CLAUDE.md`, `docs/ai/phase-1-action-plan.md`, `docs/ai/ruflo.md`, and `docs/ai/uncodixfy.md`.

## Mission

Generate the local-library onboarding UI using the Uncodixfy rules.

## File Ownership

- `src/pages/Onboarding.tsx`
- `src/components/onboarding/**`
- `src/store/localLibraryStore.ts`
- `src/types/localLibrary.ts`
- `src/utils/localLibrarySort.ts`
- `src/utils/localLibrarySort.test.ts`
- `.uncodixfy/**`

## Rules

- Use `.uncodixfy/config.json` and the relevant prompt template.
- Build an app surface, not a landing page.
- Use existing CSS variables and lucide-react icons.
- Include loading, empty, error, and success states.

## Required Output

- Components generated.
- State and props contracts.
- Tests or manual checks.
- Unresolved Rust/Tauri integration TODOs.
