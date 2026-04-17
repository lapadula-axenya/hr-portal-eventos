import { NextResponse } from "next/server";
import { validateAccessKeyApi } from "@/utils/validateAccessKeyApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const token = searchParams.get("token") ?? "";
  const endpoint = searchParams.get("endpoint") ?? "";

  const result = await validateAccessKeyApi({ token, endpoint });

  if (!result.valid) {
    const status = result.isUsed ? 409 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(result.data);
}
