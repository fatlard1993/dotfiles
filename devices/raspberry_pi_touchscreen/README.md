# Raspberry pi w/ touchscreen

This directory contains files specific to my raspberry pi touchscreen

Currently running raspbian buster

## gnome-terminal

* profile preferences
  * cursor shape ibeam
  * custom font source code pro 12


## onboard

* general
	* check auto show when editing text
* window
	* check dock screen to edge


## Fresh install

`DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git & cd dotfiles && ./SETUP raspberry_pi_touchscreen`

Set session manager to lxsession and window manager to i3. After reboot run: `cd ~/Projects/dotfiles && ./devices/raspberry_pi_touchscreen/fixLxSession`

### User change

1. $`sudo passwd root`
2. $`logout`
3. login as root
4. #`usermod -l newname pi`
5. #`usermod -m -d /home/newname newname`
6. #`logout`
7. login as newname
8. $`passwd`

### Touchscreen calibration

`xinput-calibrator`

## Creating sd cards

`sudo dd bs=4M if=./Downloads/2019-09-26-raspbian-buster.img of=/dev/mmcblk0 conv=fsync`

[link](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)


## Interesting stuff

[one](https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=58432)
[two](https://www.raspberrypi.org/forums/viewtopic.php?t=24933)