import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromoLanding } from "@/components/PromoLanding";
import { defaultPromoContent } from "@/lib/promo-defaults";
import { getPromoPage } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPromoPage(slug);
  if (!page) return {};
  const content = { ...defaultPromoContent, ...page.content };

  return {
    title: page.title,
    description: String(content.subheadline || content.headline || page.title),
    alternates: { canonical: `/promo/${page.slug}` },
    openGraph: {
      title: page.title,
      description: String(content.subheadline || content.headline || page.title),
      type: "website",
      images: content.heroImage ? [{ url: String(content.heroImage) }] : undefined
    }
  };
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPromoPage(slug);
  if (!page) notFound();

  return <PromoLanding title={page.title} slug={page.slug} content={{ ...defaultPromoContent, ...page.content }} />;
}



