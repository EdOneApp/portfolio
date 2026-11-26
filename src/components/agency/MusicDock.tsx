"use client";
import { useEffect, useRef, useState } from "react";
const SRC = "/Damso%20-%20Sentimental%20(Paroles).mp3";
export default function MusicDock() {
  const wantsSound = useRef(true);
  const audio = useRef<HTMLAudioElement>(null),
    [playing, setPlaying] = useState(false),
    [expanded, setExpanded] = useState(false),
    [volume, setVolume] = useState(0.18),
    [failed, setFailed] = useState(false),
    [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = 0.18;
    let preferredOff = false;
    try {
      preferredOff = localStorage.getItem("agency-sound") === "off";
    } catch {}
    wantsSound.current = !preferredOff;
    let remove = () => {};
    const start = () => {
      if (!wantsSound.current) return;
      el.play()
        .then(() => {
          setBlocked(false);
          remove();
        })
        .catch(() => setBlocked(true));
    };
    const gesture = (event: Event) => {
      if ((event.target as HTMLElement)?.closest?.(".agency-music")) return;
      if (el.paused) start();
    };
    remove = () => {
      window.removeEventListener("pointerdown", gesture);
      window.removeEventListener("keydown", gesture);
    };
    if (!preferredOff) {
      start();
      window.addEventListener("pointerdown", gesture, { passive: true });
      window.addEventListener("keydown", gesture);
    }
    return () => remove();
  }, []);
  function toggle() {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      wantsSound.current = true;
      try {
        localStorage.setItem("agency-sound", "on");
      } catch {}
      el.play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    } else {
      wantsSound.current = false;
      el.pause();
      try {
        localStorage.setItem("agency-sound", "off");
      } catch {}
    }
  }
  return (
    <div className={`agency-music ${playing ? "is-playing" : ""}`}>
      <audio
        ref={audio}
        src={SRC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button
        className="agency-music-toggle"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Couper la musique" : "Activer la musique"}
        disabled={failed}
      >
        <span className="agency-equalizer" aria-hidden="true">
          {[1, 2, 3, 4].map((n) => (
            <i key={n} />
          ))}
        </span>
        <span>
          {failed
            ? "SON INDISPONIBLE"
            : playing
              ? "SON ACTIVÉ"
              : blocked
                ? "ACTIVER LE SON"
                : "SON DÉSACTIVÉ"}
        </span>
      </button>
      <button
        className="agency-music-more"
        aria-label="Réglages de la musique"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        ⌃
      </button>
      {expanded && (
        <div className="agency-music-panel">
          <strong>Sentimental</strong>
          <small>Damso</small>
          <label>
            Volume
            <input
              aria-label="Volume de la musique"
              type="range"
              min="0"
              max="0.5"
              step=".01"
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (audio.current) audio.current.volume = v;
              }}
            />
          </label>
          <p>
            {blocked
              ? "Le navigateur attend un clic pour activer le son."
              : "Le choix marche/arrêt est conservé sur cet appareil."}
          </p>
        </div>
      )}
    </div>
  );
}
