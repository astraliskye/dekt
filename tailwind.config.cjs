/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DC143C", // Brighter crimson red
        "primary-light": "#FF1744", // Lighter bright red
        "primary-dark": "#B71C1C", // Darker bright red
        "primary-tint": "#A52A2A",
        "primary-shade": "#800000",
        "primary-shader": "#4B0000",
        light: "#ffffff",
        "light-secondary": "#f8fafc",
        "light-accent": "#64748b",
        dark: "#0a0a0a",
        "dark-secondary": "#111111",
        "dark-accent": "#666666",
        "light-shade": "#f1f5f9",
        "dark-tint": "#1a1a1a",
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
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-4': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '4',
        },
        '.safe-area-bottom': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
        },
        '.scrollbar-thumb-gray-300': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d1d5db',
            borderRadius: '9999px',
          },
        },
        '.scrollbar-thumb-gray-600': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4b5563',
            borderRadius: '9999px',
          },
        },
        '.scrollbar-track-transparent': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
  darkMode: "class",
};
