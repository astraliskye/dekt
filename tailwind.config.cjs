/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        appear: "opacity, transform",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
