require('module-alias/register')
const middlewares = require('@middlewares/index')
const controllers = require('@controllers/index')

const router = require('express').Router()


router.get("/",[middlewares.index],controllers.index)


module.exports = router