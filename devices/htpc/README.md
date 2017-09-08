This directory contains files specific to my htpc (Intel NUC5I3RYK)

Hardware Info
=============

### Ports
 * 1 x thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

### Processor
i3-5010U CPU @ 2.10GHz (2 Cores w/ Hyper-Threading)

### Graphics
Intel HD Graphics 5500

### Screen
Hitiachi 42" TV

### Wifi
Intel Wireless 7265

### RAM
???

### SDD
120Gb m.2 ssd
500Gb sata > usb 

### Keyboard
Rii mini i8


### Setup this device starting from a fresh ubuntu unity install:

1. sudo apt update && sudo apt install openssh-server <- so I can do all this crap from the comfort of the couch
1. sudo apt install -y git && cd ~ && git clone https://github.com/fatlard1993/dotfiles.git
2. cd ~/dotfiles && ./devices/htpc/setup
3. add "username ALL=NOPASSWD: /home/username/.scripts/*" to the end of your sudoers file via "sudo visudo"
4. sudo shutdown -r now
5. Extra steps that may or may not be needed are listed below:


### External HDD
Open /etc/fstab and add:
```
#Automount rules for 500Gb HDD
UUID=672B-B041 /media/storage vfat uid=1000,gid=1000,umask=0022,sync,auto,rw 0 0
```

In the BIOS I had to uncheck "boot USB devices first"

### vlc
```
sudo apt install -y vlc && sudo apt purge -y totem*
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
  text    C5C8C6 (bold same as text)
  bg      1D1F21
  black   373B41
  Dgrey   B4B7B4
  Dred    C04343
  red     CC6666
  Dgreen  A1AA4A
  green   B5BD68
  Dyellow DE935F
  yellow  F0C674
  Dblue   608AAD
  blue    81A2BE
  Dpurple 9D77A8
  purple  B294BB
  Dteal   6BADA4
  teal    8ABEB7
  grey    E0E0E0
  white   FFFFFF


### nvm
nvm install --lts

### vs code
 * copy and paste settings
 * install packages (add-ons)

### sudo
```
Defaults insults
```

### git
```
git config --global user.email "fatlard1993@gmail.com"
git config --global user.name "fatlard1993"
```