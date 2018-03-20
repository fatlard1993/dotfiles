xrandr --output DVI-D-0 --rotate left --auto --left-of HDMI-0 --dpi 117
xrandr --output HDMI-0 --rotate right --auto --right-of DVI-D-0 --dpi 117 --pos 0x1440

setxkbmap -option caps:escape

gnome-settings-daemon &

exec i3