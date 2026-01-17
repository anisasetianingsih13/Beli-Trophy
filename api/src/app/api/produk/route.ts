import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// MODIFIKASI: Menggunakan '*' agar mendukung akses via IP Address (CORS)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. OPTIONS: Menangani Preflight Request
export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

// 2. GET: Ambil semua data produk
export const GET = async () => {
  try {
    const data = await prisma.tb_produk.findMany({
      orderBy: { kode: "desc" },
    });

    return NextResponse.json(
      { success: true, produk: data },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data produk" },
      { status: 500, headers: corsHeaders }
    );
  }
};

//buat service POST (simpan data)
export const POST = async (request: NextRequest) => {
    try {
        // baca data hasil request
        // ubah dalam format json
        const data = await request.json();

        //simpan data sesuai request
        await prisma.tb_produk.create({
            data: {
                kode: data.kode,
                nama: data.nama,
                harga: data.harga,
                satuan: data.satuan || "pcs", //bisa enum "pcs" / "unit" /"seri"
                foto_url: data.foto_url,
                deskripsi: data.deskripsi
            },
        });

        //tampilkan respon
        return NextResponse.json({
            message: "Data Produk  Berhasil Disimpan",
            success: true,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
        return NextResponse.json({
            message: "Gagal menyimpan data produk",
            success: false,
        });
    }
};
//buat service PUT (UBAH DATA)
export const PUT = async (request: NextRequest) => {
    try {
        const data = await request.json();

        //pastikan kode produk dikirim untuk di update
        if (!data.kode) {
            return NextResponse.json({
                message: "Kode produk wajib dikirim untuk update",
                success: false,
            });
        }

        // cari data berdasarkan kode terlebih dahulu
        const produk = await prisma.tb_produk.findFirst({
            where: { kode: data.kode },
        });

        if (!produk) {
            return NextResponse.json({
                message: "Data Produk tidak ditemukan",
                success: false,
            });
        }

        // ubah data sesuai id produk
        await prisma.tb_produk.update({
            where: { id: produk.id },
            data: {
                nama: data.nama,
                harga: data.harga,
                satuan: data.satuan,
                foto_url: data.foto_url,
                deskripsi: data.deskripsi,
            },
        });

        return NextResponse.json({
            message: "Data Produk Berhasil Diubah",
            success: true,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengubah data:", error);
        return NextResponse.json({
            message: "Gagal mengubah data produk",
            success: false,
        });
    }
};
//buat service DELETE (hapus data)
export const DELETE = async (request: NextRequest) => {
    try {
        const { kode } = await request.json();

        // Validasi: Pastikan kode ada di dalam request
        if (!kode) {
            return NextResponse.json({ 
                message: "Kode produk harus diisi", 
                success: false 
            }, { status: 400 });
        }
        
        // Eksekusi penghapusan
        await prisma.tb_produk.delete({
            where: { kode: kode },
        });

        return NextResponse.json({ 
            message: "Produk Berhasil Dihapus", 
            success: true 
        });
    } catch (error) {
        // Log error di server untuk memudahkan debugging
        console.error("Delete Error:", error);
        
        return NextResponse.json({ 
            message: "Gagal menghapus: Data tidak ditemukan atau masalah server", 
            success: false 
        }, { status: 500 });
    }
};