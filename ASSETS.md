# Asset checklist

Every photograph in the comp is modelled as a `MediaSlot` (`app/lib/media.ts`).
A slot with no `src` renders a labelled placeholder **at the comp's exact
dimensions**, so the layout is already correct — dropping the file in and
setting `src` is the only remaining step.

## Why these are missing

The Figma MCP server is on the **Starter plan: 20 tool calls per month**, and
the quota was exhausted during this build (confirmed with `whoami`: Starter
tier, Full seat). `download_assets` never ran. The layer names, target paths and
pixel dimensions below all come from the metadata that *was* retrieved, so the
manifest is complete even though the bytes are not.

When the quota resets (or the plan is upgraded), run `download_assets` against
node `2:2` of the file and drop the exports at the paths below.

## How to finish a slot

1. Export the layer from Figma at **2x** the listed size (the comp is a 1x
   frame; `next/image` serves the right size per device from the larger source).
2. Save it to the listed path under `public/`.
3. Set `src` on the matching slot in `app/data/content.ts` or
   `app/data/projects.ts` — e.g. `src: "/images/projects/project-01.jpg"`.

Nothing else changes: dimensions, `sizes` and aspect ratios are already wired.

## Manifest

| Figma layer | Save to | Size (1x) | Declared in |
|---|---|---|---|
| `HERO / background` | `public/heroimage.png` ✅ **present** | 1440×520 | `content.ts` › `heroSlides[0]` |
| `HERO / slide 3` | `public/dubai2.png` ✅ **present** | 1440×520 | `content.ts` › `heroSlides[1]` |
| `Screenshot 1405-05-26 at 13.58.56 1` | `public/images/approach/approach-detail.jpg` | 370×210 | `content.ts` › `approach.media` |
| `Project 01 Image` | `public/images/projects/project-01.jpg` | 660×242 | `projects.ts` › `projects[0]` |
| `Project 02 Image` | `public/images/projects/project-02.jpg` | 660×242 | `projects.ts` › `projects[1]` |
| `image5 1` | `public/images/featured/featured-01.jpg` | 1342×663 | `content.ts` › `featured.media` |
| `draw4 1` | `public/images/about/about-portrait.jpg` | 379×474 | `content.ts` › `about.portrait` |
| `draw5 1` | `public/images/about/about-01.jpg` | 546×274 | `content.ts` › `about.gallery[0]` |
| `draw3 1` | `public/images/about/about-02.jpg` | 236×413 | `content.ts` › `about.gallery[1]` |
| `draw 3` | `public/images/about/about-03.jpg` | 305×413 | `content.ts` › `about.gallery[2]` |
| `draw2 1` | `public/images/about/about-04.jpg` | 257×413 | `content.ts` › `about.gallery[3]` |
| `Emaar Beachfront 1` | `public/images/footer/footer-tower.jpg` | 383×237 | `content.ts` › `footer.media` |

**All slots are filled.** Every `src` in `content.ts` and `projects.ts` resolves
to a file in `public/`; the paths above are the ones actually in use, not the
placeholder `images/…` destinations the manifest originally reserved.

The hero is the one place where swapping art has a knock-on effect: its two
scrims (`--scrim-hero-side` / `--scrim-hero-bottom`) are shared by both
slides and are set by the brighter of them, so the copy stays legible without
the overlay changing weight as the carousel advances. Add a brighter slide than
`dubai2.png` and those two tokens need re-checking.

The hero carousel is down to two slides on request — `heroimage.png` and
`dubai2.png`. `public/dubai.jpeg` is no longer referenced anywhere;
`public/ARCHIA_Project_02.jpg` is still in use, as `projects[1]`.

### Note on the About gallery

`draw5 / draw3 / draw 3 / draw2` are a single bottom-aligned row whose widths
total **exactly 1344** — the content column (546 + 236 + 305 + 257). Keep the
listed aspect ratios or the row will stop lining up.

## Drawn rather than exported

Three comp layers are image fills that could not be exported. Because they are
standard marks rather than artwork, they are drawn as inline SVG at the comp's
exact box. Swap in the real exports if they were treated differently:

| Figma layer | Where | Box |
|---|---|---|
| `Instagram_logo 1` | `app/components/ui/SocialIcons.tsx` | 25×25 |
| `_X-logo-transparent-white-twitter 1` | `app/components/ui/SocialIcons.tsx` | 25×25 |
| `copywrite logo 1` | `app/components/layout/SiteFooter.tsx` (a `©` glyph) | 45×25 |

The four `Principle Icon` layers (2:31 / 2:34 / 2:37 / 2:40) are **text** layers
in the comp, not exported assets, so their glyphs were never retrievable. They
are drawn as SVG in `app/components/ui/PrincipleIcon.tsx` at the comp's 40×30.8
box.
