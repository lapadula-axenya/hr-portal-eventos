# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev          # Inicia o servidor de desenvolvimento com Turbopack
npm run build        # Build de produção
npm run lint         # ESLint
npm run typecheck    # Type check TypeScript (tsc --noEmit)
npm run format       # Formata src/**/*.{ts,tsx} com Prettier
npm run format:check # Verifica formatação sem alterar arquivos

npm run generate:component <section> <ComponentName>  # Scaffolda um novo componente
```

Não há testes automatizados neste projeto.

## Estrutura de rotas

**Next.js 15 App Router** com route groups definindo limites de layout:

- `(auth)/` — Rotas públicas (login, signup, forgot/change password). Sem autenticação.
- `(main)/` — Rotas protegidas (dashboard, policies, invoices, etc.). Requer auth Firebase via middleware.
- `(admin)/` — Rotas exclusivas de admin (gerenciamento de usuários).
- `api/` — Route handlers do Next.js para operações server-side:
  - `api/access-key/validate` — Validação de chave de acesso
  - `api/change-password` — Troca de senha
  - `api/dashboards/embed-url` — URL de embed para dashboards
  - `api/forgot-password` — Recuperação de senha
  - `api/signup` — Cadastro de novo usuário
  - `api/users/deactivate` — Desativação de usuário
  - `api/users/update-role` — Atualização de perfil de usuário
  - `api/validate-recaptcha` — Validação de reCAPTCHA

## Padrão de data fetching

React Query (TanStack Query v5) para todo estado de servidor. Funções de serviço em `src/services/` encapsulam chamadas Axios e são consumidas por hooks de query em `src/queries/`.

- **`clientApi`** (`src/lib/axios/clientApi.ts`) — Para chamadas do browser ao backend. Injeta automaticamente o Firebase ID token no header `Authorization` e o `X-Company-Id` quando um KAM tem empresa selecionada.
- **`serverApi`** (`src/lib/axios/serverApi.ts`) — Para chamadas backend-to-backend a partir de API routes do Next.js. Usa API Key (via Google Cloud Secret Manager ou variável de ambiente) no header `x-api-key`. É uma instância cacheada criada via `createServerApi()`.
- **`internalApi`** — Para chamadas internas entre route handlers do Next.js.

## Gerenciamento de estado

Apenas React Context (`src/contexts/`). Sem Redux ou Zustand.

| Contexto | Responsabilidade |
|---|---|
| `AuthContext` | Estado de autenticação Firebase, usuário logado, `authQueryKey` |
| `CompanyContext` | Empresa selecionada pelo KAM, lista de empresas disponíveis, `companyQueryKey` |
| `SnackbarContext` | Notificações toast globais |
| `AccessKeyContext` | Estado da chave de acesso |
| `DashboardOnlyContext` | Modo dashboard-only |
| `BeneficiaryParamsContext` | Filtros da página de beneficiários |
| `InvoiceParamsContext` | Filtros da página de faturas |
| `TicketParamsContext` | Filtros da página de tickets |
| `PrincipalParamsContext` | Filtros da página de principais |

## UI e componentes

- **MUI v7** — Tema customizado em `src/theme/`. Overrides de componentes em `src/theme/components/`.
- **Ícones** — Lucide React (`lucide-react`).
- **Datas** — Day.js + MUI X Date Pickers (`@mui/x-date-pickers`).
- **Gráficos** — ECharts via `echarts-for-react`.
- **Pluralização PT-BR** — `@umatch/pluralize-ptbr`.

Para criar um novo componente:

```bash
npm run generate:component <section> <ComponentName>
```

## Autenticação

Fluxo: Firebase Auth (client-side) → Firebase Admin SDK valida tokens server-side → interceptors Axios anexam ID tokens às requisições.

- O middleware (`src/middleware.ts`) protege rotas internas de API usando header `x-internal-client` + validação de referer.
- `AuthContext` expõe o usuário corrente e um `authQueryKey` usado para invalidar queries ao trocar de sessão.
- O interceptor em `clientApi` chama `user.getIdToken()` a cada requisição para garantir token fresco.

## KAM company switching

Usuários do tipo KAM (Key Account Manager) podem operar em nome de múltiplas empresas.

- **`companyStore`** (`src/lib/companyStore.ts`) — Módulo singleton com `get()`/`set()` para persistir o `selectedCompanyId` em memória de módulo (sobrevive a re-renders, funciona fora do React).
- **`CompanyContext`** (`src/contexts/CompanyContext.tsx`) — Detecta se o usuário é KAM via `principal.type`, carrega a lista de empresas com `useKamCompaniesQuery`, inicializa a seleção com a empresa `isHome`, e expõe `setSelectedCompany`, `companyQueryKey` e `isCompanyReady`.
- **`clientApi` interceptor** — Lê `companyStore.get()` e injeta `X-Company-Id` em todas as requisições quando um KAM tem empresa selecionada.
- **`companyQueryKey`** — Array derivado do `selectedCompanyId`, incluído como parte das query keys do React Query para que queries sejam refeitas automaticamente ao trocar de empresa.

## Variáveis de ambiente

Requer `.env.local` com:

```
NEXT_PUBLIC_APP_ENV
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_CLIENT_SECRET

# Firebase client config
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Firebase Admin SDK (JSON da service account)
FIREBASE_ADMIN_CREDENTIALS

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY

# Backend API Key
API_KEY
SECRET_MANAGER_API_KEY  # Nome do secret no Google Cloud Secret Manager (fallback para API_KEY)
```

## Path alias

`@/*` → `src/*`

## Deploy

Deploy no Google Cloud Run via GitHub Actions. Build Docker multi-stage; output mode do Next.js é `standalone`. Push para `develop` → ambiente de desenvolvimento; push para `master` → produção.
