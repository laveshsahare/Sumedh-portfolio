import { useSiteContent } from '../../hooks/useSiteContent'

export default function Footer() {
  const { content } = useSiteContent()

  const whatsappUrl = content.whatsapp_number
    ? `https://wa.me/${content.whatsapp_number.replace(/[^0-9]/g, '')}${
        content.whatsapp_message
          ? `?text=${encodeURIComponent(content.whatsapp_message)}`
          : ''
      }`
    : '#'

  const socials = [
    {
      name: 'Instagram',
      url: content.instagram_url || '#',
      color: 'hover:shadow-pink-300/50',
      hoverBg: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: content.youtube_url || '#',
      color: 'hover:shadow-red-400/50',
      hoverBg: 'hover:bg-red-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: content.linkedin_url || '#',
      color: 'hover:shadow-blue-400/50',
      hoverBg: 'hover:bg-[#0A66C2]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      color: 'hover:shadow-green-400/50',
      hoverBg: 'hover:bg-[#25D366]',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="relative z-10 border-t border-charcoal/10 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16">
        <div className="flex flex-col items-center gap-8">

          {/* Logo */}
          <img
            src={content.logo_url}
            alt="Logo"
            className="h-20 sm:h-24 md:h-28 w-auto object-contain hover:scale-110 hover:drop-shadow-xl transition-all duration-300 drop-shadow-md"
            onError={(e) => { e.target.style.display = 'none' }}
          />

          {/* Social Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {socials.map((social) => (
              social.url && social.url !== '#' ? (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className={`
                    w-11 h-11 sm:w-12 sm:h-12 
                    rounded-full 
                    flex items-center justify-center 
                    bg-charcoal/5 
                    text-charcoal/60 
                    border border-charcoal/10
                    transition-all duration-300 
                    hover:text-white 
                    hover:border-transparent
                    hover:scale-110
                    hover:shadow-xl
                    ${social.color}
                    ${social.hoverBg}
                  `}
                >
                  {social.icon}
                </a>
              ) : (
                <div
                  key={social.name}
                  title={`${social.name} — not configured`}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-charcoal/5 text-charcoal/20 border border-charcoal/5 cursor-not-allowed"
                >
                  {social.icon}
                </div>
              )
            ))}
          </div>

          <div className="w-16 h-px bg-charcoal/10" />

          <p className="font-jack text-xs sm:text-sm text-charcoal/40 text-center">
            © {new Date().getFullYear()} {content.artist_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}