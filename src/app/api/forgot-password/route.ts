import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/axios/serverApi";
import { errorMessages } from "@/messages/errorMessages";
import { ForgotPasswordData } from "@/services/auth/forgotPasswordService";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ForgotPasswordData;
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: errorMessages.internalError },
        { status: 400 },
      );
    }

    const serverApi = await createServerApi();

    await serverApi.post("/api/v1/password-reset", {
      email,
    });

    return NextResponse.json({ message: "Email sent." }, { status: 201 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 400 },
    );
  }
}
