/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      tranparent: "transparent",

      bronw: {
        500: "#5E503F",
        300: "#C6AC8F",
        100: "#EAE0D5",
      },

      gray: {
        900: "#0A0908",
        800: "#121212",
      },

      "acqua-marine": {
        900: "#0E161A",
        800: "#141F24",
        700: "#22333B",
        500: "#385563",
        300: "#466A7B",
      },
    },
    extend: {
      backgroundImage: {
        tecnology: 'url("tecnology.png")',
      },

      fontFamily: {
        sans: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};
