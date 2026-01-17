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

// 3. POST: Tambah produk baru
export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const result = await prisma.tb_produk.create({
      data: {
        kode: data.kode,
        nama: data.nama,
        harga: Number(data.harga),
        satuan: data.satuan || "pcs",
        foto_url: data.foto_url,
        deskripsi: data.deskripsi,
      },
    });

    return NextResponse.json(
      { success: true, message: "Data Produk Berhasil Disimpan", data: result },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data produk" },
      { status: 500, headers: corsHeaders }
    );
  }
};

// 4. PUT: Update data produk berdasarkan kode
export const PUT = async (request: NextRequest) => {
  try {
    const data = await request.json();

    if (!data.kode) {
      return NextResponse.json(
        { success: false, message: "Kode produk wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await prisma.tb_produk.update({
      where: { kode: data.kode },
      data: {
        nama: data.nama,
        harga: Number(data.harga),
        satuan: data.satuan,
        foto_url: data.foto_url,
        deskripsi: data.deskripsi,
      },
    });

    return NextResponse.json(
      { success: true, message: "Data Produk Berhasil Diubah", data: result },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengubah data produk" },
      { status: 500, headers: corsHeaders }
    );
  }
};

// 5. DELETE: Hapus produk berdasarkan kode
export const DELETE = async (request: NextRequest) => {
  try {
    const { kode } = await request.json();

    if (!kode) {
      return NextResponse.json(
        { success: false, message: "Kode produk harus diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    await prisma.tb_produk.delete({
      where: { kode: kode },
    });

    return NextResponse.json(
      { success: true, message: "Produk Berhasil Dihapus" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk" },
      { status: 500, headers: corsHeaders }
    );
  }
};