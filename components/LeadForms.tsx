"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { site } from "@/data/site";

const inputClass = "w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-olive";

export function PropertySearch({
  onFilterChange
}: {
  onFilterChange?: (filters: {
    category: string;
    location: string;
    budget: string;
    developer: string;
    keyword: string;
  }) => void;
}) {
  const [category, setCategory] = useState("Semua Tipe");
  const [location, setLocation] = useState("Semua Kawasan");
  const [budget, setBudget] = useState("Semua Budget");
  const [developer, setDeveloper] = useState("Semua Developer");
  const [keyword, setKeyword] = useState("");

  function handleSearch(e?: FormEvent) {
    if (e) e.preventDefault();
    trackEvent("Search", { category, location, budget, developer, keyword });
    if (onFilterChange) {
      onFilterChange({ category, location, budget, developer, keyword });
    } else {
      window.dispatchEvent(
        new CustomEvent("property-filter", {
          detail: { category, location, budget, developer, keyword }
        })
      );
      const target = document.getElementById("properties");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function handleReset() {
    setCategory("Semua Tipe");
    setLocation("Semua Kawasan");
    setBudget("Semua Budget");
    setDeveloper("Semua Developer");
    setKeyword("");
    const resetFilters = {
      category: "Semua Tipe",
      location: "Semua Kawasan",
      budget: "Semua Budget",
      developer: "Semua Developer",
      keyword: ""
    };
    if (onFilterChange) {
      onFilterChange(resetFilters);
    } else {
      window.dispatchEvent(new CustomEvent("property-filter", { detail: resetFilters }));
    }
  }

  return (
    <section className="container-pad mt-8 relative z-10">
      <div className="card p-5 md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Mesin Pencari Properti</p>
            <h2 className="mt-2 font-serif text-3xl">Temukan Rumah, Ruko, Studio Loft, & Kavling</h2>
            <p className="mt-1 text-sm text-muted">
              Pilihan lengkap dari Paramount, Summarecon, Sinar Mas, Lippo, CGS, dan Alam Sutera.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary text-xs px-4 py-2.5"
            >
              Reset Filter
            </button>
            <button
              type="button"
              onClick={() => handleSearch()}
              className="btn-primary text-xs px-5 py-2.5"
            >
              Cari Sekarang
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-sm font-semibold text-muted">
            Kategori / Tipe
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className={`${inputClass} mt-2 text-ink`}
              aria-label="Kategori Properti"
            >
              <option value="Semua Tipe">Semua Tipe Properti</option>
              <option value="Residential">🏡 Rumah Residensial</option>
              <option value="Ruko">🏬 Ruko (2M - 5M)</option>
              <option value="Studio Loft">🏢 Studio Loft</option>
              <option value="Business Loft">🏢 Business Loft</option>
              <option value="Kavling Komersial">🏗️ Kavling Komersial</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-muted">
            Kawasan
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className={`${inputClass} mt-2 text-ink`}
              aria-label="Kawasan"
            >
              <option value="Semua Kawasan">Semua Kawasan</option>
              <option value="Gading Serpong">Gading Serpong</option>
              <option value="BSD">BSD City</option>
              <option value="Alam Sutera">Alam Sutera</option>
              <option value="Karawaci">Karawaci</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-muted">
            Rentang Budget
            <select
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
              }}
              className={`${inputClass} mt-2 text-ink`}
              aria-label="Rentang Budget"
            >
              <option value="Semua Budget">Semua Budget</option>
              <optgroup label="🏡 Rumah Residensial">
                <option value="Rumah 1-2M">Rumah Rp1 M – Rp2 M</option>
                <option value="Rumah 3-4M">Rumah Rp3 M – Rp4 M-an</option>
                <option value="Rumah 5-7M">Rumah Rp5 M – Rp7 M-an</option>
                <option value="Rumah 9-20M">Rumah Mewah Rp9 M – Rp20 M+</option>
              </optgroup>
              <optgroup label="🏬 Komersial & Bisnis">
                <option value="Ruko 2M">Ruko Rp2 M-an</option>
                <option value="Ruko 3M">Ruko Rp3 M-an</option>
                <option value="Ruko 4-5M">Ruko Rp4 M – Rp5 M</option>
                <option value="Loft 6-10M">Studio Loft (Rp6 M - Rp10 M)</option>
                <option value="Loft > 10M">Business Loft (&gt; Rp10 M)</option>
                <option value="Kavling">Kavling Komersial (Per Meter)</option>
              </optgroup>
            </select>
          </label>

          <label className="text-sm font-semibold text-muted">
            Developer
            <select
              value={developer}
              onChange={(e) => {
                setDeveloper(e.target.value);
              }}
              className={`${inputClass} mt-2 text-ink`}
              aria-label="Developer"
            >
              <option value="Semua Developer">Semua Developer</option>
              <option value="Paramount">Paramount Land</option>
              <option value="Summarecon">Summarecon Serpong</option>
              <option value="Sinarmas">Sinar Mas Land</option>
              <option value="Lippo">Lippo Land</option>
              <option value="CGS">Citra Garden Serpong</option>
              <option value="Alam Sutera">Alam Sutera</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-muted">
            Kata Kunci Nama
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cth: Matera, Eonna, Terravia, Hudson..."
                className={`${inputClass} text-ink`}
              />
            </div>
          </label>
        </form>

        {/* Quick shortcut tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-line/60 text-xs">
          <span className="font-semibold text-muted">Pilihan Cepat:</span>
          {[
            { label: "🏡 Rumah 1-2M", cat: "Residential", bud: "Rumah 1-2M" },
            { label: "🏡 Rumah 3-4M", cat: "Residential", bud: "Rumah 3-4M" },
            { label: "🏡 Rumah 5-7M", cat: "Residential", bud: "Rumah 5-7M" },
            { label: "🏡 Rumah Mewah 9-20M", cat: "Residential", bud: "Rumah 9-20M" },
            { label: "🏬 Ruko 2M", cat: "Ruko", bud: "Ruko 2M" },
            { label: "🏬 Ruko 3M", cat: "Ruko", bud: "Ruko 3M" },
            { label: "🏬 Ruko 4-5M", cat: "Ruko", bud: "Ruko 4-5M" },
            { label: "🏢 Studio Loft", cat: "Studio Loft", bud: "Semua Budget" },
            { label: "🏢 Business Loft", cat: "Business Loft", bud: "Semua Budget" },
            { label: "🏗️ Kavling Komersial", cat: "Kavling Komersial", bud: "Kavling" }
          ].map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => {
                setCategory(tag.cat);
                setBudget(tag.bud);
                const filter = {
                  category: tag.cat,
                  location,
                  budget: tag.bud,
                  developer,
                  keyword
                };
                if (onFilterChange) onFilterChange(filter);
                window.dispatchEvent(new CustomEvent("property-filter", { detail: filter }));
                const target = document.getElementById("properties");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-paper px-3 py-1.5 font-medium border border-line hover:border-olive hover:text-olive transition"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MatchingForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("PropertyMatchSubmit");
    trackEvent("Lead", { form: "property_matching" });
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="card p-8 text-lg text-olive">Thank you. Owen will review your requirements and contact you through WhatsApp.</div>;
  }

  return (
    <form onSubmit={submit} onFocus={() => trackEvent("PropertyMatchStart")} className="card grid gap-4 p-5 md:grid-cols-2 md:p-8">
      {["Preferred location", "Budget", "Land size", "Building size", "Bedrooms", "Bathrooms", "Preferred timeline", "WhatsApp number"].map((field) => (
        <input key={field} required={field === "WhatsApp number"} className={inputClass} placeholder={field} />
      ))}
      <select className={inputClass} defaultValue="">
        <option value="" disabled>Tipe Properti Komersial / Residensial</option>
        <option>Rumah Tinggal (1M - 20M+)</option>
        <option>Ruko / Shophouse</option>
        <option>Studio Loft</option>
        <option>Business Loft</option>
        <option>Kavling Komersial</option>
        <option>Open to both</option>
      </select>
      <select className={inputClass} defaultValue="">
        <option value="" disabled>Purpose</option>
        <option>Tempat Tinggal Keluarga</option>
        <option>Buka Usaha Sendiri</option>
        <option>Investasi / Disewakan</option>
        <option>Kantor Perusahaan</option>
      </select>
      <button className="btn-primary md:col-span-2">Find My Property</button>
    </form>
  );
}

export function VisitForm({ property = "" }: { property?: string }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("ScheduleVisit");
    trackEvent("FormSubmit", { form: "schedule_visit" });
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      {["Name", "WhatsApp", "Property", "Preferred date", "Preferred time"].map((field) => (
        <input key={field} required className={inputClass} placeholder={field} defaultValue={field === "Property" ? property : ""} />
      ))}
      <button className="btn-primary sm:col-span-2">Schedule a Visit</button>
    </form>
  );
}

export function PromoLeadForm({ source = "promo" }: { source?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const whatsapp = String(data.get("whatsapp") || "");
    const budget = String(data.get("budget") || "");
    const payment = String(data.get("payment") || "");
    trackEvent("Lead", { form: "promo_lead", source, name, whatsapp, budget, payment });
    const message = `Halo Owen, saya ${name}. Nomor WhatsApp: ${whatsapp}. Budget properti: ${budget}. Rencana pembayaran: ${payment}. Sumber: ${source}.`;
    const whatsappWindow = window.open("about:blank", "_blank");
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, budget, payment, source })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal mengirim form.");
      trackEvent("LeadSaved", { form: "promo_lead", source });
      if (whatsappWindow) {
        whatsappWindow.location.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
      }
      setSubmitted(true);
    } catch (submitError) {
      whatsappWindow?.close();
      setError(submitError instanceof Error ? submitError.message : "Gagal mengirim form. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }
  if (submitted) return <div className="rounded-2xl bg-paper p-5 text-olive">Terima kasih. WhatsApp Owen sudah dibuka untuk melanjutkan konsultasi.</div>;
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-white p-5 shadow-xl md:p-7">
      <input name="name" required className={inputClass} placeholder="Nama Lengkap" />
      <input name="whatsapp" required className={inputClass} placeholder="Nomor WhatsApp" inputMode="tel" />
      <fieldset className="border-0 p-0">
        <legend className="mb-2 text-sm font-semibold text-ink">Budget Properti</legend>
        {["Rp800 juta – Rp2 miliar", "Rp2 – 5 miliar", "Rp5 – 10 miliar", "Rp10 – 30 miliar", "Rp30 – 90 miliar"].map((option, index) => (
          <label key={option} className="flex items-center gap-3 py-2 text-sm text-ink">
            <input type="radio" name="budget" value={option} defaultChecked={index === 0} required className="h-5 w-5 accent-olive" />{option}
          </label>
        ))}
      </fieldset>
      <fieldset className="border-0 border-t border-line/70 pt-4">
        <legend className="mb-2 text-sm font-semibold text-ink">Rencana Pembayaran</legend>
        {["KPR", "Cash / Cash Bertahap", "Belum menentukan"].map((option, index) => (
          <label key={option} className="flex items-center gap-3 py-2 text-sm text-ink">
            <input type="radio" name="payment" value={option} defaultChecked={index === 0} required className="h-5 w-5 accent-olive" />{option}
          </label>
        ))}
      </fieldset>
      {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
      <button disabled={isSubmitting} className="w-full rounded-full bg-olive px-5 py-4 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Mengirim…" : "Dapatkan Info via WhatsApp"}</button>
    </form>
  );
}
