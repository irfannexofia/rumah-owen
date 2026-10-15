import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-pad grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={site.name} className="inline-block transition-transform hover:opacity-90">
            <Image
              src={site.logo}
              alt={site.name}
              width={220}
              height={80}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-md text-sm text-paper/70">
            Property Consultant · Part of Terra Savana. Gading Serpong · BSD · Alam Sutera · Karawaci.
          </p>
        </div>
        <div className="space-y-2 text-sm text-paper/70">
          <div className="font-semibold text-paper">Contact</div>
          <a className="block hover:text-white" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>
          <a className="block hover:text-white" href={site.instagram}>Instagram</a>
          <a className="block hover:text-white" href={`mailto:${site.email}`}>Email</a>
        </div>
        <div className="space-y-2 text-sm text-paper/70">
          <div className="font-semibold text-paper">Legal</div>
          <Link className="block hover:text-white" href="/privacy-policy">Privacy Policy</Link>
          <Link className="block hover:text-white" href="/terms">Terms & Conditions</Link>
          <Link className="block hover:text-white" href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
