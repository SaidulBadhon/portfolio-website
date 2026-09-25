# Seed scripts

Upload the hardcoded data in `lib/data` to the API. Existing records are
updated in place, so the scripts are safe to re-run.

Run them from `apps/web` so Bun loads `.env` / `.env.local` (they need
`API_URL` and `API_SECRET`):

```bash
cd apps/web
bun scripts/upload-hardcoded-projects.ts
bun scripts/upload-hardcoded-skills.ts
bun scripts/upload-hardcoded-experiences.ts
```
