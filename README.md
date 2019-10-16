# dotfiles
my collection of configs, scripts and various dotfiles

## Install
```DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git```


## Google Chrome
https://www.google.com/chrome/browser/desktop/index.html
```sudo dpkg -i ~/Downloads/google-chrome-stable*.deb; sudo apt install -f -y```


## Google Play Music Desktop Player
https://www.googleplaymusicdesktopplayer.com/#
```sudo dpkg -i ~/Downloads/google-play-music-desktop-player*.deb; sudo apt install -f -y```


## Save terminal profile
1) get id: ``` dconf dump /org/gnome/terminal/legacy/profiles:/ | grep -e "\[\:\|visible-name" ```
2) run: ``` dconf dump /org/gnome/terminal/legacy/profiles:/:<id>/ > ~/dotfiles/terminal_profiles/Tomorrow_Night.dconf ```

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