import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Jika mencoba akses folder /admin tapi tidak ada token
  if (pathname.startsWith("/admin") && !token) {
    // Kecuali halaman login itu sendiri, agar tidak terjadi infinite loop
    if (pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. Jika sudah login (ada token) tapi malah mencoba akses halaman login
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware ini pada rute admin
export const config = {
  matcher: ["/admin/:path*"],
};