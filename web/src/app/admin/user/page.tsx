"use client";

import React, { useState } from "react";
import { ArrowLeft, UserPlus, Trash2, Edit, ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmad Owner", username: "admin_belitrophy", role: "Super Admin" },
    { id: 2, name: "Siti Staf", username: "siti_belitrophy", role: "Admin" },
  ]);

  // State untuk form input
  const [formData, setFormData] = useState({ name: "", username: "", role: "Admin" });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]); // Tambah ke list (sementara di client)
    setIsModalOpen(false); // Tutup modal
    setFormData({ name: "", username: "", role: "Admin" }); // Reset form
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

        {/* TOMBOL BUKA MODAL */}
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

      {/* ===== MODAL POP-UP ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tambah Admin Baru</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="text-gray-500" /></button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input 
                  type="text" required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                  type="text" required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select 
                  className="w-full border rounded-lg p-2 mt-1 bg-white outline-none"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition">
                Simpan Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}