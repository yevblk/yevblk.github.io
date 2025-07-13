/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#1a2233',
          dark: '#151a23',
          DEFAULT: '#1a2233',
          white: '#ffffff',
        },
        surface: {
          DEFAULT: '#1a2233',
          dark: '#1a2233',
          white: '#ffffff',
        },
        card: '#1a2233',
        cardWhite: '#ffffff',
        border: {
          DEFAULT: '#2d3545',
          subtle: '#232b3a',
          white: '#e5e7eb',
        },
        accent: {
          DEFAULT: '#3b82f6',
          muted: '#60a5fa',
        },
        text: {
          DEFAULT: '#e3e8ee',
          muted: '#b0b8c8',
          dark: '#cbd5e1',
          white: '#232b3a',
        },
        white: '#ffffff',
        black: '#000000',
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#232b3a',
          900: '#1a2233',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'avenir next', 'avenir', 'segoe ui', 'helvetica neue', 'Adwaita Sans', 'Cantarell', 'Ubuntu', 'roboto', 'noto', 'helvetica', 'arial', 'sans-serif'],
        serif: ['Iowan Old Style', 'Apple Garamond', 'Baskerville', 'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro', 'serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
        mono: ['Menlo', 'Consolas', 'Monaco', 'Adwaita Mono', 'Liberation Mono', 'Lucida Console', 'monospace'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(36, 37, 38, 0.25)',
      },
      backgroundImage: {},
    },
  },
  plugins: [
  ],
}

