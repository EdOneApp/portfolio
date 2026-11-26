"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export default function MotionSystem() {
  const path = usePathname(),
    cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((e) => {
      e.classList.add("agency-will-reveal");
      observer.observe(e);
    });
    const fine = matchMedia("(pointer:fine)").matches;
    let raf = 0,
      px = -100,
      py = -100,
      mouseX = -100,
      mouseY = -100;
    const move = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const t = (e.target as HTMLElement).closest("a,button,[data-cursor]");
      if (cursor.current) {
        cursor.current.dataset.active = t ? "true" : "false";
        cursor.current.textContent =
          (e.target as HTMLElement)
            .closest("[data-cursor]")
            ?.getAttribute("data-cursor") || "";
      }
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      px += (mouseX - px) * 0.18;
      py += (mouseY - py) * 0.18;
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${px}px,${py}px,0)`;
    };
    if (fine) {
      window.addEventListener("pointermove", move, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      observer.disconnect();
      els.forEach((e) => e.classList.remove("agency-will-reveal"));
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [path]);
  return <div ref={cursor} className="agency-cursor" aria-hidden="true" />;
}
