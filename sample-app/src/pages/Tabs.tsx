import { useState } from 'react'

const panels = [
  { id: 'overview', title: 'Overview', body: 'This is the overview panel.' },
  { id: 'details', title: 'Details', body: 'This is the details panel, with more text.' },
  { id: 'settings', title: 'Settings', body: 'This is the settings panel.' },
]

const accordionItems = [
  { id: 'faq1', q: 'Why practice on a real app?', a: 'Selectors behave differently than in static HTML fixtures.' },
  { id: 'faq2', q: 'Is this data real?', a: 'No, it is served by a tiny fake API in vite.config.ts.' },
]

export default function Tabs() {
  const [active, setActive] = useState(panels[0].id)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  return (
    <section>
      <h2>Tabs &amp; Accordion</h2>

      <div role="tablist" aria-label="Demo tabs" className="tab-list">
        {panels.map((panel) => (
          <button
            key={panel.id}
            role="tab"
            aria-selected={active === panel.id}
            data-testid={`tab-${panel.id}`}
            className={active === panel.id ? 'tab active' : 'tab'}
            onClick={() => setActive(panel.id)}
          >
            {panel.title}
          </button>
        ))}
      </div>

      {panels.map(
        (panel) =>
          active === panel.id && (
            <div key={panel.id} role="tabpanel" data-testid={`panel-${panel.id}`}>
              {panel.body}
            </div>
          ),
      )}

      <h3>Accordion</h3>
      {accordionItems.map((item) => (
        <div key={item.id} className="accordion-item">
          <button
            data-testid={`accordion-toggle-${item.id}`}
            onClick={() => setOpenAccordion((prev) => (prev === item.id ? null : item.id))}
            aria-expanded={openAccordion === item.id}
          >
            {item.q}
          </button>
          {openAccordion === item.id && (
            <p data-testid={`accordion-body-${item.id}`}>{item.a}</p>
          )}
        </div>
      ))}
    </section>
  )
}
