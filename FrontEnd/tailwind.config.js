/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #34D399 20%, #3B82F6 50%, #9333EA 80%)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
