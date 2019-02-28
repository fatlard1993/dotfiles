This directory contains files specific to my raspberry pi touchscreen

Hardware Info
=============

### Ports

### Processor

### Graphics

### Screen

### Wifi

### RAM

### SDD

### gnome-terminal
uncheck "show menubar by default on new terminals"
Shortcuts>view>"hide and show toolbar" alt+F4
profile preferences
  cursor shape ibeam
  custom font source code pro 12

### Fresh install

1. passwd
2. sudo passwd root
3. logout. login as root
4. usermod -l newname pi
5. usermod -m -d /home/newname newname
6. logout. login as newname
7. sudo raspi-config
8. sudo apt update && sudo apt install git -y