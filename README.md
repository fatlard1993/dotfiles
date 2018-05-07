# dotfiles
my collection of configs, scripts and various dotfiles

All scripts contained assume that this repository was cloned in this fashion:
```
cd ~ && git clone https://github.com/fatlard1993/dotfiles.git
```


## Good Apps

### (debateable) Google Chrome
https://www.google.com/chrome/browser/desktop/index.html
```
sudo dpkg -i ~/Downloads/google-chrome-stable*.deb; sudo apt install -f -y
```

### Google Play Music Desktop Player
https://www.googleplaymusicdesktopplayer.com/#
```
sudo dpkg -i ~/Downloads/google-play-music-desktop-player*.deb; sudo apt install -f -y
```




## Save terminal profile
1) get id: ``` dconf dump /org/gnome/terminal/legacy/profiles:/ | grep -e "\[\:\|visible-name" ```
2) run: ``` dconf dump /org/gnome/terminal/legacy/profiles:/:<id>/ > ~/dotfiles/terminal_profiles/Tomorrow_Night.dconf ```