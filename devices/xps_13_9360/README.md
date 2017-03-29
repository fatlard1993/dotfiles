This directory contains files specific to my Dell XPS 13 9360 'Devoloper Edition' (laptop)

Hardware Info
=============

touchscreen, clickpad

### Ports
 * 1 x thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

### Processor
i7-7500U CPU @ 2.70GHz (4 cores)

### Graphics
Iris Graphics 540

### Screen
13.3 inch WLED 3200 x 1800

### Wifi
QCA6174 802.11ac Wireless Network Adapter

### RAM
16Gb 1867MHz (2x 8Gb)

### SDD
512Gb


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
  scaling factor 1.5

### gnome-terminal
uncheck "show menubar by default on new terminals"
Shortcuts>view>"hide and show toolbar" alt+F4

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
    git clone https://github.com/fatlard1993/symetrix-common.git && \
    git clone https://github.com/fatlard1993/control-server.git && \
    git clone https://github.com/fatlard1993/control-server-mother-hub.git && \
    git clone https://github.com/fatlard1993/unit-status.git
  
  cd ~/Projects/symetrix-common && npm install
  cd ~/Projects/control-server && npm install
  cd ~/Projects/control-server-mother-hub && npm install
  cd ~/Projects/unit-status && npm install
fi
