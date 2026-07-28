# New MacBook Setup

## Setup

From a fresh machine, one command:

```sh
curl -fsSL https://raw.githubusercontent.com/fatlard1993/dotfiles/main/bootstrap | bash -s <profileName>
```

`bootstrap` triggers the Xcode command line tools install and waits for it to
finish (accept the prompt), clones the repo to `~/Projects/dotfiles`, and hands
off to `dot-update`.

If the repo is already cloned:

```sh
cd ~/Projects/dotfiles && ./dot-update <profileName>
```

The `cd` is not optional. `dot-update` starts with `ln -sf $(pwd) ~/.dotfiles`,
so running it from anywhere else — including from `~/Projects` — aims
`~/.dotfiles` at the wrong directory and every path lookup after that resolves
into that tree instead.

Touch ID for sudo is set up automatically via `/etc/pam.d/sudo_local`; it needs
Sonoma or newer and is skipped with a warning on anything older.

## Manual Steps

Everything below is either genuinely un-scriptable or not worth scripting.
Things that *used* to be on this list and are now handled by `dot-update`:

| Was manual | Now handled by |
| --- | --- |
| Chrome: disable hardware acceleration | `macos-config.d/chrome` |
| Mission Control: switch to desktop 1-10 on CMD+N | `macos-config.d/keyboard` |
| "this app is from the internet, are you sure?" prompts | `macos-config.d/misc` (`LSQuarantine`) + `HOMEBREW_CASK_OPTS=--no-quarantine` |
| Touch ID for sudo | `dot-update.d/pam` → `/etc/pam.d/sudo_local` |
| Logitech Options+ | `cask "logi-options+"` in `macos/Brewfile` |

### Privacy permissions

Can't be automated — the TCC database is SIP-protected, so grants have to be
clicked. These open the right pane directly:

```sh
open "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"  # yabai, skhd, raycast
open "x-apple.systempreferences:com.apple.preference.security?Privacy_ListenEvent"    # karabiner, skhd
```

Karabiner additionally has to be launched by hand once, to trigger its driver
extension approval prompt.

### Accounts and logins

Not automatable: Apple ID sign-in, per-app logins, and VS Code's GitHub
authorization (OAuth, browser round-trip).

### Not worth automating

- **Display arrangement / which display owns the menu bar** — set by dragging in
  Displays; no stable defaults key.
- **Login items** (e.g. stopping webex-meetings launching at login) — moved
  behind a SIP-protected background-task database on Ventura+.
- **Default audio device / alert sound** — device names differ per machine.
  `switchaudio-osx` can do it if it ever becomes worth pinning.
- **Desktop wallpaper rotation** (Wallpapers folder, hourly, random) — Sonoma
  moved wallpaper config into a sqlite store; the old `com.apple.desktop`
  defaults key no longer applies.

## Todo

- CMD + arrow keys to focus windows
- Home and End keys in web browser scroll instead of moving selector to end of line


## [Karabiner](https://support.wasdkeyboards.com/hc/en-us/articles/115009171728-How-do-add-native-Mac-hotkeys-to-my-keyboard-)

* Does not respect symlinked config file. If you make a change from the UI you will need to manually update this config file.
	* `cp $HOME/.config/karabiner/karabiner.json $HOME/.dotfiles/macos/`

## [Yabai](https://stevenlee090.github.io/yabai-skhd-wm/)

* [Disable SIP](https://github.com/koekeishiya/yabai/wiki/Disabling-System-Integrity-Protection)
	- Currently testing how far I can get without this part for now


## Misc Notes

* Fix zsh error complaint: https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories

https://github.com/moretension/duti

https://github.com/kcrawford/dockutil

https://github.com/jondot/awesome-devenv

https://github.com/yt-dlp/yt-dlp

terminal word hop blows up whole paths: /this/should/be/four

https://github.com/ttscoff/KeyBindings/blob/master/DefaultKeyBinding.dict
