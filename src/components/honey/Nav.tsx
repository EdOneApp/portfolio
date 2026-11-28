"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { socials } from "@/components/honey/socials";
import { mainLinks, extraLinks } from "./nav-links";
import { Arrow, Mark } from "./ui";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = scrollY;
    const f = () => {
      const y = scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const items = () => menu.current?.querySelectorAll<HTMLElement>("a,button");
    items()?.[0]?.focus();
    const key = (e: KeyboardEvent) => {
      const els = items();
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab" && els?.length) {
        if (e.shiftKey && document.activeElement === els[0]) {
          e.preventDefault();
          els[els.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === els[els.length - 1]) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <>
      <header
        className={`h-nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}
      >
        <Link href="/" className="h-logo" aria-label="Daniel Guedegbe, accueil">
          <span className="h-logo-cube" aria-hidden="true">
            <i>D</i>
            <i>G</i>
            <i>
              <Mark />
            </i>
            <i>G</i>
          </span>
          <span className="h-logo-text">
            Daniel <b>Guedegbe</b>
          </span>
        </Link>
        <nav aria-label="Navigation principale" className="h-nav-links">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path.startsWith(l.href) ? "page" : undefined}
            >
              <span data-text={l.label}>{l.label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/devis" className="h-nav-cta">
          <i aria-hidden="true" />
          Demander un devis
          <Arrow />
        </Link>
        <button
          ref={toggle}
          className={`h-burger ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="h-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
      <div
        ref={menu}
        id="h-menu"
        className={`h-menu ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="h-menu-bg" aria-hidden="true">
          <Mark />
        </div>
        <div className="h-menu-inner">
          <nav className="h-menu-main" aria-label="Menu principal">
            <Link href="/" style={{ "--i": 0 } as React.CSSProperties}>
              <small>00</small>Accueil
            </Link>
            {mainLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ "--i": i + 1 } as React.CSSProperties}
              >
                <small>0{i + 1}</small>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="h-menu-side">
            <p className="h-menu-label">Aller plus loin</p>
            {extraLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label} <Arrow />
              </Link>
            ))}
            <p className="h-menu-label">Me suivre</p>
            <div className="h-menu-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
            <p className="h-menu-foot">Abidjan · disponible partout ailleurs.</p>
          </div>
        </div>
      </div>
    </>
  );
}
