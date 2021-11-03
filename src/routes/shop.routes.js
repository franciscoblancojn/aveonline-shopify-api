require('module-alias/register')

const shop = require('@controllers/shop/_index')
const apiKey = require('@middlewares/apiKey')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

router.get(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            shop:{
                type:"string"
            }
        },"query")
    ],
    shop.get
)


router.delete(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            token:{
                type:"string"
            }
        },"query"),
    ],
    shop.delete
)
module.exports = router