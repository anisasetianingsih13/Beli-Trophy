import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Kredensial Admin
    const ADMIN_USERNAME = "admin_belitrophy";
    const ADMIN_PASSWORD = "password123";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json(
        { message: "Login Berhasil" },
        { status: 200 }
      );

      // PASANG COOKIE DI SINI (Inilah yang dicek oleh middleware)
      response.cookies.set("admin_token", "session_admin_aktif", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // Berlaku 1 hari
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { message: "Username atau Password Salah" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}