<!-- .github/copilot-instructions.md
Purpose: Guidance for AI coding agents (Copilot/GitHub Copilot/LLM assistants)
Target length: concise, actionable (20-50 lines)
-->

# Copilot instructions for Neumo repository

Please follow these concise, repository-specific rules when making edits, adding features, or fixing bugs.

- Big picture
  - This is a Next.js 14 application using the App Router. UI + API live in the same repo under `app/`.
  - SQLite (better-sqlite3) is used as the primary datastore. The DB file is `app.db` and the connection helper is `lib/db.ts` (it caches a global DB instance).
  - The app integrates AI services (Lemonfox LLM + TTS/STT) via routes under `app/api/speech` and `app/api/screening/*`. See `PROJECT_SUMMARY.md` and `VOICE_CHAT_INTEGRATION.md` for design intent.
  - Authentication/tenancy uses `@stackframe/stack` — see `stack.tsx` (server app config) and `app/layout.tsx` for how the StackProvider is wired.

- Developer workflows & commands
  - Start dev server: `npm install` then `npm run dev` (runs `next dev`).
  - Build for production: `npm run build` and `npm run start`.
  - Lint: `npm run lint`.
  - Environment vars required for AI/voice features: `LEMONFOX_LLM_KEY` and `LEMONFOX_TTS_KEY`. Many voice features expect `LEMONFOX_TTS_KEY` to be present (`VOICE_CHAT_INTEGRATION.md` and `app/api/speech/*`).

- Project conventions and patterns (important for automated edits)
  - File-based API routes live in `app/api/*` and return Next.js route handlers (default export of `route.ts`). When adding endpoints follow existing route naming and keep API-specific logic inside `app/api`.
  - DB access: always use `lib/db.ts` to open connections. This file ensures a single `better-sqlite3` instance is reused on the server.
  - Persistent data lives in `app.db` by default; migrations are in `database_migration.sql` and `neumo.db.sql` – do not hard-code schema changes without updating migration files.
  - UI uses Tailwind + Shadcn components. Styling and component-level behavior are in `components/` and `app/` pages.
  - Voice/chat logic is centralized in `components/screening-interface.tsx` and its CSS `components/screening-interface.css`. Prefer updating those files for UX/flow changes.

- Integration points & external dependencies
  - Lemonfox LLM + TTS/STT: referenced throughout `app/api/screening` and `app/api/speech`. Use environment variables described above.
  - LangChain is present (`langchain`, `@langchain/*`) for pipeline/LLM orchestration — inspect `app/api/screening/register-steps/route.ts` for prompt engineering patterns.
  - `@stackframe/stack` handles authentication and tenancy. Look at `stack.tsx` and `app/layout.tsx` to understand sign-in flow and redirects (`afterSignIn`).

- Editing & PR guidance for AI agents
  - Small, focused commits: one logical change per PR. When touching DB schema, include migration SQL updates and a short explanation in `PROJECT_SUMMARY.md` or migration files.
  - When modifying API handlers, preserve the existing JSON response shapes unless explicitly bumping an API version. Many frontend pages assume specific keys in DB records and API responses.
  - When adding or changing env var usage, update `VOICE_CHAT_INTEGRATION.md` or `PROJECT_SUMMARY.md` if the change affects runtime config.

- Examples of concrete patterns to follow
  - Reuse DB helper: `import db from '../../lib/db'; const rows = db.prepare('SELECT ...').all()`.
  - Add API route: create `app/api/feature/route.ts` and export `GET`/`POST` handlers that return Next.js Response objects.
  - Use stack provider: check `app/layout.tsx` and `stack.tsx` for how to instantiate `StackProvider` and the server app instance.

- What *not* to change without confirmation
  - Do not replace SQLite with another DB without a deliberate migration plan.
  - Do not change global authentication/tenant configuration in `stack.tsx` without a follow-up for testing tenant flows.

If anything in this file is unclear or you need more examples (API response shapes, SQL table columns, or prompt templates), tell me which section to expand and I will iterate.
