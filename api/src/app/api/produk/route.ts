import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const produk = await prisma.tb_produk.findMany({
      orderBy: { kode: "desc" },
    });

    return NextResponse.json({ produk });
  } catch (error) {
    console.error("Gagal ambil data produk:", error);
    return NextResponse.json({
      message: "Gagal ambil data produk",
      success: false,
    });
  }
};
