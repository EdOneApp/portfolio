"use client";

import { AnimatePresence, motion } from "motion/react";
import { menuLinks, profile } from "@/data/content";
import MagneticLink from "./MagneticLink";
import styles from "./FullscreenMenu.module.css";

const overlayVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] as const },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] as const },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
  exit: { transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { y: "110%", transition: { duration: 0.35, ease: [0.7, 0, 0.3, 1] as const } },
};

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.nav
            className={styles.list}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuLinks.map((link, i) => (
              <div className={styles.item} key={link.href}>
                <motion.div variants={itemVariants}>
                  <MagneticLink href={link.href} className={styles.link} onClick={onClose} strength={10}>
                    <span className={styles.index}>0{i + 1}</span>
                    {link.label}
                  </MagneticLink>
                </motion.div>
              </div>
            ))}
          </motion.nav>

          <div className={styles.footerRow}>
            <span>{profile.location}</span>
            <div className={styles.socials}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
