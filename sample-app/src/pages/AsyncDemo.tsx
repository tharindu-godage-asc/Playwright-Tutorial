import { useEffect, useState } from 'react'

export default function AsyncDemo() {
  const [loadingText, setLoadingText] = useState<string | null>(null)
  const [delayedVisible, setDelayedVisible] = useState(false)
  const [pollCount, setPollCount] = useState(0)
  const [flakyStatus, setFlakyStatus] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDelayedVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setPollCount((c) => c + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  function handleSlowClick() {
    setLoadingText('Loading…')
    setTimeout(() => setLoadingText('Done!'), 1500)
  }

  async function callFlaky() {
    setFlakyStatus('Loading…')
    try {
      const res = await fetch('/api/flaky')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setFlakyStatus(data.message)
    } catch (err) {
      setFlakyStatus(`Error: ${(err as Error).message}`)
    }
  }

  return (
    <section>
      <h2>Async / Waiting</h2>

      <h3>Auto-waiting for text to change</h3>
      <button data-testid="slow-button" onClick={handleSlowClick}>
        Start slow action
      </button>
      <p data-testid="slow-result">{loadingText ?? 'Idle'}</p>

      <h3>Element that appears after a delay</h3>
      <p>
        Appears 2 seconds after mount &mdash; a good target for the default auto-waiting
        assertion <code>await expect(locator).toBeVisible()</code> instead of a manual sleep.
      </p>
      {delayedVisible && <p data-testid="delayed-element">I appeared after 2 seconds!</p>}

      <h3>Polling counter</h3>
      <p>
        Increments every second forever &mdash; good for practicing{' '}
        <code>expect.poll()</code> or <code>toPass()</code>.
      </p>
      <p data-testid="poll-counter">{pollCount}</p>

      <h3>Flaky network request</h3>
      <p>
        Calls <code>/api/flaky</code>, which fails about 40% of the time on purpose. Practice
        retries with <code>expect(async () =&gt; ...).toPass()</code> or test-level retries.
      </p>
      <button data-testid="flaky-button" onClick={callFlaky}>
        Call flaky endpoint
      </button>
      <p data-testid="flaky-result">{flakyStatus ?? 'Idle'}</p>
    </section>
  )
}
