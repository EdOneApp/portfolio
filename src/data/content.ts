export const profile = {
  firstName: "Daniel",
  lastName: "Guedegbe",
  fullName: "Daniel Guedegbe",
  legalName: "Jean-Marie Daniel Vianney Guedegbe",
  role: "Ingénieur Logiciel Full Stack Senior",
  location: "Abidjan, Côte d'Ivoire",
  availability: "Disponible remote / hybride / relocalisation",
  availabilityBadge: "Disponible remote · Abidjan",
  phone: "+225 07 48 73 33 65",
  phoneHref: "tel:+2250748733365",
  whatsappHref: "https://wa.me/2250748733365",
  email: "danielguedegbe10027@gmail.com",
  linkedin: "https://www.linkedin.com/in/daniel-guedegbe/",
  linkedinHandle: "daniel-guedegbe",
  github: "https://github.com/daniel10027",
  githubHandle: "daniel10027",
  cv: "https://drive.google.com/file/d/1wmdBI65t16h6F3Z9gx1WjW9Bhe41qCjS/view?usp=sharing",
  calLink: "jean-marie-daniel-vianney-guedegbe-qfjxgu/30min",
  calUrl: "https://cal.com/jean-marie-daniel-vianney-guedegbe-qfjxgu/30min",
  seoTitle: "Daniel Guedegbe — Ingénieur Logiciel Full Stack Senior",
  seoDescription:
    "Daniel Guedegbe, ingénieur logiciel full stack senior basé à Abidjan. Architectures backend Django/DRF, applications Flutter et infrastructure pour des plateformes fintech, ERP et produits SaaS en production.",
  ogDescription:
    "Architectures backend solides, applications mobiles et infrastructure en production. 16+ projets livrés, 6+ ans d'expérience, Abidjan — remote.",
};

export const hero = {
  title: "Des fondations logicielles qui tiennent leurs promesses.",
  bio: "Je m'appelle Daniel Guedegbe. Depuis Abidjan, je conçois des architectures backend Python/Django, des APIs critiques et des applications Flutter pour des plateformes fintech, des ERP et des produits SaaS aujourd'hui en production.",
  stats: [
    { value: "6+", label: "ans d'expérience en ingénierie logicielle" },
    { value: "16+", label: "projets livrés en production" },
    { value: "8+", label: "partenaires & clients" },
  ],
};

export const finalStats = [
  { value: "6+", label: "Années d'expérience" },
  { value: "16+", label: "Projets livrés" },
  { value: "8+", label: "Partenaires & clients" },
  { value: "3", label: "Distinctions / hackathons" },
];

export const manifesto = {
  label: "Le constat",
  text: "Un logiciel ne vaut que par sa capacité à durer, à évoluer et à servir longtemps après sa livraison. Alors j'ai choisi la rigueur : Clean Architecture, tests, documentation, et des systèmes que d'autres équipes peuvent reprendre sans moi.",
};

export const terrains = [
  {
    index: "01",
    title: "Backend & APIs",
    verb: "Concevoir",
    text: "Architectures Django, DRF et FastAPI : APIs sécurisées, documentées et pensées pour l'échelle, du prototype à la production.",
  },
  {
    index: "02",
    title: "Mobile & Web",
    verb: "Construire",
    text: "Applications Flutter multiplateformes et interfaces Next.js / Angular : géolocalisation, paiements, notifications temps réel.",
  },
  {
    index: "03",
    title: "Infrastructure",
    verb: "Déployer",
    text: "Conteneurisation Docker, pipelines CI/CD et automatisation Ansible, de la machine de développement à la production.",
  },
];

export const stack = [
  "Python",
  "Django",
  "FastAPI",
  "Flask",
  "Flutter",
  "Dart",
  "React",
  "Next.js",
  "Angular",
  "JavaScript",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Nginx",
  "GitLab",
  "GitHub",
  "Git",
  "Ansible",
  "DigitalOcean",
  "Firebase",
  "Odoo",
  "OpenCV",
  "Celery",
  "Postman",
  "PyCharm",
];

export type JourneyItem = {
  period: string;
  role: string;
  place: string;
  current?: boolean;
  description: string;
};

export const journey: JourneyItem[] = [
  {
    period: "2021 — 2022",
    role: "Développeur Mobile & Backend",
    place: "SIEFTP / Tropic BTP · Remote",
    description:
      "APIs Django/DRF et applications Flutter pour le suivi de chantier : géolocalisation, pointage et rapports automatisés.",
  },
  {
    period: "Mars 2022 — Avril 2023",
    role: "Développeur Backend Python/Django",
    place: "Saas Group · Remote",
    description:
      "Conception et développement de Sentinelle, plateforme RH de présence par RFID, QR codes et reconnaissance faciale, avec données live via Django Channels. Architecture de base de données pensée pour des clients entreprise à l'échelle.",
  },
  {
    period: "Juin 2020 — Mai 2025",
    role: "Lead Développeur Full Stack & Responsable IT",
    place: "IIPEA · Abidjan",
    description:
      "Direction du développement de MyIIPEA, ERP éducatif multiplateforme (web et mobile) couvrant 12+ modules : scolarité, inscriptions, emplois du temps, comptabilité, RH, infirmerie. Pilotage du cycle complet, de la spécification à la mise en production, encadrement d'une équipe technique.",
  },
  {
    period: "Juin 2025 — Octobre 2025",
    role: "Développeur Backend Python/Django — Mobilité Intelligente",
    place: "Illigo · Abidjan (Hybride)",
    description:
      "Backend modulaire en Clean Architecture (Django/DRF), intégré à une flotte IoT (stations, véhicules, chargeurs) via MQTT, REST et WebSocket. Implémentation du contrôle à distance des véhicules : verrouillage, suivi GPS, statut en temps réel.",
  },
  {
    period: "Sept. 2025 →",
    role: "Senior Python Developer",
    place: "Orange Liberia · Remote",
    description:
      "Architecture de microservices Python/Flask critiques pour un opérateur télécom majeur, APIs REST haute performance pour des intégrations financières inter-opérateurs. Optimisation de bases SQL Server et NoSQL, personnalisation de modules Odoo pour la facturation et le CRM, automatisation Ansible.",
  },
  {
    period: "Nov. 2025 → (poste actuel)",
    role: "Tech Lead — Applications & Digital Solutions",
    place: "Espoir Collectif · Paris (Hybride)",
    current: true,
    description:
      "Direction technique de programmes sociaux à fort impact, entre la France et l'Afrique. Définition des standards techniques, mentorat de l'équipe, stratégie produit et architecture.",
  },
];

export const aboutMission = {
  tagline: "Clean Architecture + Clean Code = Impact durable.",
  summary:
    "Je construis des plateformes robustes et performantes pour l'Afrique : backend Python/Django, applications Flutter et interfaces Next.js, avec une exigence constante de qualité et de documentation.",
  specialties: ["Énergie / IoT", "Éducation", "Agritech", "Fintech", "Données"],
};

export const skillCategories = [
  {
    title: "Langages",
    items: ["Python", "JavaScript (ES6+)", "TypeScript", "Dart", "SQL", "Bash"],
  },
  {
    title: "Frameworks & librairies",
    items: [
      "Django",
      "DRF",
      "FastAPI",
      "Flask",
      "Next.js",
      "Angular",
      "Flutter",
      "React",
    ],
  },
  {
    title: "Données & stockage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Redis"],
  },
  {
    title: "Infrastructure & DevOps",
    items: [
      "Docker",
      "Nginx",
      "Gunicorn",
      "DigitalOcean",
      "GitHub Actions",
      "GitLab CI/CD",
      "Ansible",
    ],
  },
  {
    title: "Temps réel & asynchrone",
    items: ["Celery", "Redis", "MQTT", "WebSockets", "Django Channels"],
  },
  {
    title: "Architecture & méthodes",
    items: [
      "Clean Architecture",
      "DDD",
      "Microservices",
      "REST",
      "TDD",
      "SCRUM",
    ],
  },
  {
    title: "Outils & spécialités",
    items: [
      "Postman",
      "VS Code",
      "PyCharm",
      "OpenCV",
      "Firebase",
      "Odoo",
      "RFID / Biométrie",
      "Git",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  image?: string;
  mobileImage?: string;
  award?: string;
  stats?: { value: string; label: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sixcordes",
    title: "Six Cordes",
    category: "Maison d’instruments · expérience web musicale",
    description:
      "Site de présentation d’une maison d’instruments à Abidjan : direction chaleureuse, cordes interactives et démonstrations sonores synthétisées avec Web Audio. Catalogue illustratif de 33 références, 45 pages, filtres par famille, niveau, marque et budget, galerie, atelier et sélection pour devis WhatsApp. Musique fournie en boucle, contrôle commun avec les instruments et respect de l’arrêt volontaire. Captures web et mobile, expérience responsive et déploiement GitHub Pages en HTTPS. Catalogue, prix et coordonnées de démonstration à confirmer.",
    tags: ["Next.js", "React", "GSAP", "Web Audio", "Framer Motion"],
    link: "https://sixcordes.myoctogone.com/",
    linkLabel: "Explorer Six Cordes",
    image: "/images/sixcordes-web.webp",
    mobileImage: "/images/sixcordes-mobile.webp",
    stats: [
      { value: "33", label: "Références illustratives" },
      { value: "45", label: "Pages de contenu" },
      { value: "Audio", label: "Cordes interactives" },
    ],
    featured: true,
  },
  {
    slug: "ivoirebike",
    title: "Ivoire Bike",
    category: "Concept de prospection · showroom moto immersif",
    description:
      "Concept de site de visibilité pour une entreprise ivoirienne de vente de motos. Refonte immersive fournie et intégrée sur la branche hard : roue de moto et emblème en 3D, vidéos, défilement fluide, transitions et catalogue filtrable. 21 motos et 8 équipements illustratifs, fiches détaillées, sélection pour devis WhatsApp, services atelier et cartes OpenStreetMap sans clé API. Musique fournie en boucle avec contrôle sonore et reprise au premier geste si la lecture automatique est bloquée. Prix, avis, chiffres et implantations secondaires sont des exemples à valider. Version responsive déployée sur GitHub Pages en HTTPS.",
    tags: ["Next.js", "React", "Three.js", "GSAP", "Framer Motion", "Leaflet"],
    link: "https://ivoirebike.myoctogone.com/",
    linkLabel: "Explorer Ivoire Bike",
    image: "/images/ivoirebike-web.webp",
    mobileImage: "/images/ivoirebike-mobile.webp",
    stats: [
      { value: "29", label: "Produits illustratifs" },
      { value: "3D", label: "Roue & emblème" },
      { value: "hard", label: "Branche déployée" },
    ],
    featured: true,
  },
  {
    slug: "cacaosat",
    title: "CacaoSat",
    category: "Agritech / Satellite & traçabilité",
    description:
      "Une expérience immersive de la traçabilité du cacao ivoirien : terrain 3D procédural, satellite en orbite, caméra au défilement et cartographie interactive. Vues agent, coopérative et exportateur, lots et rapport GeoJSON avec des données synthétiques clairement séparées de toute certification réelle.",
    tags: ["Next.js", "Three.js", "Leaflet", "GeoJSON", "Satellite"],
    link: "https://cacaosat.myoctogone.com/",
    linkLabel: "Explorer CacaoSat",
    image: "/images/cacaosat-web.webp",
    mobileImage: "/images/cacaosat-mobile.webp",
  },
  {
    slug: "babijus",
    title: "BABI JUS",
    category: "Site vitrine immersif & boissons ivoiriennes",
    description:
      "Création d’un univers de marque pour des jus ivoiriens : identité visuelle, packagings et site immersif de 33 pages. Catalogue de 24 saveurs avec recherche et filtres, bouteilles animées au défilement, ingrédients en spirale et vues 3D à 360°. Carte interactive de Côte d’Ivoire avec géolocalisation facultative et points de vente de démonstration clairement signalés. Interface responsive, contact WhatsApp et email, accessibilité et déploiement automatisé sur GitHub Pages avec domaine personnalisé en HTTPS.",
    tags: ["Next.js", "React", "TypeScript", "GSAP", "Three.js", "Leaflet"],
    link: "https://babijus.myoctogone.com/",
    linkLabel: "Découvrir BABI JUS",
    image: "/images/babijus-web.webp",
    mobileImage: "/images/babijus-mobile.webp",
    stats: [
      { value: "24", label: "Saveurs présentées" },
      { value: "33", label: "Pages statiques" },
      { value: "360°", label: "Vues produits en 3D" },
    ],
    featured: true,
  },
  {
    slug: "spaghetti-abidjan",
    title: "Spaghetti d'Abidjan",
    category: "E-commerce alimentaire",
    description:
      "Commande et livraison de plats ivoiriens authentiques. Catalogue dynamique par catégories, filtres par budget et profil, tunnel de commande fluide du choix du plat à la livraison.",
    tags: ["E-commerce", "Catalogue", "Panier & commande"],
    link: "https://spaguettidabidjan.com/",
    image: "/images/spaguetti_web.png",
    mobileImage: "/images/spaguetti_mobile.webp",
    featured: true,
  },
  {
    slug: "bantoo",
    title: "BanToo",
    category: "Pressing à domicile",
    description:
      "Plateforme de collecte, lavage, repassage et livraison de linge en 24h à Abidjan, via un réseau de pressings partenaires vérifiés. Suivi du coursier en temps réel, paiement Mobile Money (Wave, Orange Money, MTN MoMo, Moov Money) ou espèces, trois applications liées (client, coursier, pressing).",
    tags: ["Flutter", "Django", "Mobile Money", "Suivi temps réel"],
    link: "https://bantoo.myoctogone.com/",
    image: "/images/proj_bantoo.png",
    featured: true,
  },
  {
    slug: "fne-ivoire",
    title: "FNE Ivoire",
    category: "Facturation électronique",
    description:
      "Site de présentation Next.js de FNE Ivoire, une plateforme de gestion de la facturation électronique pour les entreprises ivoiriennes. Identité vert profond et citron, 25 pages de contenu, huit modules présentés, parcours PME, cabinets et groupes, guides sourcés et démonstration interactive de facture avec calculs et impression d’un exemple sans valeur fiscale. Interface responsive, contact WhatsApp et déploiement GitHub Pages sur domaine personnalisé.",
    tags: ["Next.js", "React", "TypeScript", "Design UI"],
    link: "https://fne.myoctogone.com/",
    linkLabel: "Découvrir FNE Ivoire",
    image: "/images/fne-web.webp",
    mobileImage: "/images/fne-mobile.webp",
    stats: [
      { value: "25", label: "Pages de présentation" },
      { value: "8", label: "Modules détaillés" },
      { value: "Web & mobile", label: "Expérience responsive" },
    ],
  },
  {
    slug: "brvm-analytics",
    title: "XOFA · BRVM Analytics",
    category: "Données financières",
    description:
      "Analyse des cours, volumes et indices des sociétés cotées à la Bourse Régionale des Valeurs Mobilières, sur huit pays de l'UEMOA. XOFA rassemble les données publiques du marché dans un tableau de bord accessible sur ordinateur et mobile.",
    tags: ["Django", "Redis", "REST API", "Fintech"],
    link: "https://xofa.myoctogone.com/",
    image: "/images/xofa-web.webp",
    mobileImage: "/images/xofa-mobile.webp",
  },
  {
    slug: "wave-business-api",
    title: "Wave Business API SDK",
    category: "Outillage open-source",
    description:
      "Kit de développement Python publié sur PyPI pour intégrer paiements, payouts et webhooks Wave Business en quelques lignes. Signature HMAC-SHA256 systématique, documentation complète et tests automatisés.",
    tags: ["Python", "PyPI", "HMAC-SHA256"],
    link: "https://github.com/daniel10027/wave-business-api",
    linkLabel: "Voir le dépôt",
    image: "/images/proj_wave.png",
  },
  {
    slug: "pandatree",
    title: "PandaTree",
    category: "Cartographie & SIG",
    description:
      "Projet de gestion, cartographie et reconnaissance du patrimoine végétal ivoirien, avec backend Django/DRF et usages mobiles Flutter décrits dans sa documentation. Site immersif Next.js de 25 pages : paysages forestiers, atlas pédagogique de six espèces avec références botaniques, carte Leaflet et douze emplacements fictifs filtrables, parcours de collecte et démonstration locale de prévisualisation de feuille. Design responsive, animations respectant la réduction des mouvements et déploiement GitHub Pages en HTTPS.",
    tags: ["Django", "Flutter", "Next.js", "Leaflet", "SIG"],
    link: "https://pandatree.myoctogone.com/",
    linkLabel: "Explorer PandaTree",
    image: "/images/pandatree-web.webp",
    mobileImage: "/images/pandatree-mobile.webp",
    stats: [
      { value: "25", label: "Pages de présentation" },
      { value: "6", label: "Fiches pédagogiques" },
      { value: "12", label: "Emplacements fictifs sur la carte" },
    ],
  },
  {
    slug: "edone",
    title: "Edone",
    category: "ERP éducatif",
    description:
      "Gestion complète du cycle académique, administratif et financier d'un établissement : inscriptions, emplois du temps, notes, facturation, communication. Déployé en pilote dans quatre établissements.",
    tags: ["Django", "Flutter", "PostgreSQL"],
    award: "🏆 1er Prix Moov Africa CI StartUp Challenge 2025",
    link: "https://edone.my/",
    linkLabel: "Découvrir Edone",
    image: "/images/edone-web-news.png",
    mobileImage: "/images/edone-mobile-news.png",
    featured: true,
  },
  {
    slug: "allocar",
    title: "AlloCar",
    category: "Mobilité & covoiturage",
    description:
      "Une expérience de mobilité pensée pour Abidjan : interfaces passager et conducteur, tableau de bord web, carte interactive et trois tracés routiers réels. La vitrine Next.js met en scène le projet Flutter, Angular et Flask avec un GIF original et une démonstration de trajets aux données fictives.",
    tags: ["Next.js", "Flutter", "Angular", "Flask", "Leaflet"],
    link: "https://allocar.myoctogone.com/",
    linkLabel: "Explorer AlloCar",
    image: "/images/allocar-web.webp",
    mobileImage: "/images/allocar-mobile.webp",
  },
  {
    slug: "sportif-africa",
    title: "Sportif Africa",
    category: "E-commerce sportif",
    description:
      "Boutique en ligne pour clubs, académies et athlètes de Côte d'Ivoire. Ventes flash avec compte à rebours, catalogue segmenté, paiement mobile sécurisé via Wave, livraison à Abidjan.",
    tags: ["E-commerce", "Ventes flash", "Paiement Wave"],
    link: "https://sportifafrica.com/",
    image: "/images/sportif.png",
    stats: [
      { value: "500+", label: "Clubs équipés" },
      { value: "12K+", label: "Produits livrés" },
      { value: "48h", label: "Livraison Abidjan" },
    ],
  },
  {
    slug: "voltara",
    title: "VOLTARA",
    category: "Mobilité électrique",
    description:
      "Plateforme intégrée de mobilité et d'énergie propre : vente et location de véhicules et motos électriques, recharge, swapping de batteries en moins de 2 minutes, VTC (VOLTARA Ride), livraison (VOLTARA Go), solaire et paiement échelonné (VOLTARA Pay) pour les entreprises et particuliers d'Afrique de l'Ouest.",
    tags: ["VTC", "Énergie / Recharge", "Paiement échelonné", "Multi-pays"],
    link: "https://voltara.myoctogone.com/",
    image: "/images/proj_voltara.jpg",
    featured: true,
  },
  {
    slug: "ivolt",
    title: "IVOLT",
    category: "Mobilité électrique",
    description:
      "Catalogue de véhicules et motos électriques (dont BYD), VTC électrique, livraison à moto, réseau de stations de charge et battery swapping en moins de 3 minutes, installation de bornes et panneaux solaires pour particuliers et entreprises à Abidjan et en Afrique de l'Ouest.",
    tags: ["VTC", "Énergie / Recharge", "Solaire", "Battery swapping"],
    link: "https://ivolt.myoctogone.com/",
    image: "/images/proj_ivolt.jpg",
  },
  {
    slug: "os-iris",
    title: "Osiris",
    category: "ERP / Gestion des PME",
    description:
      "Un projet ERP pour les PME ivoiriennes : stocks, ventes et comptabilité commerciale autour de Django et PostgreSQL. Sa vitrine Next.js présente huit modules, des interfaces web et mobile, un tableau de bord interactif et une caisse de démonstration avec des données fictives.",
    tags: ["Django", "PostgreSQL", "Next.js", "ERP", "Interfaces métier"],
    link: "https://osiris.myoctogone.com/",
    linkLabel: "Découvrir Osiris",
    image: "/images/osiris-web.webp",
    mobileImage: "/images/osiris-mobile.webp",
  },
  {
    slug: "sentinelle-rh",
    title: "Sentinelle RH",
    category: "RH / Gestion des présences",
    description:
      "Un projet de gestion des présences autour de Django, OpenCV, Redis et Django Channels. La vitrine Next.js présente huit modules, une borne simulée, un tableau de bord multi-sites et un espace employé mobile avec des données fictives et des calculs pédagogiques.",
    tags: ["Django", "OpenCV", "Redis", "Next.js", "Interfaces RH"],
    link: "https://sentinelle.myoctogone.com/",
    linkLabel: "Découvrir Sentinelle RH",
    image: "/images/sentinelle-web.webp",
    mobileImage: "/images/sentinelle-mobile.webp",
  },
  {
    slug: "momofund",
    title: "MomoFund",
    category: "Fintech / Financement participatif",
    description:
      "Un projet Flutter de financement participatif autour de l’API MTN Mobile Money, distingué au Hackathon MTN MTS 2024. La vitrine Next.js présente trois campagnes fictives, des interfaces web et mobile, un dashboard porteur et un simulateur de contribution sans paiement réel.",
    tags: ["Flutter", "MTN MoMo API", "Next.js", "Interfaces fintech"],
    award: "🥈 2ᵉ place, Hackathon MTN MTS 2024",
    link: "https://momofund.myoctogone.com/",
    linkLabel: "Découvrir MomoFund",
    image: "/images/momofund-web.webp",
    mobileImage: "/images/momofund-mobile.webp",
  },
  {
    slug: "timestrackers",
    title: "TimeTracker",
    category: "Présences & suivi RH",
    description:
      "Application Django de suivi des présences : entreprises, services, employés, horaires, retards, absences, réclamations et rapports. Nouveau site de présentation Next.js avec 25 pages, identité prune et corail, maquettes interactives, simulateur de durées et export CSV illustratif. Les extensions de planning et d’intégration sont identifiées séparément des fonctions documentées.",
    tags: ["Django", "Next.js", "React", "TypeScript"],
    link: "https://times.myoctogone.com/",
    linkLabel: "Découvrir TimeTracker",
    image: "/images/timetracker-web.webp",
    mobileImage: "/images/timetracker-mobile.webp",
  },
  {
    slug: "ma-resie",
    title: "Ma Resie",
    category: "Immobilier",
    description:
      "Plateforme de présentation de logements avec catalogue visuel, filtres par catégories et interface Next.js adaptée aux écrans ordinateur et mobile. Captures réelles du catalogue Moderne sur le site en ligne.",
    tags: ["Next.js", "React", "Immobilier"],
    link: "https://ma-resie.vercel.app/",
    linkLabel: "Découvrir Ma Resie",
    image: "/images/maresie-web.webp",
    mobileImage: "/images/maresie-mobile.webp",
  },

  {
    slug: "myoctogone",
    title: "MyOctogone",
    category: "Site corporate multisectoriel",
    description:
      "Refonte du site du groupe Octogone à Abidjan : présentation de huit filiales, galerie filtrable de 17 projets, interfaces en français et en anglais, animations et écrans en perspective. Site responsive construit avec Astro, React, TypeScript et Tailwind CSS, avec formulaire WhatsApp, prise de rendez-vous Cal.com, données structurées et sitemaps bilingues. Déploiement automatisé sur GitHub Pages et domaine personnalisé en HTTPS.",
    tags: ["Astro", "React", "TypeScript", "Tailwind CSS", "SEO"],
    link: "https://myoctogone.com/",
    linkLabel: "Voir MyOctogone",
    image: "/images/myoctogone-web.webp",
    mobileImage: "/images/myoctogone-mobile.webp",
    stats: [
      { value: "8", label: "Filiales présentées" },
      { value: "17", label: "Projets dans la galerie" },
      { value: "2", label: "Langues : français et anglais" },
    ],
    featured: true,
  },
  {
    slug: "salmacreation",
    title: "Salma Création",
    category: "E-commerce maroquinerie",
    description:
      "Boutique en ligne de maroquinerie en cuir véritable à Abidjan : sacs d'affaires, sacs à dos et bandoulières à l'allure intemporelle. Catalogue produit avec fiches détaillées, paiement Mobile Money en ligne, mise en avant de la boutique physique (Boulevard Latrille) et livraison à Abidjan et au-delà. Interface Next.js, React, TypeScript et Tailwind CSS, animations soignées du bureau au mobile.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "E-commerce",
      "Mobile Money",
    ],
    link: "https://salmacreation.online/",
    linkLabel: "Voir Salma Création",
    image: "/images/salmacreation-web.webp",
    mobileImage: "/images/salmacreation-mobile.webp",
    stats: [
      { value: "3", label: "Familles de produits" },
      { value: "1", label: "Boutique physique à Abidjan" },
      { value: "100%", label: "Cuir véritable" },
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const awards = [
  {
    date: "Déc. 2025",
    title: "1er Prix Moov Africa CI StartUp Challenge 2025",
    status: "Vainqueur",
    text: "Remporté avec Edone, ERP éducatif multiplateforme pour la gestion académique, administrative et financière, validé par une phase pilote sur quatre établissements.",
  },
  {
    date: "Mai 2025",
    title: "Finaliste, MASS Solutions Spatiales Africaines (ICESCO)",
    status: "Finaliste",
    text: "Présentation de travaux de traçabilité agricole combinant blockchain, imagerie satellite et cartographie 3D au concours MASS / ICESCO 2025.",
  },
  {
    date: "Janv. 2024",
    title: "2ᵉ place, Hackathon MTN MTS Côte d'Ivoire",
    status: "2ᵉ place",
    text: "Développement de MomoFund, plateforme de crowdfunding Mobile Money permettant le financement collaboratif de projets via l'API MTN MoMo.",
  },
];

export const degrees = [
  {
    year: "2025",
    title: "Master of Science in Computer Science: Software Engineering",
    place: "Wolf University / GoMyCode",
  },
  {
    year: "2023",
    title: "Master en Informatique — Génie Logiciel",
    place: "IIPEA, Institut International Polytechnique des Élites d'Abidjan",
  },
  {
    year: "2023",
    title: "Master en Big Data Analytics",
    place: "Université Virtuelle de Côte d'Ivoire — soutenance en cours",
  },
  {
    year: "2020",
    title: "Licence en Bases de Données",
    place: "Université Virtuelle de Côte d'Ivoire",
  },
  {
    year: "2017",
    title: "Baccalauréat Scientifique — Série C",
    place: "Lycée Municipal de Port-Bouët",
  },
];

export const certifications = [
  { title: "Python for Data Science", issuer: "IBM" },
  { title: "Big Data Analysis", issuer: "IBM" },
  { title: "Machine Learning & Data Visualization with Python", issuer: "IBM" },
  {
    title: "Microsoft Technologies Association Programming",
    issuer: "Microsoft",
  },
  { title: "ITIL® Foundation in IT Service Management", issuer: "AXELOS" },
  {
    title: "Administrateur de Bases de Données",
    issuer: "NaN — Not A Number CI",
  },
  {
    title: "Planification de projet informatisé & suivi opérationnel",
    issuer: "MDS Canada",
  },
];

export const testimonials = [
  {
    name: "Jean Kouassi",
    role: "Directeur IT, Groupe École Sup",
    initials: "JK",
    quote:
      "Daniel a conçu pour nous une plateforme académique sur mesure, fiable et facile à utiliser. Son expertise backend a permis d'automatiser des processus complexes.",
  },
  {
    name: "Yao N'Dri",
    role: "CTO, Saas Group Côte d'Ivoire",
    initials: "YN",
    quote:
      "Sa capacité à comprendre nos besoins et à livrer dans les délais a été remarquable. Le projet a été mené avec un haut niveau d'exigence, de la spécification au déploiement.",
  },
  {
    name: "Nadine Koné",
    role: "Cheffe de projet, ONASUR",
    initials: "NK",
    quote:
      "Professionnel, réactif et force de proposition. Il a transformé notre idée en une application performante, sécurisée et évolutive, disponible bien après la livraison.",
  },
  {
    name: "Kouadio Alain",
    role: "Responsable Digital, MINADER",
    initials: "KA",
    quote:
      "L'architecture mise en place est solide : elle supporte aujourd'hui des centaines d'utilisateurs sur notre marketplace agricole, sans incident majeur depuis le lancement.",
  },
];

export const partners = [
  { name: "IIPEA", image: "/images/partner_iipea.png" },
  { name: "Illigo", image: "/images/partner_illigo.png" },
  { name: "Saas Group", image: "/images/partner_saas.png" },
  { name: "Akacias", image: "/images/partner_akacias.png" },
  { name: "Innov", image: "/images/partner_innov.png" },
  { name: "CEPICI", image: "/images/partner_cepici.png" },
  { name: "MINADER", image: "/images/partner_minader.png" },
  { name: "OACI", image: "/images/partner_oaci.png" },
];

export const contactCategories = [
  "Backend",
  "Mobile",
  "Fintech",
  "E-gouvernement",
  "SIG",
  "E-commerce",
];

export const contactTimeframes = ["Urgent", "1 mois", "2–3 mois", "Flexible"];

export const navLinks = [
  { href: "/work", label: "Projets" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const menuLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/experience", label: "Expérience" },
  { href: "/education", label: "Formation" },
  { href: "/certifications", label: "Certifications" },
  { href: "/work", label: "Projets" },
  { href: "/contact", label: "Contact" },
];
