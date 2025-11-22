export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 py-16 bg-gradient-to-br from-gray-50 to-yellow-100">
      <h2 className="text-4xl font-bold text-gray-800">
        Selamat Datang di <span className="text-yellow-600"> BeliTrophy</span>
      </h2>
      <p className="text-gray-600 mt-3 max-w-lg">
        Penyedia trophy berkualitas untuk sekolah, event, lomba, dan custom desain.
      </p>

      <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
        Lihat Produk
      </button>
    </section>
  );
}
