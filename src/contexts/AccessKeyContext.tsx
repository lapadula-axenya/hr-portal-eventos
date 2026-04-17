"use client";

import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { AxiosResponse, isAxiosError } from "axios";
import { UnlinkIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthSimpleContainer, HeroHeader, LoadingScreen } from "@/components";
import { AppRoutes } from "@/config/appRoutes";
import { ValidateAccessKeyReturn } from "@/services/auth/validateAccessKeyService";

type AccessKeyProviderProps = PropsWithChildren<{
  callback: (token: string) => Promise<AxiosResponse<ValidateAccessKeyReturn>>;
}>;

type AccessKeyContextProps = ValidateAccessKeyReturn & {
  token: string;
};

const AccessKeyContext = createContext<AccessKeyContextProps | undefined>(
  undefined,
);

export function useAccessKeyContext() {
  const context = useContext(AccessKeyContext);
  if (!context) {
    throw new Error(
      "useAccessKeyContext must be used within a AccessKeyProvider",
    );
  }
  return context;
}

export function AccessKeyProvider({
  callback,
  children,
}: AccessKeyProviderProps) {
  const [accessKey, setAccessKey] = useState<ValidateAccessKeyReturn>();
  const [isInvalid, setIsInvalid] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    if (!token) {
      setIsInvalid(true);
      return;
    }

    const fetchToken = async () => {
      try {
        const { data } = await callback(token);
        setAccessKey(data);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          router.push(AppRoutes.AUTH.LOGIN);
          return;
        }

        setIsInvalid(true);
      }
    };

    fetchToken();
  }, [callback, token, searchParams, router]);

  if (isInvalid || token === null) {
    return (
      <AuthSimpleContainer>
        <HeroHeader
          icon={UnlinkIcon}
          iconSize="large"
          colorfulIcon={false}
          title="Opps! Algo deu errado com o seu link de acesso!"
          description="Para continuar, entre em contato com o RH da sua empresa."
          textContainerSize="large"
        />
      </AuthSimpleContainer>
    );
  }

  if (!accessKey) {
    return <LoadingScreen />;
  }

  const contextValue = {
    ...accessKey,
    token,
  };

  return (
    <AccessKeyContext.Provider value={contextValue}>
      {children}
    </AccessKeyContext.Provider>
  );
}
