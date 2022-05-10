module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#121119",
        "portfolio-blue": "#4F3DFE",
        "portfolio-red": "#FF316F",
        "portfolio-yellow": "#F9B813",
        "portfolio-text": "#565966",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
