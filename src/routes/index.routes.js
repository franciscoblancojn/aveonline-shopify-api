require('module-alias/register')
const middlewares = require('@middlewares/index')
const controllers = require('@controllers/index')

const router = require('express').Router()


router.get("/getToken",[middlewares.validateApiKey,middlewares.getToken],controllers.getToken)
router.post("/saveToken",[middlewares.validateApiKey,middlewares.saveToken],controllers.saveToken)



module.exports = router