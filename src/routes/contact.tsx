import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail } from 'lucide-react'

import { seo } from '@/lib/seo'
import { CONTACT_EMAIL } from '@/lib/site'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: seo({
      title: 'Contact',
      description:
        'Have a product suggestion, a correction, or a question for Lazy Girl Guide? Get in touch here.',
    }),
  }),
  component: ContactPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', message: '', 'bot-field': '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">Contact</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Say hello, suggest a topic, or point out a typo
      </h1>
      <p className="mt-4 text-ink-soft">
        Got a product we should look into, a correction on something we published, or a general
        question? This goes straight to us — no bots in between (except the one guarding against
        spam bots, which is a little ironic).
      </p>

      {status === 'done' ? (
        <div className="mt-10 rounded-2xl border border-line bg-paper p-8 text-center">
          <p className="font-display text-xl font-semibold text-ink">Message sent.</p>
          <p className="mt-2 text-sm text-ink-soft">
            Thanks for writing in — we read every message, even if it takes us a bit to reply.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" onChange={handleChange} />
            </label>
          </p>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={fields.name}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={fields.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={fields.message}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-clay-dark">
              Something went wrong sending that. Try again, or email us directly.
            </p>
          )}
        </form>
      )}

      <div className="mt-10 flex items-center gap-2 border-t border-line pt-6 text-sm text-ink-soft">
        <Mail className="h-4 w-4" />
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-clay-dark">
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  )
}
