import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { TechStackShowcase } from "@/components/home/TechStackShowcase";
import { Contact } from "@/components/home/Contact";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { BlogNavLink } from "@/components/layout/BlogNavLink";
import { FloatingCubes } from "@/components/common/FloatingCubes";
import { GamesShowcase } from "@/components/home/GamesShowcase";
import ToolsShowcase from "@/components/home/ToolsShowcase";
import Certificates from "@/components/home/Certificates";

const HomePage = () => {
  return (
    <>
      <ScrollToTop />
      <BlogNavLink />
      <Hero />
      <Projects />
      <TechStackShowcase />
      <GamesShowcase />
      <ToolsShowcase />
      <Certificates />
      <Contact />
      <FloatingCubes />
    </>
  );
};

export default HomePage;
