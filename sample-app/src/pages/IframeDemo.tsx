export default function IframeDemo() {
  return (
    <section>
      <h2>Iframe</h2>
      <p>
        The box below is a real <code>&lt;iframe&gt;</code> pointing at <code>/widget</code>.
        Use Playwright's <code>page.frameLocator()</code> to interact with elements inside it.
      </p>
      <iframe
        title="widget"
        src="/widget"
        data-testid="widget-frame"
        style={{ width: '100%', height: 220, border: '1px solid var(--border)' }}
      />
    </section>
  )
}
