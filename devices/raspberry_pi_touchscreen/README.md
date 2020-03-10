# Raspberry pi w/ touchscreen

This directory contains files specific to my raspberry pi 3A+ touchscreen

## gnome-terminal

* profile preferences
  * cursor shape ibeam
  * custom font source code pro 12

## Fresh install

`DIR=~/Projects && mkdir -p $DIR && cd $DIR && git clone https://github.com/fatlard1993/dotfiles.git & cd dotfiles && ./SETUP raspberry_pi_touchscreen`

Set session manager to lxsession and window manager to i3. After reboot run: `cd ~/Projects/dotfiles && ./devices/raspberry_pi_touchscreen/fixLxSession`

### Touchscreen calibration

`xinput-calibrator`