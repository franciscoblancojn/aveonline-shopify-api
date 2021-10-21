
require('module-alias/register')

const products = require('@controllers/products/_index')
const apiKey = require('@middlewares/apiKey')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

router.post(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            "shop": {
                type:"string"
            },   
        },"query"),
    ],
    products.save
)

module.exports = router