import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, location, objective } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: 'korosh@rasaian.com',
      replyTo: email,
      subject: `Contact request — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fef9ef; border: 1px solid #e8e2d4;">
          <h2 style="font-size: 22px; color: #1a1916; margin-bottom: 4px;">New Contact Request</h2>
          <p style="color: #6b6960; font-size: 14px; margin-bottom: 28px;">Submitted via biolune.eu/contact</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Location</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${location || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b6960; font-size: 13px;">Objective</td>
              <td style="padding: 10px 0; color: #1a1916; font-size: 14px;">${objective || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding: 16px; background: #A89879; border-radius: 4px;">
            <a href="mailto:${email}" style="color: #fef9ef; font-size: 13px; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase;">Reply to ${name} →</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
