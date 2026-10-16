import Image from "next/image";
import { partners } from "@/data/content";
import Marquee from "./Marquee";
import styles from "./PartnersMarquee.module.css";

export default function PartnersMarquee() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.heading}>Partenaires & clients</p>
      </div>
      <Marquee>
        {partners.map((p) => (
          <div className={styles.logo} key={p.name}>
            <Image src={p.image} alt={p.name} width={140} height={32} style={{ width: "auto", height: "2em" }} />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
