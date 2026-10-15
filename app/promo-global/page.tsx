import { PromoLanding } from "@/components/PromoLanding";
import { defaultPromoContent } from "@/lib/promo-defaults";

export const metadata = {
  title: "Cari Rumah yang Sesuai Kebutuhan | Rumah_Owen",
  description: "Konsultasi pilihan rumah di BSD, Gading Serpong, Alam Sutera, dan Karawaci."
};

export default function GlobalPromoPage() {
  return (
    <PromoLanding
      title="Cari Rumah yang Sesuai Kebutuhan"
      slug="promo-global"
      content={{
        ...defaultPromoContent,
        eyebrow: "Rumah dengan Value terbaik untuk semua keluarga.",
        headline: "Hitungan Transparan tanpa Biaya tak terduga.",
        subheadline: "Dibantu langsung oleh Owen untuk cek promo, ketersediaan unit, hitung angsuran, dan jadwal kunjungan.",
        location: "Lippo Karawaci · Alam Sutera · Gading Serpong · BSD City",
        developerText: "Property Consultant",
        primaryCta: "Konsultasi Sekarang",
        promoBadges: ["Pilihan rumah lintas developer", "Disesuaikan dengan penghasilan", "Bisa jadwalkan survey"]
      }}
    />
  );
}
