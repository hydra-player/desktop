# Audio EQ Notes

## Defaults

- Default processing should be neutral: no EQ boost, no surprise loudness changes.
- Preserve bypass and reset actions.
- Store user presets separately from built-in presets.
- Use conservative gain ranges unless the engine has reliable headroom/limiting.

## Equalization

- Expose preamp/headroom when positive band boosts are allowed.
- Smooth parameter changes across short ramps to reduce clicks.
- Treat band labels as approximate center frequencies, not exact guarantees unless the filter code enforces them.
- Keep preset names descriptive and avoid genre stereotypes that imply correctness.

## Loudness And Gain

- ReplayGain and loudness normalization should be understandable and independently toggled where possible.
- Avoid double-applying gain from metadata and analysis.
- Show when a track lacks loudness metadata and what fallback is used.
- Use limiter/headroom language honestly; do not promise mastering-quality results.

## Tests

- Unit test gain clamping, preset serialization, and fallback metadata handling.
- Test that toggling bypass restores neutral processing state.
- Test migration of saved presets if the schema changes.
