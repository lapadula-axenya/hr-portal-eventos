import { ChangeEvent } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  FormHelperText,
  FormControl,
} from "@mui/material";
import Link from "next/link";
import { CheckboxWithLabelLinkProps } from "@/components";
import { theme } from "@/theme";

export function CheckboxWithLabelLink(props: CheckboxWithLabelLinkProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props?.disabled) return;
    props.onChange(event.target.checked);
  };

  return (
    <FormControl disabled={props?.disabled}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={handleChange}
            color="primary"
          />
        }
        label={
          <Typography>
            {props.label}{" "}
            <Link
              href={props.linkHref}
              target="_blank"
              rel="noopener"
              style={{ color: theme.palette.primary.main }}
            >
              {props.labelLink}
            </Link>
            .
          </Typography>
        }
      />

      {props?.helperText && (
        <FormHelperText error>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
