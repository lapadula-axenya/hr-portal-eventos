import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const clientSecret = req.headers.get("x-internal-client");
  if (clientSecret !== process.env.NEXT_PUBLIC_CLIENT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const referer = req.headers.get("referer") ?? "";
  if (!referer.includes(process.env.NEXT_PUBLIC_BASE_URL!)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
