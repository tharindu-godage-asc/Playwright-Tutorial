import { useState, type DragEvent } from 'react'

type Item = { id: string; label: string }

const initialItems: Item[] = [
  { id: 'a', label: 'Write test plan' },
  { id: 'b', label: 'Set up fixtures' },
  { id: 'c', label: 'Automate login' },
  { id: 'd', label: 'Add CI pipeline' },
]

export default function DragDrop() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [trash, setTrash] = useState<Item[]>([])
  const [dragId, setDragId] = useState<string | null>(null)
  const [overTrash, setOverTrash] = useState(false)

  function onDragStart(e: DragEvent<HTMLLIElement>, id: string) {
    setDragId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }

  function onDropOnItem(e: DragEvent<HTMLLIElement>, targetId: string) {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData('text/plain') || dragId
    if (!sourceId || sourceId === targetId) return
    setItems((prev) => {
      const next = [...prev]
      const from = next.findIndex((i) => i.id === sourceId)
      const to = next.findIndex((i) => i.id === targetId)
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    setDragId(null)
  }

  function onDropOnTrash(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData('text/plain') || dragId
    setOverTrash(false)
    if (!sourceId) return
    setItems((prev) => {
      const item = prev.find((i) => i.id === sourceId)
      if (item) setTrash((t) => [...t, item])
      return prev.filter((i) => i.id !== sourceId)
    })
    setDragId(null)
  }

  return (
    <section>
      <h2>Drag &amp; Drop</h2>
      <p>Reorder the list by dragging items onto each other, or drag one into the trash.</p>

      <ul className="drag-list" data-testid="drag-list">
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            data-testid={`drag-item-${item.id}`}
            onDragStart={(e) => onDragStart(e, item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropOnItem(e, item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div
        className={overTrash ? 'trash-zone over' : 'trash-zone'}
        data-testid="trash-zone"
        onDragOver={(e) => {
          e.preventDefault()
          setOverTrash(true)
        }}
        onDragLeave={() => setOverTrash(false)}
        onDrop={onDropOnTrash}
      >
        Drop here to delete ({trash.length} removed)
      </div>
    </section>
  )
}
