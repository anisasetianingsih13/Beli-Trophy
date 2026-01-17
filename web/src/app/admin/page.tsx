"use client";

import React from "react";
import { Package, Users, Plus, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Panggil API logout (kita akan buat ini setelah ini)
    const res = await fetch("/api/admin/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/admin/login");
      router.refresh();
    } else {
      alert("Gagal logout, silakan coba lagi.");
    }
  };

  const menus = [
    { label: "Tambah Produk", icon: Plus, path: "/admin/product/add" },
    { label: "Kelola Produk", icon: Package, path: "/admin/product" },
    { label: "Manajemen User", icon: Users, path: "/admin/user" },
    { label: "Pengaturan", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* ===== HEADER ===== */}
      <header className="w-full bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center fixed top-0 z-10">
        <h1 className="text-xl font-bold tracking-tight text-gray-800">BeliTrophy <span className="text-yellow-600">Admin</span></h1>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </header>

      {/* ===== MAIN CONTENT (RATA TENGAH) ===== */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">Selamat Datang, Admin 👋</h2>
          <p className="text-gray-500 mt-2">Pilih menu di bawah untuk mulai mengelola sistem</p>
        </div>

        {/* Container Menu Rata Tengah */}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
          {menus.map((menu, index) => (
            <Link href={menu.path} key={index} className="w-full sm:w-64">
              <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-yellow-500 h-60">
                <div className="p-4 bg-yellow-50 rounded-full mb-4">
                  <menu.icon className="w-12 h-12 text-yellow-600" />
                </div>
                <span className="text-gray-800 font-bold text-lg text-center">{menu.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}