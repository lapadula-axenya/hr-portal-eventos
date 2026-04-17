import { isProductionEnvironment } from "@/config/appEnvironment";
import { deactivateUser } from "@/services/auth/userService";
import {
  deactivatePrincipal,
  Principal,
  reactivatePrincipal,
} from "@/services/principalService";

async function revertUserDeactivation(principalId: string) {
  try {
    await reactivatePrincipal(principalId);
  } catch (rollbackError) {
    if (!isProductionEnvironment) {
      console.error(
        "Failed to rollback backend principal after Firebase error:",
        rollbackError,
      );
    }
    throw new Error(
      "Firebase user deactivation failed, and backend rollback also failed.",
    );
  }

  throw new Error(
    "Firebase user deactivation failed. Backend rollback executed successfully.",
  );
}

async function deactivateUserOnFirebase(
  principalId: string,
  externalId: string,
) {
  try {
    await deactivateUser({ id: externalId });
  } catch (firebaseError) {
    if (!isProductionEnvironment) {
      console.error("Failed to deactivate Firebase user:", firebaseError);
    }

    await revertUserDeactivation(principalId);

    throw new Error(
      "Firebase user deactivation failed. Backend rollback executed successfully.",
    );
  }
}

export async function safelyDeactivateUser(principal: Principal) {
  try {
    await deactivatePrincipal(principal.id);
    if (principal.externalId) {
      await deactivateUserOnFirebase(principal.id, principal.externalId);
    }
  } catch (error) {
    if (!isProductionEnvironment) {
      console.error("Error during user deactivation process:", error);
    }
    throw new Error("User deactivation process failed.");
  }
}
