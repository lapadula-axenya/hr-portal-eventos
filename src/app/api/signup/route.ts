import { NextResponse } from "next/server";
import { createServerApi } from "@/lib/axios/serverApi";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { errorMessages } from "@/messages/errorMessages";
import { SignupData } from "@/services/auth/signupService";
import { validatePasswordRules } from "@/utils/passwordRules";
import { validateAccessKeyApi } from "@/utils/validateAccessKeyApi";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupData;
    const {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      roles,
      token,
    } = body;

    if (
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string" ||
      !confirmPassword ||
      typeof confirmPassword !== "string" ||
      !firstName ||
      typeof firstName !== "string" ||
      !lastName ||
      typeof lastName !== "string" ||
      !roles ||
      !roles.length ||
      !validatePasswordRules(password, confirmPassword)
    ) {
      return NextResponse.json(
        { error: errorMessages.invalidEmailOrPassword },
        { status: 400 },
      );
    }

    const validation = await validateAccessKeyApi({
      token,
      endpoint: "/signup-link/validate",
    });

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const displayName = `${firstName} ${lastName}`;

    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName,
    });

    await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, {
      roles,
    });

    const serverApi = await createServerApi();

    await serverApi.post("/api/v1/principal", {
      externalId: userRecord.uid,
      firstName,
      lastName,
      signupLinkToken: token,
    });

    return NextResponse.json(
      { message: "User successfully created." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
