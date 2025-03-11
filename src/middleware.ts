import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Define the paths that require authentication
const PROTECTED_PATHS = ["/job/new/admin", "/job/new/admin/edit"];

// Function to check if a path is protected
const isProtectedPath = (path: string) => {
  return PROTECTED_PATHS.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
};

// Create a TextEncoder to use with jose
const textEncoder = new TextEncoder();

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for login page to avoid redirect loops
  if (path === "/job/new/admin/login") {
    return NextResponse.next();
  }

  // Only apply middleware to protected paths
  if (!isProtectedPath(path)) {
    return NextResponse.next();
  }

  // Get the token from the cookie
  const token = request.cookies.get("admin_token")?.value;

  // If no token, redirect to login
  if (!token) {
    return redirectToLogin(request);
  }

  try {
    // Verify the token using jose
    const secretKey = textEncoder.encode(
      process.env.JWT_SECRET || "your-secret-key"
    );

    await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    // Token is valid, proceed
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    console.error("Token verification failed:", error);
    return redirectToLogin(request);
  }
}

// Helper function to redirect to login
function redirectToLogin(request: NextRequest) {
  // If this is an API request, return 401
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For page requests, store the original URL to redirect back after login
  const url = request.nextUrl.clone();
  url.pathname = "/job/new/admin/login";
  url.searchParams.set("from", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/job/new/admin/:path*", "/api/admin/:path*"],
};
