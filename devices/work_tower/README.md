This directory contains files specific to my Dell XPS something something tower @ work

# This directory is currently in a non working "in-devolopment" state

Hardware Info
=============

### Ports
 * 1 x thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

### Processor
working

### Graphics
supplying graphs

### Screen
2 x ASUS PB258Q 25" WQHD LCD 2560 x 1440

### Wifi
in there somewhere

### RAM
eating all my grass

### HDD
1Tb thingy


### Setup this device starting from a fresh ubuntu unity install:

1. sudo apt install -y git && cd ~ && git clone https://github.com/fatlard1993/dotfiles.git
2. cd ~/dotfiles && ./devices/setup
3. add "username ALL=NOPASSWD: /home/username/.scripts/*" to the end of your sudoers file via "sudo visudo"
4. sudo shutdown -r now