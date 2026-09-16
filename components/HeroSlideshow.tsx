"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/promo/home-hero-1.png",
  "/promo/home-hero-2.png",
  "/promo/home-hero-3.jpg"
];

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <Image
          key={image}
          priority={index === 0}
          fill
          src={image}
          alt="Premium residential property"
          className={`object-cover transition-opacity duration-1000 ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
