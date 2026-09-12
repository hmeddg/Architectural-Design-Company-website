import type { MediaSlot } from "@/app/lib/media";

/**
 * Section copy and media slots for the home page.
 *
 * The long About statement is verbatim from layer 41:3 in the comp — it was the
 * one text layer whose full content survived in the Figma metadata. Everything
 * else marked (copy) is written to match that voice; swap in the exact strings
 * when the Figma tool-call quota resets.
 */

/* ------------------------------------------------------------------ HERO --- */
/* Frame 2:13 — 1440x516. Two slides, kept on request: the comp's hero image and
   the Dubai skyline. Everything downstream reads this array's length, so adding
   or removing a slide needs no other change — but the hero scrim is shared by
   every slide rather than tuned per image, so it stays set against the brightest
   of them in tokens.css. */

export type HeroSlide = {
  media: MediaSlot;
  /** Hero Eyebrow (2:17) */
  eyebrow: string;
  /** Hero H1 (2:18) — 2 lines at 40px */
  title: string;
  /** Hero Body (2:19) */
  body: string;
};

export const heroSlides: HeroSlide[] = [
  {
    media: {
      figmaLayer: "HERO / background",
      src: "/heroimage.png",
      expectedPath: "/heroimage.png",
      alt: "Sunlit concrete villa with deep cantilevered terraces",
      width: 1440,
      height: 520,
    },
    eyebrow: "ARCHITECTURE · INTERIORS · DUBAI", // (copy)
    title: "Spaces conceived to be experienced, remembered, and lived in.", // (copy)
    body: "A studio practice built on clarity, proportion and enduring material quality.", // (copy)
  },
  {
    // 1244x700 — the one slide wider than the 1440x520 window, so the crop is
    // vertical and the skyline stays on the horizon where the comp puts it.
    media: {
      figmaLayer: "HERO / slide 3",
      src: "/dubai2.png",
      expectedPath: "/dubai2.png",
      alt: "The Dubai skyline at first light, mirrored in still water",
      width: 1440,
      height: 520,
    },
    eyebrow: "RESIDENTIAL · CULTURAL · HOSPITALITY", // (copy)
    title: "Timeless by design. Precise by nature.", // (copy)
    body: "Architecture that does not seek attention — it commands it through presence.", // (copy)
  },
];

/** CTA / View Our Work (2:20) — 130x42 with a 15px inset label. */
export const heroCta = { label: "View Our Work", href: "/project" } as const;

/* -------------------------------------------------------------- APPROACH --- */
/* Frame 2:25 — Section Label (2:27), H2 (2:28), Body (2:29), About Link
   (1:12 / 2:30), image Frame 3 (1:5), and four principle columns divided by
   three 149px vertical rules (30:3, 30:4, 30:6). */

export const approach = {
  label: "01 / OUR APPROACH",
  heading: "Architecture as the art of transforming space into experience.", // (copy)
  body: "Refined, contemporary environments defined by clarity and restraint.", // (copy)
  media: {
    figmaLayer: "Screenshot 1405-05-26 at 13.58.56 1",
    src: "/draw7.jpeg",
    expectedPath: "/draw7.jpeg",
    alt: "Line-drawing perspective through a corridor, showing the structural grid behind the finished surfaces",
    width: 370,
    height: 210,
  } satisfies MediaSlot,
} as const;

/** Principle Icon / Title / Body triples (2:31–2:42). The icons are *text*
 *  layers (40x30.8) in the comp rather than exported assets, so the glyphs were
 *  never retrievable; these names map to the SVG marks in PrincipleIcon.tsx. */
export const principles = [
  { icon: "clarity", title: "Clarity", body: "Legible form" }, // (copy)
  { icon: "proportion", title: "Proportion", body: "Measured volume" }, // (copy)
  { icon: "materiality", title: "Materiality", body: "Honest surface" }, // (copy)
  { icon: "permanence", title: "Permanence", body: "Built to outlast trend" }, // (copy)
] as const;

/* -------------------------------------------------------- FEATURED PROJECT - */
/* Featured Label (96:2), Featured View Project (7:7), Frame 7 (96:3) holding
   "image5 1" — a 1342x663 window onto a taller image. */

export const featured = {
  label: "03 / FEATURED PROJECT",
  link: { label: "VIEW PROJECT", href: "/project" },
  /** (copy) */
  title: "Emaar Beachfront Residence",
  /** (copy) */
  meta: "Dubai · Residential · 2025",
  media: {
    figmaLayer: "image5 1",
    src: "/image.png",
    expectedPath: "/image.png",
    alt: "Featured project — a sunlit concrete villa with deep cantilevered terraces above a pool",
    width: 1342,
    height: 663,
  } satisfies MediaSlot,
} as const;

/* ----------------------------------------------------------------- ABOUT --- */
/* Frame 5 (1:20) — 1344x824. "04 / ABOUT US" (1:28), the statement (41:3), a
   tall left image (draw4 1), and a bottom-aligned four-image row whose widths
   sum to exactly 1344: 546 / 236 / 305 / 257. */

export type StatementBlock = {
  tone: "lead" | "body" | "coda";
  /** Hard line breaks within the paragraph. */
  lines: readonly string[];
};

export const about = {
  label: "04 / ABOUT US",
  /**
   * Verbatim from layer 41:3. Kept as blocks rather than plain strings so the
   * emphasis and the deliberate line breaks in the design survive:
   *   lead — opening statement, carried at full ink
   *   body — the argument, one step back
   *   coda — the three-line signature that closes the section
   * `lines` are hard breaks inside one paragraph, not separate paragraphs.
   */
  statement: [
    {
      tone: "lead",
      lines: [
        "We see architecture as the art of transforming space into experience.",
        "Our studio creates refined, contemporary environments defined by clarity, proportion, materiality, and timeless elegance. We believe that exceptional architecture does not seek attention — it commands it through its presence, precision, and restraint.",
      ],
    },
    {
      tone: "body",
      lines: [
        "Our design philosophy is rooted in luxury through simplicity. Every element is carefully considered, from the relationship between light and volume to the tactile quality of materials and the smallest architectural detail. Nothing is excessive. Nothing is accidental.",
      ],
    },
    {
      tone: "body",
      lines: [
        "We approach each project as a unique architectural statement, responding to its context, purpose, and identity. Through a balance of minimalist aesthetics, innovative thinking, and meticulous craftsmanship, we create spaces that are both deeply personal and universally compelling.",
        "For us, luxury is not defined by extravagance.",
      ],
    },
    {
      tone: "body",
      lines: [
        "It is defined by space, silence, proportion, natural materials, and enduring quality.",
        "We design architecture that transcends trends — spaces conceived not only to be seen, but to be experienced, remembered, and lived in.",
      ],
    },
    {
      tone: "coda",
      lines: [
        "Timeless by design.",
        "Precise by nature.",
        "Exceptional by intention.",
      ],
    },
  ] as const satisfies readonly StatementBlock[],
  portrait: {
    figmaLayer: "draw4 1",
    src: "/draw4.jpeg",
    expectedPath: "/draw4.jpeg",
    alt: "Studio drawing of a stepped facade",
    width: 379,
    height: 474,
  } satisfies MediaSlot,
  /** Bottom-aligned row. `width` is the comp column width; heights differ, and
   *  the row is bottom-aligned exactly as in the comp. */
  gallery: [
    {
      figmaLayer: "draw5 1",
      src: "/draw5.jpeg",
      expectedPath: "/draw5.jpeg",
      alt: "Long section drawing through the house",
      width: 546,
      height: 274,
    },
    {
      figmaLayer: "draw3 1",
      src: "/draw3.jpeg",
      expectedPath: "/draw3.jpeg",
      alt: "Elevation study of a slatted screen",
      width: 236,
      height: 413,
    },
    {
      figmaLayer: "draw 3",
      src: "/draw.jpeg",
      expectedPath: "/draw.jpeg",
      alt: "Perspective sketch of the courtyard",
      width: 305,
      height: 413,
    },
    {
      figmaLayer: "draw2 1",
      src: "/draw2.jpeg",
      expectedPath: "/draw2.jpeg",
      alt: "Plan drawing of the floor plate",
      width: 257,
      height: 413,
    },
  ] satisfies MediaSlot[],
} as const;

/* --------------------------------------------------------------- CONTACT --- */
/* Frame 6 (47:71) over the full-bleed "Contact Background" (87:2, 1440x800). */

export const contactSection = {
  label: "05 / CONTACT TO US",
  heading: "Let us design the space you have been describing.", // (copy)
  body: "Tell us about the site, the brief and the timeline. We reply to every enquiry within two working days.", // (copy)
  form: {
    /** Field / Full Name (76:10), Email (76:14), Message (80:2) */
    fields: {
      name: { label: "FULL NAME", placeholder: "Your name" },
      email: { label: "EMAIL", placeholder: "you@company.com" },
      message: { label: "MESSAGE", placeholder: "Tell us about your project" },
    },
    /** Button / Send Message (76:18) — 232x56 */
    submit: "SEND MESSAGE",
    submitting: "SENDING…",
    /** Form Note (76:20) */
    note: "By sending this form you agree to our privacy policy.", // (copy)
  },
} as const;

/* ---------------------------------------------------------------- FOOTER --- */
/* Frame 87:3 — 1440x500. White-transparent social logo assets in the comp are
   what identifies this band (and the contact band above it) as dark. */

export const footer = {
  /** Footer / Statement (87:6) — 420x130 ≈ 5 lines */
  statement:
    "An architecture studio working across residential, cultural and hospitality projects. Luxury through simplicity — space, silence, proportion and enduring quality.", // (copy)
  /** Footer / Credentials (87:7) */
  credentials: "RIBA · Dubai Municipality Licence No. 000000", // (copy)
  contactLabel: "CONTACT",
  studioLabel: "STUDIO",
  /** 103:25 — verbatim from the comp. */
  copyright: "2023-2026 ARCHIA STUDIO - All Rights Reserved",
  media: {
    figmaLayer: "Emaar Beachfront 1",
    src: "/Emaar Beachfront.png",
    expectedPath: "/images/footer/footer-tower.jpg",
    alt: "Emaar Beachfront towers seen from the water",
    width: 383,
    height: 237,
  } satisfies MediaSlot,
} as const;
