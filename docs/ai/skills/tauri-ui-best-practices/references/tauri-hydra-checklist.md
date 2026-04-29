# Tauri Hydra Checklist

## Before Adding A Command

- Can an existing Tauri plugin API solve it safely?
- Is the command input typed and minimal?
- Is the response serializable and stable?
- Are paths validated and normalized in Rust?
- Does the command require a capability update?
- Does the UI handle failure without crashing?

## Local Library

- Use folder picker APIs rather than raw path text entry when possible.
- Avoid following symlinks unless explicitly approved.
- Skip hidden/system folders unless the user asked for them.
- Do not log full user library paths in normal mode.
- Keep scan progress useful without exposing sensitive path details unnecessarily.

## Long Work

- Move scanning, analysis, download, and sync work off the UI thread.
- Emit progress events or return resumable state where feasible.
- Support cancellation for work that may take minutes.
- Debounce repeated UI invocations.

## Review

- Run or document `npm run build`, `npm run test`, and relevant Cargo checks.
- Inspect `src-tauri/capabilities/` and `tauri.conf.json` for permission drift.
- Confirm browser-only development mode has graceful fallbacks.
