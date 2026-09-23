# Docs — Guided Walkthroughs

This folder is a middle step between the terse task list in each
`exercises/*/README.md` and the finished code in `solutions/*/solution.spec.ts`.

For every module, each task is restated as a **question** — what you're actually
trying to prove or build — followed by a **step-by-step approach** you can follow to
work it out yourself: what to check first, which API to reach for and why, and the
gotchas that tend to trip people up on that specific task. It deliberately stops short
of the final assembled code, so you still have to write it.

Suggested order for each task:

1. Read the question here. Try to answer it in your own words before writing anything.
2. Follow the approach to write the test in `exercises/<module>/exercise.spec.ts`,
   removing its `test.skip(...)` line.
3. Run it (`npx playwright test exercises/<module> --project=chromium --ui` is the
   easiest way to watch it work).
4. Only then, if you're stuck or want to compare notes, open
   `solutions/<module>/solution.spec.ts`.

## Modules

| # | Doc | Topic |
|---|-----|-------|
| 01 | [Getting Started](01-getting-started/README.md) | Project anatomy, running tests |
| 02 | [Locators](02-locators/README.md) | Finding elements the resilient way |
| 03 | [Actions](03-actions/README.md) | Clicking, filling, checking, selecting |
| 04 | [Assertions](04-assertions/README.md) | Web-first assertions, soft assertions |
| 05 | [Waiting](05-waiting-and-auto-wait/README.md) | Auto-waiting instead of sleeping |
| 06 | [Navigation & Multi-Page](06-navigation-and-multi-page/README.md) | Popups, iframes |
| 07 | [Forms Deep Dive](07-forms-and-validation/README.md) | Every input type, validation |
| 08 | [Dialogs](08-dialogs/README.md) | Native dialogs, custom modals |
| 09 | [File Upload & Download](09-file-upload-download/README.md) | `setInputFiles`, downloads |
| 10 | [Network Mocking](10-network-mocking/README.md) | `page.route` |
| 11 | [API Testing](11-api-testing/README.md) | The `request` fixture |
| 12 | [Auth & Storage State](12-auth-storage-state/README.md) | Log in once, reuse it |
| 13 | [Page Object Model](13-page-object-model/README.md) | Structuring tests |
| 14 | [Fixtures & Hooks](14-fixtures-and-hooks/README.md) | Custom fixtures, `test.step` |
| 15 | [Visual Testing](15-visual-testing/README.md) | Screenshot comparisons |
| 16 | [Debugging Tools](16-debugging-trace-codegen/README.md) | Inspector, trace viewer, codegen |
| 17 | [Parallelization & Projects](17-parallel-projects/README.md) | Workers, projects, sharding |
| 18 | [Accessibility Testing](18-accessibility-testing/README.md) | Automated a11y scans |
