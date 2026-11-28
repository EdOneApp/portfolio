"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/content";

export default function ProjectRing() {
  const ring = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const state = useRef({ angle: 0, velocity: 0, dragging: false, lastX: 0, moved: 0 });
  const n = projects.length;
  const step = 360 / n;

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (ring.current) io.observe(ring.current);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const s = state.current;
      if (!s.dragging) {
        s.angle += s.velocity + (reduced ? 0 : 0.06);
        s.velocity *= 0.94;
      }
      if (ring.current) ring.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${-s.angle}deg)`;
      const idx = ((Math.round(s.angle / step) % n) + n) % n;
      setActive((a) => (a === idx ? a : idx));
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [n, step]);

  const down = (e: React.PointerEvent) => {
    state.current.dragging = true;
    state.current.lastX = e.clientX;
    state.current.moved = 0;
  };
  const move = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.moved += Math.abs(dx);
    s.angle -= dx * 0.25;
    s.velocity = -dx * 0.25;
  };
  const up = () => {
    state.current.dragging = false;
  };
  const nudge = (d: number) => {
    state.current.velocity = 0;
    state.current.angle = Math.round(state.current.angle / step + d) * step;
  };
  const p = projects[active];

  return (
    <div className="h-ring-wrap">
      <div
        className="h-ring-scene"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        onPointerCancel={up}
        data-cursor="GLISSER"
      >
        <div className="h-ring" ref={ring} style={{ "--n": n } as React.CSSProperties}>
          {projects.map((proj, i) => (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className={`h-ring-item ${i === active ? "is-active" : ""}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
              onClick={(e) => {
                if (state.current.moved > 6) e.preventDefault();
              }}
              draggable={false}
              tabIndex={-1}
              aria-hidden="true"
            >
              {proj.image && (
                <Image src={proj.image} alt="" width={640} height={400} sizes="320px" draggable={false} />
              )}
              <span>{proj.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-ring-caption" aria-live="polite">
        <button type="button" onClick={() => nudge(-1)} aria-label="Projet précédent">
          ←
        </button>
        <div>
          <small>
            {String(active + 1).padStart(2, "0")} / {n}
          </small>
          <Link href={`/work/${p.slug}`}>{p.title}</Link>
          <p>{p.category}</p>
        </div>
        <button type="button" onClick={() => nudge(1)} aria-label="Projet suivant">
          →
        </button>
      </div>
      <ul className="h-sr">
        {projects.map((proj) => (
          <li key={proj.slug}>
            <Link href={`/work/${proj.slug}`}>{proj.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
