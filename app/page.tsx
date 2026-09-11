import { AboutSection } from "./components/sections/AboutSection";
import { ApproachSection } from "./components/sections/ApproachSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FeaturedSection } from "./components/sections/FeaturedSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";

/**
 * HOME — frame 2:2 ("HOME — 1440 Desktop", 1440x4188), in the comp's order:
 * hero · 01 approach · 02 selected projects · 03 featured · 04 about · 05 contact.
 * The header and footer bands live in app/layout.tsx.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ApproachSection />
      <ProjectsSection />
      <FeaturedSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
