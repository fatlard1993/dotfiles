## This directory contains scripts I find handy for various reasonss

Add this line to the end of your sudoers file:
username ALL=(ALL) NOPASSWD: /home/username/.scripts/*

### getWindowCriteria
This script outputs xwininfo in an "easy to use with i3" format

Run the program and click a window. (click the content of the window not the border)
OR
execute a program and pipe the output to capture things like splashscreens, or quick pop-up windows

### ledCtl
This script hijacks the caps lock LED and mimics the function of a HDD LED

### system
This script simply provides useful proxy to some handy functions:
lock | logout | suspend | hibernate | reboot | shutdown

### clipd
This script provides a clipboard manager utilizing dmenu

### wallpaper
This script provides the getting and setting of wallpapers.
Run the script with no parameters to see usage.

### gpmdp.js
This is a node app that is used for talking to the gpmdp application.
It is very raw and doesn't do much, I just made it when I was bored..

### initWorkspaces

This script runs at login and sets up a base set of windows in workspaces.

* vs code automatically reopens a new window with the most recent thing used. Trying to disable this behavior ... Setting the "window.restoreWindows" to "none" and even "files.hotExit" to "off seems to do nothing.. I dont yet know how to fix this..