## 1. Atualizar useCookieConsent

- [x] 1.1 Mudar `useState(false)` para `useState<boolean | null>(null)` em `src/hooks/useCookieConsent.ts`
- [x] 1.2 No `useEffect`, após verificar que não há consentimento no localStorage, chamar `setHasConsent(false)` explicitamente antes de registrar o event listener

## 2. Atualizar CookieBar

- [x] 2.1 Em `src/components/Permission/CookieBar/CookieBar.tsx`, mudar a condição de `if (hasConsent) return null` para `if (hasConsent !== false) return null`
