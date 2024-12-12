import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;

	if (
		!token &&
		pathname !== "/register" &&
		pathname !== "/login" &&
		pathname !== "/"
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (token && (pathname === "/register" || pathname === "/login")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/register", "/login", "/", "/dashboard"],
};
