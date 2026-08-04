# v1olet.xyz

The v1olet website: CTF team presence and commercial offensive-security practice
on one surface.

Next.js 15 (App Router) · TypeScript · Tailwind v4 · React Three Fiber ·
static export to GitHub Pages.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into ./out
npm run typecheck
npm run check:contrast
```

`npm run build` writes a plain directory of HTML/CSS/JS to `out/`. There is no
server at runtime.

---

## What to edit

Almost everything you will want to change lives in `content/`. Those files are
plain TypeScript — no CMS, no admin panel — and the types make a typo a build
error rather than a blank card.

| File | What it holds |
|---|---|
| `content/roster.ts` | **The 30 operators.** Add, remove or edit a member here. |
| `content/events.ts` | **Competition results.** Newest first. |
| `content/services.ts` | The five engagement types and their detail pages. |
| `content/method.ts` | The four engagement stages and the commitments. |
| `content/trust.ts` | Certifications, standards, disclosure policy. |
| `content/site.ts` | Contacts, social links, navigation, site metadata. |
| `content/writeups/*.mdx` | Writeups. Drop a file in, it appears on the site. |

### Adding a team member

Copy an existing block in `content/roster.ts`:

```ts
{
  name: 'handle',
  role: 'Core Member',
  tier: 'core',            // 'captain' = full card, 'core' = full card, 'member' = dense row
  specialty: 'Web Exploitation',
  quote: 'optional',       // omit the key entirely if there is none
  description: 'One or two sentences.',
  skills: ['web', 'osint'],// must be values from the Discipline union in types.ts
  avatar: '/avatars/handle.webp', // omit for an auto-generated initials tile
  links: { github: 'https://…' }, // linkedin | github | website, all optional
}
```

Avatars go in `public/avatars/` as square WebP, 320×320. To convert:

```bash
python3 -c "
from PIL import Image
im = Image.open('handle.png').convert('RGB')
s = min(im.size); im = im.crop(((im.width-s)//2,(im.height-s)//2,(im.width-s)//2+s,(im.height-s)//2+s))
im.resize((320,320), Image.LANCZOS).save('public/avatars/handle.webp','WEBP',quality=86,method=6)"
```

### Adding a competition result

Add an entry at the **top** of `content/events.ts`. Every figure on the site —
competition count, best placement, largest field, top-ten count — is derived
from this array, so nothing else needs updating.

> The previous site's hero claimed "11 competitions in 2026" while its data file
> listed six. That is why no statistic on this site is typed by hand.

### Adding a writeup

Create `content/writeups/your-slug.mdx`:

```mdx
---
title: "Title of the writeup"
event: "HTB Cyber Apocalypse 2026"
category: "web"
date: "2026-08-01"
author: "handle"
summary: "One or two sentences for cards, search results and social previews."
tags: ["web", "cache"]
---

Body in MDX. Fenced code blocks are highlighted at build time.
```

The route, index entry, sitemap entry and structured data are generated from
that file. **Delete the two `sample-*.mdx` files once real writeups exist** —
they are marked `sample: true`, which is what drives their "Sample" badges and
their exclusion from the sitemap and search indexing.

---

## Outstanding placeholders

These are visible on the site as marked placeholders. Search the codebase for
`PLACEHOLDER` to find every one.

| Item | Where | Needed |
|---|---|---|
| Imprint | `src/app/legal/imprint/page.tsx` | Legal entity, address, register, VAT, representative. **Have a lawyer review before publishing**, then remove `noindex`. |
| Privacy | `src/app/legal/privacy/page.tsx` | Controller identity, legal bases, retention, supervisory authority. The technical statements on that page are already accurate. |
| Certification counts | `content/trust.ts` | Set `holders` per certification. Until then the page renders "Count pending" rather than a number. |
| Combined experience | `content/trust.ts` | `certificationSummary.combinedYears`. |
| Insurance | `content/trust.ts` | Professional indemnity details in `operationalCommitments`. |
| Client references | `content/trust.ts` | Currently "available on request", no client named. |
| Discord invite | `content/site.ts` | The repo carries a domain-verification record but no invite link. |
| PGP key | `public/.well-known/security.txt` | Add a key at `/pgp-key.txt` and an `Encryption:` line. |
| Writeup authors | `content/writeups/*.mdx` | Sample files carry a PLACEHOLDER author. |

---

## Architecture

```
content/            Typed content. The only files most changes touch.
public/             Static assets, CNAME, .well-known, pre-compressed images.
scripts/            check-contrast.ts — WCAG audit over the token pairs.
src/
  app/              Routes (App Router). One directory per page.
  components/
    layout/         Header, Footer, PageHeader, ThemeToggle, Wordmark
    motion/         Reveal, Parallax, Counter, Magnetic, Scramble, Cursor
    sections/       Home-page sections + TeamRoster, ScopingForm
    three/          SceneGate → HeroScene → BloomField (the WebGL hero)
    ui/             Button, Panel, SectionHead, EventRow, MemberCard, …
  hooks/            useResolvedTheme
  lib/              theme, motion, seo, writeups, mdx, utils
```

### Why this stack

- **Next.js static export** keeps the existing GitHub Pages + `CNAME` deployment
  while adding file-based routing, per-route code splitting and build-time MDX.
  Nothing runs on a server, so there is no backend to operate or breach.
- **App Router + RSC** keeps three.js and the MDX highlighter strictly out of the
  client bundle. A phone never downloads the 3D chunk.
- **Tailwind v4** puts the whole token set in one `@theme` block that CSS and
  components read from the same place.
- **React Three Fiber** because the hero scene is a React component with a
  lifecycle (mount conditions, visibility pausing, theme-reactive colours), not a
  script bolted onto a canvas.

### Theming

Three states: `system` (default, tracks the OS live), `light`, `dark`. The
preference persists in `localStorage` under `v1olet:theme`. An inline script in
`<head>` applies the resolved theme before first paint, so there is no flash;
`prefers-color-scheme` in `globals.css` is the no-JavaScript fallback.

Colour is defined once as semantic tokens (`--surface`, `--fg`, `--accent`, …)
that flip per theme. Components never reference a raw palette value. The palette
is derived from the logo: `#6840f4` (hero wordmark, favicon) is the dark-theme
primary, `#4e2bcc` (`logo.png`) the light-theme primary — the lighter violet does
not reach AA against white, which is why the two themes use different anchors.

Run `npm run check:contrast` after touching any colour. It audits 30 token pairs
against WCAG 2.2 and exits non-zero on a failure; the deploy workflow runs it.

### Motion

Every animated component calls `useMotionAllowed()` before it animates.
Reduced-motion visitors get the final state with no observer, no animation frame
and no WebGL context — gated at the source rather than overridden at the end of a
stylesheet. `globals.css` still carries a global reduced-motion block as a safety
net for anything CSS-driven.

### The 3D hero

`SceneGate` decides whether to mount the scene at all, checking reduced-motion,
viewport ≥1024px, fine pointer, `deviceMemory`, `hardwareConcurrency`,
`save-data`, WebGL2 availability and whether the renderer is a software
rasteriser. Only if all pass does `next/dynamic` fetch the three.js chunk. The
fallback is a CSS-only bloom built from the same six-petal geometry.

Debug overrides: `?scene=force` mounts it regardless, `?scene=off` never mounts
it.

The scene itself is one draw call — a `THREE.Points` with a custom shader that
interpolates each particle between a dispersed cloud and the polar rose
`r = |cos 3θ|`, which is the six-petal mark. Scroll drives the interpolation. The
render loop stops entirely when the hero leaves the viewport or the tab is
hidden.

> Implementation note kept because it cost time: the material is constructed
> imperatively rather than declared as `<shaderMaterial uniforms={…} />`. Passing
> a uniforms object to the declarative element does not guarantee the material
> holds *that object*, so per-frame mutations can update a copy the GPU never
> sees — the shader then renders its initial state forever while the render loop
> runs happily.

### Contact form

There is no backend, so the scoping form composes a structured `mailto:` and
opens the visitor's own mail client. That is a deliberate trade: no third-party
form processor sees a prospect's infrastructure details, and the privacy page
stays honest. To move to a real endpoint, replace `buildBody`/`href` in
`src/components/sections/ScopingForm.tsx` with a `fetch` — the field contract is
the whole interface.

---

## Deployment

Push to `main`. `.github/workflows/deploy.yml` typechecks, runs the contrast
audit, builds the export and publishes it to GitHub Pages.

**One-time repository setting:** Settings → Pages → Source → **GitHub Actions**.
The custom domain survives because `public/CNAME` is copied into every build.

---

## Performance notes

- Shared JS across all routes is ~103 kB; the home page is ~184 kB first load.
- three.js lives in its own chunk, requested only by devices that pass the gate.
- Fonts are self-hosted via `next/font` — no request to Google Fonts, no
  render-blocking stylesheet, no layout shift.
- Images are pre-compressed WebP (the Next image optimiser is a server route and
  cannot exist in a static export). Brand and avatar assets went from 1.5 MB to
  548 kB in the conversion.
- The full export is ~5.2 MB.

## Accessibility notes

- Skip link, one `<h1>` per route, semantic landmarks throughout.
- Visible focus ring on every interactive element, never removed.
- Mobile drawer traps focus, closes on Escape and on route change, locks body
  scroll.
- Custom cursor never hides the native one.
- Counters expose their final value via `aria-label`; the rolling digits are
  `aria-hidden`. Text scramble does the same.
- Theme control is a real `<button>` with a polite live region.
- The roster filter is a real `radiogroup` with a live result count.
