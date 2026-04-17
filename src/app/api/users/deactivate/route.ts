import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { DeactivateUserPayload } from "@/services/auth/userService";

export async function PATCH(req: Request) {
  try {
    const body: DeactivateUserPayload = await req.json();

    if (!body.id || typeof body.id !== "string") {
      return NextResponse.json(
        { error: "id (UID) must be a string" },
        { status: 400 },
      );
    }

    await firebaseAdmin.auth().updateUser(body.id, {
      disabled: true,
    });

    await firebaseAdmin.auth().revokeRefreshTokens(body.id);

    return NextResponse.json({ message: "User disabled successfully" });
  } catch (error) {
    console.error("Error disabling user:", error);

    return NextResponse.json(
      { error: "Failed to disable user" },
      { status: 500 },
    );
  }
}
