# Aggiornamento sicuro delle dipendenze

## Obiettivo
Aggiornare le librerie del progetto alle ultime versioni compatibili (patch e minor), senza toccare gli aggiornamenti major rischiosi.

## Cosa viene aggiornato
- **Radix UI** (tutti i componenti: dialog, menu, tab, toast, tooltip, select, switch, slider…) — solo bug fix
- **Vite 5.4.21, Tailwind 3.4.19, PostCSS, autoprefixer** — build toolchain
- **React Router 6.30.6** — navigazione
- **@supabase/supabase-js 2.117.1** — client backend
- **@tanstack/react-query 5.103** — gestione dati
- **@xyflow/react 12.12** — canvas workflow
- **react-hook-form, input-otp, @lovable.dev/cloud-auth-js** — moduli e auth
- **@electron/packager 20.3, lovable-tagger** — strumenti desktop/build
- **Playwright, testing-library, typescript-eslint** — solo strumenti di test/sviluppo

## Cosa NON viene aggiornato (rimandato)
- React 18 → 19 (breaking, richiede test dedicati)
- Electron 43 → 44 (breaking per l'app desktop)
- ESLint 9 → 10, date-fns 3 → 4, @types/node 22 → 26
- @vitejs/plugin-react-swc 3 → 4 (legato a Vite)

## Verifiche dopo l'aggiornamento
1. Build di produzione (`bun run build`) deve completare senza errori
2. Type-check TypeScript pulito
3. Test esistenti (`vitest`) verdi
4. Controllo visivo rapido delle pagine principali (/, /auth, /pricing, /install, /home)

## Dettagli tecnici
- Esecuzione con `bun x npm-check-updates --target minor -u` seguito da `bun install`
- Nessuna modifica al codice sorgente prevista; se un aggiornamento causa un errore di tipo, verrà corretto o la singola libreria verrà bloccata alla versione attuale
- Il file di lock (bun.lock) viene aggiornato di conseguenza
