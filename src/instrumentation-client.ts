// Sentry browser-side initialization for biolune-website.
// Customised from the wizard default for privacy:
//  - sendDefaultPii=false
//  - Session Replay with maskAllText + blockAllMedia (we capture form
//    interactions for debugging but never the actual values typed)
//  - sample 10% of sessions in prod, 100% on errors
//  - tag with the Vercel deploy SHA
//  - run every event through scrubFormPII() to strip apply-form data
import * as Sentry from '@sentry/nextjs'
import { scrubFormPII } from '@/lib/sentry-scrub'

const isProd = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: 'https://0be24033bef2447fd5725a2e1ffabe2a@o4511173815304192.ingest.de.sentry.io/4511173901156432',
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development',
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? undefined,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: isProd ? 0.1 : 1.0,
  enableLogs: true,
  replaysSessionSampleRate: isProd ? 0.1 : 0,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: false,
  beforeSend: scrubFormPII,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
