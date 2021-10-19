
require('module-alias/register')

const config = require('@controllers/config/_index')

const router = require('express').Router()

router.post(
    "/",
    [

    ],
    config.save
)


module.exports = router