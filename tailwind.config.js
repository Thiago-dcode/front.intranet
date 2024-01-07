/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "385px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {
      keyframes: {
        appear: {
          "0%": { transform: "transformX(-3deg)" },
          "100%": { transform: "rotate(3deg)" },
        },
      },
      width: {
        barChart: "500px",
        radialChart: "300px",
      },
      height: {
        barChart: "300px",
        radialChart: "300px",
      },
      colors: {
        arzumaBlack: "#222222",
        arzumaOrange: "#F68230",
        arzumaRed: "#DC0146",
        nav: "#525b75",
        "bera-textil": "#0082CB",
      },
    },
  },
  plugins: [],
};
