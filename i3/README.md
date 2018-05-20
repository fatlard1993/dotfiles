This directory contains partial files intended to be concatenated with additional resources via a script
Look in the devices sub-directory of this project for examples in the form of device specific i3 settings
To adapt this platform to a new system, use an existing device folder structure as a modal


### Multiple monitors in i3 are as simple as something like this:
```
xrandr --output X --left-of Y
```


### To fix cursor changing size when hovering system elements (status bar, window borders)
```
Add "Xcursor*size: 48" to the end of the following file:
sudo nano /etc/X11/Xresources/x11-common
```

mode menu (mod m)
	exit menu (esc|return|space)
	navigate back 1 level (backspace)

	containers (c)
		fullscreen (f)
		kill (k)
			all (a)
			all in workspace (w)
		mark (m)

	system (s)
		backlight (b)
			up by 10 (up)
			down by 10 (down)
			up by 5 (shift up)
			down by 5 (shift down)
			max (m)
			min (shift m)
		keyboard cursor control (c)
		update (u)
		i3 (i)
			send command (c)
			reload (r)
			restart (control r)
			update (u)
		leave (l)
			exit (e)
			lock (l)
			reboot (r)
			shutdown (s)
		volume (v)
			up by 6 (up)
			down by 6 (down)
			up by 3 (shift up)
			down by 3 (shift down)
			to 90 (control up)
			to 10 (control down)
			mute (m)
		wallpaper (w)
			change (c)
				random saved (s)
				random unsorted (u)
			get (g)
			sort (s)
				delete current (d)
				save current (s)
				stash current as not a wallpaper (control s)

	workspaces (w)
		layout (l)
			default (d)
			stacking (s)
			tabbed (t)
		mark (m)


containers
	split
		horizontal (mod shift down)
		vertical (mod shift right)
	focus within current workspace
		up (mod up)
		down (mod down)
		left (mod left)
		right (mod right)
	move within current workspace
		up (mod control up)
		down (mod control down)
		left (mod control left)
		right (mod control right)
	move to workspace
		1-9 (mod control 1-9)
		scratchpad (mod control 0)
		last (mod tab)
		to the left (mod control left-carat)
		to the right (mod control right-carat)
	float
		toggle (mod f)
		sticky toggle (mod s)
		overwatch (mod o)
	resize
		larger by 10 (mod plus)
		larger by 5 (mod shift plus)
		smaller by 10 (mod minus)
		smaller by 5 (mod shift minus)
	kill focused (mod q)

workspace
	view
		1-9 (mod 1-9)
		scratchpad (mod 0)
		last (mod tab)
		to the left (mod left-carat)
		to the right (mod right-carat)


app launcher (mod space)

launch terminal (mod tilde)

launch X terminals (mod control tilde)

overwatch youtube url (mod control o)

quick notes (mod n)