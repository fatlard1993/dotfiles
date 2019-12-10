xrandr --output DVI-D-1 --rotate left --auto --left-of HDMI-1 --dpi 117
xrandr --output HDMI-1 --rotate right --auto --right-of DVI-D-1 --dpi 117 --pos 0x1440
xrandr --output VGA-1 --auto --left-of DVI-D-1 --mode 1024x768

setxkbmap -option caps:escape