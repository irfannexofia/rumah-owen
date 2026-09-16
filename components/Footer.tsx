import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-pad grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="text-xl font-semibold tracking-[0.18em]">{site.wordmark}</div>
          <p className="mt-3 max-w-md text-sm text-paper/70">
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
