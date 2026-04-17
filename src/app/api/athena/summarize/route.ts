import { NextResponse } from "next/server";
import { callAthena } from "@/lib/athena/athenaClient";
import { consumeRateLimit } from "@/lib/athena/rateLimit";
import { errorMessages } from "@/messages/errorMessages";
import { AthenaSummary } from "@/services/athenaService";
import {
  buildEntitySystemPrompt,
  validateEntityContext,
} from "../_lib/buildContext";

const SUMMARY_INSTRUCTIONS = `
Gere um resumo executivo em JSON estrito com as chaves:
- "headline": string com 1 frase direta descrevendo o estado atual.
- "details": array de até 3 strings, cada uma com um fato relevante (prazo,
  pendência, campos faltantes, risco).
- "suggestedQuestions": array de até 3 perguntas curtas que o usuário pode
  querer fazer em seguida, no formato de primeira pessoa ("Por que está
  pendente?", "Qual o próximo passo?", etc).

Responda SOMENTE com o JSON, sem markdown, sem comentários.
`.trim();

function parseSummary(text: string): AthenaSummary | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]) as Partial<AthenaSummary>;
    if (
      typeof parsed.headline !== "string" ||
      !Array.isArray(parsed.details) ||
      !Array.isArray(parsed.suggestedQuestions)
    ) {
      return null;
    }
    return {
      headline: parsed.headline,
      details: parsed.details.slice(0, 3).map(String),
      suggestedQuestions: parsed.suggestedQuestions.slice(0, 3).map(String),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { context?: unknown };

    if (!validateEntityContext(body.context)) {
      return NextResponse.json(
        { error: "Contexto inválido." },
        { status: 400 },
      );
    }

    const rate = consumeRateLimit(
      `summary:${body.context.type}:${body.context.id}`,
    );
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em instantes." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        },
      );
    }

    const systemPrompt = `${buildEntitySystemPrompt(body.context)}\n\n${SUMMARY_INSTRUCTIONS}`;

    const { text } = await callAthena({
      systemPrompt,
      messages: [
        { role: "user", content: "Gere o resumo executivo desta entidade." },
      ],
      maxTokens: 600,
    });

    const summary = parseSummary(text);
    if (!summary) {
      return NextResponse.json(
        { error: "Não foi possível interpretar a resposta do Athena." },
        { status: 502 },
      );
    }

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Athena summarize error:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
