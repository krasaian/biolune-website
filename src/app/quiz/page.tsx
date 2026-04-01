import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Longevity Readiness Score — Biolune',
  description: 'Take the 90-second quiz to discover your Longevity Readiness Score. 8 questions across sleep, HRV, nutrition, and recovery.',
}

export default function QuizPage() {
  return <QuizClient />
}
