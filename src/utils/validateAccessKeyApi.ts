import { isAxiosError } from "axios";
import { createServerApi } from "@/lib/axios/serverApi";
import { errorMessages } from "@/messages/errorMessages";
import {
  ValidateAccessKeyReturn,
  ValidateAccessKeyParams,
} from "@/services/auth/validateAccessKeyService";

type ValidateResult =
  | { valid: true; data: ValidateAccessKeyReturn }
  | { valid: false; isUsed: boolean; error: string };

export async function validateAccessKeyApi(
  params: ValidateAccessKeyParams,
): Promise<ValidateResult> {
  const { endpoint, token } = params;

  if (!endpoint || !token) {
    return {
      valid: false,
      isUsed: false,
      error: errorMessages.invalidAccessKey,
    };
  }

  try {
    const serverApi = await createServerApi();

    const { data } = await serverApi.get(`/api/v1${endpoint}`, {
      params: { token },
    });

    return {
      valid: true,
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 409) {
        return {
          valid: false,
          isUsed: true,
          error: errorMessages.invalidAccessKey,
        };
      }

      if (status === 400 || status === 404) {
        return {
          valid: false,
          isUsed: false,
          error: errorMessages.invalidAccessKey,
        };
      }
    }

    return {
      valid: false,
      isUsed: false,
      error: errorMessages.internalError,
    };
  }
}
