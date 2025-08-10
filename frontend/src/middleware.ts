import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	const url = req.nextUrl.clone();

	if (!token && !url.pathname.startsWith("/login")) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	if (token && url.pathname === "/login") {
		url.pathname = "/n4d/patients";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/n4d/notes/:path*", "/n4d/patients/:path*", "/login", "/"],
};
