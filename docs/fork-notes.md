# Hydra Player Fork Notes

Hydra Player is a GPLv3 desktop music player forked from Psysonic. This file tracks the Phase 1 fork baseline so branding work can move in dedicated, reviewable PRs without accidentally changing package identity, release behavior, or user data paths.

## Phase 1 Platform Support

- Primary development and verification target: Linux.
- Smoke coverage target after Linux is stable: Windows and macOS.
- Mobile targets, store distribution, release signing, and updater changes are out of scope for Phase 1 unless a maintainer explicitly approves them.

## Renamed In This Baseline

- npm package metadata: `package.json` and `package-lock.json` now use `hydra-player` and GPLv3 metadata.
- Rust package metadata: `src-tauri/Cargo.toml` now uses `hydra-player`, `Hydra Player Desktop Music Player`, and GPLv3 metadata.
- Tauri display metadata: `productName`, main window title, bundle short description, and bundle long description now present Hydra.
- Tauri capability description: `src-tauri/capabilities/default.json` now names Hydra Player.

## Intentionally Still Upstream-Branded

These Psysonic names remain in place during the transition because changing them can affect upgrades, release channels, packaging, persisted user data, or existing CLI workflows.

| Area | Current Psysonic references | Reason to defer |
| --- | --- | --- |
| Tauri app identity | `src-tauri/tauri.conf.json` keeps `identifier = "dev.psysonic.player"` | Package IDs affect install/upgrade identity and require a maintainer checkpoint. |
| Updater configuration | `src-tauri/tauri.conf.json` keeps the upstream public key and GitHub release endpoint | Updater endpoints and signing are release-sensitive and require approval before changing. |
| Rust binary and library names | `src-tauri/Cargo.toml` keeps `default-run = "psysonic"`, `[[bin]].name = "psysonic"`, and `psysonic_lib` | CLI name, build output names, imports, scripts, and completions still depend on these names. |
| CLI completions | `completions/psysonic.bash`, `completions/_psysonic`, and completion generation paths | Should be renamed with the binary and install scripts in one CLI migration PR. |
| Legacy image assets | `public/psysonic-inapp-logo.svg`, `public/logo-psysonic.png`, Tauri icon assets, and `app-icon.png` | Runtime shell surfaces now use Hydra web assets; package icons still need a dedicated icon-generation and platform review pass. |
| Release artifacts and distro packaging | `RELEASE_PROCESS.md`, `scripts/`, `nix/psysonic.nix`, `nixos-install.md`, `packages/aur/PKGBUILD`, and flake references | Publishing names, cache names, AUR package names, and install commands need separate release/packaging review. |
| Documentation and changelog | `README.md`, `PRIVACY.md`, `ORBIT.md`, `CHANGELOG.md`, and historical release notes | Historical upstream references and privacy/legal copy should be migrated deliberately. |
| App strings and source identifiers | React components, locales, localStorage keys, custom URL schemes, Subsonic client IDs, logs, and DBus/media names | These affect user data migration, deep links, protocol compatibility, and debugging expectations. |
| Vendored patches | `src-tauri/patches/**` includes comments such as "Psysonic patch" | Vendored or upstream patch context is historical provenance and should not be bulk-renamed. |

## Follow-Up Branding PRs

Recommended sequence:

1. CLI and packaging identity: introduce `hydra-player` binary/completions while keeping a compatibility path for `psysonic` if needed.
2. App identity: change Tauri identifier, updater channel, signing keys, and install/upgrade behavior after maintainer approval.
3. Visual identity: replace logos, icons, screenshots, and app artwork with Hydra assets.
4. Runtime strings and storage: migrate visible app strings, localStorage keys, custom schemes, user agents, logs, DBus/media names, and persisted data paths with compatibility notes.
5. Docs and release artifacts: update README, privacy docs, Nix/AUR/install docs, and release process once the new release channel is defined.

## PR Example

```md
PR: chore(repo): establish Hydra fork baseline
- Updates safe npm, Cargo, Tauri display, and capability metadata.
- Adds fork notes, migration inventory, and Phase 1 platform scope.
- Leaves release signing, updater endpoints, package IDs, CLI names, icons, and persisted app strings unchanged pending maintainer checkpoints.
```
