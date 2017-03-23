This directory contains files specific to my Dell XPS 13 9360 'Devoloper Edition' (laptop)

Hardware Info
=============

Touchscreen, Apple-esque touchpad, no ethernet port

### Ports
 * 1 x Thunderbolt 3/usb-c
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



## Problems I Ran Into

### chrome | touchscreen doesnt behave like a touch device
*chrome://flags
*Search for "Enable touch events"
*change from "automatic" to "enabled"
*reload chrome

### nautilis opens a fullscreen background image
gsettings set org.gnome.desktop.background show-desktop-icons false

### trackpad issues ... WIP

### cursor changes size when over system elements
sudo nano /etc/X11/Xresources/x11-common
    Xcursor*size: 48

### setting fonts without tweak tool
gsettings set org.gnome.desktop.interface document-font-name 'Sans 24'
gsettings set org.gnome.desktop.interface font-name 'Ubuntu 24'
gsettings set org.gnome.desktop.interface monospace-font-name 'Ubuntu Mono 24'
gsettings set org.gnome.nautilus.desktop font 'Ubuntu 24'

### ui is tiny
(already included in the i3 config)
exec --no-startup-id xrandr --dpi 186

### dell repository
sudo add-apt-repository ppa:dell-team/ppa