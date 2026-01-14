"use client";

import React, { useState } from "react";
import { ArrowLeft, UserPlus, Trash2, Edit, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function UserManagement() {
  // Data dummy untuk contoh tampilan
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmad Owner", username: "admin_belitrophy", role: "Super Admin" },
    { id: 2, name: "Siti Staf", username: "siti_belitrophy", role: "Admin" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Link href="/admin" className="text-yellow-600 hover:text-yellow-700 flex items-center gap-2 mb-2">
            <ArrowLeft size={18} /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen User</h1>
          <p className="text-gray-600">Kelola akses admin panel BeliTrophy</p>
        </div>

        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition flex items-center gap-2 w-fit">
          <UserPlus size={20} /> Tambah Admin Baru
        </button>
      </div>

      {/* ===== TABEL USER ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit">
                      <ShieldCheck size={14} /> {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700 transition" title="Edit User">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition" title="Hapus User">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}