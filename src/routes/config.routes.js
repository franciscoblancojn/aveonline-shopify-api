
require('module-alias/register')

const config = require('@controllers/config/_index')
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
        fmiddlewares.validateItem({
            "eneable": {
                type:"boolean"
            },
            "user": {
                type:"string"
            },
            "password": {
                type:"string"
            },
            "dsnitre": {
                type:"string"
            },
            "dsdirre": {
                type:"string"
            },
            "dstelre": {
                type:"string"
            },
            "dscelularre": {
                type:"string"
            },
            "dscorreopre": {
                type:"string"
            },
            "cuenta": {
                type:"string"
            },
            "option_cuenta": {
                type:"array"
            },
            "agente": {
                type:"string"
            },
            "option_agente": {
                type:"array"
            },
            "valorMinimo": {
                type:"boolean"
            },
        
        })
    ],
    config.save
)


module.exports = router