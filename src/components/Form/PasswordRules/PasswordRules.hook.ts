import { UsePasswordRulesProps } from "@/components";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { getPasswordRules, validatePasswordRules } from "@/utils/passwordRules";

export function usePasswordRules(props: UsePasswordRulesProps) {
  const { openSnackbar } = useSnackbarContext();

  const rules = getPasswordRules(props.password, props.confirmPassword);
  const isValidPassword = validatePasswordRules(
    props.password,
    props.confirmPassword,
  );

  const alertPasswordError = () => {
    openSnackbar({
      title: "Senha Inválida",
      text: "A senha não atende aos requisitos.",
      type: "error",
    });
  };

  return {
    rules,
    isValidPassword,
    alertPasswordError,
  };
}
