"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin"); // Redirect ke dashboard admin
      router.refresh();
    } else {
      alert("Login Gagal!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login Admin BeliTrophy</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Masuk</Button>
      </form>
    </div>
  );
}