## Why

O `CookieBar` exibe um flash visual na montagem da página, mesmo quando o usuário já aceitou os cookies anteriormente. O estado inicial do hook `useCookieConsent` é `false`, então o componente renderiza brevemente antes de o `useEffect` ler o localStorage e atualizar o estado.

## What Changes

- `useCookieConsent`: estado inicial de `false` passa a ser `null` (estado "desconhecido")
- `useCookieConsent`: ao final do `useEffect`, define `false` explicitamente se não houver consentimento no localStorage
- `CookieBar`: condição de exibição muda de `if (hasConsent)` para `if (hasConsent !== false)` — só exibe quando o estado é explicitamente `false`

## Capabilities

### New Capabilities

- `cookie-consent-state`: Gerenciamento do estado de consentimento de cookies com três estados: `null` (desconhecido), `true` (consentiu) e `false` (não consentiu)

### Modified Capabilities

<!-- Nenhuma mudança de requisito em specs existentes -->

## Impact

- `src/hooks/useCookieConsent.ts`: mudança no tipo e valor inicial do estado
- `src/components/Permission/CookieBar/CookieBar.tsx`: mudança na condição de renderização
- Sem impacto em APIs, dependências externas ou outros sistemas
