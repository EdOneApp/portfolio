"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { menuLinks, projects } from "@/data/content";
import styles from "./PageTransition.module.css";

const GREETINGS = ["Hello", "Bonjour", "Akwaba", "Ciao", "Hola", "こんにちは", "Hallå", "Guten Tag", "Bienvenue"];

function labelFor(pathname: string) {
  const exact = menuLinks.find((l) => l.href === pathname);
  if (exact) return exact.label;
  if (pathname.startsWith("/work/")) {
    const slug = pathname.split("/")[2];
    const project = projects.find((p) => p.slug === slug);
    if (project) return project.title;
  }
  return "Daniel Guedegbe";
}

export default function PageTransition() {
  const pathname = usePathname();
  const [covered, setCovered] = useState(true);
  const [label, setLabel] = useState(GREETINGS[0]);
  const previousPath = useRef(pathname);

  useEffect(() => {
    let cancelled = false;

    async function greet() {
      for (const word of GREETINGS) {
        if (cancelled) return;
        setLabel(word);
        await new Promise((r) => setTimeout(r, 180));
      }
      if (!cancelled) setCovered(false);
    }

    greet();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    let cancelled = false;
    async function swipe() {
      setLabel(labelFor(pathname));
      setCovered(true);
      await new Promise((r) => setTimeout(r, 480));
      if (!cancelled) setCovered(false);
    }
    swipe();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <div className={styles.overlay}>
      <motion.div
        className={`${styles.panel} ${styles.panelTop}`}
        animate={{ scaleY: covered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
      />
      <motion.div
        className={`${styles.panel} ${styles.panelBottom}`}
        animate={{ scaleY: covered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
      />
      {covered && (
        <motion.div
          className={styles.word}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {label}
          <span className={styles.dot} />
        </motion.div>
      )}
    </div>
  );
}
