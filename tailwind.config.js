export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headings: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#38BDF8',
        secondary: '#2563EB',
        lightSky: '#E0F2FE',
        dark: '#0F172A',
        lightBlueBg: '#F1F5F9',
        accent: '#06B6D4',
        borderColor: '#E2E8F0',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
      },
      boxShadow: {
        'soft': '0px 10px 30px rgba(0,0,0,0.08)',
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },

      animation: {
        scroll: "scroll 25s linear infinite"
      }

    },
  },
  plugins: [],
}