'use client';

import { useState } from 'react';

export default function CustomPage() {
  const [form, setForm] = useState({
    nama: '',
    noWa: '',
    jenis: '',
    bahan: '',
    teks: '',
    jumlah: 1,
    catatan: '',
  });

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...form,
      foto,
    };

    console.log('Data Pesanan:', data);
    alert(
      `Terima kasih ${form.nama}, pesanan custom berhasil dikirim.\nKami akan menghubungi Anda via WhatsApp: ${form.noWa}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-yellow-600 mb-2">
          Custom Trophy
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Silakan isi data pemesanan dengan lengkap
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nama Pemesan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Pemesan
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama lengkap"
              required
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* No WhatsApp */}
          <div>
            <label className="block text-sm font-medium mb-1">
              No WhatsApp
            </label>
            <input
              type="tel"
              name="noWa"
              value={form.noWa}
              onChange={handleChange}
              placeholder="Contoh: 08xxxxxxxxxx"
              required
              pattern="[0-9]+"
              className="w-full rounded-lg border px-4 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pastikan nomor aktif & terhubung WhatsApp
            </p>
          </div>

          {/* Jenis Trophy */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Trophy
            </label>
            <select
              name="jenis"
              value={form.jenis}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="">-- Pilih Jenis --</option>
              <option value="Piala">Piala</option>
              <option value="Plakat">Plakat</option>
              <option value="Medali">Medali</option>
            </select>
          </div>

          {/* Bahan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Bahan
            </label>
            <select
              name="bahan"
              value={form.bahan}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="">-- Pilih Bahan --</option>
              <option value="Akrilik">Akrilik</option>
              <option value="Logam">Logam</option>
              <option value="Kayu">Kayu</option>
            </select>
          </div>

          {/* Teks Trophy */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Teks pada Trophy
            </label>
            <input
              type="text"
              name="teks"
              value={form.teks}
              onChange={handleChange}
              placeholder="Juara 1 Turnamen"
              required
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Jumlah */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Jumlah
            </label>
            <input
              type="number"
              name="jumlah"
              min={1}
              value={form.jumlah}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Contoh Desain (Opsional)
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFotoChange}
              className="block w-full text-sm"
            />

            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview Foto:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 rounded-lg border shadow"
                />
              </div>
            )}
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Catatan Tambahan
            </label>
            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={4}
              placeholder="Warna, ukuran, deadline, dll"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
          >
            Kirim Pesanan Custom
          </button>
        </form>
      </div>
    </div>
  );
}
