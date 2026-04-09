import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Find Your Tier — Biolune',
  description: 'Five questions about how you live, train, and track your biology. We tell you which Biolune protocol — Protocol, Precision, or Elite — fits you right now.',
}

export default function QuizPage() {
  return <QuizClient />
}
