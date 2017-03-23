This directory contains partial files intended to be concatenated via a script wit additional resources
Look in the devices sub-directory of this project for device sepcific i3 settings


### Multipule monitors in i3 are as simple as something like this:
```
xrandr --output X --left-of Y
```


### To fix cursor changing size when hovering system elements (status bar, window borders)
```
Add "Xcursor*size: 48" to the end of the following file:
sudo nano /etc/X11/Xresources/x11-common
```