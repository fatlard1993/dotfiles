xrandr --output VGA-1 --rotate left --auto --left-of HDMI-1 --dpi 117
xrandr --output HDMI-1 --rotate right --auto --right-of VGA-1 --dpi 117 --pos 0x1440

setxkbmap -option caps:escape