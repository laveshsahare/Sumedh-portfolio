import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function SketchLine({ path, isSecondary = false }) {
  const lineRef = useRef()
  const progressRef = useRef(0)
  const totalPoints = 600

  const geometry = useMemo(() => {
    const raw = path.getPoints(totalPoints)
    const points = isSecondary
      ? raw.map((p, i) => new THREE.Vector3(
          p.x + Math.sin(i * 0.4) * 0.08,
          p.y + Math.cos(i * 0.6) * 0.08,
          p.z
        ))
      : raw
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geo.setDrawRange(0, 0)
    return geo
  }, [path, isSecondary, totalPoints])

  const material = useMemo(
    () => new THREE.LineBasicMaterial({
      color: '#2D2D2D',
      transparent: true,
      opacity: isSecondary ? 0.4 : 0.8,
    }),
    [isSecondary]
  )

  useFrame(() => {
    const target = useStore.getState().lerpedScroll ?? useStore.getState().scrollProgress
    progressRef.current += (target - progressRef.current) * 0.05
    if (lineRef.current) {
      lineRef.current.geometry.setDrawRange(0, Math.floor(progressRef.current * totalPoints))
    }
  })

  return <line ref={lineRef} geometry={geometry} material={material} />
}