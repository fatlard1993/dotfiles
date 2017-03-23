This directory contains files specific to my Dell XPS 13 9360 'Devoloper Edition' (laptop)

Hardware Info
=============

touchscreen, clickpad

### Ports
 * 1 x thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

### Processor
i7-7500U CPU @ 2.70GHz (4 cores)

### Graphics
Iris Graphics 540

### Screen
13.3 inch WLED 3200 x 1800

### Wifi
QCA6174 802.11ac Wireless Network Adapter

### RAM
16Gb 1867MHz (2x 8Gb)

### SDD
512Gb

### Setup this device starting from a fresh ubuntu unity install:

1. sudo apt install -y git && cd ~ && git clone https://github.com/fatlard1993/dotfiles.git
2. cd ~/dotfiles && ./devices/setup
3. reboot


### chrome | touchscreen doesnt behave like a touch device
*chrome://flags
*Search for "Enable touch events"
*change from "automatic" to "enabled"
*reload chrome