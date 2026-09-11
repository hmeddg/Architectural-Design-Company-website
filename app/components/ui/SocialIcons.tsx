import Link from "next/link";
import type { SocialIconName } from "@/app/data/site";
import { socials } from "@/app/data/site";
import styles from "./social-icons.module.css";

/**
 * Footer socials — Frame 9 (103:23): two 25x25 marks with their left edges at
 * x=0 and x=41, i.e. a 16px gap.
 *
 * NOTE — the comp ships these as image fills ("Instagram_logo 1",
 * "_X-logo-transparent-white-twitter 1") which could not be exported: the
 * Figma tool-call quota was spent. These are the two official brand glyphs
 * drawn as inline SVG at the comp's exact 25x25 box. Swap in the exports if
 * the originals were treated (e.g. tinted or outlined) differently.
 */

const glyphs: Record<SocialIconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path
      d="M3.2 3h5.1l4.06 5.52L17.3 3h3.3l-6.2 6.9L21.4 21h-5.1l-4.3-5.85L6.6 21H3.3l6.5-7.2L3.2 3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function SocialIcons() {
  return (
    <ul className={styles.list}>
      {socials.map((social) => (
        <li key={social.label}>
          <Link
            href={social.href}
            className={styles.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg
              className={styles.icon}
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {glyphs[social.icon]}
            </svg>
            <span className={styles.label}>{social.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
