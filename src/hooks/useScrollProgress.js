import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useScrollProgress() {
  const setScrollProgress = useStore((s) => s.setScrollProgress)

  useEffect(() => {
    const handle = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0) setScrollProgress(Math.min(window.scrollY / h, 1))
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [setScrollProgress])
}