**Caveats:** GNU coreutils active (ls, sort, head: GNU not BSD). `readlink` → `greadlink`.

**Screenshots** (OS built-in, no script): saved to wherever `defaults read com.apple.screencapture location` points, `~/Desktop` by default, named `Screenshot <date> at <time>.png`. "The one I just took" = newest file there; Read it directly

**This machine's kit** (from the Brewfile, beyond the base kit):
- Media: `ffmpeg` and ImageMagick (`magick`) for convert/resize/extract
- Network: `arp-scan --localnet` lists LAN devices (needs sudo)
- `glow <file.md>` renders markdown readably: for showing you a doc in a kitty window, not for captured output
- `trash` over `rm` for user files: reversible delete
