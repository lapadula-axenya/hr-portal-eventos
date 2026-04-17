import { currentAppEnvironment } from "@/config/appEnvironment";

const STORAGE_KEY_PREFIX = `hrp:${currentAppEnvironment}:kam-selected-company:`;

let selectedCompanyId: string | null = null;

export const hasWindow = () => typeof window !== "undefined";

export const storageKeyFor = (principalId: string) =>
  STORAGE_KEY_PREFIX + principalId;

export const companyStore = {
  get(): string | null {
    return selectedCompanyId;
  },
  set(id: string | null): void {
    selectedCompanyId = id;
  },
  hydrate(principalId: string): "ok" | "empty" | "error" {
    if (!hasWindow()) return "empty";
    try {
      const stored = window.localStorage.getItem(storageKeyFor(principalId));
      if (stored) {
        selectedCompanyId = stored;
        return "ok";
      }
      return "empty";
    } catch {
      return "error";
    }
  },
  clear(): void {
    selectedCompanyId = null;
  },
};

export { STORAGE_KEY_PREFIX as COMPANY_STORAGE_KEY_PREFIX };
