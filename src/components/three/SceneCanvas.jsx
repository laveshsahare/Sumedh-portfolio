import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import SketchLine from './SketchLine'
import ScrollLerper from './ScrollLerper'

export default function SceneCanvas() {
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 2.5, 0),
      new THREE.Vector3(-3, -1, 0.2),
      new THREE.Vector3(-1, 1.8, -0.15),
      new THREE.Vector3(0.5, -0.5, 0.15),
      new THREE.Vector3(2, 2, -0.2),
      new THREE.Vector3(3.5, -0.8, 0.15),
      new THREE.Vector3(5, 1.5, 0),
    ])
  }, [])

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.08]">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 14], fov: 40 }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ScrollLerper />
          <SketchLine path={path} />
          <SketchLine path={path} isSecondary />
        </Suspense>
      </Canvas>
    </div>
  )
}