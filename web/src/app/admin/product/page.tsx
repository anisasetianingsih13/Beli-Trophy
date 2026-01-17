"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, PackageSearch } from "lucide-react";

// Definisikan struktur data agar tidak ada error
interface Product {
  id: number;
  nama: string;
  harga: number;
  kode?: string;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API saat halaman dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/produk");
        // Sesuaikan dengan struktur response API Anda (contoh: res.data.data)
        if (res.data.success) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Produk Trophy</h1>
        
        <Link href="/admin/product/add">
          {/* Perbaikan Class Button sesuai permintaan Anda */}
          <Button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition flex items-center gap-2 w-fit border-none shadow-sm">
            <Plus size={18} /> Tambah Produk
          </Button>
        </Link>
      </div>

      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 italic">Belum ada data produk untuk ditampilkan.</p>
      </div>
    </div>
  );
}