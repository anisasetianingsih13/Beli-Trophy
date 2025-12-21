"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Import fungsi dari lib/scripts
import { 
  filterHarga, 
  filterHargaRaw, 
  filterKode, 
  filterNama, 
  formatRibuan 
} from "@/lib/scripts";

export default function AddTrophyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State Form diperluas untuk menangani tampilan harga (string) 
  // dan nilai asli untuk database (number)
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    harga_display: "", // Untuk tampilan dengan titik (.)
    harga_raw: 0,      // Untuk dikirim ke database (angka murni)
    satuan: "pcs",
    foto_url: "",
    deskripsi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Data yang dikirim disesuaikan dengan kebutuhan database
      const dataToSave = {
        kode: form.kode,
        nama: form.nama,
        harga: form.harga_raw, // Menggunakan angka murni
        satuan: form.satuan,
        foto_url: form.foto_url,
        deskripsi: form.deskripsi,
      };

      const response = await axios.post("http://localhost:3001/api/produk", dataToSave);

      if (response.data.success) {
        toast.success("Trophy berhasil ditambahkan!");
        router.push("/admin/product");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Cek koneksi API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Katalog Trophy Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Kode & Nama */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Kode Trophy</Label>
            <Input 
              placeholder="Contoh: TRP-001" 
              required 
              value={form.kode}
              onChange={(e) => {
                const result = filterKode(e.target.value);
                setForm({ ...form, kode: result });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Nama Trophy</Label>
            <Input 
              placeholder="Contoh: Trophy Marmer" 
              required 
              value={form.nama}
              onChange={(e) => {
                const result = filterNama(e.target.value);
                setForm({ ...form, nama: result });
              }}
            />
          </div>
        </div>

        {/* Row 2: Harga & Satuan */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Harga (Rp)</Label>
            <Input 
              type="text" // Diubah ke text agar bisa menampilkan titik ribuan
              placeholder="50.000" 
              required 
              value={form.harga_display}
              onChange={(e) => {
                const cleanedValue = filterHarga(e.target.value);
                const displayValue = formatRibuan(cleanedValue);
                const rawValue = filterHargaRaw(displayValue);
                
                setForm({ 
                  ...form, 
                  harga_display: displayValue, 
                  harga_raw: Number(rawValue) 
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Satuan</Label>
            <Select 
              onValueChange={(val) => setForm({ ...form, satuan: val })} 
              defaultValue="pcs"
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Satuan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pcs">Pcs</SelectItem>
                <SelectItem value="set">Set</SelectItem>
                <SelectItem value="seri">Seri</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* URL Gambar */}
        <div className="space-y-2">
          <Label>URL Foto Gambar</Label>
          <Input 
            placeholder="https://link-gambar.com/trophy.jpg" 
            onChange={(e) => setForm({ ...form, foto_url: e.target.value })}
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <Label>Deskripsi</Label>
          <Textarea 
            placeholder="Jelaskan detail produk..." 
            rows={4}
            className="resize-none"
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg" 
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => router.back()}
            className="w-full text-gray-500 hover:text-red-500" 
          >
            Batal dan Kembali
          </Button>
        </div>
      </form>
    </div>
  );
}