**This machine is the vps** (headless, reached over ssh and through paude):
- No display: the screen section above doesn't apply here (no X, `scrot`, `xdotool`, clipboard), and neither does showing images through kitty. Describe visual results, or save them and say where
- Sessions here usually run inside paude, shared with whoever is attached in a browser or terminal; anyone invited with the drive role types into this same shell
- The minecraft server and paude both run here as user services: `systemctl --user status minecraft-server paude`
- World backups go to `~/backups`, a 100G disk of its own (label `backups`, mounted by `dot-update.d/backup-disk`): three nightly tarballs there, and the htpc pulls the newest every Sunday
