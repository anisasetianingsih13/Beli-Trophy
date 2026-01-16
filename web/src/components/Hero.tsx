import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 py-20 lg:px-24 bg-gradient-to-br from-white to-yellow-50">
        <div className="md:w-1/2 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
            Trophy & Award No. 1 di Lampung
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Abadikan <span className="text-yellow-600">Prestasi</span> Terbaik Anda
          </h1>

          <p className="text-gray-600 mt-6 text-lg max-w-lg mx-auto md:mx-0">
            Penyedia trophy, medali, dan vandel berkualitas tinggi dengan desain kustom sesuai keinginan Anda.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            {/* LINK KE HALAMAN PRODUK */}
            <Link href="/product">
              <button className="bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition-all">
                Lihat Katalog
              </button>
            </Link>

            <a
              href="https://wa.me/6289699472273"
              target="_blank"
              className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Hubungi WA
            </a>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[100px] opacity-20"></div>
          <img
            src="https://cdn.globalso.com/aohuibadgegifts/TROPHY-181.jpg"
            alt="Trophy Utama"
            className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl"
          />
        </div>
      </section>
    </div>
  );
}
