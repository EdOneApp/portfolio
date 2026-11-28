import { journey, degrees, certifications, awards, skillCategories } from "@/data/content";
import { Eyebrow, Mark, SectionHead } from "./ui";

export function ExperienceSection() {
  const items = [...journey].reverse();
  return (
    <section className="h-section h-timeline" id="experience">
      <SectionHead eyebrow="Expérience" title="Du code mobile" em="à la direction technique." />
      <ol className="h-tl">
        {items.map((j, i) => (
          <li key={j.period} className={j.current ? "is-current" : ""} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
            <span className="h-tl-node" aria-hidden="true">
              <Mark />
            </span>
            <div className="h-tl-card" data-tilt="4">
              <small>{j.period}</small>
              <h3>{j.role}</h3>
              <p className="h-tl-place">{j.place}</p>
              <p>{j.description}</p>
              {j.current && <span className="h-tl-badge">Poste actuel</span>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="h-section h-education" id="formation">
      <SectionHead eyebrow="Formation" title="Apprendre," em="sans jamais s’arrêter." />
      <div className="h-edu-grid">
        {degrees.map((d, i) => (
          <article key={d.title} data-reveal data-tilt="6" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
            <span>{d.year}</span>
            <h3>{d.title}</h3>
            <p>{d.place}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CertificationSection() {
  return (
    <section className="h-section h-certs" id="certifications">
      <SectionHead light eyebrow="Distinctions & certifications" title="Quelques repères" em="sur le chemin." />
      <div className="h-award-list">
        {awards.map((a) => (
          <article key={a.title} data-reveal>
            <span className="h-award-status">{a.status}</span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
            <small>{a.date}</small>
          </article>
        ))}
      </div>
      <ul className="h-cert-list">
        {certifications.map((c) => (
          <li key={c.title} data-reveal>
            <strong>{c.title}</strong>
            <span>{c.issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="h-section h-skills" id="competences">
      <Eyebrow>Compétences</Eyebrow>
      <div className="h-skill-grid">
        {skillCategories.map((c) => (
          <div key={c.title} data-reveal>
            <h3>{c.title}</h3>
            <ul>
              {c.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
