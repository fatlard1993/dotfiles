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

1. sudo passwd root
2. logout. login as root
3. usermod -l newname pi
4. usermod -m -d /home/newname newname
5. logout. login as newname
6. passwd
7. sudo apt update && sudo apt upgrade -y && sudo apt install