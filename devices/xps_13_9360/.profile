xrandr --dpi 276

setxkbmap -option caps:escape

xinput set-prop 12 278 0
xinput set-prop 12 284 1
xinput set-prop 12 292 {0 1}
xinput set-prop 12 296 0.5

/usr/lib/gnome-settings-daemon/gsd-xsettings &