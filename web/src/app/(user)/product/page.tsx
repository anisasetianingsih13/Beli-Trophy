"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  satuan?: string;
  foto_url: string | null;
  deskripsi?: string;
}

export default function ProdukCatalog() {
  const whatsappNumber = "6289699472273";
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        // MENGGUNAKAN IP ADDRESS (Sesuai dengan akses browser Anda)
        // Pastikan port 3001 sudah berjalan
        const response = await axios.get("http://192.168.1.6:3001/api/produk");
        
        if (response.data && response.data.produk) {
          setProducts(response.data.produk);
        }
      } catch (error) {
        console.error("Gagal memuat katalog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduk();
  }, []);

  const handleBuy = (product: Product) => {
    const message = encodeURIComponent(
      `Halo BeliTrophy, saya ingin bertanya tentang produk ini:\nKode: ${product.kode}\nNama: ${product.nama}\nHarga: Rp ${product.harga.toLocaleString()} / ${product.satuan || 'pcs'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Katalog <span className="text-yellow-600">Trophy</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Koleksi penghargaan berkualitas untuk setiap pencapaian luar biasa.
          </p>
        </header>

        {products.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl shadow-inner border border-dashed border-gray-200">
            <p className="text-gray-400 italic text-lg">Katalog sedang diperbarui, silakan kembali nanti.</p>
            <p className="text-xs text-gray-300 mt-2">Cek koneksi ke http://192.168.1.6:3001/api/produk</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.foto_url || "/images/placeholder-trophy.jpg"}
                    alt={item.nama}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {item.kode}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800 line-clamp-1 min-h-[1.75rem]">
                    {item.nama}
                  </h2>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-black text-yellow-600">
                      Rp {item.harga.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm font-semibold text-gray-400 uppercase">
                      / {item.satuan || 'pcs'}
                    </span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-gray-500 line-clamp-3 min-h-[3.75rem]">
                    {item.deskripsi || "Penghargaan elegan dengan kualitas premium, sangat cocok untuk momen istimewa Anda."}
                  </p>

                  <button
                    onClick={() => handleBuy(item)}
                    className="mt-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:bg-green-700 hover:shadow-green-300 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
