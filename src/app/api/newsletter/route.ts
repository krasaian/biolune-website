import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: process.env.ADMIN_EMAIL || 'korosh@rasaian.com',
      subject: `New newsletter subscriber — ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fef9ef; border: 1px solid #e8e2d4;">
          <h2 style="font-size: 22px; color: #1a1916; margin-bottom: 4px;">New Newsletter Subscriber</h2>
          <p style="color: #6b6960; font-size: 14px; margin-bottom: 24px;">Subscribed via biolune.eu</p>
          <p style="font-size: 15px; color: #1a1916; font-weight: 500;">${email}</p>
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
