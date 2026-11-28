import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Nav from "@/components/honey/Nav";
import Footer from "@/components/honey/Footer";
import MotionSystem from "@/components/honey/MotionSystem";
import Loader from "@/components/honey/Loader";
import MotionProvider from "@/components/honey/Provider";
import MusicDock from "@/components/honey/MusicDock";
import { profile, stack } from "@/data/content";
import "@/styles/honey.css";

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
const backgroundAudio = existsSync(
  join(process.cwd(), "public", "audio", "damso-sentimental.mp3"),
)
  ? "/audio/damso-sentimental.mp3"
  : null;

export const viewport: Viewport = {
  themeColor: "#2a0810",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Guedegbe — Sites immersifs, applications & data, depuis Abidjan",
    template: `%s — ${profile.fullName}`,
  },
  description:
    "Portfolio de Daniel Guedegbe : applications web et mobiles, data, bases de données et présence digitale. Un esprit de studio et une exigence d’ingénieur, depuis Abidjan.",
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
      "Design sensible, code solide : applications web et mobiles, data et systèmes sur mesure par Daniel Guedegbe, depuis Abidjan.",
    url: siteUrl,
    siteName: profile.fullName,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/honey/og-honey.jpg",
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
      "Design sensible, code solide : applications web et mobiles, data et systèmes sur mesure par Daniel Guedegbe, depuis Abidjan.",
    images: ["/images/honey/og-honey.jpg"],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('honey-loaded')!=='1')document.documentElement.classList.add('h-loading')}catch(e){}",
          }}
        />
      </head>
      <body id="top">
        <MotionProvider>
          <Loader />
          <a href="#contenu" className="h-skip">
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
        </MotionProvider>
      </body>
    </html>
  );
}
