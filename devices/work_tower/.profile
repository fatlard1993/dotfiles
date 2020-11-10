xrandr --output DP-0 --rotate left --auto --left-of DP-2 --dpi 117
xrandr --output DP-2 --rotate right --auto --right-of DP-0 --dpi 117 --pos 0x1440

xmodmap -e "remove Mod4 = Hyper_L" -e "add Mod3 = Hyper_L"
xmodmap -e "keysym Caps_Lock = Hyper_L"