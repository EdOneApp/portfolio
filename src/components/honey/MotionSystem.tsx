"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MotionSystem() {
  const path = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let observer: IntersectionObserver | null = null;
    if (!reduced) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              observer?.unobserve(e.target);
            }
          }),
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      els.forEach((e) => {
        e.classList.add("h-will-reveal");
        observer?.observe(e);
      });
    }

    const noZoom = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", noZoom);
    document.addEventListener("gesturechange", noZoom);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((n) => {
        const r = n.getBoundingClientRect();
        const speed = Number(n.dataset.parallax) || 0.15;
        const off = (r.top + r.height / 2 - innerHeight / 2) * -speed;
        n.style.setProperty("--py", `${off.toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = matchMedia("(pointer:fine)").matches;
    let raf = 0,
      px = -100,
      py = -100,
      mx = -100,
      my = -100;
    let tilted: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement;
      const label = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursor.current) {
        cursor.current.dataset.active = target.closest("a,button,[data-cursor],label,select")
          ? "true"
          : "false";
        cursor.current.dataset.label = label ? "true" : "false";
        cursor.current.querySelector("span")!.textContent = label || "";
      }
      if (reduced) return;
      const t = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== t) {
        tilted.style.setProperty("--rx", "0deg");
        tilted.style.setProperty("--ry", "0deg");
      }
      tilted = t;
      if (t) {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const k = Number(t.dataset.tilt) || 8;
        t.style.setProperty("--rx", `${(-y * k).toFixed(2)}deg`);
        t.style.setProperty("--ry", `${(x * k).toFixed(2)}deg`);
        t.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        t.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      }
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      px += (mx - px) * 0.2;
      py += (my - py) * 0.2;
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${px}px,${py}px,0)`;
    };
    if (fine) {
      window.addEventListener("pointermove", move, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      observer?.disconnect();
      els.forEach((e) => e.classList.remove("h-will-reveal"));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("gesturestart", noZoom);
      document.removeEventListener("gesturechange", noZoom);
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [path]);

  return (
    <>
      <div className="h-progress" aria-hidden="true">
        <i ref={progress} />
      </div>
      <div ref={cursor} className="h-cursor" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
