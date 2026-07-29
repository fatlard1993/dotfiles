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

The CMD+N hotkeys above only *switch* to a desktop - they don't create one.
macOS starts a fresh machine with a single Space, and creating more isn't
scriptable without disabling SIP (see the Yabai section below): open Mission
Control (Control+Up), then click the `+` in the top-right once per desktop
you want (up to 9, to match CMD+1 through CMD+9).

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

## Todo

- CMD + arrow keys to focus windows
- Home and End keys in web browser scroll instead of moving selector to end of line


## [Karabiner](https://support.wasdkeyboards.com/hc/en-us/articles/115009171728-How-do-add-native-Mac-hotkeys-to-my-keyboard-)

* Does not respect symlinked config file. If you make a change from the UI you will need to manually update this config file.
	* `cp $HOME/.config/karabiner/karabiner.json $HOME/.dotfiles/macos/`

## [Yabai](https://stevenlee090.github.io/yabai-skhd-wm/)

* [Disable SIP](https://github.com/koekeishiya/yabai/wiki/Disabling-System-Integrity-Protection)
	- Currently testing how far I can get without this part for now

## Wallpaper

macOS port of ubuntu's reddit-scraped wallpaper pool (`ubuntu/bin/wallpaper*`)
for the download/dedup half only. Per-desktop rotation is native macOS
Shuffle instead of a scripted equivalent, because scripting it can't avoid
a visible Space-flip:

* `bin/wallpaper get [count] [subreddit]` — scrape/download/dedup into
  `~/Pictures/Wallpapers` (md5 exact-dupe + perceptual hash for reposts).
  Same engine as the ubuntu version, portable bash+wget+imagemagick+md5sum.
  Reddit rejects a generic User-Agent (403) and rate-limits fairly
  aggressively even with one set (429 after ~8 images in quick succession)
  - `get`'s own subreddit-cycling retry doesn't help against a 429, just
  wait a bit.
* `bin/wallpaper-triage` — keep/stash/delete/undo walk over the pool, same
  blacklist/journal logic as the ubuntu version. Viewer is `kitty +kitten
  icat` (renders inline in the same terminal) rather than feh's fullscreen
  slideshow - a qlmanage-based version worked but needed an extra
  close-the-window step per image; icat needs only the prompt.

**Per-desktop assignment is manual, one-time, native Shuffle** - System
Settings > Wallpaper > pick `~/Pictures/Wallpapers` as the source > enable
Shuffle, done once per Space. No script drives this, and that's deliberate,
not a shortcut:

* macOS *does* keep a distinct wallpaper per Space (confirmed with a
  solid-color test - unlike bspwm, which has one shared X11 root window and
  needs `wallpaper-per-desktop`'s feh + repaint-on-focus-event daemon to
  fake it), and there's a real private per-Space store
  (`~/Library/Application Support/com.apple.wallpaper/Store/Index.plist`,
  keyed by the same UUIDs `yabai -m query --spaces` reports) that looked
  promising to script directly.
* But a Space's wallpaper only ever actually repaints while that Space is
  focused, regardless of provider type (`imageFile` or `imageFolder` - the
  latter is exactly what native Shuffle itself writes) or a WallpaperAgent
  restart. Editing the store for a non-focused Space, then focusing it
  normally (no script involved), still shows the stale wallpaper. The
  caching lives deeper than WallpaperAgent - likely a WindowServer-level
  per-Space snapshot - with no signal available to invalidate it without
  actually visiting the Space.
* So a script driving rotation can only ever flip visibly through every
  Space to update it - yabai focus + `osascript ... set picture of
  desktop` does work, immediately, for whichever Space is currently
  focused, but that's the same visible cost as just doing the one-time
  Shuffle setup by hand and letting the OS own the timing from there.
  `workspaces-swoosh-animation-off` plus a near-zero
  `expose-animation-duration` (macos-config.d/mission-control) make manual
  Space-switching itself feel close to instant, for whenever you do switch.

All the mac-specific scripts set PATH explicitly at the top rather than
inheriting it - neither is ever sourced from an interactive zsh (own
shebang), so nothing from `.zshenv.d/path` is present. Shebang is the
absolute homebrew bash path (`/opt/homebrew/bin/bash`), not `/bin/bash` or
`env bash` - both use associative arrays and `**` globstar (bash 4+), and
macOS's system `/bin/bash` is a frozen 3.2 that shadows homebrew's by name
regardless of PATH order.


## Misc Notes

* Fix zsh error complaint: https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories

https://github.com/moretension/duti

https://github.com/kcrawford/dockutil

https://github.com/jondot/awesome-devenv

https://github.com/yt-dlp/yt-dlp

terminal word hop blows up whole paths: /this/should/be/four

https://github.com/ttscoff/KeyBindings/blob/master/DefaultKeyBinding.dict
