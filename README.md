<<<<<<< HEAD
<<<<<<< HEAD
# Architectural-Design-Company-website
A modern architecture website 
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# ARCHIA Studio
>>>>>>> 9150f1f (init)

Marketing site for ARCHIA, an architecture studio in Dubai. Built with the
Next.js App Router, React Server Components and CSS Modules over a single
token file.

The site is a faithful build of a Figma comp — the frame `HOME — 1440 Desktop`
(node `2:2`, 1440×4188) from the file *ARCHIA — Architecture Studio Website*.
Geometry throughout (spacing, type scale, component boxes) is measured from
that frame, and component comments carry the layer ids they came from, so any
value can be traced back to the design.

## Quick start

```bash
npm install
npm run dev          
```

Requires **Node.js 20.9+** (Next.js 16 minimum).

| Script | Does |
|---|---|
| `npm run dev` | Dev server, Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`, core-web-vitals + TypeScript) |

There is no test suite. `npx tsc --noEmit` is the fastest correctness check.

## Stack

- **Next.js 16.3** — App Router, Server Components by default, Server Actions
- **React 19.2**
- **TypeScript** — strict, with `@/*` aliased to the repo root
- **CSS Modules** over a custom token file — this is how everything is styled
- **Tailwind v4** — installed and fed the same tokens, so utilities *work*, but
  the build does not use them; the only global class in markup is `.skipLink`
- **next/font** — Cormorant Garamond (display) and Inter (sans), self-hosted

## Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | The comp, in order: hero · 01 approach · 02 projects · 03 featured · 04 about · 05 contact |
| `/About` | `app/About/page.tsx` | Reuses the studio statement (verbatim comp copy) |
| `/project` | `app/project/page.tsx` | Projects index; home cards deep-link here with a `#slug` |
| `/Services` | `app/Services/page.tsx` | No Services frame exists in the comp — built from the home page's own vocabulary |
| `/Contact` | `app/Contact/page.tsx` | Renders the home page's contact band rather than duplicating the form |

Capitalised route folders are intentional: the URLs are `/About`, `/Services`,
`/Contact` and `/project`, and `app/data/site.ts` is the single place the nav
links are declared.

## Layout of the source

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> b5d5f11 (Initial commit from Create Next App)
=======
```
app/
  layout.tsx            root shell — fonts, metadata, header, footer, skip link
  page.tsx              home page, composed of section components
  globals.css           base layer + the @theme bridge to Tailwind
  styles/tokens.css     ← every colour, size, type step and scrim lives here
  data/                 all copy and image slots (site, content, projects)
  components/
    layout/             SiteHeader, PrimaryNav, MobileMenu, SiteFooter
    sections/           one component per band of the page
    ui/                 shared primitives (Figure, Container, Reveal, …)
  lib/                  cx, media types, contact schema, useActiveSection
  actions/contact.ts    Server Action for the contact form
public/                 photography and drawings
```

Each component sits next to its own `*.module.css`. Section styles are
mobile-first and step up at 480 / 768 / 1024 / 1280px.

## How it is put together

### Tokens are the source of truth

`app/styles/tokens.css` holds every design value. It is consumed two ways:

1. directly as `var(--ink)` inside the per-component CSS Modules, and
2. re-exported to Tailwind's theme by the `@theme inline` block in
   `app/globals.css`, so `bg-ink`, `text-stone` and `font-display` also work.

Changing a colour or a type step is a one-file edit. Colours marked
`(inferred)` in that file could not be read out of Figma and are the values
most likely to need correcting against the real design.

### Copy and images are data, not markup

Nothing user-facing is hardcoded in a component. `app/data/site.ts` holds the
wordmark, navigation and contact details; `content.ts` holds each section's
copy; `projects.ts` holds the project entries. Strings marked `(copy)` in those
files were written to match the studio voice because the original text was not
retrievable from Figma — they are the ones to replace with the real copy.

### Every image goes through `MediaSlot`

`app/lib/media.ts` defines a `MediaSlot`: a Figma layer name, the intrinsic box
measured in the comp, alt text, and an optional `src`. `components/ui/Figure`
renders a slot as a `next/image` when `src` is set, and as a labelled
placeholder of the identical box when it is not — so the layout stays
pixel-correct before the art arrives. `ASSETS.md` is the manifest of which
layer maps to which file.

### Server by default

Seven components opt into the client, each for a stated reason: `HeroSection`
(the carousel advances itself), `ContactForm` (`useActionState`), `PrimaryNav`
and `MobileMenu` (the sliding underline and the disclosure), and the
`SmoothScroll` / `Parallax` / `Reveal` effects. Everything else — including the
H1 and the LCP image — server-renders in the initial HTML.

## The contact form

`app/actions/contact.ts` is a Server Action. Validation is shared with the
client form through `app/lib/contact-schema.ts`, so both enforce the same rules
and a failed submit never wipes what was typed.

**Out of the box nothing is emailed.** Set one environment variable to deliver:

```bash
# .env.local
CONTACT_WEBHOOK_URL=https://…
```

The validated payload is `POST`ed there as JSON — Formspree, Resend, a Slack or
Teams incoming webhook, or your own route. With the variable unset, submissions
are validated and logged server-side only. Swap the `deliver` function for a
real transport if you would rather not use a webhook.

The schema lives outside the action file on purpose: every export of a
`"use server"` module must be an async function, so types, the initial state and
the synchronous validator cannot live there.

## Accessibility

The comp was followed for geometry, not blindly for contrast. Where the design
would have shipped unreadable text, the build diverges and the reason is
commented at the point of change:

- **Hero scrims are set by measurement.** The four hero slides range from a
  dark villa at dusk to a pale dawn skyline, so both overlays are tuned against
  the *brightest* slide rather than per image — a per-slide scrim would visibly
  re-grade the hero as the carousel advances. Below 1024px the comp's
  left-to-right ramp is replaced by a full-width veil, because the copy spans
  the whole column there and the horizontal ramp was leaving the H1 at 2.2:1.
  All hero copy now measures ≥8:1 against the rendered pixels.
- **The hero rotates on its own** and has no visible pause control, which
  WCAG 2.2.2 would rather it had. Standing in for one: hover or keyboard focus
  anywhere in the hero halts the rotation, and `prefers-reduced-motion` stops it
  outright.
- Touch targets are ≥44px even where the comp drew smaller ones.
- `prefers-reduced-motion` also disables the smooth scrolling, the parallax and
  the reveal animations.
- A skip link, and a visible focus ring that flips to light over media.
- The nav's sliding underline follows the scrolled-to section, but
  `aria-current="page"` deliberately tracks the **route** instead: scrolling
  past a band is not a change of page, and announcing it as one would be a lie
  to a screen reader.

## Conventions worth knowing

- **`data-scroll-behavior="smooth"` on `<html>` is required, not decorative.**
  Next 16 stopped neutralising `scroll-behavior: smooth` during route
  transitions; without the attribute every navigation animates a scroll to the
  top — 4188px on the home page — which reads as a page reload.
- **`AGENTS.md` is generated by `next dev`** and rewritten on each run. Commit
  it with your changes; deleting it from a diff only recreates it.
- Component comments reference Figma layer ids (`2:18`, `41:3`). They are there
  so a value can be checked against the design — keep them accurate if you move
  things.

## Deployment

A standard Next.js app with no custom server or runtime dependencies. `npm run
build` then `npm run start`, or deploy to any platform that supports the App
Router. Remember to set `CONTACT_WEBHOOK_URL` in the deployment environment,
and `site.url` in `app/data/site.ts` drives `metadataBase` for Open Graph URLs.
>>>>>>> 9150f1f (init)
