import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Save, Eye, Image, FileText, RefreshCw, Link2, MessageCircle, Phone as PhoneIcon, Globe } from 'lucide-react'

export default function Settings() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  // Site content
  const [aboutText, setAboutText] = useState('')
  const [logoPreview, setLogoPreview] = useState('')
  const [profilePreview, setProfilePreview] = useState('')
  const [contentLoading, setContentLoading] = useState(false)
  const [contentMsg, setContentMsg] = useState('')
  const [contentId, setContentId] = useState(null)

  // Social links
  const [instagramUrl, setInstagramUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [socialMsg, setSocialMsg] = useState('')
  const [socialLoading, setSocialLoading] = useState(false)

  const logoInputRef = useRef(null)
  const profileInputRef = useRef(null)

  // Load everything
  useEffect(() => {
    async function load() {
      const { data: adminData } = await supabase.from('admin_settings').select('*').limit(1).single()
      if (adminData) {
        setPhone(adminData.phone || '')
        setPassword(adminData.password || '')
      }

      const { data: contentData } = await supabase.from('site_content').select('*').limit(1).single()
      if (contentData) {
        setContentId(contentData.id)
        setAboutText(contentData.about_text || '')
        setLogoPreview(contentData.logo_url || '')
        setProfilePreview(contentData.profile_image_url || '')
        setInstagramUrl(contentData.instagram_url || '')
        setYoutubeUrl(contentData.youtube_url || '')
        setLinkedinUrl(contentData.linkedin_url || '')
        setWhatsappNumber(contentData.whatsapp_number || '')
        setWhatsappMessage(contentData.whatsapp_message || '')
      }
    }
    load()
  }, [])

  // ── Save admin credentials ──
  const handleSaveCredentials = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const { data: existing } = await supabase.from('admin_settings').select('id').limit(1).single()
      if (existing) {
        await supabase.from('admin_settings').update({ phone, password }).eq('id', existing.id)
      }
      setMsg('Credentials updated!')
      setTimeout(() => setMsg(''), 3000)
    } catch {
      setMsg('Failed to save.')
    } finally {
      setLoading(false)
    }
  }

  // ── Upload file ──
  const uploadFile = async (file, folder) => {
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(fileName, file, { upsert: true })
    if (error) throw error
    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  // ── Logo upload ──
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setContentLoading(true)
    try {
      const url = await uploadFile(file, 'logos')
      setLogoPreview(url)
      if (contentId) {
        await supabase.from('site_content').update({ logo_url: url, updated_at: new Date().toISOString() }).eq('id', contentId)
      }
      setContentMsg('Logo updated!')
      setTimeout(() => setContentMsg(''), 3000)
    } catch (err) {
      setContentMsg('Failed to upload logo: ' + err.message)
    } finally {
      setContentLoading(false)
    }
  }

  // ── Profile upload ──
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setContentLoading(true)
    try {
      const url = await uploadFile(file, 'profiles')
      setProfilePreview(url)
      if (contentId) {
        await supabase.from('site_content').update({ profile_image_url: url, updated_at: new Date().toISOString() }).eq('id', contentId)
      }
      setContentMsg('Profile image updated!')
      setTimeout(() => setContentMsg(''), 3000)
    } catch (err) {
      setContentMsg('Failed to upload: ' + err.message)
    } finally {
      setContentLoading(false)
    }
  }

  // ── Save about text ──
  const handleSaveAbout = async () => {
    setContentLoading(true)
    try {
      if (contentId) {
        await supabase.from('site_content').update({ about_text: aboutText, updated_at: new Date().toISOString() }).eq('id', contentId)
      }
      setContentMsg('About text saved!')
      setTimeout(() => setContentMsg(''), 3000)
    } catch {
      setContentMsg('Failed to save about text.')
    } finally {
      setContentLoading(false)
    }
  }

  // ── Save social links ──
  const handleSaveSocials = async () => {
    setSocialLoading(true)
    setSocialMsg('')
    try {
      if (contentId) {
        await supabase.from('site_content').update({
          instagram_url: instagramUrl,
          youtube_url: youtubeUrl,
          linkedin_url: linkedinUrl,
          whatsapp_number: whatsappNumber,
          whatsapp_message: whatsappMessage,
          updated_at: new Date().toISOString(),
        }).eq('id', contentId)
      }
      setSocialMsg('Social links saved!')
      setTimeout(() => setSocialMsg(''), 3000)
    } catch {
      setSocialMsg('Failed to save social links.')
    } finally {
      setSocialLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="font-jack text-2xl text-charcoal mb-8">Settings</h2>

      {/* ═══════════════════════════════════ */}
      {/* ── Site Content ── */}
      {/* ═══════════════════════════════════ */}
      <div className="canvas-card rounded-2xl p-5 sm:p-8 mb-8">
        <h3 className="font-jack text-lg text-charcoal mb-6 flex items-center gap-2">
          <Eye size={18} />
          Site Content
        </h3>

        {contentMsg && (
          <div className="mb-4 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 font-jack text-sm">
            {contentMsg}
          </div>
        )}

        {/* Logo */}
        <div className="mb-8">
          <label className="font-jack text-sm text-charcoal/60 mb-3 block">Logo</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-16 flex items-center justify-center flex-shrink-0">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-16 w-auto object-contain" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-charcoal/5 flex items-center justify-center">
                  <Image size={24} className="text-charcoal/20" />
                </div>
              )}
            </div>
            <div>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <button onClick={() => logoInputRef.current?.click()} disabled={contentLoading}
                className="flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg font-jack text-sm text-charcoal/70 hover:bg-charcoal/5 transition-colors disabled:opacity-50">
                <Upload size={14} /> Upload New Logo
              </button>
              <p className="font-jack text-xs text-charcoal/30 mt-2">PNG with transparent background recommended</p>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="mb-8">
          <label className="font-jack text-sm text-charcoal/60 mb-3 block">Profile Image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-charcoal/10 bg-canvas flex items-center justify-center flex-shrink-0">
              {profilePreview ? (
                <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Image size={24} className="text-charcoal/20" />
              )}
            </div>
            <div>
              <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
              <button onClick={() => profileInputRef.current?.click()} disabled={contentLoading}
                className="flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg font-jack text-sm text-charcoal/70 hover:bg-charcoal/5 transition-colors disabled:opacity-50">
                <Upload size={14} /> Upload Profile Image
              </button>
              <p className="font-jack text-xs text-charcoal/30 mt-2">Portrait orientation works best (3:4 ratio)</p>
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="mb-6">
          <label className="font-jack text-sm text-charcoal/60 mb-3 flex items-center gap-2">
            <FileText size={14} /> About Section Text
          </label>
          <textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)} rows={6}
            className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl p-4 font-jack text-sm outline-none transition-colors resize-y placeholder:text-charcoal/30"
            placeholder="Write your about section here..." />
          <p className="font-jack text-xs text-charcoal/30 mt-2">Use new lines to separate paragraphs</p>
        </div>

        <button onClick={handleSaveAbout} disabled={contentLoading}
          className="flex items-center gap-2 bg-charcoal text-canvas px-6 py-3 rounded-full font-jack text-sm hover:bg-pitch transition-colors disabled:opacity-50">
          {contentLoading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          Save Content
        </button>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* ── Social Links & WhatsApp ── */}
      {/* ═══════════════════════════════════ */}
      <div className="canvas-card rounded-2xl p-5 sm:p-8 mb-8">
        <h3 className="font-jack text-lg text-charcoal mb-6 flex items-center gap-2">
          <Globe size={18} />
          Social Links & WhatsApp
        </h3>

        {socialMsg && (
          <div className={`mb-4 px-4 py-2 rounded-lg font-jack text-sm ${
            socialMsg.includes('Failed')
              ? 'bg-red-50 border border-red-200 text-red-600'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {socialMsg}
          </div>
        )}

        <div className="space-y-5">
          {/* Instagram */}
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              Instagram URL
            </label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://www.instagram.com/your_username/"
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/25"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube Channel URL
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/@your_channel"
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/25"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/your_profile/"
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/25"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-charcoal/10 pt-5">
            <p className="font-jack text-xs text-charcoal/40 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageCircle size={14} />
              WhatsApp Settings
            </p>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 flex items-center gap-2">
              <PhoneIcon size={14} />
              WhatsApp Number
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="919876543210 (country code + number, no spaces)"
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors placeholder:text-charcoal/25"
            />
            <p className="font-jack text-xs text-charcoal/30 mt-2">
              Format: country code + number without + or spaces. Example: 919876543210
            </p>
          </div>

          {/* WhatsApp Default Message */}
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 flex items-center gap-2">
              <MessageCircle size={14} />
              Default Message from Customer
            </label>
            <textarea
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              rows={3}
              placeholder="Hi! I saw your portfolio and would love to connect."
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl p-4 font-jack text-sm outline-none transition-colors resize-y placeholder:text-charcoal/25"
            />
            <p className="font-jack text-xs text-charcoal/30 mt-2">
              This message will be pre-filled when someone clicks the WhatsApp icon
            </p>
          </div>

          {/* Preview */}
          {whatsappNumber && (
            <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-4">
              <p className="font-jack text-xs text-green-700 mb-2">Preview WhatsApp Link:</p>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jack text-xs text-green-600 underline break-all"
              >
                wa.me/{whatsappNumber.replace(/[^0-9]/g, '')}
              </a>
              {whatsappMessage && (
                <p className="font-jack text-xs text-green-600/60 mt-1 italic">"{whatsappMessage}"</p>
              )}
            </div>
          )}
        </div>

        <button onClick={handleSaveSocials} disabled={socialLoading}
          className="flex items-center gap-2 bg-charcoal text-canvas px-6 py-3 rounded-full font-jack text-sm hover:bg-pitch transition-colors disabled:opacity-50 mt-6">
          {socialLoading ? <RefreshCw size={14} className="animate-spin" /> : <Link2 size={14} />}
          Save Social Links
        </button>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* ── Admin Credentials ── */}
      {/* ═══════════════════════════════════ */}
      <div className="canvas-card rounded-2xl p-5 sm:p-8">
        <h3 className="font-jack text-lg text-charcoal mb-6">Admin Credentials</h3>
        <form onSubmit={handleSaveCredentials} className="space-y-5">
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 block">Phone Number</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="font-jack text-sm text-charcoal/60 mb-2 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border border-charcoal/10 focus:border-charcoal/30 rounded-xl px-4 py-3 font-jack text-sm outline-none transition-colors" />
          </div>
          {msg && <p className={`font-jack text-sm ${msg.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>{msg}</p>}
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 bg-charcoal text-canvas px-6 py-3 rounded-full font-jack text-sm hover:bg-pitch transition-colors disabled:opacity-50">
            <Save size={14} />
            {loading ? 'Saving...' : 'Save Credentials'}
          </button>
        </form>
      </div>
    </div>
  )
}