"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
} from "react";
import type { User } from "firebase/auth";
import { AuthRole } from "@/enums/AuthRole";

type AuthContextType = {
  user: User | null | undefined;
  roles: AuthRole[];
  isAdmin: boolean;
  isLastAdmin?: boolean;
  authQueryKey: string[];
  hasRole: (role: AuthRole) => boolean;
  hasAnyRole: (roles: AuthRole[]) => boolean;
  setIsLastAdmin: Dispatch<SetStateAction<boolean | undefined>>;
  refreshUserData: () => Promise<void>;
};

const mockUser = { uid: "mock-user-id", email: "ana.silva@acme.com.br" } as User;
const mockRoles = [AuthRole.USER];

const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  roles: mockRoles,
  isAdmin: false,
  isLastAdmin: undefined,
  authQueryKey: ["mock-user-id", AuthRole.USER],
  hasRole: () => false,
  hasAnyRole: () => false,
  setIsLastAdmin: () => {},
  refreshUserData: async () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLastAdmin, setIsLastAdmin] = useState<boolean | undefined>();

  const hasRole = (role: AuthRole) => mockRoles.includes(role);
  const hasAnyRole = (list: AuthRole[]) => list.some((r) => mockRoles.includes(r));

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        roles: mockRoles,
        isAdmin: false,
        isLastAdmin,
        authQueryKey: ["mock-user-id", AuthRole.USER],
        hasRole,
        hasAnyRole,
        setIsLastAdmin,
        refreshUserData: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
