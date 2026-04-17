import { internalApi } from "@/lib/axios/internalApi";
import { DeactivateUserPayload, UpdateUserRolePayload } from ".";

export async function updateUserRole(data: UpdateUserRolePayload) {
  return internalApi.patch("/api/users/update-role", data);
}

export async function deactivateUser(data: DeactivateUserPayload) {
  return internalApi.patch("/api/users/deactivate", data);
}
