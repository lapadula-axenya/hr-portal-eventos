import { clientApi } from "@/lib/axios/clientApi";
import { SignupLinkPayload, SignupLinkResendPayload } from ".";

export async function sendSignupLink(payload: SignupLinkPayload) {
  await clientApi.post("/api/v1/signup-link", payload);
}

export async function resendSignupLink(payload: SignupLinkResendPayload) {
  await clientApi.post("/api/v1/signup-link/resend", payload);
}
