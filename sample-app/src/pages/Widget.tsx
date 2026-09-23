import { useState } from 'react'

export default function Widget() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <p>I live inside an iframe.</p>
      <button data-testid="widget-increment" onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>
    </div>
  )
}
