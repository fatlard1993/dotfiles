import math
import os
import sys
import time

# The live, fast-refreshing half of the lock screen (see gen_lock.py for the
# expensive static badge/background this gets composited over, by
# ubuntu/bin/lock-tick, roughly every 1.5s). Deliberately filter-free (no
# feGaussianBlur) - a blur filter alone costs ~0.5s to rasterize regardless
# of what it's applied to (measured), which would blow the tick budget on
# its own.

t = float(sys.argv[2]) if len(sys.argv) > 2 else time.time()

# W,H is the full captured canvas (all monitors combined, when there's more
# than one) - CX,CY defaults to its center, but callers with multiple
# monitors pass the primary monitor's own center instead (see lock-tick),
# so the rings/clock land inside one screen rather than straddling the
# seam between them.
W = int(sys.argv[3]) if len(sys.argv) > 3 else 2880
H = int(sys.argv[4]) if len(sys.argv) > 4 else 1620
CX = int(sys.argv[5]) if len(sys.argv) > 5 else W // 2
CY = int(sys.argv[6]) if len(sys.argv) > 6 else H // 2

# Every size below was tuned against the 1620px-tall laptop panel, and used
# to be drawn at those literal pixel values on whatever monitor was primary
# - visibly undersized on the 4K external. PH (the primary's height, argv 7)
# scales the whole HUD to occupy the same fraction of any screen it lands on.
PH = int(sys.argv[7]) if len(sys.argv) > 7 else H
REF_H = 1620


def s(v):
    return round(v * PH / REF_H, 1)


R_RING = s(180)

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')


def dial_ring(r, n_segs, gap_frac, width, opacity):
    """A ring of evenly-spaced dashes, like a combination-lock dial's notches."""
    g = [f'<g stroke="#f0c674" stroke-width="{width}" fill="none" opacity="{opacity}">']
    seg_angle = 2 * math.pi / n_segs
    gap = seg_angle * gap_frac
    for i in range(n_segs):
        a0 = i * seg_angle
        a1 = a0 + seg_angle - gap
        x0 = CX + r * math.cos(a0)
        y0 = CY + r * math.sin(a0)
        x1 = CX + r * math.cos(a1)
        y1 = CY + r * math.sin(a1)
        g.append(f'<path d="M {x0:.1f} {y0:.1f} A {r} {r} 0 0 1 {x1:.1f} {y1:.1f}"/>')
    g.append('</g>')
    return "\n".join(g)


# Three dial rings at different radii/segment-counts/opacities - purely
# decorative and fully static.
parts.append(dial_ring(R_RING + s(34), 40, 0.4, s(2.5), 0.22))
parts.append(dial_ring(R_RING + s(60), 16, 0.55, s(2), 0.28))
parts.append(dial_ring(R_RING + s(96), 8, 0.35, s(2), 0.34))

# Cardinal tick cluster - static.
for k in range(4):
    a = k * math.pi / 2 + math.pi / 4
    r0, r1 = R_RING + s(110), R_RING + s(130)
    x0, y0 = CX + r0 * math.cos(a), CY + r0 * math.sin(a)
    x1, y1 = CX + r1 * math.cos(a), CY + r1 * math.sin(a)
    parts.append(
        f'<line x1="{x0:.1f}" y1="{y0:.1f}" x2="{x1:.1f}" y2="{y1:.1f}" '
        f'stroke="#f0c674" stroke-width="{s(2.5)}" opacity="0.4"/>'
    )

# --- HUD clock readout: bracket-frame viewfinder style, monospace ---
clock_y = CY + s(340)
clock_str = time.strftime("%H:%M", time.localtime(t))
fw, fh = s(260), s(74)
bx0, by0 = CX - fw / 2, clock_y - fh / 2
bx1, by1 = CX + fw / 2, clock_y + fh / 2
notch = s(18)


def corner(x, y, dx, dy):
    return (
        f'<path d="M {x:.1f} {y + dy * notch:.1f} V {y:.1f} H {x + dx * notch:.1f}" '
        f'fill="none" stroke="#f0c674" stroke-width="{s(3)}" opacity="0.7" stroke-linecap="round"/>'
    )


parts.append(corner(bx0, by0, 1, 1))
parts.append(corner(bx1, by0, -1, 1))
parts.append(corner(bx0, by1, 1, -1))
parts.append(corner(bx1, by1, -1, -1))

parts.append(
    f'<text x="{CX}" y="{clock_y + s(16):.1f}" font-family="monospace" font-size="{s(46)}" '
    f'letter-spacing="{s(4)}" fill="#f7dc9c" text-anchor="middle">{clock_str}</text>'
)
parts.append(
    f'<text x="{CX}" y="{by0 - s(14):.1f}" font-family="monospace" font-size="{s(18)}" '
    f'letter-spacing="{s(6)}" fill="#f0c674" opacity="0.55" text-anchor="middle">LOCKED</text>'
)

parts.append('</svg>')

default_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lock_hud.svg")
out_path = sys.argv[1] if len(sys.argv) > 1 else default_path
with open(out_path, "w") as f:
    f.write("\n".join(parts))
