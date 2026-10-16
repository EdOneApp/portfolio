import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Terrains from "@/components/Terrains";
import StackMarquee from "@/components/StackMarquee";
import FeaturedWork from "@/components/FeaturedWork";
import Testimonials from "@/components/Testimonials";
import PartnersMarquee from "@/components/PartnersMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Terrains />
      <StackMarquee />
      <FeaturedWork />
      <Testimonials />
      <PartnersMarquee />
    </>
  );
}
