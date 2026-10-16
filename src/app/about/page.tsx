import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LineGlobe from "@/components/LineGlobe";
import AboutIntro from "@/components/AboutIntro";
import AboutServices from "@/components/AboutServices";
import AboutAward from "@/components/AboutAward";
import { profile } from "@/data/content";

export const metadata: Metadata = {
  title: "À propos",
  description: profile.seoDescription,
  alternates: { canonical: "/about/" },
  openGraph: { title: `À propos — ${profile.fullName}`, description: profile.seoDescription, url: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={["Concevoir des logiciels", "qui durent."]} />
      <LineGlobe />
      <AboutIntro />
      <AboutServices />
      <AboutAward />
    </>
  );
}
