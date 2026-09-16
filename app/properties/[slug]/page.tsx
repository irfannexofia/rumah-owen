import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VisitSection } from "@/components/Sections";
import { propertyPlaceholders, site } from "@/data/site";

export function generateStaticParams() {
  return propertyPlaceholders.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyPlaceholders.find((item) => item.slug === slug);
  if (!property) return {};
  return {
    title: `${property.title} di ${property.location}`,
    description: `${property.title} di ${property.location}. Availability and pricing are subject to confirmation.`,
    alternates: { canonical: `/properties/${property.slug}` }
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = propertyPlaceholders.find((item) => item.slug === slug);
  if (!property) notFound();

  return (
    <main>
      <section className="container-pad py-12">
        <div className="relative h-[62vh] overflow-hidden rounded-[2.5rem]">
          <Image priority fill src={property.image} alt={`${property.title} gallery`} className="object-cover" />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <p className="eyebrow">{property.location}</p>
            <h1 className="mt-3 font-serif text-6xl tracking-[-0.04em]">{property.title}</h1>
            <p className="mt-5 text-2xl font-semibold text-olive">{property.price}</p>
            <p className="mt-5 text-muted">Availability and pricing are subject to confirmation.</p>
          </div>
          <div className="card p-6">
            {["Land Size", "Building Size", "Bedrooms", "Bathrooms", "Floors", "Carport"].map((label, index) => (
              <div key={label} className="flex justify-between border-b border-line py-3 text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-semibold">{[property.landSize, property.buildingSize, property.bedrooms, property.bathrooms, "To be confirmed", "To be confirmed"][index]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {["Property description", "Highlights", "Location overview", "Developer / project information"].map((title) => (
            <div key={title} className="card p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-muted">Placeholder content. Real property details, facilities, exact address, project data, pricing, and availability should be confirmed before publishing.</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-[2rem] bg-olive p-8 text-paper">
          <h2 className="font-serif text-4xl">Interested in this property?</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`https://wa.me/${site.whatsapp}`} className="rounded-full bg-paper px-6 py-3 text-center text-sm font-semibold text-olive">Chat with Owen on WhatsApp</Link>
            <Link href="#schedule" className="rounded-full border border-paper/30 px-6 py-3 text-center text-sm font-semibold">Schedule a Visit</Link>
          </div>
        </div>
      </section>
      <div id="schedule"><VisitSection property={property.title} /></div>
    </main>
  );
}
