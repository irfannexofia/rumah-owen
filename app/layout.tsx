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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;
n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');fbq('init','952462847483804');fbq('track','PageView');`
          }}
        />
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=952462847483804&ev=PageView&noscript=1" alt="" /></noscript>
        <TrackingProvider />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

