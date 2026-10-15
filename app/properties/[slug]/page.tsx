import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageLightbox } from "@/components/ImageLightbox";
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
    title: `${property.title} | ${property.developer} di ${property.location}`,
    description: `${property.title} (${property.category} - ${property.subCategory || ""}) di ${property.location} oleh ${property.developer}. ${property.price}. Hubungi Owen untuk info detail dan jadwal survei.`,
    alternates: { canonical: `/properties/${property.slug}` }
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = propertyPlaceholders.find((item) => item.slug === slug);
  if (!property) notFound();

  const detail = property as typeof property & { gallery?: string[]; layout?: string };
  const allImages = [property.image, ...(detail.gallery || [])].filter(
    (item, index, self): item is string => Boolean(item) && self.indexOf(item) === index
  );
  const layoutImages = detail.layout ? [detail.layout] : [];

  return (
    <main>
      <section className="container-pad py-12">
        <div className="mb-6 flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-olive">Home</Link><span>/</span>
          <Link href="/#properties" className="hover:text-olive">Properties</Link><span>/</span>
          <span className="text-olive">{property.category}</span><span>/</span>
          <span className="font-medium text-ink">{property.title}</span>
        </div>

        <div className="relative h-[55vh] overflow-hidden rounded-[2.5rem] bg-line/20 shadow-soft md:h-[65vh]">
          <ImageLightbox images={allImages} title={property.title} />
          <div className="pointer-events-none absolute left-6 top-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink/90 px-4 py-1.5 text-xs font-semibold text-paper backdrop-blur-md">
              {property.category === "Residential" ? "Rumah" : property.category}
            </span>
            {property.subCategory && (
              <span className="rounded-full bg-olive px-4 py-1.5 text-xs font-semibold text-paper backdrop-blur-md">
                {property.subCategory}
              </span>
            )}
          </div>
          <div className="pointer-events-none absolute bottom-6 right-6 rounded-full bg-paper/95 px-5 py-2 text-sm font-semibold text-ink shadow-soft backdrop-blur-md">
            Developer: {property.developer}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <p className="eyebrow">📍 {property.location} · {property.developer}</p>
            <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em] text-ink md:text-6xl">{property.title}</h1>
            <p className="mt-4 text-3xl font-bold text-olive">{property.price}</p>
            <p className="mt-4 leading-7 text-muted">
              {property.description || `Unit ${property.type} di ${property.location} oleh ${property.developer}. Hubungi Owen untuk ketersediaan, pricelist terbaru, dan jadwal survei.`}
            </p>

            {allImages.length > 1 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-ink">Foto Unit & Galeri</h2>
                  <span className="text-xs text-muted">Klik foto untuk membuka galeri slide</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {allImages.map((image, index) => (
                    <div key={image} className="relative h-32 overflow-hidden rounded-2xl bg-line/20">
                      <ImageLightbox images={[...allImages.slice(index), ...allImages.slice(0, index)]} title={`${property.title} foto ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {layoutImages.length > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <h2 className="text-xl font-semibold text-ink">Denah Layout Unit</h2>
                  <span className="text-xs text-muted">Klik denah untuk memperbesar</span>
                </div>
                <div className="relative h-80 bg-white/40">
                  <ImageLightbox images={layoutImages} title={`Denah layout ${property.title}`} />
                </div>
              </div>
            )}
          </div>

          <div className="card self-start p-6">
            <h3 className="border-b border-line pb-3 text-base font-semibold">Ringkasan Spesifikasi</h3>
            <div className="divide-y divide-line/60 text-sm">
              {[
                ["Kategori", property.category === "Residential" ? "Rumah Tinggal" : property.category],
                ["Kawasan", property.location],
                ["Developer", property.developer],
                ["Luas Tanah / Dimensi", property.landSize],
                ["Luas Bangunan / Specs", property.buildingSize],
                ["Kamar Tidur", property.bedrooms],
                ["Kamar Mandi", property.bathrooms],
                ["Tipe Unit", property.type]
              ].map(([label, value]) => (
                <div className="flex justify-between gap-4 py-3" key={label}>
                  <span className="text-muted">{label}</span>
                  <span className="text-right font-semibold text-ink">{value}</span>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Halo Owen, saya ingin info detail, pricelist, dan simulasi pembayaran untuk ${property.title} (${property.type}) di ${property.location}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full border-none bg-[#25D366] py-3 text-center text-white btn-primary hover:bg-[#20ba5a]"
            >
              Tanya Owen via WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-olive p-8 text-paper md:p-10">
          <h2 className="font-serif text-3xl md:text-4xl">Tertarik dengan {property.title}?</h2>
          <p className="mt-3 text-paper/85">Hubungi Owen untuk ketersediaan unit, pricelist terbaru, simulasi pembayaran, dan jadwalkan survei langsung ke lokasi.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-paper px-6 py-3 text-center text-sm font-semibold text-olive">
              Chat Owen via WhatsApp
            </a>
            <Link href="#schedule" className="rounded-full border border-paper/40 px-6 py-3 text-center text-sm font-semibold text-paper">
              Jadwalkan Kunjungan
            </Link>
          </div>
        </div>
      </section>
      <div id="schedule"><VisitSection property={property.title} /></div>
    </main>
  );
}
