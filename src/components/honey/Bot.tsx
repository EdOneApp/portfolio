"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PixelBot from "./PixelBot";
import { answer, starterChips, whatsappLink, type BotReply } from "./bot-brain";

type Msg = { from: "bot" | "me"; reply: BotReply };

const greeting: BotReply = {
  text: "Bonjour ! Je suis Pixel, l’assistant de Daniel. Je peux vous parler de ses services, de ses projets, vous aider à préparer un devis ou vous mettre en relation sur WhatsApp.",
  chips: starterChips,
};

const KEY = "honey-bot";

export default function Bot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", reply: greeting }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [teaser, setTeaser] = useState(false);
  const [topic, setTopic] = useState<string | undefined>();
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const restored = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem(KEY);
        if (saved) setMsgs(JSON.parse(saved));
      } catch {}
      restored.current = true;
    });
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY + "-teased") === "1";
    } catch {}
    const t = seen
      ? 0
      : window.setTimeout(() => {
          setTeaser(true);
          try {
            sessionStorage.setItem(KEY + "-teased", "1");
          } catch {}
        }, 9000);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (restored.current)
      try {
        sessionStorage.setItem(KEY, JSON.stringify(msgs.slice(-30)));
      } catch {}
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    const id = setTimeout(() => field.current?.focus(), 350);
    return () => {
      window.removeEventListener("keydown", key);
      clearTimeout(id);
    };
  }, [open]);

  function ask(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMsgs((m) => [...m, { from: "me", reply: { text: clean } }]);
    setInput("");
    setTyping(true);
    const reply = answer(clean);
    if (reply.topic) setTopic(reply.topic);
    window.setTimeout(
      () => {
        setTyping(false);
        setMsgs((m) => [...m, { from: "bot", reply }]);
      },
      450 + Math.min(900, reply.text.length * 6),
    );
  }

  function reset() {
    setMsgs([{ from: "bot", reply: greeting }]);
    setTopic(undefined);
  }

  const last = msgs[msgs.length - 1];

  return (
    <div className={`hb ${open ? "is-open" : ""}`}>
      {teaser && !open && (
        <button className="hb-teaser" onClick={() => setOpen(true)}>
          Une question ? <strong>Je suis là.</strong>
          <span
            role="button"
            aria-label="Masquer"
            onClick={(e) => {
              e.stopPropagation();
              setTeaser(false);
            }}
          >
            ✕
          </span>
        </button>
      )}
      <button
        className="hb-launcher"
        aria-expanded={open}
        aria-controls="hb-panel"
        aria-label={open ? "Fermer l’assistant" : "Discuter avec Pixel, l’assistant"}
        onClick={() => {
          setOpen(!open);
          setTeaser(false);
        }}
      >
        <PixelBot mood={open ? "happy" : "idle"} />
        <i aria-hidden="true" />
      </button>

      <section
        id="hb-panel"
        className="hb-panel"
        role="dialog"
        aria-label="Assistant Pixel"
        aria-hidden={!open}
        inert={!open}
      >
        <header className="hb-head">
          <div className="hb-avatar">
            <PixelBot mood={typing ? "talk" : "happy"} />
          </div>
          <div>
            <strong>Pixel</strong>
            <small>
              <i /> Assistant de Daniel · en ligne
            </small>
          </div>
          <button onClick={reset} aria-label="Recommencer la conversation" title="Recommencer">
            ↺
          </button>
          <button onClick={() => setOpen(false)} aria-label="Fermer">
            ✕
          </button>
        </header>

        <div className="hb-list" ref={list} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`hb-msg is-${m.from}`}>
              <p>{m.reply.text}</p>
              {m.reply.links && m.reply.links.length > 0 && (
                <div className="hb-links">
                  {m.reply.links.map((l) =>
                    l.external ? (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={l.href.includes("wa.me") ? "is-wa" : ""}
                      >
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>
                        {l.label} →
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="hb-msg is-bot hb-typing" aria-label="Pixel écrit">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        {!typing && last.from === "bot" && last.reply.chips && (
          <div className="hb-chips">
            {last.reply.chips.map((c) => (
              <button key={c} onClick={() => ask(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        <form
          className="hb-form"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question…"
            maxLength={300}
            aria-label="Votre question"
          />
          <button type="submit" aria-label="Envoyer" disabled={!input.trim()}>
            →
          </button>
        </form>
        <a className="hb-wa" href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.9-2.8-1.2-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
            />
          </svg>
          Parler directement à Daniel sur WhatsApp
        </a>
      </section>
    </div>
  );
}
