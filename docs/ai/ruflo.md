# Ruflo Base

Ruflo is the multi-agent workflow base for Hydra Player Desktop. The current implementation is a repo-local orchestration map: it defines agent lanes, file ownership, staged flow order, checkpoints, and verification requirements.

## Entry Points

- Base config: `.ruflo/ruflo.yaml`
- Phase 1 flow: `.ruflo/flows/phase-1-local-library.yaml`
- Agent prompts: `.ruflo/agents/*.md`

## Required Workflow

1. Load `AGENTS.md`, `CLAUDE.md`, and `.ruflo/ruflo.yaml`.
2. Select the smallest flow stage that matches the task.
3. Assign exactly one owner for each file being edited.
4. Declare dependencies and human checkpoints before editing.
5. Require tests or manual verification from each agent.
6. Handoff with files changed, commands run, risks, and next stage.

## Starting Agent Lanes

- `repo_steward`: fork baseline, documentation, safe branding decisions.
- `ci_builder`: GitHub Actions and build/test scaffolding.
- `local_library_rust`: Tauri/Rust scan commands and local index persistence.
- `onboarding_ui`: Uncodixfy-driven local-library onboarding screens.
- `security_test`: security, privacy, CI, and negative-test review.

## Coordination Rules

- Agents are not alone in the codebase; they must not revert unrelated edits.
- Split implementation by file ownership, not by vague responsibility.
- Do not run release, signing, updater, or publishing tasks in Phase 1.
- Stop for human review on legal, privacy, release, dependency, filesystem permission, or product-scope changes.

## First Flow

Use `.ruflo/flows/phase-1-local-library.yaml` for the first local-library MVP sequence:

1. Repository baseline.
2. CI scaffold.
3. Local-library TypeScript domain.
4. Rust scan boundary.
5. Uncodixfy-generated onboarding UI.
6. Security and test pass.
