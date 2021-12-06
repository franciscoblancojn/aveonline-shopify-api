const env = require("@app/env")
const fmiddlewares = require('fmiddlewares')

module.exports = fmiddlewares.validateItem({
    apikey: {
    type: 'compare',
    value: env.APIKEY
  }
}, 'headers')
