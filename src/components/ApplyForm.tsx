'use client'
import Link from 'next/link'

export default function ApplyForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for applying! We will be in touch within 48 hours.')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Your name</label>
        <input type="text" className="form-input" placeholder="Full name" required />
      </div>
      <div className="form-group">
        <label className="form-label">Email address</label>
        <input type="email" className="form-input" placeholder="you@example.com" required />
      </div>
      <div className="form-group">
        <label className="form-label">Where are you located?</label>
        <select className="form-select">
          <option value="">Select country…</option>
          <option>Netherlands</option>
          <option>United Kingdom</option>
          <option>Germany</option>
          <option>France</option>
          <option>Belgium</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">What is your primary objective?</label>
        <select className="form-select">
          <option value="">Select objective…</option>
          <option>Longevity</option>
          <option>Performance</option>
          <option>Recovery</option>
          <option>Health Plan</option>
          <option>Full Lab Analysis</option>
          <option>Biomarker Tracking</option>
          <option>Longevity Coaching</option>
          <option>Custom Wellness Protocol</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Which protocol interests you?</label>
        <select className="form-select">
          <option value="">Select plan…</option>
          <option>Essential — €99/month</option>
          <option>Premium — €299/month</option>
          <option>Elite — €799/month</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <button type="submit" className="btn btn-dark form-submit">Request access</button>
      <p className="form-disclaimer">
        By submitting, you agree to our <Link href="/legal/terms-of-service">terms of service</Link>.
      </p>
    </form>
  )
}
