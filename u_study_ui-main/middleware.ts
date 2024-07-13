import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { cookies } = request;
	const accessToken = cookies.get("access_token");

	if (!accessToken) {
		// Chuyển hướng về trang login
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/student/mycourses/:path*", "/teacher/:path*"],
};
