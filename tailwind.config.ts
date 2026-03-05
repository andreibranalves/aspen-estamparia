import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F0EA',
        surface: '#EDE8E0',
        'text-primary': '#1C1C1A',
        'text-muted': '#6B6560',
        accent: '#C9B99A',
        cta: '#3D4A3E',
        'cta-hover': '#2E382F',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1280px',
      },
      spacing: {
        section: '6rem',
        'section-lg': '9rem',
      },
      keyframes: {
        scrollDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
      animation: {
        scrollDown: 'scrollDown 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
