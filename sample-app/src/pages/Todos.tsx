import { useState, type FormEvent } from 'react'

type Todo = { id: number; text: string; done: boolean }
type Filter = 'all' | 'active' | 'completed'

let nextId = 4

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn Playwright locators', done: true },
    { id: 2, text: 'Write first test', done: false },
    { id: 3, text: 'Set up CI', done: false },
  ])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  function addTodo(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [...prev, { id: nextId++, text: trimmed, done: false }])
    setText('')
  }

  function toggleTodo(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id: number) {
    if (!window.confirm('Delete this todo?')) return
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'completed') return t.done
    return true
  })
  const remaining = todos.filter((t) => !t.done).length

  return (
    <section>
      <h2>Todos</h2>
      <form onSubmit={addTodo} aria-label="Add todo form">
        <input
          data-testid="todo-input"
          placeholder="What needs doing?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" data-testid="todo-add">
          Add
        </button>
      </form>

      <div className="filters" role="group" aria-label="Filter todos">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            className={filter === f ? 'filter-btn active' : 'filter-btn'}
            data-testid={`filter-${f}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="todo-list" data-testid="todo-list">
        {visible.map((todo) => (
          <li key={todo.id} data-testid="todo-item" data-done={todo.done}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                data-testid="todo-checkbox"
              />
              <span className={todo.done ? 'todo-text done' : 'todo-text'}>{todo.text}</span>
            </label>
            <button
              aria-label={`Delete ${todo.text}`}
              onClick={() => deleteTodo(todo.id)}
              data-testid="todo-delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p data-testid="todo-count">{remaining} item(s) left</p>
    </section>
  )
}
