---
name: music-client-ui-ux
description: Practical UI/UX guidance for desktop music clients. Use when designing, reviewing, or implementing Hydra Player screens for library browsing, playback, queues, playlists, albums, artists, search, onboarding, now playing, offline/local libraries, and music-focused navigation.
---

# Music Client UI/UX

## Core Workflow

1. Load `AGENTS.md`, `CLAUDE.md`, and nearby Hydra screens/components.
2. Identify the listener goal: browse, search, queue, play, organize, discover, configure, or recover from error.
3. Keep the main action obvious and persistent: playback controls, current track, queue access, and search should never feel lost.
4. Design the smallest working flow first, then add secondary controls.
5. Include empty, loading, offline, error, and no-results states for library surfaces.
6. Verify keyboard flow, narrow widths, long metadata, and missing artwork.

## Music Client Rules

- Prioritize scanability: title, artist, album, duration, state, and primary action should be quick to parse.
- Keep playback state visible: current track, play/pause, progress, volume, queue, repeat/shuffle where relevant.
- Preserve listener context when navigating between album, artist, playlist, and search results.
- Treat artwork as helpful but optional; missing art must still look intentional.
- Avoid marketing copy inside app workflows. Use short labels and direct actions.
- Prefer progressive disclosure for advanced controls such as EQ, replay gain, crossfade, loudness, and device sync.
- Do not bury destructive actions like remove from playlist, delete local index, or clear queue.

## Hydra Patterns

- Use `lucide-react` icons for controls.
- Reuse existing layout and CSS files under `src/styles/`.
- Prefer list density for tracks and albums; use cards only for repeated media items or modal-like surfaces.
- Ensure long titles and artists truncate cleanly without layout shift.
- Keep mobile/narrow layouts functional but desktop-first.

## Reference

Read `references/music-client-patterns.md` when working on a new music screen or reviewing a UX-heavy PR.
