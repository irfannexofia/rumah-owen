import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { TrackingProvider } from "@/components/TrackingProvider";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Rumah_Owen â€” Property Consultant, Part of Terra Savana",
    template: "%s | Rumah_Owen"
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rumah_Owen â€” Property Consultant, Part of Terra Savana",
    description: site.description,
    url: site.domain,
    siteName: "Rumah_Owen",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumah_Owen â€” Property Consultant",
    description: site.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <TrackingProvider />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

