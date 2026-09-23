import { test, expect } from '@playwright/test'
import { TodosPage } from './TodosPage'

test('adds a todo through the page object', async ({ page }) => {
  const todos = new TodosPage(page)
  await todos.goto()
  await todos.addTodo('Buy milk')

  await expect(todos.item('Buy milk')).toBeVisible()
})

test('toggles and filters todos through the page object', async ({ page }) => {
  const todos = new TodosPage(page)
  await todos.goto()
  await todos.toggleTodo('Write first test')
  await todos.filterBy('active')

  await expect(todos.item('Write first test')).not.toBeVisible()
})

test('deletes a todo through the page object', async ({ page }) => {
  const todos = new TodosPage(page)
  await todos.goto()
  await todos.deleteTodo('Set up CI')

  await expect(todos.item('Set up CI')).not.toBeVisible()
})
