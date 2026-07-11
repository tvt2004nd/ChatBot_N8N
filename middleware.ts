import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/chat"]; // các route cần login

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return redirectToLogin(request);
  }

  // Bỏ jwt.verify ở middleware vì Edge Runtime không hỗ trợ thư viện jsonwebtoken.
  // Validation chi tiết sẽ được server actions/components đảm nhận thông qua hàm getCurrentUser.
  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname); // để login xong quay lại đúng trang
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/chat/:path*"],
};
