import { useEffect, useState } from 'react'

export default function Dialogs() {
  const [alertResult, setAlertResult] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setNestedOpen(false)
        setModalOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section>
      <h2>Dialogs</h2>

      <h3>Native browser dialogs</h3>
      <p>
        Playwright intercepts these via the <code>page.on('dialog', ...)</code> event, not
        normal locators.
      </p>
      <div className="button-row">
        <button
          data-testid="alert-btn"
          onClick={() => {
            window.alert('Hello from window.alert!')
            setAlertResult('alert acknowledged')
          }}
        >
          Trigger alert
        </button>
        <button
          data-testid="confirm-btn"
          onClick={() => {
            const ok = window.confirm('Do you confirm?')
            setAlertResult(ok ? 'confirm: accepted' : 'confirm: dismissed')
          }}
        >
          Trigger confirm
        </button>
        <button
          data-testid="prompt-btn"
          onClick={() => {
            const value = window.prompt('What is your name?', 'Playwright')
            setAlertResult(value === null ? 'prompt: dismissed' : `prompt: ${value}`)
          }}
        >
          Trigger prompt
        </button>
      </div>
      {alertResult && <p data-testid="dialog-result">{alertResult}</p>}

      <h3>Custom modal</h3>
      <button data-testid="open-modal" onClick={() => setModalOpen(true)}>
        Open modal
      </button>

      {modalOpen && (
        <div className="modal-backdrop" data-testid="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal" data-testid="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Custom Modal</h3>
            <p>Click the backdrop, press Escape, or use the close button.</p>
            <button data-testid="open-nested-modal" onClick={() => setNestedOpen(true)}>
              Open nested modal
            </button>
            <button data-testid="close-modal" onClick={() => setModalOpen(false)}>
              Close
            </button>

            {nestedOpen && (
              <div
                className="modal-backdrop"
                data-testid="nested-modal-backdrop"
                onClick={() => setNestedOpen(false)}
              >
                <div className="modal" data-testid="nested-modal" onClick={(e) => e.stopPropagation()}>
                  <h4>Nested Modal</h4>
                  <button data-testid="close-nested-modal" onClick={() => setNestedOpen(false)}>
                    Close nested
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
