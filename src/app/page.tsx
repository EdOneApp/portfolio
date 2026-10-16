import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import WorkList from "@/components/WorkList";
import WorkTiles from "@/components/WorkTiles";
import CenterGridBtn from "@/components/CenterGridBtn";
import { featuredProjects, projects } from "@/data/content";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <WorkList title="Projets récents" projects={featuredProjects} />
      <WorkTiles projects={featuredProjects} />
      <CenterGridBtn href="/work" label="Plus de projets" count={projects.length} />
    </>
  );
}
