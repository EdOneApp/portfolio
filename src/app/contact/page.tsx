import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import RevealLines from "@/components/RevealLines";
import CalEmbed from "@/components/CalEmbed";
import { profile } from "@/data/content";
import styles from "./page.module.css";

const description =
  "Réservez directement un créneau de 30 minutes avec Daniel Guedegbe pour discuter de votre projet backend, mobile, fintech, e-gouvernement, SIG ou e-commerce.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact/" },
  openGraph: { title: `Contact — ${profile.fullName}`, description, url: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <header className={styles.header}>
        <RevealLines
          as="h1"
          className={styles.title}
          lines={[
            <span key="l1">
              <span className={styles.avatar}>
                <Image src="/images/profile.jpg" alt="" fill sizes="2em" />
              </span>{" "}
              Discutons d&apos;un
            </span>,
            "projet ensemble",
          ]}
        />
      </header>

      <div className={styles.directWrap}>
        <Reveal delay={0.05} className={styles.directRow}>
          <a className={styles.sideLink} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className={styles.sideLink} href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
            {profile.phone}
          </a>
          <a className={styles.sideLink} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className={styles.sideLink} href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Reveal>
      </div>

      <section className={styles.calSection}>
        <Reveal>
          <h2 className={styles.calHeading}>Réservez directement un appel de 30 minutes.</h2>
        </Reveal>
        <Reveal delay={0.1} className={styles.calWrap}>
          <CalEmbed />
        </Reveal>
      </section>
    </>
  );
}
