import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn } from 'lucide-react'
import { useSiteContent } from '../../hooks/useSiteContent'

const links = [
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminRevealed, setAdminRevealed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const { content } = useSiteContent()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/' + href
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-canvas/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="group">
            <img
              src={content.logo_url}
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,${encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><rect width="56" height="56" rx="8" fill="%232D2D2D"/><text x="28" y="33" text-anchor="middle" font-size="20" fill="%23FAF9F6" font-family="sans-serif">SG</text></svg>'
                )}`
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="text-sm font-jack tracking-wider text-charcoal/70 hover:text-charcoal transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Admin — blurred by default, clears on hover, clickable */}
            <div
              className="relative p-3 -m-3"
              onMouseEnter={() => setAdminRevealed(true)}
              onMouseLeave={() => setAdminRevealed(false)}
            >
              <button
                onClick={() => navigate('/admin')}
                style={{
                  filter: adminRevealed ? 'blur(0px)' : 'blur(4px)',
                  opacity: adminRevealed ? 1 : 0.25,
                  transform: adminRevealed ? 'scale(1)' : 'scale(0.9)',
                  transition: 'filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease',
                }}
                className={`
                  relative z-10
                  flex items-center gap-2 
                  px-4 py-2 
                  font-jack text-xs tracking-wider
                  text-charcoal/70
                  bg-white/70
                  backdrop-blur-sm
                  border border-charcoal/15 
                  rounded-full
                  whitespace-nowrap
                  ${adminRevealed 
                    ? 'cursor-pointer hover:text-charcoal hover:border-charcoal/40 hover:shadow-lg hover:shadow-charcoal/15 hover:bg-white active:scale-95' 
                    : 'cursor-default pointer-events-none'
                  }
                `}
              >
                <LogIn size={13} />
                Admin
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-charcoal z-[60] p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[55] bg-canvas flex flex-col items-center justify-center gap-8"
          >
            <img
              src={content.logo_url}
              alt="Logo"
              className="h-24 w-auto object-contain mb-4 drop-shadow-md"
              onError={(e) => { e.target.style.display = 'none' }}
            />

            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => handleNav(l.href)}
                className="font-jack text-3xl text-charcoal"
              >
                {l.label}
              </motion.button>
            ))}

            {/* Mobile admin — tap once to reveal, tap again to go */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10"
            >
              <button
                onClick={() => {
                  if (adminRevealed) {
                    setMobileOpen(false)
                    navigate('/admin')
                  } else {
                    setAdminRevealed(true)
                  }
                }}
                style={{
                  filter: adminRevealed ? 'blur(0px)' : 'blur(5px)',
                  opacity: adminRevealed ? 1 : 0.15,
                  transform: adminRevealed ? 'scale(1)' : 'scale(0.85)',
                  transition: 'filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease',
                }}
                className={`
                  flex items-center gap-2 
                  px-6 py-2.5 
                  font-jack text-sm
                  text-charcoal/60
                  bg-white/60
                  border border-charcoal/15 
                  rounded-full
                  ${adminRevealed
                    ? 'hover:text-charcoal hover:shadow-lg hover:shadow-charcoal/10 hover:bg-white active:scale-95'
                    : ''
                  }
                `}
              >
                <LogIn size={16} />
                Admin Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}