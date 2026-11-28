"use client";
import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <>
      <motion.div
        className="h-curtain"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      >
        <span>Daniel Guedegbe</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 4 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        style={{ transformPerspective: 1400, transformOrigin: "50% 0%" }}
        onAnimationComplete={() => {
          const el = document.querySelector<HTMLElement>(".h-page-shell");
          if (el) el.style.transform = "none";
        }}
        className="h-page-shell"
      >
        {children}
      </motion.div>
    </>
  );
}
