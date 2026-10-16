"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import Reveal from "./Reveal";
import MagneticLink from "./MagneticLink";
import styles from "./Footer.module.css";

const YEAR = 2026;

function useAbidjanTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Abidjan",
        }) + " GMT"
      );
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Footer() {
  const time = useAbidjanTime();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>
            Travaillons <span>ensemble.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.ctaRow}>
            <MagneticLink href="/contact" className={styles.ctaBtn} strength={30}>
              Me contacter
            </MagneticLink>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className={styles.directRow}>
            <a className={styles.directLink} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className={styles.directLink} href={profile.phoneHref}>
              {profile.phone}
            </a>
          </div>
        </Reveal>

        <div className={styles.bottomRow}>
          <div>
            <div className={styles.credits}>
              <h5>Version</h5>
              <p>{YEAR} © Édition</p>
            </div>
            <div className={styles.time}>
              <h5>Heure locale</h5>
              <p>{time ?? "—"}</p>
            </div>
          </div>
          <div>
            <h5>Socials</h5>
            <div className={styles.socialsList}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
