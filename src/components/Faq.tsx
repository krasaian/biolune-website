'use client'
import { useState } from 'react'

interface FaqItem { q: string; a: string }

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faq-icon" />
          </button>
          <div className="faq-answer"><p>{item.a}</p></div>
        </div>
      ))}
    </div>
  )
}
