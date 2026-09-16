"use client";

import Link from "next/link";
import { nav, site } from "@/data/site";
import { trackEvent } from "@/lib/tracking";

export function Header() {
  const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Owen, saya ingin konsultasi properti.")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
      <div className="container-pad flex h-20 items-center justify-between gap-6">
        <Link href="/" className="leading-none">
          <div className="text-lg font-semibold tracking-[0.18em]">{site.wordmark}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            Property Consultant · Part of Terra Savana
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={waUrl}
          onClick={() => trackEvent("WhatsAppClick", { placement: "header" })}
          className="btn-primary hidden sm:inline-flex"
        >
          Consult with Owen
        </a>
      </div>
    </header>
  );
}
