/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "nx-",
  darkMode: ["class", 'html[class~="dark"]'],
  theme: {
    extend: {
      colors: {
        // Same as what we have in colors.scss, but accessible via tailwind
        purple200: "#1b0b3b",
        purple140: "#5028c0",
        purple100: "#7856ff",
        purple50: "#9075ff",
        purple40: "#b094ff",
        purple20: "#e8ddff",

        lava200: "#5b0137",
        lava140: "#cc332b",
        lava100: "#ff7558",
        lava40: "#ffb0a3",
        lava20: "#ffe1d6",

        mint200: "#112e29",
        mint140: "#09b096",
        mint100: "#80e1d9",
        mint40: "#bcf0f0",
        mint20: "#e0fafa",

        mustard200: "#a33c16",
        mustard140: "#da6b15",
        mustard100: "#f8bc3b",
        mustard40: "#fede9b",
        mustard20: "#ffefdb",

        base120: "#eae6e7",
        base100: "#f5f2f2",
        base80: "#fbf9f9",

        black: "#000",
        grey100: "#201f24",
        grey80: "#626266",
        grey50: "#9b9b9b",
        grey30: "#c0c0c0",
        grey20: "#eae7e7",
        'grey20-opacity-8': `#eae7e714`,
        'grey20-opacity-5': `#eae7e70D`,
        'grey20-opacity-100': `#eae7e7FF`,
        'grey20-opacity-50': `#eae7e780`,
        grey10: "#e9e9e9",
        white: "#fff",

        darkbg: "#242133",
        lightbg: "#fbf9f9",
      },
    },
  },
  plugins: [],
};
