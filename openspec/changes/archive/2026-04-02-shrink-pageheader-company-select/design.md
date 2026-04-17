## Context

O `PageHeader` exibe o nome do usuário e abaixo dele o nome da empresa. Para usuários não-KAM, usa-se um `EllipsisText` com `variant="caption"`. Para usuários KAM, usa-se um `Select` do MUI que permite trocar de empresa — porém o Select herda tamanhos e estilos padrão do MUI que o tornam visivelmente maior e com bordas indesejadas.

O problema central é que `pageHeaderUserCompanyNameStyles` é tipado como `TypographyProps` e contém `variant: "caption"`, mas quando espalhado num `Select`, esse `variant` é interpretado como o variant do Select (standard/filled/outlined), não aplicando o tamanho de fonte `caption`.

## Goals / Non-Goals

**Goals:**
- Select de empresa visualmente idêntico ao `EllipsisText` de empresa para não-KAM
- Fonte caption (0.75rem / 12px) no texto do Select
- Sem bordas, underline ou outline em qualquer estado (normal, hover, foco, ativo)
- Padding interno compacto, sem altura extra

**Non-Goals:**
- Não alterar funcionalidade de troca de empresa
- Não alterar estilos de outros elementos do PageHeader
- Não modificar o componente `EllipsisText`

## Decisions

### Estilos via `sx` no Select

Aplicar os estilos diretamente no `sx` do Select no `PageHeader.tsx`, usando seletores MUI internos:

```
'& .MuiSelect-select'        → fontSize, padding
'& .MuiSelect-icon'          → fontSize/tamanho do ícone chevron interno do MUI
'&:before', '&:after'        → remover underline do variant standard
'&.Mui-focused'              → remover outline
```

**Alternativa considerada:** Criar um estilo separado em `PageHeader.styles.ts`. Descartado porque os seletores CSS aninhados do MUI ficam mais legíveis inline no componente, e o volume de estilos é pequeno.

### Manter `variant="standard"` + `disableUnderline`

`variant="standard"` com `disableUnderline` já remove a linha inferior padrão. Os `sx` completam removendo pseudo-elementos `::before`/`::after` restantes e outline de foco.

## Risks / Trade-offs

- **Ícone duplo**: O Select do MUI renderiza seu próprio ícone de seta (ChevronDown interno). Com o `disableUnderline` e estilos customizados, o ícone do MUI ficará visível ao lado do texto — avaliar se deve ser ocultado via `IconComponent={() => null}` para manter consistência visual com o `EllipsisText` que não tem ícone. → A decisão pode ser tomada durante implementação dependendo do resultado visual.
