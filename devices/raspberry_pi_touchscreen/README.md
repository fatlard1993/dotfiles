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
AMBOLOVE


### External HDD
Open /etc/fstab and add:
```
#Automount rules for 500Gb HDD
UUID=672B-B041 /media/storage vfat uid=1000,gid=1000,umask=0022,sync,auto,rw 0 0
```

In the BIOS I had to uncheck "boot USB devices first"

gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout '0' && gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout '0'


### gnome-terminal
uncheck "show menubar by default on new terminals"
Shortcuts>view>"hide and show toolbar" alt+F4
profile preferences
  cursor shape ibeam
  custom font source code pro 12