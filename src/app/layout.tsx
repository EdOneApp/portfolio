import type { Metadata } from "next";
import {existsSync} from "node:fs";
import {join} from "node:path";
import localFont from "next/font/local";
import Nav from "@/components/agency/Nav";
import Footer from "@/components/agency/Footer";
import MotionSystem from "@/components/agency/MotionSystem";
import AgencyProvider from "@/components/agency/Provider";
import MusicDock from "@/components/agency/MusicDock";
import { profile, stack } from "@/data/content";
import "@/styles/tokens.css";
import "@/styles/agency.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/NeueMontreal-Regular.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-Italic.otf",
      weight: "450",
      style: "italic",
    },
    {
      path: "../../public/fonts/NeueMontreal-Bold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueMontreal-BoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-neue",
  display: "swap",
});

const agencyDisplay = localFont({
  src: "../../public/fonts/Agency-Fraunces.ttf",
  variable: "--font-agency-display",
  display: "swap",
});

const siteUrl = "https://guedegbe.com";
const backgroundAudio = existsSync(join(process.cwd(), "public", "Damso - Sentimental (Paroles).mp3")) ? "/Damso%20-%20Sentimental%20(Paroles).mp3" : null;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Guedegbe — Design & développement, de l’idée à l’impact",
    template: `%s — ${profile.fullName}`,
  },
  description:
    "Portfolio de Daniel Guedegbe : sites immersifs, applications et architectures solides. Un esprit de studio et une exigence d’ingénieur, depuis Abidjan.",
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
    title: "Daniel Guedegbe — De l’idée à l’impact",
    description:
      "Design sensible, code solide : sites immersifs, produits web et applications par Daniel Guedegbe, depuis Abidjan.",
    url: siteUrl,
    siteName: profile.fullName,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/agency/og-agency.webp",
        width: 1200,
        height: 630,
        alt: profile.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Guedegbe — De l’idée à l’impact",
    description:
      "Design sensible, code solide : sites immersifs, produits web et applications par Daniel Guedegbe, depuis Abidjan.",
    images: ["/images/agency/og-agency.webp"],
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
  image: `${siteUrl}/images/agency/portrait-one.webp`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${neueMontreal.variable} ${agencyDisplay.variable}`}
      data-scroll-behavior="smooth"
    >
      <body id="top">
        <AgencyProvider>
          <a href="#contenu" className="agency-skip">
            Aller au contenu
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />

          <Nav />
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          {backgroundAudio && <MusicDock src={backgroundAudio} />}
          <MotionSystem />
        </AgencyProvider>
      </body>
    </html>
  );
}
