"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SendIcon, SparklesIcon } from "lucide-react";
import { useAthenaChatMutation } from "@/queries/useAthenaChatMutation";
import { useAthenaSummaryQuery } from "@/queries/useAthenaSummaryQuery";
import { AthenaChatMessage } from "@/services/athenaService";
import { AthenaPanelProps } from "./AthenaPanel.props";
import {
  athenaCardStyles,
  athenaChatBubbleStyles,
  athenaChipStyles,
  athenaHeaderStyles,
  athenaInputRowStyles,
} from "./AthenaPanel.styles";

export function AthenaPanel({
  context,
  title = "Athena explica",
}: AthenaPanelProps) {
  const [messages, setMessages] = useState<AthenaChatMessage[]>([]);
  const [input, setInput] = useState("");

  const summary = useAthenaSummaryQuery({ context });
  const chat = useAthenaChatMutation();

  if (!context) return null;

  async function askQuestion(question: string) {
    if (!context || !question.trim() || chat.isPending) return;

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
    askQuestion(input);
  }

  return (
    <Box sx={athenaCardStyles}>
      <Box sx={athenaHeaderStyles}>
        <SparklesIcon size={18} />
        <Typography variant="subtitle2" fontWeight={700}>
          {title}
        </Typography>
      </Box>

      {summary.isLoading && (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={14} />
          <Typography variant="caption" color="grey.300">
            Analisando dados...
          </Typography>
        </Stack>
      )}

      {summary.isError && (
        <Typography variant="caption" color="error">
          Não foi possível gerar o resumo. Você ainda pode perguntar abaixo.
        </Typography>
      )}

      {summary.data && (
        <Stack spacing="8px">
          <Typography variant="body2" fontWeight={600}>
            {summary.data.headline}
          </Typography>

          {summary.data.details.length > 0 && (
            <Stack component="ul" spacing="4px" sx={{ pl: "18px", m: 0 }}>
              {summary.data.details.map((detail, idx) => (
                <Typography
                  key={idx}
                  component="li"
                  variant="caption"
                  color="grey.300"
                >
                  {detail}
                </Typography>
              ))}
            </Stack>
          )}

          {summary.data.suggestedQuestions.length > 0 && (
            <Stack
              direction="row"
              spacing="6px"
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: "8px" }}
            >
              {summary.data.suggestedQuestions.map((question) => (
                <Chip
                  key={question}
                  label={question}
                  size="small"
                  variant="outlined"
                  sx={athenaChipStyles}
                  onClick={() => askQuestion(question)}
                  disabled={chat.isPending}
                />
              ))}
            </Stack>
          )}
        </Stack>
      )}

      {messages.length > 0 && (
        <Stack spacing="8px" sx={{ mt: "16px" }}>
          {messages.map((msg, idx) => (
            <Box key={idx} sx={athenaChatBubbleStyles(msg.role)}>
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
        </Stack>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={athenaInputRowStyles}>
        <TextField
          fullWidth
          size="small"
          placeholder="Pergunte algo sobre esta movimentação..."
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
