export const site = {
  name: "Rumah_Owen",
  wordmark: "RUMAH_OWEN",
  domain: "https://rumah-owen.com",
  tagline: "Property Consultant · Part of Terra Savana",
  description:
    "Rumah_Owen adalah personal property brand Owen, property consultant yang membantu pembeli menemukan rumah di Gading Serpong, BSD, Alam Sutera, dan Karawaci.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6280000000000",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@rumah-owen.com"
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/#properties" },
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
    summary: "Kawasan residensial matang dengan pilihan rumah keluarga, cluster, dan akses fasilitas perkotaan.",
    characteristics: "Cluster modern, rumah keluarga, lingkungan aktif, pilihan primary dan secondary."
  },
  {
    slug: "bsd",
    name: "BSD",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    summary: "Area kota mandiri dengan banyak pilihan proyek baru, hunian keluarga, dan fasilitas urban.",
    characteristics: "New project, township living, rumah premium, pilihan investasi jangka panjang."
  },
  {
    slug: "alam-sutera",
    name: "Alam Sutera",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    summary: "Lingkungan residensial terencana dengan karakter tenang, rapi, dan nyaman untuk keluarga.",
    characteristics: "Hunian established, cluster eksklusif, secondary property, lingkungan hijau."
  },
  {
    slug: "karawaci",
    name: "Karawaci",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    summary: "Kawasan hunian dengan ekosistem fasilitas lengkap dan pilihan rumah di berbagai segmen.",
    characteristics: "Rumah keluarga, akses fasilitas, pilihan secondary, area residensial mapan."
  }
];

export const developers = ["Sinar Mas Land", "Lippo Land", "Ciputra", "Summarecon", "Paramount Land", "Alam Sutera"];

export const propertyPlaceholders = [
  {
    slug: "modern-2-storey-house-placeholder",
    title: "Modern 2-Storey House",
    location: "Gading Serpong",
    price: "Rp2.8 M",
    landSize: "LT 90 m²",
    buildingSize: "LB 120 m²",
    bedrooms: "4 Bedrooms",
    bathrooms: "3 Bathrooms",
    type: "Secondary Property",
    developer: "Developer/project information to be confirmed",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80"
  },
  {
    slug: "bsd-new-project-placeholder",
    title: "New Project Family Home",
    location: "BSD",
    price: "Price on confirmation",
    landSize: "Land size to be confirmed",
    buildingSize: "Building size to be confirmed",
    bedrooms: "3+ Bedrooms",
    bathrooms: "2+ Bathrooms",
    type: "New Project",
    developer: "Selected developer project",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    slug: "alam-sutera-residence-placeholder",
    title: "Established Cluster Residence",
    location: "Alam Sutera",
    price: "Subject to confirmation",
    landSize: "LT placeholder",
    buildingSize: "LB placeholder",
    bedrooms: "4 Bedrooms",
    bathrooms: "3 Bathrooms",
    type: "Secondary Property",
    developer: "Not applicable / to be confirmed",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80"
  }
];

export const insights = [
  {
    slug: "rumah-rp2-miliar-di-gading-serpong",
    title: "Rumah Rp2 Miliar di Gading Serpong: Apa Saja Pilihannya?",
    description: "Panduan awal memahami pilihan rumah di Gading Serpong pada kisaran budget Rp2 miliar.",
    date: "2026-09-16"
  },
  {
    slug: "bsd-vs-gading-serpong",
    title: "BSD vs Gading Serpong: Memahami Karakter Masing-Masing Area",
    description: "Perbandingan karakter area untuk membantu menentukan lokasi hunian yang sesuai kebutuhan.",
    date: "2026-09-16"
  },
  {
    slug: "panduan-memilih-rumah-untuk-keluarga-di-tangerang",
    title: "Panduan Memilih Rumah untuk Keluarga di Tangerang",
    description: "Faktor yang perlu dipertimbangkan sebelum memilih rumah untuk keluarga.",
    date: "2026-09-16"
  }
];
