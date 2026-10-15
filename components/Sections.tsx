"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { areaData, developers, insights, propertyPlaceholders, PropertyItem, site } from "@/data/site";
import { MatchingForm, PropertySearch, VisitForm } from "@/components/LeadForms";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export function Hero({
  headline = "Find Your Next Home.",
  copy = "Pilihan rumah, ruko, studio loft, business loft, dan kavling komersial di Gading Serpong, BSD, Alam Sutera, dan Karawaci."
}: {
  headline?: string;
  copy?: string;
}) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-ink text-paper md:min-h-[650px]">
      <HeroSlideshow />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container-pad relative flex min-h-[620px] items-center py-14 md:min-h-[650px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-paper/75">Property Consultant · Part of Terra Savana</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-[-0.04em] md:text-8xl">{headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/80">
            {copy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#properties" className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-olive transition hover:bg-white">Lihat Properti</Link>
            <Link href={`https://wa.me/${site.whatsapp}`} className="inline-flex items-center justify-center rounded-full border border-paper/40 bg-white/10 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition hover:bg-white/20">Konsultasi dengan Owen</Link>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-4">
            {["Gading Serpong", "BSD City", "Alam Sutera", "Karawaci"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/20 text-center">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [searchFilters, setSearchFilters] = useState<{
    category: string;
    location: string;
    budget: string;
    developer: string;
    keyword: string;
  }>({
    category: "Semua Tipe",
    location: "Semua Kawasan",
    budget: "Semua Budget",
    developer: "Semua Developer",
    keyword: ""
  });

  useEffect(() => {
    function onFilterEvent(e: Event) {
      const custom = e as CustomEvent;
      if (custom.detail) {
        setSearchFilters(custom.detail);
        if (custom.detail.category && custom.detail.category !== "Semua Tipe") {
          setActiveTab(custom.detail.category === "Residential" ? "Rumah" : custom.detail.category);
        } else {
          setActiveTab("Semua");
        }
      }
    }
    window.addEventListener("property-filter", onFilterEvent);
    return () => window.removeEventListener("property-filter", onFilterEvent);
  }, []);

  const filteredProperties = useMemo(() => {
    return propertyPlaceholders.filter((prop) => {
      if (activeTab !== "Semua") {
        if (activeTab === "Rumah" && prop.category !== "Residential") return false;
        if (activeTab === "Ruko" && prop.category !== "Ruko") return false;
        if (activeTab === "Studio Loft" && prop.category !== "Studio Loft") return false;
        if (activeTab === "Business Loft" && prop.category !== "Business Loft") return false;
        if (activeTab === "Kavling Komersial" && prop.category !== "Kavling Komersial") return false;
      }

      if (searchFilters.category !== "Semua Tipe" && prop.category !== searchFilters.category) {
        return false;
      }

      if (searchFilters.location !== "Semua Kawasan" && prop.location !== searchFilters.location) {
        return false;
      }

      if (searchFilters.developer !== "Semua Developer") {
        const devQuery = searchFilters.developer.toLowerCase();
        const propDev = prop.developer.toLowerCase();
        if (!propDev.includes(devQuery)) {
          if (devQuery === "cgs" && !propDev.includes("citra garden")) return false;
          else if (devQuery !== "cgs") return false;
        }
      }

      if (searchFilters.budget !== "Semua Budget") {
        if (searchFilters.budget === "Ruko 2M" && prop.subCategory !== "Ruko 2M") return false;
        if (searchFilters.budget === "Ruko 3M" && prop.subCategory !== "Ruko 3M") return false;
        if (searchFilters.budget === "Ruko 4-5M" && prop.subCategory !== "Ruko 4-5M") return false;
        if (searchFilters.budget === "Rumah 1-2M" && prop.subCategory !== "Rumah 1-2M") return false;
        if (searchFilters.budget === "Rumah 3-4M" && prop.subCategory !== "Rumah 3-4M") return false;
        if (searchFilters.budget === "Rumah 5-7M" && prop.subCategory !== "Rumah 5-7M") return false;
        if (searchFilters.budget === "Rumah 9-20M" && prop.subCategory !== "Rumah 9-20M") return false;
        if (searchFilters.budget === "Loft 6-10M" && prop.category !== "Studio Loft") return false;
        if (searchFilters.budget === "Loft > 10M" && prop.category !== "Business Loft") return false;
        if (searchFilters.budget === "Kavling" && prop.category !== "Kavling Komersial") return false;
      }

      if (searchFilters.keyword.trim() !== "") {
        const q = searchFilters.keyword.toLowerCase();
        const text = `${prop.title} ${prop.developer} ${prop.location} ${prop.subCategory || ""} ${prop.highlight || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [activeTab, searchFilters]);

  return (
    <section id="properties" className="container-pad py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Katalog Properti Pilihan</p>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl tracking-[-0.03em]">
            Katalog Rumah & Properti Komersial Pilihan
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Menampilkan {filteredProperties.length} listing properti rumah, ruko, loft, dan kavling komersial siap survei di Gading Serpong, BSD, Alam Sutera, dan Karawaci.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {[
          { label: "Semua", count: propertyPlaceholders.length },
          { label: "Rumah", count: propertyPlaceholders.filter((p) => p.category === "Residential").length },
          { label: "Ruko", count: propertyPlaceholders.filter((p) => p.category === "Ruko").length },
          { label: "Studio Loft", count: propertyPlaceholders.filter((p) => p.category === "Studio Loft").length },
          { label: "Business Loft", count: propertyPlaceholders.filter((p) => p.category === "Business Loft").length },
          { label: "Kavling Komersial", count: propertyPlaceholders.filter((p) => p.category === "Kavling Komersial").length }
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.label
                ? "bg-olive text-paper shadow-soft"
                : "bg-paper text-muted hover:text-ink border border-line"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Grid of properties */}
      {filteredProperties.length === 0 ? (
        <div className="card mt-12 p-12 text-center">
          <p className="text-xl font-semibold text-ink">Tidak ada properti yang cocok dengan filter pencarian.</p>
          <p className="mt-2 text-muted">Coba ubah filter atau kata kunci pencarian Anda di atas.</p>
          <button
            onClick={() => {
              setActiveTab("Semua");
              setSearchFilters({
                category: "Semua Tipe",
                location: "Semua Kawasan",
                budget: "Semua Budget",
                developer: "Semua Developer",
                keyword: ""
              });
            }}
            className="btn-primary mt-6 text-sm"
          >
            Tampilkan Semua Properti
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <article key={property.slug} className="card group flex flex-col justify-between overflow-hidden transition-all hover:shadow-soft">
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-line/30">
                  <Image
                    fill
                    src={property.image}
                    alt={`${property.title} di ${property.location}`}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
                      {property.category === "Residential" ? "Rumah" : property.category}
                    </span>
                    {property.subCategory && (
                      <span className="rounded-full bg-olive/90 px-3 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
                        {property.subCategory}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                    {property.developer}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted">
                    <span>📍 {property.location}</span>
                    <span>{property.type}</span>
                  </div>

                  <h3 className="mt-2 text-2xl font-semibold text-ink group-hover:text-olive transition">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-2xl font-bold text-olive">{property.price}</p>

                  <div className="mt-4 space-y-1.5 border-t border-line/60 pt-3 text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Luas / Dimensi:</span>
                      <span className="font-semibold text-ink">{property.landSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bangunan / Specs:</span>
                      <span className="font-semibold text-ink">{property.buildingSize}</span>
                    </div>
                    {property.highlight && (
                      <p className="mt-2 text-xs italic text-muted line-clamp-2">
                        &quot;{property.highlight}&quot;
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="btn-secondary w-full text-center text-xs py-2.5"
                  >
                    Detail Unit
                  </Link>
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                      `Halo Owen, saya tertarik dengan ${property.title} (${property.category} - ${property.developer}) seharga ${property.price}. Boleh minta info brosur & jadwal survei?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center text-xs py-2.5 bg-[#25D366] hover:bg-[#20ba5a] border-none text-white font-medium"
                  >
                    Tanya Owen
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function MatchingSection() {
  return (
    <section id="matching" className="container-pad grid gap-10 py-24 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="eyebrow">Property Matching</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Butuh Bantuan Memilih Rumah atau Properti Terbaik?</h2>
        <p className="mt-5 text-lg leading-8 text-muted">Ceritakan kriteria hunian, lokasi usaha, atau investasi Anda. Owen akan memfilter unit terbaik dengan yield sewa maksimal dan lokasi paling strategis.</p>
      </div>
      <MatchingForm />
    </section>
  );
}

export function AreasSection() {
  return (
    <section id="areas" className="bg-white/45 py-24">
      <div className="container-pad">
        <p className="eyebrow">Areas</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Kawasan Komersial & Residensial Utama</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {areaData.map((area) => (
            <Link href={`/areas/${area.slug}`} key={area.slug} className="group overflow-hidden rounded-[2rem] border border-line bg-paper">
              <div className="relative h-56"><Image fill src={area.image} alt={`${area.name} residential area`} className="object-cover transition duration-500 group-hover:scale-105" /></div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold">{area.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{area.summary}</p>
                <p className="mt-4 text-sm font-semibold text-olive">Explore Properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DevelopersSection() {
  return (
    <section id="developers" className="container-pad py-24">
      <p className="eyebrow">Developer Partner Portfolio</p>
      <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Properti dari Developer Terkemuka</h2>
      <p className="mt-4 max-w-3xl text-muted">Portfolio komersial & residensial dari developer ternama yang ditangani oleh Owen. Kami membantu proses dari konsultasi, visit lokasi, hingga negosiasi harga terbaik.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((developer) => (
          <div key={developer.name} className="flex h-36 items-center justify-center rounded-3xl border border-line bg-white/70 px-10 py-8 shadow-soft">
            <Image src={developer.logo} alt={`${developer.name} logo`} width={260} height={110} className="h-16 w-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({
  headline = "Meet Owen",
  copy = "Owen adalah property consultant berpengalaman yang mendampingi pengusaha, investor, dan keluarga menemukan ruko komersial, studio loft, maupun hunian ideal.",
  brandStatement = "Rumah_Owen is Owen's personal property brand and is part of Terra Savana."
}: {
  headline?: string;
  copy?: string;
  brandStatement?: string;
}) {
  return (
    <section id="about" className="container-pad grid gap-10 py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-olive/10 flex items-center justify-center p-8">
        <div className="rounded-[2rem] border border-line bg-white/70 p-8 text-center shadow-soft max-w-sm">
          <Image
            src={site.logo}
            alt={site.name}
            width={180}
            height={60}
            className="h-16 w-auto mx-auto object-contain"
          />
          <p className="mt-4 font-serif text-2xl text-ink">Owen — Property Consultant</p>
          <p className="mt-2 text-sm text-muted">Spesialis Komersial & Residensial Tangerang Raya</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
            <span className="rounded-full bg-olive/10 text-olive px-3 py-1 font-semibold">Gading Serpong</span>
            <span className="rounded-full bg-olive/10 text-olive px-3 py-1 font-semibold">BSD City</span>
            <span className="rounded-full bg-olive/10 text-olive px-3 py-1 font-semibold">Alam Sutera</span>
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow">About Owen</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">{headline}</h2>
        <p className="mt-5 text-lg leading-8 text-muted">{copy}</p>
        <p className="mt-4 text-lg leading-8 text-muted">Berfokus pada kawasan emas Gading Serpong, BSD, Alam Sutera, dan Karawaci, Owen membantu analisis lokasi usaha, perbandingan yield ruko, hingga pemilihan hunian keluarga dan kavling komersial skala besar.</p>
        <p className="mt-6 rounded-3xl border border-line bg-white/50 p-6 font-semibold">{brandStatement}</p>
        <Link href={`https://wa.me/${site.whatsapp}`} className="mt-8 btn-primary">Konsultasi dengan Owen</Link>
      </div>
    </section>
  );
}

export function TerraSavanaSection() {
  return (
    <section className="container-pad py-16">
      <div className="card p-8 md:p-12">
        <p className="eyebrow">Terra Savana</p>
        <h2 className="mt-3 font-serif text-4xl">Rumah_Owen is Part of Terra Savana</h2>
        <p className="mt-4 max-w-3xl text-muted">Rumah_Owen merupakan personal property brand Owen sebagai property consultant yang menjadi bagian dari Terra Savana.</p>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section id="insights" className="container-pad py-24">
      <p className="eyebrow">Insight & Artikel Properti</p>
      <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Analisis & Panduan Properti Terkini</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {insights.map((item) => (
          <Link href={`/insights/${item.slug}`} key={item.slug} className="card p-6 block hover:border-olive transition">
            <p className="text-xs text-muted">{item.date}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-muted">{item.description}</p>
            <span className="mt-4 inline-block font-semibold text-olive">Baca Selengkapnya →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function LeadCaptureSection() {
  return (
    <section className="bg-olive py-24 text-paper">
      <div className="container-pad max-w-3xl text-center">
        <h2 className="font-serif text-5xl tracking-[-0.03em]">Ingin Mendapatkan Daftar Lengkap & Simulasi Angsuran?</h2>
        <p className="mt-4 text-lg text-paper/85">Dapatkan detail lengkap unit, denah layout, dan konsultasi gratis langsung dengan Owen via WhatsApp.</p>
        <a
          href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo Owen, saya ingin konsultasi properti komersial & residensial.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 btn-primary inline-flex bg-paper text-olive hover:bg-white"
        >
          Hubungi Owen via WhatsApp
        </a>
      </div>
    </section>
  );
}

export function VisitSection({ property = "" }: { property?: string }) {
  return (
    <section id="schedule" className="container-pad py-20">
      <div className="card p-8 md:p-12">
        <h2 className="font-serif text-4xl">Jadwalkan Kunjungan & Survei Lokasi</h2>
        <p className="mt-3 text-muted">Pilih tanggal dan waktu survei properti yang Anda inginkan bersama Owen.</p>
        <div className="mt-8"><VisitForm property={property} /></div>
      </div>
    </section>
  );
}

export { PropertySearch };
