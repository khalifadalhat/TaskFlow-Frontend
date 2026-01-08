import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  const { action } = await params;
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${action}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || `${action} failed` },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(data);

    if (action === "login" || action === "verify-email") {
      const token = data.accessToken || data.token || data.data?.token;
      const role = data.user?.role || data.data?.user?.role;

      if (token) {
        nextResponse.cookies.set({
          name: "access_token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      if (role) {
        nextResponse.cookies.set({
          name: "user_role",
          value: role,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }
    if (action === "logout") {
      nextResponse.cookies.set("access_token", "", { maxAge: 0, path: "/" });
      nextResponse.cookies.set("user_role", "", { maxAge: 0, path: "/" });
    }

    return nextResponse;
  } catch (error) {
    console.error(`Auth Error (${action}):`, error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
