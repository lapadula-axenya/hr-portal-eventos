import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/axios/serverApi";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { errorMessages } from "@/messages/errorMessages";
import { ChangePasswordData } from "@/services/auth/forgotPasswordService";
import { validateAccessKeyApi } from "@/utils/validateAccessKeyApi";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChangePasswordData;
    const { email, password, token } = body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      password.length < 6
    ) {
      return NextResponse.json(
        { error: errorMessages.invalidEmailOrPassword },
        { status: 400 },
      );
    }

    const validation = await validateAccessKeyApi({
      token,
      endpoint: "/password-reset/validate",
    });

    if (!validation.valid) {
      return NextResponse.json(
        { error: errorMessages.invalidEmailOrPassword },
        { status: 400 },
      );
    }

    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);

    if (!userRecord) {
      return NextResponse.json(
        { error: errorMessages.invalidEmailOrPassword },
        { status: 400 },
      );
    }

    await firebaseAdmin.auth().updateUser(userRecord.uid, {
      password,
    });

    const serverApi = await createServerApi();

    await serverApi.delete("/api/v1/password-reset/invalidate", {
      params: { token },
    });

    return NextResponse.json(
      { message: "Password changed successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
