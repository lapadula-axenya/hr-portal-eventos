import { NextResponse } from "next/server";
import { simulateSummary } from "@/lib/athena/athenaSimulator";
import { consumeRateLimit } from "@/lib/athena/rateLimit";
import { errorMessages } from "@/messages/errorMessages";
import { validateEntityContext } from "../_lib/buildContext";

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

    const summary = await simulateSummary(body.context);
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Athena summarize error:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
