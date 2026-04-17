import { sanitizeForPrompt } from "@/lib/athena/athenaClient";
import { AthenaEntityContext } from "@/services/athenaService";

const ENTITY_LABELS: Record<AthenaEntityContext["type"], string> = {
  movimentacao: "Movimentação de benefício",
  beneficiario: "Beneficiário",
  empresa: "Empresa / Subestipulante",
  apolice: "Apólice",
  fatura: "Fatura",
};

export function buildEntitySystemPrompt(context: AthenaEntityContext): string {
  const label = ENTITY_LABELS[context.type] ?? context.type;
  const dataJson = sanitizeForPrompt(
    JSON.stringify(context.data ?? {}, null, 2),
  );

  return [
    `Contexto ativo: ${label}${context.label ? ` — ${context.label}` : ""}.`,
    `Identificador: ${context.id}.`,
    "Dados estruturados disponíveis (use apenas estes fatos):",
    "```json",
    dataJson,
    "```",
    "Ao responder:",
    "- Explique o status atual da entidade em uma frase.",
    "- Aponte o que exige atenção (SLA vencido, campos faltantes, status pendente).",
    "- Sugira a próxima ação prática quando fizer sentido.",
  ].join("\n");
}

export function validateEntityContext(
  value: unknown,
): value is AthenaEntityContext {
  if (!value || typeof value !== "object") return false;
  const ctx = value as Partial<AthenaEntityContext>;
  const validTypes: AthenaEntityContext["type"][] = [
    "movimentacao",
    "beneficiario",
    "empresa",
    "apolice",
    "fatura",
  ];
  return (
    typeof ctx.id === "string" &&
    ctx.id.length > 0 &&
    typeof ctx.type === "string" &&
    validTypes.includes(ctx.type as AthenaEntityContext["type"]) &&
    typeof ctx.data === "object" &&
    ctx.data !== null
  );
}
