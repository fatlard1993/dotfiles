# dotfiles

my collection of configs, scripts and various dotfiles

## Install

```DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git && ./dotfiles/scripts/dotfiles-update```


## Google Chrome

https://www.google.com/chrome/browser/desktop/index.html
```sudo dpkg -i ~/Downloads/google-chrome-stable*.deb; sudo apt install -f -y```


## Google Play Music Desktop Player

https://www.googleplaymusicdesktopplayer.com/#
```sudo dpkg -i ~/Downloads/google-play-music-desktop-player*.deb; sudo apt install -f -y```


## Save gnome-terminal profile

1) get id: ``` dconf dump /org/gnome/terminal/legacy/profiles:/ | grep -e "\[\:\|visible-name" ```
2) run: ``` dconf dump /org/gnome/terminal/legacy/profiles:/:<id>/ > $DOTFILES/temp/<name>.dconf ```

## VS code

Install the settings Sync extension and press ```Shift + Alt + D```

Generate a new token with gist permissions.

Gist ID: ```840e909429cfa3e896568c2ea01ac241```

add ```fs.inotify.max_user_watches=524288``` to the end of ```/etc/sysctl.conf``` and then run ```sudo sysctl -p```


## Flush dns cache

```sudo service dnsmasq restart```


## Sudo settings

* ```Defaults   insults```
* ```$USER   ALL=NOPASSWD: /home/$USER/.scripts/*```


## LXTerm

[theme](https://askubuntu.com/questions/442887/changing-the-colors-of-lxterminal)


## bashrc

[ps1 generator](http://bashrcgenerator.com/)

https://wiki.archlinux.org/index.php/Bash/Prompt_customization


## wifi audio streaming

http://ubuntuhandbook.org/index.php/2014/12/stream-android-audio-to-ubuntu-wifi/


## Startup node apps

1. `npm i -g pm2`
2. `cd app`
3. `pm2 start index.js`
4. `pm2 startup`
5. `pm2 save`


## Scripts

Add this line to the end of your sudoers file:
username ALL=(ALL) NOPASSWD: /home/username/.scripts/*

### i3-window-criteria

This script outputs xwininfo in an "easy to use with i3" format

Run the program and click a window. (click the content of the window not the border)
OR
execute a program and pipe the output to capture things like splashscreens, or quick pop-up windows

### led-control

This script hijacks the caps lock LED and mimics the function of a HDD LED

### system

This script simply provides useful proxy to some handy functions:
lock | exit | suspend | hibernate | reboot | shutdown

### wallpaper

This script provides the getting and setting of wallpapers.
Run the script with no parameters to see usage.

### gpmdp.js

This is a node app that is used for talking to the gpmdp application.
It is very raw and doesn't do much, I just made it when I was bored..

### i3-init-workspaces

This script runs at login and sets up a base set of windows in workspaces.

* vs code automatically reopens a new window with the most recent thing used. Trying to disable this behavior ... Setting the "window.restoreWindows" to "none" and even "files.hotExit" to "off seems to do nothing.. I dont yet know how to fix this..

# ToDo

* make scripts for ubuntu based vs raspbian based and for headless vs i3
* make things into symlinks or directly change references to files instead of copying them all over
* use symlinks for wallpaper subreddits and ignore
* might need to rotate some home videos for plex: https://ostechnix.com/how-to-rotate-videos-using-ffmpeg-from-commandline/
* Look into a simple auto ap to include
	* https://github.com/gitbls/autoAP
	* https://github.com/0unknwn/auto-hotspot