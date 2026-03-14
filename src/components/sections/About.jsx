import { useState } from 'react'
import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { useSiteContent } from '../../hooks/useSiteContent'

export default function About() {
  const [imageError, setImageError] = useState(false)
  const { content } = useSiteContent()

  return (
    <section id="about" className="relative z-10 py-20 sm:py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-14 md:gap-20 lg:gap-24 items-center">

          {/* LEFT — Artist Image with 3D Hover */}
          <RevealOnScroll>
            <div className="flex justify-center" style={{ perspective: '1000px' }}>
              <motion.div
                whileHover={{
                  rotateY: 8,
                  rotateX: -5,
                  scale: 1.05,
                  z: 50,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative group cursor-pointer w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Shadow */}
                <div className="absolute -inset-4 bg-charcoal/5 rounded-3xl blur-2xl group-hover:bg-charcoal/10 transition-all duration-500" />

                {/* Image Card */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-charcoal/10 group-hover:border-charcoal/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                  {!imageError ? (
                    <img
                      src={content.profile_image_url}
                      alt={content.artist_name}
                      className="w-full aspect-[3/4] object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 via-canvas to-sky-50 flex items-center justify-center">
                      <div className="text-center">
                        <span className="font-jack text-5xl text-charcoal/20">SG</span>
                        <p className="text-xs text-charcoal/30 mt-3 font-jack">Add profile image</p>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <div className="p-4 sm:p-6">
                      <p className="font-jack text-xl sm:text-2xl text-white">{content.artist_name}</p>
                      <p className="font-jack text-xs sm:text-sm text-white/60 mt-1">Artist & Illustrator</p>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-200/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sky-200/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* RIGHT — About Text */}
          <RevealOnScroll delay={0.15}>
            <p className="font-jack text-xs tracking-[0.3em] uppercase text-charcoal/40 mb-3 sm:mb-4">About the Artist</p>
            <h2 className="font-jack text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide text-charcoal mb-2 sm:mb-3">
              Every line tells a story
            </h2>
            <p className="font-jack text-base sm:text-lg text-charcoal/40 mb-6 sm:mb-8">— {content.artist_name}</p>

            <div className="font-jack text-sm sm:text-base text-charcoal/60 leading-relaxed space-y-4 sm:space-y-5">
              {content.about_text.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
              {['Character Design', 'Concept Art', 'Comics', 'Digital Painting', 'Logo Design', 'Illustration', 'Visual Storytelling'].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-jack tracking-wide text-charcoal/50 border border-charcoal/10 rounded-full hover:border-charcoal/30 hover:text-charcoal/80 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}