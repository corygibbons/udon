module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: false,
  out: 'style.css',
  plugins: {
    'postcss-easy-import': {},
    'postcss-cssnext': {},
    'cssnano': ctx.env === 'production' ? {} : false
  }
})
