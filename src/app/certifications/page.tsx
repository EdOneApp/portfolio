import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CardGrid from "@/components/CardGrid";
import { certifications, awards, profile } from "@/data/content";

const description =
  "Certifications IBM, Microsoft, AXELOS et distinctions de Daniel Guedegbe : 1er Prix Moov Africa CI StartUp Challenge 2025, finaliste ICESCO, Hackathon MTN MTS.";

export const metadata: Metadata = {
  title: "Certifications & distinctions",
  description,
  alternates: { canonical: "/certifications/" },
  openGraph: { title: `Certifications & distinctions — ${profile.fullName}`, description, url: "/certifications/" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader title={["Certifications", "& distinctions"]} />
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
