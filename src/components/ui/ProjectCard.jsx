import { motion } from 'framer-motion'

export default function ProjectCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] bg-charcoal/5">
        <img
          src={item.image_url}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
          <div className="p-4 sm:p-6 w-full">
            <h3 className="font-jack text-base sm:text-lg text-white mb-1">{item.title}</h3>
            <p className="font-jack text-xs sm:text-sm text-white/60">{item.categories?.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}