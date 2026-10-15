"use client";

import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/data/site";
import { trackEvent } from "@/lib/tracking";

export function Header() {
  const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Owen, saya ingin konsultasi properti.")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
      <div className="container-pad flex h-24 items-center justify-between gap-6 py-2">
        <Link href="/" aria-label={site.name} className="flex items-center transition-transform hover:opacity-90">
          <Image
            src={site.logo}
            alt={site.name}
            width={240}
            height={80}
            priority
            className="h-16 md:h-18 w-auto object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="transition hover:text-ink">
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
