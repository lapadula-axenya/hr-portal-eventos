import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { UpdateUserRolePayload } from "@/services/auth/userService";

export async function PATCH(req: Request) {
  try {
    const body: UpdateUserRolePayload = await req.json();

    if (!body.id || !body.role) {
      return NextResponse.json(
        { error: "uid and role are required" },
        { status: 400 },
      );
    }

    await firebaseAdmin.auth().setCustomUserClaims(body.id, {
      roles: [body.role],
    });

    await firebaseAdmin.auth().revokeRefreshTokens(body.id);

    return NextResponse.json({ message: "Custom claim 'roles' updated" });
  } catch (error) {
    console.error("Error updating role:", error);

    return NextResponse.json(
      { error: "Failed to update custom claim" },
      { status: 500 },
    );
  }
}
