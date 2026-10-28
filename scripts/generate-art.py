"""Generate the site's 1-bit dithered artwork as SVG.

Usage: python3 scripts/generate-art.py [out_dir]   (default: public/art)

Dithering comes from 1px <pattern> tiles, so the art stays pixel-crisp at
any device pixel ratio. Edit this file, not the generated SVGs.
"""
import os
import random
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "public", "art")
BG = "#0b0b0c"

PATTERNS = """
<pattern id="d50" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="scale(PS)"><rect x="0" y="0" width="1" height="1" fill="#fff"/><rect x="1" y="1" width="1" height="1" fill="#fff"/></pattern>
<pattern id="d25" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="scale(PS)"><rect x="0" y="0" width="1" height="1" fill="#fff"/></pattern>
<pattern id="d12" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="scale(PS)"><rect x="0" y="0" width="1" height="1" fill="#fff"/><rect x="2" y="2" width="1" height="1" fill="#fff"/></pattern>
<pattern id="d6" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="scale(PS)"><rect x="0" y="0" width="1" height="1" fill="#fff"/></pattern>
<pattern id="hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="scale(PS) rotate(35)"><line x1="0" y1="0" x2="3" y2="0" stroke="#fff" stroke-width="0.9"/></pattern>
<pattern id="truss" width="4" height="7" patternUnits="userSpaceOnUse" patternTransform="scale(PS)"><line x1="0" y1="0" x2="4" y2="7" stroke="#fff" stroke-width="0.6"/><line x1="0" y1="0" x2="4" y2="0" stroke="#fff" stroke-width="0.6"/></pattern>
"""


def sparkle(x, y, s):
    a = s * 0.09
    return (
        f'<path d="M{x},{y - s} L{x + a},{y - a} L{x + s},{y} L{x + a},{y + a} '
        f'L{x},{y + s} L{x - a},{y + a} L{x - s},{y} L{x - a},{y - a} Z" fill="#fff"/>'
    )


def probe():
    # Authored in 480-unit space and drawn at 2x; patterns scale back by 0.5 so dots stay 1px.
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="880" height="720" viewBox="0 0 880 720">
<defs>{PATTERNS.replace('PS', '0.5')}
<clipPath id="planetClip"><circle cx="104" cy="118" r="36"/></clipPath></defs>
<g transform="scale(2) translate(-30 -20)">
<g clip-path="url(#planetClip)">
 <circle cx="104" cy="118" r="36" fill="url(#d12)"/>
 <circle cx="94" cy="110" r="34" fill="{BG}"/><circle cx="94" cy="110" r="34" fill="url(#d50)"/>
 <ellipse cx="104" cy="105" rx="40" ry="1.2" fill="{BG}"/><ellipse cx="104" cy="114" rx="40" ry="0.8" fill="{BG}"/><ellipse cx="104" cy="126" rx="40" ry="1.6" fill="{BG}"/>
</g>
<circle cx="104" cy="118" r="36" fill="none" stroke="#fff" stroke-width="0.4"/>
<g transform="translate(278 236) rotate(-28)">
 <rect x="-2" y="-214" width="4" height="200" fill="url(#truss)" stroke="#fff" stroke-width="0.5"/>
 <line x1="24" y1="14" x2="190" y2="58" stroke="#fff" stroke-width="0.5"/>
 <line x1="-22" y1="16" x2="-92" y2="50" stroke="#fff" stroke-width="0.8"/>
 <rect x="-112" y="44" width="22" height="13" fill="url(#d50)" stroke="#fff" stroke-width="0.6"/>
 <line x1="-112" y1="50.5" x2="-90" y2="50.5" stroke="#fff" stroke-width="0.4"/>
 <line x1="10" y1="22" x2="40" y2="68" stroke="#fff" stroke-width="0.7"/>
 <rect x="32" y="66" width="18" height="12" fill="url(#d25)" stroke="#fff" stroke-width="0.6"/>
 <ellipse cx="0" cy="-8" rx="60" ry="23" fill="{BG}"/>
 <ellipse cx="0" cy="-8" rx="60" ry="23" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
 <ellipse cx="8" cy="-5" rx="38" ry="13" fill="{BG}"/><ellipse cx="8" cy="-5" rx="38" ry="13" fill="url(#d12)"/>
 <line x1="-22" y1="-14" x2="0" y2="-48" stroke="#fff" stroke-width="0.6"/><line x1="22" y1="-14" x2="0" y2="-48" stroke="#fff" stroke-width="0.6"/>
 <circle cx="0" cy="-48" r="2.2" fill="#fff"/>
 <polygon points="-20,6 20,6 25,14 20,23 -20,23 -25,14" fill="{BG}" stroke="#fff" stroke-width="0.8"/>
 <rect x="-20" y="6" width="40" height="17" fill="url(#d25)"/>
 <line x1="-8" y1="6" x2="-8" y2="23" stroke="#fff" stroke-width="0.4"/><line x1="8" y1="6" x2="8" y2="23" stroke="#fff" stroke-width="0.4"/>
</g>
{sparkle(408, 72, 12)}{sparkle(70, 262, 9)}{sparkle(440, 330, 7)}
</g></svg>"""


def moon():
    # 2560 wide so wide screens never see the horizon's cut ends; pages center-crop it.
    W, H, CX = 2560, 420, 1280
    shift = CX - 720
    craters = ""
    spots = [(160, 250, 60), (420, 190, 34), (610, 300, 80), (900, 170, 40), (1080, 260, 56), (1290, 215, 30),
             (300, 350, 44), (780, 380, 52), (1180, 360, 38), (60, 330, 26), (520, 240, 18), (980, 320, 22),
             (-380, 330, 50), (-200, 280, 28), (1560, 320, 46), (1760, 360, 30), (-460, 390, 36), (1680, 300, 20)]
    for (cx, cy, rx) in spots:
        cx += shift
        ry = rx * 0.26
        craters += (
            f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry:.1f}" fill="{BG}" stroke="#fff" stroke-width="0.8"/>'
            f'<ellipse cx="{cx + rx * 0.08:.1f}" cy="{cy + ry * 0.15:.1f}" rx="{rx * 0.75:.1f}" ry="{ry * 0.6:.1f}" fill="url(#d12)"/>'
        )
    lx = -900 + shift
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>{PATTERNS.replace('PS', '1')}
<clipPath id="moonClip"><circle cx="{CX}" cy="2440" r="2400"/></clipPath>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{BG}" stop-opacity="0"/><stop offset="1" stop-color="{BG}" stop-opacity="1"/></linearGradient></defs>
<g clip-path="url(#moonClip)">
 <rect x="0" y="0" width="{W}" height="{H}" fill="url(#d6)"/>
 <circle cx="{lx}" cy="2600" r="3010" fill="{BG}"/><circle cx="{lx}" cy="2600" r="3010" fill="url(#d12)"/>
 <circle cx="{lx}" cy="2600" r="2960" fill="{BG}"/><circle cx="{lx}" cy="2600" r="2960" fill="url(#d25)"/>
 <circle cx="{lx}" cy="2600" r="2900" fill="url(#d50)"/>
 {craters}
 <rect x="0" y="230" width="{W}" height="130" fill="url(#fade)"/><rect x="0" y="359" width="{W}" height="61" fill="{BG}"/>
</g>
<circle cx="{CX}" cy="2440" r="2400" fill="none" stroke="#fff" stroke-width="1"/>
</svg>"""


def stars():
    random.seed(7)
    dots = ""
    for _ in range(46):
        x, y = random.uniform(0, 480), random.uniform(0, 480)
        r = random.choice([0.5, 0.5, 0.6, 0.7, 0.8, 1.0, 1.2])
        o = random.choice([0.35, 0.5, 0.6, 0.8, 1.0])
        dots += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="#fff" fill-opacity="{o}"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">{dots}</svg>'


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, build in (("probe", probe), ("moon", moon), ("stars", stars)):
        path = os.path.join(OUT, f"{name}.svg")
        with open(path, "w") as f:
            f.write(build())
        print("wrote", os.path.relpath(path))
