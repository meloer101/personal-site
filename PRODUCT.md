# Product

## Register

brand

## Users

The main visitors are other developers. Most arrive from a GitHub repo, a shared blog post, or an X profile. They spend a minute or two scanning to decide whether this person's work is worth following. Then they star a repo, subscribe to the RSS feed, or follow on X.

## Product Purpose

A personal site for Jacob Yu. It is a small developer card, not a portfolio showcase. It holds:

- who he is
- a handful of representative GitHub projects
- the blog (a list on the home page that links to a dedicated blog page)
- contact channels

The site works when a visiting developer leaves with a clear picture of what he builds and one concrete next step taken: a star, a subscription, or a follow.

## Brand Personality

Quiet, focused, trustworthy. Night-sky calm: the content speaks and the interface stays out of the way.

The visual world comes from 1-bit dithered space illustration: Voyager-style line art, stipple moons, sparse stars on near-black. The component language is soft and technical: rounded shapes, restrained glass, the precision of shadcn/ui-style primitives.

References the owner confirmed:

- chanhdai.com, dillion.io and antfu.me, for structure and restraint
- two Voyager 1 poster illustrations, for the visual world
- shadcn/ui, for the component feel

## Anti-references

- Anything that reads as "AI made this": the same outlined card grid with an eyebrow on every section, numbered section markers, generic SaaS landing scaffolding.
- Borders and divider lines used as decoration. Every rule and outline must separate something the reader would otherwise confuse. A frame around the hero illustration is the canonical mistake: the illustration should dissolve into the starfield as the page's ground, not sit in a box.
- Loud showcase portfolios: big hero metrics, gradient text, heavy motion.

## Design Principles

1. **Atmosphere is the ground, not a picture.** The space illustration and the starfield are one continuous backdrop that content floats on. Nothing frames it.
2. **Separate by space before lines.** Grouping comes from spacing, alignment and type contrast. A line or a surface appears only when space alone fails.
3. **One signature, everything else quiet.** The dithered illustration is the single expressive moment. Type, components and layout stay calm around it.
4. **Show the work, not the résumé.** Real repos, real posts and real channels, written plainly and specifically.
5. **Developer-grade precision.** Alignment, rhythm and interaction states are exact. The craft is the credibility.

## Accessibility & Inclusion

WCAG 2.2 AA:

- Body text at least 4.5:1, large text at least 3:1, against near-black.
- Full keyboard navigation with visible focus.
- `prefers-reduced-motion` respected: starfield and illustration motion become static.
- Glass surfaces must keep text contrast; no text sits directly on busy dither.
