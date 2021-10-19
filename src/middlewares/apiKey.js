const dotenv = require('dotenv').config()
const env = dotenv.parsed
const fmiddlewares = require('fmiddlewares')

module.exports = fmiddlewares.validateItem({
    apikey: {
    type: 'compare',
    value: env.APIKEY
  }
}, 'headers')
