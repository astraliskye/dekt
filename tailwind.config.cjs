/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B0000", // Blood red
        "primary-light": "#B22222", // Lighter blood red
        "primary-dark": "#660000", // Darker blood red
        "primary-tint": "#A52A2A",
        "primary-shade": "#800000",
        "primary-shader": "#4B0000",
        light: "#ffffff",
        "light-secondary": "#f8fafc",
        "light-accent": "#64748b",
        dark: "#0f172a",
        "dark-secondary": "#1e293b",
        "dark-accent": "#94a3b8",
        "light-shade": "#f1f5f9",
        "dark-tint": "#334155",
        brawn: "#caf6aa",
        discipline: "#eb867b",
        fortune: "#fbe089",
        reflex: "#b7cef1",
        "brawn-dark": "#A3EF6C",
        "discipline-dark": "#E45D4E",
        "fortune-dark": "#F9D662",
        "reflex-dark": "#99BAEB",
      },
      transitionProperty: {
        appear: "opacity, transform",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.line-clamp-4': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '4',
        },
        '.safe-area-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  darkMode: "class",
};
