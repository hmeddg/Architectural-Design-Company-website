/**
 * Site-wide constants — wordmark, navigation, contact details, socials.
 *
 * Strings marked (comp) are taken from layer names in the Figma file; strings
 * marked (copy) could not be read out of Figma (tool-call quota) and are
 * written to match the studio voice in the About statement. Replace the (copy)
 * entries with the exact strings from the design when the quota resets.
 */

export const site = {
  /** Logo / ARCHIA (2:5) + Logo / STUDIO (2:6) */
  wordmark: "ARCHIA",
  wordmarkSub: "STUDIO",
  /** (copy) */
  tagline: "Architecture Studio",
  /** (copy) */
  description:
    "ARCHIA is an architecture studio designing refined, contemporary environments defined by clarity, proportion, materiality and timeless elegance.",
  url: "https://archia.studio",
} as const;

/** HEADER nav (2:7–2:11). Paths match the route folders already in app/.
 *  About precedes Projects at the user's request — the comp orders them the
 *  other way round (Projects x=280, About x=385). */
export const navigation = [
  { label: "Home", href: "/", sectionId: "hero" },
  { label: "About", href: "/About", sectionId: "about" },
  { label: "Projects", href: "/project", sectionId: "projects" },
  // No Services band exists on the home page, so nothing highlights it there.
  { label: "Services", href: "/Services", sectionId: null },
  { label: "Contact", href: "/Contact", sectionId: "contact" },
] as const;

/** Phone (2:12) carried over from the project's original Navbar. */
export const contact = {
  phone: "+971 4 590 4567",
  phoneHref: "tel:+97145904567",
  /** (copy) */
  email: "studio@archia.ae",
  emailHref: "mailto:studio@archia.ae",
  /** (copy) — Footer / Address (87:13), 2 lines in the comp */
  address: ["Emaar Beachfront, Marina District", "Dubai, United Arab Emirates"],
} as const;

/** Frame 9 (103:23) — two 25x25 marks, 41px apart. */
export const socials = [
  { label: "Instagram", href: "https://instagram.com/archia.studio", icon: "instagram" },
  { label: "X", href: "https://x.com/archiastudio", icon: "x" },
] as const;

export type SocialIconName = (typeof socials)[number]["icon"];
