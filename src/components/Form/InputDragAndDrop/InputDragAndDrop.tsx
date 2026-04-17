import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { FileUpIcon } from "lucide-react";
import {
  inputDragAndDropCardStyles,
  inputDragAndDropHiddenInputStyles,
  InputDragAndDropProps,
  useInputDragAndDrop,
} from "@/components";

export function InputDragAndDrop(props: InputDragAndDropProps) {
  const {
    errorMessage,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    hover,
  } = useInputDragAndDrop(props);

  const acceptedFileTypes = props.acceptedFileTypes?.join(",");

  return (
    <Stack spacing="8px">
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={inputDragAndDropCardStyles(hover, props?.disabled)}
      >
        <CardActionArea disabled={props?.disabled}>
          <CardContent>
            <input
              type="file"
              onChange={handleFileChange}
              style={inputDragAndDropHiddenInputStyles}
              accept={acceptedFileTypes}
            />

            <Stack alignItems="center" padding="1rem" spacing="1.5rem">
              <FileUpIcon size={52} />

              <Stack alignItems="center" spacing="0.5rem">
                <Typography variant="body2">
                  Arraste e solte o arquivo aqui
                </Typography>
                <Typography variant="body2">ou</Typography>
                <Typography variant="body2" color="primary">
                  Fazer upload do computador
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>

      {errorMessage && (
        <Typography variant="caption" color="error.main">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
}
