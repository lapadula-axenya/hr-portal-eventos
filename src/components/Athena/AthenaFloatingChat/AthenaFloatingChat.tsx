"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MessageCircleIcon, SendIcon, SparklesIcon, XIcon } from "lucide-react";
import { useAthenaChatMutation } from "@/queries/useAthenaChatMutation";
import { useAthenaSummaryQuery } from "@/queries/useAthenaSummaryQuery";
import {
  AthenaChatMessage,
  AthenaEntityContext,
} from "@/services/athenaService";
import {
  athenaBubbleStyles,
  athenaChatBodyStyles,
  athenaChatContainerStyles,
  athenaChatFooterStyles,
  athenaChatHeaderStyles,
  athenaChipStyles,
  athenaFabStyles,
} from "./AthenaFloatingChat.styles";

export function AthenaFloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AthenaChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const context = useMemo<AthenaEntityContext>(
    () => ({ type: "portal", id: "global", data: {} }),
    [],
  );

  const summary = useAthenaSummaryQuery({ context, enabled: open });
  const chat = useAthenaChatMutation();

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [open, messages, chat.isPending]);

  async function ask(question: string) {
    if (!question.trim() || chat.isPending) return;

    const nextMessages: AthenaChatMessage[] = [
      ...messages,
      { role: "user", content: question.trim() },
    ];
    setMessages(nextMessages);
    setInput("");

    try {
      const { reply } = await chat.mutateAsync({
        context,
        messages: nextMessages,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Não consegui responder agora. Tente novamente em instantes.",
        },
      ]);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  if (!open) {
    return (
      <Fab
        color="primary"
        sx={athenaFabStyles}
        onClick={() => setOpen(true)}
        aria-label="Conversar com a Athena"
      >
        <MessageCircleIcon size={22} />
      </Fab>
    );
  }

  return (
    <Box sx={athenaChatContainerStyles}>
      <Box sx={athenaChatHeaderStyles}>
        <SparklesIcon size={18} />
        <Stack flex={1}>
          <Typography variant="subtitle2" fontWeight={700}>
            Athena
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Assistente do portal RH
          </Typography>
        </Stack>
        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          sx={{ color: "common.white" }}
          aria-label="Fechar chat"
        >
          <XIcon size={18} />
        </IconButton>
      </Box>

      <Box ref={bodyRef} sx={athenaChatBodyStyles}>
        {summary.isLoading && messages.length === 0 && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={14} />
            <Typography variant="caption" color="grey.300">
              Carregando...
            </Typography>
          </Stack>
        )}

        {summary.data && messages.length === 0 && (
          <Stack spacing="10px">
            <Box sx={athenaBubbleStyles("assistant")}>
              <Typography variant="caption">{summary.data.headline}</Typography>
            </Box>

            {summary.data.suggestedQuestions.length > 0 && (
              <Stack direction="row" spacing="6px" flexWrap="wrap" useFlexGap>
                {summary.data.suggestedQuestions.map((question) => (
                  <Chip
                    key={question}
                    label={question}
                    size="small"
                    variant="outlined"
                    sx={athenaChipStyles}
                    onClick={() => ask(question)}
                    disabled={chat.isPending}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}

        {messages.map((msg, idx) => (
          <Box key={idx} sx={athenaBubbleStyles(msg.role)}>
            <Typography variant="caption">{msg.content}</Typography>
          </Box>
        ))}

        {chat.isPending && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={12} />
            <Typography variant="caption" color="grey.300">
              Athena está respondendo...
            </Typography>
          </Stack>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={athenaChatFooterStyles}>
        <TextField
          fullWidth
          size="small"
          placeholder="Pergunte algo..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={chat.isPending}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!input.trim() || chat.isPending}
        >
          <SendIcon size={18} />
        </IconButton>
      </Box>
    </Box>
  );
}
