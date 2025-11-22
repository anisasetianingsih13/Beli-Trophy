"use client";

import React from "react";
import { Package, Users, Settings, Plus } from "lucide-react";

export default function AdminDashboard() {
  const menus = [
    { label: "Tambah Produk", icon: Plus, path: "/admin/produk/tambah" },
    { label: "Kelola Produk", icon: Package, path: "/admin/produk" },
    { label: "Manajemen User", icon: Users, path: "/admin/user" },
    { label: "Pengaturan", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* ===== HEADER ===== */}
      <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      {/* ===== BODY ===== */}
      <main className="flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 px-6 mt-6">
          Selamat Datang Admin 👋
        </h2>

        <p className="text-gray-600 px-6 mb-4">
          Silakan pilih menu untuk melanjutkan.
        </p>

        {/* ===== MENU GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 hover:scale-[1.05] transition cursor-pointer"
            >
              <menu.icon className="w-10 h-10 text-yellow-600 mb-3" />
              <span className="text-gray-700 font-semibold">{menu.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-4 text-sm text-gray-500 border-t">
        © 2025 BeliTrophy — Admin Panel
      </footer>
    </div>
  );
}
