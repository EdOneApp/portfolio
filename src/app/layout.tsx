import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton";
import { profile, stack } from "@/data/content";
import "@/styles/tokens.css";

const neueMontreal = localFont({
  src: [
    { path: "../../public/fonts/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/NeueMontreal-Regular.otf", weight: "450", style: "normal" },
    { path: "../../public/fonts/NeueMontreal-Italic.otf", weight: "450", style: "italic" },
    { path: "../../public/fonts/NeueMontreal-Bold.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/NeueMontreal-BoldItalic.otf", weight: "800", style: "italic" },
  ],
  variable: "--font-neue",
  display: "swap",
});

const siteUrl = "https://me.myoctogone.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profile.seoTitle,
    template: `%s — ${profile.fullName}`,
  },
  description: profile.seoDescription,
  keywords: [
    profile.fullName,
    "Daniel Guedegbe",
    "ingénieur logiciel",
    "développeur full stack",
    "développeur Django",
    "développeur Flutter",
    "développeur backend Abidjan",
    "développeur Côte d'Ivoire",
    "freelance développeur Abidjan",
    ...stack,
  ],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  publisher: profile.fullName,
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: profile.seoTitle,
    description: profile.ogDescription,
    url: siteUrl,
    siteName: profile.fullName,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/headerbigImagefull.png",
        width: 1677,
        height: 938,
        alt: profile.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seoTitle,
    description: profile.ogDescription,
    images: ["/images/headerbigImagefull.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.legalName,
  jobTitle: profile.role,
  url: siteUrl,
  image: `${siteUrl}/images/headerbigImagefull.png`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: stack,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={neueMontreal.variable} data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PageTransition />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
