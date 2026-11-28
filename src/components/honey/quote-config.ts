export type Option = { id: string; label: string; hint?: string };
export type Question = {
  id: string;
  label: string;
  kind: "single" | "multi";
  options: Option[];
};
export type ProjectType = {
  id: string;
  label: string;
  short: string;
  description: string;
  glyph: string;
  questions: Question[];
};

const yesNo = (id: string, label: string): Question => ({
  id,
  label,
  kind: "single",
  options: [
    { id: "oui", label: "Oui" },
    { id: "non", label: "Non" },
    { id: "nsp", label: "Je ne sais pas" },
  ],
});

export const projectTypes: ProjectType[] = [
  {
    id: "site",
    label: "Site web",
    short: "Site web",
    glyph: "◐",
    description: "Vitrine, e-commerce, landing page, portfolio ou refonte.",
    questions: [
      {
        id: "kind",
        label: "Quel type de site ?",
        kind: "single",
        options: [
          { id: "vitrine", label: "Site vitrine" },
          { id: "ecommerce", label: "Boutique en ligne" },
          { id: "landing", label: "Page de lancement" },
          { id: "portfolio", label: "Portfolio / CV" },
          { id: "media", label: "Blog / média" },
          { id: "refonte", label: "Refonte d’un site existant" },
        ],
      },
      {
        id: "pages",
        label: "Combien de pages environ ?",
        kind: "single",
        options: [
          { id: "1", label: "1 page" },
          { id: "2-5", label: "2 à 5" },
          { id: "6-15", label: "6 à 15" },
          { id: "16+", label: "16 et plus" },
          { id: "nsp", label: "À définir" },
        ],
      },
      {
        id: "features",
        label: "Fonctionnalités souhaitées",
        kind: "multi",
        options: [
          { id: "catalogue", label: "Catalogue produits" },
          { id: "paiement", label: "Paiement Mobile Money / carte" },
          { id: "whatsapp", label: "Commande ou devis WhatsApp" },
          { id: "rdv", label: "Prise de rendez-vous" },
          { id: "blog", label: "Actualités / blog" },
          { id: "multilingue", label: "Plusieurs langues" },
          { id: "carte", label: "Carte / points de vente" },
          { id: "espace", label: "Espace client" },
          { id: "3d", label: "Animations & effets 3D" },
          { id: "admin", label: "Back-office pour modifier le contenu" },
        ],
      },
      yesNo("domain", "Avez-vous déjà un nom de domaine ?"),
    ],
  },
  {
    id: "mobile",
    label: "Application mobile",
    short: "App mobile",
    glyph: "▯",
    description: "Android, iOS ou les deux, avec ou sans back-office.",
    questions: [
      {
        id: "platforms",
        label: "Sur quelles plateformes ?",
        kind: "single",
        options: [
          { id: "android", label: "Android" },
          { id: "ios", label: "iOS" },
          { id: "both", label: "Android et iOS" },
          { id: "nsp", label: "À conseiller" },
        ],
      },
      {
        id: "features",
        label: "Fonctionnalités clés",
        kind: "multi",
        options: [
          { id: "auth", label: "Comptes & connexion" },
          { id: "paiement", label: "Paiement Mobile Money" },
          { id: "geo", label: "Géolocalisation / carte" },
          { id: "notif", label: "Notifications" },
          { id: "chat", label: "Messagerie / chat" },
          { id: "offline", label: "Mode hors ligne" },
          { id: "media", label: "Photos / vidéos" },
          { id: "admin", label: "Tableau de bord web d’administration" },
        ],
      },
      yesNo("stores", "Publication sur les stores à prévoir ?"),
    ],
  },
  {
    id: "webapp",
    label: "Plateforme, SaaS ou logiciel web",
    short: "Plateforme web",
    glyph: "▦",
    description: "Un outil en ligne utilisé par vos clients ou vos équipes.",
    questions: [
      {
        id: "users",
        label: "Combien d’utilisateurs à terme ?",
        kind: "single",
        options: [
          { id: "<50", label: "Moins de 50" },
          { id: "50-500", label: "50 à 500" },
          { id: "500-5000", label: "500 à 5 000" },
          { id: "5000+", label: "Plus de 5 000" },
        ],
      },
      {
        id: "features",
        label: "Briques nécessaires",
        kind: "multi",
        options: [
          { id: "roles", label: "Rôles & permissions" },
          { id: "dashboard", label: "Tableaux de bord" },
          { id: "paiement", label: "Paiements / abonnements" },
          { id: "api", label: "API / intégrations" },
          { id: "exports", label: "Exports PDF / Excel" },
          { id: "notif", label: "Emails, SMS, notifications" },
          { id: "realtime", label: "Temps réel" },
          { id: "mobile", label: "Version mobile" },
        ],
      },
    ],
  },
  {
    id: "presence",
    label: "Présence en ligne",
    short: "Présence en ligne",
    glyph: "◎",
    description: "Être trouvé sur Google et inspirer confiance en ligne.",
    questions: [
      {
        id: "services",
        label: "Ce qui vous intéresse",
        kind: "multi",
        options: [
          { id: "gmb", label: "Fiche Google (Maps)" },
          { id: "seo", label: "Référencement local" },
          { id: "site", label: "Site professionnel simple" },
          { id: "avis", label: "Stratégie d’avis clients" },
          { id: "ads", label: "Publicité Google / Meta" },
          { id: "audit", label: "Audit de visibilité" },
        ],
      },
      yesNo("gmbExists", "Votre activité a-t-elle déjà une fiche Google ?"),
    ],
  },
  {
    id: "image",
    label: "Gestion d’image & identité",
    short: "Image de marque",
    glyph: "✦",
    description: "Logo, charte, visuels, shooting IA et vidéos.",
    questions: [
      {
        id: "services",
        label: "Livrables souhaités",
        kind: "multi",
        options: [
          { id: "logo", label: "Logo" },
          { id: "charte", label: "Charte graphique" },
          { id: "print", label: "Supports print (cartes, flyers)" },
          { id: "shooting", label: "Shooting photo IA" },
          { id: "video", label: "Vidéos courtes" },
          { id: "packaging", label: "Packaging" },
          { id: "personal", label: "Image personnelle / personal branding" },
        ],
      },
      {
        id: "stage",
        label: "Où en est votre identité ?",
        kind: "single",
        options: [
          { id: "none", label: "Tout est à créer" },
          { id: "refresh", label: "À moderniser" },
          { id: "extend", label: "Existe, à décliner" },
        ],
      },
    ],
  },
  {
    id: "pages",
    label: "Gestion de pages & réseaux",
    short: "Réseaux sociaux",
    glyph: "◈",
    description: "Animation, contenus et croissance de vos pages.",
    questions: [
      {
        id: "networks",
        label: "Réseaux concernés",
        kind: "multi",
        options: [
          { id: "facebook", label: "Facebook" },
          { id: "instagram", label: "Instagram" },
          { id: "tiktok", label: "TikTok" },
          { id: "linkedin", label: "LinkedIn" },
          { id: "youtube", label: "YouTube" },
          { id: "whatsapp", label: "WhatsApp Business" },
        ],
      },
      {
        id: "rhythm",
        label: "Rythme de publication",
        kind: "single",
        options: [
          { id: "2-3", label: "2 à 3 par semaine" },
          { id: "4-6", label: "4 à 6 par semaine" },
          { id: "daily", label: "Quotidien" },
          { id: "nsp", label: "À conseiller" },
        ],
      },
      {
        id: "services",
        label: "Accompagnement",
        kind: "multi",
        options: [
          { id: "creation", label: "Création des contenus" },
          { id: "cm", label: "Community management" },
          { id: "ads", label: "Campagnes sponsorisées" },
          { id: "report", label: "Rapport mensuel" },
          { id: "setup", label: "Création / optimisation des pages" },
        ],
      },
    ],
  },
  {
    id: "data",
    label: "Analyse de données",
    short: "Data & BI",
    glyph: "◭",
    description: "Tableaux de bord, rapports, nettoyage et prédiction.",
    questions: [
      {
        id: "sources",
        label: "Vos données sont dans…",
        kind: "multi",
        options: [
          { id: "excel", label: "Excel / Google Sheets" },
          { id: "sql", label: "Base de données" },
          { id: "forms", label: "Formulaires / enquêtes (Kobo…)" },
          { id: "api", label: "Une API / un logiciel" },
          { id: "paper", label: "Papier, à numériser" },
        ],
      },
      {
        id: "outputs",
        label: "Résultats attendus",
        kind: "multi",
        options: [
          { id: "dashboard", label: "Tableau de bord interactif" },
          { id: "report", label: "Rapport d’analyse" },
          { id: "clean", label: "Nettoyage & structuration" },
          { id: "ml", label: "Prédiction / machine learning" },
          { id: "auto", label: "Automatisation des rapports" },
          { id: "db", label: "Conception de base de données" },
        ],
      },
    ],
  },
  {
    id: "system",
    label: "Système sur mesure, ERP ou API",
    short: "Sur mesure",
    glyph: "⬡",
    description: "Gestion interne, intégrations, automatisations, backend.",
    questions: [
      {
        id: "domain",
        label: "Domaine à couvrir",
        kind: "multi",
        options: [
          { id: "stock", label: "Stocks & ventes" },
          { id: "rh", label: "RH & présences" },
          { id: "school", label: "Scolarité / éducation" },
          { id: "finance", label: "Facturation & finance" },
          { id: "crm", label: "Clients / CRM" },
          { id: "logistique", label: "Logistique / livraison" },
          { id: "other", label: "Autre métier" },
        ],
      },
      {
        id: "integrations",
        label: "Intégrations",
        kind: "multi",
        options: [
          { id: "momo", label: "Mobile Money (Wave, Orange, MTN…)" },
          { id: "sms", label: "SMS / WhatsApp" },
          { id: "existing", label: "Logiciel existant" },
          { id: "iot", label: "Matériel / IoT / biométrie" },
        ],
      },
    ],
  },
  {
    id: "other",
    label: "Autre chose",
    short: "Autre",
    glyph: "?",
    description: "Une idée encore floue ? On la clarifie ensemble.",
    questions: [],
  },
];

export const clientKinds: Option[] = [
  { id: "personnel", label: "Projet personnel", hint: "Artiste, freelance, CV, créateur" },
  { id: "entreprise", label: "Entreprise / PME", hint: "Commerce, services, industrie" },
  { id: "startup", label: "Startup", hint: "Produit en lancement" },
  { id: "institution", label: "Institution", hint: "Ministère, administration, agence" },
  { id: "ong", label: "ONG / association", hint: "Projet social ou communautaire" },
  { id: "ecole", label: "École / formation", hint: "Établissement, centre" },
];

export const budgets: Option[] = [
  { id: "<300k", label: "Moins de 300 000 FCFA" },
  { id: "300-750k", label: "300 000 – 750 000 FCFA" },
  { id: "750k-1.5M", label: "750 000 – 1,5 M FCFA" },
  { id: "1.5-3M", label: "1,5 – 3 M FCFA" },
  { id: "3-7M", label: "3 – 7 M FCFA" },
  { id: ">7M", label: "Plus de 7 M FCFA" },
  { id: "nsp", label: "À définir ensemble" },
];

export const timelines: Option[] = [
  { id: "urgent", label: "Urgent", hint: "moins de 2 semaines" },
  { id: "1m", label: "Sous 1 mois" },
  { id: "2-3m", label: "2 à 3 mois" },
  { id: "flex", label: "Flexible" },
];

export const assets: Option[] = [
  { id: "logo", label: "Logo" },
  { id: "charte", label: "Charte graphique" },
  { id: "textes", label: "Textes / contenus" },
  { id: "photos", label: "Photos / vidéos" },
  { id: "domaine", label: "Nom de domaine" },
  { id: "hebergement", label: "Hébergement" },
  { id: "maquettes", label: "Maquettes / cahier des charges" },
];

export const channels: Option[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "appel", label: "Appel" },
  { id: "email", label: "Email" },
  { id: "visio", label: "Visio" },
];
