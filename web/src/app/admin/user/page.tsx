"use client";

import React, { useState } from "react";
import { ArrowLeft, UserPlus, Trash2, Edit, X, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State users (nanti diisi dari database)
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmad Owner", username: "admin_belitrophy", role: "Super Admin" },
    { id: 2, name: "Siti Staf", username: "siti_belitrophy", role: "Admin" },
  ]);

  // State untuk form input
  const [formData, setFormData] = useState({ name: "", username: "", role: "Admin" });

  // FUNGSI UTAMA UNTUK SIMPAN DATA KE API
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Pop-up jika username sudah ada (dikirim dari backend)
        alert("⚠️ Perhatian: " + result.message);
        return;
      }

      // Jika berhasil
      alert("✅ Berhasil: Admin baru telah tersimpan di database!");
      
      // Reset form dan tutup modal
      setFormData({ name: "", username: "", role: "Admin" });
      setIsModalOpen(false);

      // Reload halaman agar data terbaru muncul di tabel
      window.location.reload();

    } catch (error) {
      console.error("Koneksi gagal:", error);
      alert("❌ Gagal terhubung ke server. Pastikan API backend sudah jalan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Link href="/admin" className="text-yellow-600 hover:text-yellow-700 flex items-center gap-2 mb-2">
            <ArrowLeft size={18} /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen User</h1>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition flex items-center gap-2 w-fit"
        >
          <UserPlus size={20} /> Tambah Admin Baru
        </button>
      </div>

      {/* ===== TABEL USER ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-gray-700 font-semibold">Nama</th>
              <th className="px-6 py-4 text-gray-700 font-semibold">Username</th>
              <th className="px-6 py-4 text-gray-700 font-semibold">Role</th>
              <th className="px-6 py-4 text-center text-gray-700 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.username}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{user.role}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* ===== MODAL POP-UP (VERSI PREMIUM) ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden transform animate-in zoom-in-95 duration-200">
            
            {/* Header Modal dengan Aksen Kuning */}
            <div className="bg-yellow-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <UserPlus size={22} />
                  Tambah Admin Baru
                </h2>
                <p className="text-yellow-100 text-xs mt-1">Lengkapi data untuk akses dashboard</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-yellow-700 p-1 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Area */}
            <form onSubmit={handleAddUser} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                <div className="relative">
                  <Edit className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" required
                    placeholder="Contoh: Ahmad Owner"
                    value={formData.name}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" required
                    placeholder="admin_belitrophy"
                    value={formData.username}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Role Jabatan</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    value={formData.role}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-yellow-500 outline-none transition-all cursor-pointer"
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-yellow-600 text-white py-2.5 rounded-xl font-bold hover:bg-yellow-700 shadow-lg shadow-yellow-600/20 transition-all active:scale-95"
                >
                  Simpan Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}