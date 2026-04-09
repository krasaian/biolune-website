import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { runSpamChecks, escapeHtml } from '@/lib/anti-spam'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    // Spam protection: honeypot + per-IP rate limit. No content field —
    // newsletter only collects an email, no free-text body to scan.
    const spam = runSpamChecks(req, body as Record<string, unknown>, { endpoint: 'newsletter' })
    if (!spam.ok) {
      if (spam.error === 'silent-drop') return NextResponse.json({ success: true })
      return NextResponse.json({ error: spam.error }, { status: spam.status })
    }

    const { email } = body as { email?: string }

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    // W16: validate format. Anything not matching a basic local@domain.tld
    // pattern is rejected before we ever forward it to Resend, so admin
    // inboxes don't fill up with garbage like "asdf" or "test@test".
    const trimmed = String(email).trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (trimmed.length > 254 || !emailPattern.test(trimmed)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: process.env.ADMIN_EMAIL || 'korosh@rasaian.com',
      subject: `New newsletter subscriber — ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fef9ef; border: 1px solid #e8e2d4;">
          <h2 style="font-size: 22px; color: #1a1916; margin-bottom: 4px;">New Newsletter Subscriber</h2>
          <p style="color: #6b6960; font-size: 14px; margin-bottom: 24px;">Subscribed via biolune.eu</p>
          <p style="font-size: 15px; color: #1a1916; font-weight: 500;">${escapeHtml(email)}</p>
          <p style="color: #6b6960; font-size: 13px; margin-top: 20px;">Add this address to your Beehiiv or Resend audience list.</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message || 'Failed to subscribe.' }, { status: 500 })
    }

    console.log('Email sent:', JSON.stringify(data))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
