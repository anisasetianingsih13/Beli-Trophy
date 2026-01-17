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
  const whatsappNumber = "6289699472273"; // GANTI DENGAN NOMOR WA KAMU

  const products: Product[] = [
    {
      id: 1,
      name: "Trophy Hugo",
      price: 350000,
      image: "/images/hugo.png",
    },
    {
      id: 2,
      name: "Trophy IBN Cup",
      price: 125000,
      image: "/images/ibn.png",
    },
    {
      id: 3,
      name: "Trophy blue Stiker",
      price: 210000,
      image: "/images/blue.png",
    },
    {
      id: 4,
      name: "Trophy Mini",
      price: 800000,
      image: "/images/toko.jpg",
    },
    {
      id: 5,
      name: "Plakat Mini",
      price: 80000,
      image: "/images/plakat.jpg",
    },
    {
      id: 6,
      name: "Trophy Renders",
      price: 150000,
      image: "/images/Renders.jpg",
    },
    {
      id: 7,
      name: "Trophy Wooden",
      price: 150000,
      image: "/images/Wooden.jpg",
    },
    {
      id: 8,
      name: "Trophy Penghargaan",
      price: 140000,
      image: "/images/p1.jpg",
    },
    {
      id: 9,
      name: "Trophy FootBall",
      price: 150000,
      image: "/images/bola.jpeg",
    },
    {
      id: 10,
      name: "Trophy Star",
      price: 70000,
      image: "/images/p2.jpg",
    },
    {
      id: 11,
      name: "Plakat Star",
      price: 50000,
      image: "/images/star.jpg",
    },
    {
      id: 12,
      name: "Plakat Football",
      price: 100000,
      image: "/images/bolla.jpg",
    },
  ];

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Katalog Produk Trophy
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-md p-4 hover:shadow-lg transition bg-white"
          >
            <div className="w-full h-48 relative mb-3">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-600 mb-3">
              Rp {item.price.toLocaleString()}
            </p>

            <button
              onClick={() => handleBuy(item)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Beli Sekarang via WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
