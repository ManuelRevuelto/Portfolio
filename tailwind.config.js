/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0d1117',
        'bg-card': '#161b22',
        'bg-card-hover': '#1c2128',
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        'text-muted': '#656d76',
        accent: '#00d4aa',
        'accent-hover': '#00b894',
        border: '#30363d',
        'border-subtle': '#21262d',
        danger: '#f85149',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [],
};
