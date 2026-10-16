import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

export const dynamic = "force-static";

const siteUrl = "https://me.myoctogone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/experience",
    "/education",
    "/certifications",
    "/work",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
