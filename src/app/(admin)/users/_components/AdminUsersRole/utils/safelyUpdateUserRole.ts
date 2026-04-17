import { isProductionEnvironment } from "@/config/appEnvironment";
import { AuthRole } from "@/enums/AuthRole";
import { updateUserRole } from "@/services/auth/userService";
import { updatePrincipalRole } from "@/services/principalService";

type SafelyUpdateUserRoleProps = {
  principalId: string;
  externalId: string | null;
  currentRole: AuthRole;
  newRole: AuthRole;
};

export async function safelyUpdateUserRole({
  currentRole,
  externalId,
  newRole,
  principalId,
}: SafelyUpdateUserRoleProps) {
  try {
    await updatePrincipalRole(principalId, {
      rolesToAdd: [newRole],
      rolesToRemove: [currentRole],
    });

    if (externalId) {
      await updateFirebaseUserRoleWithRollback({
        externalId,
        newRole,
        principalId,
        currentRole,
      });
    }
  } catch (error) {
    if (!isProductionEnvironment) {
      console.error("Failed to update user role:", error);
    }
    throw new Error("Failed to update user role");
  }
}

async function updateFirebaseUserRoleWithRollback({
  currentRole,
  externalId,
  newRole,
  principalId,
}: {
  externalId: string;
  newRole: AuthRole;
  principalId: string;
  currentRole: AuthRole;
}) {
  try {
    await updateUserRole({
      id: externalId,
      role: newRole,
    });
  } catch (error) {
    if (!isProductionEnvironment) {
      console.error("Failed to update Firebase role:", error);
    }

    await updatePrincipalRole(principalId, {
      rolesToAdd: [currentRole],
      rolesToRemove: [newRole],
    });

    throw new Error("Firebase role update failed. Backend rollback executed.");
  }
}
