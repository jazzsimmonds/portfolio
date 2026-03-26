'use client'
import { useEffect, useRef } from 'react'

const experiences = [
  {
    role: 'Security Consultant',
    company: 'LRQA',
    period: 'Mar 2025 – Present',
    location: 'Birmingham, UK',
    color: 'lavender',
    bullets: [
      'Promoted to Security Consultant, taking on increased scope and responsibility across client engagements',
      'Deliver penetration tests across web applications, APIs, infrastructure, and internal networks',
      'Handle direct client communication including kick-off calls, ongoing discussions during testing, and technical debriefs',
      'Produce high-quality, client-facing penetration testing reports with clear findings and actionable remediation guidance',
    ],
  },
  {
    role: 'Associate Security Consultant',
    company: 'LRQA',
    period: 'Sep 2024 – Mar 2025',
    location: 'Birmingham, UK',
    color: 'mint',
    bullets: [
      'Delivered client penetration tests across web applications, APIs, and infrastructure',
      'Completed training in internal infrastructure testing',
      'Began developing mobile application testing capability',
      'Produced client-facing reports and handled technical debriefs independently',
    ],
  },
  {
    role: 'Keyholder / Sales Team Member',
    company: 'Clarks',
    period: 'Jul 2022 – Aug 2024',
    location: 'Worcester, UK',
    color: 'peach',
    bullets: [
      'Oversaw store operations including opening and closing procedures and financial tasks (banking, cash responsibilities)',
      'Trained and supported team members for a smooth collaborative environment',
      'Assisted customers with measuring and fitting, and managed stock and inventory',
    ],
  },
  {
    role: 'Administrator – Hosting & QMS Management',
    company: 'Vetasi Ltd',
    period: 'Jun 2021 – Sep 2021',
    location: 'Remote',
    color: 'mint',
    bullets: [
      'Participated in security audits, identifying and resolving issues, and implementing improvements based on findings',
      'Reviewed and maintained company security policies for accuracy and currency',
      'Developed security newsletters communicating threats and updates to the wider team',
    ],
  },
]

const certs = [
  { name: 'OSCP', full: 'OffSec Certified Professional', color: 'lavender' },
  { name: 'AZ-900', full: 'Microsoft Azure Fundamentals', color: 'mint' },
  { name: 'SC-900', full: 'Microsoft Security, Compliance & Identity', color: 'pink' },
  { name: 'LPI Linux Essentials', full: 'Linux Professional Institute', color: 'peach' },
  { name: 'MTA: Python', full: 'Introduction to Programming Using Python', color: 'lavender' },
  { name: 'MTA: Security', full: 'MTA Security Fundamentals', color: 'mint' },
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6" style={{ background: 'rgba(15,15,20,0.6)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="section-reveal flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-mint/70">02.</span>
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">experience & certs</span>
          <div className="h-px flex-1 bg-gradient-to-r from-mint/30 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(212,184,240,0.4), rgba(184,240,212,0.2), transparent)' }} />
            <div className="space-y-8 pl-8">
              {experiences.map((exp, i) => (
                <div key={i} className="section-reveal relative card-hover" style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className={`absolute -left-[38px] top-2 w-3 h-3 rounded-full bg-black border-2 border-${exp.color}`} />
                  <div className={`terminal-box p-5 border-l-2 border-${exp.color}/50`} style={{ boxShadow: `0 0 20px rgba(${exp.color === 'lavender' ? '212,184,240' : exp.color === 'mint' ? '184,240,212' : exp.color === 'pink' ? '240,184,212' : '240,212,184'},0.05)` }}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className={`font-display text-lg font-semibold text-${exp.color}`}>{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-sm text-white/50">{exp.company}</span>
                          <span className="text-white/20 text-xs">·</span>
                          <span className="font-mono text-xs text-white/30">{exp.location}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-white/25 border border-white/10 px-2 py-1 rounded whitespace-nowrap">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 text-sm text-white/45 font-sans leading-relaxed">
                          <span className={`text-${exp.color}/60 mt-0.5 shrink-0`}>›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="section-reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-4">certifications</span>
              <div className="space-y-2">
                {certs.map((cert) => (
                  <div key={cert.name} className={`terminal-box p-3.5 card-hover border-l-2 border-${cert.color}/50`}>
                    <div className={`font-mono text-sm font-bold text-${cert.color}`}>{cert.name}</div>
                    <div className="font-sans text-xs text-white/35 mt-0.5 leading-snug">{cert.full}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-reveal" style={{ transitionDelay: '0.25s' }}>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-4">education</span>
              <div className="space-y-2">
                <div className="terminal-box p-4 border-l-2 border-lavender/50">
                  <div className="font-mono text-sm text-lavender font-bold">MSc Cyber Security</div>
                  <div className="font-sans text-xs text-white/50 mt-0.5">University of Birmingham</div>
                  <div className="font-sans text-xs text-white/30 mt-0.5">NCSC Certified · Distinction</div>
                  <div className="font-mono text-xs text-peach/60 mt-1.5">Northrop Grumman Masters Scholar — awarded for academic achievement</div>
                  <div className="font-mono text-xs text-lavender/50 mt-1">Birmingham Masters Scholar</div>
                  <div className="font-mono text-xs text-white/20 mt-0.5">Sep 2023 – Sep 2024</div>
                </div>
                <div className="terminal-box p-4 border-l-2 border-mint/50">
                  <div className="font-mono text-sm text-mint font-bold">BSc (Hons) Cyber Security</div>
                  <div className="font-sans text-xs text-white/50 mt-0.5">Birmingham City University</div>
                  <div className="font-sans text-xs text-white/30 mt-0.5">First Class Honours</div>
                  <div className="font-mono text-xs text-white/20 mt-1.5">Sep 2020 – Jun 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
