import { projects, profile, awards, journey } from "@/data/content";
import { services } from "./services-data";

export type BotLink = { label: string; href: string; external?: boolean };
export type BotReply = {
  text: string;
  links?: BotLink[];
  chips?: string[];
  topic?: string;
};

export const starterChips = [
  "Vos services",
  "Voir les projets",
  "Demander un devis",
  "Tarifs & délais",
  "Parler sur WhatsApp",
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ");

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

const wa = (topic?: string): BotLink => ({
  label: "Continuer sur WhatsApp",
  href: whatsappLink(topic),
  external: true,
});

export function whatsappLink(topic?: string) {
  const text = topic
    ? `Bonjour Daniel, je viens de votre portfolio. Je souhaite échanger au sujet de : ${topic}.`
    : "Bonjour Daniel, je viens de votre portfolio et j’aimerais échanger avec vous.";
  return `${profile.whatsappHref}?text=${encodeURIComponent(text)}`;
}

const serviceIntents: { keys: string[]; type: string }[] = [
  { keys: ["site", "vitrine", "web", "landing", "e commerce", "ecommerce", "boutique", "refonte"], type: "site" },
  { keys: ["mobile", "android", "ios", "appli", "application", "flutter"], type: "mobile" },
  { keys: ["saas", "plateforme", "logiciel", "dashboard"], type: "webapp" },
  { keys: ["google", "seo", "referencement", "visibilite", "presence", "maps"], type: "presence" },
  { keys: ["logo", "charte", "identite", "image de marque", "branding", "shooting", "visuel", "video"], type: "image" },
  { keys: ["facebook", "instagram", "tiktok", "linkedin", "reseau", "community", "page", "publication"], type: "pages" },
  { keys: ["data", "donnee", "analyse", "power bi", "tableau de bord", "statistique", "excel", "machine learning"], type: "data" },
  { keys: ["erp", "sur mesure", "api", "backend", "stock", "rh ", "gestion", "automatis"], type: "system" },
];

export function answer(raw: string): BotReply {
  const q = ` ${norm(raw)} `;

  if (has(q, ["whatsapp", "humain", "parler a daniel", "appeler", "telephone", "numero", "joindre"]))
    return {
      text: `Avec plaisir. Daniel répond directement sur WhatsApp au ${profile.phone}. Le bouton ci-dessous ouvre la conversation avec un message déjà prêt.`,
      links: [wa(), { label: "Réserver un appel de 30 min", href: "/contact#rendezvous" }],
      topic: "contact",
    };

  if (has(q, [" devis", "estimation", "proposition", "cahier des charges"]))
    return {
      text: "L’espace devis vous guide en 6 étapes : type de projet, profil, détails, budget et délais, coordonnées. À la fin, vous validez et la demande complète part sur le WhatsApp de Daniel.",
      links: [{ label: "Commencer mon devis", href: "/devis" }, wa("une demande de devis")],
      chips: ["Tarifs & délais", "Vos services"],
      topic: "devis",
    };

  if (has(q, ["prix", "tarif", "cout", "combien", "budget", "cher", "fcfa", "delai", "temps", "duree"]))
    return {
      text: "Chaque projet est chiffré sur mesure, selon les fonctionnalités, le nombre de pages ou d’écrans et les délais. Pour avoir une idée précise, le plus simple est de remplir le devis : il ne prend que quelques minutes, et vous pouvez indiquer une fourchette de budget en FCFA. Daniel vous répond avec une proposition claire.",
      links: [{ label: "Estimer mon projet", href: "/devis" }, wa("les tarifs et délais")],
      chips: ["Vos services", "Voir les projets"],
      topic: "tarifs",
    };

  for (const intent of serviceIntents) {
    if (has(q, intent.keys)) {
      const s = services.find((x) => x.type === intent.type)!;
      const related = projects
        .filter((p) => p.tags.some((t) => intent.keys.some((k) => norm(t).includes(k.trim()))))
        .slice(0, 3);
      return {
        text: `${s.title}, ${s.em} ${s.text}`,
        links: [
          { label: `Devis : ${s.title.toLowerCase()}`, href: `/devis?type=${s.type}` },
          ...related.map((p) => ({ label: `Exemple : ${p.title}`, href: `/work/${p.slug}` })),
        ],
        chips: ["Tarifs & délais", "Parler sur WhatsApp"],
        topic: s.title,
      };
    }
  }

  const stop = ["ivoire", "maison", "sportif"];
  const project = projects.find((p) => {
    const t = norm(p.title).trim();
    const first = t.split(" ")[0];
    return (
      q.includes(` ${t} `) ||
      q.includes(` ${norm(p.slug)} `) ||
      (first.length >= 5 && !stop.includes(first) && q.includes(` ${first} `))
    );
  });
  if (project)
    return {
      text: `${project.title} : ${project.category}. ${project.description.split(". ").slice(0, 2).join(". ")}.`,
      links: [
        { label: `Voir la fiche ${project.title}`, href: `/work/${project.slug}` },
        ...(project.link ? [{ label: "Ouvrir le site", href: project.link, external: true }] : []),
      ],
      chips: ["Voir les projets", "Demander un devis"],
      topic: project.title,
    };

  if (has(q, ["projet", "realisation", "portfolio", "exemple", "reference", "travaux"]))
    return {
      text: `Daniel présente ${projects.length} projets : sites immersifs en 3D, boutiques en ligne, applications, plateformes métier et data. Quelques incontournables :`,
      links: [
        ...projects.slice(0, 5).map((p) => ({ label: p.title, href: `/work/${p.slug}` })),
        { label: "Tous les projets", href: "/work" },
      ],
      chips: ["Demander un devis", "Vos services"],
      topic: "les projets",
    };

  if (has(q, ["service", "offre", "faites", "proposez", "competence", "aide"]))
    return {
      text: "Daniel accompagne particuliers, entreprises et institutions sur huit expertises. Choisissez celle qui vous intéresse :",
      chips: ["Site web", "Application mobile", "Présence Google", "Réseaux sociaux", "Image de marque", "Analyse de données", "Système sur mesure"],
      links: [{ label: "Tous les services", href: "/services" }],
      topic: "les services",
    };

  if (has(q, ["parcours", "experience", "cv", "qui est", "daniel", "formation", "diplome", "award", "distinction"]))
    return {
      text: `Daniel Guedegbe est ingénieur logiciel full stack, basé à Abidjan, avec plus de six ans d’expérience. Aujourd’hui : ${journey.find((j) => j.current)?.role} (${journey.find((j) => j.current)?.place}). Distinctions : ${awards.map((a) => a.title).join(" ; ")}.`,
      links: [{ label: "Le parcours complet", href: "/parcours" }, { label: "À propos", href: "/about" }],
      chips: ["Voir les projets", "Parler sur WhatsApp"],
      topic: "le parcours",
    };

  if (has(q, [" ou etes", " ou se trouve", "adresse", "abidjan", "localisation", "pays", "distance", "remote", "etranger"]))
    return {
      text: "Daniel est basé à Abidjan, en Côte d’Ivoire, et travaille aussi à distance pour des clients partout ailleurs. Les échanges se font sur WhatsApp, en visio ou en rendez-vous.",
      links: [{ label: "Réserver un créneau", href: "/contact#rendezvous" }, wa()],
      topic: "un rendez-vous",
    };

  if (has(q, ["rendez", "rdv", "appel", "visio", "calendrier", "reunion", "disponib"]))
    return {
      text: "Vous pouvez réserver directement un appel de 30 minutes dans le calendrier de Daniel.",
      links: [{ label: "Ouvrir le calendrier", href: "/contact#rendezvous" }, wa("un rendez-vous")],
      topic: "un rendez-vous",
    };

  if (has(q, ["bonjour", "salut", "bonsoir", "hello", "hey", "coucou", "yo "]))
    return {
      text: "Bonjour ! Je suis Pixel, l’assistant de Daniel. Je peux vous présenter ses services, ses projets ou vous guider vers un devis. Que cherchez-vous ?",
      chips: starterChips,
    };

  if (has(q, ["merci", "super", "parfait", "top", "genial", "ok "]))
    return {
      text: "Avec plaisir ! Si vous voulez aller plus loin, Daniel peut vous répondre directement sur WhatsApp.",
      links: [wa()],
      chips: ["Demander un devis", "Voir les projets"],
    };

  return {
    text: "Je ne suis qu’un petit robot, je n’ai pas toutes les réponses. Daniel, lui, les a : écrivez-lui sur WhatsApp, votre question sera reprise dans le message.",
    links: [{ label: "Poser ma question à Daniel", href: whatsappLink(`ma question : « ${raw.slice(0, 300)} »`), external: true }],
    chips: starterChips.slice(0, 3),
  };
}
