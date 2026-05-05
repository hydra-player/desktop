# Install Hydra Player on Linux

This script automatically downloads and installs the latest Hydra Player release from GitHub Releases.

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/hydra-player/desktop/main/scripts/install.sh | sudo bash
```

## What it does

1. Detects your OS (Arch, Debian/Ubuntu, Fedora, or generic Linux)
2. Downloads the latest release from [GitHub Releases](https://github.com/hydra-player/desktop/releases/latest)
3. Installs the appropriate package for your system:
   - **Arch/Manjaro/CachyOS**: Installs via `yay` or `paru` (AUR: `hydra-player`)
   - **Debian/Ubuntu/Mint**: Downloads and installs the `.deb` package
   - **Fedora/RHEL**: Downloads and installs the `.rpm` package
   - **Other Linux**: Downloads and installs the AppImage

## Requirements

- `curl` or `wget`
- `sudo` privileges (for system-wide install)

## Manual Download

If you prefer to download manually, visit:
https://github.com/hydra-player/desktop/releases/latest

## After Installation

- If Hydra Player is already installed, the script will ask if you want to reinstall
- After installation, you can launch Hydra Player from your application menu or by running `hydra-player` in the terminal

## Troubleshooting

- **"hydra-player: command not found"**: Try logging out and back in, or run `hash -r` to clear the shell cache
- **Permission denied**: Make sure you have `sudo` privileges
- **AppImage won't run**: You may need to `chmod +x` the downloaded AppImage file

## Uninstall

- **Arch**: `yay -R hydra-player` or `sudo pacman -R hydra-player`
- **Debian/Ubuntu**: `sudo apt remove hydra-player`
- **Fedora**: `sudo dn remove hydra-player`
- **AppImage**: Simply delete the `.AppImage` file