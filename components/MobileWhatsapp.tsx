"use client";

import { site } from "@/data/site";
import { trackEvent } from "@/lib/tracking";

export function MobileWhatsapp() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Owen, saya ingin konsultasi properti.")}`}
      onClick={() => trackEvent("WhatsAppClick", { placement: "mobile_sticky" })}
      className="fixed bottom-4 left-4 right-4 z-50 rounded-full bg-olive px-6 py-4 text-center text-sm font-semibold text-white shadow-soft sm:hidden"
    >
      Consult with Owen on WhatsApp
    </a>
  );
}
