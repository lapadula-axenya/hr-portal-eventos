## 1. Estilizar o Select de empresa no PageHeader

- [x] 1.1 No `PageHeader.tsx`, adicionar `sx` ao Select com `fontSize: '0.75rem'` no seletor `'& .MuiSelect-select'` e `padding: 0`
- [x] 1.2 Adicionar seletores `'&:before'` e `'&:after'` com `display: 'none'` para remover underline do variant standard
- [x] 1.3 Adicionar seletor `'&.Mui-focused:after'` com `borderBottom: 'none'` para garantir que o foco não exiba borda
- [x] 1.4 Avaliar visualmente se o ícone interno do MUI Select deve ser ocultado via `IconComponent={() => null}` para paridade com o `EllipsisText`
- [x] 1.5 Verificar visualmente que o Select tem a mesma altura e tamanho de fonte do `EllipsisText` usado por usuários não-KAM
