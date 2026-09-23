import type { Page, Locator } from '@playwright/test'

export class TodosPage {
  readonly page: Page
  readonly input: Locator
  readonly addButton: Locator
  readonly counter: Locator

  constructor(page: Page) {
    this.page = page
    this.input = page.getByTestId('todo-input')
    this.addButton = page.getByTestId('todo-add')
    this.counter = page.getByTestId('todo-count')
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

  async toggleTodo(text: string) {
    await this.item(text).getByTestId('todo-checkbox').check()
  }

  async deleteTodo(text: string) {
    this.page.once('dialog', (dialog) => dialog.accept())
    await this.item(text).getByTestId('todo-delete').click()
  }

  async filterBy(filter: 'all' | 'active' | 'completed') {
    await this.page.getByTestId(`filter-${filter}`).click()
  }

  async remainingCount(): Promise<string | null> {
    return this.counter.textContent()
  }
}
