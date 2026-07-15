import math
import os
import random

random.seed(42)

W, H = 2880, 1620
CX, CY = W // 2, H // 2

# --- badge sizing (smaller than before) ---
R_DISC = 164
R_RING = 180

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')

parts.append('''
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#14151a"/>
      <stop offset="55%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>

    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f0c674" stop-opacity="0.38"/>
      <stop offset="45%" stop-color="#f0c674" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#f0c674" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f7dc9c"/>
      <stop offset="50%" stop-color="#f0c674"/>
      <stop offset="100%" stop-color="#c99b45"/>
    </linearGradient>

    <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="wideGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="20"/>
    </filter>

    <filter id="traceGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.2"/>
    </filter>
  </defs>
''')

parts.append(f'<rect width="{W}" height="{H}" fill="url(#bg)"/>')

# --- faint hex grid texture across whole canvas ---
def hex_grid(cols, rows, size, opacity):
    lines = [f'<g stroke="#f0c674" stroke-width="1" fill="none" opacity="{opacity}">']
    w = size * math.sqrt(3)
    h = size * 1.5
    for row in range(rows):
        for col in range(cols):
            x = col * w + (w / 2 if row % 2 else 0)
            y = row * h
            if x < -w or x > W + w or y < -h or y > H + h:
                continue
            pts = []
            for i in range(6):
                a = math.pi / 180 * (60 * i - 30)
                pts.append(f"{x + size*math.cos(a):.1f},{y + size*math.sin(a):.1f}")
            lines.append(f'<polygon points="{" ".join(pts)}"/>')
    lines.append('</g>')
    return "\n".join(lines)

parts.append(hex_grid(30, 20, 60, 0.035))

# --- bendy circuit traces: right-angled paths with node/chip endpoints ---
def trace_path(x, y, dir_angle, seg_lengths, turn_dir, width, opacity, node_end=True, chip_end=False):
    # snapped to nearest 45deg so turns read as circuit-board right angles
    snap = round(dir_angle / (math.pi / 4)) * (math.pi / 4)
    cur_dx, cur_dy = math.cos(snap), math.sin(snap)
    path = [f"M {x:.1f} {y:.1f}"]
    for idx, seg in enumerate(seg_lengths):
        x += cur_dx * seg
        y += cur_dy * seg
        path.append(f"L {x:.1f} {y:.1f}")
        # turn 90 degrees alternately
        if idx < len(seg_lengths) - 1:
            cur_dx, cur_dy = (-cur_dy, cur_dx) if turn_dir > 0 else (cur_dy, -cur_dx)
            turn_dir *= -1
    extras = []
    if node_end:
        extras.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.5" fill="#f0c674" opacity="{min(opacity*2.2,0.9):.2f}"/>')
    if chip_end:
        s = 14
        extras.append(f'<rect x="{x-s/2:.1f}" y="{y-s/2:.1f}" width="{s}" height="{s}" fill="none" stroke="#f0c674" stroke-width="2" opacity="{min(opacity*2.0,0.8):.2f}"/>')
    return f'<path d="{" ".join(path)}" fill="none" stroke="#f0c674" stroke-width="{width}" opacity="{opacity:.2f}" stroke-linecap="round"/>' + "".join(extras)

trace_group = ['<g filter="url(#traceGlow)">']

# ring traces: radiate outward from just past the badge ring, like before
n_traces = 30
for i in range(n_traces):
    angle = 2 * math.pi * i / n_traces + random.uniform(-0.05, 0.05)
    start_r = R_RING + random.uniform(20, 60)
    x = CX + start_r * math.cos(angle)
    y = CY + start_r * math.sin(angle)
    n_segs = random.choice([2, 2, 3, 3, 4])
    seg_lengths = [random.uniform(60, 160) for _ in range(n_segs)]
    turn_dir = random.choice([-1, 1])
    width = random.uniform(1.3, 2.6)
    opacity = random.uniform(0.14, 0.32)
    chip = random.random() < 0.28
    trace_group.append(trace_path(x, y, angle, seg_lengths, turn_dir, width, opacity, node_end=True, chip_end=chip))

# scattered traces: fill the rest of the canvas with PCB-style bendy runs,
# taking over the fill role the straight radiating lines used to have
n_scattered = 70
min_r = R_RING + 150
for _ in range(n_scattered):
    while True:
        x = random.uniform(0, W)
        y = random.uniform(0, H)
        if math.hypot(x - CX, y - CY) >= min_r:
            break
    dir_angle = random.uniform(0, 2 * math.pi)
    n_segs = random.choice([2, 3, 3, 4, 4, 5])
    seg_lengths = [random.uniform(50, 180) for _ in range(n_segs)]
    turn_dir = random.choice([-1, 1])
    width = random.uniform(1, 2.2)
    opacity = random.uniform(0.08, 0.22)
    chip = random.random() < 0.22
    trace_group.append(trace_path(x, y, dir_angle, seg_lengths, turn_dir, width, opacity, node_end=True, chip_end=chip))

trace_group.append('</g>')
parts.append("\n".join(trace_group))

# Segmented HUD rings, the cardinal tick cluster, and the clock readout used
# to live here as static SVG - they're now gen_lock_hud.py instead, a much
# smaller/filter-free SVG regenerated every ~1.5s by ubuntu/bin/lock-tick and
# composited over this (expensive, rendered-once-at-lock-time) background,
# so the clock can stay live without re-paying this file's ~2.5s render
# cost on every tick.

# --- core glow behind badge ---
parts.append(f'<circle cx="{CX}" cy="{CY}" r="{R_RING+180}" fill="url(#coreGlow)"/>')
parts.append(f'<circle cx="{CX}" cy="{CY}" r="{R_DISC}" fill="#f0c674" opacity="0.16" filter="url(#wideGlow)"/>')

# --- badge outer ring ---
parts.append(f'<circle cx="{CX}" cy="{CY}" r="{R_DISC}" fill="#101114" stroke="url(#ringGrad)" stroke-width="5" filter="url(#softGlow)"/>')
parts.append(f'<circle cx="{CX}" cy="{CY}" r="{R_RING}" fill="none" stroke="#f0c674" stroke-width="1.5" opacity="0.45"/>')

# --- tick marks around the ring ---
tick_lines = ['<g stroke="#f0c674" stroke-width="2.2" opacity="0.55">']
n_ticks = 60
r_in, r_out = R_DISC + 4, R_RING - 2
for i in range(n_ticks):
    angle = 2 * math.pi * i / n_ticks
    x1 = CX + r_in * math.cos(angle)
    y1 = CY + r_in * math.sin(angle)
    x2 = CX + r_out * math.cos(angle)
    y2 = CY + r_out * math.sin(angle)
    tick_lines.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"/>')
tick_lines.append('</g>')
parts.append("\n".join(tick_lines))

# --- padlock body (scaled to new badge size) ---
scale = R_DISC / 230
parts.append(f'<g transform="translate({CX},{CY}) scale({scale:.4f})" filter="url(#softGlow)">')
parts.append('<path d="M -62 -30 v -35 a 62 62 0 0 1 124 0 v 35" fill="none" stroke="url(#ringGrad)" stroke-width="18" stroke-linecap="round"/>')
parts.append('<rect x="-95" y="-30" width="190" height="150" rx="16" fill="#0c0d10" stroke="url(#ringGrad)" stroke-width="6"/>')
parts.append('''
    <g stroke="#f0c674" stroke-width="4" fill="none" opacity="0.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M -75 -10 h 30 v 20 h 20"/>
      <path d="M 75 -10 h -30 v 20 h -20"/>
      <path d="M -75 30 h 18 v 30 h 24"/>
      <path d="M 75 30 h -18 v 30 h -24"/>
      <path d="M -75 90 h 40"/>
      <path d="M 75 90 h -40"/>
      <circle cx="-45" cy="-10" r="4" fill="#f0c674"/>
      <circle cx="45" cy="-10" r="4" fill="#f0c674"/>
      <circle cx="-57" cy="60" r="4" fill="#f0c674"/>
      <circle cx="57" cy="60" r="4" fill="#f0c674"/>
    </g>
    <circle cx="0" cy="55" r="16" fill="url(#ringGrad)"/>
    <path d="M -7 68 h 14 l -5 30 h -4 z" fill="url(#ringGrad)"/>
''')
parts.append('</g>')

parts.append('</svg>')

out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lock.svg")
with open(out_path, "w") as f:
    f.write("\n".join(parts))

print(f"generated {out_path}")
