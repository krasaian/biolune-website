'use client'

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/blog/${slug}`
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied!')
      })
    }
  }

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/blog/${slug}`
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        '_blank',
        'width=600,height=400'
      )
    }
  }

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/blog/${slug}`
      const text = `Check out this article: "${title}" from Biolune`
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        '_blank',
        'width=600,height=400'
      )
    }
  }

  return (
    <>
      <button className="share-btn" onClick={handleCopyLink}>
        <span>📋</span>
        <span>Copy Link</span>
      </button>
      <button className="share-btn" onClick={handleShareLinkedIn}>
        <span>💼</span>
        <span>LinkedIn</span>
      </button>
      <button className="share-btn" onClick={handleShareTwitter}>
        <span>𝕏</span>
        <span>Twitter</span>
      </button>
    </>
  )
}
