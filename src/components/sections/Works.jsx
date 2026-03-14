import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import FilterPills from '../ui/FilterPills'
import ProjectCard from '../ui/ProjectCard'
import Lightbox from '../ui/Lightbox'
import RevealOnScroll from '../ui/RevealOnScroll'
import { Eye, X } from 'lucide-react'

export default function Works() {
  const [categories, setCategories] = useState([])
  const [artworks, setArtworks] = useState([])
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showViewAllMsg, setShowViewAllMsg] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [catRes, artRes] = await Promise.all([
          supabase.from('categories').select('*').order('sort_order'),
          supabase.from('artworks').select('*, categories(name, slug)').order('created_at', { ascending: false }),
        ])
        if (catRes.data) setCategories(catRes.data)
        if (artRes.data) setArtworks(artRes.data)
      } catch (error) {
        console.error('Error loading works:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // When "All" selected: pick one random artwork per category (max 6)
  // When specific category: show ALL works in that category
  const filteredArt = useMemo(() => {
    if (active !== 'all') {
      return artworks.filter((art) => art.categories?.slug === active)
    }

    // "All" mode — one random from each category
    const byCategory = {}
    artworks.forEach((art) => {
      const slug = art.categories?.slug || 'uncategorized'
      if (!byCategory[slug]) byCategory[slug] = []
      byCategory[slug].push(art)
    })

    const picks = []
    Object.values(byCategory).forEach((catArts) => {
      const randomIndex = Math.floor(Math.random() * catArts.length)
      picks.push(catArts[randomIndex])
    })

    // Max 6
    return picks.slice(0, 6)
  }, [artworks, active])

  return (
    <section id="works" className="relative z-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <RevealOnScroll>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-charcoal mb-12">
            Selected <span className="italic font-light">Works</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <FilterPills categories={categories} active={active} setActive={setActive} />
        </RevealOnScroll>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
          </div>
        ) : filteredArt.length === 0 ? (
          <p className="text-center text-charcoal/40 font-sans py-32">
            No artworks found. Upload some from the admin panel.
          </p>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
              <AnimatePresence mode="popLayout">
                {filteredArt.map((art) => (
                  <ProjectCard key={art.id} item={art} onClick={() => setSelected(art)} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* View All button — only shown in "All" category */}
            {active === 'all' && artworks.length > 6 && (
              <RevealOnScroll delay={0.2}>
                <div className="flex justify-center mt-14">
                  <button
                    onClick={() => setShowViewAllMsg(true)}
                    className="group flex items-center gap-3 border-2 border-charcoal/20 hover:border-charcoal text-charcoal/60 hover:text-charcoal px-8 py-3.5 rounded-full font-sans text-sm tracking-wide transition-all duration-300"
                  >
                    <Eye size={16} />
                    View All Works
                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">→</span>
                  </button>
                </div>
              </RevealOnScroll>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* View All Popup Message */}
      <AnimatePresence>
        {showViewAllMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowViewAllMsg(false)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative z-10 bg-canvas rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-charcoal/10 text-center"
            >
              <button
                onClick={() => setShowViewAllMsg(false)}
                className="absolute top-4 right-4 text-charcoal/30 hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>

              {/* Art Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-charcoal/5 flex items-center justify-center">
                <svg className="w-8 h-8 text-charcoal/40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <ellipse cx="32" cy="32" rx="24" ry="20" />
                  <circle cx="22" cy="24" r="3" />
                  <circle cx="34" cy="20" r="2.5" />
                  <circle cx="42" cy="28" r="2" />
                  <circle cx="24" cy="36" r="2.5" />
                </svg>
              </div>

              <h3 className="font-serif text-2xl font-medium text-charcoal mb-3">
                Explore by Category
              </h3>
              <p className="font-sans text-sm text-charcoal/50 leading-relaxed mb-6">
                For a more detailed and curated experience, visit each category individually.
                Every collection has its own unique story to tell!
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setActive(cat.slug)
                      setShowViewAllMsg(false)
                      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-4 py-2 text-xs font-sans tracking-wide border border-charcoal/15 rounded-full hover:bg-charcoal hover:text-canvas transition-all duration-300"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowViewAllMsg(false)}
                className="font-sans text-xs text-charcoal/30 hover:text-charcoal transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}