This directory contains a base set of files for setting up i3

Instructions for 'de-fuckifing' a fresh unity install
-----------------------------------------------------

1. run: sudo apt update && sudo apt upgrade -y && sudo apt install -y i3 feh xautolock gnome-settings-daemon git
2. reboot and select i3 from the login interface, login
3. run: sudo apt purge -y compiz* *unity* lightdm && sudo apt autoremove -y
4. run: echo "exec i3" > ~/.xinitrc
5. run: gsettings set org.gnome.desktop.background show-desktop-icons false
6. edit /etc/default/grub
  * remove "quiet splash" from GRUB_CMDLINE_LINUX_DEFAULT
  * add "net.ifnames=0 biosdevname=0 text" to GRUB_CMDLINE_LINUX
  * uncomment GRUB_TERMINAL="console"
  * set desired timeout (I like 2) (I also comment out the lines containing '_HIDDEN_' so grub always shows for 2s)
7. run: git clone https://github/fatlard1993/dotfiles
8. run: mkdir ~/.i3 && cp ./dotfiles/i3/* ~/.i3/ && rm ~/.i3/README.md
9. add "username ALL=NOPASSWD: /home/username/.scripts/*" to your sudoers file (sudo visudo)
10. reboot (you will need to login and run startx before you are presented with a UI)


Multipule monitors in i3
  * xrandr --output X --left-of Y
