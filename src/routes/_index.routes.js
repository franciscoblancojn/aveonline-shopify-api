require('module-alias/register')

const router = require('express').Router()

router.use('/config', require('@app/routes/config.routes'))
router.use('/shipping', require('@app/routes/shipping.routes'))
router.use('/tokens', require('@app/routes/tokens.routes'))

module.exports = router
