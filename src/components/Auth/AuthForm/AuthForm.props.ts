import { HeroHeaderProps, FormContainerProps } from "@/components";

export type AuthFormProps = FormContainerProps &
  HeroHeaderProps & {
    buttonLabel: string;
    recaptchaAction: string;
    loading?: boolean;
    externalHeader?: boolean;
  };
