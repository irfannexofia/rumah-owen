import { commercialProperties, PropertyItem } from "./commercial";
import { residentialHouses } from "./residential";
import { catalogProperties } from "./catalog-import";

export const site = {
  name: "Rumah_Owen",
  wordmark: "RUMAH_OWEN",
  logo: "/logo/rumah-owen-logo.png",
  domain: "https://rumah-owen.com",
  tagline: "Property Consultant · Part of Terra Savana",
  description:
    "Rumah_Owen adalah personal property brand Owen, property consultant yang membantu pembeli menemukan rumah (1M-20M+), ruko (2M-5M), studio loft, business loft, dan kavling komersial di Gading Serpong, BSD, Alam Sutera, dan Karawaci.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288214397464",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@rumah-owen.com"
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Katalog Properti", href: "/#properties" },
  { label: "Property Matching", href: "/#matching" },
  { label: "Areas", href: "/#areas" },
  { label: "Developers", href: "/#developers" },
  { label: "Insights", href: "/#insights" },
  { label: "About Owen", href: "/#about" }
];

export const areaData = [
  {
    slug: "gading-serpong",
    name: "Gading Serpong",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    summary: "Kawasan residensial & komersial matang dengan pilihan ruko ramai, studio loft, dan hunian keluarga berkelas.",
    characteristics: "Cluster modern, ruko kuliner ramai, hunian sultan Matera, pilihan primary dan secondary."
  },
  {
    slug: "bsd",
    name: "BSD",
    image: "/properties/bsd/eonna-elyon-8-frontal.jpg",
    summary: "Kota mandiri terlengkap dengan proyek rumah baru inovatif, business loft premium, dan kavling komersial CBD.",
    characteristics: "Township living, NavaPark botanic estate, Eonna Korean villa, ruko modern boulevard."
  },
  {
    slug: "alam-sutera",
    name: "Alam Sutera",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    summary: "Lingkungan hijau asri dengan cluster mansion mewah Gramercy, gedung kantor The Domain, dan akses tol langsung.",
    characteristics: "Hunian established, The Gramercy, cluster eksklusif, green tunnel, lingkungan tenang."
  },
  {
    slug: "karawaci",
    name: "Karawaci",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    summary: "Ekosistem mapan Lippo Karawaci dan township baru Park Serpong dengan pilihan ruko dan rumah terjangkau.",
    characteristics: "Rumah keluarga, Park Serpong, akses fasilitas lengkap, pilihan investasi strategis."
  }
];

export const developers = [
  { name: "Sinar Mas Land", logo: "/developers/sinar-mas-land.png" },
  { name: "Lippo Land", logo: "/developers/lippo-land.webp" },
  { name: "Ciputra", logo: "/developers/ciputra.webp" },
  { name: "Summarecon", logo: "/developers/summarecon-agung.svg" },
  { name: "Paramount Land", logo: "/developers/paramount-land.webp" },
  { name: "Alam Sutera", logo: "/developers/alam-sutera.png" }
];

// Deduplikasi: hapus entry placeholder lama untuk cluster yang sudah di-cover detail dari file CSV
const supersededTitles = ["Izzi", "Vireya", "Castillo", "Eonna", "Eonna Grand Mansion"];
const cleanedResidentialHouses = residentialHouses.filter(
  (house) => !supersededTitles.includes(house.title)
);

// Gabungan listing: data detail CSV diutamakan di depan + listing residensial lainnya + komersial
export const propertyPlaceholders: PropertyItem[] = [
  ...catalogProperties,
  ...cleanedResidentialHouses,
  ...commercialProperties
];

export { commercialProperties, residentialHouses, catalogProperties };
export type { PropertyItem };

export const insights = [
  {
    slug: "investasi-ruko-gading-serpong-dan-bsd",
    title: "Peluang Emas Investasi Ruko di Koridor Gading Serpong & BSD City",
    description: "Kupas tuntas potensi yield sewa dan capital gain ruko 2M - 5M hingga studio loft komersial.",
    date: "2026-09-24"
  },
  {
    slug: "kavling-komersial-tangerang-pilihan-terbaik",
    title: "Panduan Memilih Kavling Komersial Siap Bangun di Tangerang",
    description: "Perbandingan harga permeter kavling komersial Paramount, Summarecon, Sinar Mas, Lippo, dan CGS.",
    date: "2026-09-24"
  },
  {
    slug: "panduan-memilih-rumah-keluarga-dan-sultan",
    title: "Panduan Memilih Rumah Idaman di Tangerang: Dari 1M Hingga Hunian Mewah 20M+",
    description: "Rekomendasi cluster terbaik mulai dari milenial home (1-2M), family cluster (3-4M), luxury resort (5-7M), hingga mansion sultan (9-20M+).",
    date: "2026-09-24"
  }
];
