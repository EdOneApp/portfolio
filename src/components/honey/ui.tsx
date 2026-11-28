import Link from "next/link";

export function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg
      className="h-arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M8 6h10v10" : "M4 12h16M13 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-mark ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path
        d="M50 4c4 26 20 42 46 46-26 4-42 20-46 46-4-26-20-42-46-46C30 46 46 30 50 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`h-eyebrow ${light ? "is-light" : ""}`}>
      <Mark />
      {children}
    </p>
  );
}

export function Btn({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "light" | "gold";
  external?: boolean;
}) {
  const cls = `h-btn is-${variant}`;
  const inner = (
    <>
      <span className="h-btn-label" data-text={typeof children === "string" ? children : undefined}>
        {children}
      </span>
      <span className="h-btn-icon">
        <Arrow />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  em,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  em?: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`h-section-head ${light ? "is-light" : ""}`} data-reveal>
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2>
          {title}
          {em && (
            <>
              {" "}
              <em>{em}</em>
            </>
          )}
        </h2>
      </div>
      {children && <div className="h-section-aside">{children}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  em,
  children,
  index,
}: {
  eyebrow: string;
  title: string;
  em?: string;
  children?: React.ReactNode;
  index?: string;
}) {
  return (
    <header className="h-page-hero">
      <div className="h-page-hero-glow" aria-hidden="true" />
      {index && (
        <span className="h-page-hero-index" aria-hidden="true">
          {index}
        </span>
      )}
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h1 className="h-split">
        <span>
          <span>{title}</span>
        </span>
        {em && (
          <span>
            <em>{em}</em>
          </span>
        )}
      </h1>
      {children && <div className="h-page-hero-body">{children}</div>}
    </header>
  );
}
