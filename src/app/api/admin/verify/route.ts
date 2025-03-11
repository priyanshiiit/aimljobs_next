import { NextResponse } from "next/server";
import { SignJWT } from "jose";

// Create a TextEncoder to use with jose
const textEncoder = new TextEncoder();

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Compare with environment variable
    if (password === process.env.ADMIN_SECRET_KEY) {
      // Get the secret key
      const secretKey = textEncoder.encode(
        process.env.JWT_SECRET || "your-secret-key"
      );

      // Create a JWT token using jose
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secretKey);

      // Create a response with success message
      const response = NextResponse.json({ success: true });

      // Set the token in an HTTP-only cookie
      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      // Also set a non-HTTP-only cookie for client-side checks
      // This doesn't contain sensitive data, just indicates auth state
      response.cookies.set({
        name: "admin_auth",
        value: "true",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Add a logout endpoint
export async function DELETE() {
  // Create a response
  const response = NextResponse.json({ success: true });

  // Clear both cookies
  response.cookies.set({
    name: "admin_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  response.cookies.set({
    name: "admin_auth",
    value: "",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return response;
}
