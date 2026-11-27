"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/content";
import { Arrow, Label } from "./ui";
const available = [
  "ivoirebike",
  "babijus",
  "bantoo",
  "voltara",
  "ivolt",
  "myoctogone",
  "edone",
  "fne-ivoire",
  "timestrackers",
  "ma-resie",
  "pandatree",
  "allocar",
  "os-iris",
  "sentinelle-rh",
  "momofund",
  "cacaosat",
  "brvm-analytics",
];
export default function LivePreview({ project: p }: { project: Project }) {
  const section = useRef<HTMLElement>(null),
    frame = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ scale: 1, height: 660 });
  const [entered, setEntered] = useState(false),
    [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
      "desktop",
    ),
    [mode, setMode] = useState<"live" | "capture">(
      available.includes(p.slug) ? "live" : "capture",
    ),
    [loaded, setLoaded] = useState(false),
    [slow, setSlow] = useState(false),
    [version, setVersion] = useState(0);
  const embeddable = Boolean(p.link && available.includes(p.slug));
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!entered || mode !== "live" || loaded) return;
    const timer = setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(timer);
  }, [entered, mode, version, loaded]);
  useEffect(() => {
    const el = frame.current;
    if (!el || mode !== "live") return;
    const target =
      viewport === "desktop" ? 1280 : viewport === "tablet" ? 768 : 390;
    const observer = new ResizeObserver(() => {
      const scale = Math.min(1, el.clientWidth / target);
      const height = Math.round(el.clientHeight / Math.max(0.1, scale));
      setDimensions((prev) =>
        prev.scale === scale && prev.height === height
          ? prev
          : { scale, height },
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewport, mode, entered]);
  return (
    <section ref={section} className="agency-live-section">
      <div className="agency-live-heading">
        <div>
          <Label>LE PROJET, EN CONDITIONS RÉELLES</Label>
          <h2>
            {embeddable ? "Entrez dans" : "Le projet,"}
            <br />
            <em>{embeddable ? "l’expérience." : "en images."}</em>
          </h2>
        </div>
        <p>
          {embeddable
            ? "Explorez le site directement ici. Changez de format, faites défiler et découvrez le projet à votre rythme."
            : "Une vue du projet, avec son interface et ses détails. Le lien d’origine reste accessible lorsqu’il est disponible."}
        </p>
      </div>
      <div className="agency-preview-toolbar">
        <div className="agency-preview-tabs">
          <button
            aria-pressed={mode === "capture"}
            onClick={() => setMode("capture")}
          >
            Les captures
          </button>
          {embeddable && (
            <button
              aria-pressed={mode === "live"}
              onClick={() => {
                setLoaded(false);
                setSlow(false);
                setMode("live");
              }}
            >
              Le site en direct <i />
            </button>
          )}
        </div>
        <div
          className="agency-preview-viewports"
          aria-label="Taille de l’aperçu"
        >
          {(["desktop", "tablet", "mobile"] as const).map((v, i) => (
            <button
              key={v}
              aria-pressed={viewport === v}
              onClick={() => setViewport(v)}
              aria-label={
                ["Aperçu ordinateur", "Aperçu tablette", "Aperçu mobile"][i]
              }
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                {v === "desktop" ? (
                  <>
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                    />
                    <path d="M8 21h8m-4-4v4" stroke="currentColor" />
                  </>
                ) : (
                  <rect
                    x={v === "mobile" ? 6 : 4}
                    y="2"
                    width={v === "mobile" ? 12 : 16}
                    height="20"
                    rx="2"
                    stroke="currentColor"
                  />
                )}
              </svg>
            </button>
          ))}
        </div>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="agency-preview-external"
          >
            {p.link.includes("github.com") ? "Le dépôt" : "Ouvrir le site"}
            <Arrow />
          </a>
        )}
      </div>
      <div className="agency-preview-stage">
        <div className={`agency-preview-device is-${viewport}`}>
          <div className="agency-browser-chrome">
            <i />
            <i />
            <i />
            <span>{p.link ? new URL(p.link).hostname : p.title}</span>
            {embeddable && mode === "live" && (
              <button
                onClick={() => {
                  setLoaded(false);
                  setSlow(false);
                  setVersion(version + 1);
                }}
                aria-label="Recharger l’aperçu"
              >
                ↻
              </button>
            )}
          </div>
          {mode === "live" && embeddable ? (
            <div className="agency-frame-wrap" ref={frame}>
              {entered && (
                <iframe
                  style={{
                    width:
                      viewport === "desktop"
                        ? 1280
                        : viewport === "tablet"
                          ? 768
                          : 390,
                    height: dimensions.height,
                    transform: `scale(${dimensions.scale})`,
                    transformOrigin: "top left",
                  }}
                  key={version}
                  src={p.link}
                  title={`Explorer le site ${p.title}`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => {
                    setLoaded(true);
                    setSlow(false);
                  }}
                  allow="fullscreen"
                />
              )}
              {!loaded && (
                <div className="agency-frame-loading">
                  <span className="agency-loader-ring" />
                  <p>Le projet prend place…</p>
                </div>
              )}
            </div>
          ) : (
            <div className="agency-capture-wrap">
              {(viewport === "mobile" ? p.mobileImage || p.image : p.image) ? (
                <Image
                  src={
                    (viewport === "mobile"
                      ? p.mobileImage || p.image
                      : p.image)!
                  }
                  alt={`${p.title}, ${viewport === "mobile" ? "vue mobile" : "vue du projet"}`}
                  width={1600}
                  height={1000}
                  sizes="(max-width:767px) 92vw,90vw"
                />
              ) : (
                <div className="agency-preview-no-image">
                  <span>{p.title}</span>
                  <p>{p.category}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {mode === "live" && (
        <div className="agency-preview-help">
          <span>↕ Faites défiler à l’intérieur de l’aperçu.</span>
          <button onClick={() => setMode("capture")}>
            L’aperçu ne s’affiche pas ? Voir les captures.
          </button>
        </div>
      )}
      {slow && mode === "live" && !loaded && (
        <p className="agency-preview-slow" role="status">
          Le site met un peu de temps à répondre. Vous pouvez consulter les
          captures ou l’ouvrir dans un nouvel onglet.
        </p>
      )}
    </section>
  );
}
