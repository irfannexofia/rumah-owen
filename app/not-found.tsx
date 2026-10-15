import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-pad flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold tracking-wider text-olive uppercase">Halaman Tidak Ditemukan</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight text-ink md:text-6xl">404</h1>
      <p className="mt-4 max-w-md text-base text-muted">
        Maaf, properti atau halaman yang Anda cari tidak ditemukan atau telah dipindahkan ke katalog terbaru.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
        <Link href="/#properties" className="btn-secondary">
          Lihat Katalog Properti
        </Link>
      </div>
    </main>
  );
}
