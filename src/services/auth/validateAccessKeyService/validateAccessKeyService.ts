import { internalApi } from "@/lib/axios/internalApi";
import {
  ValidateAccessKeyParams,
  ValidateAccessKeyReturn,
} from "./validateAccessKeyService.type";

export async function validateAccessKey(params: ValidateAccessKeyParams) {
  return await internalApi.get<ValidateAccessKeyReturn>(
    "/api/access-key/validate",
    { params },
  );
}
