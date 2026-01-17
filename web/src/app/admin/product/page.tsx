"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, PackageSearch } from "lucide-react";

interface Product {
  id: number;
  kode: string;
  nama: string;
  harga: number;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // MENYAMAKAN CARA PEMANGGILAN DENGAN USER
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
  const API_URL_PRODUK = `${API_BASE}/produk`;

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
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Nama Produk</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Harga</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.kode} className="hover:bg-gray-50 transition-colors text-gray-900">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold">{p.nama}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{p.kode}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    Rp {p.harga?.toLocaleString("id-ID") ?? "0"}
                  </td>
                  <td className="p-4 flex justify-center">
                    <button 
                      onClick={() => handleDelete(p.kode)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
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