# Hydra Branding And Design Manual

Hydra is the product name. Use `Hydra` in titles, settings copy, app metadata, and documentation. Use lowercase `hydra` only in the wordmark.

## Logo System

- Primary shell label: Hydra mark on the left, lowercase `hydra` wordmark on the right.
- Compact mark: use the Hydra mark by itself in collapsed navigation, image fallbacks, and square surfaces.
- Shape language: rounded central head, horn tips, and six curled arms based on the original Hydra mark supplied for the fork.
- Color treatment: neutral white or light gray at the mark start, purple as the primary highlight, and cyan as the prism end color.
- Do not reuse Psysonic logos, P-only marks, or Psysonic wordmarks for new UI.

## Color System

- Default theme: `hydra`, a neutral gray desktop shell.
- Core neutrals: near-black sidebar/player, charcoal app background, and slightly lifted card surfaces.
- Primary highlight: purple `#9b5cff`.
- Prism support colors: red `#ff5c7a`, orange `#ff9f43`, yellow `#ffe66d`, green `#5cff9d`, cyan `#00c8ff`, blue `#6f7dff`.
- Use rainbow/prism accents sparingly: borders, progress edges, logo gradients, and celebratory states. Normal controls should stay gray and purple.

## Typography

- UI text: existing font variables, defaulting to Inter.
- Display/product text: `var(--font-display)`.
- Wordmark: lowercase `hydra`, heavy weight, no negative letter spacing.
- Keep shell typography compact and desktop-native.

## UI Rules

- Build the real music player surface first. Do not create marketing hero layouts for app screens.
- Keep cards at 8px radius or less unless an existing component already uses a larger local pattern.
- Prefer dense, accessible desktop controls over decorative panels.
- Avoid telemetry, analytics copy, account-growth assumptions, and unexpected network behavior.
- Keep inherited compatibility names, storage keys, share schemes, CLI names, updater endpoints, and package identifiers until their migration has a dedicated checkpoint.

## Assets

- React shell logo: `src/components/HydraLogo.tsx`.
- Public logo: `public/hydra-logo.svg`.
