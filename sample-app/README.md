# Playwright Practice App

A small React + TypeScript app built to be automated, not admired. Each page in the
sidebar exercises a different category of Playwright APIs. It's the target for the
exercises in `../playwright-course`.

## Run it

```bash
npm install
npm run dev   # http://localhost:5173
```

Playwright's course config starts this automatically, so you usually don't need to run
it by hand.

## Page map

| Route | What it's for |
|-------|----------------|
| `/` | Home / nav |
| `/login` | Form submission, real `/api/login` request, redirect on success. Credentials: `student` / `playwright123` |
| `/dashboard` | Protected route (redirects to `/login` if no token in `localStorage`) — good for storage-state exercises |
| `/todos` | Add/toggle/delete items, filters, `window.confirm` on delete |
| `/table` | Async data from `/api/users`, search, sortable columns, delete (`DELETE /api/users/:id`), CSV download export |
| `/forms` | Every common input type (text, email, select, radio, checkbox, range, date, textarea, file), validation-gated submit, JSON echo of submitted values |
| `/dialogs` | Native `alert`/`confirm`/`prompt`, a custom modal, and a nested modal |
| `/drag-drop` | Reorderable list via native HTML5 drag-and-drop, plus a trash dropzone |
| `/tabs` | Tabs (`role="tablist"`) and an accordion |
| `/iframe` | An `<iframe>` embedding `/widget`, for `frameLocator` practice |
| `/new-tab` | A link and a button that both open `/dashboard` in a new tab/popup |
| `/async` | A button with a delayed result, an element that appears after 2s, a counter that polls forever, and a `/api/flaky` call that fails ~40% of the time on purpose |

## The fake backend

`vite.config.ts` adds a small dev-server middleware (see `fakeApiPlugin`) that serves:

- `GET /api/users` — list of users (400ms simulated latency)
- `DELETE /api/users/:id` — remove a user
- `POST /api/login` — `{ username, password }` → `{ token, user }` or 401
- `GET /api/flaky` — succeeds ~60% of the time, fails the rest
- `GET/POST /api/scratch-users`, `GET/DELETE /api/scratch-users/:id` — an isolated,
  empty-by-default sandbox collection for practicing create/delete without disturbing
  the seeded `/api/users` data that other pages and exercises read

This only runs under `npm run dev` (not `vite preview`), so use the dev server for the
course.
