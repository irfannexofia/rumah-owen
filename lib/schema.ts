import { site } from "@/data/site";

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Rumah_Owen",
    url: site.domain,
    description: site.description,
    areaServed: ["Gading Serpong", "BSD", "Alam Sutera", "Karawaci", "Tangerang"],
    brand: {
      "@type": "Brand",
      name: "Rumah_Owen"
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Terra Savana"
    }
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
