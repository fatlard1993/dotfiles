##This directory contains scripts I find handy for various reasonss

To make this easier to script add this line to your sudoers file:
username ALL=(ALL) NOPASSWD: /home/username/.scripts/*


###getWindowCriteria
This script is handy for capturing xwininfo in an easy to use with i3 format

Run the program and click a window. (click the content of the window not the border)
OR
execute a program and pipe the output to capture things like splashscreens, or quick pop-up windows.

###ledCtl
This script is intended for use with my xps13 to add the feature of a harddrive activity LED.
BUT
It is genaric enough and should work with little to no modification on other computers.

###system
This script simply provides useful proxy to some handy functions:
lock | logout | suspend | hibernate | reboot | shutdown