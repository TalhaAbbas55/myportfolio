import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import AiLab from "@/components/AiLab";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import RecentProjects from "@/components/RecentProjects";
import { SiteChrome } from "@/components/SiteChrome";

/**
 * Server component: every section ships as real HTML in the first response.
 * Only the chrome (nav, cursor, palette) and the individually-marked
 * interactive pieces hydrate.
 */
const Home = () => (
  <>
    <SiteChrome />

    <main className="relative mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
      <Hero />
      <Grid />
      <AiLab />
      <Experience />
      <RecentProjects />
      <Skills />
      <Testimonials />
      <Approach />
      <Footer />
    </main>
  </>
);

export default Home;
