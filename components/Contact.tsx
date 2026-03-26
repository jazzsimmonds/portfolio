'use client'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('jasminehsimmonds@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6" style={{ background: 'rgba(15,15,20,0.6)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="section-reveal flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-peach/70">04.</span>
          <span className="font-mono text-xs text-white/30 tracking-widest uppercase">contact</span>
          <div className="h-px flex-1 bg-gradient-to-r from-peach/30 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="section-reveal" style={{ transitionDelay: '0.1s' }}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
                Let&apos;s talk{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, var(--peach), var(--pink))' }}>
                  security.
                </span>
              </h2>
              <p className="text-white/40 font-sans leading-relaxed mb-6">
                Whether you&apos;re looking for a penetration tester, want to discuss a security engagement,
                or just want to connect — my inbox is open. Usually respond same day.
              </p>

              <button onClick={copyEmail} className="group flex items-center gap-3 font-mono text-sm text-white/60 hover:text-lavender transition-colors duration-200">
                <span className="text-lavender/50 group-hover:text-lavender/80">$</span>
                <span>jasminehsimmonds@gmail.com</span>
                <span className={`text-xs border px-2 py-0.5 rounded transition-all duration-200 ${copied ? 'border-mint/50 text-mint' : 'border-white/10 text-white/20 group-hover:border-lavender/30 group-hover:text-lavender/60'}`}>
                  {copied ? 'copied!' : 'copy'}
                </span>
              </button>
            </div>

            <div className="section-reveal mt-8 space-y-3" style={{ transitionDelay: '0.2s' }}>
              {[
                { label: 'GitHub', handle: 'github.com/jazzsimmonds', href: 'https://github.com/jazzsimmonds', color: 'lavender' },
                { label: 'LinkedIn', handle: 'linkedin.com/jasminesimmonds', href: 'https://linkedin.com/in/jasminesimmonds', color: 'mint' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 group font-mono text-sm">
                  <span className={`text-${social.color}/50 group-hover:text-${social.color} transition-colors w-20`}>{social.label}</span>
                  <span className="text-white/25 group-hover:text-white/60 transition-colors">{social.handle}</span>
                  <span className={`text-xs text-${social.color}/0 group-hover:text-${social.color}/50 transition-all`}>→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="section-reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="terminal-box" style={{ boxShadow: '0 0 30px rgba(240,212,184,0.08)' }}>
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: '#f0b8d4' }} />
                <span className="terminal-dot" style={{ background: '#f0d4b8' }} />
                <span className="terminal-dot" style={{ background: '#b8f0d4' }} />
                <span className="font-mono text-xs text-white/20 ml-2">contact.sh</span>
              </div>
              <div className="p-5 space-y-2 font-mono text-sm">
                <div className="text-white/20">#!/bin/bash</div>
                <div className="pt-1 space-y-1.5">
                  <div><span className="text-peach/60"># who I am</span></div>
                  <div><span className="text-lavender/70">name</span><span className="text-white/25">=</span><span className="text-mint">&quot;Jasmine Simmonds&quot;</span></div>
                  <div><span className="text-lavender/70">role</span><span className="text-white/25">=</span><span className="text-pink">&quot;Security Consultant&quot;</span></div>
                  <div><span className="text-lavender/70">company</span><span className="text-white/25">=</span><span className="text-peach">&quot;LRQA&quot;</span></div>
                  <div className="pt-1"><span className="text-peach/60"># scope</span></div>
                  <div><span className="text-lavender/70">focus</span><span className="text-white/25">=(</span></div>
                  <div className="pl-4 space-y-0.5 text-white/40">
                    <div><span className="text-pink">&quot;web app pentesting&quot;</span></div>
                    <div><span className="text-mint">&quot;API security&quot;</span></div>
                    <div><span className="text-lavender">&quot;infrastructure testing&quot;</span></div>
                    <div><span className="text-peach">&quot;client-facing engagements&quot;</span></div>
                  </div>
                  <div><span className="text-white/25">)</span></div>
                </div>
                <div className="pt-1">
                  <span className="text-lavender/60">echo </span>
                  <span className="text-white/40">&quot;Let&apos;s work together.&quot;</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-peach/60">$</span>
                  <span className="text-lavender animate-blink">█</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
