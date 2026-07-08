# Ubuntu

Setting up a new machine, one line:
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/fatlard1993/dotfiles/main/bootstrap)" bootstrap <profileName>
```

Use `bash -c "$(curl ...)"`, not `curl ... | bash` — piping straight into bash
steals stdin from the pipe, so the git username/email and sudo password prompts
below would hang instead of reaching your terminal. The `bootstrap` after the
command substitution is just a placeholder for `$0`; `<profileName>` becomes
`$1`, the profile to pass through to `dot-update`.

That one-liner installs `git`/`zsh`/`curl`, clones (or pulls, if already cloned)
the repo to `~/Projects/dotfiles`, and runs `./dot-update <profileName>`.
Equivalent manual steps, if you'd rather not pipe a script into bash:
```
sudo apt update -y && sudo apt upgrade -y && sudo apt install git zsh curl
mkdir -p ~/Projects ; cd ~/Projects ; git clone https://github.com/fatlard1993/dotfiles
cd ~/Projects/dotfiles ; ./dot-update <profileName>
```

You'll be prompted for your sudo password a few times until the script adds a
NOPASSWD sudoers rule for itself, and once for your git `user.name`/`user.email`
if they aren't already set globally. Everything else (packages, shell, DNS/adblock,
inotify watch limit, etc.) is unattended from there.

Log out and back in (or reboot) once it finishes — the login shell change and the
new `input`/`dialout` group memberships only take effect in a new session. Safe to
re-run `./dot-update <profileName>` any time; every step is idempotent.

## Sudo

* ```Defaults   insults``` — optional, not automated, add manually if wanted.
* The NOPASSWD sudoers rule and secure_path bypass are set up automatically by
  `ubuntu/dot-update.d/sudo`.


## wifi audio streaming

http://ubuntuhandbook.org/index.php/2014/12/stream-android-audio-to-ubuntu-wifi/

## ToDo

* might need to rotate some home videos for plex: https://ostechnix.com/how-to-rotate-videos-using-ffmpeg-from-commandline/
* Look into a simple auto ap to include
	* https://github.com/gitbls/autoAP
	* https://github.com/0unknwn/auto-hotspot