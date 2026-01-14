import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout Berhasil" },
    { status: 200 }
  );

  // Cara menghapus cookie: set maxAge ke 0
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    expires: new Date(0), // Langsung kadaluarsa
    path: "/",
  });

  return response;
}