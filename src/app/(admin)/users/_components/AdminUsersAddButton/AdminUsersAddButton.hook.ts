import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FormErrors, SelectOption, useFormHandler } from "@/components";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { AuthRole, AuthRoleLabel } from "@/enums/AuthRole";
import { QueryKey } from "@/enums/QueryKey";
import { useOpenModal } from "@/hooks/useOpenModal";
import { sendSignupLink } from "@/services/signupLinkService";
import { isValidEmail } from "@/utils/isValidEmail";
import { AdminUsersFormType } from "./AdminUsersAddButton.props";

const roleOptions: SelectOption[] = [
  {
    label: AuthRoleLabel[AuthRole.USER],
    value: AuthRole.USER,
  },
  {
    label: AuthRoleLabel[AuthRole.ADMIN],
    value: AuthRole.ADMIN,
  },
];

export function useAdminUsersAddButton() {
  const { openSnackbar } = useSnackbarContext();

  const { closeModal, isOpenModal, openModal } = useOpenModal();

  const queryClient = useQueryClient();

  const {
    applyFormErrors,
    formErrors,
    formValues,
    handleFormChange,
    resetForm,
  } = useFormHandler<AdminUsersFormType>({
    email: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (isLoading) return;
    closeModal();
    resetForm();
  };

  const validateForm = useCallback(() => {
    const newErrors: FormErrors<AdminUsersFormType> = {};

    if (!formValues.email.trim() || !isValidEmail(formValues.email)) {
      newErrors.email = "Informe um e-mail valido.";
    }

    if (!formValues.role.trim()) {
      newErrors.role = "Selecione um tipo de acesso.";
    }

    return applyFormErrors(newErrors);
  }, [formValues, applyFormErrors]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await sendSignupLink({
        email: formValues.email,
        roles: [formValues.role as AuthRole],
      });

      openSnackbar({
        title: "Usuário adicionado com sucesso",
        text: `Um convite de acesso foi enviado para ${formValues.email}.`,
      });

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PRINCIPALS],
      });

      resetForm();
      closeModal();
    } catch {
      openSnackbar({
        title: "Erro ao adicionar o usuário",
        text: "Não foi possível adicionar o usuário. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    queryClient,
    formValues,
    closeModal,
    resetForm,
    openSnackbar,
    validateForm,
  ]);

  return {
    formErrors,
    formValues,
    handleFormChange,
    handleSubmit,
    isLoading,
    isOpenModal,
    openModal,
    handleClose,
    roleOptions,
  };
}
