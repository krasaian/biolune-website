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

    // Spam protection: honeypot, IP rate limit, content heuristics on the
    // free-text message. Silent-drop responses (status 200) so bots don't
    // learn how to evade the filter.
    const spam = runSpamChecks(req, body, { endpoint: 'contact', contentField: 'message' })
    if (!spam.ok) {
      if (spam.error === 'silent-drop') return NextResponse.json({ success: true })
      return NextResponse.json({ error: spam.error }, { status: spam.status })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, location, objective, message } = body as Record<string, string | undefined>

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: process.env.ADMIN_EMAIL || 'korosh@rasaian.com',
      reply_to: email,
      subject: `Contact request — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fef9ef; border: 1px solid #e8e2d4;">
          <h2 style="font-size: 22px; color: #1a1916; margin-bottom: 4px;">New Contact Request</h2>
          <p style="color: #6b6960; font-size: 14px; margin-bottom: 28px;">Submitted via biolune.eu/contact</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px; font-weight: 500;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Location</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${escapeHtml(location) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Objective</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${escapeHtml(objective) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b6960; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #1a1916; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message) || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding: 16px; background: #A89879; border-radius: 4px;">
            <a href="mailto:${encodeURIComponent(email)}" style="color: #fef9ef; font-size: 13px; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase;">Reply to ${escapeHtml(name)} →</a>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message || 'Failed to send.' }, { status: 500 })
    }

    console.log('Email sent:', JSON.stringify(data))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
