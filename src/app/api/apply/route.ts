import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { name, email, location, objective, plan } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Send admin notification to Korosh
    const { data, error } = await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: 'korosh@rasaian.com',
      reply_to: email,
      subject: `New application — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fef9ef; border: 1px solid #e8e2d4;">
          <h2 style="font-size: 22px; color: #1a1916; margin-bottom: 4px;">New Biolune Application</h2>
          <p style="color: #6b6960; font-size: 14px; margin-bottom: 28px;">Submitted via biolune.eu/apply</p>

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
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #6b6960; font-size: 13px;">Objective</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d4; color: #1a1916; font-size: 14px;">${objective || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b6960; font-size: 13px;">Plan interest</td>
              <td style="padding: 10px 0; color: #A89879; font-size: 14px; font-weight: 600;">${plan || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding: 16px; background: #A89879; border-radius: 4px;">
            <a href="mailto:${email}" style="color: #fef9ef; font-size: 13px; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase;">Reply to applicant →</a>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message || 'Failed to send.' }, { status: 500 })
    }

    console.log('Admin notification sent:', JSON.stringify(data))

    // Send nurture email 1 (confirmation) to the applicant
    const applicantResend = new Resend(process.env.RESEND_API_KEY)
    const firstName = name.split(' ')[0]
    const { data: applicantData, error: applicantError } = await applicantResend.emails.send({
      from: `Korosh, Founder <hello@biolune.eu>`,
      to: email,
      reply_to: 'korosh@biolune.eu',
      subject: 'Your application is with us.',
      html: `
        <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
          <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

          <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

          <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
            We have received your application to the Biolune Protocol.
          </p>

          <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
            I read every one personally before we move forward — because the protocol only works if there is a genuine fit between what we build and what you need.
          </p>

          <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
            You will hear from us within 48 hours.
          </p>

          <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
            In the meantime, there is nothing for you to do. No forms to complete. No prep work required. Just sit with the fact that you made a decision to take your biology seriously — most people do not get that far.
          </p>

          <div style="background: #fef4e6; border-left: 4px solid #A89879; padding: 20px 24px; margin-bottom: 32px;">
            <p style="color: #1a1916; font-size: 14px; margin: 0 0 12px 0; font-weight: 500;">One thing worth knowing:</p>
            <ul style="color: #3a3935; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
              <li>We do not onboard more than 20 new members per month</li>
              <li>Every protocol is built from scratch — not a template</li>
              <li>The first 30 days are the most important. We will be in close contact.</li>
            </ul>
          </div>

          <p style="line-height: 1.8; color: #3a3935; margin-bottom: 48px; font-size: 15px;">
            Talk soon.
          </p>

          <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
          <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>

          <p style="margin-top: 32px; color: #6b6960; font-size: 13px; line-height: 1.8; font-style: italic;">
            P.S. If you have not already, you can read what the first 30 days look like at <a href="https://biolune.eu/protocol" style="color: #A89879; text-decoration: none;">biolune.eu/protocol</a>
          </p>
        </div>
      `
    })

    if (applicantError) {
      console.error('Applicant confirmation email error:', JSON.stringify(applicantError))
      // Don't return error here - admin notification was sent successfully
    } else {
      console.log('Applicant confirmation email sent:', JSON.stringify(applicantData))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Apply form error:', error)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
