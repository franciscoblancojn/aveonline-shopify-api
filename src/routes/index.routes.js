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
router.post("/getToken",[middlewares.validateApiKey,middlewares.validateShop],controllers.getToken)
/**
 * @rute saveToken
 * @description enpoint for save token with shop
 * @middlewares [validateApiKey, validateToken, validateShop]
 * @controllers saveToken
 */
router.post("/saveToken",[middlewares.validateApiKey,middlewares.validateToken,middlewares.validateShop],controllers.saveToken)
/**
 * @rute getMetafields
 * @description enpoint for get metafields of shopify 
 * @middlewares [validateApiKey, validateToken, validateShop]
 * @controllers getMetafields
 */
router.post("/getMetafields",[middlewares.validateApiKey,middlewares.validateToken,middlewares.validateShop],controllers.getMetafields)

module.exports = router