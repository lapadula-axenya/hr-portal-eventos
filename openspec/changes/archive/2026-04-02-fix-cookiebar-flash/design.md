## Context

O hook `useCookieConsent` usa `useState(false)` como estado inicial. Em Next.js com SSR, o componente é renderizado no servidor e também no primeiro render do cliente com `hasConsent = false` — antes de qualquer acesso ao localStorage. O `useEffect` que lê o localStorage só executa após a montagem, causando um flash do `CookieBar`.

## Goals / Non-Goals

**Goals:**
- Eliminar o flash visual do `CookieBar` em usuários que já aceitaram os cookies
- Manter o comportamento existente para novos usuários (sem consentimento)
- Manter compatibilidade com o Amplitude hook que também usa `useCookieConsent`

**Non-Goals:**
- Migrar persistência de localStorage para cookies HTTP (resolveria SSR mas está fora de escopo)
- Alterar o design visual ou texto do `CookieBar`

## Decisions

### Usar `null` como estado inicial em vez de `false`

**Decisão:** `useState<boolean | null>(null)` representa "ainda não lemos o localStorage".

**Alternativas consideradas:**

| Alternativa | Problema |
|-------------|----------|
| `useState(false)` — estado atual | Flash sempre acontece |
| `useState(() => typeof window !== 'undefined' && !!localStorage.getItem(...))` | Mismatch de hidratação (servidor sempre retorna `false`) |
| Usar cookies HTTP (lidos no servidor) | Mudança de escopo, requer mudanças no backend/middleware |

**Rationale:** `null` como estado "desconhecido" é um padrão idiomático em React para representar estado ainda não resolvido. Evita o flash sem quebrar a hidratação.

### Condição de renderização no `CookieBar`

**Decisão:** Mudar `if (hasConsent)` para `if (hasConsent !== false)`.

**Rationale:** Com três estados possíveis (`null`, `true`, `false`), o CookieBar deve renderizar somente quando o estado é **explicitamente** `false`. Tanto `null` quanto `true` suprimem o componente.

## Risks / Trade-offs

- **Delay de visibilidade para novos usuários**: O CookieBar só aparece após o efeito montar (~16ms). Imperceptível na prática, mas tecnicamente o bar não aparece no SSR nem no primeiro frame.  
  → Aceitável: usuários novos não percebem esse delay mínimo.

- **`Amplitude.hook.ts` também usa `useCookieConsent`**: A mudança no tipo de `hasConsent` (`boolean | null`) pode afetar lógica que depende de `hasConsent` sendo `boolean`.  
  → Verificar e atualizar o hook do Amplitude junto com a mudança.
