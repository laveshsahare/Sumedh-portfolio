import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useStore } from '../../store/useStore'
import { Lock, Phone } from 'lucide-react'
import FloatingElements from '../ui/FloatingElements'
import { useSiteContent } from '../../hooks/useSiteContent'

export default function AdminLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const setIsAdmin = useStore((s) => s.setIsAdmin)
  const { content } = useSiteContent()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error: dbError } = await supabase
        .from('admin_settings').select('*').eq('phone', phone).eq('password', password).single()
      if (dbError || !data) setError('Invalid phone number or password.')
      else setIsAdmin(true)
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4 sm:px-6 relative">
      <div className="canvas-vignette" />
      <FloatingElements />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <img
            src={content.logo_url}
            alt="Logo"
            className="h-20 sm:h-24 w-auto mx-auto mb-4 object-contain drop-shadow-md"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <p className="font-jack text-sm text-charcoal/40">Admin access only</p>
        </div>
        <div className="canvas-card rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div className="relative">
              <Phone size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/30" />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required
                className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal py-3 pl-7 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/30" />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/30" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-transparent border-b border-charcoal/20 focus:border-charcoal py-3 pl-7 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/30" />
            </div>
            {error && <p className="text-red-500 text-sm font-jack">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-charcoal text-canvas py-3 sm:py-3.5 rounded-full font-jack text-sm tracking-wide hover:bg-pitch transition-colors disabled:opacity-50">
              {loading ? 'Verifying...' : 'Enter the Vault'}
            </button>
          </form>
        </div>
        <p className="text-center mt-6 sm:mt-8">
          <a href="/" className="font-jack text-xs text-charcoal/30 hover:text-charcoal transition-colors">← Back to portfolio</a>
        </p>
      </div>
    </div>
  )
}