import { test, expect } from '@playwright/test'
import { TodosPage } from './TodosPage'

test('adds a todo through the page object', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  const todos = new TodosPage(page)
  // TODO: todos.goto()
  // TODO: todos.addTodo('Buy milk')
  // TODO: assert todos.item('Buy milk') is visible
})

test('toggles and filters todos through the page object', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  const todos = new TodosPage(page)
  // TODO: goto, toggleTodo('Write first test'), filterBy('active')
  // TODO: assert todos.item('Write first test') is not visible (it's now completed)
})

test('deletes a todo through the page object', async ({ page }) => {
  test.skip(true, 'Remove this line once you start implementing the test')

  const todos = new TodosPage(page)
  // TODO: goto, deleteTodo('Set up CI')
  // TODO: assert todos.item('Set up CI') is not visible
})
