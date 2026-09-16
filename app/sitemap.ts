import type { MetadataRoute } from "next";
import { areaData, insights, propertyPlaceholders, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/privacy-policy", "/terms", "/disclaimer"].map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: new Date()
  }));

  return [
    ...staticRoutes,
    ...areaData.map((area) => ({ url: `${site.domain}/areas/${area.slug}`, lastModified: new Date() })),
    ...propertyPlaceholders.map((property) => ({ url: `${site.domain}/properties/${property.slug}`, lastModified: new Date() })),
    ...insights.map((post) => ({ url: `${site.domain}/insights/${post.slug}`, lastModified: new Date(post.date) }))
  ];
}

