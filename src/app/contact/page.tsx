import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CalEmbed from "@/components/CalEmbed";
import { profile } from "@/data/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Contact — ${profile.fullName}`,
  description:
    "Discutons de votre projet : backend, mobile, fintech, e-gouvernement, SIG ou e-commerce. Réservez un créneau de 30 minutes ou écrivez à Daniel Guedegbe.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={["Discutons de", "votre projet."]}
        intro="Décrivez votre besoin ci-dessous, ou réservez directement un créneau de 30 minutes dans mon agenda."
      />

      <div className={styles.grid}>
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.directRow}>
            <p className={styles.directLink}>
              <strong>Email</strong>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p className={styles.directLink}>
              <strong>WhatsApp</strong>
              <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
                {profile.phone}
              </a>
            </p>
            <p className={styles.directLink}>
              <strong>LinkedIn</strong>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                @{profile.linkedinHandle}
              </a>
            </p>
            <p className={styles.directLink}>
              <strong>GitHub</strong>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                @{profile.githubHandle}
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      <section className={styles.calSection}>
        <Reveal>
          <p className={styles.calHeading}>Ou directement</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={styles.calTitle}>Réservez un appel de 30 minutes dans mon agenda.</h2>
        </Reveal>
        <Reveal delay={0.1} className={styles.calWrap}>
          <CalEmbed />
        </Reveal>
      </section>
    </>
  );
}
