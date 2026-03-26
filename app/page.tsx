import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import CTF from '@/components/CTF'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CursorSparkle from '@/components/CursorSparkle' // ← import it here

export default function Home() {
  return (
    <main className="relative">
      <CursorSparkle /> {/* ← add this at the top so it overlays everything */}
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <CTF />
      <Contact />
      <Footer />
    </main>
  )
}
