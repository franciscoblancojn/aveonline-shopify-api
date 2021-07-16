require('module-alias/register')
const middlewares = require('@middlewares/index')
const controllers = require('@controllers/index')

const router = require('express').Router()


router.get("/",[middlewares.index],controllers.index)

router.get("/auth/callback",[middlewares.auth],controllers.auth)


module.exports = router