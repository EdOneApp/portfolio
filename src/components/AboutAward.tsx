import Image from "next/image";
import { awards } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./AboutAward.module.css";

export default function AboutAward() {
  const top = awards[0];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal y={0} className={styles.imageWrap}>
          <Image src="/images/edoneweb.png" alt={top.title} fill sizes="(max-width: 900px) 100vw, 45vw" />
        </Reveal>
        <div>
          <Reveal>
            <span className={styles.badge}>🏆</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={styles.heading}>
              {top.status}
              <br />
              {top.date}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.text}>{top.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
