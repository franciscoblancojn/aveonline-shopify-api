
require('module-alias/register')

const scripts = require('@controllers/scripts/_index')
const apiKey = require('@middlewares/apiKey')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

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
    scripts.add
)

module.exports = router