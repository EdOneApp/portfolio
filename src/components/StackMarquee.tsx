import { stack } from "@/data/content";
import Marquee from "./Marquee";
import styles from "./StackMarquee.module.css";

export default function StackMarquee() {
  return (
    <section className={styles.section}>
      <Marquee>
        {stack.map((item) => (
          <span className={styles.chip} key={item}>
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
