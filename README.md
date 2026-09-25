# Saidul Badhon — Portfolio

Personal portfolio site with a small CMS dashboard for projects, skills,
experience, and contact messages.

Originally based on ByteGrad's [portfolio tutorial](https://youtu.be/sUKptmUVIBM).

## Stack

| Package       | What it is                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------- |
| `apps/web`    | Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, shadcn/ui (Base UI), Motion      |
| `apps/server` | Bun + Hono REST API, MongoDB via Mongoose 9                                                   |

The repo is a Bun workspace.

## Requirements

- [Bun](https://bun.sh) 1.4 or newer (the MongoDB driver used by the API needs it)
- Node.js 20.9 or newer (for Next.js)
- A MongoDB database

## Setup

```bash
bun install
```

Configure `apps/server/.env` (see `apps/server/.env.example`):

| Variable      | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `PORT`        | API port (default `4000`)                                                |
| `MONGODB_URI` | MongoDB connection string                                                |
| `API_SECRET`  | Shared secret required by every write/admin endpoint                     |

Configure `apps/web/.env.local` (see `apps/web/.env.local.example`):

| Variable                       | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| `API_URL`                      | API base URL used on the server                                      |
| `NEXT_PUBLIC_API_URL`          | API base URL used in the browser by the contact form                 |
| `DASHBOARD_PASSWORD`           | Password for `/dashboard`                                            |
| `API_SECRET`                   | Same value as the server's `API_SECRET`; also signs dashboard sessions |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Optional, enables "Generate with AI" in the project form            |

Generate a secret with `openssl rand -hex 32`.

## Development

```bash
bun run dev:all   # API on http://localhost:4000, site on http://localhost:3000
```

The dashboard is at http://localhost:3000/dashboard. To load the original
hardcoded content into the database, see [`apps/web/scripts/readme.md`](apps/web/scripts/readme.md).

## Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `bun run dev`       | Start the Next.js dev server          |
| `bun run dev:server`| Start the API with hot reload         |
| `bun run build`     | Production build of the site          |
| `bun run lint`      | Lint the site with ESLint             |
| `bun run typecheck` | Type-check both apps                  |

## Security

- The API's read endpoints are public. Creating, updating, and deleting
  content, and reading contact messages, require `Authorization: Bearer <API_SECRET>`.
- The dashboard never exposes `API_SECRET` to the browser: it calls the site's
  `/api/admin/*` route, which checks the signed session cookie and forwards the
  request to the API with the secret.
