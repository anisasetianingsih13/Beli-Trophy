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

      {/* ... (sisa kode body dan footer tetap sama) ... */}
      <main className="flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 px-6 mt-6">Selamat Datang Admin 👋</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {menus.map((menu, index) => (
            <Link href={menu.path} key={index} className="block">
              <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 hover:scale-[1.05] transition cursor-pointer border border-transparent hover:border-yellow-500 h-full">
                <menu.icon className="w-10 h-10 text-yellow-600 mb-3" />
                <span className="text-gray-700 font-semibold text-center">{menu.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}