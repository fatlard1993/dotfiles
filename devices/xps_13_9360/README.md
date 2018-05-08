This directory contains files specific to my Dell XPS 13 9360 'Developer Edition' (laptop)

## Hardware Info

touchscreen, clickpad

### Ports
 * 1 x thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

### Processor
i7-7500U CPU @ 2.70GHz (4 cores w/ hyperthreading capabilities)

### Graphics
Iris Graphics 540

### Screen
13.3 inch LED 3200 x 1800

### Wireless
QCA6174 802.11ac Wireless Network Adapter

### RAM
16Gb 1867MHz (2x 8Gb)

### SDD
512Gb


## Ubuntu 18.04 LTS setup notes

Installed with the extra options (normal install & download updates & install 3rd party software). The location picker seems to be a bit broken with this version

Getting firmware load errors for ath10k in syslog, but wireless adapter seems to be working fine. I seem to remember the problem was that it would randomly turn off so I will keep an eye out before trying to load in new stuff..

18.04 is using libinput as the default driver. I appear to have the same issue as before where the touchpad gets stuck thinking im using 2 fingers instead of one and wants to scroll when touched..

There is still the second (dead/dummy) touchpad entry "SynPS/2 Synaptics TouchPad", it is loading libinput by default. Verified not receiving data when tested with ```xinput test```

I installed libinput-tools to view the possible configuration options for my touchpad. It, however is reporting seemingly wrong information. For example tap to click and natural scrolling are both clearly enabled though reported as disabled. thinking this might be due to gnome taking ove a few things

I created a 10-touchpad-quirks.conf xorg file to ignore the "SynPS/2 Synaptics TouchPad" device, that removed it from the ```xinput list``` results but still shows as using libinput in the syslog and shows up in ```libinput list-devices```
```sudo mkdir -p /etc/X11/xorg.conf.d```
```
Section "InputClass"
  Identifier "ignore dummy touchpad device"
  MatchProduct "SynPS/2 Synaptics TouchPad"

  Option "Ignore" "true"
EndSection
```

I created a 30-touchpad.conf to disable tap to click which seems to have no effect...

Okay gnome settings is definitely overriding my xorg config file, I dont know how to get it to not.. so I suppose using this instead of the config file will suffice to get the behavior I desire, the following changes are necessary:
```
gsettings set org.gnome.desktop.peripherals.touchpad tap-to-click false
gsettings set org.gnome.desktop.peripherals.touchpad tap-and-drag false
gsettings set org.gnome.desktop.peripherals.touchpad speed 0.6
```

Installed xdotool and wmctrl to attempt setting up libinput gestures, which also required installing git and make ([libinput-gestures](https://github.com/bulletmark/libinput-gestures)) okay this works and its awesome, and super easy to customize!
```sudo apt install libinput-tools xdotool wmctrl```

I actually quite like the new login manager, I think I'll just keep it.

and now to install i3, this time Im going to try using the github repo instead of the debian repo due to annoying key issues. (using master, theoretically more stable) [detailed here](https://github.com/i3/i3/blob/master/docs/hacking-howto) this requires installing: build-essential cpanminus libx11-xcb-perl libxcb1-dev libxcb-keysyms1-dev libpango1.0-dev libxcb-util0-dev libxcb-icccm4-dev libyajl-dev libstartup-notification0-dev libxcb-randr0-dev libev-dev libxcb-cursor-dev libxcb-xinerama0-dev libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev autoconf libxcb-xrm0 libxcb-xrm-dev automake

it was also necessary to run(FIRST): ```cpanm X11::XCB```
and ```cpanm inc::Module::Install```
and from testcases dir ```cpanm .```
and from AnyEvent-I3 dir ```cpanm .```

after all that I still cant get the make check to pass.. failing to find AnyEvent

just apt installed i3status instead of fucking with source

okay, well my testing with i3 source didnt go quite as smoothly as I hoped for. back to using the deb package. ```sudo apt install i3```

now for hidpi scaling:
```
gsettings set org.gnome.desktop.interface scaling-factor 2
gsettings set org.gnome.desktop.interface text-scaling-factor 1.1
```

gnome-settings-daemon is now split into multipule files in ```/usr/lib/gnome-settings-daemon/```. it seems that the one I care about is ```/usr/lib/gnome-settings-daemon/gsd-xsettings``` and I think putting into ```~/.profile``` will suffice for launching it


turns out that the terminal profile loader isnt working anymore.. Odd too, the command fials within the script but if echoed out and ran by hand it is accepted. It, however, still doesnt load the profile..


## Old setup stuff

### Setup this device starting from a fresh ubuntu unity install:

1. sudo apt install -y git && cd ~ && git clone https://github.com/fatlard1993/dotfiles.git
2. cd ~/dotfiles && ./devices/xps_13_9360/setup
3. add "username ALL=NOPASSWD: /home/username/.scripts/*" to the end of your sudoers file via "sudo visudo"
4. sudo shutdown -r now
5. Extra steps that may or may not be needed are listed below:


### To fix touchscreen not behaving like a touch device in chrome
* chrome://flags
* Search for "Enable touch events"
* change from "automatic" to "enabled"
* reload chrome


### To fix mouse issues (3/22/17 I am unsure if this is necessary anymore or ever even helped)
```
echo "blacklist psmouse" > /etc/modprobe.d/xps-9360.config
```

### gnome-tweak-tool settings
apperance:
  global dark theme: on
  gtk+ theme high contrast
  icons gnome
fonts:
  scaling factor 1.7

### google play music desktop player
settings
  enable notifications
desktop settings
  uncheck minimize to tray
  custom dark theme, highlight: #81a2be
  enable playback api


### gnome-terminal
uncheck "show menubar by default on new terminals"
Shortcuts>view>"hide and show toolbar" alt+F4
profile preferences
  cursor shape ibeam
  custom font source code pro 12
colors
  text C5C8C6
  bg 1D1F21
  white FFFFFF
  black 373B41
  Dred C04343
  red CC6666
  Dgreen A1AA4A
  green B5BD68
  Dyellow DE935F
  yellow F0C674
  Dblue 608AAD
  blue 81A2BE
  Dpurple 9D77A8
  purple B294BB
  Dteal 6BADA4
  teal 8ABEB7
  Dgrey B4B7B4
  grey E0E0E0


### nvm
nvm install --lts

### vs code
 * copy and paste settings and keybindings
 * install packages

### sudo
```
Defaults Insults
```

### stuff
cd ~/Projects && \
  git clone https://github.com/imaustink/game.git && \
  git clone https://github.com/fatlard1993/copyPasta.git

cd ~/Projects/game && npm install
cd ~/Projects/copyPasta && npm install

if [ "$1" == "work" ]; then
  git config --global user.name  "fatlard1993"
  git config --global user.email "fatlard1993@gmail.com"

  cd ~/Projects && \
    git clone https://github.com/fatlard1993/symetrix-web-common.git && \
    git clone https://github.com/fatlard1993/control-server.git && \
    git clone https://github.com/fatlard1993/control-server-mother-hub.git && \
    git clone https://github.com/fatlard1993/dsp-web-interface.git

  cd ~/Projects/symetrix-web-common && npm install
  cd ~/Projects/control-server && npm install
  cd ~/Projects/control-server-mother-hub && npm install
  cd ~/Projects/dsp-web-interface && npm install
fi
