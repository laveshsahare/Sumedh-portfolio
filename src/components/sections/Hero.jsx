import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={ref} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-[15%] sm:left-[20%] w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 rounded-full bg-amber-100/80 blur-3xl" />
          <div className="absolute bottom-1/4 right-[15%] sm:right-[20%] w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 rounded-full bg-rose-100/50 blur-3xl" />
        </div>
      </div>

      <motion.div style={{ opacity, y }} className="text-center px-4 sm:px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-jack text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase text-charcoal/50 mb-4 sm:mb-6"
        >
          Illustrator · Visual Storyteller · Creative
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-jack text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal leading-tight tracking-wide mb-6 sm:mb-8"
        >
          Sumedh Gaikwad
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-jack text-sm sm:text-base md:text-lg text-charcoal/50 max-w-xs sm:max-w-md mx-auto leading-relaxed"
        >
          Where imagination meets the stroke of a pen. Every artwork tells a story waiting to be discovered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-10 sm:mt-16"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={20} className="mx-auto text-charcoal/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}