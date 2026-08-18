import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials, Experience } from "@/components/sections/Experience";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Philosophy } from "@/components/sections/Philosophy";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Hero } from "@/components/sections/Hero";
import { SectionDivider } from "@/components/ui/Backdrops";

/**
 * The page shell is a server component; only the sections that genuinely need
 * scroll/pointer state opt into the client.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <CustomCursor />

      <main id="main" className="flex-1">
        <Hero />
        <SectionDivider />
        <About />
        <Skills />
        <SectionDivider />
        <Experience />
        <Credentials />
        <FeaturedProject />
        <Projects />
        <Philosophy />
        <Services />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
