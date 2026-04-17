import { InputDragAndDropProps } from "@/components";

export type MainMovimentationsModalSendStepUploadProps =
  InputDragAndDropProps & {
    file: File | null;
    isError: boolean;
    isLoading: boolean;
    onChangeStep: () => void;
    onSend: () => void;
  };
