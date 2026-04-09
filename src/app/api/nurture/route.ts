import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function nurture2Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        While your application is under review, I wanted to give you a window into how we think about protocol design &mdash; because it&rsquo;s different from anything else in the market.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Most health programmes start with goals. Lose weight. Improve sleep. Reduce stress. We start with biology &mdash; specifically, with the three signals that tell us more about your current state than any questionnaire.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 8px; font-size: 15px; font-weight: 500;">
        Those three signals are:
      </p>

      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <p style="color: #1a1916; font-size: 15px; margin: 0 0 16px 0; font-weight: 500;">1. Heart Rate Variability (HRV)</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 20px 0; line-height: 1.7;">Your autonomic nervous system&rsquo;s readiness score. A single number that reflects how well your body recovered overnight, how much stress load it&rsquo;s carrying, and whether today is a day to push or protect.</p>

        <p style="color: #1a1916; font-size: 15px; margin: 0 0 16px 0; font-weight: 500;">2. Sleep Architecture</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 20px 0; line-height: 1.7;">Not just how long you sleep &mdash; but how deep, how consistent, and how aligned with your chronotype. We see this before you do.</p>

        <p style="color: #1a1916; font-size: 15px; margin: 0 0 16px 0; font-weight: 500;">3. Biomarker Baseline</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0; line-height: 1.7;">Your hormonal, inflammatory, and metabolic status. This is where most high-performers have the most unclaimed upside &mdash; and the most hidden drag on performance.</p>
      </div>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        When we review your application, we&rsquo;re looking at how these three signals interact with your lifestyle, goals, and constraints. That&rsquo;s how we know what to build for you.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 48px; font-size: 15px;">
        You&rsquo;ll hear from me tomorrow with a decision.
      </p>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

function nurture3Html(firstName: string, bookingUrl: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        I&rsquo;ve reviewed your application.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Based on what you shared, I believe there&rsquo;s a real fit between where you are now and what Biolune is built to do. The next step is a 20-minute protocol consultation. Not a sales call. A working session where we look at your data, find the two or three biggest moves for you, and figure out whether the full protocol is the right step right now.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        This call is free. It&rsquo;s also limited to 4 slots per week.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${bookingUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">Book your protocol consultation</a>
      </div>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        If you&rsquo;re not ready to book yet, that&rsquo;s completely fine. Reply to this email and let me know where you&rsquo;re at. I&rsquo;ll hold your application for 7 days.
      </p>

      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">What to expect on the call</p>
        <ul style="color: #3a3935; font-size: 14px; line-height: 2.2; margin: 0; padding-left: 20px;">
          <li>15 minutes reviewing your current biometric picture</li>
          <li>The 2 to 3 biggest moves available to you right now</li>
          <li>Clear outline of what your protocol would look like</li>
          <li>No pressure. A decision only if it makes sense for both sides.</li>
        </ul>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>

      <p style="margin-top: 32px; color: #6b6960; font-size: 13px; line-height: 1.8; font-style: italic;">
        P.S. If you&rsquo;d prefer written communication before a call, just reply here and I&rsquo;ll answer any questions directly.
      </p>
    </div>
  `
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { email, name, day, bookingUrl } = body

    if (!email || !name || !day) {
      return NextResponse.json({ error: 'Missing email, name, or day.' }, { status: 400 })
    }

    const firstName = name.split(' ')[0]

    if (day === 2) {
      const { data, error } = await resend.emails.send({
        from: 'Korosh, Founder <hello@biolune.eu>',
        to: email,
        reply_to: 'korosh@biolune.eu',
        subject: 'What we\'re actually looking at in your application.',
        html: nurture2Html(firstName),
      })

      if (error) {
        console.error('Nurture email 2 error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      console.log('Nurture email 2 sent:', JSON.stringify(data))
      return NextResponse.json({ success: true, email: 2 })
    }

    if (day === 3) {
      // W21: no hardcoded Calendly fallback. The booking URL is configured
      // per-environment via the request body or BIOLUNE_BOOKING_URL env. We
      // refuse to send a nurture email pointing at the wrong calendar.
      const url = bookingUrl || process.env.BIOLUNE_BOOKING_URL
      if (!url) {
        console.error('BIOLUNE_BOOKING_URL is not configured and no bookingUrl in body — refusing to send nurture day-3 email.')
        return NextResponse.json({ error: 'Server misconfigured: booking URL missing.' }, { status: 500 })
      }
      const { data, error } = await resend.emails.send({
        from: 'Korosh, Founder <hello@biolune.eu>',
        to: email,
        reply_to: 'korosh@biolune.eu',
        subject: 'Your application decision.',
        html: nurture3Html(firstName, url),
      })

      if (error) {
        console.error('Nurture email 3 error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      console.log('Nurture email 3 sent:', JSON.stringify(data))
      return NextResponse.json({ success: true, email: 3 })
    }

    if (day === 'reject' || day === 4) {
      const { data, error } = await resend.emails.send({
        from: 'Korosh, Founder <hello@biolune.eu>',
        to: email,
        reply_to: 'korosh@biolune.eu',
        subject: 'Update on your Biolune application',
        html: `
          <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
            <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>
            <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>
            <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
              Thank you for your interest in Biolune. After reviewing your application, we&rsquo;ve decided that our current cohort isn&rsquo;t the right fit at this time.
            </p>
            <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
              This doesn&rsquo;t mean the door is closed &mdash; we open new spots regularly and your profile will be reconsidered for future cohorts.
            </p>
            <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
              In the meantime, if your health goals or situation change, feel free to reapply at <a href="https://biolune.eu/apply" style="color: #A89879; text-decoration: none;">biolune.eu/apply</a>.
            </p>
            <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
            <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
          </div>
        `,
      })
      if (error) {
        console.error('Rejection email error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, email: 'reject' })
    }

    // Beta approval email with code
    if (day === 'approve' || day === 5) {
      const betaCode = body.betaCode || 'BIOLUNE-BETA-XXXXXX'
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://biolune-app.vercel.app'
      const { data, error } = await resend.emails.send({
        from: 'Korosh, Founder <hello@biolune.eu>',
        to: email,
        reply_to: 'korosh@biolune.eu',
        subject: 'Welcome to the Biolune Beta',
        html: `
          <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #0D0B08; color: #F5F0E8; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
            <p style="color: #C4A96A; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>
            <h1 style="font-size: 24px; font-weight: 400; margin-bottom: 28px; line-height: 1.3; font-family: 'Cormorant Garamond', Georgia, serif;">Welcome, ${firstName}.</h1>
            <p style="line-height: 1.8; color: #C4C0B8; margin-bottom: 24px; font-size: 15px;">
              Your application has been approved. You&rsquo;re one of 3 beta testers selected for the first cohort of Biolune&rsquo;s AI longevity protocol.
            </p>
            <div style="background: rgba(196,169,106,0.1); border: 1px solid rgba(196,169,106,0.3); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
              <p style="font-size: 11px; color: #8A8275; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px 0;">YOUR ACCESS CODE</p>
              <p style="font-family: monospace; font-size: 24px; color: #C4A96A; font-weight: 600; letter-spacing: 3px; margin: 0;">${betaCode}</p>
            </div>
            <a href="${appUrl}/login" style="display: block; text-align: center; padding: 16px; background: #C4A96A; color: #0D0B08; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 28px;">CREATE YOUR ACCOUNT</a>
            <div style="background: rgba(255,255,255,0.04); border-radius: 8px; padding: 20px; margin-bottom: 28px;">
              <p style="color: #C4A96A; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">YOUR FIRST 30 MINUTES</p>
              <ol style="color: #C4C0B8; font-size: 14px; line-height: 2.2; margin: 0; padding-left: 20px;">
                <li>Click the link above and enter your access code</li>
                <li>Complete the 5-minute health intake questionnaire</li>
                <li>Lune will build your protocol from your answers</li>
                <li>Connect your wearable (Apple Health, Oura, or WHOOP) for daily HRV sync</li>
              </ol>
            </div>
            <p style="line-height: 1.8; color: #C4C0B8; margin-bottom: 28px; font-size: 15px;">
              This code is unique to you and single-use. If you have any questions during setup, reply to this email &mdash; I read everything personally.
            </p>
            <p style="color: #F5F0E8; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
            <p style="color: #8A8275; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
          </div>
        `,
      })
      if (error) {
        console.error('Approval email error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, email: 'approve' })
    }

    return NextResponse.json({ error: 'Invalid day. Use 2, 3, reject, or approve.' }, { status: 400 })
  } catch (error) {
    console.error('Nurture route error:', error)
    return NextResponse.json({ error: 'Failed to send nurture email.' }, { status: 500 })
  }
}
