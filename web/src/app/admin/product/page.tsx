"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductListPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Produk Trophy</h1>
        <Link href="/admin/product/add">
          <Button className="bg-blue-600 text-white">+ Tambah Produk</Button>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500 italic">Belum ada data produk untuk ditampilkan.</p>
      </div>
    </div>
  );
}