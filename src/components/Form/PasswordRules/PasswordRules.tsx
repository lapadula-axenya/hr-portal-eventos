import { Stack, Typography } from "@mui/material";
import { CircleCheckIcon, CircleIcon } from "lucide-react";
import {
  PasswordRulesProps,
  passwordRulesContainerStyles,
  passwordRulesIconInvalidStyles,
  passwordRulesIconValidStyles,
  passwordRulesItemStyles,
  passwordRulesLabelStyles,
} from "@/components";

export function PasswordRules({ rules }: PasswordRulesProps) {
  return (
    <Stack {...passwordRulesContainerStyles}>
      {rules.map(({ isValid, label }) => (
        <Stack key={label} {...passwordRulesItemStyles}>
          {isValid && <CircleCheckIcon {...passwordRulesIconValidStyles} />}

          {!isValid && <CircleIcon {...passwordRulesIconInvalidStyles} />}

          <Typography {...passwordRulesLabelStyles(isValid)}>
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
