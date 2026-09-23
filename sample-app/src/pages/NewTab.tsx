export default function NewTab() {
  return (
    <section>
      <h2>New Tab / Popup</h2>
      <p>
        Both actions below open the Dashboard in a new browsing context tab. Practice
        Playwright's <code>page.waitForEvent('popup')</code> (or context event) here.
      </p>
      <p>
        <a href="/dashboard" target="_blank" rel="noreferrer" data-testid="new-tab-link">
          Open Dashboard in new tab (link)
        </a>
      </p>
      <button
        data-testid="new-tab-button"
        onClick={() => window.open('/dashboard', '_blank')}
      >
        Open Dashboard in new tab (window.open)
      </button>
    </section>
  )
}
