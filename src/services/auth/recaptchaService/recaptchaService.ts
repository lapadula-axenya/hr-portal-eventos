import { internalApi } from "@/lib/axios/internalApi";

export async function validateRecaptcha(token: string) {
  return await internalApi.post<boolean>("/api/validate-recaptcha", { token });
}
