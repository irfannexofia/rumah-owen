import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights, propertyPlaceholders, site } from "@/data/site";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: "article" }
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="container-pad py-12">
      <article className="mx-auto max-w-4xl">
        <p className="eyebrow">Property Insights</p>
        <h1 className="mt-3 font-serif text-6xl tracking-[-0.04em]">{post.title}</h1>
        <p className="mt-5 text-muted">By Owen · {post.date}</p>
        <div className="relative mt-10 h-[460px] overflow-hidden rounded-[2.5rem]">
          <Image fill src="https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1500&q=80" alt={post.title} className="object-cover" />
        </div>
        <div className="prose prose-lg mt-10 max-w-none text-muted">
          <p>{post.description}</p>
          <p>Artikel ini disiapkan sebagai struktur konten SEO awal. Detail spesifik seperti harga aktual, ketersediaan unit, nama cluster, fasilitas, dan jarak tempuh perlu dikonfirmasi sebelum dipublikasikan sebagai informasi final.</p>
          <h2>Hal yang Perlu Dipertimbangkan</h2>
          <p>Pembeli sebaiknya membandingkan kebutuhan keluarga, lokasi aktivitas harian, tipe properti, budget, opsi primary atau secondary, dan rencana jangka panjang sebelum menentukan pilihan.</p>
          <h2>Konsultasi dengan Owen</h2>
          <p>Owen dapat membantu menyaring pilihan properti berdasarkan kebutuhan aktual dan ketersediaan listing terbaru.</p>
        </div>
      </article>
      <section className="mx-auto mt-16 max-w-4xl">
        <h2 className="font-serif text-4xl">Related properties</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {propertyPlaceholders.map((property) => <Link className="card p-5 text-sm" href={`/properties/${property.slug}`} key={property.slug}>{property.title}<p className="mt-2 text-muted">{property.location}</p></Link>)}
        </div>
        <div className="mt-10 rounded-[2rem] bg-olive p-8 text-paper">
          <h2 className="font-serif text-4xl">Need help choosing?</h2>
          <p className="mt-3 text-paper/75">Consult Owen to compare property options based on your needs.</p>
          <Link href={`https://wa.me/${site.whatsapp}`} className="mt-6 inline-flex rounded-full bg-paper px-6 py-3 text-sm font-semibold text-olive">Consult with Owen</Link>
        </div>
      </section>
    </main>
  );
}
