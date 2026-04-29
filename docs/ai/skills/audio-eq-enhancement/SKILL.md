---
name: audio-eq-enhancement
description: Music equalization and audio enhancement guidance for Hydra Player. Use when designing, implementing, or reviewing EQ, presets, loudness normalization, ReplayGain, crossfade, analysis, limiter/headroom, audio settings UI, and playback-quality features.
---

# Audio EQ Enhancement

## Workflow

1. Load `AGENTS.md`, `CLAUDE.md`, audio-related Rust code, player store code, and existing EQ/settings UI.
2. Identify whether the task is signal processing, metadata/analysis, settings UI, preset management, or playback integration.
3. Preserve audio safety: avoid clipping, unexpected gain jumps, and non-consensual processing.
4. Keep defaults neutral and reversible.
5. Add tests for pure math, preset serialization, metadata interpretation, and state transitions.
6. Include manual listening checks only as a supplement, not the only verification.

## Audio Rules

- Keep EQ gains bounded and expose headroom when boosts are possible.
- Apply smooth parameter changes to avoid clicks/pops.
- Avoid stacking loudness normalization, ReplayGain, EQ boost, and enhancer gain without a limiter or headroom strategy.
- Prefer transparent naming: "Preamp", "ReplayGain", "Loudness normalization", "Crossfade", "Limiter".
- Make bypass obvious and quick.
- Persist presets carefully and keep import/export formats stable.
- Never imply that enhancement can recover lost fidelity from poor sources.

## UI Rules

- Use sliders/steppers for band gain and preamp.
- Use toggles for binary processing stages.
- Use presets menus for named EQ curves.
- Show reset/bypass controls near the processor they affect.
- Make advanced audio options discoverable but not dominant in the main playback UI.

## Reference

Read `references/audio-eq-notes.md` when touching DSP, loudness, presets, or audio-settings UI.
