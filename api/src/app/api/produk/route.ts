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
            barang: data
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        return NextResponse.json({
            message: "Gagal mengambil data barang",
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
            message: "Data Barang Berhasil Disimpan",
            success: true,
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
        return NextResponse.json({
            message: "Gagal menyimpan data barang",
            success: false,
        });
    }
};
