import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/properties/rumah-izzi-sinarmas", destination: "/properties/izzi-tipe-5x11", permanent: true },
      { source: "/properties/rumah-vireya-sinarmas", destination: "/properties/vireya-tipe-5x12", permanent: true },
      { source: "/properties/rumah-eonna-sinarmas-5-7m", destination: "/properties/eonna-tipe-8", permanent: true },
      { source: "/properties/rumah-eonna-sinarmas-sultan", destination: "/properties/eonna-tipe-10", permanent: true }
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d31cdpyzwzpz7u.cloudfront.net" },
      { protocol: "https", hostname: "www.sinarmasland.com" },
      { protocol: "https", hostname: "ecatalog.sinarmasland.com" },
      { protocol: "https", hostname: "navapark.id" },
      { protocol: "https", hostname: "images-residence.summarecon.com" }
    ]
  }
};

export default nextConfig;
