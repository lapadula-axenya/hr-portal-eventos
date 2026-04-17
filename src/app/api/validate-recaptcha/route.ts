import axios from "axios";
import { NextResponse } from "next/server";
import { getSecret } from "@/lib/secretManager";
import { errorMessages } from "@/messages/errorMessages";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const secretKey = await getSecret(
      process.env.SECRET_MANAGER_RECAPTCHA_SECRET_KEY!,
      process.env.RECAPTCHA_SECRET_KEY!,
    );

    const recaptchaUrl = process.env.RECAPTCHA_URL;

    if (!token || !secretKey || !recaptchaUrl) {
      return NextResponse.json(
        { error: errorMessages.recaptchaFailed },
        { status: 400 },
      );
    }

    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const { data } = await axios.post(recaptchaUrl, params);

    if (!data.success) {
      return NextResponse.json(
        { error: errorMessages.recaptchaFailed },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error validate recaptcha:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
