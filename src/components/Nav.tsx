"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import MagneticLink from "./MagneticLink";
import FullscreenMenu from "./FullscreenMenu";
import { navLinks } from "@/data/content";
import styles from "./Nav.module.css";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={styles.nav}>
        <Logo />
        <nav className={styles.links}>
          {navLinks.map((link) => (
            <MagneticLink href={link.href} key={link.href} className={styles.link} strength={16}>
              {link.label}
            </MagneticLink>
          ))}
        </nav>
        <button
          className={styles.menuBtn}
          data-open={open}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? "Fermer" : "Menu"}
          <span className={styles.burger}>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </span>
        </button>
      </header>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
