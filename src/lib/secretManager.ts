import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { isLocalEnvironment } from "@/config/appEnvironment";

const client = new SecretManagerServiceClient();

/**
 * Retrieves a secret from Google Secret Manager.
 *
 * @param secretName - Full name of the secret (e.g., `projects/PROJECT_ID/secrets/SECRET_ID/versions/latest`)
 * @param fallback - Default value used in local environment
 * @returns The secret value as a string
 */
export async function getSecret(
  secretName: string,
  fallback: string,
): Promise<string> {
  if (isLocalEnvironment) {
    return fallback;
  }

  try {
    const [version] = await client.accessSecretVersion({ name: secretName });
    const payload = version.payload?.data?.toString();

    if (!payload) {
      throw new Error(`Payload not found for secret: ${secretName}`);
    }

    return payload;
  } catch (error) {
    throw new Error(
      `Failed to access secret "${secretName}": ${(error as Error).message}`,
    );
  }
}
