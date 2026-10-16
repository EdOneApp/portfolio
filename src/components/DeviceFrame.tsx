"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./DeviceFrame.module.css";

export type DeviceVariant = "laptop" | "laptop-compact" | "tablet" | "phone";

const VARIANTS: Record<
  DeviceVariant,
  {
    frameSrc: string;
    frameAspect: number;
    screenWidthPct: number;
    screenTopPct: number;
    screenAspect: number;
    radius?: string;
  }
> = {
  laptop: {
    frameSrc: "/images/devices/device-macpro-higher.png",
    frameAspect: 1 / 0.855,
    screenWidthPct: 98.8,
    screenTopPct: 37,
    screenAspect: 1 / 0.625,
  },
  "laptop-compact": {
    frameSrc: "/images/devices/device-mbp-16-lower.png",
    frameAspect: 1 / 0.568,
    screenWidthPct: 79.5,
    screenTopPct: 45.3,
    screenAspect: 1 / 0.625,
  },
  tablet: {
    frameSrc: "/images/devices/device-ipad-pro-lower.png",
    frameAspect: 1 / 0.637,
    screenWidthPct: 97,
    screenTopPct: 50,
    screenAspect: 1 / 0.625,
    radius: "2.5% / 4%",
  },
  phone: {
    frameSrc: "/images/devices/device-iphone14.png",
    frameAspect: 1 / 2.02,
    screenWidthPct: 90.2,
    screenTopPct: 50,
    screenAspect: 1 / 2.16,
    radius: "10% / 5%",
  },
};

export default function DeviceFrame({
  variant,
  image,
  alt,
  priority = false,
}: {
  variant: DeviceVariant;
  image: string;
  alt: string;
  priority?: boolean;
}) {
  const cfg = VARIANTS[variant];

  return (
    <motion.div
      className={styles.wrap}
      style={{ aspectRatio: cfg.frameAspect }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={styles.screen}
        style={{
          width: `${cfg.screenWidthPct}%`,
          top: `${cfg.screenTopPct}%`,
          aspectRatio: cfg.screenAspect,
          borderRadius: cfg.radius ?? 0,
        }}
      >
        <Image src={image} alt={alt} width={1600} height={1000} priority={priority} />
      </div>
      <Image
        src={cfg.frameSrc}
        alt=""
        fill
        sizes="(max-width: 720px) 100vw, 50vw"
        className={styles.frame}
        priority={priority}
      />
    </motion.div>
  );
}
