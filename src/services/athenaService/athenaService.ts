import { internalApi } from "@/lib/axios/internalApi";
import {
  AthenaChatPayload,
  AthenaChatResponse,
  AthenaSummarizePayload,
  AthenaSummary,
} from "./athenaService.type";

export async function summarizeEntity(
  payload: AthenaSummarizePayload,
): Promise<AthenaSummary> {
  const { data } = await internalApi.post<AthenaSummary>(
    "/api/athena/summarize",
    payload,
  );
  return data;
}

export async function sendAthenaChat(
  payload: AthenaChatPayload,
): Promise<AthenaChatResponse> {
  const { data } = await internalApi.post<AthenaChatResponse>(
    "/api/athena/chat",
    payload,
  );
  return data;
}
