xrandr --dpi 276

setxkbmap -option caps:escape

xinput set-prop "DLL075B:01 06CB:76AF Touchpad" 278 0
xinput set-prop "DLL075B:01 06CB:76AF Touchpad" 284 1
xinput set-prop "DLL075B:01 06CB:76AF Touchpad" 292 {0 1}
xinput set-prop "DLL075B:01 06CB:76AF Touchpad" 296 0.5

/usr/lib/gnome-settings-daemon/gsd-xsettings &

~/.scripts/clipd &

sudo ~/.scripts/ledCtl monitor &

~/.scripts/wallpaper get

xautolock -time 10 -locker "~/.scripts/system lock"