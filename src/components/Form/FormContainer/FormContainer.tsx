import { FormEvent } from "react";
import { Stack } from "@mui/material";
import { FormContainerProps, formContainerStyles } from "@/components";

export function FormContainer(props: FormContainerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} {...formContainerStyles}>
      {props.children}
    </Stack>
  );
}
