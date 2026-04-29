# UI Polish Checklist

## Layout

- Align controls on a clear grid.
- Use stable dimensions for buttons, rows, artwork, tabs, and counters.
- Avoid page sections styled as floating cards.
- Keep repeated items consistent in height unless content demands otherwise.

## Typography

- Use compact headings inside panels and dashboards.
- Do not scale font size with viewport width.
- Keep letter spacing at 0 unless matching an existing style.
- Truncate long single-line metadata and allow readable wrapping only where intended.

## Interaction

- Hover, active, selected, disabled, loading, and error states exist.
- Focus is visible and not clipped.
- Tooltips explain unfamiliar icon-only controls.
- Transitions do not delay core playback controls.

## Final Pass

- Test with missing artwork, long metadata, empty lists, and narrow widths.
- Scan CSS for overuse of one hue family.
- Confirm no text overlaps or is hidden behind fixed controls.
