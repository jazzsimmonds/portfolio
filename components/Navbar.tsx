'use client'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#ctf', label: 'ctf & projects' },
  { href: '#contact', label: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/5' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-sm">
          <span className="text-lavender">~/</span>
          <span className="text-white font-medium">jazzsimmonds</span>
          <span className="text-mint animate-blink">_</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-xs text-white/40 hover:text-lavender transition-colors duration-200 tracking-widest uppercase">
              {link.label}
            </a>
          ))}
          <a href="https://linkedin.com/in/jasminesimmonds" target="_blank" rel="noreferrer"
            className="font-mono text-xs px-4 py-2 rounded border transition-all duration-200 hover:scale-[1.02]"
            style={{ borderColor: 'rgba(212,184,240,0.4)', color: '#d4b8f0', background: 'rgba(212,184,240,0.08)' }}>
            linkedin
          </a>
        </div>

        <button className="md:hidden font-mono text-white/50 hover:text-lavender" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '[×]' : '[≡]'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="font-mono text-sm text-white/60 hover:text-lavender transition-colors">
              <span className="text-lavender/40">$ </span>{link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
