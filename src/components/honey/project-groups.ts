export const groups = [
  { id: "all", label: "Tout" },
  { id: "immersif", label: "Sites immersifs" },
  { id: "commerce", label: "E-commerce" },
  { id: "produit", label: "Produits & apps" },
  { id: "data", label: "Fintech & data" },
  { id: "metier", label: "Outils métier" },
] as const;

export type GroupId = (typeof groups)[number]["id"];

export const projectGroup: Record<string, Exclude<GroupId, "all">[]> = {
  ynemstore: ["immersif", "commerce"],
  sixcordes: ["immersif"],
  megamonde: ["immersif", "commerce"],
  akservices: ["immersif"],
  dabaliexpress: ["immersif", "commerce"],
  ivoirebike: ["immersif", "commerce"],
  cacaosat: ["immersif", "data"],
  babijus: ["immersif", "commerce"],
  "spaghetti-abidjan": ["commerce"],
  bantoo: ["produit"],
  "fne-ivoire": ["metier", "data"],
  "brvm-analytics": ["data"],
  "wave-business-api": ["data", "produit"],
  pandatree: ["immersif", "data"],
  edone: ["metier", "produit"],
  allocar: ["produit"],
  "sportif-africa": ["commerce"],
  voltara: ["produit"],
  ivolt: ["produit"],
  "os-iris": ["metier"],
  "sentinelle-rh": ["metier"],
  momofund: ["data", "produit"],
  timestrackers: ["metier"],
  "ma-resie": ["commerce"],
  myoctogone: ["immersif"],
  salmacreation: ["commerce"],
};
