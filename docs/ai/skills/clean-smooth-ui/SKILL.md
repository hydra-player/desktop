---
name: clean-smooth-ui
description: Guidance for creating clean, smooth, polished application interfaces. Use when building or refining Hydra Player components, layouts, animations, spacing, visual hierarchy, responsive states, and interaction details.
---

# Clean Smooth UI

## Workflow

1. Inspect nearby UI and CSS before adding new patterns.
2. Define the hierarchy: primary content, persistent controls, secondary tools, status feedback.
3. Remove visual noise before adding decoration.
4. Make spacing, alignment, sizing, and state changes stable across data changes.
5. Add motion only when it clarifies continuity or feedback.
6. Check desktop, narrow, and mobile shell widths.

## Interface Rules

- Use fewer surfaces with clearer alignment. Do not nest cards.
- Keep border radius restrained, usually 8px or less unless matching existing Hydra styles.
- Avoid decorative orbs, bokeh, gratuitous gradients, and one-note palettes.
- Keep text inside buttons and panels from wrapping awkwardly or overflowing.
- Use icons for familiar tool actions and add accessible labels for icon-only controls.
- Use predictable controls: segmented controls for modes, sliders for numeric values, toggles for binary options, menus for option sets.
- Keep loading and disabled states calm; avoid layout shifts when data arrives.

## Smoothness Rules

- Prefer CSS transitions for opacity, transform, and color.
- Avoid animating width, height, top, left, or layout-heavy properties.
- Keep hover/focus states visible but subtle.
- Preserve scroll position and selection when possible.
- Do not animate controls that users need to hit repeatedly during playback.

## Reference

Read `references/ui-polish-checklist.md` before finalizing broad UI changes.
