/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#1f2937", // gray-800
            lineHeight: "1.8",
            maxWidth: "none",
            fontFamily: "Inter, sans-serif",
            h1: {
              fontWeight: "700",
              color: "#111827",
              marginTop: "2rem",
              marginBottom: "1rem",
              fontSize: "2rem",
            },
            h2: {
              fontWeight: "700",
              color: "#111827",
              marginTop: "2rem",
              marginBottom: "0.75rem",
              fontSize: "1.5rem",
            },
            h3: {
              fontWeight: "600",
              color: "#1f2937",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              fontSize: "1.25rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            a: {
              color: "#ea580c", // orange-600
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                color: "#c2410c", // darker orange
                textDecoration: "underline",
              },
            },
            strong: { color: "#111827" },
            ul: {
              marginTop: "1rem",
              marginBottom: "1rem",
              listStyleType: "disc",
              paddingLeft: "1.5rem",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            img: {
              borderRadius: "0.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            blockquote: {
              borderLeftColor: "#ea580c",
              backgroundColor: "#fff7ed", // light orange
              padding: "1rem",
              borderRadius: "0.5rem",
              fontStyle: "italic",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
