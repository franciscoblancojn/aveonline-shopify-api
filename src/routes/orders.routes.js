
require('module-alias/register')

const orders = require('@controllers/orders/_index')
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
    orders.get
)

router.post(
    "/save",
    [
        fmiddlewares.validateItem({
            exactItems:true,
            "shop": {
                type:"string"
            },   
        },"query"),
    ],
    orders.save
)
router.post(
    "/envent/create",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            "shop": {
                type:"string"
            },   
        },"query"),
    ],
    orders.addEnventCreate
)
router.post(
    "/generate-recoguidas",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            "shop": {
                type:"string"
            },   
        },"query"),
        fmiddlewares.validateItem({
            exactItems:true,
            "guias": {
                type:"array"
            },   
            "note": {
                type:"string"
            },   
        }),
    ],
    orders.generateRecogidas
)
router.post(
    "/generate-relacion-envio",
    [
        apiKey,
        fmiddlewares.validateItem({
            exactItems:true,
            "shop": {
                type:"string"
            },   
        },"query"),
        fmiddlewares.validateItem({
            exactItems:true,
            "guias": {
                type:"array"
            },    
        }),
    ],
    orders.generateRelacionEnvio
)
module.exports = router