/**
 * Mirror Studio AI - Configuração do Tailwind CSS
 */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#121212",
          darker: "#0a0a0a",
          light: "#f4f4f4",
          accent: "#ff5757",
          "accent-dark": "#e04444",
          "accent-light": "#ff7a7a",
          gray: "#2a2a2a",
          "gray-light": "#3a3a3a",
        },
        primary: {
          500: "#ff5757",
          600: "#e04444",
          400: "#ff7a7a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(255, 87, 87, 0.5)",
        "glow-lg": "0 0 30px rgba(255, 87, 87, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};
