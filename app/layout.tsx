import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import { site } from "./data/site";

/**
 * Display serif + tracked sans, both variable faces so a single file covers
 * every weight. Exposed as CSS variables that styles/tokens.css maps to
 * --font-display / --font-sans.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.wordmark} ${site.wordmarkSub} — ${site.tagline}`,
    template: `%s — ${site.wordmark} ${site.wordmarkSub}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.wordmark} ${site.wordmarkSub}`,
    description: site.description,
    url: site.url,
    siteName: `${site.wordmark} ${site.wordmarkSub}`,
    type: "website",
  },
};

/**
 * `data-scroll-behavior="smooth"` is required, not decorative: Next 16 stopped
 * neutralising `scroll-behavior: smooth` during route transitions (see the v16
 * "Scroll Behavior Override" guide). Without it every navigation animates a
 * scroll to the top — 4188px on the home page — which reads as a page reload.
 * The attribute restores the instant jump on navigation while keeping smooth
 * scrolling for in-page anchors (the skip link, the form's error summary).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll />

        <Link href="#main" className="skipLink">
          Skip to content
        </Link>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
