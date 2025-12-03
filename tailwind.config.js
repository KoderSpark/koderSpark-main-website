/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#020617", // Slate 950
        surface: "#0f172a", // Slate 900
        secondary: "#38bdf8", // Sky 400
        accent: "#818cf8", // Indigo 400
        icon1: "#fbbf24", // Amber 400
        icon2: "#34d399", // Emerald 400
        icon3: "#f472b6", // Pink 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        shine: 'shine 3s linear infinite',
      },
    },
  },
  plugins: [],
}
