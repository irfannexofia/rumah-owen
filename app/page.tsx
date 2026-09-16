import Link from "next/link";
import { AboutSection, AreasSection, DevelopersSection, FeaturedProperties, Hero, InsightsSection, MatchingSection, PropertySearch, TerraSavanaSection } from "@/components/Sections";
import { realEstateAgentSchema } from "@/lib/schema";
import { site } from "@/data/site";
import { defaultContent } from "@/lib/content-defaults";
import { getContent } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function Home() {
  const homepage = getContent("homepage", defaultContent.homepage);
  const about = getContent("about", defaultContent.about);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema()) }} />
      <Hero headline={String(homepage.heroHeadline)} copy={String(homepage.heroCopy)} />
      <PropertySearch />
      <FeaturedProperties />
      <MatchingSection />
      <AreasSection />
      <DevelopersSection />
      <AboutSection headline={String(about.headline)} copy={String(about.copy)} brandStatement={String(about.brandStatement)} />
      <TerraSavanaSection />
      <InsightsSection />
      <section className="container-pad py-24">
        <div className="rounded-[2.5rem] bg-olive p-8 text-paper md:p-16">
          <p className="eyebrow text-paper/70">Next Step</p>
          <h2 className="mt-3 font-serif text-5xl tracking-[-0.03em]">{String(homepage.finalCtaTitle)}</h2>
          <p className="mt-5 max-w-2xl text-lg text-paper/80">{String(homepage.finalCtaCopy)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`https://wa.me/${site.whatsapp}`} className="inline-flex rounded-full bg-paper px-6 py-3 text-sm font-semibold text-olive">Consult with Owen</Link>
            <Link href="#matching" className="inline-flex rounded-full border border-paper/30 px-6 py-3 text-sm font-semibold text-paper">Find My Property</Link>
          </div>
        </div>
      </section>
    </main>
  );
}



