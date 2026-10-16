"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";

const MotionLink = motion.create(Link);

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
  onClick?: () => void;
};

export default function MagneticLink({
  href,
  children,
  className,
  strength = 24,
  external = false,
  onClick,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <MotionLink
      href={href}
      ref={ref}
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </MotionLink>
  );
}
