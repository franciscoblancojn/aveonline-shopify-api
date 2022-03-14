require('module-alias/register')

const router = require('express').Router()

router.use('/config', require('@app/routes/config.routes'))
router.use('/shipping', require('@app/routes/shipping.routes'))
router.use('/tokens', require('@app/routes/tokens.routes'))
router.use('/shop', require('@app/routes/shop.routes'))
router.use('/products', require('@app/routes/products.routes'))
router.use('/scripts', require('@app/routes/scripts.routes'))
router.use('/orders', require('@app/routes/orders.routes'))
router.use('/webhook', require('@app/routes/webhook.routes'))
router.use('/', require('@app/routes/index.routes'))

module.exports = router
