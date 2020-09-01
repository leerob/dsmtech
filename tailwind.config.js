module.exports = {
  future: 'all',
  experimental: 'all',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    minWidth: {
      md: '400px'
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')]
};
