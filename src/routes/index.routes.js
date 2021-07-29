//require libs
require('module-alias/register')
const middlewares = require('@middlewares/index')
const controllers = require('@controllers/index')
//init router
const router = require('express').Router()

/**
 * @rute getToken
 * @description enpoint for get token with shop
 * @middlewares [validateApiKey, getToken]
 * @controllers getToken
 */
router.get("/getToken",[middlewares.validateApiKey,middlewares.getToken],controllers.getToken)
/**
 * @rute saveToken
 * @description enpoint for save token with shop
 * @middlewares [validateApiKey, saveToken]
 * @controllers saveToken
 */
router.post("/saveToken",[middlewares.validateApiKey,middlewares.saveToken],controllers.saveToken)

module.exports = router