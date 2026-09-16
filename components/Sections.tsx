import Image from "next/image";
import Link from "next/link";
import { areaData, developers, insights, propertyPlaceholders, site } from "@/data/site";
import { MatchingForm, PropertySearch, VisitForm } from "@/components/LeadForms";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export function Hero({
  headline = "Find Your Next Home.",
  copy = "Pilihan rumah di Gading Serpong, BSD, Alam Sutera, dan Karawaci — disesuaikan dengan kebutuhan, gaya hidup, dan budget Anda."
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
            <Link href="#properties" className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-olive transition hover:bg-white">Find a Property</Link>
            <Link href={`https://wa.me/${site.whatsapp}`} className="inline-flex items-center justify-center rounded-full border border-paper/40 bg-white/10 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition hover:bg-white/20">Consult with Owen</Link>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Gading Serpong", "BSD", "Alam Sutera / Karawaci"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/20">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProperties() {
  return (
    <section id="properties" className="container-pad py-24">
      <p className="eyebrow">Selected Properties</p>
      <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Selected Properties</h2>
      <p className="mt-4 max-w-2xl text-muted">Explore selected homes and residential projects available through Rumah_Owen. Placeholder content is clearly marked until real listing data is supplied.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {propertyPlaceholders.map((property) => (
          <article key={property.slug} className="card overflow-hidden">
            <div className="relative h-64"><Image fill src={property.image} alt={`${property.title} in ${property.location}`} className="object-cover" /></div>
            <div className="p-6">
              <p className="text-sm text-muted">{property.location}</p>
              <h3 className="mt-1 text-2xl font-semibold">{property.title}</h3>
              <p className="mt-3 text-xl font-semibold text-olive">{property.price}</p>
              <p className="mt-3 text-sm text-muted">{property.landSize} Â· {property.buildingSize}</p>
              <p className="mt-1 text-sm text-muted">{property.bedrooms} Â· {property.bathrooms}</p>
              <p className="mt-1 text-sm text-muted">{property.type} Â· {property.developer}</p>
              <Link href={`/properties/${property.slug}`} className="mt-5 btn-secondary w-full">View Property</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MatchingSection() {
  return (
    <section id="matching" className="container-pad grid gap-10 py-24 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="eyebrow">Property Matching</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Not Sure Which Property Is Right for You?</h2>
        <p className="mt-5 text-lg leading-8 text-muted">Tell us what you're looking for. Owen will help match your requirements with available properties.</p>
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
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Explore Tangerang's Key Residential Areas</h2>
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
      <p className="eyebrow">Developers</p>
      <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Explore Properties from Leading Developers</h2>
      <p className="mt-4 max-w-3xl text-muted">Developer portfolio handled by Owen. This section does not imply official partnership, exclusive agency status, or corporate affiliation unless verified.</p>
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
  copy = "Owen adalah property consultant yang membantu calon pembeli menemukan pilihan rumah yang sesuai dengan kebutuhan, preferensi, dan budget mereka.",
  brandStatement = "Rumah_Owen is Owen's personal property brand and is part of Terra Savana."
}: {
  headline?: string;
  copy?: string;
  brandStatement?: string;
}) {
  return (
    <section id="about" className="container-pad grid gap-10 py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-olive/10">
        <div className="absolute inset-8 rounded-[2rem] border border-line bg-white/50 p-8">
          <p className="eyebrow">Professional Portrait Placeholder</p>
          <div className="mt-24 text-4xl font-semibold tracking-[0.18em] text-olive">RUMAH_OWEN</div>
          <p className="mt-3 text-muted">Property Consultant · Part of Terra Savana</p>
        </div>
      </div>
      <div>
        <p className="eyebrow">About Owen</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">{headline}</h2>
        <p className="mt-5 text-lg leading-8 text-muted">{copy}</p>
        <p className="mt-4 text-lg leading-8 text-muted">Berfokus pada kawasan Gading Serpong, BSD, Alam Sutera, dan Karawaci, Owen menangani berbagai pilihan properti dari developer ternama maupun secondary property.</p>
        <p className="mt-6 rounded-3xl border border-line bg-white/50 p-6 font-semibold">{brandStatement}</p>
        <Link href={`https://wa.me/${site.whatsapp}`} className="mt-8 btn-primary">Talk to Owen</Link>
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
        <p className="mt-5 text-sm text-muted">Learn More About Terra Savana â€” official URL can be connected when provided.</p>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section id="insights" className="container-pad py-24">
      <p className="eyebrow">Property Journal</p>
      <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">Property Insights</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {insights.map((post) => (
          <Link key={post.slug} href={`/insights/${post.slug}`} className="card p-6">
            <p className="text-sm text-muted">{post.date} Â· Owen</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">{post.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function VisitSection({ property }: { property?: string }) {
  return (
    <section className="container-pad py-20">
      <div className="card grid gap-8 p-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Jadwalkan Kunjungan</p>
          <h2 className="mt-3 font-serif text-4xl">Want to See It in Person?</h2>
          <p className="mt-4 text-muted">Schedule a visit to the selected property or show unit with Owen.</p>
        </div>
        <VisitForm property={property} />
      </div>
    </section>
  );
}

export { PropertySearch };

