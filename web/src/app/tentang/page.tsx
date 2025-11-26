"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <section id="tentang"className="w-full min-h-screen px-0 py-24 bg-gradient-to-b from-[#bde0f8] to-white">

      <h1 className="text-center text-3xl md:text-4xl font-bold mb-14 text-gray-800">
        Tentang Kami
      </h1>

      {/* FULL WIDTH GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full px-6 md:px-16">

        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start w-full">
          <Image
            src="/images/33.png"
            alt="Toko trophy"
            width={600}
            height={600}
            className="object-contain drop-shadow-md"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6 text-gray-800 w-full">

          <div>
            <h2 className="text-2xl font-bold">SmallBee Trophie Lampung</h2>
            <p className="text-gray-600 mt-1">SmallBee Trophie Lampung menyediakan piala dan plakat berkualitas dengan desain modern dan finishing premium. Harga terjangkau, layanan cepat, dan bisa custom sesuai kebutuhan acara Anda.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Visi</h3>
            <div className="bg-[#d2f7ff] rounded-xl shadow-md p-5">
              <p className="text-gray-700 leading-relaxed">
                Menjadi penyedia piala dan plakat terpercaya di Lampung dengan kualitas terbaik, desain inovatif, dan pelayanan unggul.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Misi</h3>
            <div className="bg-[#d2f7ff] rounded-xl shadow-md p-5 space-y-3">
              <p>Menghadirkan produk penghargaan yang rapi, elegan, dan dapat disesuaikan sesuai kebutuhan pelanggan.</p>
              <p>Memberikan pelayanan cepat, ramah, serta menjaga kualitas dan ketepatan waktu dalam setiap proses pengerjaan.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
