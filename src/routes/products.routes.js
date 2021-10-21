
require('module-alias/register')

const products = require('@controllers/products/_index')
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
    products.get
)
router.post(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            "shop": {
                type:"string"
            },   
        },"query"),
    ],
    products.save
)

module.exports = router