"use client";
import { useEffect, useRef, useState } from "react";

const words = ["Imaginer", "Concevoir", "Construire", "Faire vivre"];

export default function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"run" | "leave" | "done">("run");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("honey-loaded") === "1";
    } catch {}
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen) {
      document.documentElement.classList.remove("h-loading");
      const id = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(id);
    }
    const duration = reduced ? 400 : 2300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("leave");
        try {
          sessionStorage.setItem("honey-loaded", "1");
        } catch {}
        document.documentElement.classList.remove("h-loading");
        window.dispatchEvent(new Event("honey:loaded"));
        setTimeout(() => setPhase("done"), reduced ? 50 : 1300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;
  const word = words[Math.min(words.length - 1, Math.floor(count / 26))];

  return (
    <div
      ref={root}
      className={`h-loader ${phase === "leave" ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement du portfolio"
    >
      <div className="h-loader-panel is-top" />
      <div className="h-loader-panel is-bottom" />
      <div className="h-loader-content">
        <div className="h-loader-orb" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className="h-loader-word" aria-hidden="true">
          <span key={word}>{word}</span>
        </div>
        <div className="h-loader-count" aria-hidden="true">
          {String(count).padStart(3, "0")}
          <small>%</small>
        </div>
        <div className="h-loader-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <p className="h-loader-sign">
          Daniel Guedegbe <em>— portfolio</em>
        </p>
      </div>
    </div>
  );
}
