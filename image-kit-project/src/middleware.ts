import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  /*
  Match all paths except for:
  - API routes
  - Next.js static files
  - Next.js image optimization
  - Favicon
  This ensures that authentication is applied to all other routes.
  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
