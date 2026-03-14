export default function FilterPills({ categories, active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={() => setActive('all')}
        className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-jack text-xs sm:text-sm tracking-wide transition-all duration-300 ${
          active === 'all'
            ? 'bg-charcoal text-canvas'
            : 'border border-charcoal/20 text-charcoal/60 hover:border-charcoal'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => setActive(cat.slug)}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-jack text-xs sm:text-sm tracking-wide transition-all duration-300 ${
            active === cat.slug
              ? 'bg-charcoal text-canvas'
              : 'border border-charcoal/20 text-charcoal/60 hover:border-charcoal'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}