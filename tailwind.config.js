/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        myBlack: "#232323",
        text: {
          black: "#181818",
          gray: "#7b7b7b"
        },
        background: {
          page: "#ffdf8c",
          gray: "rgba(255, 255, 255, 0.25)",
          categories: "#f9f9f9",
          pizzaSelector: "#f3f3f3",
        },
        myGray: {
          1: "#f6f6f6",
          2: "#282828",
          3: "#777777",
          4: "#b6b6b6"
        },
        onHover: {
          btn_category: "rgba(254, 95, 30, 0.05)",
        },
        myOrange: "#fe5f1e"
      },
      minWidth: {
        25: '6.25rem',
      },
      maxWidth: {
        205: '51.25rem',
      },
      width: {
        70: '17.5rem',
      },
      fontFamily: {
        Nunito: "Nunito, Roboto, system-ui, Tahoma, sans-serif"
      },
      gridTemplateColumns: {
        myTempl: "repeat(auto-fit, minmax(280px, 1fr))",
      }
    },
  },
  plugins: [],
};