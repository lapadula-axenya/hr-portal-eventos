import { AthenaEntityContext, AthenaSummary } from "@/services/athenaService";

const SIMULATED_LATENCY_MS = 450;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type MovimentacaoData = {
  beneficiario?: {
    nome?: string;
    tipo?: string;
    matricula?: string;
  };
  tickets?: Array<{
    id?: string;
    beneficio?: string;
    tipoMovimentacao?: string;
    status?: string;
    criadoEm?: string;
    atualizadoEm?: string;
  }>;
};

function daysBetween(iso?: string): number | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function summarizeMovimentacao(context: AthenaEntityContext): AthenaSummary {
  const data = context.data as MovimentacaoData;
  const beneficiario = data.beneficiario ?? {};
  const tickets = data.tickets ?? [];

  const nome = beneficiario.nome ?? "Beneficiário";
  const tipo = beneficiario.tipo ?? "—";
  const benefitList = tickets
    .map((t) => t.beneficio)
    .filter(Boolean)
    .join(", ");

  const pendente = tickets.find(
    (t) =>
      t.status?.toLowerCase().includes("pendente") ||
      t.status?.toLowerCase().includes("solicitad") ||
      t.status?.toLowerCase().includes("análise"),
  );
  const diasDesdeUltima = Math.min(
    ...tickets
      .map((t) => daysBetween(t.atualizadoEm))
      .filter((d): d is number => typeof d === "number"),
  );

  const headline = pendente
    ? `Movimentação de ${tipo.toLowerCase()} (${nome}) aguardando conclusão em ${pendente.beneficio ?? "benefício"}.`
    : `Movimentação de ${tipo.toLowerCase()} (${nome}) em andamento${benefitList ? ` para ${benefitList}` : ""}.`;

  const details: string[] = [];
  if (tickets.length > 0) {
    details.push(
      `${tickets.length} ticket(s) de benefício associado(s)${benefitList ? `: ${benefitList}` : ""}.`,
    );
  }
  if (pendente?.tipoMovimentacao) {
    details.push(
      `Última ação registrada: ${pendente.tipoMovimentacao} com status "${pendente.status}".`,
    );
  }
  if (Number.isFinite(diasDesdeUltima)) {
    details.push(
      diasDesdeUltima === 0
        ? "Atualizado hoje."
        : `Última atualização há ${diasDesdeUltima} dia(s).`,
    );
  }
  if (beneficiario.matricula) {
    details.push(`Matrícula ${beneficiario.matricula}.`);
  }

  const suggestedQuestions = [
    pendente
      ? "Por que esta movimentação ainda está pendente?"
      : "Qual o status atual de cada benefício?",
    "Qual é o próximo passo recomendado?",
    "Há algum dado faltando no cadastro?",
  ];

  return {
    headline,
    details: details.slice(0, 3),
    suggestedQuestions,
  };
}

function summarizeGeneric(context: AthenaEntityContext): AthenaSummary {
  const label = context.label ?? context.id;
  return {
    headline: `Detalhes de ${context.type} ${label} carregados.`,
    details: [
      "Resumo automático ainda não disponível para este tipo de entidade.",
      "Você pode perguntar abaixo que eu respondo com base nos dados visíveis.",
    ],
    suggestedQuestions: [
      "O que este registro significa?",
      "Há alguma pendência aqui?",
      "Qual a próxima ação?",
    ],
  };
}

export async function simulateSummary(
  context: AthenaEntityContext,
): Promise<AthenaSummary> {
  await delay(SIMULATED_LATENCY_MS);
  if (context.type === "movimentacao") {
    return summarizeMovimentacao(context);
  }
  return summarizeGeneric(context);
}

function pickResponse(question: string, context: AthenaEntityContext): string {
  const q = question.toLowerCase();
  const label = context.label ?? context.id;

  if (q.includes("pendente") || q.includes("parad") || q.includes("por que")) {
    return `A movimentação de ${label} está aguardando processamento pela operadora. Em geral, o retorno ocorre em até 5 dias úteis a partir da última atualização. (resposta simulada)`;
  }
  if (q.includes("próximo") || q.includes("proximo") || q.includes("passo")) {
    return `O próximo passo sugerido é confirmar se os documentos obrigatórios foram enviados e acompanhar a confirmação da operadora. Se passar do SLA, vale abrir um ticket de follow-up. (resposta simulada)`;
  }
  if (q.includes("prazo") || q.includes("sla") || q.includes("quando")) {
    return `O SLA padrão para este tipo de movimentação é de 5 dias úteis. Com base na última atualização visível no contexto, ainda está dentro do prazo. (resposta simulada)`;
  }
  if (q.includes("dado") || q.includes("faltando") || q.includes("cadastro")) {
    return `Nos dados fornecidos não identifiquei campos obrigatórios em branco. Vale conferir diretamente no cadastro do beneficiário se há documentos pendentes. (resposta simulada)`;
  }
  if (q.includes("benefício") || q.includes("beneficio")) {
    return `Os benefícios associados a esta movimentação estão listados no painel de detalhes logo abaixo. Posso explicar um em específico se você me disser qual. (resposta simulada)`;
  }
  return `Entendi sua pergunta sobre ${label}. No momento estou em modo simulação e só consigo responder com base no contexto visível no painel. Quando a integração com a IA for ativada, vou trazer análises completas. (resposta simulada)`;
}

export async function simulateChatReply(
  context: AthenaEntityContext,
  lastUserMessage: string,
): Promise<string> {
  await delay(SIMULATED_LATENCY_MS);
  return pickResponse(lastUserMessage, context);
}
