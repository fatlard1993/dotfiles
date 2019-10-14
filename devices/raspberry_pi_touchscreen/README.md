This directory contains files specific to my raspberry pi touchscreen

Currently running raspbian buster

Hardware Info
=============

### Ports

### Processor

### Graphics

### Screen

### Wifi

### RAM

### SDD


## gnome-terminal

* profile preferences
  * cursor shape ibeam
  * custom font source code pro 12

## onboard

* settings
	*

## Fresh install

1. passwd
2. sudo passwd root
3. logout. login as root
4. usermod -l newname pi
5. usermod -m -d /home/newname newname
6. logout. login as newname
8. sudo apt update && sudo apt install git -y
9. DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git
10. cd dotfiles && ./SETUP raspberry_pi_touchscreen
11. update-alternatives --config x-window-manager
12. In ~/.config/lxsession/LXDE/desktop.conf, change window_manager=openbox-lxde to window_manager=i3

## Creating sd cards

[link](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)

## Interesting stuff

[one](https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=58432)
[two](https://www.raspberrypi.org/forums/viewtopic.php?t=24933)