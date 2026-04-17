## ADDED Requirements

### Requirement: Estado de consentimento tem três valores possíveis
O hook `useCookieConsent` SHALL retornar `hasConsent` com tipo `boolean | null`, onde `null` representa estado ainda não resolvido (localStorage ainda não foi lido), `true` representa consentimento dado, e `false` representa ausência de consentimento.

#### Scenario: Estado inicial antes da montagem
- **WHEN** o componente renderiza antes do `useEffect` executar
- **THEN** `hasConsent` SHALL ser `null`

#### Scenario: Usuário já aceitou os cookies
- **WHEN** o `useEffect` executa e encontra o valor `hrp-cookie-consent` no localStorage
- **THEN** `hasConsent` SHALL ser `true`

#### Scenario: Usuário nunca aceitou os cookies
- **WHEN** o `useEffect` executa e NÃO encontra o valor `hrp-cookie-consent` no localStorage
- **THEN** `hasConsent` SHALL ser `false`

### Requirement: CookieBar só renderiza com consentimento explicitamente ausente
O componente `CookieBar` SHALL renderizar apenas quando `hasConsent` for explicitamente `false`. Quando `hasConsent` for `null` ou `true`, o componente SHALL retornar `null` sem renderizar nada.

#### Scenario: Estado desconhecido (null)
- **WHEN** `hasConsent` é `null` (efeito ainda não executou)
- **THEN** o `CookieBar` SHALL não ser visível na tela

#### Scenario: Consentimento dado
- **WHEN** `hasConsent` é `true`
- **THEN** o `CookieBar` SHALL não ser visível na tela

#### Scenario: Sem consentimento
- **WHEN** `hasConsent` é `false`
- **THEN** o `CookieBar` SHALL ser visível na tela
