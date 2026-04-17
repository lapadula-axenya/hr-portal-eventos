import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { resendSignupLink } from "@/services/signupLinkService";

type UseResendEmailProps = {
  email: string;
  isLoading: boolean;
  onChangeIsLoading: (value: boolean) => void;
  onHandleClose: () => void;
};

export function useResendEmail() {
  const { openSnackbar } = useSnackbarContext();

  const resendEmail = async (props: UseResendEmailProps) => {
    if (props.isLoading) {
      return;
    }

    props.onChangeIsLoading(true);

    try {
      await resendSignupLink({ email: props.email });
      openSnackbar({
        title: "Convite reenviado",
        text: `Um novo convite foi enviado para ${props.email}.`,
      });
    } catch {
      openSnackbar({
        title: "Erro ao reenviar convite",
        text: `Não foi possível reenviar o convite para o e-mail ${props.email}. Tente novamente.`,
        type: "error",
      });
    } finally {
      props.onChangeIsLoading(false);
      props.onHandleClose();
    }
  };

  return { resendEmail };
}
