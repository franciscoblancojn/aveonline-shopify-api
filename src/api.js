// requires
require('module-alias/register')
const env = require("@app/env")
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('@routes/_index.routes')
const cors = require('cors')

/**
 * @description port and rute
 */
const port = env.PORT || 3001

/**
 * @description load app
 */
const app = express()
app.use(cors({
  origin: '*'
}))
app.set('port', port)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header('Content-Security-Policy', "frame-ancestors '*'")
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Request-Headers', '*')
  res.header('Access-Control-Request-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
});

app.use('/api/v1', routes)

/**
 * use folder page for rutes not enpoints
 */
app.use('/api/v1/public',express.static(path.join(__dirname, 'page')))

/**
 * app.listen
 * @description enpoint listen
 */
app.listen(port, function () {
  console.info(`[INFO]:: Server running on port ${port}`)
})