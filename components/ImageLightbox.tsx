"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageLightboxProps {
  images: string[];
  title: string;
  className?: string;
}

export function ImageLightbox({ images, title, className = "" }: ImageLightboxProps) {
  const validImages = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % validImages.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + validImages.length) % validImages.length);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, validImages.length]);

  if (validImages.length === 0) return null;

  const openAt = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const next = () => setActiveIndex((index) => (index + 1) % validImages.length);
  const previous = () => setActiveIndex((index) => (index - 1 + validImages.length) % validImages.length);

  return (
    <>
      <button
        type="button"
        onClick={() => openAt(0)}
        className={`group relative block h-full w-full cursor-zoom-in text-left ${className}`}
        aria-label={`Buka galeri gambar ${title}`}
      >
        <Image
          priority
          fill
          src={validImages[0]}
          alt={`${title} - foto utama`}
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="100vw"
        />
        {validImages.length > 1 && (
          <span className="absolute bottom-5 left-5 rounded-full bg-ink/80 px-4 py-2 text-xs font-semibold text-paper backdrop-blur-md">
            Lihat {validImages.length} foto →
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri ${title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30"
            aria-label="Tutup galeri"
          >
            ×
          </button>

          <div className="relative h-[78vh] w-full max-w-6xl">
            <Image
              fill
              priority
              src={validImages[activeIndex]}
              alt={`${title} - foto ${activeIndex + 1}`}
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {validImages.length > 1 && (
            <>
              <button type="button" onClick={previous} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 sm:left-8" aria-label="Foto sebelumnya">‹</button>
              <button type="button" onClick={next} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/30 sm:right-8" aria-label="Foto berikutnya">›</button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
                {activeIndex + 1} / {validImages.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
