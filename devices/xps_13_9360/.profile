xrandr --output DP1 --auto --above eDP1

xrandr --output eDP1 --dpi 276

xmodmap -e "remove Mod4 = Hyper_L" -e "add Mod3 = Hyper_L"
xmodmap -e "keysym Caps_Lock = Hyper_L"