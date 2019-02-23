const autoprefixer = require(`autoprefixer`)
const cssnano = require(`cssnano`)

const NODE_ENV = process.env.NODE_ENV || `development`
const isProduction = NODE_ENV === `production`

module.exports = {
  plugins: [
    autoprefixer,
    ...(isProduction ? [cssnano()] : []),
  ],
}
