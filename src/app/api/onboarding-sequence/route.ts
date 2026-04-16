import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const appUrl = process.env.BIOLUNE_APP_URL || 'https://app.biolune.eu'

function day1Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Your protocol is live.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Over the next seven days you'll see how the system works. Your morning timeline lands by 6 AM each day. Your day ahead, built from overnight biometric data. Lune is ready to answer any questions about your protocol, your data, or what you're seeing.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        Start logging your supplements today. This data matters most in the first three weeks, while your system is adapting to the intervention stack.
      </p>

      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">The biggest move you can make today</p>
        <p style="color: #1a1916; font-size: 15px; margin: 0; line-height: 1.7;">Get 10 minutes of outdoor light within 60 minutes of waking. This anchors your circadian rhythm and sets the day's biometric trajectory.</p>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${appUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">Open Biolune</a>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

function day3Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        You've had three days to see your morning timelines. Each one is built by the Decision Engine &mdash; and right now, it's still learning.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        The Decision Engine is how Biolune tunes to your biology. It reads three core signals, your HRV, sleep architecture, and resting heart rate, and translates them into one of six daily modes. Each mode prescribes different training intensity, supplement timing, and lifestyle priorities.
      </p>

      <div style="background: #f4eee0; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin: 0 0 12px 0;">The six modes</p>
        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">TRAIN HARD</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 14px 0; line-height: 1.6;">You've recovered. Push intensity.</p>

        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">TRAIN LIGHT</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 14px 0; line-height: 1.6;">You're loaded. Keep intensity moderate.</p>

        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">DELOAD</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 14px 0; line-height: 1.6;">You need recovery. Prioritize movement and parasympathetic activation.</p>

        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">PROTECT SLEEP</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 14px 0; line-height: 1.6;">You're sleep-deprived. Minimize stressors.</p>

        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">TRAVEL</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0 0 14px 0; line-height: 1.6;">You're in disruption. Stabilize circadian rhythm first.</p>

        <p style="color: #1a1916; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">BASELINE</p>
        <p style="color: #3a3935; font-size: 14px; margin: 0; line-height: 1.6;">Optimal balance. Maintain protocol consistency.</p>
      </div>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        In four days you'll have seven days of data. That's when the engine activates fully and the protocol sharpens to you. Until then, the mode recommendations are still calibrating to your signal pattern.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${appUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">Check today's mode</a>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

function day7Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        You've completed your first week. That matters.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        As of today, your Decision Engine is fully calibrated. Seven days of HRV, sleep, and RHR data has given it enough signal to move beyond generic recommendations. The modes you see now reflect how your nervous system actually responds to stress, sleep timing, and training load.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        Ask Lune for your first weekly insights. Lune can now see patterns in your data that matter &mdash; your sleep consistency, your HRV trends, how your body responded to the first intervention week. The conversation will be more precise.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${appUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">Talk to Lune</a>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

function day14Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        You're in the adaptation window now.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Weeks two and three are when the protocol becomes visible. Your circadian rhythm is stabilizing to your new sleep schedule. The supplement stack is reaching sufficient concentration in your system. Recovery quality is improving. Sleep consistency deepens. The morning timeline starts to feel less like guidance and more like an accurate prediction of how you'll feel.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        If you haven't uploaded blood work yet, now is the time. Lune uses biomarker context to make more precise recommendations &mdash; especially around supplement timing and training response. Two weeks of data plus bloodwork creates clarity on what's working and what needs adjustment.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        At this point, Lune's recommendations become more targeted. Generic suggestions are gone. What remains is specifically built for your biology.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${appUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">Upload blood work</a>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

function day30Html(firstName: string) {
  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <h1 style="font-size: 20px; font-weight: 400; margin-bottom: 28px; line-height: 1.4;">Hi ${firstName},</h1>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Thirty days. Your biological baseline is established.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        The 30-day HRV baseline you've built is now the floor everything is measured against. Every future decision. Every recommendation. Every mode assignment. Every protocol adjustment. All of it calibrated against this baseline. Your personal normal.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        Month two is where the protocol sharpens. Lune now has 30 days of signal to read. Which interventions are actually moving your body? Which parts of the stack are pulling the most weight? Where are the diminishing returns? These questions can be answered now.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 20px; font-size: 15px;">
        If you haven't done a weekly check-in with Lune yet, now is the time. The insights are precise enough to be worth the conversation.
      </p>

      <p style="line-height: 1.8; color: #3a3935; margin-bottom: 28px; font-size: 15px;">
        You're no longer in the calibration phase. You're in the compounding phase.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${appUrl}" style="display: inline-block; background: #A89879; color: #fef9ef; padding: 16px 36px; border-radius: 4px; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; text-decoration: none; font-weight: 400;">View your progress</a>
      </div>

      <p style="color: #1a1916; font-size: 15px; margin: 0; font-weight: 500;">Korosh</p>
      <p style="color: #6b6960; font-size: 13px; margin: 4px 0 0 0;">Founder, Biolune</p>
    </div>
  `
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { email, name, day } = body

    if (!email || !name || !day) {
      return NextResponse.json({ error: 'Missing email, name, or day.' }, { status: 400 })
    }

    if (![1, 3, 7, 14, 30].includes(day)) {
      return NextResponse.json({ error: 'Invalid day. Use 1, 3, 7, 14, or 30.' }, { status: 400 })
    }

    const firstName = name.split(' ')[0]
    let subject = ''
    let html = ''

    switch (day) {
      case 1:
        subject = 'Day 1 — Your protocol is live.'
        html = day1Html(firstName)
        break
      case 3:
        subject = 'Day 3 — The signal behind your protocol.'
        html = day3Html(firstName)
        break
      case 7:
        subject = 'One week in — here\'s what we see.'
        html = day7Html(firstName)
        break
      case 14:
        subject = 'Two weeks — the adaptation window.'
        html = day14Html(firstName)
        break
      case 30:
        subject = '30 days — your biological baseline.'
        html = day30Html(firstName)
        break
    }

    const { data, error } = await resend.emails.send({
      from: 'Korosh, Founder <hello@biolune.eu>',
      to: email,
      reply_to: 'korosh@biolune.eu',
      subject,
      html,
    })

    if (error) {
      console.error(`Onboarding sequence day ${day} error:`, JSON.stringify(error))
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Onboarding sequence day ${day} sent:`, JSON.stringify(data))
    return NextResponse.json({ success: true, day, email: email })
  } catch (error) {
    console.error('Onboarding sequence route error:', error)
    return NextResponse.json({ error: 'Failed to send onboarding sequence email.' }, { status: 500 })
  }
}
