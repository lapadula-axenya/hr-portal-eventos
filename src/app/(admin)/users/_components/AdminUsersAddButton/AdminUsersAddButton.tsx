import { Button } from "@mui/material";
import { UserPlusIcon } from "lucide-react";
import {
  ActionButtons,
  BaseModal,
  FormContainer,
  InputSelect,
  InputText,
} from "@/components";
import { useAdminUsersAddButton } from "./AdminUsersAddButton.hook";
import { AdminUsersAddButtonProps } from "./AdminUsersAddButton.props";

export function AdminUsersAddButton(props: AdminUsersAddButtonProps) {
  const {
    formErrors,
    formValues,
    handleClose,
    handleFormChange,
    handleSubmit,
    isLoading,
    isOpenModal,
    openModal,
    roleOptions,
  } = useAdminUsersAddButton();

  return (
    <>
      <Button
        startIcon={<UserPlusIcon />}
        onClick={openModal}
        disabled={props.disabled}
      >
        Adicionar novo usuário
      </Button>

      <BaseModal title="Novo Usuário" open={isOpenModal} onClose={handleClose}>
        <FormContainer onSubmit={handleSubmit}>
          <InputText
            label="E-mail"
            type="email"
            value={formValues.email}
            onChangeValue={(v) => handleFormChange("email", v)}
            error={!!formErrors.email}
            helperText={formErrors.email}
            disabled={isLoading}
          />
          <InputSelect
            label="Tipo de Acesso"
            options={roleOptions}
            value={formValues.role}
            onChangeValue={(v) => handleFormChange("role", v)}
            error={!!formErrors.role}
            helperText={formErrors.role}
            disabled={isLoading}
          />
          <ActionButtons
            onClickSecondaryButton={handleClose}
            loading={isLoading}
          />
        </FormContainer>
      </BaseModal>
    </>
  );
}
