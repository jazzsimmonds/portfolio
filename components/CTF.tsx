'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { writeups } from '@/lib/writeups'

const tagColorMap: Record<string, string> = {
  lavender: 'text-lavender-dim border-lavender/20 bg-lavender/5',
  mint: 'text-mint-dim border-mint/20 bg-mint/5',
  pink: 'text-pink-dim border-pink/20 bg-pink/5',
  peach: 'text-peach-dim border-peach/20 bg-peach/5',
}

const difficultyColor: Record<string, string> = {
  Easy: 'text-mint border-mint/30',
  Medium: 'text-peach border-peach/30',
  Hard: 'text-pink border-pink/30',
  Insane: 'text-lavender border-lavender/30',
}

const typeLabels: Record<string, string> = {
  ctf: 'CTF',
  research: 'Research',
  tool: 'Tool',
}

export default function CTF() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="ctf" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-reveal flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-pink/70">03.</span>
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">ctf writeups & projects</span>
          <div className="h-px flex-1 bg-gradient-to-r from-pink/30 to-transparent" />
        </div>

        <div className="space-y-3">
          {writeups.map((writeup, i) => {
            const isExpanded = expanded === writeup.slug
            return (
              <div key={writeup.slug} className="section-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className={`terminal-box border transition-all duration-300 ${isExpanded ? `border-${writeup.color}/40` : 'border-transparent hover:border-white/10'}`}>

                  {/* Clickable header row */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : writeup.slug)}
                    className="w-full text-left p-5 flex items-center gap-4 group"
                  >
                    <span className={`font-mono text-xs shrink-0 transition-colors text-${writeup.color}/40 group-hover:text-${writeup.color}/80`}>
                      {isExpanded ? '▼' : '▶'}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`font-mono text-xs px-2 py-0.5 border rounded ${tagColorMap[writeup.color]}`}>CTF</span>
                        <span className={`font-mono text-xs px-2 py-0.5 border rounded ${difficultyColor[writeup.difficulty]}`}>{writeup.difficulty}</span>
                        <span className="font-mono text-xs text-white/20">{writeup.os}</span>
                        <span className="font-mono text-xs text-white/15">·</span>
                        <span className="font-mono text-xs text-white/20">{writeup.date}</span>
                      </div>
                      <h3 className={`font-display text-base font-semibold text-white group-hover:text-${writeup.color} transition-colors`}>
                        {writeup.title}
                      </h3>
                    </div>

                    {/* Read full writeup */}
                    <Link
                      href={`/writeups/${writeup.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`font-mono text-xs px-3 py-1.5 border rounded shrink-0 transition-all duration-200 border-${writeup.color}/30 text-${writeup.color}/60 hover:bg-${writeup.color}/10 hover:text-${writeup.color}`}
                    >
                      read writeup →
                    </Link>
                  </button>

                  {/* Expanded preview */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <p className="text-sm text-white/50 font-sans leading-relaxed mb-4">{writeup.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {writeup.tags.map((tag) => (
                          <span key={tag} className={`font-mono text-xs px-2 py-0.5 border rounded ${tagColorMap[writeup.color]}`}>{tag}</span>
                        ))}
                      </div>
                      <Link
                        href={`/writeups/${writeup.slug}`}
                        className={`inline-block mt-4 font-mono text-sm text-${writeup.color}/70 hover:text-${writeup.color} transition-colors`}
                      >
                        read full writeup with images →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="section-reveal mt-8 text-center" style={{ transitionDelay: '0.3s' }}>
          <span className="font-mono text-xs text-white/20">
            all writeups also mirrored on{' '}
            <a href="https://test69987.wordpress.com" target="_blank" rel="noreferrer" className="text-lavender/50 hover:text-lavender transition-colors">
              jas&apos; blog
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
