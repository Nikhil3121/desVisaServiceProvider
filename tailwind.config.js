/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00E5FF',
          red: '#FF3B3B',
          dark: '#050505',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          lighter: 'rgba(0, 229, 255, 0.08)',
        },
      },

      /* ✅ GRID BACKGROUND */
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(0deg, transparent 24%, rgba(0,229,255,0.05) 25%, rgba(0,229,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,229,255,0.05) 75%, rgba(0,229,255,0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0,229,255,0.05) 25%, rgba(0,229,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,229,255,0.05) 75%, rgba(0,229,255,0.05) 76%, transparent 77%, transparent)
        `,
      },

      backgroundSize: {
        'grid': '60px 60px',
      },

      /* ✅ GLOW SYSTEM */
      boxShadow: {
        'glow-cyan':
          '0 0 25px rgba(0,229,255,0.35), inset 0 0 25px rgba(0,229,255,0.05)',
        'glow-cyan-lg':
          '0 0 50px rgba(0,229,255,0.6), inset 0 0 50px rgba(0,229,255,0.2)',
        'glow-red':
          '0 0 25px rgba(255,59,59,0.4)',
      },

      /* ✅ SMOOTH ANIMATIONS */
      transitionDuration: {
        400: '400ms',
      },

      /* ✅ BLUR */
      backdropBlur: {
        xs: '2px',
        md: '10px',
        xl: '20px',
      },
    },
  },

  plugins: [],
}