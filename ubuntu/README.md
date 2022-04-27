# Ubuntu

Setting up a new machine:


Install the base dependancies:
```
sudo apt update -y && sudo apt upgrade -y && sudo apt install git zsh curl
```

Clone the dotfiles repo to a folder of your choice:
```
mkdir -p ~/Projects ; cd ~/Projects ; git clone https://github.com/fatlard1993/dotfiles
```

Run the update script:
```
cd ~/Projects ; ./dot-update <profileName>
```

## VS code

add ```fs.inotify.max_user_watches=524288``` to the end of ```/etc/sysctl.conf``` and then run ```sudo sysctl -p```


## Sudo

* ```Defaults   insults```
* ```$USER   ALL=NOPASSWD: $HOME/.dotfiles/*```


## wifi audio streaming

http://ubuntuhandbook.org/index.php/2014/12/stream-android-audio-to-ubuntu-wifi/

## ToDo

* might need to rotate some home videos for plex: https://ostechnix.com/how-to-rotate-videos-using-ffmpeg-from-commandline/
* Look into a simple auto ap to include
	* https://github.com/gitbls/autoAP
	* https://github.com/0unknwn/auto-hotspot