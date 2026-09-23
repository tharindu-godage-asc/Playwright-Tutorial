# 13 — Page Object Model

## Concept

As a suite grows, repeating raw locators in every test (`page.getByTestId('todo-input')`
in test after test) becomes brittle — one markup change means editing dozens of tests.
The **Page Object Model** (POM) pattern wraps a page's locators and common actions in a
class, so tests read like a script of user intentions instead of a list of selectors:

```ts
// Without POM
await page.getByTestId('todo-input').fill('Buy milk')
await page.getByTestId('todo-add').click()

// With POM
await todosPage.addTodo('Buy milk')
```

A typical page object:

```ts
import type { Page, Locator } from '@playwright/test'

export class TodosPage {
  readonly page: Page
  readonly input: Locator
  readonly addButton: Locator

  constructor(page: Page) {
    this.page = page
    this.input = page.getByTestId('todo-input')
    this.addButton = page.getByTestId('todo-add')
  }

  async goto() {
    await this.page.goto('/todos')
  }

  async addTodo(text: string) {
    await this.input.fill(text)
    await this.addButton.click()
  }

  item(text: string): Locator {
    return this.page.getByTestId('todo-item').filter({ hasText: text })
  }
}
```

Notes:
- Page objects hold **locators**, not asserted values — keep `expect()` calls in the
  test, not the page object, so failures point at the test's intent.
- Methods represent **user actions** ("addTodo", "deleteTodo"), not implementation
  details.
- `item(text)` returns a `Locator`, not a value — callers can chain `.click()`,
  `expect()`, or scope further off it.

## Tasks

1. Open `TodosPage.ts` and implement the class (constructor + locators are started for
   you; fill in the TODO methods):
   - `goto()` — navigate to `/todos`
   - `addTodo(text)` — fill the input and click add
   - `item(text)` — return the todo item locator filtered by text (already an example
     above — copy the idea)
   - `toggleTodo(text)` — check that item's checkbox
   - `deleteTodo(text)` — accept the confirm dialog and click that item's delete button
   - `filterBy(filter: 'all' | 'active' | 'completed')` — click the matching filter button
   - `remainingCount()` — return the text of the counter (`getByTestId('todo-count')`)

2. Open `exercise.spec.ts` and write tests **using only `TodosPage` methods and
   locators** (no raw `page.getByTestId(...)` calls in the test body):
   - `adds a todo through the page object`
   - `toggles and filters todos through the page object`
   - `deletes a todo through the page object` (handles the confirm dialog inside
     `deleteTodo`, not in the test)
