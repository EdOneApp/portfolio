"use client";
import { socials } from "./socials";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, Asterisk } from "./ui";
const links = [
  ["Réalisations", "/work"],
  ["L’approche", "/about"],
  ["Contact", "/contact"],
];
export default function AgencyNav() {
  const path = usePathname(),
    [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null),
    toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 35);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      menu.current?.querySelectorAll<HTMLElement>("a,button");
    focusables()?.[0]?.focus();
    const key = (e: KeyboardEvent) => {
      const els = focusables();
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab" && els?.length) {
        if (e.shiftKey && document.activeElement === els[0]) {
          e.preventDefault();
          els[els.length - 1].focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === els[els.length - 1]
        ) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <header className={`agency-nav ${scrolled ? "scrolled" : ""}`}>
        <Link
          href="/"
          aria-label="Daniel Guedegbe, accueil"
          className="agency-logo"
          onClick={() => setOpen(false)}
        >
          <span className="agency-logo-icon">
            <Asterisk />
          </span>
          <span>
            daniel
            <br />
            <b>guedegbe.</b>
          </span>
        </Link>
        <nav aria-label="Navigation principale">
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {label}
              <span />
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="agency-nav-cta">
          Un projet en tête ?<Arrow />
        </Link>
        <button
          className="agency-menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="agency-menu"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      {open && (
        <div
          ref={menu}
          className="agency-menu"
          id="agency-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <button
            className="agency-menu-close"
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
          <p className="agency-label">L’IDÉE, C’EST DE SE RENCONTRER.</p>
          {links.map(([label, href], i) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              {label}
              <Arrow />
            </Link>
          ))}
          <div className="agency-menu-extra">
            {[
              ["Expérience", "/experience"],
              ["Formation", "/education"],
              ["Distinctions", "/certifications"],
            ].map(([l, h]) => (
              <Link key={h} href={h} onClick={() => setOpen(false)}>
                {l} ↗
              </Link>
            ))}
          </div>
          <div className="agency-menu-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <p>Abidjan · Disponible à l’international.</p>
        </div>
      )}
    </>
  );
}
