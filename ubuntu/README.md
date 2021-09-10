# dotfiles

my collection of configs, scripts and various dotfiles

## Install

```DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git && ./dotfiles/scripts/dotfiles-update```


## Google Chrome

https://www.google.com/chrome/browser/desktop/index.html
```sudo dpkg -i ~/Downloads/google-chrome-stable*.deb; sudo apt install -f -y```


## Save gnome-terminal profile

1) get id: ``` dconf dump /org/gnome/terminal/legacy/profiles:/ | grep -e "\[\:\|visible-name" ```
2) run: ``` dconf dump /org/gnome/terminal/legacy/profiles:/:<id>/ > $DOTFILES/temp/<name>.dconf ```

## VS code

Install the settings Sync extension and press ```Shift + Alt + D```

Generate a new token with gist permissions.

add ```fs.inotify.max_user_watches=524288``` to the end of ```/etc/sysctl.conf``` and then run ```sudo sysctl -p```


## Flush dns cache

```sudo service dnsmasq restart```


## Sudo settings

* ```Defaults   insults```
* ```$USER   ALL=NOPASSWD: /home/$USER/.scripts/*```


## LXTerm

[theme](https://askubuntu.com/questions/442887/changing-the-colors-of-lxterminal)


## wifi audio streaming

http://ubuntuhandbook.org/index.php/2014/12/stream-android-audio-to-ubuntu-wifi/

### i3-window-criteria

This script outputs xwininfo in an "easy to use with i3" format

Run the program and click a window. (click the content of the window not the border)
OR
execute a program and pipe the output to capture things like splashscreens, or quick pop-up windows

# ToDo

* might need to rotate some home videos for plex: https://ostechnix.com/how-to-rotate-videos-using-ffmpeg-from-commandline/
* Look into a simple auto ap to include
	* https://github.com/gitbls/autoAP
	* https://github.com/0unknwn/auto-hotspot