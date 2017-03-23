This directory contains partial files intended to be concatenated with additional resources via a script
Look in the devices sub-directory of this project for examples in the form of device sepcific i3 settings
To adapt this platform to a new system, use an exsisting device folder structure as a modal


### Multipule monitors in i3 are as simple as something like this:
```
xrandr --output X --left-of Y
```


### To fix cursor changing size when hovering system elements (status bar, window borders)
```
Add "Xcursor*size: 48" to the end of the following file:
sudo nano /etc/X11/Xresources/x11-common
```