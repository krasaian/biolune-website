import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface BiometricStats {
  hrvAvg: number
  hrvTrend: 'up' | 'down' | 'stable'
  hrvChange: number
  sleepAvg: number
  sleepTrend: 'up' | 'down' | 'stable'
  sleepChange: number
  rhrAvg: number
  rhrTrend: 'up' | 'down' | 'stable'
  rhrChange: number
  supplementCompliance: number
  trainingDays: number
  timelineCompliance: number
  decisionEngineMode: string
  topWin: string
}

function getTrendArrow(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return '↑'
    case 'down':
      return '↓'
    case 'stable':
      return '→'
    default:
      return '→'
  }
}

function getTrendColor(trend: 'up' | 'down' | 'stable', metricType: string): string {
  // HRV and sleep are better when UP, RHR is better when DOWN
  if (metricType === 'rhr') {
    return trend === 'down' ? '#2d7d4d' : trend === 'up' ? '#b8495a' : '#6b6960'
  }
  return trend === 'up' ? '#2d7d4d' : trend === 'down' ? '#b8495a' : '#6b6960'
}

function getDecisionEngineColor(mode: string): string {
  const modeColors: { [key: string]: string } = {
    'recovery': '#7b9e8f',
    'adaptation': '#a89879',
    'performance': '#b8495a',
    'maintenance': '#6b6960',
  }
  return modeColors[mode.toLowerCase()] || '#a89879'
}

function generateNextWeekFocus(stats: BiometricStats): string {
  const weakPoints: string[] = []

  if (stats.hrvAvg < 30) weakPoints.push('HRV recovery')
  if (stats.sleepAvg < 7) weakPoints.push('sleep duration')
  if (stats.rhrAvg > 60) weakPoints.push('cardiovascular efficiency')
  if (stats.supplementCompliance < 80) weakPoints.push('supplement adherence')
  if (stats.trainingDays < 3) weakPoints.push('training consistency')
  if (stats.timelineCompliance < 85) weakPoints.push('protocol adherence')

  if (weakPoints.length === 0) {
    return 'Hold your protocol as is. Your metrics are trending the right way.'
  }

  if (weakPoints.length === 1) {
    return `Focus on improving ${weakPoints[0]} this week.`
  }

  if (weakPoints.length === 2) {
    return `Prioritise ${weakPoints[0]} and ${weakPoints[1]} this week. These two will move the most.`
  }

  return `Start with ${weakPoints.slice(0, 2).join(' and ')}. Those are the two biggest gaps right now.`
}

function weeklyReportHtml(
  name: string,
  weekNumber: number,
  protocolDay: number,
  stats: BiometricStats
): string {
  const appUrl = process.env.BIOLUNE_APP_URL || 'https://biolune-app.vercel.app'
  const nextWeekFocus = generateNextWeekFocus(stats)
  const decisionEngineColor = getDecisionEngineColor(stats.decisionEngineMode)
  const firstName = name.split(' ')[0]

  return `
    <div style="font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif; background: #fef9ef; color: #1a1916; padding: 48px 40px; max-width: 580px; margin: 0 auto;">
      <!-- Header -->
      <p style="color: #A89879; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 40px; font-weight: 600;">BIOLUNE</p>

      <!-- Title -->
      <h1 style="font-size: 28px; font-weight: 300; margin-bottom: 8px; line-height: 1.3;">Your Week ${weekNumber} Report</h1>
      <p style="color: #6b6960; font-size: 14px; margin-bottom: 32px; font-weight: 400;">Day ${protocolDay} of 90</p>

      <!-- Decision Engine Mode Card -->
      <div style="background: ${decisionEngineColor}; border-radius: 8px; padding: 24px; margin-bottom: 28px; color: white;">
        <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px 0; font-weight: 600; opacity: 0.9;">Decision Engine Mode</p>
        <p style="font-size: 20px; font-weight: 400; margin: 0; letter-spacing: 0.5px;">${stats.decisionEngineMode}</p>
      </div>

      <!-- Biometrics Grid -->
      <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; font-weight: 600;">This Week's Metrics</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px;">
        <!-- HRV Card -->
        <div style="background: #f4eee0; border-radius: 8px; padding: 20px;">
          <p style="color: #6b6960; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">HRV</p>
          <p style="font-size: 26px; font-weight: 400; margin: 0 0 8px 0; color: #1a1916;">${stats.hrvAvg}</p>
          <p style="color: ${getTrendColor(stats.hrvTrend, 'hrv')}; font-size: 14px; margin: 0; font-weight: 500;">
            ${getTrendArrow(stats.hrvTrend)} ${Math.abs(stats.hrvChange)}%
          </p>
        </div>

        <!-- Sleep Card -->
        <div style="background: #f4eee0; border-radius: 8px; padding: 20px;">
          <p style="color: #6b6960; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">Sleep</p>
          <p style="font-size: 26px; font-weight: 400; margin: 0 0 8px 0; color: #1a1916;">${stats.sleepAvg.toFixed(1)}h</p>
          <p style="color: ${getTrendColor(stats.sleepTrend, 'sleep')}; font-size: 14px; margin: 0; font-weight: 500;">
            ${getTrendArrow(stats.sleepTrend)} ${Math.abs(stats.sleepChange)}%
          </p>
        </div>

        <!-- RHR Card -->
        <div style="background: #f4eee0; border-radius: 8px; padding: 20px;">
          <p style="color: #6b6960; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">Resting HR</p>
          <p style="font-size: 26px; font-weight: 400; margin: 0 0 8px 0; color: #1a1916;">${stats.rhrAvg}</p>
          <p style="color: ${getTrendColor(stats.rhrTrend, 'rhr')}; font-size: 14px; margin: 0; font-weight: 500;">
            ${getTrendArrow(stats.rhrTrend)} ${Math.abs(stats.rhrChange)}%
          </p>
        </div>

        <!-- Training Card -->
        <div style="background: #f4eee0; border-radius: 8px; padding: 20px;">
          <p style="color: #6b6960; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">Training Days</p>
          <p style="font-size: 26px; font-weight: 400; margin: 0 0 8px 0; color: #1a1916;">${stats.trainingDays}</p>
          <p style="color: #6b6960; font-size: 14px; margin: 0; font-weight: 500;">sessions completed</p>
        </div>
      </div>

      <!-- Protocol Adherence -->
      <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; font-weight: 600;">Protocol Adherence</p>

      <div style="background: #f4eee0; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
        <!-- Supplement Compliance -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <p style="color: #1a1916; font-size: 13px; margin: 0; font-weight: 500;">Supplement Compliance</p>
            <p style="color: #A89879; font-size: 13px; margin: 0; font-weight: 600;">${stats.supplementCompliance}%</p>
          </div>
          <div style="background: white; height: 6px; border-radius: 3px; overflow: hidden; border: 1px solid #e8e2d4;">
            <div style="background: #A89879; height: 100%; width: ${stats.supplementCompliance}%; border-radius: 3px;"></div>
          </div>
        </div>

        <!-- Timeline Compliance -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <p style="color: #1a1916; font-size: 13px; margin: 0; font-weight: 500;">Timeline Adherence</p>
            <p style="color: #A89879; font-size: 13px; margin: 0; font-weight: 600;">${stats.timelineCompliance}%</p>
          </div>
          <div style="background: white; height: 6px; border-radius: 3px; overflow: hidden; border: 1px solid #e8e2d4;">
            <div style="background: #A89879; height: 100%; width: ${stats.timelineCompliance}%; border-radius: 3px;"></div>
          </div>
        </div>
      </div>

      <!-- This Week's Highlight -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">This Week's Highlight</p>
        <p style="color: #1a1916; font-size: 15px; line-height: 1.6; margin: 0; font-weight: 400;">${stats.topWin}</p>
      </div>

      <!-- Next Week's Focus -->
      <div style="background: #f4eee0; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
        <p style="color: #A89879; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px 0; font-weight: 600;">Next Week's Focus</p>
        <p style="color: #1a1916; font-size: 15px; line-height: 1.6; margin: 0; font-weight: 400;">${nextWeekFocus}</p>
      </div>

      <!-- CTA Button -->
      <a href="${appUrl}" style="display: inline-block; background: #1a1916; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 48px; text-align: center; width: 100%; box-sizing: border-box;">Open Biolune</a>

      <!-- Footer -->
      <p style="color: #6b6960; font-size: 12px; line-height: 1.6; margin: 0; font-style: italic;">Lune is an AI coach, not a medical professional. Always consult with healthcare providers before making significant changes to your protocol or supplementation.</p>
    </div>
  `
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const { email, name, weekNumber, protocolDay, stats } = body

    // Validation
    if (!email || !name || weekNumber === undefined || protocolDay === undefined || !stats) {
      return NextResponse.json(
        {
          error: 'Missing required fields: email, name, weekNumber, protocolDay, or stats.',
        },
        { status: 400 }
      )
    }

    // Validate stats object
    const requiredStats = [
      'hrvAvg',
      'hrvTrend',
      'hrvChange',
      'sleepAvg',
      'sleepTrend',
      'sleepChange',
      'rhrAvg',
      'rhrTrend',
      'rhrChange',
      'supplementCompliance',
      'trainingDays',
      'timelineCompliance',
      'decisionEngineMode',
      'topWin',
    ]

    for (const stat of requiredStats) {
      if (!(stat in stats)) {
        return NextResponse.json(
          { error: `Missing stat: ${stat}` },
          { status: 400 }
        )
      }
    }

    const html = weeklyReportHtml(name, weekNumber, protocolDay, stats as BiometricStats)

    const { data, error } = await resend.emails.send({
      from: 'Biolune <noreply@biolune.eu>',
      to: email,
      subject: `Week ${weekNumber} — Your Biolune Protocol Report`,
      html,
    })

    if (error) {
      console.error('Weekly report email error:', JSON.stringify(error))
      return NextResponse.json({ error: error.message || 'Failed to send weekly report.' }, { status: 500 })
    }

    console.log('Weekly report email sent:', JSON.stringify(data))
    return NextResponse.json({ success: true, messageId: data.id })
  } catch (error) {
    console.error('Weekly report route error:', error)
    return NextResponse.json({ error: 'Failed to send weekly report email.' }, { status: 500 })
  }
}
