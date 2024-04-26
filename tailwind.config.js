/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0px 4px 8px 2px rgba(0, 0, 0, 0.05)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        epassblue: "#197ABE",
        primaryblue:"#0F75BC",
        neutralBlack:"#090A0A",
        primarysky:"#25AAE1",
        lightneutra:"#FFFFFF",
        greyneutral:"#A3A3A3",
        textfromgray:"#F4F4F4",
        greyScale:"#111827"
      },
    },
  },
  plugins: [],
}
