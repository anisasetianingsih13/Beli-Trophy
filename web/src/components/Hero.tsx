export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
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
            <button className="bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition-all">
              Lihat Katalog
            </button>
            <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
              Hubungi WA
            </button>
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

      {/* 2. STATS SECTION */}
      <div className="bg-white py-10 border-y border-gray-100c">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          <div><h4 className="text-3xl font-bold text-yellow-600">100+</h4><p className="text-gray-500 text-sm">Produk Ready</p></div>
          <div><h4 className="text-3xl font-bold text-yellow-600">10k+</h4><p className="text-gray-500 text-sm">Pelanggan Puas</p></div>
          <div><h4 className="text-3xl font-bold text-yellow-600">24 Jam</h4><p className="text-gray-500 text-sm">Respon Cepat</p></div>
          <div><h4 className="text-3xl font-bold text-yellow-600">Garansi</h4><p className="text-gray-500 text-sm">Pecah Ganti</p></div>
        </div>
      </div>

      {/* 3. PRODUK SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center md:text-left">Produk Terlaris</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-100">
                <img src="https://kreasimudaindonesia.com/wp-content/uploads/2025/06/2_desain-piala-kayu.webp" className="w-full h-full object-cover" alt="Trophy" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">Trophy Type {item}</h3>
                <p className="text-yellow-600 font-bold mt-2">Rp 150.000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6 text-center">
        <p className="font-bold text-yellow-500 text-xl mb-4">BeliTrophy</p>
        <p className="text-gray-400 text-sm">© 2025 BeliTrophy. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
}
