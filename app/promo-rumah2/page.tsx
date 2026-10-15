import { PromoLanding } from "@/components/PromoLanding";
import { defaultPromoContent } from "@/lib/promo-defaults";

export default function PromoRumah2Page() {
  return <PromoLanding title="Promo Rumah 2" slug="promo-rumah2" content={{ ...defaultPromoContent, eyebrow: "Rumah dengan Value terbaik untuk semua keluarga.", headline: "Hitungan Transparan tanpa Biaya tak terduga.", subheadline: "Dibantu langsung oleh Owen untuk cek promo, ketersediaan unit, hitung angsuran, dan jadwal kunjungan.", location: "Lippo Karawaci · Alam Sutera · Gading Serpong · BSD City", developerText: "Property Consultant", priceNumber: "2M+" }} />;
}
