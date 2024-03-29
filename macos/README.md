# New MacBook Setup

## Manual Steps

1. `mkdir -p ~/Projects ; cd ~/Projects ; git clone https://github.com/fatlard1993/dotfiles`
1. You will be prompted to install xcode - upon completion, re-run the above line
1. `./dotfiles/bin/dot-update <profileName>`

- vscode
	- Authorize github on the first command to use auth

- system preferences
	- apple id > login
	- all the ___ permission checks
	- sound
		- default audio device
		- sound effect
	- displays
		- menubar location
	- desktop & screen saver
		- folder - add Wallpapers folder
			- change every hour
			- random order
	- keyboard
		- shortcuts
			- Mission Control
				- Switch to Desktop 1-10
					- CMD+X
			- Keyboard
				- Move focus to next window
					- CMD + Right

- countless "this app is from the internet, are you sure ... " prompts

- App logins

- chrome
	- settings
		- disable hardware acceleration
	- extensions
		- extension settings

- webex-meetings
	- dont start on login

- swiftbar
	- plugins location
	- launch at login

- karabiner must be started manually to request initial permissions


### Logitech Options Plus

this app doesnt have a brew install method as of yet: https://download01.logi.com/web/ftp/pub/techsupport/optionsplus/logioptionsplus_installer.zip

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

faster git server communication.
like a LOT faster. https://opensource.googleblog.com/2018/05/introducing-git-protocol-version-2.html
`git config protocol.version 2`

link "$dotfiles/vscode/settings.json" "$HOME/Library/Application Support/Code/User/settings.json"

https://github.com/yt-dlp/yt-dlp

terminal word hop blows up whole paths: /this/should/be/four

https://github.com/ttscoff/KeyBindings/blob/master/DefaultKeyBinding.dict
