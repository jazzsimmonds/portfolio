/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0f',
        'off-black': '#0f0f14',
        'card-bg': '#131318',
        'border': '#1e1e28',
        lavender: '#c8a8f8',
        'lavender-dim': '#9878d8',
        mint: '#a0f0c8',
        'mint-dim': '#60c898',
        pink: '#f8a8cc',
        'pink-dim': '#d878a0',
        peach: '#f8c8a0',
        'peach-dim': '#d89870',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '92%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '94%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '96%': { transform: 'translate(-1px, 0)', filter: 'none' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
