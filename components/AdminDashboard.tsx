"use client";

import { FormEvent, useEffect, useState } from "react";

type ContentBlock = {
  id: number;
  key: string;
  title: string;
  content: Record<string, unknown>;
  updatedAt: string;
};

type PromoPage = {
  id: number;
  slug: string;
  title: string;
  isPublished: boolean;
  content: Record<string, unknown>;
  updatedAt: string;
};

const promoTemplate = {
  logoText: "RUMAH_OWEN",
  eyebrow: "Rumah Baru 2 Lantai Siap Huni",
  headline: "Rumah Model 1",
  subheadline: "Dibantu langsung oleh Owen untuk cek promo, ketersediaan unit, dan jadwal kunjungan.",
  location: "Gading Serpong",
  developerText: "Property Consultant · Part of Terra Savana",
  priceLabel: "Harga Mulai",
  priceNumber: "Subject",
  priceSuffix: "to confirmation",
  promoLabel: "Promo / Cicilan",
  promoNumber: "Info",
  promoSuffix: "by WhatsApp",
  heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
  locationImage: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1400&q=80",
  primaryCta: "Ambil Brosur & Info Promo",
  whatsappMessage: "Hi Owen, saya mau tanya promo Rumah Model 1.",
  promoBadges: ["Bisa dibantu cek promo developer", "Bisa jadwalkan kunjungan", "Dibantu bandingkan opsi rumah"],
  specs: {
    landSize: "To be confirmed",
    buildingSize: "To be confirmed",
    bedrooms: "To be confirmed",
    bathrooms: "To be confirmed"
  },
  reasons: [
    {
      title: "Hunian yang Disesuaikan dengan Kebutuhan",
      body: "Owen membantu menyaring pilihan berdasarkan budget, ukuran rumah, lokasi, dan tujuan pembelian."
    }
  ],
  unitTypes: [
    {
      name: "Rumah 2 Lantai",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
      description: "Spesifikasi, harga, dan availability wajib dikonfirmasi."
    }
  ],
  facilities: ["Clubhouse / fasilitas kawasan", "Area hijau", "Akses fasilitas sekitar", "Lingkungan hunian"],
  testimonials: [],
  disclaimer: "Harga, promo, spesifikasi, dan ketersediaan unit wajib dikonfirmasi terlebih dahulu."
};

export function AdminDashboard() {
  const [mode, setMode] = useState<"content" | "promo">("content");
  const [items, setItems] = useState<ContentBlock[]>([]);
  const [promos, setPromos] = useState<PromoPage[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedPromoSlug, setSelectedPromoSlug] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [title, setTitle] = useState("");
  const [json, setJson] = useState("{}");
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadItems();
    loadPromos();
  }, []);

  async function loadItems() {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    const data = await response.json();
    setItems(data.items || []);
    if (!selectedKey && data.items?.[0]) selectItem(data.items[0]);
  }

  async function loadPromos() {
    const response = await fetch("/api/admin/promos", { cache: "no-store" });
    const data = await response.json();
    setPromos(data.items || []);
  }

  function selectItem(item: ContentBlock) {
    setSelectedKey(item.key);
    setKeyValue(item.key);
    setTitle(item.title);
    setJson(JSON.stringify(item.content, null, 2));
    setMessage("");
  }

  function selectPromo(item: PromoPage) {
    setMode("promo");
    setSelectedPromoSlug(item.slug);
    setSelectedKey("");
    setKeyValue(item.slug);
    setTitle(item.title);
    setIsPublished(item.isPublished);
    setJson(JSON.stringify(item.content, null, 2));
    setMessage("");
  }

  function createNewPromo() {
    setMode("promo");
    setSelectedPromoSlug("");
    setSelectedKey("");
    setKeyValue("rumah-model-1");
    setTitle("Rumah Model 1");
    setIsPublished(true);
    setJson(JSON.stringify(promoTemplate, null, 2));
    setMessage("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    let content: Record<string, unknown>;
    try {
      content = JSON.parse(json);
    } catch {
      setMessage("JSON content is invalid.");
      return;
    }

    const isPromo = mode === "promo";
    const isUpdate = isPromo ? Boolean(selectedPromoSlug) : Boolean(selectedKey);
    const response = await fetch(
      isPromo
        ? isUpdate
          ? `/api/admin/promos/${selectedPromoSlug}`
          : "/api/admin/promos"
        : isUpdate
          ? `/api/admin/content/${selectedKey}`
          : "/api/admin/content",
      {
      method: isUpdate ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isPromo ? { slug: keyValue, title, isPublished, content } : { key: keyValue, title, content })
      }
    );

    if (!response.ok) {
      const data = await response.json();
      setMessage(data.message || "Failed to save content.");
      return;
    }

    setMessage("Saved. Cache invalidated automatically.");
    await Promise.all([loadItems(), loadPromos()]);
  }

  async function remove() {
    if (mode === "promo") {
      if (!selectedPromoSlug || !confirm(`Delete promo ${selectedPromoSlug}?`)) return;
      const response = await fetch(`/api/admin/promos/${selectedPromoSlug}`, { method: "DELETE" });
      if (!response.ok) {
        setMessage("Failed to delete promo.");
        return;
      }
      createNewPromo();
      setMessage("Promo deleted. Cache invalidated automatically.");
      await loadPromos();
      return;
    }

    if (!selectedKey || !confirm(`Delete ${selectedKey}?`)) return;
    const response = await fetch(`/api/admin/content/${selectedKey}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Failed to delete content.");
      return;
    }
    setSelectedKey("");
    setKeyValue("");
    setTitle("");
    setJson("{}");
    setMessage("Deleted. Cache invalidated automatically.");
    await loadItems();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="container-pad py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Mini Dashboard</p>
          <h1 className="mt-2 font-serif text-5xl">Content & Promo Config</h1>
          <p className="mt-3 text-muted">Update website content and create per-ad promo landing pages. SQLite + 5-minute cache with automatic invalidation.</p>
        </div>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </div>
      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={() => setMode("content")} className={mode === "content" ? "btn-primary" : "btn-secondary"}>Website Content</button>
        <button onClick={createNewPromo} className={mode === "promo" ? "btn-primary" : "btn-secondary"}>Promo Landing Pages</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        <aside className="card p-4">
          {mode === "content" ? (
            <button
              onClick={() => {
                setSelectedKey("");
                setSelectedPromoSlug("");
                setKeyValue("");
                setTitle("");
                setJson("{}");
              }}
              className="mb-4 w-full rounded-2xl bg-olive px-4 py-3 text-sm font-semibold text-white"
            >
              New Content Block
            </button>
          ) : (
            <button onClick={createNewPromo} className="mb-4 w-full rounded-2xl bg-olive px-4 py-3 text-sm font-semibold text-white">
              New Promo Landing
            </button>
          )}
          <div className="space-y-2">
            {mode === "content"
              ? items.map((item) => (
                  <button key={item.key} onClick={() => selectItem(item)} className={`w-full rounded-2xl border p-4 text-left ${selectedKey === item.key ? "border-olive bg-olive/10" : "border-line bg-white/50"}`}>
                    <div className="font-semibold">{item.key}</div>
                    <div className="mt-1 text-xs text-muted">{item.title}</div>
                  </button>
                ))
              : promos.map((item) => (
                  <button key={item.slug} onClick={() => selectPromo(item)} className={`w-full rounded-2xl border p-4 text-left ${selectedPromoSlug === item.slug ? "border-olive bg-olive/10" : "border-line bg-white/50"}`}>
                    <div className="font-semibold">/promo/{item.slug}</div>
                    <div className="mt-1 text-xs text-muted">{item.title} · {item.isPublished ? "Published" : "Draft"}</div>
                  </button>
                ))}
          </div>
        </aside>
        <form onSubmit={save} className="card space-y-4 p-5">
          <label className="block text-sm font-semibold text-muted">
            {mode === "promo" ? "Promo Slug" : "Key"}
            <input value={keyValue} onChange={(event) => setKeyValue(event.target.value)} disabled={mode === "promo" ? Boolean(selectedPromoSlug) : Boolean(selectedKey)} required className="mt-2 w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-ink outline-none focus:border-olive disabled:text-muted" />
            {mode === "promo" ? <span className="mt-2 block text-xs font-normal text-muted">URL: /promo/{keyValue || "slug"}</span> : null}
          </label>
          <label className="block text-sm font-semibold text-muted">
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required className="mt-2 w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-ink outline-none focus:border-olive" />
          </label>
          {mode === "promo" ? (
            <label className="flex items-center gap-3 rounded-2xl border border-line bg-white/60 p-4 text-sm font-semibold text-muted">
              <input type="checkbox" checked={isPublished} onChange={(event) => setIsPublished(event.target.checked)} />
              Published
            </label>
          ) : null}
          <label className="block text-sm font-semibold text-muted">
            Content JSON
            <textarea value={json} onChange={(event) => setJson(event.target.value)} rows={18} className="mt-2 w-full rounded-2xl border border-line bg-[#151515] px-4 py-3 font-mono text-sm text-paper outline-none focus:border-olive" />
          </label>
          {message ? <p className="rounded-2xl bg-white/70 p-4 text-sm text-olive">{message}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="btn-primary">{mode === "promo" ? (selectedPromoSlug ? "Update Promo" : "Create Promo") : selectedKey ? "Update Content" : "Create Content"}</button>
            {(mode === "promo" ? selectedPromoSlug : selectedKey) ? <button type="button" onClick={remove} className="btn-secondary">Delete</button> : null}
            {mode === "promo" && selectedPromoSlug ? <a href={`/promo/${selectedPromoSlug}`} target="_blank" className="btn-secondary">Open Landing Page</a> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
