/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'blue-primary': 'var(--blue-primary)',
        'blue-accent': 'var(--blue-accent)',
        'blue-accent-2': 'var(--blue-accent-2)',
        'blue-bright': 'var(--blue-bright)',
        'blue-deep': 'var(--blue-deep)',
        'blue-panel': 'var(--blue-panel)',
        'blue-panel-2': 'var(--blue-panel-2)',
        'blue-panel-dark': 'var(--blue-panel-dark)',
        'footer-accent': 'var(--footer-accent)'
      }
    }
  },
  plugins: []
};
