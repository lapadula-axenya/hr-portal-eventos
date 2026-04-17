## Why

O sistema precisa suportar usuários do tipo KAM (Key Account Manager), que gerenciam múltiplas empresas e precisam alternar o contexto de empresa durante a sessão. Atualmente, todos os usuários são tratados como CUSTOMER com empresa única e fixa.

## What Changes

- Adicionar `PrincipalType` enum (`CUSTOMER` | `KAM`) ao tipo `Principal`
- Criar serviço e query para `GET /companies` com shape `{ id, name, isHome, isActive }`
- Criar `companyStore` singleton para expor o ID da empresa selecionada ao interceptor Axios
- Atualizar interceptor do `clientApi` para injetar header `X-Company-Id` quando presente
- Criar `CompanyContext` com `useState` para empresa selecionada — inicializado apenas para KAM
- Adicionar `companyQueryKey` derivado do `selectedCompanyId` para revalidar queries ao trocar empresa
- Adicionar company switcher no `PageHeader` (visível apenas para KAM)
- Atualizar listagem de principals: badge KAM no tipo, ações de edição desabilitadas para KAM

## Capabilities

### New Capabilities

- `kam-company-context`: Gerenciamento de contexto de empresa ativa para KAM — singleton, context, query key e injeção do header
- `kam-company-switcher`: UI de seleção de empresa no header para usuários KAM

### Modified Capabilities

- `principal-listing`: Exibição do campo `type` e proteção de ações de edição para KAM principals

## Impact

- `src/lib/axios/clientApi.ts` — injeção do header `X-Company-Id`
- `src/lib/` — novo módulo `companyStore.ts`
- `src/contexts/` — novo `CompanyContext.tsx`
- `src/services/companyService/` — nova função `getCompanies()` e tipo `CompanyWithMeta`
- `src/queries/` — novo hook `useCompaniesQuery` (ou atualização do existente)
- `src/services/principalService/principalService.type.ts` — novo enum `PrincipalType`, campo `type` no `Principal`
- `src/components/Layout/PageHeader/` — company switcher condicional
- Tela de gestão de usuários (principals listing) — badge e desabilitação de ações
- `src/app/layout.tsx` — inclusão do `CompanyProvider` no provider tree
