"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/tracking";

type PromoContent = {
  logoText?: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  location?: string;
  developerText?: string;
  developerLogo?: string;
  priceLabel?: string;
  priceNumber?: string;
  priceSuffix?: string;
  promoLabel?: string;
  promoNumber?: string;
  promoSuffix?: string;
  heroImage?: string;
  locationImage?: string;
  primaryCta?: string;
  whatsappMessage?: string;
  promoBadges?: string[];
  specs?: Record<string, string>;
  reasons?: { title: string; body: string }[];
  unitTypes?: { name: string; image: string; description: string }[];
  facilities?: string[];
  testimonials?: { name: string; body: string }[];
  disclaimer?: string;
};

const inputClass = "w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-ink outline-none focus:border-olive";

export function PromoLanding({ title, slug, content }: { title: string; slug: string; content: PromoContent }) {
  const [submitted, setSubmitted] = useState(false);
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(content.whatsappMessage || `Hi Owen, saya mau tanya promo ${title}.`)}`;

  useEffect(() => {
    trackEvent("ViewContent", { content_type: "promo_landing", slug, title });
  }, [slug, title]);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("FormSubmit", { form: "promo_brochure", slug });
    trackEvent("Lead", { source: "promo_landing", slug });
    setSubmitted(true);
  }

  return (
    <main className="bg-paper font-sans text-ink">
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0">
          <Image priority fill src={content.heroImage || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"} alt={content.headline || title} className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto grid min-h-[760px] max-w-6xl gap-8 px-5 py-8 md:grid-cols-[1fr_390px] md:px-8">
          <div>
            <div className="inline-flex rounded-full bg-paper px-5 py-3 text-sm font-semibold tracking-[0.18em] text-olive">
              {content.logoText || "RUMAH_OWEN"}
            </div>
            <div className="mt-16 max-w-2xl">
              {content.developerLogo ? (
                <div className="mb-8 inline-flex rounded-2xl bg-white/90 p-4 shadow-soft">
                  <Image src={content.developerLogo} alt={content.developerText || "Developer logo"} width={260} height={80} className="h-12 w-auto object-contain" />
                </div>
              ) : null}
              <p className="text-2xl font-medium leading-tight md:text-3xl">{content.eyebrow}</p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">{content.headline || title}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-paper/80">{content.subheadline}</p>
              <p className="mt-4 text-base font-semibold text-paper/75">{content.location} - {content.developerText}</p>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 text-center text-paper">
              <div className="pr-6">
                <p className="text-xl font-semibold drop-shadow">{content.priceLabel}</p>
                <div className="mt-3 flex items-end justify-center gap-2">
                  <span className="text-7xl font-semibold leading-none text-[#f2bd4b] drop-shadow md:text-8xl">{content.priceNumber}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold drop-shadow">{content.priceSuffix}</p>
              </div>
              <div className="border-l border-paper/70 pl-6">
                <p className="text-xl font-semibold drop-shadow">{content.promoLabel}</p>
                <div className="mt-3 flex items-end justify-center gap-2">
                  <span className="text-7xl font-semibold leading-none text-[#45a39b] drop-shadow md:text-8xl">{content.promoNumber}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold drop-shadow">{content.promoSuffix}</p>
              </div>
            </div>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              {(content.promoBadges || []).map((badge) => (
                <div key={badge} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/20">- {badge}</div>
              ))}
            </div>
          </div>

          <div className="self-center rounded-[2rem] border border-line bg-paper p-6 text-ink shadow-soft">
            <h2 className="font-serif text-3xl text-olive">Ambil Brosur, Promo, & Info Rumah</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Isi form singkat ini. Owen akan menghubungi Anda via WhatsApp.</p>
            {submitted ? (
              <div className="mt-5 rounded-2xl bg-white/80 p-5 text-sm font-semibold text-olive">Terima kasih. Owen akan review kebutuhan Anda dan menghubungi via WhatsApp.</div>
            ) : (
              <form onSubmit={submitLead} className="mt-5 space-y-3">
                <input className={inputClass} required placeholder="Name" />
                <input className={inputClass} required placeholder="No. WhatsApp (+62812345678)" />
                <input className={inputClass} placeholder="Email" type="email" />
                <input className={inputClass} placeholder="Kota Domisili" />
                <button className="w-full rounded-full bg-olive px-5 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-ink">
                  {content.primaryCta || "Ambil Brosur Rumah"}
                </button>
              </form>
            )}
            <a
              href={whatsappUrl}
              onClick={() => {
                trackEvent("WhatsAppClick", { placement: "promo_form", slug });
                trackEvent("Lead", { source: "promo_whatsapp", slug });
              }}
              className="mt-3 flex w-full items-center justify-center rounded-full border border-olive px-5 py-4 text-sm font-semibold uppercase tracking-wide text-olive transition hover:bg-olive hover:text-white"
            >
              Chat WhatsApp Sekarang
            </a>
            <p className="mt-4 text-xs leading-5 text-muted">{content.disclaimer}</p>
          </div>
        </div>
      </section>

      <section className="bg-white/45 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_1fr] md:px-8">
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-soft">
            <Image fill src={content.locationImage || content.heroImage || "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1400&q=80"} alt="Lokasi promo properti" className="object-cover" />
          </div>
          <div className="self-center">
            <p className="eyebrow">Lokasi & Konsultasi</p>
            <h2 className="mt-3 font-serif text-5xl leading-tight text-ink">Bantu Pilih Rumah yang Sesuai Kebutuhan Anda</h2>
            <p className="mt-5 text-lg leading-8 text-muted">Owen membantu membandingkan pilihan rumah berdasarkan lokasi, budget, ukuran, kebutuhan keluarga, dan ketersediaan listing terbaru.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {Object.entries(content.specs || {}).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-line bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase text-muted">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-1 font-semibold text-olive">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="text-center">
          <p className="eyebrow">Kenapa Konsultasi dengan Owen?</p>
          <h2 className="mt-3 font-serif text-5xl text-ink">Satu Konsultan untuk Banyak Pilihan Properti</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(content.reasons || []).map((reason) => (
            <div key={reason.title} className="rounded-[2rem] border border-line bg-white/60 p-7 shadow-soft">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-xl font-semibold text-white">+</div>
              <h3 className="text-xl font-semibold text-ink">{reason.title}</h3>
              <p className="mt-3 leading-7 text-muted">{reason.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-olive py-16 text-white">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-paper/70">Pilihan Unit</p>
            <h2 className="mt-3 font-serif text-5xl">Tipe Rumah / Listing Promo</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {(content.unitTypes || []).map((unit) => (
              <div key={unit.name} className="overflow-hidden rounded-[2rem] bg-paper text-ink shadow-soft">
                <div className="relative h-64">
                  <Image fill src={unit.image} alt={unit.name} className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-ink">{unit.name}</h3>
                  <p className="mt-3 leading-7 text-muted">{unit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="text-center">
          <p className="eyebrow">Fasilitas & Keunggulan</p>
          <h2 className="mt-3 font-serif text-5xl text-ink">Informasi yang Bisa Dibahas Saat Konsultasi</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(content.facilities || []).map((facility) => (
            <div key={facility} className="rounded-2xl border border-line bg-white/60 p-5 text-center font-semibold text-ink">- {facility}</div>
          ))}
        </div>
      </section>

      {(content.testimonials || []).length ? (
        <section className="bg-white/45 py-16">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="text-center font-serif text-5xl text-ink">Apa Kata Mereka</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(content.testimonials || []).map((testimonial) => (
                <div key={testimonial.name} className="rounded-[2rem] bg-white/70 p-6 shadow-soft">
                  <p className="leading-7 text-muted">"{testimonial.body}"</p>
                  <p className="mt-5 font-semibold text-ink">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-olive px-5 py-16 text-center text-white">
        <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-tight">Siap cek promo dan jadwalkan kunjungan?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">Chat Owen untuk konfirmasi harga, promo, ketersediaan unit, dan opsi rumah lain yang sesuai kebutuhan Anda.</p>
        <a href={whatsappUrl} onClick={() => trackEvent("WhatsAppClick", { placement: "promo_final", slug })} className="mt-8 inline-flex rounded-full bg-paper px-8 py-4 text-sm font-semibold uppercase tracking-wide text-olive">
          Chat Owen di WhatsApp
        </a>
      </section>

      <a href={whatsappUrl} onClick={() => trackEvent("WhatsAppClick", { placement: "promo_sticky_mobile", slug })} className="fixed bottom-4 left-4 right-4 z-50 rounded-full bg-olive px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-2xl md:hidden">
        Chat WhatsApp Owen
      </a>
    </main>
  );
}
