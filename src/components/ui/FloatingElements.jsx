import { useMemo } from 'react'

const artIcons = [
  // Pencil
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="32" y1="4" x2="32" y2="48" />
      <polygon points="28,48 36,48 32,60" />
      <line x1="28" y1="8" x2="36" y2="8" />
    </svg>
  ),
  // Paintbrush
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="32" y1="10" x2="32" y2="42" />
      <path d="M26 42 Q32 58 38 42" />
      <ellipse cx="32" cy="8" rx="4" ry="2" />
    </svg>
  ),
  // Palette
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" />
      <circle cx="22" cy="24" r="3" />
      <circle cx="34" cy="20" r="2.5" />
      <circle cx="42" cy="28" r="2" />
      <circle cx="24" cy="36" r="2.5" />
      <circle cx="38" cy="38" r="2" />
    </svg>
  ),
  // Sketchbook
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2" />
      <line x1="20" y1="8" x2="20" y2="56" />
      <line x1="26" y1="20" x2="44" y2="20" />
      <line x1="26" y1="28" x2="40" y2="28" />
      <line x1="26" y1="36" x2="42" y2="36" />
    </svg>
  ),
  // Pen nib
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 4 L40 32 L32 60 L24 32 Z" />
      <line x1="24" y1="32" x2="40" y2="32" />
      <circle cx="32" cy="38" r="2" />
    </svg>
  ),
  // Eraser
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4" />
      <line x1="16" y1="32" x2="48" y2="32" />
    </svg>
  ),
  // Paint tube
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="22" y="16" width="20" height="36" rx="3" />
      <rect x="26" y="8" width="12" height="8" rx="2" />
      <line x1="30" y1="4" x2="34" y2="4" />
      <line x1="22" y1="40" x2="42" y2="40" />
    </svg>
  ),
  // Ruler
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="8" y="24" width="48" height="16" rx="2" />
      <line x1="16" y1="24" x2="16" y2="30" />
      <line x1="24" y1="24" x2="24" y2="32" />
      <line x1="32" y1="24" x2="32" y2="30" />
      <line x1="40" y1="24" x2="40" y2="32" />
      <line x1="48" y1="24" x2="48" y2="30" />
    </svg>
  ),
  // Scissors
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="20" cy="48" r="8" />
      <circle cx="44" cy="48" r="8" />
      <line x1="26" y1="42" x2="38" y2="8" />
      <line x1="38" y1="42" x2="26" y2="8" />
    </svg>
  ),
  // Star
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <polygon points="32,4 38,24 58,24 42,38 48,58 32,46 16,58 22,38 6,24 26,24" />
    </svg>
  ),
  // Ink drop
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M32 8 Q16 32 16 42 A16 16 0 0 0 48 42 Q48 32 32 8 Z" />
    </svg>
  ),
  // Frame
  (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" />
      <rect x="14" y="18" width="36" height="28" rx="1" />
      <line x1="14" y1="34" x2="30" y2="24" />
      <line x1="30" y1="24" x2="38" y2="32" />
      <line x1="38" y1="32" x2="50" y2="22" />
      <circle cx="42" cy="24" r="3" />
    </svg>
  ),
]

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function FloatingElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      icon: artIcons[i % artIcons.length],
      size: randomBetween(20, 44),
      left: randomBetween(2, 95),
      top: randomBetween(5, 300),
      duration: randomBetween(25, 55),
      delay: randomBetween(0, 15),
      rotation: randomBetween(0, 360),
      floatType: ['float-drift-1', 'float-drift-2', 'float-drift-3', 'float-drift-4'][Math.floor(Math.random() * 4)],
      opacity: randomBetween(0.025, 0.06),
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
      {elements.map((el) => (
        <div
          key={el.id}
          className={el.floatType}
          style={{
            position: 'absolute',
            left: `${el.left}%`,
            top: `${el.top}px`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            opacity: el.opacity,
            color: '#2D2D2D',
            transform: `rotate(${el.rotation}deg)`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.icon}
        </div>
      ))}
    </div>
  )
}