export type AthenaEntityType =
  | "portal"
  | "movimentacao"
  | "beneficiario"
  | "empresa"
  | "apolice"
  | "fatura";

export type AthenaEntityContext = {
  type: AthenaEntityType;
  id: string;
  label?: string;
  data: Record<string, unknown>;
};

export type AthenaSummary = {
  headline: string;
  details: string[];
  suggestedQuestions: string[];
};

export type AthenaChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AthenaSummarizePayload = {
  context: AthenaEntityContext;
};

export type AthenaChatPayload = {
  context: AthenaEntityContext;
  messages: AthenaChatMessage[];
};

export type AthenaChatResponse = {
  reply: string;
};
