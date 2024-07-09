/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "header-img": "url('/header_img.png')",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s",
        "fadeIn-0-5": "fadeIn 0.5s",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
