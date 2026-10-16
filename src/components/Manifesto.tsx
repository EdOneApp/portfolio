import { manifesto } from "@/data/content";
import Reveal from "./Reveal";
import RevealLines from "./RevealLines";
import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.label}>{manifesto.label}</p>
        </Reveal>
        <RevealLines
          as="p"
          className={styles.text}
          lines={[
            "Un logiciel ne vaut que par sa capacité à durer, à évoluer et",
            "à servir longtemps après sa livraison. Alors j'ai choisi la",
            "rigueur : Clean Architecture, tests, documentation, et des",
            "systèmes que d'autres équipes peuvent reprendre sans moi.",
          ]}
        />
      </div>
    </section>
  );
}
