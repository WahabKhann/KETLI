/** @type {import('tailwindcss').Config} */

// Colours come from the CSS variables in src/index.css (stored as RGB
// channels so Tailwind's /opacity modifiers keep working).
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: token('bg'), // page black — nav, dark bands, footer
        surface: {
          1: token('surface-1'), // cards
          2: token('surface-2'), // raised card edge / gradients
        },
        line: token('border'), // hairlines on dark
        fg: {
          DEFAULT: token('text'), // text on dark
          muted: token('text-muted'), // secondary text on dark (≥ 8.3:1)
        },
        accent: {
          DEFAULT: token('accent'), // Kettli gold
          deep: token('accent-deep'), // gold gradient end
          ink: token('accent-ink'), // text on gold buttons/pills
        },
        ink: {
          DEFAULT: token('ink'), // text on gold bands (≥ 9.7:1)
          muted: token('ink-muted'), // secondary text on gold (≥ 7:1)
        },
      },
      fontFamily: {
        display: ['Kugile', '"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Type scale: display / h1–h5 / lead / body / caption.
      fontSize: {
        display: ['clamp(3.75rem, 12vw, 9.5rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        h1: ['clamp(2.5rem, 5.6vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h2: ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        h3: ['clamp(1.875rem, 3.4vw, 3rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        h4: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h5: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.6' }],
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.24em' }],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        media: 'var(--radius-media)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
      },
      transitionTimingFunction: {
        kettli: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
