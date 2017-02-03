This directory contains files specific to my Dell XPS13 'Devoloper Edition' (laptop)

Hardware Info
=============

Touchscreen, Apple-esque touchpad, no ethernet port

###Ports
 * 1 x Thunderbolt 3/usb-c
 * 2 x usb
 * 1 x headphone/mic
 * 1 x sd card

###Processor
i7-7500U CPU @ 2.70GHz (4 cores)

###Graphics
Iris Graphics 540

###Screen
13.3 inch WLED 3200 x 1800

###Wifi
QCA6174 802.11ac Wireless Network Adapter

###RAM
16Gb 1867MHz (2x 8Gb)

###SDD
512Gb



#Notes

###chrome
chrome is a son of a bitch and to get the damn touchscreen working I had to enable one little thing.. that thing is:
*chrome://flags
*Search for "Enable touch events"
*change from "automatic" to "enabled"
*reload chrome

###tlp
a general reminder that if the harddrive gets a non sda/sdb name to add that to the tlp config

###tweak tool
set scale factor to 2.0

gsettings set org.gnome.desktop.background show-desktop-icons false


/etc/modprobe.d/xps-9360.config
    blacklist psmouse