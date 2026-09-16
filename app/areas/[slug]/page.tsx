import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaData, propertyPlaceholders, site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return areaData.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areaData.find((item) => item.slug === slug);
  if (!area) return {};
  return {
    title: `Rumah ${area.name} — Konsultasi Properti dengan Owen`,
    description: `${area.summary} Konsultasikan pilihan rumah ${area.name} bersama Rumah_Owen.`,
    alternates: { canonical: `/areas/${area.slug}` }
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaData.find((item) => item.slug === slug);
  if (!area) notFound();

  const faqs = [
    `Apa karakter properti di ${area.name}?`,
    `Apakah tersedia rumah baru dan secondary di ${area.name}?`,
    `Bagaimana cara survey rumah di ${area.name} bersama Owen?`
  ];

  return (
    <main className="container-pad py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.domain }, { name: area.name, url: `${site.domain}/areas/${area.slug}` }])) }} />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Residential Area</p>
          <h1 className="mt-3 font-serif text-6xl tracking-[-0.04em]">Rumah {area.name}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{area.summary}</p>
          <Link href={`https://wa.me/${site.whatsapp}`} className="mt-8 btn-primary">Contact Owen</Link>
        </div>
        <div className="relative h-[460px] overflow-hidden rounded-[2.5rem]">
          <Image fill src={area.image} alt={`${area.name} residential property`} className="object-cover" />
        </div>
      </div>
      <section className="grid gap-5 py-16 md:grid-cols-3">
        {["Property types", "Developer projects", "Lifestyle", "Accessibility", "Nearby facilities", "Featured listings"].map((title) => (
          <div key={title} className="card p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{area.characteristics} Specific project, facility, distance, and travel-time details should be added only when verified.</p>
          </div>
        ))}
      </section>
      <section className="py-8">
        <h2 className="font-serif text-4xl">Featured listings</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {propertyPlaceholders.map((property) => <Link className="card p-5" href={`/properties/${property.slug}`} key={property.slug}>{property.title}<p className="mt-2 text-sm text-muted">{property.location} · Availability and pricing are subject to confirmation.</p></Link>)}
        </div>
      </section>
      <section className="py-12">
        <h2 className="font-serif text-4xl">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => <details key={faq} className="rounded-2xl border border-line bg-white/50 p-5"><summary className="font-semibold">{faq}</summary><p className="mt-3 text-muted">Owen can help compare available options based on current listing availability and your requirements.</p></details>)}
        </div>
      </section>
    </main>
  );
}
