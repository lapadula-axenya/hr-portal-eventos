import { NextResponse } from "next/server";
import { simulateChatReply } from "@/lib/athena/athenaSimulator";
import { consumeRateLimit } from "@/lib/athena/rateLimit";
import { errorMessages } from "@/messages/errorMessages";
import { AthenaChatMessage } from "@/services/athenaService";
import { validateEntityContext } from "../_lib/buildContext";

function validateMessages(value: unknown): value is AthenaChatMessage[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (msg) =>
      msg &&
      typeof msg === "object" &&
      (msg.role === "user" || msg.role === "assistant") &&
      typeof msg.content === "string" &&
      msg.content.length > 0,
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      context?: unknown;
      messages?: unknown;
    };

    if (!validateEntityContext(body.context)) {
      return NextResponse.json(
        { error: "Contexto inválido." },
        { status: 400 },
      );
    }

    if (!validateMessages(body.messages)) {
      return NextResponse.json(
        { error: "Mensagens inválidas." },
        { status: 400 },
      );
    }

    const rate = consumeRateLimit(
      `chat:${body.context.type}:${body.context.id}`,
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

    const lastUserMessage =
      [...body.messages].reverse().find((msg) => msg.role === "user")
        ?.content ?? "";

    const reply = await simulateChatReply(body.context, lastUserMessage);
    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Athena chat error:", error);
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
