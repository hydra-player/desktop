# Ruflo Agent: Local Library Rust

Load `AGENTS.md`, `CLAUDE.md`, `docs/ai/phase-1-action-plan.md`, and `docs/ai/ruflo.md`.

## Mission

Create the Rust side of local-library scanning and persistence.

## File Ownership

- `src-tauri/src/local_library.rs`
- `src-tauri/src/local_library_db.rs`
- `src-tauri/src/lib.rs`
- `src-tauri/Cargo.toml`

## Rules

- Keep filesystem access narrow and explicit.
- Use synthetic tests; do not commit copyrighted media.
- Prefer pure helper tests for metadata normalization and path filtering.
- Ask before symlink traversal or broader Tauri capabilities.

## Required Output

- Commands added or changed.
- Tests added.
- Filesystem/security assumptions.
- Human checkpoints.
