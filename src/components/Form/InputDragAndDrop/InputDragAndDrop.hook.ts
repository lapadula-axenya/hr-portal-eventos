import { ChangeEvent, DragEvent, useState } from "react";
import { InputDragAndDropProps } from "./InputDragAndDrop.props";

export function useInputDragAndDrop(props: InputDragAndDropProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFileTypeAllowed = (file: File) => {
    if (!props.acceptedFileTypes || props.acceptedFileTypes.length === 0) {
      return true;
    }
    return props.acceptedFileTypes.includes(file.type);
  };

  const handleInvalidFileType = () => {
    if (
      !props.acceptedFileExtensions ||
      props.acceptedFileExtensions.length === 0
    ) {
      setErrorMessage("Tipo de arquivo não permitido.");
      return;
    }

    setErrorMessage(
      `Tipo de arquivo não permitido. Formato aceito: ${props.acceptedFileExtensions.join(", ")}.`,
    );
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (props?.disabled) return;
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (props?.disabled) return;
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleSelectedFile = (file: File | null) => {
    if (!file || props?.disabled) return;
    if (!isFileTypeAllowed(file)) {
      handleInvalidFileType();
      return;
    }
    setErrorMessage(null);
    props.onChange(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (props?.disabled) return;
    e.preventDefault();
    setIsDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    if (props?.disabled) return;
    if (droppedFiles.length > 0) {
      handleSelectedFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props?.disabled) return;
    if (e.target.files && e.target.files.length > 0) {
      handleSelectedFile(e.target.files[0]);
    }
  };

  const hover = isDragActive && !props.disabled;

  return {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    errorMessage,
    hover,
  };
}
