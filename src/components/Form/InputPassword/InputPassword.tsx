import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputText,
  InputTextProps,
  inputPasswordIconStyles,
} from "@/components";

export function InputPassword(props: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputText
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword && <EyeOffIcon {...inputPasswordIconStyles} />}
                {!showPassword && <EyeIcon {...inputPasswordIconStyles} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
