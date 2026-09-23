export default function Home() {
  return (
    <section>
      <h2>Welcome</h2>
      <p>
        This app exists purely as a practice target for the Playwright course in{' '}
        <code>../playwright-course</code>. Each page in the sidebar exercises a different
        category of UI behaviour: forms, tables, dialogs, drag and drop, iframes, async
        loading, authentication, and more.
      </p>
      <p>
        Nothing here needs to look pretty &mdash; it needs to be realistic enough that the
        Playwright locator, action, assertion, and waiting APIs all have something meaningful
        to interact with.
      </p>
      <h3>Suggested order</h3>
      <ol>
        <li>Login &amp; Dashboard &mdash; forms, redirects, protected routes, storage state</li>
        <li>Todos &mdash; basic CRUD, checkboxes, filters, confirm dialogs</li>
        <li>Table &mdash; async data loading, search, sorting, network requests</li>
        <li>Forms &mdash; every input type and validation</li>
        <li>Dialogs &mdash; native alert/confirm/prompt and custom modals</li>
        <li>Drag &amp; Drop &mdash; pointer/drag events</li>
        <li>Tabs &mdash; conditional visibility, accordions</li>
        <li>Iframe &mdash; frame locators</li>
        <li>New Tab &mdash; multi-page / popup handling</li>
        <li>Async / Waiting &mdash; auto-waiting, polling, flaky requests</li>
      </ol>
    </section>
  )
}
