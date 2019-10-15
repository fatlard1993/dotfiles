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

* general
	* check auto show when editing text
* window
	* check dock screen to edge
* theme
	* nightshade

## Fresh install

`DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git & cd dotfiles && ./SETUP raspberry_pi_touchscreen`

## Creating sd cards

`sudo dd bs=4M if=./Downloads/2019-09-26-raspbian-buster.img of=/dev/mmcblk0 conv=fsync`

[link](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)

## Interesting stuff

[one](https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=58432)
[two](https://www.raspberrypi.org/forums/viewtopic.php?t=24933)