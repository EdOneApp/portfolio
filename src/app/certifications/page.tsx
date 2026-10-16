import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CardGrid from "@/components/CardGrid";
import { certifications, awards, profile } from "@/data/content";

export const metadata: Metadata = {
  title: `Certifications & distinctions — ${profile.fullName}`,
  description:
    "Certifications IBM, Microsoft, AXELOS et distinctions de Daniel Guedegbe : 1er Prix Moov Africa CI StartUp Challenge 2025, finaliste ICESCO, Hackathon MTN MTS.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reconnaissances"
        title={["Certifications", "& distinctions"]}
        intro="Des certifications techniques aux podiums de hackathons : une validation continue, par la pratique et par les pairs."
      />
      <CardGrid
        heading="Certifications"
        cards={certifications.map((c) => ({ title: c.title, subtitle: c.issuer }))}
      />
      <CardGrid
        heading="Distinctions"
        cards={awards.map((a) => ({
          title: a.title,
          subtitle: a.status,
          date: a.date,
          text: a.text,
        }))}
      />
    </>
  );
}
