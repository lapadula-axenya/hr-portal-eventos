import { useMutation } from "@tanstack/react-query";
import {
  AthenaChatPayload,
  AthenaChatResponse,
  sendAthenaChat,
} from "@/services/athenaService";

export function useAthenaChatMutation() {
  return useMutation<AthenaChatResponse, Error, AthenaChatPayload>({
    mutationFn: sendAthenaChat,
  });
}
