/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        turf: {
          50: "#f3f8f4",
          100: "#d9eadb",
          200: "#b4d6b9",
          300: "#7fb287",
          500: "#2d7a3f",
          700: "#1b4d2a",
          900: "#0e2115"
        }
      },
      boxShadow: {
        soft: "0 10px 24px rgba(14, 33, 21, 0.12)",
        glow: "0 0 0 1px rgba(127, 178, 135, 0.45), 0 14px 30px rgba(14, 33, 21, 0.28)"
      },
      backgroundImage: {
        "turf-hero": "linear-gradient(150deg, rgba(14,33,21,0.94), rgba(27,77,42,0.9)), url('https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80')"
      },
      animation: {
        float: "float 3.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" }
        }
      }
    }
  },
  plugins: []
};
