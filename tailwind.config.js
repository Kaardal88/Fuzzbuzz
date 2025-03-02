/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        customOrange: "#FB8B24",
        customOrangeHover: "#c96910",
        customGray: "#333",
        customTeal: "#0F4C5C",
        hoverTeal: "#256E82",
        bgBody: "#18191A",
      },

      animation: {
        arrowBounce: "arrowBounce 2s linear infinite",
      },
      keyframes: {
        arrowBounce: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(5px)" },
          "0%": { transform: "translateY(-5px)" },
        },
      },
    },

    plugins: [],
  },
};
