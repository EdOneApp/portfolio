import Image from "next/image";
import { journey, degrees, certifications, awards, aboutMission } from "@/data/content";
import Reveal from "./Reveal";
import Timeline from "./Timeline";
import CardGrid from "./CardGrid";
import styles from "./AboutJourney.module.css";

export default function AboutJourney() {
  return (
    <>
      <section className={styles.headerSection}>
        <div className={styles.inner}>
          <Reveal>
            <h2 className={styles.heading}>Mon parcours, en détail.</h2>
          </Reveal>
          <div className={styles.headerGrid}>
            <Reveal delay={0.05}>
              <p className={styles.mission}>{aboutMission.summary}</p>
              <div className={styles.chips}>
                {aboutMission.specialties.map((s) => (
                  <span key={s} className={styles.chip}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className={styles.gallery}>
              <div className={styles.galleryItem}>
                <Image src="/images/daniel-portrait-2.webp" alt="Daniel Guedegbe en conférence" width={360} height={360} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/images/daniel-avatar.webp" alt="Daniel Guedegbe, portrait" width={360} height={360} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className={styles.subHeadingWrap}>
        <Reveal>
          <p className={styles.subHeading}>Expérience professionnelle</p>
        </Reveal>
      </div>
      <Timeline
        items={journey.map((j) => ({
          period: j.period,
          title: j.role,
          subtitle: j.place,
          description: j.description,
          current: j.current,
        }))}
      />

      <div className={styles.subHeadingWrap}>
        <Reveal>
          <p className={styles.subHeading}>Formation académique</p>
        </Reveal>
      </div>
      <Timeline
        items={degrees.map((d) => ({
          period: d.year,
          title: d.title,
          subtitle: d.place,
        }))}
      />

      <CardGrid
        heading="Certifications"
        cards={certifications.map((c) => ({ title: c.title, subtitle: c.issuer }))}
      />
      <CardGrid
        heading="Distinctions & récompenses"
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
