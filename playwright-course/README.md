# Playwright Course

A hands-on, step-by-step path to learning Playwright properly — locators, actions,
assertions, waiting, network mocking, auth, page objects, fixtures, visual testing,
debugging, parallelization, and accessibility — all exercised against a real React app
(`../sample-app`) instead of static HTML fixtures.

## Setup

You need two terminals (or let Playwright auto-start the app for you — see below).

```bash
# 1. Install course dependencies (from this folder)
npm install
npx playwright install   # downloads Chromium/Firefox/WebKit if not already installed

# 2. Install and start the practice app (only needed if you want to browse it manually)
cd ../sample-app
npm install
npm run dev               # http://localhost:5173
```

You do **not** need to manually start `sample-app` to run tests — `playwright.config.ts`
has a `webServer` block that starts `npm run dev` in `../sample-app` automatically and
reuses it if it's already running.

## How this course is organized

```
playwright-course/
  exercises/            <- Do the work here. Each folder = one topic.
    01-getting-started/
      README.md         <- Concept explanation + numbered tasks
      exercise.spec.ts  <- Starter file with TODOs and test.skip() placeholders
    02-locators/
    ...
  docs/                  <- Stuck? Each task restated as a question + how to approach it.
    01-getting-started/README.md
    ...
  solutions/             <- Complete, working reference implementations.
    01-getting-started/solution.spec.ts
    ...
  playwright.config.ts
```

Each exercise:

1. Has a `README.md` explaining the concept and listing concrete tasks.
2. Has a starter `exercise.spec.ts` with `test.skip(true, '...')` on every test.
   **Delete the skip line** once you start implementing that test.
3. Has a matching walkthrough under [`docs/`](docs/README.md) — every task restated
   as a question, with a step-by-step approach to work it out yourself (no finished
   code) if the task list alone isn't enough to get unstuck.
4. Has a matching file under `solutions/` you can peek at once you've genuinely tried
   — or run directly to see it pass.

Work through the folders **in numeric order** — later exercises assume you're
comfortable with earlier concepts (e.g. Page Object Model in exercise 13 assumes you
already know locators and actions).

## Running things

```bash
npm test                  # run every exercise + solution, all browsers
npm run test:exercises    # run only your in-progress exercises
npm run test:solutions    # run only the reference solutions (should always be green)
npm run test:ui           # interactive UI mode — best way to work through exercises
npm run test:headed       # run with a visible browser window
npm run test:debug        # step through with the Playwright Inspector
npm run codegen           # record actions against the app and generate locator code
npm run report            # open the last HTML report
```

Running the entire course across all three browsers at once (`npm test`) drives 200+
tests against a single-process dev server and can be resource-heavy on modest
machines — prefer running one module (or `--project=chromium` only) at a time while
you work through it.

To run a single exercise:

```bash
npx playwright test exercises/02-locators
npx playwright test exercises/02-locators --project=chromium
npx playwright test exercises/02-locators --ui
```

## Curriculum

| # | Topic | What you'll practice |
|---|-------|----------------------|
| 01 | [Getting Started](exercises/01-getting-started/README.md) | Project anatomy, `test()`, running/viewing reports |
| 02 | [Locators](exercises/02-locators/README.md) | `getByRole`, `getByLabel`, `getByText`, `getByTestId`, filtering, chaining |
| 03 | [Actions](exercises/03-actions/README.md) | click, fill, check, selectOption, hover, keyboard |
| 04 | [Assertions](exercises/04-assertions/README.md) | Web-first assertions, soft assertions, counts |
| 05 | [Waiting](exercises/05-waiting-and-auto-wait/README.md) | Auto-waiting, `expect.poll`, `toPass`, avoiding manual sleeps |
| 06 | [Navigation & Multi-Page](exercises/06-navigation-and-multi-page/README.md) | New tabs/popups, iframes with `frameLocator` |
| 07 | [Forms Deep Dive](exercises/07-forms-and-validation/README.md) | Every input type, validation, disabled-state assertions |
| 08 | [Dialogs](exercises/08-dialogs/README.md) | Native `alert`/`confirm`/`prompt`, custom modals |
| 09 | [File Upload & Download](exercises/09-file-upload-download/README.md) | `setInputFiles`, `waitForEvent('download')` |
| 10 | [Network Mocking](exercises/10-network-mocking/README.md) | `page.route`, mocking success/error responses |
| 11 | [API Testing](exercises/11-api-testing/README.md) | `request` fixture, testing endpoints without a browser |
| 12 | [Auth & Storage State](exercises/12-auth-storage-state/README.md) | Logging in once, reusing session state |
| 13 | [Page Object Model](exercises/13-page-object-model/README.md) | Structuring tests with reusable page classes |
| 14 | [Fixtures & Hooks](exercises/14-fixtures-and-hooks/README.md) | Custom fixtures, `beforeEach`, `test.step` |
| 15 | [Visual Testing](exercises/15-visual-testing/README.md) | `toHaveScreenshot`, updating snapshots |
| 16 | [Debugging Tools](exercises/16-debugging-trace-codegen/README.md) | Trace viewer, UI mode, codegen, `--debug` |
| 17 | [Parallelization & Projects](exercises/17-parallel-projects/README.md) | Workers, sharding, multi-browser projects |
| 18 | [Accessibility Testing](exercises/18-accessibility-testing/README.md) | Automated a11y scans with axe-core |

## The practice app

`../sample-app` is a small React + TypeScript app built specifically to exercise
Playwright's API surface: a login flow with a protected dashboard, a todo list, an
async-loaded data table with a real (fake) backend, a kitchen-sink form, native and
custom dialogs, drag-and-drop, tabs/accordions, an iframe, popups, and pages designed
to be flaky or slow on purpose. See `../sample-app/README.md` for a full page map.
