import styles from "./Marquee.module.css";

export default function Marquee({
  children,
  itemClassName,
}: {
  children: React.ReactNode[];
  itemClassName?: string;
}) {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {[0, 1].map((dup) => (
          <div key={dup} className={styles.track} style={{ animation: "none" }}>
            {children.map((child, i) => (
              <div className={`${styles.item} ${itemClassName ?? ""}`} key={`${dup}-${i}`}>
                {child}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
