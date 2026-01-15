"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, User, ShieldCheck, Loader2 } from "lucide-react"; // Ikon tambahan

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Mulai loading

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Login Gagal! Username atau Password salah.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false); // Matikan loading
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-md p-4">
        {/* CARD CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* HEADER DENGAN AKSEN WARNA */}
          <div className="bg-yellow-600 p-8 text-center text-white">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Area</h1>
            <p className="text-yellow-100 text-sm mt-1">BeliTrophy Management System</p>
          </div>

          {/* FORM AREA */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {/* INPUT USERNAME */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* TOMBOL LOGIN */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl shadow-lg shadow-yellow-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Memproses...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4">
              &copy; 2026 BeliTrophy Team. All rights reserved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}