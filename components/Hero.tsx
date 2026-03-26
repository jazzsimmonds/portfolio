'use client'
import { useEffect, useRef } from 'react'

const terminalLines = [
  { prompt: '~$', cmd: 'whoami', delay: 600 },
  { prompt: null, cmd: 'jasmine simmonds — security consultant', delay: 900, color: 'lavender' },
  { prompt: '~$', cmd: 'cat specialties.txt', delay: 1400 },
  { prompt: null, cmd: 'web apps  •  APIs  •  infrastructure  •  mobile (in dev)', delay: 1700, color: 'mint' },
  { prompt: '~$', cmd: 'cat certifications.txt', delay: 2200 },
  { prompt: null, cmd: 'OSCP  •  AZ-900  •  SC-900  •  LPI Linux Essentials', delay: 2500, color: 'peach' },
  { prompt: '~$', cmd: 'cat status.txt', delay: 3000 },
  { prompt: null, cmd: 'preparing for CREST  •  based in Birmingham', delay: 3300, color: 'pink' },
  { prompt: '~$', cmd: '', delay: 3800, cursor: true },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll('.term-line')
    lines?.forEach((line, i) => {
      const el = line as HTMLElement
      el.style.opacity = '0'
      const delay = terminalLines[i]?.delay ?? i * 200
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s ease'
        el.style.opacity = '1'
      }, delay)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,184,240,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(184,240,212,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(212,184,240,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(184,240,212,0.10) 0%, transparent 70%)', animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(240,184,212,0.10) 0%, transparent 70%)', animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(240,212,184,0.08) 0%, transparent 70%)', animationDelay: '0.5s' }} />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-mint mb-8 border border-mint/30 px-3 py-1.5 rounded-full bg-mint/10">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          security consultant · LRQA · Birmingham
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-4">
          <span className="block glitch-text animate-glitch" data-text="Jasmine Simmonds">
            Jasmine Simmonds
          </span>
          <span className="block text-transparent bg-clip-text" style={{
            backgroundImage: 'linear-gradient(135deg, var(--lavender) 0%, var(--mint) 40%, var(--pink) 70%, var(--peach) 100%)'
          }}>
            breaks things for a living.
          </span>
        </h1>

        <p className="text-white/50 font-sans text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
          Security Consultant at LRQA delivering penetration tests across web apps, APIs, and infrastructure.
          MSc Cyber Security (Distinction) · OSCP certified · CREST in progress.
        </p>

        <div ref={containerRef} className="terminal-box max-w-2xl" style={{ boxShadow: '0 0 40px rgba(212,184,240,0.12), 0 0 80px rgba(184,240,212,0.06)' }}>
          <div className="terminal-header">
            <span className="terminal-dot" style={{ background: '#f0b8d4' }} />
            <span className="terminal-dot" style={{ background: '#f0d4b8' }} />
            <span className="terminal-dot" style={{ background: '#b8f0d4' }} />
            <span className="font-mono text-xs text-white/20 ml-2">jazz@kali — terminal</span>
          </div>
          <div className="p-4 space-y-1.5">
            {terminalLines.map((line, i) => (
              <div key={i} className="term-line font-mono text-sm">
                {line.prompt && <span className="text-lavender/70 mr-2">{line.prompt}</span>}
                {!line.prompt && <span className="text-white/20 mr-2 select-none">{'  '}</span>}
                <span className={
                  line.color === 'lavender' ? 'text-lavender font-medium'
                  : line.color === 'mint' ? 'text-mint'
                  : line.color === 'peach' ? 'text-peach'
                  : line.color === 'pink' ? 'text-pink'
                  : 'text-white/80'
                }>
                  {line.cmd}
                  {line.cursor && <span className="text-lavender animate-blink ml-0.5">█</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <a href="#ctf" className="font-mono text-sm px-6 py-3 rounded border transition-all duration-200 hover:scale-[1.02]" style={{ background: 'rgba(212,184,240,0.1)', borderColor: 'rgba(212,184,240,0.4)', color: '#d4b8f0' }}>
            view my work →
          </a>
          <a href="#experience" className="font-mono text-sm px-6 py-3 rounded border transition-all duration-200 hover:scale-[1.02]" style={{ background: 'rgba(184,240,212,0.08)', borderColor: 'rgba(184,240,212,0.3)', color: '#b8f0d4' }}>
            experience & certs
          </a>
          <a href="#contact" className="font-mono text-sm px-6 py-3 text-white/40 hover:text-white/70 transition-colors duration-200">
            get in touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-white/20">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-lavender/40 to-transparent" />
      </div>
    </section>
  )
}
