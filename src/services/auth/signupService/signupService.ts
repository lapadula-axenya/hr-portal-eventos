import { internalApi } from "@/lib/axios/internalApi";
import { SignupData } from "./signupService.type";
import { validateAccessKey } from "../validateAccessKeyService";

export async function signup(data: SignupData) {
  return internalApi.post("/api/signup", data);
}

export async function singupToken(token: string) {
  return validateAccessKey({
    endpoint: "/signup-link/validate",
    token,
  });
}
