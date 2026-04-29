---
name: tauri-ui-best-practices
description: Tauri v2 frontend and desktop integration guidance for Hydra Player. Use when adding or reviewing Tauri commands, filesystem dialogs, local-library UI, window behavior, native capabilities, Rust-to-React data flow, and desktop-specific UI features.
---

# Tauri UI Best Practices

## Workflow

1. Load `AGENTS.md`, `CLAUDE.md`, Tauri config, capabilities, relevant Rust commands, and the calling React code.
2. Decide the boundary: UI-only, Tauri plugin API, custom Rust command, or native audio/backend module.
3. Keep permissions narrow and explain any new capability.
4. Design typed request/response payloads before wiring UI state.
5. Add pure tests for parsing/normalization helpers and manual checks for OS integration.
6. Verify error surfaces in the UI, not only console logs.

## Command Boundary Rules

- Prefer small Tauri commands with explicit inputs and serializable outputs.
- Keep path handling and security checks in Rust where possible.
- Never expose broad filesystem or shell access for convenience.
- Do not leak local paths, credentials, server URLs, or tokens in logs.
- Convert Rust errors into user-actionable messages at the UI boundary.
- Avoid long blocking work on the main thread; use async commands or background workers.

## UI Integration Rules

- Show progress for folder scans, downloads, sync, analysis, and other long operations.
- Provide cancellation or safe close behavior when operations can run long.
- Treat platform differences as first-class: Linux, Windows, macOS can diverge in dialogs, media keys, titlebar, and audio devices.
- Keep web UI resilient when native calls fail or are unavailable during browser-only dev.

## Reference

Read `references/tauri-hydra-checklist.md` for implementation and review checklists.
