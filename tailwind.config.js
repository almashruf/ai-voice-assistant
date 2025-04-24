module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#ef4444', // red-500
          accent: '#f87171',  // red-400
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
  }