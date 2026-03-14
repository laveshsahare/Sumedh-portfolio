import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
      className="fixed inset-0 z-[9998] flex items-center justify-center"
    >
      {/* Backdrop — clicking this closes */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Close Button — always on top */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-[9999] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors duration-200 cursor-pointer"
      >
        <X size={24} />
      </button>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-[9999] max-w-5xl w-full mx-4 flex flex-col items-center"
      >
        <img
          src={item.image_url}
          alt={item.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-6 text-center">
          <h3 className="font-serif text-2xl text-white font-medium">{item.title}</h3>
          {item.description && (
            <p className="text-white/50 font-sans mt-2 max-w-lg">{item.description}</p>
          )}
          <p className="text-white/30 text-sm font-sans mt-2">
            {item.categories?.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}