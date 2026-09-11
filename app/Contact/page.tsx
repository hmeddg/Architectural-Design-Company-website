import type { Metadata } from "next";
import { ContactSection } from "@/app/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell ARCHIA Studio about the site, the brief and the timeline. We reply within two working days.",
};

/**
 * Contact route. Reuses the home page's contact band (Frame 6 / 47:71) rather
 * than duplicating the form, so there is one implementation to maintain.
 */
export default function ContactPage() {
  return <ContactSection showLabel={false} headingAs="h1" />;
}
