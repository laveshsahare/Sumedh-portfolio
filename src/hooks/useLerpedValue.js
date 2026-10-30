import { useRef, useState, useEffect, useCallback } from 'react'

export function useLerpedValue(target, speed = 0.06) {
  const [value, setValue] = useState(target)
  const currentRef = useRef(target)
  const rafRef = useRef(null)

  const tick = useCallback(() => {
    currentRef.current += (target - currentRef.current) * speed
    if (Math.abs(target - currentRef.current) > 0.0001) {
      setValue(currentRef.current)
      rafRef.current = requestAnimationFrame(tick)
    } else {
      currentRef.current = target
      setValue(target)
    }
  }, [target, speed])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  return value
}