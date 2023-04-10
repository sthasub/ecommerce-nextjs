/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [// using ./src/ dir
  "./src/**/*.{js,ts,jsx,tsx}",
  // using ./ dir
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  // add more paths here],
],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
    },
  },
  plugins: [],
}

