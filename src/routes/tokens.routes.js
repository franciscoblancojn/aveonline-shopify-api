require('module-alias/register')

const tokens = require('@controllers/tokens/_index')
const apiKey = require('@middlewares/apiKey')

const router = require('express').Router()
const fmiddlewares = require('fmiddlewares')

router.get(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            shop:{
                type:"string"
            }
        },"query")
    ],
    tokens.get
)

router.post(
    "/",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            shop:{
                type:"string"
            }
        },"query"),
        fmiddlewares.validateItem({
            exactItems:true,
            token:{
                type:"string"
            }
        })
    ],
    tokens.save
)


module.exports = router