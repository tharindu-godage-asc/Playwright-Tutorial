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
    // TODO: navigate to '/todos'
  }

  async addTodo(text: string) {
    // TODO: fill this.input, click this.addButton
  }

  item(text: string): Locator {
    // TODO: return the todo-item locator filtered by this text
    throw new Error('not implemented')
  }

  async toggleTodo(text: string) {
    // TODO: within this.item(text), check the checkbox (data-testid="todo-checkbox")
  }

  async deleteTodo(text: string) {
    // TODO: register a dialog handler that accepts
    // TODO: within this.item(text), click the delete button (data-testid="todo-delete")
  }

  async filterBy(filter: 'all' | 'active' | 'completed') {
    // TODO: click the button with data-testid=`filter-${filter}`
  }

  async remainingCount(): Promise<string | null> {
    // TODO: return this.counter's text content
    throw new Error('not implemented')
  }
}
