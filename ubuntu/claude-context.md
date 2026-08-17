
**The screen** (X tools; this shell inherits DISPLAY=:0 when launched from the desktop):
- Screenshots (the `screenshot` script, bound in sxhkd) land in `~/Pictures/Screenshots/` as `YYYY-MM-DD_HH-MM-SS.png`, clipboard-copied. "The one I just took" = newest file there; Read it directly
- Seeing the screen myself: `scrot <file>` (or `screenshot full`), then Read the file
- OCR: `tesseract <image> -` prints an image's text to stdout: reach for it when the ask is the text, not the look (`ubuntu/bin/text-ripper` wraps the same engine in zenity dialogs; interactive-only)
- Clipboard: `xclip -selection clipboard` to set, `-o -selection clipboard` to read
- GUI automation: `xdotool` (windows, keys, mouse) and `wmctrl`; for keystrokes prefer `forward-key`, it repairs xdotool's stuck-modifier race

**This machine's kit** (from the aptfile, beyond the base kit):
- `locate` (plocate): indexed whole-system file find; `fd` walks a tree, `locate` asks the index
- Media: `ffmpeg` and ImageMagick (`magick`) for convert/resize/extract; `yt-dlp` fetches video/audio
- Network: `arp-scan --localnet` lists LAN devices (needs sudo); `speedtest-cli` for link speed; `whois`
- `trash` over `rm` for user files: reversible delete
- `cu`: serial consoles for hardware work
