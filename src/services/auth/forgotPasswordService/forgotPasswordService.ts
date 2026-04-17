import { internalApi } from "@/lib/axios/internalApi";
import {
  ChangePasswordData,
  ForgotPasswordData,
} from "./forgotPasswordService.type";
import { validateAccessKey } from "../validateAccessKeyService";

export async function forgotPassword(data: ForgotPasswordData) {
  return await internalApi.post("/api/forgot-password", data);
}

export async function forgotPasswordToken(token: string) {
  return validateAccessKey({
    endpoint: "/password-reset/validate",
    token,
  });
}

export async function changePassword(data: ChangePasswordData) {
  return await internalApi.post("/api/change-password", data);
}
