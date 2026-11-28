This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Version agency

La refonte créative est développée et déployée depuis la branche `agency`. `main` conserve la version précédente. Palette crème, terracotta et olive ; typographies Neue Montreal et Fraunces ; cartes de projets, effets de profondeur, révélations au scroll, mise en page responsive et respect des préférences de mouvements réduits.

- Les 20 projets restent dans `src/data/content.ts`, BABI JUS en première position. La nouvelle interface est dans `src/components/agency/` et `src/styles/agency.css`.
- Les fiches comportent captures et vues ordinateur/mobile, plus un site interactif pour les domaines dont les autorisations d’intégration ont été vérifiées. Liste dans `LivePreview.tsx`. Ordinateur, tablette et mobile simulent respectivement des largeurs de 1280, 768 et 390 px, mises à l’échelle selon l’espace disponible. Un lien direct et les captures restent disponibles si une intégration échoue.
- Les réseaux fournis sont centralisés dans `src/components/agency/socials.ts`. Le contact utilise WhatsApp et le calendrier Cal.com existant, avec un lien externe de secours.
- Le MP3 fourni par le propriétaire est `public/Damso - Sentimental (Paroles).mp3`. Le lecteur persiste entre les pages, tente la lecture immédiate et reprend au premier geste si le navigateur bloque l’autoplay sonore. Aucune méthode ne peut garantir le son automatique sur tous les navigateurs. Le bouton arrêt et le volume restent accessibles ; le choix d’arrêt est conservé localement.
- Les photos fournies sont conservées dans `public/me1.jpeg`, `public/me2.jpeg`, `public/me3.png` ; leurs copies WebP optimisées sont dans `public/images/agency/`. Licence Fraunces : `public/fonts/Agency-Fraunces-OFL.txt`.
- Workflow GitHub Pages : déclenchement sur `agency`, export statique `out/`, domaine conservé `guedegbe.com`. Ne pas fusionner dans `main` pour publier cette version.

Vérification : `npm run build`, `npx tsc --noEmit --incremental false` et ESLint sur les fichiers modifiés.

Le lecteur sonore est inclus dans l’export uniquement lorsque le fichier MP3 est présent au moment du build. Le MP3 reste hors du dépôt tant que les droits de diffusion publique ne sont pas confirmés. La refonte peut donc être publiée sans fichier audio ni lecteur vide.

La diffusion du morceau a été confirmée par le propriétaire. La copie publiée et lue par le site est `public/audio/damso-sentimental.mp3`, encodée en MP3 standard à 160 kbit/s. Le fichier fourni initialement utilisait le codec Opus malgré son extension ; il est conservé localement, sans être recopié dans les prochains exports GitHub Pages.

## Version honey

Refonte complète développée sur la branche `honey` (créée depuis `agency`). Palette bordeaux, or et ivoire ; typographies Neue Montreal et Fraunces conservées.

- Interface dans `src/components/honey/` et `src/styles/honey.css`. Les anciens composants `agency` et hérités ont été retirés de cette branche (ils restent sur `agency`).
- Loader animé au premier chargement de la session (`Loader.tsx`), rideau de transition entre pages (`src/app/template.tsx`), scène 3D Three.js dans le hero (`HeroScene.tsx`), carrousel 3D des 22 projets (`ProjectRing.tsx`), cartes à inclinaison 3D (`data-tilt`, géré par `MotionSystem.tsx`). Tout respecte `prefers-reduced-motion`.
- Fiches projet : site en direct (ordinateur, tablette, mobile avec cadre de téléphone), captures et maquettes laptop/mobile (`LivePreview.tsx`, `DeviceFrame.tsx`).
- Parcours complet sur `/parcours` (expérience, formation, distinctions, compétences) ; `/experience`, `/education` et `/certifications` restent accessibles.
- Espace devis `/devis` (`QuoteWizard.tsx`, options dans `quote-config.ts`) : 9 types de projet combinables, profil (personnel, entreprise, startup, institution, ONG, école), questions détaillées par type, budget en FCFA, délais, éléments existants, coordonnées, récapitulatif avec référence. La validation ouvre WhatsApp (+225 07 48 73 33 65) avec le message formaté ; copie et email en secours. Brouillon conservé localement, rien n’est envoyé à un serveur. `?type=site|mobile|webapp|presence|image|pages|data|system` présélectionne un type.
- Contact : formulaire WhatsApp rapide et calendrier Cal.com intégré. Musique de fond conservée (même préférence marche/arrêt que `agency`).
- Workflow GitHub Pages : déclenchement sur `honey` (export `out/`, domaine `guedegbe.com`). Pour revenir à agency, remettre `agency` dans le workflow.
- Image de partage : `public/images/honey/og-honey.jpg`.
