import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import RevealOnScroll from '../ui/RevealOnScroll'
import { Send } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.from('messages').insert([form])
      if (error) throw error
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-14 md:gap-20">
          <RevealOnScroll>
            <p className="font-jack text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3 sm:mb-4">Get in Touch</p>
            <h2 className="font-jack text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide text-charcoal mb-4 sm:mb-6">
              Let's create together
            </h2>
            <p className="font-jack text-sm sm:text-base text-charcoal/50 leading-relaxed max-w-sm">
              Have a project in mind? Send me a message and I'll get back to you as soon as possible.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal py-3 font-jack text-sm outline-none transition-colors resize-none placeholder:text-charcoal/30"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-charcoal text-canvas px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-jack text-sm tracking-wide hover:bg-pitch transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
              {status === 'sent' && (
                <p className="font-jack text-green-600 text-sm">Message sent! I'll reply soon.</p>
              )}
              {status === 'error' && (
                <p className="font-jack text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}