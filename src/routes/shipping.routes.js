require('module-alias/register')

const shipping = require('@controllers/shipping/_index')
const apiKey = require('@middlewares/apiKey')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

router.post(
    "/generate",
    [
        fmiddlewares.validateItem({
            shop:{
                type:"string"
            }
        },"query")
    ],
    shipping.generate
)

router.post(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            shop:{
                type:"string"
            }
        },"query")
    ],
    shipping.get
)


module.exports = router