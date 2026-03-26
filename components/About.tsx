'use client'
import { useEffect, useRef } from 'react'

const skills = [
  { name: 'Web Application Testing', color: 'lavender', level: 90 },
  { name: 'API Security Testing', color: 'mint', level: 85 },
  { name: 'External Infrastructure', color: 'pink', level: 80 },
  { name: 'Client Communication & Reporting', color: 'peach', level: 92 },
  { name: 'Mobile App Testing', color: 'lavender', level: 45 },
  { name: 'Internal Infrastructure', color: 'mint', level: 75 },
]

const tools = [
  'Burp Suite', 'Metasploit', 'Nessus', 'Postman',
  'Nmap', 'ffuf', 'curl', 'Kali Linux',
  'Python', 'Bash', 'Azure', 'Git',
]

const colorMap: Record<string, string> = {
  lavender: 'text-lavender border-lavender/30 bg-lavender/8',
  mint: 'text-mint border-mint/30 bg-mint/8',
  pink: 'text-pink border-pink/30 bg-pink/8',
  peach: 'text-peach border-peach/30 bg-peach/8',
}

const barColorMap: Record<string, string> = {
  lavender: 'bg-lavender',
  mint: 'bg-mint',
  pink: 'bg-pink',
  peach: 'bg-peach',
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
              const el = bar as HTMLElement
              setTimeout(() => { el.style.width = el.dataset.width + '%' }, i * 100)
            })
          }
        })
      },
      { threshold: 0.2 }
    )
    if (barsRef.current) barObserver.observe(barsRef.current)
    return () => { observer.disconnect(); barObserver.disconnect() }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-reveal flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-lavender/70">01.</span>
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">about</span>
          <div className="h-px flex-1 bg-gradient-to-r from-lavender/30 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="section-reveal" style={{ transitionDelay: '0.1s' }}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
                Breaking things{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, var(--lavender), var(--mint))' }}>
                  responsibly
                </span>
                {' '}since 2024.
              </h2>
              <div className="space-y-4 text-white/50 font-sans leading-relaxed">
                <p>
                  Security Consultant at LRQA with over a year delivering client-facing
                  penetration tests across web applications, APIs, and infrastructure. I handle the full
                  engagement lifecycle — kick-off calls, live testing, technical debriefs, and writing
                  clear reports that clients actually understand.
                </p>
                <p>
                  MSc Cyber Security (Distinction) from the University of Birmingham. Recipient of the
                  Northrop Grumman Masters Scholarship, awarded for academic achievement, and recipient of the
                  Birmingham Masters Scholarship. Currently
                  developing mobile app testing skills and preparing for CREST certification.
                </p>
              </div>
            </div>

            <div className="section-reveal grid grid-cols-3 gap-3 mt-8" style={{ transitionDelay: '0.2s' }}>
              {[
                { value: '12+', label: 'months experience', color: 'lavender' },
                { value: 'OSCP', label: 'certified', color: 'mint' },
                { value: 'Distinction', label: 'MSc grade', color: 'pink' },
              ].map((stat) => (
                <div key={stat.label} className="terminal-box p-4 text-center card-hover" style={{ boxShadow: `0 0 20px rgba(${stat.color === 'lavender' ? '212,184,240' : stat.color === 'mint' ? '184,240,212' : '240,184,212'},0.08)` }}>
                  <div className={`font-display text-xl font-bold text-${stat.color}`}>{stat.value}</div>
                  <div className="font-mono text-xs text-white/30 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Consulting skills */}
            <div className="section-reveal mt-8" style={{ transitionDelay: '0.25s' }}>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-3">consulting skills</span>
              <div className="flex flex-wrap gap-2">
                {['Client Communication', 'Risk Assessment', 'Technical Reporting', 'Remediation Guidance', 'Technical Debriefs'].map((s, i) => {
                  const colors = ['lavender', 'mint', 'pink', 'peach', 'lavender']
                  const c = colors[i % colors.length]
                  return (
                    <span key={s} className={`font-mono text-xs px-2.5 py-1 border rounded ${colorMap[c]}`}>{s}</span>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <div ref={barsRef} className="section-reveal space-y-4" style={{ transitionDelay: '0.15s' }}>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-2">skill levels</span>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-xs text-white/60">{skill.name}</span>
                    <span className={`font-mono text-xs text-${skill.color}`}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className={`h-full ${barColorMap[skill.color]} rounded-full skill-bar-fill transition-all duration-1000 ease-out`}
                      style={{ width: '0%', opacity: 0.85 }}
                      data-width={skill.level}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="section-reveal mt-8" style={{ transitionDelay: '0.25s' }}>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-3">toolkit</span>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => {
                  const colors = ['lavender', 'mint', 'pink', 'peach']
                  const c = colors[i % colors.length]
                  return (
                    <span key={tool} className={`font-mono text-xs px-2.5 py-1 border rounded ${colorMap[c]}`}>{tool}</span>
                  )
                })}
              </div>
            </div>

            {/* In development note */}
            <div className="section-reveal mt-6" style={{ transitionDelay: '0.3s' }}>
              <div className="terminal-box p-4 border-l-2 border-peach/50">
                <div className="font-mono text-xs text-peach/70 mb-2 tracking-widest uppercase">in development</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <span className="text-peach/50">›</span> Internal infrastructure testing
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <span className="text-peach/50">›</span> Mobile application penetration testing
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <span className="text-mint/50">›</span> CREST certification (in progress)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
