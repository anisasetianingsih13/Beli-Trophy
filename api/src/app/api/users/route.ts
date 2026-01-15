import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// 1. Ambil Semua Data User (GET)
export const GET = async () => {
    try {
        const data = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({
            users: data
        });
    } catch (error) {
        console.error("Error GET Users:", error);
        return NextResponse.json({
            message: "Gagal mengambil data user",
            success: false,
        });
    }
};

// 2. Simpan User Baru (POST)
export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

        await prisma.user.create({
            data: {
                name: data.name,
                username: data.username,
                role: data.role || "Admin",
            },
        });

        return NextResponse.json({
            message: "User Berhasil Ditambahkan",
            success: true,
        });
    } catch (error) {
        console.error("Error POST User:", error);
        return NextResponse.json({
            message: "Gagal menyimpan data user (Username mungkin sudah digunakan)",
            success: false,
        });
    }
};

// 3. Hapus User (DELETE)
export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "ID User harus diisi", success: false }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "User Berhasil Dihapus", success: true });
    } catch (error) {
        console.error("Error DELETE User:", error);
        return NextResponse.json({ message: "Gagal menghapus user", success: false }, { status: 500 });
    }
};