import { useState, type FormEvent } from 'react'

type FormState = {
  fullName: string
  email: string
  plan: string
  experience: string
  interests: string[]
  volume: number
  birthday: string
  bio: string
  fileName: string | null
  terms: boolean
}

const initialState: FormState = {
  fullName: '',
  email: '',
  plan: '',
  experience: '',
  interests: [],
  volume: 50,
  birthday: '',
  bio: '',
  fileName: null,
  terms: false,
}

export default function Forms() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState<FormState | null>(null)

  const isValid =
    form.fullName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.plan !== '' &&
    form.terms

  function toggleInterest(interest: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(form)
  }

  return (
    <section>
      <h2>Kitchen-Sink Form</h2>
      <p>Every common input type in one place, plus a JSON echo of the submitted values.</p>

      <form onSubmit={handleSubmit} aria-label="Signup form">
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            data-testid="full-name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            data-testid="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="plan">Plan</label>
          <select
            id="plan"
            data-testid="plan-select"
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
          >
            <option value="">Choose a plan…</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <fieldset className="field">
          <legend>Experience level</legend>
          {['beginner', 'intermediate', 'expert'].map((level) => (
            <label key={level} className="inline-label">
              <input
                type="radio"
                name="experience"
                value={level}
                checked={form.experience === level}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />
              {level}
            </label>
          ))}
        </fieldset>

        <fieldset className="field">
          <legend>Interests</legend>
          {['Testing', 'CI/CD', 'Accessibility', 'Performance'].map((interest) => (
            <label key={interest} className="inline-label">
              <input
                type="checkbox"
                checked={form.interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
              />
              {interest}
            </label>
          ))}
        </fieldset>

        <div className="field">
          <label htmlFor="volume">
            Notification volume: <span data-testid="volume-value">{form.volume}</span>
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={100}
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: Number(e.target.value) })}
          />
        </div>

        <div className="field">
          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            data-testid="birthday"
            value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            data-testid="bio"
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="avatar">Avatar upload</label>
          <input
            id="avatar"
            type="file"
            data-testid="avatar-upload"
            onChange={(e) => setForm({ ...form, fileName: e.target.files?.[0]?.name ?? null })}
          />
          {form.fileName && <p data-testid="uploaded-filename">Selected: {form.fileName}</p>}
        </div>

        <div className="field">
          <label className="inline-label">
            <input
              type="checkbox"
              data-testid="terms-checkbox"
              checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            />
            I agree to the terms
          </label>
        </div>

        <button type="submit" disabled={!isValid} data-testid="form-submit">
          Submit
        </button>
      </form>

      {submitted && (
        <div data-testid="form-success" role="status">
          <h3>Submitted!</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}
