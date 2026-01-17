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
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Produk Trophy</h1>
          <p className="text-sm text-gray-500">Kelola katalog produk BeliTrophy Anda</p>
        </div>
        
        <Link href="/admin/product/add">
          <Button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition flex items-center gap-2 w-fit border-none shadow-sm font-semibold">
            <Plus size={18} /> Tambah Produk
          </Button>
        </Link>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Memuat data produk...</div>
        ) : products.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <PackageSearch size={48} className="text-gray-200 mb-3" />
            <p className="text-gray-500 italic">Belum ada data produk untuk ditampilkan.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Nama Produk</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Harga</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">{p.nama}</td>
                  <td className="p-4 text-gray-600">
                    Rp {p.harga?.toLocaleString("id-ID") ?? "0"}
                  </td>
                  <td className="p-4 flex justify-center">
                    <button 
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Hapus Produk"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}