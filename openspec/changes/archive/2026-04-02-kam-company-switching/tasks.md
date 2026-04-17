## 1. Tipos e serviço de empresas

- [x] 1.1 Adicionar `PrincipalType` enum (`CUSTOMER | KAM`) em `src/services/principalService/principalService.type.ts` e campo `type: PrincipalType` no tipo `Principal`
- [x] 1.2 Adicionar tipo `CompanyWithMeta` (`id`, `name`, `isHome`, `isActive`) em `src/services/companyService/companyService.type.ts` (criar arquivo se não existir)
- [x] 1.3 Adicionar função `getCompanies()` em `src/services/companyService/companyService.ts` chamando `GET /companies` via `clientApi`
- [x] 1.4 Criar hook `useKamCompaniesQuery()` em `src/queries/` para buscar as empresas do KAM

## 2. companyStore singleton

- [x] 2.1 Criar `src/lib/companyStore.ts` com `get(): string | null` e `set(id: string | null): void`

## 3. clientApi — injeção de X-Company-Id

- [x] 3.1 Atualizar interceptor em `src/lib/axios/clientApi.ts` para ler `companyStore.get()` e adicionar `X-Company-Id` quando não-nulo

## 4. CompanyContext

- [x] 4.1 Criar `src/contexts/CompanyContext.tsx` com `useState` para `selectedCompanyId`, função `setSelectedCompany(id)` (chama `companyStore.set` + `setSelectedCompanyId` em ordem), e `companyQueryKey` derivado
- [x] 4.2 No mount do `CompanyProvider`, checar `principal.type`: se KAM, buscar `GET /companies` via `useKamCompaniesQuery` e chamar `setSelectedCompany` com o id da empresa `isHome=true`
- [x] 4.3 Adicionar `CompanyProvider` no provider tree em `src/app/layout.tsx`, dentro do `AuthProvider`
- [x] 4.4 Criar hook `useCompanyContext()` que expõe `{ selectedCompanyId, companies, setSelectedCompany, companyQueryKey }`

## 5. Company switcher no PageHeader

- [x] 5.1 Atualizar `usePageHeader` hook para consumir `useCompanyContext()` e expor `principal.type`, lista de empresas e `setSelectedCompany`
- [x] 5.2 Adicionar componente de seleção de empresa no `PageHeader.tsx`, renderizado condicionalmente quando `principal.type === KAM`
- [x] 5.3 O switcher deve exibir nome da empresa ativa, listar todas as empresas acessíveis, e chamar `setSelectedCompany(id)` ao selecionar

## 6. Listagem de principals

- [x] 6.1 Adicionar badge/chip visual de tipo `KAM` na listagem de principals para principals com `type === KAM`
- [x] 6.2 Desabilitar ou ocultar as ações de alterar roles, desativar e reativar quando `principal.type === KAM`
