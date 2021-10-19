require('module-alias/register')

const shipping = require('@controllers/shipping/_index')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

router.post(
    "/",
    [
        fmiddlewares.validateItem({
            shop:{
                type:"string"
            }
        },"query")
    ],
    shipping.get
)



module.exports = router