# New MacBook Setup

## Manual Setps

1. `mkdir -p ~/Projects ; cd ~/Projects ; git clone https://github.com/fatlard1993/dotfiles`
1. You will be prompted to install xcode - upon completion, re-run the above line
1. `./dotfiles/bin/dot-update <profile>`

- vscode
	- Authorize github on the first command to use auth
	- Install Settings Sync extension, then press `Shift + Alt + D`
		- login w/ github

- system preferences
	- apple id > login
	- all the ___ permission checks


## Install Apps

* alerter: https://github.com/vjeantet/alerter/releases
	* `mv ~/Downloads/alerter /usr/local/bin/`
* swiftbar
	* System
		* Show hidden files in Finder
		* Screenshotter
		* Real CPU Usage
		* Ejector
		* Clipboard History
		* Caffeinate
	* Time
		* Countdown Timer 2
		* Alarm Clock
	* Tools
		* yabai/skhd helper
* Fix zsh error complaint: https://stackoverflow.com/questions/13762280/zsh-compinit-insecure-directories

## System Preferences

* Desktop
	* Picture
* Displays
	* Arrangement
* Dock
	* [x] Automatically hide and show the Dock
	* [ ] Show recent applications
	* Magnification
		* Max
* Mission Control
	* Automatically rearrange spaces
	* Show Desktop
	* F6
* Keyboard
	* Shortcuts
	* Input Sources
		* Show Input Menu
	* Dictation
		* Shortcut
			* Either Command Key


## Chrome Preferences

* Disable hardware acceleration

## [Karabiner](https://support.wasdkeyboards.com/hc/en-us/articles/115009171728-How-do-add-native-Mac-hotkeys-to-my-keyboard-)

* Does not respect symlinked config file. If you make a change from the UI you will need to manually update this config file.
	* `cp $HOME/.config/karabiner/karabiner.json $HOME/Projects/dotfiles/devices/macbook_pro/`

## [Yabai](https://stevenlee090.github.io/yabai-skhd-wm/)

* [Disable SIP](https://github.com/koekeishiya/yabai/wiki/Disabling-System-Integrity-Protection)
* sudo yabai --install-sa


https://github.com/moretension/duti

https://github.com/kcrawford/dockutil

https://github.com/jondot/awesome-devenv

https://github.com/yt-dlp/yt-dlp