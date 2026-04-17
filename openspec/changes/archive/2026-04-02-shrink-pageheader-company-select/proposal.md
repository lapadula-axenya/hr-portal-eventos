## Why

O Select de troca de empresa exibido no `PageHeader` para usuários KAM está visualmente grande e inconsistente com o restante do header — enquanto o nome da empresa para usuários não-KAM usa a variante `caption` (12px), o Select usa o tamanho padrão do MUI e exibe bordas/outline ao receber foco.

## What Changes

- Reduzir o tamanho da fonte do `Select` de empresa para corresponder ao estilo `caption` (0.75rem)
- Remover bordas, outline e underline visíveis do Select em todos os estados (normal, hover, foco)
- Reduzir o padding interno do Select para ficaar compacto e alinhado ao `EllipsisText` usado por usuários não-KAM

## Capabilities

### New Capabilities

_(nenhuma nova capability)_

### Modified Capabilities

- `pageheader-company-select`: O Select de empresa no PageHeader deve ter aparência compacta (fonte caption, sem bordas, sem outline) visualmente equivalente ao `EllipsisText` usado para usuários não-KAM.

## Impact

- `src/components/Layout/PageHeader/PageHeader.styles.ts` — estilos do Select
- `src/components/Layout/PageHeader/PageHeader.tsx` — prop `sx` inline no Select
