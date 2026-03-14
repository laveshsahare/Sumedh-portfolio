import { useScrollProgress } from '../hooks/useScrollProgress'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/ui/CustomCursor'
import FloatingElements from '../components/ui/FloatingElements'
import SceneCanvas from '../components/three/SceneCanvas'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Works from '../components/sections/Works'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  useScrollProgress()

  return (
    <>
      <CustomCursor />
      <div className="canvas-vignette" />
      <FloatingElements />
      <SceneCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  )
}