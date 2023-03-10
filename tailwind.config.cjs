/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dc2626",
        light: "#f5f5f1",
        dark: "#1a1b24",
        "primary-tint": "#E25050",
        "primary-shade": "#c11f1f",
        "primary-shader": "#9E1A1A",
        "light-shade": "#E6E6DB",
        "dark-tint": "#3f4256",
        "light-accent": "#7f7e81",
        "dark-accent": "#35384c",
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
    },
  },
  plugins: [],
  darkMode: "class",
};
