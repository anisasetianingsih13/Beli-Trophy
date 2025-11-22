import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async () => {
    try {

        // ambil data dari tb_produk
        const data = await prisma.tb_produk.findMany({
            orderBy: {
                kode: "desc" //ini adalah contoh penulisan orm prisma dalam menerapkan perintah pengurutan
            },
        });
        // return new NextResponse(JSON.stringify(data))
        return NextResponse.json({
            produk: data
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        return NextResponse.json({
            message: "Gagal mengambil data produk",
            success: false,
        });
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
        const data = await request.json();

        if (!data.kode) {
            return NextResponse.json({
                message: "Kode produk wajib dikirim untuk hapus",
                success: false,
            });
        }

        // cari data berdasarkan kode terlebih dahulu
        const produk = await prisma.tb_produk.findFirst({
            where: { kode: data.kode },
        });

        if (!produk) {
            return NextResponse.json({
                message: "Data produk tidak ditemukan",
                success: false,
            });
        }

        //hapus data sesuai id produk
        await prisma.tb_produk.delete({
            where: { id: produk.id },
        });

        return NextResponse.json({
            message: "Data produk Berhasil Dihapus",
            success: true,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data:", error);
        return NextResponse.json({
            message: "Gagal menghapus data produk",
            success: false,
        });
    }
};