"use client";
import { useEffect, useRef } from "react";
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.textContent = `0${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        node.textContent = `${Math.round((1 - Math.pow(1 - t, 3)) * to)}${suffix}`;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      node.textContent = `${to}${suffix}`;
    };
  }, [to, suffix]);
  return (
    <span ref={el}>
      {to}
      {suffix}
    </span>
  );
}
