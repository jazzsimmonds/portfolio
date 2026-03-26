export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-white/20">
          <span className="text-lavender/50">~/</span>jazzsimmonds © {new Date().getFullYear()}
        </span>
        <div className="flex gap-4">
          <a href="https://github.com/jazzsimmonds" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/20 hover:text-lavender/60 transition-colors">github</a>
          <span className="text-white/10">·</span>
          <a href="https://linkedin.com/in/jasminesimmonds" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/20 hover:text-mint/60 transition-colors">linkedin</a>
        </div>
        <a href="#" className="font-mono text-xs text-white/20 hover:text-lavender/60 transition-colors">back to top ↑</a>
      </div>
    </footer>
  )
}
