This folder contains a base set of files for setting up i3


Instructions for 'de-fuckifing' a fresh unity install

1. run: sudo apt update && sudo apt upgrade -y && sudo apt install i3 feh xautolock gnome-settings-daemon
2. reboot and select i3 from the login interface, login
3. run: sudo apt purge some-unity-app-crap
4. run: gsettings set org.gnome.desktop.background show-desktop-icons false