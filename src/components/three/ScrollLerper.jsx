import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function ScrollLerper() {
  const lerpedRef = useRef(0)

  useFrame(() => {
    const target = useStore.getState().scrollProgress
    lerpedRef.current = THREE.MathUtils.lerp(lerpedRef.current, target, 0.04)
    useStore.getState().lerpedScroll = lerpedRef.current
  })

  return null
}