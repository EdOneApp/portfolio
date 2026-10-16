import type { Metadata } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { profile } from "@/data/content";
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

export const metadata: Metadata = {
  title: profile.seoTitle,
  description: profile.seoDescription,
  openGraph: {
    title: profile.seoTitle,
    description: profile.ogDescription,
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={neueMontreal.variable} data-scroll-behavior="smooth">
      <body>
        <PageTransition />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
