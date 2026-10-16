"use client";

import { motion } from "motion/react";
import { profile } from "@/data/content";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={profile.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label="Écrire sur WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 2.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.33-1.93 1.4-.5.07-1.1.1-1.77-.11a16.3 16.3 0 0 1-1.57-.58c-2.76-1.19-4.56-3.98-4.7-4.17-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.29.24-.27.53-.34.71-.34h.5c.16 0 .38-.06.59.45.24.57.81 1.98.88 2.12.07.14.12.3.02.49-.1.19-.15.3-.3.47-.14.16-.3.37-.43.49-.14.14-.29.3-.12.58.16.28.73 1.2 1.56 1.95 1.08.96 1.99 1.25 2.27 1.4.28.14.44.12.6-.07.17-.19.72-.84.91-1.13.19-.28.38-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
      </svg>
    </motion.a>
  );
}
