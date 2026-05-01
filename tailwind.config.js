/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aperture: {
          orange: '#e8720c',
          'orange-dim': '#c4610a',
          bg: '#0a0b0d',
          bg2: '#0f1115',
          bg3: '#141720',
          panel: '#111418',
          border: '#2a2e38',
          'border-bright': '#3d4455',
          white: '#d8dce8',
          'white-dim': '#8a8fa0',
          green: '#4ecb71',
          red: '#e84040',
        },
      },
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        ui: ['Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'eye-pulse': 'eye-pulse 3s ease-in-out infinite',
        'typing-bounce': 'typing-bounce 1s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glitch': 'glitch 3s infinite linear alternate-reverse',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        'eye-pulse': {
          '0%, 100%': { boxShadow: '0 0 40px rgba(232,114,12,0.6), 0 0 80px rgba(232,114,12,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(232,114,12,0.9), 0 0 120px rgba(232,114,12,0.5)' },
        },
        'typing-bounce': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
