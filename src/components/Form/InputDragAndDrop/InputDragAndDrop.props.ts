export type InputDragAndDropProps = {
  disabled?: boolean;
  acceptedFileTypes?: string[];
  acceptedFileExtensions?: string[];
  onChange: (file: File | null) => void;
};
