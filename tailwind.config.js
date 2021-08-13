module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      md: '400px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')]
}