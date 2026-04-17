import { useState } from "react";
import { Card, CardContent, Stack } from "@mui/material";
import {
  AuthFormProps,
  BlurCircle,
  FormContainer,
  HeroHeader,
  HeroHeaderProps,
  LoadingButton,
  authFormButtonStyles,
  authFormCardStyles,
  authFormContainerStyles,
} from "@/components";
import { useRecaptchaValidation } from "@/hooks/useRecaptchaValidation";

export function AuthForm(props: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { recaptchaValidation } = useRecaptchaValidation();

  const heroHeaderProps: HeroHeaderProps = {
    title: props?.title,
    description: props?.description,
    ...(props?.icon && {
      icon: props.icon,
      iconSize: "small",
    }),
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const isValidRecaptcha = await recaptchaValidation(props.recaptchaAction);

      if (!isValidRecaptcha) return;

      props.onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack {...authFormContainerStyles}>
      {props.externalHeader && <HeroHeader {...heroHeaderProps} />}

      <BlurCircle>
        <Card {...authFormCardStyles}>
          <CardContent>
            <Stack>
              {!props.externalHeader && <HeroHeader {...heroHeaderProps} />}

              <FormContainer onSubmit={handleSubmit}>
                {props.children}
                <LoadingButton
                  {...authFormButtonStyles}
                  loading={props?.loading || isSubmitting}
                >
                  {props.buttonLabel}
                </LoadingButton>
              </FormContainer>
            </Stack>
          </CardContent>
        </Card>
      </BlurCircle>
    </Stack>
  );
}
