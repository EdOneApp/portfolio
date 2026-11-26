import Link from "next/link";
export function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16M13 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`agency-asterisk ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="15">
        <path d="M50 2v96M2 50h96M16 16l68 68M16 84l68-68" />
      </g>
    </svg>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="agency-label">
      <span />
      {children}
    </p>
  );
}
export function Pill({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`agency-pill ${light ? "is-light" : ""}`}
      data-magnetic
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  em,
  children,
}: {
  eyebrow: string;
  title: string;
  em?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="agency-section-heading" data-reveal>
      <div>
        <Label>{eyebrow}</Label>
        <h2>
          {title}
          {em && (
            <>
              <br />
              <em>{em}</em>
            </>
          )}
        </h2>
      </div>
      {children}
    </div>
  );
}
