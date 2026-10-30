import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Lightbox({ item, onClose }) {
  const handleClose = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center pt-24 pb-6 px-4 sm:px-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-[9998] w-full max-w-5xl flex flex-col items-center justify-center mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Wrapper */}
        <div className="relative inline-block max-w-[90vw]">
          <img
            src={item.image_url}
            alt={item.title}
            className="block max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl mx-auto"
          />
        </div>

        {/* Caption info */}
        <div className="mt-4 sm:mt-5 text-center px-2">
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">{item.title}</h3>
          {item.description && (
            <p className="text-white/50 font-sans text-xs sm:text-sm mt-1 max-w-lg mx-auto">{item.description}</p>
          )}
          <p className="text-white/30 text-xs sm:text-sm font-sans mt-1">
            {item.categories?.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}