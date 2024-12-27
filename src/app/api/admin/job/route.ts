import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ADMIN_SECRET_KEY || "",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
