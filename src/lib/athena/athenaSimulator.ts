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

function summarizePortal(): AthenaSummary {
  return {
    headline:
      "Oi! Sou a Athena. Posso te ajudar a navegar pelo portal e entender movimentações, beneficiários, apólices e faturas.",
    details: [
      "Estou em modo simulação, então respondo com base em padrões do portal.",
      "Você também pode clicar em qualquer movimentação para eu explicar aquele registro em detalhe.",
    ],
    suggestedQuestions: [
      "Como faço uma inclusão em lote?",
      "Onde vejo as faturas do mês?",
      "O que significa status 'em análise'?",
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
  if (context.type === "portal") {
    return summarizePortal();
  }
  return summarizeGeneric(context);
}

function pickPortalResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("inclus") || q.includes("lote") || q.includes("upload")) {
    return `Para fazer uma inclusão em lote, vá até "Movimentações" no menu lateral e clique em "Enviar planilha". Você pode baixar o template de inclusão, preencher com os beneficiários e subir o arquivo. O sistema mostra linhas com erro antes de confirmar. (resposta simulada)`;
  }
  if (q.includes("fatura") || q.includes("boleto") || q.includes("cobra")) {
    return `As faturas do mês ficam em "Faturas" no menu lateral. Você consegue filtrar por período, baixar o PDF e ver o detalhamento por apólice. Se for KAM, lembre de selecionar a empresa no topo. (resposta simulada)`;
  }
  if (q.includes("análise") || q.includes("analise") || q.includes("status")) {
    return `"Em análise" significa que a operadora recebeu a solicitação e está processando. O SLA típico é de 5 dias úteis. Se passar disso, vale abrir um follow-up. (resposta simulada)`;
  }
  if (
    q.includes("apólice") ||
    q.includes("apolice") ||
    q.includes("cobertura")
  ) {
    return `Em "Apólices" você vê vigência, subestipulantes e condições de cobertura. Para detalhes de uma apólice específica, clique na linha. (resposta simulada)`;
  }
  if (q.includes("dependente") || q.includes("titular")) {
    return `Dependentes são vinculados ao titular pela relação (cônjuge, filho, etc). Para incluir um dependente, use uma movimentação de inclusão com o tipo "Dependente" e informe a matrícula do titular. (resposta simulada)`;
  }
  if (q.includes("dashboard") || q.includes("indicador") || q.includes("kpi")) {
    return `Em "Analytics" você encontra Saúde Populacional, Saúde Mental, Previsão de Fatura e Auditoria. Cada dashboard tem filtros e drill-down. Clique em um KPI para abrir o detalhamento. (resposta simulada)`;
  }
  return `Posso te ajudar com movimentações, beneficiários, apólices, faturas e os dashboards de Analytics. Me dá mais contexto do que você quer fazer e eu te oriento. (resposta simulada)`;
}

function pickResponse(question: string, context: AthenaEntityContext): string {
  if (context.type === "portal") {
    return pickPortalResponse(question);
  }

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
