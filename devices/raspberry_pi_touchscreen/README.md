# Raspberry pi w/ touchscreen

This directory contains files specific to my raspberry pi 3A+ touchscreen

## gnome-terminal

* profile preferences
  * cursor shape ibeam
  * custom font source code pro 12

## Fresh install

1. [Download](https://downloads.raspberrypi.org/raspbian_latest)
2. Write the image to a usb drive
3. Boot the pi
4. Complete the "Welcome to Raspberry Pi" setup dialog
	1. Country setup
	2. Change password
	3. Setup screen
	4. Wifi
	5. Update software - (skip)
	6. Reboot - (skip)
6. Open terminal
	1: `pi@raspberrypi:~ $ git clone https://github.com/fatlard1993/dotfiles`
	2: `pi@raspberrypi:~ $ ./dotfiles/scripts/update-dotfiles raspberry_pi_touchscreen`

Set session manager to lxsession and window manager to i3.

### Touchscreen calibration

`xinput-calibrator`