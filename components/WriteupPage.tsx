'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Writeup, WriteupSection } from '@/lib/writeups'

const colorMap: Record<string, string> = {
  lavender: '#c8a8f8',
  mint: '#a0f0c8',
  pink: '#f8a8cc',
  peach: '#f8c8a0',
}

const difficultyColor: Record<string, string> = {
  Easy: 'text-mint border-mint/30 bg-mint/8',
  Medium: 'text-peach border-peach/30 bg-peach/8',
  Hard: 'text-pink border-pink/30 bg-pink/8',
  Insane: 'text-lavender border-lavender/30 bg-lavender/8',
}

function Section({ section, color }: { section: WriteupSection; color: string }) {
  const hex = colorMap[color] ?? '#c8a8f8'

  switch (section.type) {
    case 'heading':
      return (
        <h2 className="font-display text-xl font-semibold text-white mt-10 mb-4 flex items-center gap-3">
          <span className="w-1 h-5 rounded-full shrink-0" style={{ background: hex }} />
          {section.content}
        </h2>
      )

    case 'text':
      return <p className="text-white/60 font-sans leading-relaxed mb-4">{section.content}</p>

    case 'code':
      return (
        <div className="terminal-box my-4">
          <div className="terminal-header">
            <span className="terminal-dot bg-pink/70" />
            <span className="terminal-dot bg-peach/70" />
            <span className="terminal-dot bg-mint/70" />
            {section.lang && (
              <span className="font-mono text-xs text-white/20 ml-2">{section.lang}</span>
            )}
          </div>
          <pre className="p-4 font-mono text-sm text-white/70 overflow-x-auto leading-relaxed">
            <code>{section.content}</code>
          </pre>
        </div>
      )

    case 'image':
      return (
        <figure className="my-6">
          <div className="relative w-full overflow-hidden rounded-lg border border-white/8" style={{ background: '#0d0d12' }}>
            <img
              src={section.src}
              alt={section.caption ?? ''}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {section.caption && (
            <figcaption className="font-mono text-xs text-white/30 mt-2 text-center">
              {section.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'note':
      return (
        <div className="my-4 px-4 py-3 rounded border-l-2 font-mono text-sm text-white/50 leading-relaxed"
          style={{ borderColor: hex, background: `${hex}10` }}>
          <span style={{ color: hex }}>note: </span>{section.content}
        </div>
      )

    case 'list':
      return (
        <ul className="my-4 space-y-1.5">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-2 font-mono text-sm text-white/55">
              <span style={{ color: hex }} className="shrink-0 mt-0.5">›</span>
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

export default function WriteupPage({ writeup }: { writeup: Writeup }) {
  const hex = colorMap[writeup.color] ?? '#c8a8f8'

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm">
            <span style={{ color: hex }}>←</span>
            <span className="text-white/40 ml-2 hover:text-white/70 transition-colors">back</span>
          </Link>
          <span className="font-mono text-xs text-white/20">{writeup.platform}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`font-mono text-xs px-2.5 py-1 border rounded ${difficultyColor[writeup.difficulty]}`}>
              {writeup.difficulty}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 border border-white/10 text-white/30 rounded">
              {writeup.os}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 border border-white/10 text-white/30 rounded">
              {writeup.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {writeup.title}
          </h1>

          {/* Accent line */}
          <div className="h-px w-full mb-6" style={{ background: `linear-gradient(to right, ${hex}40, transparent)` }} />

          {/* Summary */}
          <p className="text-white/50 font-sans text-lg leading-relaxed mb-6">{writeup.summary}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {writeup.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs px-2.5 py-1 border rounded"
                style={{ color: hex, borderColor: `${hex}40`, background: `${hex}10` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="terminal-box mb-8">
          <div className="terminal-header">
            <span className="terminal-dot bg-pink/70" />
            <span className="terminal-dot bg-peach/70" />
            <span className="terminal-dot bg-mint/70" />
            <span className="font-mono text-xs text-white/20 ml-2">writeup.md</span>
          </div>
          <div className="p-1" />
        </div>

        {/* Content */}
        <div>
          {writeup.sections.map((section, i) => (
            <Section key={i} section={section} color={writeup.color} />
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link href="/#ctf" className="font-mono text-sm text-white/30 hover:text-white/60 transition-colors">
            ← all writeups
          </Link>
          <span className="font-mono text-xs text-white/15">{writeup.platform} · {writeup.difficulty}</span>
        </div>
      </div>
    </div>
  )
}
