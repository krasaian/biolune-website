// Sentry edge-runtime initialization for biolune-website.
// Mirror of sentry.server.config.ts trimmed for the edge runtime.
import * as Sentry from '@sentry/nextjs'
import { scrubFormPII } from '@/lib/sentry-scrub'

const isProd = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: 'https://0be24033bef2447fd5725a2e1ffabe2a@o4511173815304192.ingest.de.sentry.io/4511173901156432',
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
  release: process.env.VERCEL_GIT_COMMIT_SHA ?? undefined,
  tracesSampleRate: isProd ? 0.1 : 1.0,
  enableLogs: true,
  sendDefaultPii: false,
  beforeSend: scrubFormPII,
})
