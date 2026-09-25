# Saidul Badhon — Portfolio

Personal portfolio site built with Next.js 16, React 19, Tailwind CSS 4 and
Motion. All content is hardcoded in the repo, so there is no database or API
to run, and every page is statically generated.

Originally based on ByteGrad's [portfolio tutorial](https://youtu.be/sUKptmUVIBM).

## Requirements

- Node.js 20.9 or newer
- [Bun](https://bun.sh) (package manager)

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

The contact form emails messages through [Resend](https://resend.com). Set
`RESEND_API_KEY` in `apps/web/.env.local` (see `apps/web/.env.local.example`).
Without it the rest of the site works, and the form asks visitors to email
directly.

## Editing content

Everything lives in `apps/web/content`:

```
content/
├── projects/
│   ├── index.ts              # which projects are shown, in order
│   ├── types.ts              # the Project shape
│   └── <project-slug>/
│       ├── index.ts          # title, description, tags, links, ...
│       └── cover.png         # images for this project
├── experience/
│   ├── index.ts              # work history timeline
│   └── logos/
└── skills.ts
```

**Add a project:** copy an existing project folder, rename it (the folder name
becomes the URL, `/projects/<slug>`), update its `index.ts` and images, then add
it to the list in `content/projects/index.ts`.

**Add screenshots to a project:** put the files in the project's folder, import
them in its `index.ts`, and add them to `images`. The first image is the cover;
the rest appear in a "Screenshots" section on the project page.

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `bun run dev`       | Start the dev server         |
| `bun run build`     | Production build             |
| `bun run start`     | Serve the production build   |
| `bun run lint`      | Lint with ESLint             |
| `bun run typecheck` | Type-check with TypeScript   |
