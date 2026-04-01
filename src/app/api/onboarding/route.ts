import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function onboardingHtml(firstName: string, appUrl: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Welcome to Biolune, ${firstName}.</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Your beta access is confirmed. Below is everything you need to get started &mdash; it takes less than 5 minutes.
      </p>

      <!-- Step 1: Install the app -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">Step 1 &mdash; Install Biolune on your iPhone</p>
        <p style="color: #3a3935; font-size: 14px; line-height: 1.8; margin: 0 0 12px 0;">
          Biolune works as a web app you add to your home screen. It looks and feels like a native app &mdash; no App Store needed.
        </p>
        <ol style="color: #3a3935; font-size: 14px; line-height: 2.2; margin: 0; padding-left: 20px;">
          <li>Open <strong>Safari</strong> on your iPhone</li>
          <li>Go to <a href="${appUrl}" style="color: #A89879; text-decoration: none; font-weight: 500;">${appUrl}</a></li>
          <li>Tap the <strong>Share button</strong> (square with arrow at the bottom)</li>
          <li>Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong></li>
          <li>Tap <strong>Add</strong> &mdash; Biolune now appears as an app on your home screen</li>
        </ol>
        <p style="color: #6b6960; font-size: 13px; line-height: 1.7; margin: 12px 0 0 0; font-style: italic;">
          Important: use Safari, not Chrome. Only Safari supports Add to Home Screen on iPhone.
        </p>
      </div>

      <!-- Step 2: Log in -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">Step 2 &mdash; Log in with your beta code</p>
        <p style="color: #3a3935; font-size: 14px; line-height: 1.8; margin: 0;">
          Open the app and log in with the email you used to apply. You will receive a beta access code separately &mdash; enter it when prompted. This unlocks your personalised dashboard, Dr. Luna (your coach), and the intake form.
        </p>
      </div>

      <!-- Step 3: Connect health data -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">Step 3 &mdash; Connect your health data</p>
        <p style="color: #3a3935; font-size: 14px; line-height: 1.8; margin: 0 0 12px 0;">
          For the most precise protocol, we need your daily HRV, sleep, and heart rate data. You can connect this through Apple Health using a simple automation:
        </p>
        <ol style="color: #3a3935; font-size: 14px; line-height: 2.2; margin: 0; padding-left: 20px;">
          <li>Open the <strong>Shortcuts</strong> app on your iPhone</li>
          <li>Create a new automation: <strong>Time of Day &rarr; every morning at 7:00</strong></li>
          <li>Add action: <strong>Find Health Samples</strong> (type: Heart Rate Variability, last 24 hours)</li>
          <li>Add action: <strong>Get Contents of URL</strong> &rarr; POST to your Biolune health endpoint</li>
        </ol>
        <p style="color: #6b6960; font-size: 13px; line-height: 1.7; margin: 12px 0 0 0; font-style: italic;">
          Don&rsquo;t worry &mdash; we will send you a detailed step-by-step guide with screenshots for this. If you wear an Oura Ring, Apple Watch, or WHOOP, the data syncs automatically to Apple Health first.
        </p>
      </div>

      <!-- Step 4: Complete intake -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">Step 4 &mdash; Complete your intake (3 minutes)</p>
        <p style="color: #3a3935; font-size: 14px; line-height: 1.8; margin: 0;">
          Once logged in, you will be guided through a short intake covering your goals, sleep patterns, training history, and stress load. This is what Dr. Luna uses to build your first protocol &mdash; the more precise you are, the better your protocol will be.
        </p>
      </div>

      <!-- Step 5: Talk to Dr. Luna -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">Step 5 &mdash; Meet Dr. Luna</p>
        <p style="color: #3a3935; font-size: 14px; line-height: 1.8; margin: 0;">
          Dr. Luna is your personal performance coach inside Biolune. Ask her anything about your protocol, nutrition timing, supplement stacks, sleep architecture, or recovery. She knows your data and adapts her advice as your biology evolves.
        </p>
      </div>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Your first protocol will be ready within 48 hours of completing your intake. If you have any questions before then, reply to this email &mdash; I read everything personally.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 48px; font-size: 15px;">
        Welcome aboard.
      </p>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing email or name.' }, { status: 400 })
    }

    const firstName = name.split(' ')[0]
    const appUrl = process.env.BIOLUNE_APP_URL || 'https://biolune-app.vercel.app'

    const { data, error } = await resend.emails.send({
      from: 'Korosh, Founder <hello@biolune.eu>',
      to: email,
      reply_to: 'korosh@biolune.eu',
      subject: 'Welcome to Biolune — here\'s how to get started.',
      html: onboardingHtml(firstName, appUrl),
    })

    if (error) {
      console.error('Onboarding email error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('Onboarding email sent:', JSON.stringify(data))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding route error:', error)
    return NextResponse.json({ error: 'Failed to send onboarding email.' }, { status: 500 })
  }
}
