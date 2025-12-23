"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <section
      id="tentang"
      className="w-full min-h-screen py-24 bg-gradient-to-b from-[#bde0f8] to-white"
    >
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-14 text-gray-800">
        Tentang Kami
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16">
        
        {/* IMAGE */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/images/toko.jpg"
            alt="Toko SmallBee Trophy Lampung"
            width={600}
            height={600}
            className="object-contain drop-shadow-lg rounded-2xl"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-8 text-gray-800">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              SmallBee Trophy Lampung
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SmallBee Trophy Lampung menyediakan piala dan plakat berkualitas
              dengan desain modern serta finishing premium. Kami melayani
              pembuatan piala custom untuk berbagai acara dengan harga
              terjangkau dan pengerjaan cepat.
            </p>
          </div>

          {/* VISI */}
          <div>
            <h3 className="text-xl font-bold mb-3">Visi</h3>
            <div className="bg-[#d2f7ff] rounded-xl shadow p-5">
              <p className="leading-relaxed">
                Menjadi penyedia piala dan plakat terpercaya di Lampung dengan
                kualitas terbaik, desain inovatif, dan pelayanan unggul.
              </p>
            </div>
          </div>

          {/* MISI */}
          <div>
            <h3 className="text-xl font-bold mb-3">Misi</h3>
            <div className="bg-[#d2f7ff] rounded-xl shadow p-5 space-y-3">
              <p>
                Menghadirkan produk penghargaan yang rapi, elegan, dan dapat
                disesuaikan dengan kebutuhan pelanggan.
              </p>
              <p>
                Memberikan pelayanan cepat, ramah, serta menjaga kualitas dan
                ketepatan waktu dalam setiap proses pengerjaan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
